/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container inside the provided element
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Header row as per requirements
  const headerRow = ['Columns (columns31)'];

  // Content row: each cell is the full content of a column
  const contentRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
