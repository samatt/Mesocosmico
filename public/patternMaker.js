var patternMaker = function(cats,svgEl,Id){
	
	
	var params = {
		"icon_viewbox" : "0 0 128 128",
		"class":"canvas"
	}
	console.log(Id)
	// var url = "http://45.55.165.85:3000/getsvg?";
	var url = "http://localhost:3000/getsvg?";
	var svg = Snap(svgEl);	
	// svg.attr({"position": 'absolute'});
	
	//SVG Params
	var width = document.getElementById(svgEl.replace("#","")).width.baseVal.value;
	var height = document.getElementById(svgEl.replace("#","")).height.baseVal.value;
	console.log(document.getElementById(svgEl.replace("#","")));
	//Icons Params
	var i_w = 128;
	var i_h = 128;
	var i_rows = Math.ceil(width/i_w)  ;
	var i_cols = Math.ceil(height/i_h)  ;

	// var all_ids = ['0101','0102','0103','0104','0105','0106','0201','0202','0203','0204','0205','0206','0207','0208','0209','0210','0301','0302','0303','0304','0305','0306','0307','0401','0402','0403','0404','0405','0406','0407','0408','0409','0410','0501','0502','0503','0504','0505','0506','0507','0508','0509','0510','0511','0601','0602','0603','0604','0701','0702','0703','0704','0705','0706','0707','0708','0709','0710','0711','0712','0713','0714','0801','0802','0803','0804','0805','0806','0807','0808','0809','0810','0811','0812','0813','0814','0901','0902','0903','0904','0905','0906','0907','0908','0909','0910','1001','1002','1003','1004','1005','1006','1007','1008','1101','1102','1103','1104','1105','1106','1107','1108','1109','1201','1202','1203','1204','1205','1206','1207','1208','1209','1210','1211','1212','1213','1214','1301','1302','1401','1402','1403','1404','1501','1502','1503','1504','1505','1506','1507','1508','1509','1510','1511','1512','1513','1514','1515','1516','1517','1518','1519','1520','1521','1522','1601','1602','1603','1604','1605','1701','1702','1703','1704','1801','1802','1803','1804','1805','1806','1901','1902','1903','1904','1905','2001','2002','2003','2004','2005','2006','2007','2008','2009','2101','2102','2103','2104','2105','2106']
	// var all_ids = ['0101','0102','0103','0104','0105','0106','0201','0202','0203','0204','0205','0206','0207','0208','0209','0210','0301','0302','0303','0304','0305','0306','0307','0401','0402','0403','0404','0405','0406','0407','0408','0409','0410','0501','0502','0503','0504','0505','0506','0507','0508','0509','0510','0511','0601','0602','0603','0604','0701','0702','0703','0704','0705','0706','0707','0708','0709','0710','0711','0712','0713','0714','0801','0802','0803','0804','0805','0806','0807','0808','0809','0810','0811','0812','0813','0814','0901','0902','0903','0904','0905','0906','0907','0908','0909','0910','1001','1002','1003','1004','1005','1006','1007','1008','1101','1102','1103','1104','1105','1106','1107','1108','1109','1201','1202','1203','1204','1205','1206','1207','1208','1209','1210','1211','1212','1213','1214','1301','1302','1401','1402','1403','1404','1501','1502','1503','1504','1505','1506','1507','1508','1509','1510','1511','1512','1513','1514','1515','1516','1517','1518','1519','1520','1521','1522','1601','1602','1603','1604','1605','1701','1702','1703','1704','1801','1802','1803','1804','1805','1806','1901','1902','1903','1904','1905','2001','2002','2003','2004','2005','2006','2007','2008','2009','2101','2102','2103','2104','2105','2106','2201','2202','2203','2204','2205','2206','2207','2208','2209','2301','2302','2303','2304','2305','2306','2307','2308','2309','2401','2402','2403','2501','2502','2503','2504','2506','2507','2508','2509','2510','2511','2512','2513','2514','2515','2516','2517','2518','2519','2520','2521','2522','2523','2524','2525','2526','2527','2528','2529','2530','2601','2602','2603','2604','2605','2606','2607','2608','2609','2610','2611','2612','2613','2614','2615','2616','2617','2618','2619','2620','2621','2701','2702','2703','2704','2705','2706','2707','2708','2709','2710','2711','2712','2713','2714','2715','2716','2801','2802','2803','2804','2805','2806','2807','2808','2809','2810','2811','2812','2813','2814','2815','2816','2817','2818','2819','2820','2821','2822','2823','2824','2825','2826','2827','2828','2829','2830','2831','2832','2833','2834','2835','2836','2837','2838','2839','2840','2841','2842','2843','2844','2845','2846','2847','2848','2849','2850','2851','2852','2853','2901','2902','2903','2904','2905','2906','2907','2908','2909','2910','2911','2912','2913','2914','2915','2916','2917','2918','2919','2920','2922','2923','2924','2925','2926','2927','2928','2929','2930','2931','2932','2933','2934','2935','2936','2937','2938','2939','2940','2941','2942','3001','3002','3003','3004','3005','3006','3101','3102','3103','3104','3105','3201','3202','3203','3204','3205','3206','3207','3208','3209','3210','3211','3212','3213','3214','3215','3301','3302','3303','3304','3305','3306','3307','3401','3402','3403','3404','3405','3406','3407','3501','3502','3503','3504','3505','3506','3507','3601','3602','3603','3604','3605','3606','3607','3701','3702','3703','3704','3705','3706','3707','3801','3802','3803','3804','3805','3806','3807','3808','3809','3810','3811','3812','3813','3814','3815','3817','3818','3819','3820','3821','3822','3823','3824','3825','3901','3902','3903','3904','3905','3906','3907','3908','3909','3910','3911','3912','3913','3914','3915','3916','3917','3918','3919','3920','3921','3922','3923','3924','3925','3926','4001','4002','4003','4004','4005','4006','4007','4008','4009','4010','4011','4012','4013','4014','4015','4016','4017','4101','4102','4103','4104','4105','4106','4107','4108','4109','4110','4111','4112','4113','4114','4115','4201','4202','4203','4204','4205','4206','4301','4302','4303','4304','4401','4402','4403','4404','4405','4406','4407','4408','4409','4410','4411','4412','4413','4414','4415','4416','4417','4418','4419','4420','4421','4422','4501','4502','4503','4504','4601','4602','4701','4702','4703','4704','4705','4706','4707','4801','4802','4803','4804','4805','4806','4807','4808','4809','4810','4811','4812','4813','4814','4815','4816','4817','4818','4819','4820','4821','4822','4823','4902'];
	var all_ids = [];
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
parseIDs(Id);
	
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

	function parseIDs(data){
		if(all_ids.length > 0){
			console.log("Ids already loaded");
			return;
		}

		rows = data.split(" ")
		for (var i = 0; i < rows.length; i++) {
			console.log(rows[i]);
		};
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
		return dummy.node.getBBox().width > document.getElementById(svgEl.replace("#","")).width.baseVal.value ?true:false;
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
		clear();
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
		clear()
		parseCSV(cats);	
		for (var i = 0; i < all_ids.length; i++) {
			console.log(all_ids[i]);
			phrases.push(categories[all_ids[i]]);
		};
		drawTextGrid();
		// svg.addClass(src);
		// Snap.load(url+all_ids[idx],cb_random);

	}
	return {
		svg:svg,
		generate:generate,
		generateFromList:generateFromList,
		clear:clear
	};
};