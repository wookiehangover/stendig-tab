var ob = require('oblique-strategies');
var version = require('../../ext/manifest.json').version;

var getTheme = new Promise(function(resolve, reject) {
  chrome.storage.sync.get('theme', function(item) {
    resolve(item.theme);
  });
  setTimeout(reject, 3000);
});

function renderCard() {
  var card = ob.draw();
  var elem = document.getElementById('strategy');
  elem.innerText = String(card);
}

function handleThemeClick() {
  var elem = document.querySelector('.controls .theme');
  elem.addEventListener('click', function(e) {
    e.preventDefault();
    var body = document.body;
    body.classList.toggle('dark');

    var theme = body.classList.contains('dark') ? 'dark': 'light';
    chrome.storage.sync.set({ theme: theme });
  });
}

function handleAboutClick() {
  var elem = document.querySelector('.controls .about');
  elem.addEventListener('click', function(e) {
    e.preventDefault();
    var body = document.body;
    body.classList.toggle('show-about');
  });
}

function updateVersion() {
  var elem = document.getElementById('ext-version');
  elem.innerText = 'v' + version;
}

document.addEventListener('DOMContentLoaded', function() {
  getTheme.then(function(theme) {
    if (theme === 'dark') {
      document.body.classList.toggle('dark');
    }
  });
  renderCard();
  updateVersion();
  handleThemeClick();
  handleAboutClick();
});
