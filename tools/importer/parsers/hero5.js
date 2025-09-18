/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main grid container (should be the first .grid-layout inside the section)
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Find the hero image (first IMG child of the grid)
  const imageEl = mainGrid.querySelector('img');

  // Find the content block (should be a .section inside the grid)
  const contentBlock = mainGrid.querySelector('.section');

  // Defensive: If both are missing, abort
  if (!imageEl && !contentBlock) return;

  // Table header must match block name exactly
  const headerRow = ['Hero (hero5)'];
  // Second row: image element or empty string
  const imageRow = [imageEl ? imageEl : ''];
  // Third row: content block or empty string
  const contentRow = [contentBlock ? contentBlock : ''];

  // Compose table rows
  const rows = [headerRow, imageRow, contentRow];
  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original section with the new table
  element.replaceWith(table);
}
