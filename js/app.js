/* FEND - Project 5 - Neighborhood Map 
   Scott Stubbs December 2015 
   use Milton, GA / North Atlanta as the center of the map */

var Model = {
  miltonMarker: [
    {
      	title: 'Coca Cola Factory',
		latLng: {lat: 33.771126, lng: -84.396454},
		address: '606-608 Luckie St NW, Atlanta, GA 30313',
		url: 'https://www.worldofcoca-cola.com/',
		visible: false
	},
	{
		title:	'Turner Field - Home of the Braves',
		latLng: {lat: 33.735067, lng: -84.38999433}, 
		address: '755 Hank Aaron Dr SE, Atlanta, GA 30315',
		url: 'http://atlanta.braves.mlb.com/atl/ballpark/',
		visible: true
	},
	{
		title:	'Georgia Aquarium!',
		latLng: {lat: 33.763627, lng: -84.395121},
		address: '225 Baker St NW, Atlanta, GA 30313',
		url: 'http://www.georgiaaquarium.org/',
		visible: true
	},
	{
		title:	'Six Flags Over Georgia',
		latLng: {lat: 33.768570, lng: -84.550910},
		address: '275 Riverside Pkwy, Austell, GA 30168',
		url: 'https://www.sixflags.com/overgeorgia',
		visible: true
	},
	{	
		title:	'Lake Lanier Islands',
		latLng: {lat: 34.177871, lng: -84.030111},
		address: '7000 LANIER ISLANDS PARKWAY BUFORD, GA 30518',
		url: 'http://www.lanierislands.com/',
		visible: true
	},
	{
		title: 'The Georgia Dome',
		latLng: {lat: 33.757694, lng: -84.400625},
		address: '1 Georgia Dome Dr, Atlanta, GA 30313',
		url: 'http://www.gadome.com/',
		visible: true
	}
  ],
  miltonCenter: {lat: 33.931375, lng: -84.381658}
};

var ViewModel = function () {
	var self = this;
	var map;
	this.searchString = ko.observable('');
	markerList = ko.observableArray([]);

	//this fucntion will update the visible property of the markerList 
	this.processFilter = function(bob){
		console.log('bob = ' + bob);
		console.log ('searchString = ' + self.searchString());
		markerList().forEach(function(markerItem){

			/* taken from sample http://opensoul.org/2011/06/23/live-search-with-knockoutjs/
			if(beers[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        		viewModel.beers.push(beers[x]);
        	} */

			if (self.searchString() == '' || markerItem.title.toLowerCase().indexOf(self.searchString().toLowerCase()) >= 0) {
				markerItem.setVisible(true);
				console.log('Match : ' + markerItem.title);
			} else {
				markerItem.setVisible(false);
			}
		});
	
		/* after all of the flags have been updated then trigger a change 
		   to the markerList so that it will display */
		var tempList = ko.observableArray(markerList());
		markerList([]);
		for (var x=0; x < tempList().length; x++){
		    markerList.push(tempList()[x]);
		};
	};

	//populate the original markerList with google markers using the data from the Model.miltonMarker
	console.log("loading the observable array with google markers");

    Model.miltonMarker.forEach(function(markerItem){
 		var marker = new google.maps.Marker({
					position: markerItem.latLng,
					draggable: false,
					animation: google.maps.Animation.DROP,
					title: markerItem.title,
					visible: markerItem.visible
        	});
 		console.log("Marker load: " + markerItem.title);
        markerList.push(marker);  // push all of the google marker objects to the markerList arrary
    });
	console.log("end inital load");

	var initMap = function () {
			//render the inital map
		  	map = new google.maps.Map(document.getElementById('map'), {
		    		center: Model.miltonCenter,
		    		zoom: 10
			});

			/*Plop the makers on the map;
			for each marker in the markerList draw it on the map with .setMap */
			markerList().forEach(function(markerItem){
				markerItem.setMap(map);
			});
	}(); // this extra () is needed to force the initMap function to run on applyBindings

	this.toggleBounce = function (clickedMarker) {
		console.log('Hi, you clicked on this baby: ' + clickedMarker.title);

		/* if the clicked marker is not animated then stop the animation on 
		all of the markers and then bounce the one that is clikced */
		if (clickedMarker.getAnimation() == null) {
			markerList().forEach(function(markerItem){
				markerItem.setAnimation(null);
			});
			clickedMarker.setAnimation(google.maps.Animation.BOUNCE);
  		}
  		else {
  			clickedMarker.setAnimation(google.maps.Animation.NULL);
  		}
  	}

};

ko.applyBindings(new ViewModel());