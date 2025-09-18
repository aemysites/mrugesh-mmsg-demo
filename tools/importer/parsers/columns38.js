/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the element is the expected grid container
  if (!element || !element.classList.contains('w-layout-grid')) return;

  // Block header row as per spec
  const headerRow = ['Columns (columns38)'];

  // Select all direct children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the image if present
  const contentRow = columns.map(col => {
    const img = col.querySelector('img');
    if (img) return img;
    // If no image, include the column itself (fallback)
    return col;
  });

  // Create the table with header and content row
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the grid element with the constructed table
  element.replaceWith(table);
}
