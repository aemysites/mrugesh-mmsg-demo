/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Ensure we have the expected tab menu and content containers
  const tabMenu = Array.from(element.children).find(el => el.classList.contains('w-tab-menu'));
  const tabContent = Array.from(element.children).find(el => el.classList.contains('w-tab-content'));
  if (!tabMenu || !tabContent) return;

  // Get tab labels from tab menu
  const tabLinks = Array.from(tabMenu.querySelectorAll('a'));
  // Get tab panes from tab content
  const tabPanes = Array.from(tabContent.querySelectorAll('.w-tab-pane'));

  // Build rows: Each row is [label, content]
  const rows = tabLinks.map((link, idx) => {
    // Defensive: Find the corresponding pane by index
    const label = link.textContent.trim();
    const pane = tabPanes[idx];
    let content = null;
    if (pane) {
      // Use the immediate grid child as the tab content block
      const grid = pane.querySelector('.w-layout-grid') || pane;
      content = grid;
    } else {
      content = document.createTextNode('');
    }
    return [label, content];
  });

  // Table header
  const headerRow = ['Tabs (tabs22)'];
  // Compose table cells
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
