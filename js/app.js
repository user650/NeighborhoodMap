/**
   FEND - Project 5 - Neighborhood Map 
   Scott Stubbs Original Creation : December 2015 
   use Milton, GA - North Atlanta as the center of the map
*/ 

/** 
   Resubmission 2/28/2016 - ss made several addtional updates to change this is object orented per recommendation from instructor
   Resubmission 3/5/2016  - ss Changed the wiki links section to use the observable array 
*/

/** 
	* @constructor Represents a location object which includes a merker and an infoWindow.
	* @param {marker} - goggle marker data used to build the marker portion of the object 
*/
var Location = function(data) {

	/**  Setup the markers using the passed in data*/
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

    /** setup a new infoWindow for each location. */
    this.infoWindow = new google.maps.InfoWindow({maxWidth: 300});
};

/** 
	* @desc This method will toggle anaimation bounce and highlight the list item that is selected.
	* @constructor
*/
Location.prototype.toggleLoc = function () {
		if (this.marker.getAnimation() === null) {
			this.marker.setAnimation(google.maps.Animation.BOUNCE);
			this.marker.highlight(true);
		} else {
			this.marker.setAnimation(null);
			this.marker.highlight(false);
		}
		this.infoWindow.open();
};

/** 
	* @desc This method will stop the bouncing, close the infoWindow and clear the wiki information 
	* @constructor
*/
Location.prototype.stopLoc = function() {
	this.marker.setAnimation(null);
	this.marker.highlight(false);
	this.infoWindow.close();
};

/**
	* @desc this method pulls in information from wikipedia using the loaction
	* @constructor
*/

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

/** 
	* @constructor viewModel performs all the setup and processing required to connect the Model and the View
*/
var viewModel = function () {
	var self = this; 
	var map; // the google map object
	var lastLocItem = null; //used to store the last clicked location
	self.placeList = ko.observableArray([]); // list of location objects.
	self.searchString = ko.observable(''); // the filter text entered by the user
    self.wikiItem = ko.observableArray([]);

	/**
		* Populate the ko placeList observable array, 
		* for each item in the Model array create new locattion object in the placeList array.
	*/
	Model.markers.forEach(function(myMarker) {
		self.placeList.push(new Location(myMarker));
	});

	/** render the inital map */
  	map = new google.maps.Map(document.getElementById('map-container'), {
    		center: Model.miltonCenter,
    		zoom: 10
	});

	/** for each Location setup the markers and the infoWindow */
	self.placeList().forEach(function(locItem){

		/** drop the marker */
		locItem.marker.setMap(map);

		/** add the click event to the marker */
		locItem.marker.addListener('click', function () {
			if (lastLocItem !== null) {
				lastLocItem.stopLoc(); /** stop the last clicked one */
				self.wikiItem.removeAll();
				lastLocItem.infoWindow.close(); /** close the last infoWindow */
			}
			locItem.toggleLoc(); /** togole the current clikced one */
			locItem.infoWindow.open(map, locItem.marker);
			getWiki(locItem);			
			
			lastLocItem = locItem; /** store the current into last */
			map.panTo(locItem.marker.position);
			locItem.marker.setMap(map);
		});

		/** load the infoWindow Content */
		var contentString = '<h3>' + locItem.marker.title + '</h3>' + locItem.marker.address + '<br>' + '<a href="' + locItem.marker.url + '">' + locItem.marker.url + '</a>';
	  	locItem.infoWindow.setContent(contentString);

	  	/** add an event to stop the animation if user closes the infoWindow */
	  	locItem.infoWindow.addListener('closeclick', function (){
	  			locItem.stopLoc(); /** stop the icon bounce */
  				self.wikiItem.removeAll();
	  	});
	});

	/** 
		* @desc called when the one of the list items is clicked
		* it will toggle the animation, infoWindow and wiki information.
		* @param {locItem} the location item that is  
	*/
	self.toggleBounce = function (locItem) {
		if (lastLocItem !== null) {
			lastLocItem.stopLoc();
			self.wikiItem.removeAll();
			locItem.infoWindow.close();
		}
		locItem.toggleLoc();
		locItem.infoWindow.open(map, locItem.marker);
		getWiki(locItem);
		lastLocItem = locItem;

		/** pan to the clicked marker */
		map.panTo(locItem.marker.position);
		locItem.marker.setMap(map);
  	};
  	
  	/** this fucntion will update the visible property of the searchList based on the searchString  */
    self.processFilter = function(){
		self.placeList().forEach(function(locItem){
			/** The visible property of the marker will set if the marker will display.  */
			if (self.searchString() === '' || locItem.marker.title.toLowerCase().indexOf(self.searchString().toLowerCase()) >= 0) {
				locItem.marker.setVisible(true);
			} else {
				locItem.stopLoc();
				locItem.marker.setVisible(false);
				if (locItem == lastLocItem) {
					self.wikiItem.removeAll();
				}
			}
		});

		/** trigger a change to the placeList array so it will display on the screen */
		var tempList = ko.observableArray(self.placeList());
		self.placeList([]);
		for (var x=0; x < tempList().length; x++){
		    self.placeList.push(tempList()[x]);
		}
	};
	
	
/** 
	* getWiki pulls in valid wikiPedia links based on the title information.
	* @function
	* @param {locItem} a location item is passed in and the marker title is used to search for valid wikipedia information
*/
	function getWiki (locItem) {
	    /** clear out the array of wiki links */
	    self.wikiItem.removeAll();
	    /** load wikipedia data using this URL */
	    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + locItem.marker.title + '&format=json&callback=wikiCallback';
	    /** set the time out duration and message */
	    var wikiRequestTimeout = setTimeout(function(){
	        self.wikiItem[0]("failed to get wikipedia resources");
	    }, 8000);
	    $.ajax({
	        url: wikiUrl,
	        dataType: "jsonp",
	        jsonp: "callback",
	        success: function( response ) {
	            var articleList = response[1];
	            var wikiHtml = "";
	            var wikiHtmlOLD = "";
	            if (articleList.length <= 0 ) {
	            	wikiHtml = "No wikipedia information available";
	            } else {
		            for (var i = 0; i < articleList.length; i++) {
		                articleStr = articleList[i];
		                var link = 'http://en.wikipedia.org/wiki/' + articleStr;
		                wikiHtml = '<a href="' + link + '">' + articleStr + '</a>';
					    self.wikiItem.push(wikiHtml);
		            }
		        }
	            clearTimeout(wikiRequestTimeout);
	        }
	    });
	}
};


/**
	* @desc These functions will launch depending on the sucessful completion of the Google Maps API call embedded in
	*       the HTML document. 
*/

/** if the good map API is unsuccessful then send a message to the screen and the colsole  */
var badCall = function () {
  console.log('So sorry, Google maps did not laod correctly.');
  alert('So sorry, Google maps did not laod correctly.');
}

/** if the google map call is sucessful then launch the view model **/
var goodCall = function () {
	console.log('Googgle maps call was successful');
	ko.applyBindings(new viewModel());
};