/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content (image, title, description) from a card element
  function extractCardContent(cardEl) {
    // Find the first <img> in the card (mandatory)
    const img = cardEl.querySelector('img');

    // Find the heading (h3, h2, h4, etc.) and description (p) if present
    let heading = null;
    let description = null;
    // Look for heading tags inside the card
    heading = cardEl.querySelector('h1, h2, h3, h4, h5, h6');
    // Look for the first paragraph inside the card
    description = cardEl.querySelector('p');

    // Compose the text cell content
    const textContent = [];
    if (heading) textContent.push(heading);
    if (description) textContent.push(description);

    return [img, textContent];
  }

  // Compose the table rows
  const rows = [];
  // Header row as per instructions
  rows.push(['Cards (cards25)']);

  // Get all direct children of the grid container
  const cards = Array.from(element.querySelectorAll(':scope > div'));
  cards.forEach((cardEl) => {
    // Only treat as a card if it contains an <img>
    const img = cardEl.querySelector('img');
    if (!img) return; // skip non-card blocks
    // Check if the card has a heading or description (text content)
    const hasText = cardEl.querySelector('h1, h2, h3, h4, h5, h6, p');
    if (hasText) {
      // Card with image and text
      const [imageEl, textContent] = extractCardContent(cardEl);
      rows.push([imageEl, textContent]);
    } else {
      // Card with only image (no text)
      rows.push([img, '']);
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
