/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the image from a card link
  function getImage(card) {
    // Find the first img inside the card
    return card.querySelector('img');
  }

  // Helper to extract the text content from a card link
  function getTextContent(card) {
    // We'll collect the tag/date row and the heading
    const textContainer = document.createElement('div');

    // Tag/date row
    const tagRow = card.querySelector('.flex-horizontal');
    if (tagRow) {
      textContainer.appendChild(tagRow.cloneNode(true));
    }

    // Heading
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) {
      textContainer.appendChild(heading.cloneNode(true));
    }

    return textContainer;
  }

  // 1. Header row
  const rows = [ ['Cards (cards24)'] ];

  // 2. Each card is an <a> inside the grid
  const cards = element.querySelectorAll(':scope > a.utility-link-content-block');
  cards.forEach(card => {
    // First cell: image
    const img = getImage(card);
    // Second cell: text content (tag/date row + heading)
    const textContent = getTextContent(card);
    rows.push([
      img,
      textContent
    ]);
  });

  // 3. Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
