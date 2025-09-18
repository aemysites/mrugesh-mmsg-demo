/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the background image (img with src)
  let bgImg = element.querySelector('img.cover-image');
  // Defensive: Find the card containing text and CTAs
  let card = element.querySelector('.card');

  // Table header row
  const headerRow = ['Hero (hero6)'];

  // Row 2: Background image only (if present)
  const imageRow = [bgImg ? bgImg : ''];

  // Row 3: All text and CTA content from the card
  const contentRow = [card ? card : ''];

  // Compose table cells
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
