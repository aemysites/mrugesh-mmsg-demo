/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !document) return;

  // Always use the correct block header
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Each card is a direct child div
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Icon is always the first .icon inside the cardDiv
    const iconDiv = cardDiv.querySelector('.icon');
    // Text is always the first <p> inside the cardDiv
    const textP = cardDiv.querySelector('p');

    // Defensive: skip if either is missing
    if (!iconDiv || !textP) return;

    // Reference the actual DOM nodes (do not clone)
    rows.push([iconDiv, textP]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
