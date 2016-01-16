/* FEND - Project 5 - Neighborhood Map 
   Scott Stubbs December 2015 
   use Milton, GA / North Atlanta as the center of the map */

var Model = {
  miltonMarker: [
    {
      	title: 'Coca Cola Factory',
		latLng: {lat: 33.771126, lng: -84.396454},
		address: '606-608 Luckie St NW, Atlanta, GA 30313',
		url: 'https://www.worldofcoca-cola.com/'
	},
	{
		title:	'Turner Field - Home of the Braves',
		latLng: {lat: 33.735067, lng: -84.38999433}, 
		address: '755 Hank Aaron Dr SE, Atlanta, GA 30315',
		url: 'http://atlanta.braves.mlb.com/atl/ballpark/'
	},
	{
		title:	'Georgia Aquarium!',
		latLng: {lat: 33.763627, lng: -84.395121},
		address: '225 Baker St NW, Atlanta, GA 30313',
		url: 'http://www.georgiaaquarium.org/'
	},
	{
		title:	'Six Flags Over Georgia',
		latLng: {lat: 33.768570, lng: -84.550910},
		address: '275 Riverside Pkwy, Austell, GA 30168',
		url: 'https://www.sixflags.com/overgeorgia'
	},
	{	
		title:	'Lake Lanier Islands',
		latLng: {lat: 34.177871, lng: -84.030111},
		address: '7000 LANIER ISLANDS PARKWAY BUFORD, GA 30518',
		url: 'http://www.lanierislands.com/'
	}
  ],
  miltonCenter: {lat: 33.931375, lng: -84.381658}
};

var ViewModel = function () {
	var self = this;
	var map;
	self.searchString = "Coca Cola Factory";

	//populate the markerList with google markers using the data from the Model.markers
	console.log("loading the observable array with google markers");
	markerList = ko.observableArray([]);
    Model.miltonMarker.forEach(function(markerItem){
 		var marker = new google.maps.Marker({
					position: markerItem.latLng,
					draggable: false,
					animation: google.maps.Animation.DROP,
					title: markerItem.title
        	});
 		console.log("Marker load: " + markerItem.title);
        markerList.push(marker);  // push all of the google marker objects to the markerList arrary
    });
	console.log("end load");

	var initMap = function () {
			
			//render the inital map
		  	map = new google.maps.Map(document.getElementById('map'), {
		    		//center: {lat: 33.931375, lng: -84.381658},
		    		center: Model.miltonCenter,
		    		zoom: 10
			});

			/*Plop the makers on the map; note what this this doing: 
			for each (google) marker in the ko ob List markerList draw it on the map with .setMap */
			markerList().forEach(function(markerItem){
				markerItem.setMap(map);
			});

	}(); // this extra () is needed to force the initMap function to run on applyBindings

	this.toggleBounce = function (clickedMarker) {
		console.log('Hi, you clicked on this baby: ' + clickedMarker.title);
		self.searchString = clickedMarker.title;
		/* if the clicked marker is not animated then stop the animation on 
		all of the markers and then bounce the one that is clikced */
		if (clickedMarker.getAnimation() == null) {
			markerList().forEach(function(markerItem){
				markerItem.setAnimation(null);
			});
			clickedMarker.setAnimation(google.maps.Animation.BOUNCE);
  		}

  	}
	
};

ko.applyBindings(new ViewModel());