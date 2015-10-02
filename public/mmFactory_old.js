var mmFactory = function(icons,svgEl){
	
	this.icons = icons;
	this.svg = Snap(svgEl);
	console.log(this.svg);
	//SVG Params
	this.width = document.getElementById(svgEl.replace("#","")).width.baseVal.value;
	this.height = document.getElementById(svgEl.replace("#","")).height.baseVal.value;
		//Icons Params
	this.i_w = 128;
	this.i_h = 128;
	this.i_rows = Math.ceil(this.width/this.i_w)  ;
	this.i_cols = Math.ceil(this.height/this.i_h) ;

	this.all_ids = [];
	this.sel_ids = [];
	this.css_countries = ["chn","usa","jpn","fra",'are',"nld","gbr","mex","ind","aus","bra","tur","rus"]
	//Text Params
	this.t_Height = 130;
	this.t_rows = Math.ceil(height/t_Height) +1;

	this.currentGrid = [];
	this.icons_load = [];
	this.icons_draw = [];
	this.loadIdx = 0;
	this.iconsHaveLoaded = false;

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
	
	function placeIcon(icon,i,j){
		var xpos = i*this.i_w;
		// var xpos = i*getRandomInt(180,200);
		var ypos = j*this.i_h;
		icon.attr({
			x: xpos,
			y: ypos+15,
			width : "100px",
			height: "100px",
		});
	}
	function loadIcon(fragment){
		var id = fragment.select('svg').node.id.replace("Layer_","") +".svg";
		// console.log(this.icons[id]);
		this.icons[id].fragment = fragment;
		// this.icons_draw.push(id);
		// console.log(this.icons[id]);
		// icons[]
		if(this.loadIdx < this.icons_load.length-1){
			this.loadIdx = this.loadIdx +1 ;
			Snap.load(icons[this.icons_load[this.loadIdx]].url,loadIcon)	
		}
		else{
			console.log("loaded");
			this.populateIcons();
			this.drawIcons();
		}
	}

	this.drawIcons = function(){
		var i_idx = 0;
		var shuffled = shuffleArray(this.icons_draw);		
		for (var j = 0; j < this.i_cols; j++) {
			for (var i = 0; i < this.i_rows; i++) {				
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

	this.addIcon = function(i,g_idx){

		var short_id = i.replace(".svg","");
		// console.log(id,index);
		// console.log(this.icons[i]);
		if(Object.keys(this.icons[i]).indexOf('fragment') < 0){
			console.log("MISSING FRAGMENT! "+ this.icons[i]);
			return
		}
		console.log(i);
    	svg.append(this.icons[i].fragment);
    	var elId = "#Layer_";
    	elId += short_id;
    	var el = svg.select(elId);
    	el.attr({"opacity":'0'});
		// refIcons.push(el);
    	if(el){
    		el_new = el.clone();	
	    	elId += "_"+g_idx;
	    	if(el_new){
	    		el_new.attr({"id":elId})
	    		el_new.attr({"opacity":'1'});
	    		this.icons_draw.push(el_new);	
	    	}
    	}
    	else{
    	}
    	
    }

	this.populateIcons =function(){
    	var g_idx =0;
		for (var j = 0; j < i_cols; j++) {
			for (var i = 0; i < i_rows; i++) {
				var f_ids = this.icons_load;
				var f_idx = getRandomInt(0,f_ids.length);
				// var f = this.icons[f_ids[f_idx]].fra;
					// console.log(f_ids)
					// console.log(f_ids)
				addIcon(f_ids[f_idx],g_idx.toString());
				g_idx++;
			}
		}
    }

	this.pollIcons = function(){

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

	this.LoadHSData = function(hsCodes,src,dst){
		this.icons_load = [];
		this.loadIdx = 0;
		for (var i = 0; i < hsCodes.length; i++) {
			var icon_id = hsCodes[i]+".svg";
			if(Object.keys(this.icons[icon_id]).indexOf('fragment') < 0){
				// console.log(this.icons[icon_id].text,"not loaded")	
				this.icons_load.push(icon_id);
			}
		};
		// console.log(this.icons_load[this.loadIdx])
		var icon = icons[this.icons_load[this.loadIdx]]
		Snap.load(icon.url,loadIcon);
	}

	return this;
};