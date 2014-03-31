(function() {
  var mini_harp;
  var connect = require('connect');
  var app = connect();
  var body = (new Date()).toISOString();

  module.exports = mini_harp = function(port) {
    if(port === undefined) {
      return (function() {
        console.log("Starting http server on http://localhost:4000");
        app.use(function(req,res) {
          if (req.url === '/current-time') {
	    res.writeHead(200, { 'Content-Type': 'text/plain'});
            res.end(body + "\n");
          }
          else {
	    res.writeHead(404, { 'Content-Type': 'text/plain'});
            res.end("Can't Get " + req.url + "\n");
          }
	}).listen(4000);
      }).call(this);
    }
    else {
      return (function() {
        console.log("Starting http server on http://localhost:" + port);
	app.use(function(req,res) {
	  if (req.url === '/current-time') {
	    res.writeHead(200, { 'Content-Type': 'text/plain'});
	    res.end(body + "\n");
	  }
	  else {
	    res.writeHead(404, { 'Content-Type': 'text/plain'});
	    res.end("Can't Get " + req.url + "\n");
	  }
	}).listen(port);
      }).call(this);
    }
  }
}).call(this);
