/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid container with the images
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children (each column cell)
  const gridItems = Array.from(grid.children);

  // For each grid item, find the image (if present)
  const cells = gridItems.map((item) => {
    // Try to find the image inside the nested divs
    const img = item.querySelector('img');
    // If found, use the image element, else empty string
    return img ? img : '';
  });

  // Build the table rows
  const headerRow = ['Columns (columns16)'];
  const contentRow = cells;

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
