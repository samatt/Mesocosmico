<<<<<<< HEAD
	var express = require('express');
var cors = require('cors');
var PythonShell = require('python-shell');
var fs = require('fs');
=======
var express = require('express');
var cors = require('cors');
var PythonShell = require('python-shell');
>>>>>>> 4ee3c7e02b4a9029c5afb3407fecf3d6e169617f
var app = express();
var url = require('url') 

var bodyParser = require('body-parser');
app.use(cors());

<<<<<<< HEAD
app.use(bodyParser.json()); 
app.use(express.static(__dirname + '/public'));


var categories = loadHSCategories();
var iconsPaths = loadIconPaths();
var tagged = loadTaggedIcons();
// console.log(tagged)


app.get('/icons',function(req,res){
	res.send(iconsPaths);
});

app.post('/country',function(req,res){

	console.log("Getting icon codes for...");
	// console.log(req.body);
	console.log("Got response: " + res.statusCode);
	// console.log(req.params);
	
	console.log(tagged[req.body.country])
	res.send(tagged[req.body.country]);

=======
app.use(bodyParser.json());
// app.use(express.json()); 
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html');
});

app.get('/texture', function (req, res) {
  res.sendFile(__dirname+'/index_alt.html');
});


// app.get('/getcategoriescsv', function (req, res) {
//   res.sendFile(__dirname+'/inputs/hs_classification_list.csv');
// });
// app.get('/countries.css',function(req,res){
// 	res.sendFile(__dirname+'/css/countries.css');
// })

// app.get('/main.css',function(req,res){
// 	res.sendFile(__dirname+'/css/main.css');
// })

// app.get('/containerDecoration.png',function(req,res){
// 	res.sendFile(__dirname+'/imgs/containerDecoration.png');
// })


// app.get('/categories', function (req, res) {
//   res.sendFile(__dirname+'/inputs/hs_categories.json');
// });

app.get('/getsvg',function(req,res){
	var svg_id = req.body;
	console.log(req.url);
	svg_id = url.parse(req.url).query
	console.log("sending svg");
	res.sendFile(__dirname+'/svg/'+svg_id+'.svg');
>>>>>>> 4ee3c7e02b4a9029c5afb3407fecf3d6e169617f
})

app.post('/gettradeicons',function(req,res){

	console.log("Getting icon codes for...");
	console.log(req.body);
	console.log("Got response: " + res.statusCode);
	console.log(req.params);

	options = {}
	options.scriptPath =  __dirname;
	options.args =[]
	options.args.push("icons");
	options.args.push(req.body.src);
	options.args.push(req.body.dst)
<<<<<<< HEAD
	var path = '/python/make_recipe.py';
	PythonShell.run(path, options,function (err, results) {
  		if (err){
  			res.send("Bogus");
  			console.log(err);
  		} 
  		else{

  			res.send(results);	
  		}
	});
})

function loadHSCategories(){
	var cats = {};
	buf = fs.readFileSync(__dirname+"/public/hs_classification_list.csv", "utf8");
	
	rows = buf.replace(/\r/g,'').replace(/\n/g,'#').split('#');
	// console.log(rows);
	for (i in rows){
		cols = rows[i].split(",");
		cats[cols[0].toString()] = cols[1];
	}
	return cats;
}

function loadTaggedIcons(){
	var icons = {};
	var iconRootPath = __dirname+'/public/tagged_icons.csv';
	var data = fs.readFileSync(iconRootPath, 'utf8');

	var rows = data.split("\r\n");
	var tagged = {}
	for (var i = 0; i < rows.length; i++) {
		var cols = rows[i].split(",");
		// console.log(cols);
		var country = cols.splice(0,1)[0];
		tagged[country] = [];
		for (var j = 0; j < cols.length; j++) {

			if(typeof iconsPaths[cols[j]+".svg"] == "undefined"){
				console.log(cols[j]);
			}
			else{
				if(cols[j] =="2710"){
					// console.log("here")
				}
				tagged[country].push(cols[j]);
			}
		};
	};
	return tagged
}
function loadIconPaths(){
	var icons = {};
	var iconRootPath = __dirname+'/public/svg';
	var folders = fs.readdirSync(iconRootPath);
	if(folders.indexOf(".DS_Store") >= 0)folders.splice(folders.indexOf(".DS_Store"),1)
	
	for (var i = 0; i < folders.length; i++) {
		var files = fs.readdirSync(iconRootPath+"/"+folders[i]);
		if(files.indexOf(".DS_Store") >= 0)files.splice(files.indexOf(".DS_Store"),1)
		// paths[folders[i]] = icons;

		for(var j =0 ; j < files.length; j++){
			var url = '/svg'+'/' +folders[i]+'/'+files[j];
			icons[files[j]] = {}
			icons[files[j]].url = url;
			icons[files[j]].category = folders[i];
			
			if(folders[i] == 'HS Icons'){

				var code = files[j].replace(".svg","");
				icons[files[j]].text = categories[code];
				// console.log(categories[code]);
			}
			else{
				icons[files[j]].text = files[j].replace(".svg", "").replace(/[0-9]/g, "");
			}
		}	
	}
	return icons;
}
=======
	
	PythonShell.run('make_recipe.py', options,function (err, results) {
  		if (err){
  			res.send("Bogus");
  			// throw err;	
  		} 
  		else{
  			res.send(results);	
  		}
  		
  		// console.log(results)
	});
})

// app.getIDs('/ids',function(){

// })

app.get('/patternMaker.js',function(req,res){
	var svg_id = req.body;
	console.log(req.url);
	svg_id = url.parse(req.url).query
	res.sendFile(__dirname+'/patternMaker.js');
})

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

>>>>>>> 4ee3c7e02b4a9029c5afb3407fecf3d6e169617f


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

<<<<<<< HEAD
// app.get('/getsvg',function(req,res){
// 	var svg_id = req.body;
// 	console.log(req.url);
// 	svg_id = url.parse(req.url).query
// 	console.log("sending svg");
// 	res.sendFile(__dirname+'/svg/'+svg_id+'.svg');
// })
=======
>>>>>>> 4ee3c7e02b4a9029c5afb3407fecf3d6e169617f
