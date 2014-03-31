(function() {
  var mini_harp;
  var connect = require('connect');
  var app = connect();

  module.exports = mini_harp = function(port) {
    if(port === undefined) {
      return (function() {
        console.log("Starting http server on http://localhost:4000");
	app.listen(4000);
      }).call(this);
    }
    else {
      return (function() {
        console.log("Starting http server on http://localhost:" + port);
	app.listen(port);
      }).call(this);
    }
  }
}).call(this);
