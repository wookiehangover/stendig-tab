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
  var title = document.title;
  document.title = moment().format('M/D') + '|' + title;
}

function handleThemeClick() {
  var elem = document.querySelector('.controls .theme');
  elem.addEventListener('click', function(e) {
    e.preventDefault();
    var body = document.body;
    body.classList.toggle('dark');

    var theme = body.classList.contains('dark') ? 'dark': 'light';
    localStorage.setItem('theme', theme);
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

document.addEventListener('DOMContentLoaded', function() {
  var theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.toggle('dark');
  }
  setTimeout(function() {
    document.body.classList.add('ready');
  }, 1000);

  setTitle();
  renderCalendar();
  updateVersion();
  handleThemeClick();
  handleAboutClick();
});
