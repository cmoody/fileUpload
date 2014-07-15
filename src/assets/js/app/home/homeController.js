'use strict';

/* Controllers */

(function() {

  angular.module('home.homeController', [
    'api.parse',
    'AngularGM'
  ]);

  angular.module('home.homeController')
    .controller('HomeController', function ($scope, $location, $timeout, api, $q, progressbar) {
    	progressbar.start();
    	$scope.isAddEvent = false;

		var eventsPromise = api.query('classes/Events');

      	eventsPromise
	        .then(function(response) {
	        	var events = response.data.results;
	          	var dataLength = events.length;
	          	var eventsArr = [];

	          	$scope.events = events; // What data does this use that below doesnt?

		        for(var i = 0; i < dataLength; i++) {
		          	eventsArr.push({
		          		name: events[i].name,
		          		location: {
		          			lat: events[i].center.latitude,
		          			lng: events[i].center.longitude
		          		}
		          	});
		        }

		        $scope.map = eventsArr;

	          	progressbar.complete();
	        });

	    $scope.options = {
	      map: {
	        center: new google.maps.LatLng(37.037778, -95.626389),
	        zoom: 4,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	      }
	    };

	    $scope.addEvent = function() {
	    	$scope.isAddEvent = true;
	    };

	    $scope.cancelAdd = function() {
	    	$scope.isAddEvent = false;
	    };

	    $scope.submitEvent = function(event) {
	    	// $scope.events & $scope.map (same array)
	    	progressbar.start();

	    	var params = {
	    		"name": event.name,
 				"center": {
		          "__type": "GeoPoint",
		          "latitude": parseFloat(event.latitude),
		          "longitude": parseFloat(event.longitude)
		        },
 				"start_date": {
				  "__type": "Date",
				  "iso": event.start_date + 'T18:02:52.249Z'	
				},
 				"end_date": {
				  "__type": "Date",
				  "iso": event.end_date + 'T18:02:52.249Z'
				}
	    	};

	    	var addEventPromise = api.add('classes/Events', params);

 			addEventPromise
 				.then(function(response) {
 					progressbar.complete();

 					var eventDetails = {
 						objectId: response.data.objectId,
		          		name: event.name,
		          		location: {
		          			lat: event.latitude,
		          			lng: event.longitude
		          		}
		          	};

		          	$scope.map.push(eventDetails);
		          	$scope.events.push(eventDetails);

 					$scope.isAddEvent = false;
 				});

	    	$scope.isAddEvent = false;
	    };
    });

})();