var patternMaker = function(cats,svgElId){
	
	
	var params = {
		"icon_viewbox" : "0 0 128 128",
		"class":"canvas"
	}
	var url = "http://45.55.165.85:3000/getsvg?";
	// var url = "http://localhost:3000/getsvg?";
	var svg = Snap(svgElId);	
	// svg.addClass("canvas");
	
	//SVG Params
	var width = document.getElementById(svgElId).width.baseVal.value;
	var height = document.getElementById(svgElId).height.baseVal.value;
	
	//Icons Params
	var i_w = 128;
	var i_h = 128;
	var i_rows = Math.ceil(width/i_w)  ;
	var i_cols = Math.ceil(height/i_h)  ;

	var all_ids = ['0101','0102','0103','0104','0105','0106','0201','0202','0203','0204','0205','0206','0207','0208','0209','0210','0301','0302','0303','0304','0305','0306','0307','0401','0402','0403','0404','0405','0406','0407','0408','0409','0410','0501','0502','0503','0504','0505','0506','0507','0508','0509','0510','0511','0601','0602','0603','0604','0701','0702','0703','0704','0705','0706','0707','0708','0709','0710','0711','0712','0713','0714','0801','0802','0803','0804','0805','0806','0807','0808','0809','0810','0811','0812','0813','0814','0901','0902','0903','0904','0905','0906','0907','0908','0909','0910','1001','1002','1003','1004','1005','1006','1007','1008']
	var sel_ids = [];
	var css_countries = ["chn","usa","jpn","fra",'are',"nld","gbr","mex","ind","aus","bra","tur","rus"]
	//Text Params
	var t_Height = 130;
	var t_rows = Math.ceil(height/t_Height) +1;
	
	var idx = 0;
	
	var refIcons =[];
	var icons = [];
	var allText = [];

	var phrases = [];
	var categories = {};
	var fragments = {}
	var dummy = svg.text(0,0,"A");
	dummy.addClass("text");
	var src = "default";
	var dst = "";

	
	function parseCSV(data){
		if(categories.length > 0){
			console.log("Categories already loaded");
			return;
		}
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
		// var rect = svg.rect(0, ypos+5, width,130);
		// if(j %2){
		// 	rect.attr({"fill":"blue"});	
		// }
		// else{
		// 	rect.attr({"fill":"red"});		
		// }
		text.attr({
				'x': 0,
				'y' : ypos,
		});
		text.addClass("font");
		// if(src !== ""){
			
			
		// }
		if(css_countries.indexOf(src) == -1){
			text.addClass("default-font")
		}
		else{
			text.addClass(src+"-font")		
		}
		
		allText.push(text);
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
		var xpos = i*i_w;
		// var xpos = i*getRandomInt(180,200);
		var ypos = j*i_h;
		icon.attr({
			x: xpos,
			y: ypos+15,
			width : "100px",
			height: "100px",
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
				// rand = getRandomInt(1,10);
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
		if(Object.keys(fragments).indexOf(index) == -1){
			console.log("MISSING FRAGMENT! "+ index);
			return
		}
    	svg.append(loadedFragment);
    	var elId = "#Layer_";
    	elId += index;
    	var el = svg.select(elId);
    	el.attr({"opacity":'0'});
		refIcons.push(el);
    	if(el){
    		el_new = el.clone();	
	    	elId += "_"+g_idx;
	    	if(el_new){
	    		el_new.attr({"id":elId})
	    		el_new.attr({"opacity":'1'});
	    		icons.push(el_new);	
	    	}
    	}
    	else{
    	}
    	
    }
    function populateIcons(){
    	var g_idx =0;
		for (var j = 0; j < i_cols; j++) {
			for (var i = 0; i < i_rows; i++) {
				var f_ids = Object.keys(fragments)
				var f_idx = getRandomInt(0,f_ids.length);
				var f = f_ids[f_idx];
					// console.log(fragments[f].node)
				addIcon(fragments[f],f,g_idx.toString());
				g_idx++;
			}
		}
    }
	
    function cb_random(loadedFragment){
		fragments[all_ids[idx].toString()] = loadedFragment;	
		if(idx < all_ids.length-1){
			idx = idx +1 ;
			Snap.load(url+all_ids[idx],cb_random)	
		}
		else{
			populateIcons();
			drawIcons();
		}
    }

    function cb_selection(loadedFragment){
		fragments[sel_ids[idx].toString()] = loadedFragment;	
		if(idx < sel_ids.length-1){
			idx = idx +1 ;
			Snap.load(url+sel_ids[idx],cb_selection)	
		}
		else{
			populateIcons();
			drawIcons();
		}
    }

	function clear(){
		for (var i = 0; i < icons.length; i++) {
			icons[i].remove();
		};
		for (var i = 0; i < allText.length; i++) {
			allText[i].remove();
		};
		for (var i = 0; i < refIcons.length; i++) {
			refIcons[i].remove();
		};
		icons = [];
		allText = [];
		refIcons = [];
		fragments = {};
		idx = 0;		
	}

	var generateFromList = function(iconsToLoad,srcCountry,dstCountry){
		if(src === "default"){
			svg.removeClass("default");	
		}

		if(css_countries.indexOf(srcCountry) === -1){
			svg.addClass("default");
		}
		else{
			svg.removeClass(src);	
			src = srcCountry;
			svg.addClass(src);	
		}
		
		// dst = dstCountry;
		sel_ids = [];
		for (var i = 0; i < iconsToLoad.length; i++) {
			// console.log(ids.indexOf(iconsToLoad[i]))
			if(all_ids.indexOf(iconsToLoad[i]) !== -1){
				// console.log(iconsToLoad[i] + " exists");
				sel_ids.push(iconsToLoad[i])
			}
		};
		console.log("drawing : "+ sel_ids.length);
		console.log("ignoring : "+ (all_ids.length - sel_ids.length));
		// console.log(sel_ids);
		phrases = []
		for (var i = 0; i < sel_ids.length; i++) {
			phrases.push(categories[sel_ids[i]]);
		};
		drawTextGrid();
		Snap.load(url+sel_ids[idx],cb_selection);
	}

	var generate = function(){
		parseCSV(cats);
		for (var i = 0; i < all_ids.length; i++) {
			phrases.push(categories[all_ids[i]]);
		};
		drawTextGrid();
		svg.addClass(src);
		// src = "default";
		Snap.load(url+all_ids[idx],cb_random);
	}
	return {
		svg:svg,
		generate:generate,
		generateFromList:generateFromList,
		clear:clear
	};
};