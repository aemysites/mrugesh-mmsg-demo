/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout (main structure)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Find the two main grid children: image and content
  const gridChildren = grid.querySelectorAll(':scope > div');
  if (gridChildren.length < 2) return;

  // --- Background Image Cell ---
  // The first grid child contains the image
  const imageContainer = gridChildren[0];
  let backgroundImg = imageContainer.querySelector('img');
  let imageCell = '';
  if (backgroundImg) {
    imageCell = backgroundImg;
  }

  // --- Content Cell ---
  // The second grid child contains the heading and possibly CTA
  const contentContainer = gridChildren[1];
  // We'll collect heading, subheading, CTA, etc.
  const contentParts = [];

  // Heading (h1)
  const heading = contentContainer.querySelector('h1');
  if (heading) {
    contentParts.push(heading);
  }

  // Subheading (h2/h3/h4) if present
  const subheading = contentContainer.querySelector('h2, h3, h4');
  if (subheading) {
    contentParts.push(subheading);
  }

  // Paragraphs (optional)
  const paragraphs = contentContainer.querySelectorAll('p');
  paragraphs.forEach(p => {
    contentParts.push(p);
  });

  // CTA (button or link) if present
  const buttonGroup = contentContainer.querySelector('.button-group');
  if (buttonGroup && buttonGroup.children.length > 0) {
    contentParts.push(buttonGroup);
  }

  // Defensive: If nothing found, fallback to the whole content container
  let contentCell = contentParts.length ? contentParts : contentContainer;

  // --- Table Construction ---
  const headerRow = ['Hero (hero28)'];
  const tableRows = [
    headerRow,
    [imageCell],
    [contentCell]
  ];

  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
