/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children with a class
  function getAccordionItems(root) {
    // Only immediate children with class 'accordion' and 'w-dropdown'
    return Array.from(root.children).filter(
      (child) => child.classList.contains('accordion') && child.classList.contains('w-dropdown')
    );
  }

  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  const accordionItems = getAccordionItems(element);

  accordionItems.forEach((item) => {
    // Title cell: Find the .w-dropdown-toggle > .paragraph-lg
    let title = '';
    const toggle = Array.from(item.children).find((c) => c.classList.contains('w-dropdown-toggle'));
    if (toggle) {
      const titleDiv = Array.from(toggle.children).find((c) => c.classList.contains('paragraph-lg'));
      if (titleDiv) {
        title = titleDiv;
      }
    }
    // Content cell: Find the nav.accordion-content > div > div.rich-text
    let content = '';
    const nav = Array.from(item.children).find((c) => c.tagName === 'NAV' && c.classList.contains('accordion-content'));
    if (nav) {
      // The rich text is usually nested: nav > div > div.rich-text
      const padDiv = Array.from(nav.children).find((c) => c.classList.contains('utility-padding-all-1rem'));
      if (padDiv) {
        const richText = Array.from(padDiv.children).find((c) => c.classList.contains('rich-text'));
        if (richText) {
          content = richText;
        } else {
          content = padDiv;
        }
      } else {
        content = nav;
      }
    }
    // Defensive: If title or content is missing, fallback to empty string
    rows.push([
      title || '',
      content || ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
