/* global WebImporter */
export default function parse(element, { document }) {
  // Always use correct header row
  const headerRow = ['Hero (hero12)'];

  // Get direct children (background image, then content)
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // --- BACKGROUND IMAGE ROW ---
  let bgImgCell = '';
  if (children.length > 0) {
    const bgImgDiv = children[0];
    const bgImg = bgImgDiv.querySelector('img');
    if (bgImg) bgImgCell = bgImg;
  }

  // --- CONTENT ROW ---
  let contentCell = '';
  if (children.length > 1) {
    const cardBody = children[1].querySelector('.card-body');
    if (cardBody) {
      const grid = cardBody.querySelector('.grid-layout');
      if (grid) {
        // Find the non-image child (the column with headings, icons, paragraphs, CTA)
        const contentCol = Array.from(grid.children).find(el => el.tagName !== 'IMG');
        if (contentCol) {
          const fragments = [];
          // Title (h2)
          const h2 = contentCol.querySelector('h2');
          if (h2) fragments.push(h2.cloneNode(true));
          // Subheading and list items (all paragraphs inside .flex-vertical)
          const flexVertical = contentCol.querySelector('.flex-vertical');
          if (flexVertical) {
            Array.from(flexVertical.querySelectorAll('.flex-horizontal')).forEach(flexRow => {
              const icon = flexRow.querySelector('.icon-small');
              const para = flexRow.querySelector('p');
              if (icon && para) {
                const span = document.createElement('span');
                span.appendChild(icon.cloneNode(true));
                span.appendChild(para.cloneNode(true));
                fragments.push(span);
              }
            });
          }
          // CTA button
          const buttonGroup = contentCol.querySelector('.button-group');
          if (buttonGroup) {
            const btn = buttonGroup.querySelector('a');
            if (btn) fragments.push(btn.cloneNode(true));
          }
          // Compose cell content only if there is content
          if (fragments.length) {
            contentCell = fragments;
          } else {
            contentCell = '';
          }
        }
      }
    }
  }

  // --- TABLE ASSEMBLY ---
  const cells = [
    headerRow,
    [bgImgCell],
    [contentCell], // Always add the third row, even if empty
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
