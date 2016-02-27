/* FEND - Project 5 - Neighborhood Map 
   Scott Stubbs December 2015 
   use Milton, GA / North Atlanta as the center of the map */

var $wikiElem = $('#wikipedia-links');

//constructor function for a location object
var Location = function(data) {

	this.toggleAnimation = function () {
		console.log('toggle marker : ' + this.marker.title);
		if (this.marker.getAnimation() == null) {
			this.marker.setAnimation(google.maps.Animation.BOUNCE);
			this.marker.highlight = true;
		} else {
			this.marker.setAnimation(null);
			this.marker.highlight = false;
		};
	}
	this.marker = new google.maps.Marker({
		title: data.title,
		position: data.latLng,
		address: data.address,
		url: data.url,
		icon: data.iconImage,
		draggable: false,
		Animation: google.maps.Animation.DROP,
		visible: true,
		highlight: ko.observable(false)
	});
	this.infoW = ko.observable('Pending search...');
};

Location.prototype.getWiki = function () {
    // load wikipedia data
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + clickedMarker.marker.title + '&format=json&callback=wikiCallback';
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
		 	
// load the infoWindow
Location.prototype.infoWindowToggle = function () {
  	infowindow.close();
  	console.log('trying to open the info window');
 	var contentString = '<h3>' + this.marker.title + '</h3>' + this.marker.address + '<br>' + '<a href="' + this.marker.url + '">' + this.marker.url + '</a>';
  	infowindow.setContent(contentString);
	infowindow.open(viewModel.map, this.marker);
};

/*Location.prototype.toggleAnimation = function() {
	console.log('toggle animation : ' + this.marker.title);
	if (this.marker.getAnimation() == null) {
		this.marker.setAnimation(google.maps.Animation.BOUNCE);
		this.marker.highlight = true;
	} else {
		this.marker.setAnimation(null);
		this.marker.highlight = false;
	};
}; */

Location.prototype.stopAnimation = function() {
	console.log('stop animation : ' + this.marker.title);
	this.marker.setAnimation(null);
	this.marker.highlight = false;
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
			iconImage: 'img/horse.png',
		}
	]
};

var viewModel = function () {
	var self = this; 
	var map; // the google map object
	var lastLocItem = null;
	self.placeList = ko.observableArray([]); // list of location objects.
	self.searchString = ko.observable('');

	//for each item in the modle array create new locatoin object in the placeList array.
	var i = 0;
	Model.markers.forEach(function(myMarker) {
		self.placeList.push(new Location(myMarker));
	});

	var initMap = function () {
		//render the inital map
	  	map = new google.maps.Map(document.getElementById('map-container'), {
	    		center: Model.miltonCenter,
	    		zoom: 10
		});

		//Plop the makers on the map; for each marker in the markerList draw it on the map with .setMap
		self.placeList().forEach(function(locItem){
			locItem.marker.setMap(map);
			locItem.marker.addListener('click', function () {
				if (lastLocItem !== null) {
					lastLocItem.stopAnimation(); //stop the last clicked one
				};
				locItem.toggleAnimation(); // togole the current clikced one
				lastLocItem = locItem; // store the current into last
				map.panTo(locItem.marker.position);
				locItem.marker.setMap(map);
			});
		});

	    infowindow = new google.maps.InfoWindow({maxWidth: 300});

	}(); // this extra () is needed to force the initMap function to run on applyBindings

	self.toggleBounce = function (locItem) {
		if (lastLocItem !== null) {
			lastLocItem.stopAnimation();
		};
		locItem.toggleAnimation();
		lastLocItem = locItem;
		locItem.infoWindowToggle();

		//pan to the clicked marker
		map.panTo(locItem.marker.position);
		locItem.marker.setMap(map);
  	};

  	
  	//this fucntion will update the visible property of the searchList based on the searchString 
   self.processFilter = function(bob){
		placeList().forEach(function(markerItem){

			console.log('bob fucntion');
			/* Sample taken from sample http://opensoul.org/2011/06/23/live-search-with-knockoutjs/
			use the indexOf() to search for the searchString within each of the markerList items.  The visible marker will set
			how / if the marker will display.  */

			if (self.searchString() == '' || markerItem.marker.title.toLowerCase().indexOf(self.searchString().toLowerCase()) >= 0) {
				markerItem.marker.setVisible(true);
			} else {
				markerItem.marker.setVisible(false);
			}
		});

	};
}
ko.applyBindings(new viewModel());