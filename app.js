var express = require('express');
var cors = require('cors');
var PythonShell = require('python-shell');
var fs = require('fs');
var app = express();
var url = require('url') 

var bodyParser = require('body-parser');
app.use(cors());

app.use(bodyParser.json()); 
app.use(express.static(__dirname + '/public'));


var categories = loadHSCategories();
var iconsPaths = loadIconPaths();
console.log(iconsPaths)


app.get('/icons',function(req,res){
	res.send(iconsPaths);
});

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
	console.log(rows);
	for (i in rows){
		cols = rows[i].split(",");
		cats[cols[0].toString()] = cols[1];
	}
	return cats;
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
				console.log(categories[code]);
			}
			else{
				icons[files[j]].text = files[j].replace(".svg", "").replace(/[0-9]/g, "");
			}
		}	
	}
	return icons;
}


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

// app.get('/getsvg',function(req,res){
// 	var svg_id = req.body;
// 	console.log(req.url);
// 	svg_id = url.parse(req.url).query
// 	console.log("sending svg");
// 	res.sendFile(__dirname+'/svg/'+svg_id+'.svg');
// })
