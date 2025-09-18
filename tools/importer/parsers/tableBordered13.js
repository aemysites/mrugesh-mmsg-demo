/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required
  const headerRow = ['Table (bordered, tableBordered13)'];

  // Helper to extract Q&A pairs from the structure
  // Each .divider contains a .w-layout-grid with two children: question and answer
  const rows = [];
  const dividers = element.querySelectorAll(':scope > .divider');

  dividers.forEach(divider => {
    // Each divider contains a .w-layout-grid
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    // The first child is the question (h4-heading), the second is the answer (rich-text)
    const children = grid.children;
    if (children.length < 2) return;
    const question = children[0];
    const answer = children[1];
    rows.push([question, answer]);
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(table);
}
