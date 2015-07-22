var patternMaker = function(cats){
	
	
	var params = {
		"icon_viewbox" : "0 0 128 128",
		"w" : 1440,
		"h" : 1000,
		"class":"canvas"
	}

	var svg = Snap("svg");	
	svg.addClass("canvas");

	var ids =['0101','0102','0103','0104','0105','0106','0201','0202','0203']
	
	var idx = 0;
	var icons = [];
	var phrases = [];
	var categories = {};
	var dummy = svg.text(0,0,"A");
	dummy.addClass("text");

	var lineHeight = 80;
	parseCSV(cats);
	function parseCSV(data){
		// rows = data.split("\n");
		rows = data.replace(/\n/g,'#').split('#');

		for (i in rows){
			cols = rows[i].split(",");
			categories[cols[0].toString()] = cols[1];
		}
		// console.log(Object.keys(categories));
	}
	function shuffleArray(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	    return array;
	}

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	
	function isLongEnough(line){

		dummy.attr({text:line})
		//FIXME: Make dynamic instead of hard coding width

		return dummy.node.getBBox().width > document.getElementById("svg").width.baseVal.value ?true:false;
	}

	function drawIcon(icon,i,j){
		// var xpos = i*200;
		var xpos = i*getRandomInt(180,200);
		var ypos = j*128;
		icon.attr({
			x: xpos,
			y: ypos,
			class:"test"
		})		

	}

	function drawText(j,line){

		ypos = Math.ceil(j*lineHeight);
		// console.log(line);
		var text = svg.text(0, ypos, line);
		text.attr({
				'x': 0,
				'y' : ypos,
				// 'font-size': 150,
				"class":"text"
		});

	}
	function drawTextGrid(){
		var w = document.getElementById("svg").width.baseVal.value;
		var h = document.getElementById("svg").height.baseVal.value;
		var phrase_idx = 0;
		var rows = Math.ceil(h/lineHeight) +1;

		for (var j = 0; j < rows; j++) {
			
			shuffled = shuffleArray(phrases);
			var line = []
			for (var i = 0; i < shuffled.length; i++) {
				
				line.push(phrases[i])
				var l = line.join(" ").toUpperCase();
				if(isLongEnough(l)){
					
					drawText(j,l);
					break;
				}
				
			};
		}
	}
	function drawIcons(){
		var w = document.getElementById("svg").width.baseVal.value;
		var h = document.getElementById("svg").height.baseVal.value;
		
		
		// var textBBox =  getLetterBBox("!");

		var icon_w = 200;
		var icon_h = 200;
		var icon_idx = 0;
		var rows = Math.floor(w/icon_w);
		var cols = Math.floor(h/icon_h) ;
		var shuffled = shuffleArray(icons);
		for (var j = 0; j < cols; j++) {
			for (var i = 0; i < rows; i++) {
				
				//Prevents duplicate
				if(i ==0 && j==0){
					continue;
				}

				//DEBUG 

				var xpos = i*icon_w +icon_w/2 ;
				var ypos = j*icon_h +icon_h/2;
				var c = svg.circle(xpos, ypos, 2);
				c.attr({
					// 'fill':'none',
					'stroke':'black'
				})
				//DEBUG 
				rand = getRandomInt(1,100);
				
				if ( rand === 1){
					console.log(rand)
					// break;
					continue;
				}

				if(icon_idx < shuffled.length-1){

					drawIcon(shuffled[icon_idx],i,j);
					icon_idx++;	
				}
				
				
			};
		};

	}

	function cb(loadedFragment){

		svg.append( loadedFragment );
		var elId = "#Layer";

		// phrases.push(categories[ids[idx]]);
		elId += ids[idx].replace(/0/g,"_");
		
		var el = svg.select(elId);
		icons.push(el);
		
		if(idx < ids.length-1){
			idx = idx +1 ;
			Snap.load("http://localhost:3000/getsvg?"+ids[idx],cb)	

		}
		else{
			drawIcons();
		}
	}

	var loadIcons = function(iconsToLoad){
		ids = iconsToLoad || ids ;
		// console.log(Object.keys(categories);
		for (var i = 0; i < ids.length; i++) {
			phrases.push(categories[ids[i]]);
		};

		drawTextGrid();
		Snap.load("http://localhost:3000/getsvg?"+ids[idx],cb);

	}
	return {
		svg:svg,
		loadIcons:loadIcons
	};
};