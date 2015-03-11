var connect = require('connect');
var fs = require('fs');
var pathname = require('connect-pathname');
var app = connect();

app.use(pathname())
   .use(function openJsonFile(req, res) {
		console.log(req.pathname); // first character is /
		fs.readFile(req.pathname.slice(1) + ".json", 'utf8', function (err, data) {
			console.log(req.pathname.slice(1) + ".json");
			if (err) {
				console.log(err);
				console.log(err.code);
			}
			var db = JSON.parse(data);
			var query = req.url.split("?")[1];
			console.log(data)
			if (query in db) {
				res.end(db[query]);
			} else {
				res.end("Invalid Query");			
			}
		});
	})
    .listen(3000);
