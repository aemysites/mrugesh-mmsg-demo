/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children divs (columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  // Each column contains an aspect-ratio wrapper with an image
  const headerRow = ['Columns (columns29)'];
  // Build the content row: each cell is the aspect wrapper div (preserves image and semantics)
  const contentRow = columnDivs.map((col) => col);
  // Compose the table rows
  const rows = [headerRow, contentRow];
  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original grid element with the block table
  element.replaceWith(table);
}
