module.exports = function(root) {
  var connect = require('connect');
  var serveStatic = require('serve-static');
  var makeJade = require('./lib/processor/jade.js');
  var makeLess = require('./lib/processor/less.js');
  var path = require('path');
  var app = connect();

  app.use(function(req, res, next) {
    if (req.url === '/current-time') {
      res.end((new Date()).toISOString() + "\n");
    } else if (req.url === '/') {
        req.url += 'index.html';
				next();
      } else {
          var ext = path.extname(req.url);
	  if (ext === '.jade' || ext === '.less') {
	    res.statusCode = 404;
	    res.end();
          } else next();
	 }
  });

  app.use(serveStatic(root));
  app.use(makeJade(root));
  app.use(makeLess(root));

  return app;
}
