/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChild(parent, selector) {
    return parent ? Array.from(parent.children).find(child => child.matches(selector)) : null;
  }

  // 1. Header row
  const headerRow = ['Columns (columns11)'];

  // 2. Gather content for each column
  // Left column: Title block
  const container = getDirectChild(element, '.container');
  const topGrid = getDirectChild(container, '.grid-layout.tablet-1-column');
  let leftBlock = null;
  let rightBlock = null;
  if (topGrid && topGrid.children.length >= 2) {
    leftBlock = topGrid.children[0]; // Title block
    rightBlock = topGrid.children[1];
  }

  // Compose left column content
  const leftColumnContent = leftBlock ? [leftBlock] : [];

  // Right column: Description, author, button
  let rightColumnContent = [];
  if (rightBlock) {
    const paragraph = rightBlock.querySelector('.rich-text');
    const authorRow = rightBlock.querySelector('.grid-layout > .flex-horizontal');
    const readMoreBtn = rightBlock.querySelector('a.button');
    rightColumnContent = [paragraph, authorRow, readMoreBtn].filter(Boolean);
  }

  // 3. Images row
  const bottomGrid = getDirectChild(container, '.grid-layout.mobile-portrait-1-column');
  let imgCell1 = null;
  let imgCell2 = null;
  if (bottomGrid && bottomGrid.children.length >= 2) {
    imgCell1 = bottomGrid.children[0];
    imgCell2 = bottomGrid.children[1];
  }

  // 4. Build table rows
  const rows = [];
  rows.push(headerRow);
  if (leftColumnContent.length > 0 || rightColumnContent.length > 0) {
    rows.push([leftColumnContent, rightColumnContent]);
  }
  if (imgCell1 || imgCell2) {
    rows.push([imgCell1, imgCell2].filter(Boolean));
  }

  // 5. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
