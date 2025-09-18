/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Make sure the element exists and is a container
  if (!element || !element.children || element.children.length === 0) return;

  // The header row is always the block name
  const headerRow = ['Columns (columns4)'];

  // Get all immediate children (each is a column cell)
  // Defensive: Only include elements that have content (skip empty)
  const columnCells = Array.from(element.children)
    .filter((child) => child && child.childNodes.length > 0)
    .map((child) => {
      // If the child is just a wrapper for an image, use the image directly
      // Otherwise, use the whole child element
      const img = child.querySelector('img');
      if (img && child.childNodes.length === 1) {
        return img;
      }
      return child;
    });

  // Only build the block if we have at least one column
  if (columnCells.length === 0) return;

  // Build the table rows: header, then columns
  const rows = [headerRow, columnCells];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
