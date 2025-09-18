/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid containing the columns
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Get all immediate children of the main grid
  const gridChildren = Array.from(mainGrid.children);

  // First two children are the left and right columns
  // Left: heading and avatar/testimonial
  // Right: paragraph and logo

  // LEFT COLUMN
  const leftCol = document.createElement('div');
  leftCol.appendChild(gridChildren[0]); // h2-heading

  // Find testimonial block (avatar + name/title)
  // It's inside a nested grid, find the flex-horizontal
  const nestedGrid = gridChildren[2];
  if (nestedGrid) {
    const flexRow = nestedGrid.querySelector('.flex-horizontal');
    if (flexRow) leftCol.appendChild(flexRow);
  }

  // RIGHT COLUMN
  const rightCol = document.createElement('div');
  rightCol.appendChild(gridChildren[1]); // paragraph-lg

  // Find divider and logo
  if (nestedGrid) {
    // Divider
    const divider = nestedGrid.querySelector('.divider');
    if (divider) rightCol.appendChild(divider);
    // Logo (svg)
    const logo = nestedGrid.querySelector('.utility-display-inline-block');
    if (logo) rightCol.appendChild(logo);
  }

  // Table header
  const headerRow = ['Columns (columns26)'];
  // Table content row: two columns
  const contentRow = [leftCol, rightCol];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
