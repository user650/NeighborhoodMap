/* FEND - Project 5 - Neighborhood Map 
   Scott Stubbs December 2015 
   use Milton, GA / North Atlanta as the center of the map */

var Model = {
  currentMarker: ko.observable(null),
  markers: [
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
  ]
};

var ViewModel = function () {
	var self = this;
	var map;

	//populate the searchlist with the titles from the Model.markers data
	searchList = ko.observableArray([]);
    Model.markers.forEach(function(markerItem){
        searchList.push(markerItem.title);  // push all of the marker titles to the searchList
    });

	var initMap = function () {
			
			//render the inital map
		  	map = new google.maps.Map(document.getElementById('map'), {
		    		center: {lat: 33.931375, lng: -84.381658},
		    		zoom: 10
			});

		  	//plop the markers on the map
			for (x=0; x<Model.markers.length; x++){
				var marker = new google.maps.Marker({
					position: Model.markers[x].latLng,
					draggable: false,
					animation: google.maps.Animation.DROP,
					map: map,
					title: Model.markers[x].title
				});
			};

	}(); // this extra () is needed to force the initMap function to run on applyBindings

	this.toggleBounce = function (clickedLoc) {
		console.log('Hi, you clicked on this baby: ' + clickedLoc);
  	}
	
};


ko.applyBindings(new ViewModel());