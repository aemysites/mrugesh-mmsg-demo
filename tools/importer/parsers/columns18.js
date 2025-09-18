/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid container (columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: ensure we have at least two columns (content + image)
  if (columns.length < 2) return;

  // First column: left side (text content)
  const leftCol = columns[0];
  // Second column: right side (contact list)
  const rightCol = columns[1];

  // Find the image (should be outside the grid, but inside the section)
  const img = element.querySelector('img');

  // Build the left cell: combine heading, subheading, and image
  const leftCellContent = [leftCol];
  if (img) {
    leftCellContent.push(img);
  }

  // Build the right cell: contact list
  const rightCellContent = [rightCol];

  // Table header
  const headerRow = ['Columns (columns18)'];
  // Table body: two columns (left, right)
  const bodyRow = [leftCellContent, rightCellContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bodyRow
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
