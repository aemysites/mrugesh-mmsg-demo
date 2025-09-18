/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (each column)
  const columns = Array.from(grid.children);

  // Prepare header row
  const headerRow = ['Columns (columns3)'];

  // Prepare content row: each cell is a column's content (reference, not clone)
  const contentRow = columns.map((col) => col);

  // Build table cells array
  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
