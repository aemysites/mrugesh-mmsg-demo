/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (should be columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  const imgEl = columns[0].querySelector('img');

  // Only include the image column if the image exists
  const tableColumns = [];
  if (imgEl) tableColumns.push(imgEl);

  // Second column: content block
  tableColumns.push(columns[1]);

  // Table header
  const headerRow = ['Columns (columns32)'];
  // Table content row: only columns with actual content
  const contentRow = tableColumns;

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
