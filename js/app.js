/* FEND - Project 5 - Neighborhood Map 
   Scott Stubbs December 2015 
   use Milton, GA / North Atlanta as the center of the map */

var $wikiElem = $('#wikipedia-links');

//constructor function for a location object
var Location = function(data) {
	this.marker = new google.maps.Marker({
		title: data.title,
		position: data.latLng,
		address: data.address,
		url: data.url,
		icon: data.iconImage,
		draggable: false,
		animation: google.maps.Animation.DROP,
		visible: true,
		highlight: ko.observable(false)
	});
};

var Model = {
	miltonCenter: {lat: 33.931375, lng: -84.381658},
	markers: [
	    {
	      	title: 'Coca Cola',
			latLng: {lat: 33.771126, lng: -84.396454},
			address: '606-608 Luckie St NW<br>Atlanta, GA 30313',
			url: 'https://www.worldofcoca-cola.com/',
			iconImage: 'img/cola.jpg'
		},
		{
			title: 'AMC',
			latLng: {lat: 34.048134, lng: -84.296139},
			address:'North Point Mall, 4500 North Point Cir, Alpharetta, GA 30022',
			url: 'https://www.amctheatres.com/movie-theatres/atlanta/amc-north-point-mall-12',
			iconImage: 'img/movie.jpg'
		},
		{
			title:	'Turner Field',
			latLng: {lat: 33.735067, lng: -84.38999433}, 
			address: '755 Hank Aaron Dr SE<br>Atlanta, GA 30315',
			url: 'http://atlanta.braves.mlb.com/atl/ballpark/',
			iconImage: 'img/baseball.png'
		},
		{
			title:	'Georgia Aquarium',
			latLng: {lat: 33.763627, lng: -84.395121},
			address: '225 Baker St NW<br>Atlanta, GA 30313',
			url: 'http://www.georgiaaquarium.org/',
			iconImage: 'img/fish.png'
		},
		{
			title:	'Six Flags Over Georgia',
			latLng: {lat: 33.768570, lng: -84.550910},
			address: '275 Riverside Pkwy<br>Austell, GA 30168',
			url: 'https://www.sixflags.com/overgeorgia',
			iconImage: 'img/rollercoaster.png'
		},
		{	
			title:	'Lake Lanier Islands',
			latLng: {lat: 34.177871, lng: -84.030111},
			address: '7000 LANIER ISLANDS PARKWAY<br>BUFORD, GA 30518',
			url: 'http://www.lanierislands.com/',
			iconImage: 'img/waterski.jpg'
		},
		{
			title: 'The Georgia Dome',
			latLng: {lat: 33.757694, lng: -84.400625},
			address: '1 Georgia Dome Dr.<br>Atlanta, GA 30313',
			url: 'http://www.gadome.com/',
			iconImage: 'img/football.jpg'
		},
		{
			title: 'Echelon Golf Club',
			latLng: {lat: 34.197036, lng: -84.286404},
			address: '201 Traditions Dr.<br>Alpharetta, GA 30004',
			url: 'http://www.echelongolf.com/',
			iconImage: 'img/golf.png'
		},
		{
			title: "Hawk's Ridge Golf Club",
			latLng: {lat: 34.258384, lng: -84.281266},
			address: '1100 Hawks Ridge Golf Club<br>Ball Ground, GA 30107',
			url: 'http://www.hawksridge.com/',
			iconImage: 'img/golf.png'
		},
		{
			title: 'In Your Dreams Farm',
			latLng: {lat: 34.200007, lng: -84.311100},
			address: '17875 Birmingham Hwy<br>Alpharetta, GA 30004',
			url: 'https://www.facebook.com/In-Your-Dreams-Farm-325164227564058/',
			iconImage: 'img/horse.png'
		}
	]
};

var viewModel = function () {
	var self = this; 
	var map; // the google map object
	self.placeList = ko.observableArray([]); // list of location objects.
	self.fred = ko.observableArray([
		{letter: "q"},
		{letter: "r"},
		{letter: "s"},
		{letter: "t"}
	]);

	//for each item in the modle array create new locatoin object in the placeList array.
	var i = 0;
	Model.markers.forEach(function(myMarker) {
		console.log('myMarker.title : ' + myMarker.title);
		self.placeList.push(new Location(myMarker));
		console.log('self.placeList()[i++].marker.title : ' + self.placeList()[i++].marker.title);
		//fred.push(myMarker.title);
		/*try to throw a random listener in there I think.
	  	placeList()[i++].marker.addListener('click', function() {
			self.toggleBounce(marker);
		});*/
	});

	this.searchString = ko.observable('');

	//this fucntion will update the visible property of the searchList based on the searchString 
	this.processFilter = function(bob){
		placeList().forEach(function(markerItem){

			/* Sample taken from sample http://opensoul.org/2011/06/23/live-search-with-knockoutjs/
			use the indexOf() to search for the searchString within each of the markerList items.  The visible marker will set
			how / if the marker will display.  */

			if (self.searchString() == '' || markerItem.marker.title.toLowerCase().indexOf(self.searchString().toLowerCase()) >= 0) {
				markerItem.marker.setVisible(true);
			} else {
				markerItem.marker.setVisible(false);
			}
		});
	
		/* after all of the flags have been updated then trigger a change 
		   to the markerList so that it will display */
		var tempList = ko.observableArray(placeList());
		placeList([]); //clear the current placeList
		for (var x=0; x < tempList().length; x++){
		    placeList.push(tempList()[x]); // build it back up
		};
	};

	var initMap = function () {
			//render the inital map
		  	map = new google.maps.Map(document.getElementById('map-container'), {
		    		center: Model.miltonCenter,
		    		zoom: 10
			});

			/*Plop the makers on the map;
			for each marker in the markerList draw it on the map with .setMap */
			self.placeList().forEach(function(markerItem){
				markerItem.marker.setMap(map);
			});

		    infowindow = new google.maps.InfoWindow({maxWidth: 300});

	}(); // this extra () is needed to force the initMap function to run on applyBindings

/*	//got this from sentry71 code
	self.filteredArray = ko.computed(function() {
    	return ko.utils.arrayFilter(placeList(), function(marker) {
      		return marker.title;
    	});
  	}, self);
*/
	this.toggleBounce = function (clickedMarker) {
		
		/* if the clicked marker is not animated then stop the animation on 
		all of the markers and then bounce the one that is clikced */
		if (clickedMarker.getAnimation() == null) {
			placeList().forEach(function(markerItem){
				markerItem.marker.setAnimation(null);
				markerItem.marker.highlight(false);
			});

			//pan to the clicked marker
			map.panTo(clickedMarker.position);
			
			//bounce the icon
			clickedMarker.setAnimation(google.maps.Animation.BOUNCE);

			/* hightlight the clicked marker on the list */
			clickedMarker.highlight(true);

			//load the wikipedia inforamtion
			self.getWiki(clickedMarker);
		 	
		 	// load the infoWindow
		  	infowindow.close();
		 	var contentString = '<h3>' + clickedMarker.title + '</h3>' + clickedMarker.address + '<br>' + '<a href="' + clickedMarker.url + '">' + clickedMarker.url + '</a>';
		  	infowindow.setContent(contentString);
	   		infowindow.open(map, clickedMarker);
  		}
  		else {
  			/* if the current marker is bouncing then keep the infoWindow displayed, but stop the bouncing of the icon */
  			clickedMarker.setAnimation(google.maps.Animation.NULL);
 		}
  	};

  	this.getWiki = function (clickedMarker){
	    // load wikipedia data
	    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + clickedMarker.title + '&format=json&callback=wikiCallback';
	    var wikiRequestTimeout = setTimeout(function(){
	        $wikiElem.text("failed to get wikipedia resources");
	    }, 8000);

	    $.ajax({
	        url: wikiUrl,
	        dataType: "jsonp",
	        jsonp: "callback",
	        success: function( response ) {
	            var articleList = response[1];
	            for (var i = 0; i < articleList.length; i++) {
	                articleStr = articleList[i];
	                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
	                $wikiElem.prepend('<li><a href="' + url + '">' + articleStr + '</a></li>');
	            };
	            clearTimeout(wikiRequestTimeout);
	        }
	    });
  	};
};

ko.applyBindings(new viewModel());