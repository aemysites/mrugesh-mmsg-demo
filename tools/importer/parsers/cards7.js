/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row as specified
  const headerRow = ['Cards (cards7)'];

  // Get all immediate children (each card is a child div)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Defensive: if there are no cards, do nothing
  if (!cardDivs.length) return;

  // Each cardDiv contains an image (inside .utility-aspect-1x1)
  // Use the alt text as the text content for each card
  const rows = Array.from(cardDivs).map(cardDiv => {
    const img = cardDiv.querySelector('img');
    let text = '';
    if (img && img.alt && img.alt.trim()) {
      text = img.alt.trim();
    }
    // Always include the row if image exists, even if text is empty (to maximize content extraction)
    if (img) {
      return [img, text];
    }
    return null;
  }).filter(Boolean); // Remove any nulls

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Only create and replace if there is at least one card row
  if (rows.length) {
    const block = WebImporter.DOMUtils.createTable(tableData, document);
    element.replaceWith(block);
  }
}
