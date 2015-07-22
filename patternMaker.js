var patternMaker = function(cats){
	
	
	var params = {
		"icon_viewbox" : "0 0 128 128",
		"class":"canvas"
	}

	var svg = Snap("svg");	
	svg.addClass("canvas");
	
	//SVG Params
	var width = document.getElementById("svg").width.baseVal.value;
	var height = document.getElementById("svg").height.baseVal.value;
	
	//Icons Params
	var i_w = 128;
	var i_h = 128;
	var i_rows = Math.ceil(width/i_w)  ;
	var i_cols = Math.ceil(height/i_h)  ;
	var ids =['0101','0102','0103','0104','0105','0106','0201','0202','0203']
	
	//Text Params
	var t_Height = 80;
	var t_rows = Math.ceil(height/t_Height) +1;
	
	var idx = 0;
	var icons = [];
	var phrases = [];
	var categories = {};
	var fragments = {}
	var dummy = svg.text(0,0,"A");
	dummy.addClass("text");

	
	function parseCSV(data){
		rows = data.replace(/\n/g,'#').split('#');

		for (i in rows){
			cols = rows[i].split(",");
			categories[cols[0].toString()] = cols[1];
		}
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
		return dummy.node.getBBox().width > document.getElementById("svg").width.baseVal.value ?true:false;
	}

	function drawText(j,line){
		ypos = Math.ceil(j*t_Height);
		var text = svg.text(0, ypos, line);
		text.attr({
				'x': 0,
				'y' : ypos,
				"class":"text"
		});
	}

	function drawTextGrid(){
		for (var j = 0; j < t_rows; j++) {
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
	
	function placeIcon(icon,i,j){
		// var xpos = i*i_w;
		var xpos = i*getRandomInt(180,200);
		var ypos = j*i_h;
		icon.attr({
			x: xpos,
			y: ypos,
			class:"test"
		});
	}

	function drawIcons(){
		var i_idx = 0;
		var shuffled = shuffleArray(icons);		
		for (var j = 0; j < i_cols; j++) {
			for (var i = 0; i < i_rows; i++) {				
				//Prevents duplicate
				if(i ==0 && j==0){
					continue;
				}
				rand = getRandomInt(1,10);
				// if ( rand === 1){
				// 	console.log(rand)
				// 	// break;
				// 	continue;
				// }
				if(i_idx < shuffled.length-1){
					placeIcon(shuffled[i_idx],i,j);
					i_idx++;	
				}
			};
		};
	}

	function addIcon(loadedFragment,index,g_idx){
    	svg.append(loadedFragment);
    	var elId = "#Layer";
    	elId += index.replace(/0/g,"_");
    	var el = svg.select(elId);
    	el_new = el.clone();
    	elId += "_"+g_idx;
    	if(el_new){
    		el_new.attr({"id":elId})
    		icons.push(el_new);	
    	}
    }
    function populateIcons(){
    	var g_idx =0;
		for (var j = 0; j < i_cols; j++) {
			for (var i = 0; i < i_rows; i++) {
				var f_ids = Object.keys(fragments)
				var f_idx = getRandomInt(0,f_ids.length);
				var f = f_ids[f_idx];
				addIcon(fragments[f],f,g_idx.toString());
				g_idx++;
			}
		}
    }
	
    function cb_full(loadedFragment){
		fragments[ids[idx].toString()] = loadedFragment;	
		if(idx < ids.length-1){
			idx = idx +1 ;
			Snap.load("http://localhost:3000/getsvg?"+ids[idx],cb_full)	
		}
		else{
			populateIcons();
			drawIcons();
		}
    }

	function cb(loadedFragment){
		svg.append( loadedFragment );
		var elId = "#Layer";
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

	var generate = function(iconsToLoad){
		parseCSV(cats);
		ids = iconsToLoad || ids ;
		for (var i = 0; i < ids.length; i++) {
			phrases.push(categories[ids[i]]);
		};

		drawTextGrid();
		Snap.load("http://localhost:3000/getsvg?"+ids[idx],cb_full);

	}
	return {
		svg:svg,
		generate:generate
	};
};