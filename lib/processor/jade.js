module.exports = makeJade;

function makeJade(root){
  return function(req, res, next){
  var fs = require('fs'),
      path = require('path'),
      jade = require('jade');
  
  if (path.extname(req.url) === '.html'){
    fs.readFile(root + req.url, {encoding: "utf-8"}, function(err,data){
      if(!err){
        res.writeHead(200, {
					"Content-Length": data.toString().length,
					"Content-type": 'text/html; charset=UTF-8'
				});
      	res.end(data);
      } else {  // *.html doesn't exist
        var jadePath = path.join(root, path.basename(req.url, '.html')
																) + '.jade';
	      // try to read *.jade
				fs.readFile(jadePath, {encoding: "utf-8"}, function(err, data) {
	  			if(!err) { // *.jade exists
	    			jade.render(data, {}, function(err, html) {
	      			if (err) throw err;
	      			res.writeHead(200, {
								"Content-Length": html.toString().length,
								"Content-type": 'text/html; charset=UTF-8'
							});
	      			res.end(html);
	    			})
	  			} else { // no *.html or *.jade
	      		res.writeHead(400, {});
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
