var version = require('../../ext/manifest.json').version;
var React = require('react');
var Calendar = require('react-stendig-calendar');
var moment = require('moment');
var setBackground = require('./unsplash-background');

function renderCalendar() {
  React.render(
    React.createElement(Calendar, {}),
    document.getElementById('calendar')
  );
}

function setTitle() {
  var title = document.title;
  document.title = moment().format('YYYY–M–D') + ' | ' + title;
}

function setHighlight() {
  var highlight = localStorage.getItem('highlight');
  var checkbox = document.querySelector('input[name="highlight"]');

  if (highlight) {
    document.body.classList.add('highlight');
    checkbox.setAttribute('checked', true);
  }

  checkbox.addEventListener('change', function(e) {
    if (e.currentTarget.checked) {
      localStorage.setItem('highlight', true);
    } else {
      localStorage.removeItem('highlight');
    }

    document.body.classList.toggle('highlight');
  }, true);
}

function setUnsplash() {
  var unsplash = localStorage.getItem('unsplash');
  var checkbox = document.querySelector('input[name="unsplash"]');

  if (unsplash != false) {
    setBackground();
  } else {
    checkbox.removeAttribute('checked');
  }

  checkbox.addEventListener('change', function(e) {
    var bg;
    localStorage.setItem('unsplash', e.currentTarget.checked);

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
  if (theme === 'light') {
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
  setHighlight();
  setUnsplash();
});
