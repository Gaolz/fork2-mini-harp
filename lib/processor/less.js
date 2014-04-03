module.exports = makeLess;

function makeLess(root) {
 var fs = require('fs'),
     less = require('less'),
     path = require('path');

 return function(req, res, next) {
 	if(path.extname(req.url) === '.css') { //request *.css
	 // try to read *.css
	  fs.readFile(root + req.url, {encoding: 'utf-8'}, function(err, data) {
	    if(!err) { // *.css exists
	      res.writeHead(200, {
		"Content-Length": data.toString().length,
		"COntent-type": 'text/css; charset=UTF-8'
	      });
	      res.end(data);
	    } else { // *.css doesn't exist
		var lessPath = path.join(root, path.basename(req.url, '.css')) + '.less';
		// try to read *.less
		fs.readFile(lessPath, {encoding: 'utf-8'}, function(err, data) {
		  if(!err) { // *.ess exists
		    less.render(data, function(err, css){
		    res.writeHead(200, {
		      "Content-Length": css.toString().length,
		      "COntent-type": 'text/css; charset=UTF-8'
		      });
		    res.end(css);
		    })
		  } else { // no *.css or *.less
		      res.writeHead(404, {});
		      res.end();
			}
		});
	     }
	});
     }
 };
};
