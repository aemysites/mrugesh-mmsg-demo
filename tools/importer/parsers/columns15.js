/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid with two columns (headline/text/buttons and image)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get the left content (headline, subheading, buttons)
  // and the right content (image)
  const children = grid.querySelectorAll(':scope > *');
  if (children.length < 2) return;
  const leftCol = children[0];
  const rightCol = children[1];

  // Extract all text and block content from leftCol
  const leftColContent = document.createElement('div');
  // Headline
  const h1 = leftCol.querySelector('h1');
  if (h1) leftColContent.appendChild(h1.cloneNode(true));
  // Subheading
  const subheading = leftCol.querySelector('.subheading');
  if (subheading) leftColContent.appendChild(subheading.cloneNode(true));
  // Buttons
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftColContent.appendChild(buttonGroup.cloneNode(true));

  // For rightCol, just use the image
  let rightColContent = null;
  const img = rightCol.querySelector('img');
  if (img) {
    rightColContent = document.createElement('div');
    rightColContent.appendChild(img.cloneNode(true));
  }

  // Build the table rows
  const headerRow = ['Columns (columns15)'];
  const contentRow = rightColContent ? [leftColContent, rightColContent] : [leftColContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
