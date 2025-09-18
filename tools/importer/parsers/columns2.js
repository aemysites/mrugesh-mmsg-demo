/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // The grid has three main children: left, middle, right columns
  // Let's get them in order
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 3) return;

  // Left: big image + heading + tag + text (first child, an <a>)
  const leftCol = gridChildren[0];
  // Middle: two stacked cards with images (second child, a <div>)
  const middleCol = gridChildren[1];
  // Right: vertical list of text cards (third child, a <div>)
  const rightCol = gridChildren[2];

  // For the columns block, we want 3 columns: left, middle, right
  // Each cell should contain the full content of its respective column

  // 1. Header row
  const headerRow = ['Columns (columns2)'];

  // 2. Content row: 3 columns
  // Use the original elements directly for resilience
  const contentRow = [leftCol, middleCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
