/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children of a node by tag name
  function getImmediateChildByTag(parent, tag) {
    return Array.from(parent.children).find(child => child.tagName.toLowerCase() === tag.toLowerCase());
  }

  // 1. Header row
  const headerRow = ['Hero (hero39)'];

  // 2. Background image row
  // The background image is the <img> inside the first grid cell
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  if (gridDivs && gridDivs.length > 0) {
    // Find the first <img> in the first grid cell
    bgImg = gridDivs[0].querySelector('img');
  }
  const imageRow = [bgImg ? bgImg : ''];

  // 3. Content row: Headline, subheading, CTA
  // The second grid cell contains the text and button
  let contentCell = document.createElement('div');
  if (gridDivs && gridDivs.length > 1) {
    // The content is inside a nested grid
    const innerGrid = gridDivs[1].querySelector('.w-layout-grid');
    if (innerGrid) {
      // Headline is the <h1> in the inner grid
      const h1 = getImmediateChildByTag(innerGrid, 'h1');
      if (h1) contentCell.appendChild(h1);
      // The next <div> contains the subheading <p> and the button group
      const flexDiv = innerGrid.querySelector('.flex-vertical');
      if (flexDiv) {
        // Subheading
        const p = flexDiv.querySelector('p');
        if (p) contentCell.appendChild(p);
        // CTA button
        const btnGroup = flexDiv.querySelector('.button-group');
        if (btnGroup) {
          // Only include the button (anchor)
          const btn = btnGroup.querySelector('a');
          if (btn) contentCell.appendChild(btn);
        }
      }
    }
  }
  const contentRow = [contentCell];

  // 4. Build the table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
