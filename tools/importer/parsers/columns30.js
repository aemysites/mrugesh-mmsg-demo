/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Table header as per spec
  const headerRow = ['Columns (columns30)'];

  // Table content: one row, N columns
  const contentRow = columns;

  // Build the table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
