/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Ensure element exists
  if (!element) return;

  // Find the grid container that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return; // Defensive: expect at least 2 columns

  // Table header row
  const headerRow = ['Columns (columns27)'];

  // Table content row: one cell per column
  // Use the entire column element for each cell for resilience
  const contentRow = columns;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original section with the new table
  element.replaceWith(table);
}
