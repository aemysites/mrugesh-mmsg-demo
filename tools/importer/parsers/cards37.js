/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text content from a card anchor/div
  function extractCardContent(cardEl) {
    // Find the image (mandatory)
    let img = cardEl.querySelector('img');
    // Defensive: if image is wrapped in a div, use the div
    let imgContainer = img && img.closest('div');
    let imageCell = imgContainer || img;
    // Find heading (h3 or h4)
    let heading = cardEl.querySelector('h3, h4');
    // Find description (first <p>)
    let description = cardEl.querySelector('p');
    // Find CTA (button or .button class or link)
    let cta = cardEl.querySelector('.button, button, a.button');
    // Compose text cell
    let textCellContent = [];
    if (heading) textCellContent.push(heading);
    if (description) textCellContent.push(description);
    if (cta) textCellContent.push(cta);
    // If only one element, don't wrap in array
    let textCell = textCellContent.length === 1 ? textCellContent[0] : textCellContent;
    return [imageCell, textCell];
  }

  // Find the grid containing all cards
  // Defensive: look for .grid-layout with card anchors inside
  let mainGrid = element.querySelector('.grid-layout');
  // Find all direct card anchors inside the grid
  let cardEls = Array.from(mainGrid.children).filter(child =>
    child.matches('a.utility-link-content-block, a.utility-link-content-block.w-inline-block, div.grid-layout')
  );

  // Some cards are nested in another grid (see HTML: second grid inside first grid)
  let cards = [];
  cardEls.forEach(cardEl => {
    if (cardEl.classList.contains('grid-layout')) {
      // Nested grid: extract all card anchors inside
      Array.from(cardEl.children).forEach(nestedCard => {
        if (nestedCard.matches('a.utility-link-content-block, a.utility-link-content-block.w-inline-block')) {
          cards.push(nestedCard);
        }
      });
    } else {
      cards.push(cardEl);
    }
  });

  // Compose table rows
  const headerRow = ['Cards (cards37)'];
  const rows = [headerRow];
  cards.forEach(cardEl => {
    rows.push(extractCardContent(cardEl));
  });

  // Create block table and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
