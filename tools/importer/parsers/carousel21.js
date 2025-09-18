/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the card body containing the content
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) {
    // Try to find .card-body deeper if structure is different
    cardBody = element.querySelector('[class*="card-body"]');
  }

  // Get image (first img inside cardBody)
  let img = cardBody ? cardBody.querySelector('img') : null;

  // Get heading (h4 or similar inside cardBody)
  let heading = cardBody ? cardBody.querySelector('.h4-heading') : null;

  // Compose text cell
  const textCellContent = [];
  if (heading) {
    // Convert to heading element if needed
    let h = heading;
    if (!/^h/i.test(heading.tagName)) {
      // If not a heading, create one
      const h4 = document.createElement('h4');
      h4.innerHTML = heading.innerHTML;
      h = h4;
    }
    textCellContent.push(h);
  }
  // If there is other text (description), add it below heading
  // In this HTML, only heading is present, so nothing else

  // Build table rows
  const headerRow = ['Carousel (carousel21)'];
  const rows = [];
  // Only add slide row if image is present
  if (img) {
    rows.push([
      img,
      textCellContent.length ? textCellContent : ''
    ]);
  }

  // Compose cells array
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block table
  element.replaceWith(block);
}
