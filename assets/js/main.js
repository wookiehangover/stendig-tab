var ob = require('oblique-strategies');
var card = ob.draw();

document.addEventListener('DOMContentLoaded', function() {
  var elem = document.getElementById('strategy');
  elem.innerText = card;
});
