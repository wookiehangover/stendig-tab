var version = require('../../ext/manifest.json').version;
var React = require('react');
var Calendar = require('react-stendig-calendar');
var moment = require('moment');
var setBackground = require('./unsplash-background');
var setTheme = require('./theme');

function setTitle() {
  document.title = moment().format('YYYY–M–D');
}

function setHighlight(resp) {
  var highlight = resp.highlight;
  var checkbox = document.querySelector('input[name="highlight"]');

  if (highlight) {
    document.body.classList.add('highlight');
    checkbox.setAttribute('checked', true);
  }

  checkbox.addEventListener('change', function(e) {
    chrome.storage.sync.set({
      highlight: e.currentTarget.checked
    });

    document.body.classList.toggle('highlight');
  }, true);
}

function setUnsplash(resp) {
  var unsplash = resp.unsplash;
  var checkbox = document.querySelector('input[name="unsplash"]');

  if (unsplash !== false) {
    setBackground();
  } else {
    checkbox.removeAttribute('checked');
  }

  checkbox.addEventListener('change', function(e) {
    var bg;
    chrome.storage.sync.set({
      unsplash: e.currentTarget.checked
    });

    if (e.currentTarget.checked) {
      setBackground();
    } else if (bg = document.querySelector('.bg')) {
      bg.remove();
    }
  }, true);
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
  var body = document.body;
  var elem = document.querySelector('.controls .about');
  elem.addEventListener('click', function(e) {
    e.preventDefault();
    body.classList.toggle('show-about');
  });

  document.body.addEventListener('keyup', function(e) {
    if (e.keyCode === 27) {
      body.classList.remove('show-about');
    }
  });
}

function updateVersion() {
  var elem = document.getElementById('ext-version');
  elem.innerText = 'v' + version;
}

setTheme();

document.addEventListener('DOMContentLoaded', function() {
  React.renderComponent(
    Calendar({}),
    document.getElementById('calendar')
  );

  setTitle();
  chrome.storage.sync.get('highlight', setHighlight);
  chrome.storage.sync.get('unsplash', setUnsplash);
  updateVersion();
  handleThemeClick();
  handleAboutClick();
});
