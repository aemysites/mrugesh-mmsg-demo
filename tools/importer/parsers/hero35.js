/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main container for the hero content
  // The structure is: section > div.container > div.grid-layout > [content blocks]
  const container = element.querySelector('.container');
  if (!container) return;

  // The grid-layout contains the content blocks
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Find the content block (with heading and subheading)
  let contentBlock = null;
  let ctaBlock = null;

  gridChildren.forEach(child => {
    if (child.querySelector('h1, h2, h3, h4, h5, h6')) {
      contentBlock = child;
    } else if (child.tagName === 'A') {
      ctaBlock = child;
    }
  });

  // Defensive: if not found, fallback to first/second child
  if (!contentBlock && gridChildren.length > 0) contentBlock = gridChildren[0];
  if (!ctaBlock && gridChildren.length > 1) ctaBlock = gridChildren[1];

  // Extract heading and subheading from contentBlock
  let heading = null;
  let subheading = null;
  if (contentBlock) {
    heading = contentBlock.querySelector('h1, h2, h3, h4, h5, h6');
    subheading = contentBlock.querySelector('p, .subheading');
  }

  // Compose the content cell for the third row
  const cellContent = [];
  if (heading) cellContent.push(heading);
  if (subheading && subheading !== heading) cellContent.push(subheading);
  if (ctaBlock) cellContent.push(ctaBlock);

  // Build the table rows
  const headerRow = ['Hero (hero35)'];
  const imageRow = ['']; // No background image in this HTML
  const contentRow = [cellContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
