module.exports = function() {

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

};
