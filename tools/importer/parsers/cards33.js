/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Get all the direct child <a> elements (each card)
  const cards = element.querySelectorAll(':scope > a');

  cards.forEach((card) => {
    // Each card has a grid div inside
    const grid = card.querySelector(':scope > div');
    if (!grid) return;

    // Get the image (first child)
    const img = grid.querySelector('img');

    // Get the text content container (all except the image)
    // The structure is: <div class="...">[tags, heading, p, 'Read']</div>
    const textContainers = grid.querySelectorAll(':scope > div');
    // The first div is the text content block
    const textDiv = textContainers.length > 0 ? textContainers[textContainers.length - 1].cloneNode(true) : null;
    if (!img || !textDiv) return;

    // Remove only the first row (tags/time) if present
    const tagRow = textDiv.querySelector(':scope > div');
    if (tagRow) tagRow.remove();

    // Ensure all text content is included: heading, description, CTA
    // No further removals

    rows.push([img, textDiv]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
