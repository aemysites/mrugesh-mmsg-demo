/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Always use the correct block header
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // Select all direct card containers
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Find the image inside each card
    const img = cardDiv.querySelector('img');
    if (!img) return;
    // Only output one column per card row since there is no text content
    rows.push([img]);
  });

  // Create the Cards block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
