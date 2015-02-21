var request = require('request');
var imagesLoaded = require('imagesloaded');

function appendImage(src) {
  var img = new Image();
  img.src = src;
  img.className = 'bg';
  imagesLoaded(img).on('done', function() {
    document.body.appendChild(img);
    img.className = 'bg fade-in';

    setTimeout(function() {
      img.classList.remove('fade-in');
    }, 1000);
  });
}

module.exports = function () {
  request({
    method: 'get',
    url: 'https://unsplash-api.herokuapp.com/',
    json: true,
    withCredentials: false
  }, function(err, resp, body) {
    if (err || !(body && body.unsplash) ) {
      // oh well
      return;
    }

    var index = Math.floor(Math.random() * body.unsplash.length);
    var entry = body.unsplash[index];

    if (entry &&
        entry.image &&
        entry.image[0] &&
        entry.image[0].url) {

      var url = entry.image[0].url[0];
      appendImage(url.split('?')[0] + '?w=' + window.outerWidth);
    }
  });
}


