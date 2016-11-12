'use strict';

var onload = function() {
  if (!window.HTMLImports) {
    document.dispatchEvent(
      new CustomEvent('WebComponentsReady', {
        bubbles: true,
      })
    );
  }
};

if (!(
  'registerElement' in document
  && 'import' in document.createElement('link')
  && 'content' in document.createElement('template')
)) {
  var script = document.createElement('script');

  script.async = true;
  script.src = 'bower_components/webcomponentsjs/webcomponents-lite.min.js';
  script.onload = onload;

  document.head.appendChild(script);
} else {
  onload();
}

/*
document.onscroll = function() {
  var scrollPercentage = 100 * document.body.scrollTop / (document.body.scrollHeight - document.body.clientHeight);

  console.log('scrollPercentage: ' + scrollPercentage);
};
*/
