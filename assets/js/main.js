var version = require('../../ext/manifest.json').version;
var React = require('react');
var Calendar = require('react-stendig-calendar');
var moment = require('moment');

function renderCalendar() {
  React.renderComponent(
    Calendar({}),
    document.getElementById('calendar')
  );
}

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

var getTheme = new Promise(function(resolve, reject) {
  chrome.storage.sync.get('theme', function(item) {
    resolve(item.theme);
  });
  setTimeout(reject, 3000);
});

getTheme.then(function(theme) {
  if (theme === 'dark') {
    document.body.classList.toggle('dark');
  }
  setTimeout(function() {
    document.body.classList.add('ready');
  }, 1000);
});

document.addEventListener('DOMContentLoaded', function() {
  setTitle();
  chrome.storage.sync.get('highlight', setHighlight);
  renderCalendar();
  updateVersion();
  handleThemeClick();
  handleAboutClick();
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-27099587-6', 'auto');
ga('send', 'pageview', {
  dimension1: 'newtab'
});
