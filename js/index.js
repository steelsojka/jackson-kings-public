(function() {
  // Run when the document is ready for modification.
  document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
    updateCopyrightYear();
  }, false);
  
  /**
   * Updates the copyright date to the current year.
   */
  function updateCopyrightYear() {
    document.getElementById('footer-copyright-year').innerText = (new Date()).getFullYear();
  }
}();
