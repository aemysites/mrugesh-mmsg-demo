/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from a card anchor
  function getImage(card) {
    // Try to find an img inside a div with aspect class
    const aspectDiv = card.querySelector('.utility-aspect-3x2');
    if (aspectDiv) {
      const img = aspectDiv.querySelector('img');
      if (img) return img;
    }
    // If not found, try any img inside the card
    const img = card.querySelector('img');
    if (img) return img;
    return null;
  }

  // Helper to extract all text content from a card anchor
  function getTextContent(card) {
    // Try to find heading and description
    let heading = card.querySelector('h3, .h4-heading');
    let desc = card.querySelector('.paragraph-sm');
    // If not found, try to find inside nested divs
    if (!heading || !desc) {
      const inner = card.querySelector('.utility-text-align-center');
      if (inner) {
        if (!heading) heading = inner.querySelector('h3, .h4-heading');
        if (!desc) desc = inner.querySelector('.paragraph-sm');
      }
    }
    // Also include any additional text nodes that might be present
    const frag = document.createDocumentFragment();
    if (heading) frag.appendChild(heading.cloneNode(true));
    if (desc) frag.appendChild(desc.cloneNode(true));
    // Check for additional paragraphs or text blocks inside the card
    const extraParagraphs = card.querySelectorAll('.paragraph-sm:not(:first-of-type), p');
    extraParagraphs.forEach((p) => {
      // Avoid duplicates
      if (desc !== p) frag.appendChild(p.cloneNode(true));
    });
    // If no heading or desc, fallback to all text content inside the card
    if (!heading && !desc) {
      Array.from(card.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          frag.appendChild(document.createTextNode(node.textContent.trim()));
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          frag.appendChild(node.cloneNode(true));
        }
      });
    }
    return frag;
  }

  // Find all tab panes (each tab pane contains a grid of cards)
  const tabPanes = element.querySelectorAll('.w-tab-pane');

  // We'll collect all cards from all tab panes
  const allCards = [];
  tabPanes.forEach((pane) => {
    // Each pane has a grid of cards
    const grid = pane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an anchor
    const cards = grid.querySelectorAll('a');
    cards.forEach((card) => {
      // Defensive: skip if card has no content
      if (!card) return;
      // Get image (mandatory)
      const img = getImage(card);
      // Get text content (mandatory)
      const text = getTextContent(card);
      // Only add if at least image and text
      if (img && text && text.childNodes.length) {
        allCards.push([img, text]);
      }
    });
  });

  // Build the table rows
  const headerRow = ['Cards (cards23)'];
  const rows = allCards;
  const tableData = [headerRow, ...rows];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(table);
}
