/* global WebImporter */
export default function parse(element, { document }) {
  // Find the collage grid of images
  const grid = element.querySelector('.ix-hero-scale-3x-to-1x .grid-layout');
  let images = [];
  if (grid) {
    images = Array.from(grid.querySelectorAll('img'));
  }

  // Find the content container (heading, subheading, buttons)
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  let contentElements = [];
  if (contentContainer) {
    const heading = contentContainer.querySelector('h1');
    if (heading) contentElements.push(heading);
    const subheading = contentContainer.querySelector('p');
    if (subheading) contentElements.push(subheading);
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) contentElements.push(buttonGroup);
  }

  // Table rows
  const headerRow = ['Hero (hero20)'];
  const imagesRow = [images]; // All images as background collage
  const contentRow = [contentElements]; // Heading, subheading, buttons

  const cells = [headerRow, imagesRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
