/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: check for cards
  const cards = Array.from(element.children).filter((child) => child.matches('a.card-link'));
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  cards.forEach((card) => {
    // Find image (first div with image)
    const imageDiv = card.querySelector('.utility-aspect-3x2');
    const img = imageDiv ? imageDiv.querySelector('img') : null;
    // Defensive: ensure we have an image element
    const imageCell = img || '';

    // Find text content (second div)
    const contentDiv = card.querySelector('.utility-padding-all-1rem');
    // Defensive: ensure we have the content div
    let textCell;
    if (contentDiv) {
      // Optionally, wrap the tag, heading, and paragraph in a fragment
      const tagGroup = contentDiv.querySelector('.tag-group');
      const heading = contentDiv.querySelector('h3');
      const paragraph = contentDiv.querySelector('p');
      // Compose cell content
      const cellContent = [];
      if (tagGroup) cellContent.push(tagGroup);
      if (heading) cellContent.push(heading);
      if (paragraph) cellContent.push(paragraph);
      textCell = cellContent;
    } else {
      textCell = '';
    }

    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
