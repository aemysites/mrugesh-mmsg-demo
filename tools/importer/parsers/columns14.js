/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid-layout container (the columns wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Header row as specified
  const headerRow = ['Columns (columns14)'];

  // Second row: each column cell contains its respective content
  // For robustness, reference the entire column element for each cell
  const contentRow = columns.map((col) => col);

  // Compose table data
  const cells = [headerRow, contentRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block table
  element.replaceWith(block);
}
