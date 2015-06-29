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

app.get('/categories', function (req, res) {
	console.log("here!")
  res.sendFile(__dirname+'/inputs/hs_categories.json');
});

app.post('/products', function (req, res) {
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
  		res.send(results[0]);
	});
});


app.post('/arms', function (req, res) {
	console.log("Getting arms...");
	console.log(req.body);
	console.log("Got response: " + res.statusCode);
	console.log(req.params);
	options = {}
	options.scriptPath =  __dirname;
	options.args =[]
	options.args.push(req.body.src);
	options.args.push(req.body.dst);
	// options.args.push("jpn");
	// options.args.push("usa");
	options.args.push(2005);
	
	PythonShell.run('get_nisat_arms_data.py', options,function (err, results) {
  		if (err) throw err;
  		console.log("HERE")
  		res.send(results);
	});

});

app.post('/species', function (req, res) {
	console.log("Getting species...");
	console.log(req.body);
	console.log("Got response: " + res.statusCode);
	console.log(req.params);
	options = {}
	options.scriptPath =  __dirname;
	options.args =[]
	options.args.push(req.body.src);
	options.args.push(req.body.dst);
	options.args.push(2005);
	PythonShell.run('get_cites_data.py', options,function (err, results) {
  		if (err) throw err;
  		console.log("HERE")
  		res.send(results);
	});
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

