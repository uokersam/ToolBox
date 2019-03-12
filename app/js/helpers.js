function changeButtonContent(element, text) {
  element.classList.remove('is-primary');
  element.classList.add('is-success');
  element.textContent = text;
}