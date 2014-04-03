module.exports = makeJade;

function makeJade(root){
  return function(req, res, next){
  var fs = require('fs'),
      path = require('path'),
      jade = require('jade');
  
  if (path.extname(req.url) === '.html'){
    fs.readFile(root + req.url, {encoding: "utf-8"}, function(err,data){
      if(!err){
        res.statusCode = 200;
	res.end(data);
      } else {  // *.html doesn't exist
        var jadePath = path.join(
	                 root, path.basename(req.url, '.html')
			) + '.jade';
	// try to read *.jade
	fs.readFile(jadePath, {encoding: "utf-8"}, function(err, data) {
	  if(!err) { // *.jade exists
	    jade.render(data, {}, function(err, html) {
	      if (err) throw err;
	      res.statusCode = 200;
	      res.end(html);
	    })
	  } else { // no *.html or *.jade
	      res.statusCode = 404;
	      res.end();
	    }
        });
       }
      });
    } else { // not requesting a HTML file
        next();
      }
  };
};
