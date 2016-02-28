/* FEND - Project 5 - Neighborhood Map 
   Scott Stubbs Original Creation : December 2015 
   use Milton, GA - North Atlanta as the center of the map 

   2/28/2016 - ss made several addtional updates to change this is object orented per recommendation from instructor
*/

var $wikiElem = $('#wikipedia-links');

//constructor function for a location object.  Locations will include markers and infoWindows
var Location = function(data) {

	// setup the markers using the passed in data
	this.marker = new google.maps.Marker({
		title: data.title,
		position: data.latLng,
		address: data.address,
		url: data.url,
		icon: data.iconImage,
		draggable: false,
		Animation: google.maps.Animation.DROP,
		visible: true,
		highlight: ko.observable(false),
	});

    // setup a new infoWindow for each location.
    this.infoWindow = new google.maps.InfoWindow({maxWidth: 300});
};

// this method will toggle anaimation bounce and highlight the list item that is selected.
Location.prototype.toggleLoc = function () {
		if (this.marker.getAnimation() == null) {
			this.marker.setAnimation(google.maps.Animation.BOUNCE);
			this.marker.highlight(true);
		} else {
			this.marker.setAnimation(null);
			this.marker.highlight(false);
		};
		this.infoWindow.open();
};

//this method will stop the bouncing and close the infoWindow
Location.prototype.stopLoc = function() {
	this.marker.setAnimation(null);
	this.marker.highlight(false);
	this.infoWindow.close();
};

//this method pulls in information from wikipedia using the loaction
Location.prototype.getWiki = function () {
    
    // load wikipedia data using this URL
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + this.marker.title + '&format=json&callback=wikiCallback';
    
    // set the time out duration and message
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
		
var Model = {
	miltonCenter: {lat: 33.931375, lng: -84.381658},
	markers: [
	    {
	      	title: 'Coca Cola',
			latLng: {lat: 33.771126, lng: -84.396454},
			address: '606-608 Luckie St NW<br>Atlanta, GA 30313',
			url: 'https://www.worldofcoca-cola.com/',
			iconImage: 'img/cola.jpg',
			visible: true,
			highlight: ko.observable(false)
		},
		{
			title: 'AMC',
			latLng: {lat: 34.048134, lng: -84.296139},
			address:'North Point Mall, 4500 North Point Cir, Alpharetta, GA 30022',
			url: 'https://www.amctheatres.com/movie-theatres/atlanta/amc-north-point-mall-12',
			iconImage: 'img/movie.jpg',
			visible: true,
			highlight: ko.observable(false)
		},
		{
			title:	'Turner Field',
			latLng: {lat: 33.735067, lng: -84.38999433}, 
			address: '755 Hank Aaron Dr SE<br>Atlanta, GA 30315',
			url: 'http://atlanta.braves.mlb.com/atl/ballpark/',
			iconImage: 'img/baseball.png',
			visible: true,
			highlight: ko.observable(false)
		},
		{
			title:	'Georgia Aquarium',
			latLng: {lat: 33.763627, lng: -84.395121},
			address: '225 Baker St NW<br>Atlanta, GA 30313',
			url: 'http://www.georgiaaquarium.org/',
			iconImage: 'img/fish.png',
			visible: true,
			highlight: ko.observable(false)
		},
		{
			title:	'Six Flags Over Georgia',
			latLng: {lat: 33.768570, lng: -84.550910},
			address: '275 Riverside Pkwy<br>Austell, GA 30168',
			url: 'https://www.sixflags.com/overgeorgia',
			iconImage: 'img/rollercoaster.png',
			visible: true,
			highlight: ko.observable(false)
		},
		{	
			title:	'Lake Lanier Islands',
			latLng: {lat: 34.177871, lng: -84.030111},
			address: '7000 LANIER ISLANDS PARKWAY<br>BUFORD, GA 30518',
			url: 'http://www.lanierislands.com/',
			iconImage: 'img/waterski.jpg',
			visible: true,
			highlight: ko.observable(false)
		},
		{
			title: 'The Georgia Dome',
			latLng: {lat: 33.757694, lng: -84.400625},
			address: '1 Georgia Dome Dr.<br>Atlanta, GA 30313',
			url: 'http://www.gadome.com/',
			iconImage: 'img/football.jpg',
			visible: true,
			highlight: ko.observable(false)
		},
		{
			title: 'Echelon Golf Club',
			latLng: {lat: 34.197036, lng: -84.286404},
			address: '201 Traditions Dr.<br>Alpharetta, GA 30004',
			url: 'http://www.echelongolf.com/',
			iconImage: 'img/golf.png',
			visible: true,
			highlight: ko.observable(false)
		},
		{
			title: "Hawk's Ridge Golf Club",
			latLng: {lat: 34.258384, lng: -84.281266},
			address: '1100 Hawks Ridge Golf Club<br>Ball Ground, GA 30107',
			url: 'http://www.hawksridge.com/',
			iconImage: 'img/golf.png',
			visible: true,
			highlight: ko.observable(false)
		},
		{
			title: 'In Your Dreams Farm',
			latLng: {lat: 34.200007, lng: -84.311100},
			address: '17875 Birmingham Hwy<br>Alpharetta, GA 30004',
			url: 'https://www.facebook.com/In-Your-Dreams-Farm-325164227564058/',
			iconImage: 'img/horse.png',
			visible: true,
			highlight: ko.observable(false)
		}
	]
};

var viewModel = function () {
	var self = this; 
	var map; // the google map object
	var lastLocItem = null; //used to store the last clicked location
	self.placeList = ko.observableArray([]); // list of location objects.
	self.searchString = ko.observable(''); // the filter text entered by the user

	//Populate the ko placeList observable array, 
	//for each item in the Model array create new locattion object in the placeList array.
	Model.markers.forEach(function(myMarker) {
		self.placeList.push(new Location(myMarker));
	});

	//render the inital map
  	map = new google.maps.Map(document.getElementById('map-container'), {
    		center: Model.miltonCenter,
    		zoom: 10
	});

	// for each Location setup the markers and the infoWindow
	self.placeList().forEach(function(locItem){

		// drop the marker
		locItem.marker.setMap(map);

		// add the click event to the marker
		locItem.marker.addListener('click', function () {
			if (lastLocItem !== null) {
				lastLocItem.stopLoc(); //stop the last clicked one
				lastLocItem.infoWindow.close() //close the last infoWindow
			};
			locItem.toggleLoc(); // togole the current clikced one
			locItem.infoWindow.open(map, locItem.marker);
			//TODO locItem.getWiki();			
			
			lastLocItem = locItem; // store the current into last
			map.panTo(locItem.marker.position);
			locItem.marker.setMap(map);
		});

		// load the inforWindow Content
		var contentString = '<h3>' + locItem.marker.title + '</h3>' + locItem.marker.address + '<br>' + '<a href="' + locItem.marker.url + '">' + locItem.marker.url + '</a>';
	  	locItem.infoWindow.setContent(contentString);
	});

	//called when the one of the list items is clicked
	self.toggleBounce = function (locItem) {
		if (lastLocItem !== null) {
			lastLocItem.stopLoc();
			locItem.infoWindow.close();
		};
		locItem.toggleLoc();
		locItem.infoWindow.open(map, locItem.marker);
		lastLocItem = locItem;

		//pan to the clicked marker
		map.panTo(locItem.marker.position);
		locItem.marker.setMap(map);
  	};
  	
  	//this fucntion will update the visible property of the searchList based on the searchString 
    self.processFilter = function(){
		self.placeList().forEach(function(locItem){
			//The visible property of the marker will set if the marker will display.  */
			if (self.searchString() == '' || locItem.marker.title.toLowerCase().indexOf(self.searchString().toLowerCase()) >= 0) {
				locItem.marker.setVisible(true);
			} else {
				locItem.marker.setVisible(false);
			}
		});

		//trigger a change to the placeList array so it will display on the screen
		var tempList = ko.observableArray(self.placeList());
		self.placeList([]);
		for (var x=0; x < tempList().length; x++){
		    self.placeList.push(tempList()[x]);
		};
	};
}
ko.applyBindings(new viewModel());