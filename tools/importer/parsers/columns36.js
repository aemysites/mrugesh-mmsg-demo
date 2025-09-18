/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the grid layout (should have two columns)
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // LEFT COLUMN: headline, subheading, buttons
  const leftCol = columns[0];
  // We'll build a fragment for the left column
  const leftFrag = document.createDocumentFragment();

  // Heading
  const heading = leftCol.querySelector('h1');
  if (heading) leftFrag.appendChild(heading.cloneNode(true));

  // Subheading
  const subheading = leftCol.querySelector('p');
  if (subheading) leftFrag.appendChild(subheading.cloneNode(true));

  // Buttons
  const btnGroup = leftCol.querySelector('.button-group');
  if (btnGroup) {
    // Clone the button group
    leftFrag.appendChild(btnGroup.cloneNode(true));
  }

  // RIGHT COLUMN: images (skip the blurred face)
  const rightCol = columns[1];
  const imgs = Array.from(rightCol.querySelectorAll('img'));
  // Exclude the first image (blurred face)
  const filteredImgs = imgs.slice(1);
  const rightFrag = document.createDocumentFragment();
  filteredImgs.forEach(img => {
    rightFrag.appendChild(img.cloneNode(true));
  });

  // Build table rows
  const headerRow = ['Columns (columns36)'];
  const contentRow = [leftFrag, rightFrag];
  const rows = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
