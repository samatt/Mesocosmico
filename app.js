var express = require('express');
var PythonShell = require('python-shell');
var app = express();


var bodyParser = require('body-parser');
app.use(bodyParser.json());
// app.use(express.json()); 
// app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html');
});

app.post('/test', function (req, res) {
	console.log("Making recipe...");
	console.log(req.body);
	console.log("Got response: " + res.statusCode);
	console.log(req.params);
	options = {}
	options.scriptPath =  __dirname;
	options.args =[]
	options.args.push(req.body.src);
	options.args.push(req.body.dst)
	
	PythonShell.run('make_recipe.py', options,function (err, results) {
  		if (err) throw err;
  	// console.log('results: %j', results);
  	// console.log(results.join(","))
  		res.send(results.join(","));
	});
  // res.send('Hello World again!');
});

	
var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

