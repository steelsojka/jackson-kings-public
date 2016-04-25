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
}());

/****** Google Analytics ***********/
// This is copied straight from google.
// Putting it in the main JS file to avoid an extra request.
// DO NOT MODIFY.

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-76867928-1', 'auto');
ga('send', 'pageview');
