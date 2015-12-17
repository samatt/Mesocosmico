var mmFactory = function(i,svgEl){
	
	var icons = i;
	var svg = Snap(svgEl);
	console.log(svg);
	//SVG Params
	var width = document.getElementById(svgEl.replace("#","")).width.baseVal.value;
	var height = document.getElementById(svgEl.replace("#","")).height.baseVal.value;
	// var bg = svg.rect(0,0,width,height);
	// bg.attr({"fill":"red"});
	// console.log(bg);
		//Icons Params

		// scg.appe
	var i_w = 128/4;
	var i_h = 128/4;
	var i_rows = Math.ceil(width/i_w)  ;
	var i_cols = Math.ceil(height/i_h) ;

	var all_ids = [];
	var sel_ids = [];
	var css_countries = ["chn","usa","jpn","fra",'are',"nld","gbr","mex","ind","aus","bra","tur","rus"]
	//Text Params
	var t_Height = 130;
	var t_rows = Math.ceil(height/t_Height) +1;

	var currentGrid = [];
	var icons_load = [];
	var icons_draw = [];
	var icons_names = [];
	var loadIdx = 0;
	var iconsHaveLoaded = false;
	var dummy = svg.text(0,0,"A");
	dummy.addClass("text");
	var src = "default";
	var allText = [];

	// var icon = icons[Object.keys(icons)[0]];
	// Snap.load(icon.url,loadIcon);
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
		return dummy.node.getBBox().width > document.getElementById(svgEl.replace("#","")).width.baseVal.value ?true:false;
	}

	function drawTextGrid(){
		var phrases = [];
		for (var i = 0; i < icons_load.length; i++) {
			
			console.log(icons[icons_load[i]].text);
			phrases.push(icons[icons_load[i]].text);
		};

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
	function drawText(j,line){
		ypos = Math.ceil(j*t_Height);
		var text = svg.text(0, ypos, line);
		text.attr({
				'x': 0,
				'y' : ypos,
		});
		text.addClass("font");
		if(css_countries.indexOf(src) == -1){
			text.addClass("default-font")
		}
		else{
			text.addClass(src+"-font")		
		}
		
		allText.push(text);
	}


	function placeIconName(icon,i,j){
		ypos = Math.ceil(j*t_Height);
		var text = svg.text(0, ypos, line);
		text.addClass("font");
		text.attr({
				'x': 0,
				'y' : ypos,
		});
	}
	function placeIcon(icon,i,j){
		var xpos = i*i_w;
		// var xpos = i*getRandomInt(180,200);
		var ypos = j*i_h;
		// console.log(icon);
		icon.attr({
			x: xpos,
			y: ypos+15,
			width : "30px",
			height: "30px",
			opacity:1
		});
		// icon.attr({
		// 	x: xpos,
		// 	y: ypos+15,
		// 	width : "100px",
		// 	height: "100px",
		// });
	}
	function loadIcon(fragment){

		var id = fragment.select('svg').node.id.replace("Layer_","") +".svg";
		// console.log(id);
		icons[id].fragment = fragment;
		// this.icons_draw.push(id);
		// console.log(this.icons[id]);
		// icons[]
		if(loadIdx < icons_load.length-1){
			loadIdx = loadIdx +1 ;
			Snap.load(icons[icons_load[loadIdx]].url,loadIcon)	
			// console.log(icons_load[loadIdx]);
		}
		else{
			console.log("loaded");
			populateIcons();
			drawIcons();
			// drawIconNames;
			// console.log(svg.innerSVG());
		}
	}

	var drawIconsNames = function(){
		var i_idx = 0;
		var shuffled = shuffleArray(icons_names);	
		// console.log(shuffleArray);	
		for (var j = 0; j < i_cols; j++) {
			for (var i = 0; i < i_rows; i++) {				
				//Prevents duplicate
				if(i ==0 && j==0){
					continue;
				}
				// rand = getRandomInt(1,10);
				// if ( rand === 1){
				// 	console.log(rand)
				// 	// break;
				// 	continue;
				// }

				if(i_idx < shuffled.length-1){
					// console.log(i_idx,shuffled)
					placeIconName(shuffled[i_idx],i,j);
					i_idx++;	
				}
			};
		};
	}

	var drawIcons = function(){
		var i_idx = 0;
		var shuffled = shuffleArray(icons_draw);	
		// console.log(shuffleArray);	
		for (var j = 0; j < i_cols; j++) {
			for (var i = 0; i < i_rows; i++) {				
				//Prevents duplicate
				if(i ==0 && j==0){
					continue;
				}
				// rand = getRandomInt(1,10);
				// if ( rand === 1){
				// 	console.log(rand)
				// 	// break;
				// 	continue;
				// }

				if(i_idx < shuffled.length-1){
					// console.log(i_idx,shuffled)
					placeIcon(shuffled[i_idx],i,j);
					i_idx++;	
				}
			};
		};
	}

	var addIcon = function(i,g_idx){

		var short_id = i.replace(".svg","");
		// console.log(id,index);
		// console.log(this.icons[i]);
		if(Object.keys(icons[i]).indexOf('fragment') < 0){
			console.log("MISSING FRAGMENT! "+ this.icons[i]);
			return
		}
		// console.log(icons[i].fragment.select('svg').svg);
    	svg.append(icons[i].fragment);
    	icons_names.push(i);
    	var elId = "#Layer_";
    	elId += short_id;
    	var el = svg.select(elId);
    	console.log(el);
    	el.attr({"opacity":'0'});
		// refIcons.push(el);
    	if(el){
    		el_new = el.clone();	
	    	elId += "_"+g_idx;
	    	if(el_new){
	    		el_new.attr({"id":elId})
	    		// el_new.attr({"opacity":'1'});
	    		icons_draw.push(el_new);	
	    	}
    	}
    	else{
    		// console.log("didnt find",el);
    	}	
    }

	var populateIcons =function(){
    	var g_idx =0;
		for (var j = 0; j < i_cols; j++) {
			for (var i = 0; i < i_rows; i++) {
				var f_ids = icons_load;
				var f_idx = getRandomInt(0,f_ids.length);
				addIcon(f_ids[f_idx],g_idx.toString());
				g_idx++;
			}
		}
    }

	var pollIcons = function(){

		var haveLoaded = false;
		for (var i = 0; i < this.icons_load.length; i++) {
			var icon_id = this.icons_load[i]+".svg";
			if(Object.keys(this.icons[icon_id]).indexOf('fragment') < 0){
				console.log(this.icons[icon_id].text,"not loaded");
				haveLoaded = false;
			}
		};
		if(haveLoaded){
			this.iconsHaveLoaded = true;
			console.log("Icons have loaded");
		}
		else{
			setTimeout(this.pollIcons,1000)
		}
	}
	
	var LoadTaggedData = function(iconCodes){
		icons_load = [];
		loadIdx = 0;
		for (var i = 0; i < iconCodes.length; i++) {
			var icon_id = iconCodes[i]+".svg";
			if(Object.keys(icons[icon_id]).indexOf('fragment') < 0){
				console.log(icons[icon_id].text,"not loaded")	
				icons_load.push(icon_id);
			}
		}
		var icon = icons[icons_load[loadIdx]]
		Snap.load(icon.url,loadIcon);
	};

	var LoadHSData = function(hsCodes,_src,dst){
		icons_load = [];
		loadIdx = 0;
		src = _src
		for (var i = 0; i < hsCodes.length; i++) {
			var icon_id = hsCodes[i]+".svg";
			if(Object.keys(icons[icon_id]).indexOf('fragment') < 0){
				// console.log(icons[icon_id].text,"not loaded")	
				icons_load.push(icon_id);
			}
		};
		// drawTextGrid();

		// console.log(icons[icons_load[loadIdx]])
		var icon = icons[icons_load[loadIdx]]
		Snap.load(icon.url,loadIcon);
	}

	// return this;
	return {
		svg:svg,
		LoadHSData:LoadHSData
	};
};