
window.onload = function() {
	
	// *** START - load map from cartodb ***
	/*
	cartodb.createVis('map', 'https://icrc.cartodb.com/api/v2/viz/2c05f200-3ff3-11e3-a2b1-3085a9a9563c/viz.json', {

		shareable: false, 		// add facebook and twitter share buttons.
		title: false, 			// adds a header with the title of the visualization.
		description: false, 	// adds description to the header (as you set in the UI).
		searchControl: false, 	// adds a search control (default: false).
		zoomControl: true, 	// adds zoom control (default: true).
		loaderControl: true, 	// adds loading control (default: true).
		center_lat: 15, 	// latitude where the map is initializated.
		center_lon: 0, 	// longitude where the map is initializated.
		zoom: 2, 				// initial zoom.
		minZoom: 2,
		cartodb_logo: false, 	// default to true, set to false if you want to remove the cartodb logo.
		infowindow: true, 		// set to false if you want to disable the infowindow (enabled by default).
		time_slider: false, 	// show time slider with torque layers (enabled by default)
		layer_selector: false, 	// show layer selector (default: false)
		legends: true, 			// if it's true legends are shown in the map.
		scrollwheel: false, 		// enable/disable the ability of zooming using scrollwheel (default enabled)
		fullscreen: true, 		// if true adds a button to toggle the map fullscreen

		https: true 			// if true forces tiles to be fetched using https. If false it uses the predefined method
		
	}).done(function(vis, layers) {

		//debugger;
		
		// attribution hidden by css
		$(".leaflet-control-attribution").html("");
		
		//vis.getLayers()[0].options.attribution = "";
		//vis.getLayers()[1].options.attribution = "";
		// Set max zoom
		vis.map.set({
			minZoom: 2,
			maxZoom: 20
		});
		
	}).on('error', function(err) {
		alert("Some error occurred loading the map: " + err);
	});
	// Can also be used with $(document).ready()
	*/
	// *** END - load map from cartodb ***


	// *** START - Service events ***
	$("#service-maps").click(function (){ // go to map carousel
		searchMap('');
	});
	$("#service-web").click(function (){ // go to map carousel
		$('html,body').animate({
			scrollTop: $('#portfolio').offset().top
		}, 1000);	
	});
	$(".to-contact").click(function (){ // go to map carousel
		$('html,body').animate({
			scrollTop: $('#contact').offset().top - 60
		}, 1000);	
	});	
	
//	location.reload(true);
}
	// *** END - Service events ***
	
	// *** START - Call to action ***
/*	
	function searchMap(text){
		console.log(text);
		//http://gvacmswb02p.gva.icrc.priv:15000/resourcecentre/page/search?global_merged.sa=0&rss_feed.context=start%253D0%2526q%253D%252528afghanistan%252520%252520%252529%252520AND%252520NOT%252520is_reporting%25253A1%2526nresults%253D10%2526applicationId%253Ddefault%2526lang%253Den%2526logic%253DIntranetDB&rss_feed.r=%2BTop%2Fsource%2Fmaps&q=afghanistan&global_merged.context=start%253D0%2526q%253D%252528afghanistan%252520%252520%252529%252520AND%252520NOT%252520is_reporting%25253A1%2526nresults%253D10%2526applicationId%253Ddefault%2526lang%253Den%2526logic%253DIntranetDB&rss_feed.page=1&global_merged.page=1&global_merged.s=lastmodifieddate&global_merged.r=%2BTop%2Fsource%2Fmaps
		//var linkSearch = "http://search.gva.icrc.priv:15000/resourcecentre/page/search?global_merged.sa=0&rss_feed.context=start%253D0%2526q%253D%252528" + text + "%252520%252520%252529%252520AND%252520NOT%252520is_reporting%25253A1%2526nresults%253D10%2526applicationId%253Ddefault%2526lang%253Den%2526logic%253DIntranetDB&rss_feed.r=%2BTop%2Fsource%2Fmaps&q=" + text + "&global_merged.context=start%253D0%2526q%253D%252528" + text + "%252520%252520%252529%252520AND%252520NOT%252520is_reporting%25253A1%2526nresults%253D10%2526applicationId%253Ddefault%2526lang%253Den%2526logic%253DIntranetDB&rss_feed.page=1&global_merged.page=1&global_merged.s=lastmodifieddate&global_merged.r=%2BTop%2Fsource%2Fmaps";
		var linkSearch = "http://search.gva.icrc.priv:15000/resourcecentre/page/search?cloudview.r=f%2FSource%2Fmaps&cloudview.s=desc%28document_lastmodifieddate%29&q=" + text;
		window.open(linkSearch);
	}
	function handleInput(key,input){
		debugger;
		if(key === 13){
            searchMap(input);
        }

        return false;
	}
	$('#search-input').keypress( function (e){
		handleInput(e.keyCode, $(this).val());
	});
	$('#search-header-input').keypress(function (e){
		handleInput(e.keyCode, $(this).val());
	});
	
	$('#search-btn').click(function (){
		searchMap($( "#search-input" ).val());
	});
	$('#search-header-btn').click(function (){
		searchMap($( "#search-header-input" ).val());
	});/*
	// *** END - Call to action ***
}
*/

 $.ajax({
           type: "POST",
           url: "../../common/auth/index.aspx",
           success: function(result) { 
           	//debugger;             
              console.log(result);
              window["user_id"]=result;
              $('#user_id').html(saludo + window["user_id"]);           
              //debugger;
            },
            error: function(jqXHR, exception) {
            if (jqXHR.status === 0) {
                alert('Not connect.\n Verify Network.');
            } else if (jqXHR.status == 404) {
                alert('Requested page not found. [404]');
            } else if (jqXHR.status == 500) {
                alert('Internal Server Error [500].');
            } else if (exception === 'parsererror') {
                alert('Requested JSON parse failed.');
            } else if (exception === 'timeout') {
                alert('Time out error.');
            } else if (exception === 'abort') {
                alert('Ajax request aborted.');
            } else {
                alert('Uncaught Error.\n' + jqXHR.responseText);
            }
        }
       });
