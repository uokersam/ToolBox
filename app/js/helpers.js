function changeButtonContent(element, textBefore, textAfter) {
  element.classList.remove('is-primary');
  element.classList.add('is-success');
  element.textContent = textBefore;

  setTimeout(function() {
    element.classList.remove('is-success');
    element.classList.add('is-primary');
    element.textContent = textAfter;
  }, 1000);
}