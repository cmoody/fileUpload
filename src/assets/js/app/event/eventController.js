'use strict';

/* Controllers */

(function() {

  angular.module('event.eventController', [
    'api.parse',
    'AngularGM'
  ]);

  angular.module('event.eventController')
    .controller('EventController', function ($scope, $location, $timeout, api, $q, progressbar, $routeParams, $filter) {
    	progressbar.start();

    	// Defaults
    	$scope.longitude = -95.626389;
    	$scope.latitude = 37.037778;
    	$scope.updateMarker = false;
    	$scope.EditEvent = false;

    	// Get Event Data
		var eventPromise = api.query('classes/Events/' + $routeParams.id);

	    // Get Event Markers
	    var markersPromise = api.query('classes/EventMarkers', { "event": { "__type":"Pointer","className":"Events","objectId": $routeParams.id } });

		$q.all([eventPromise, markersPromise])
			.then(function(results) {
				// Event
				$scope.event = {
					start_date: $filter('date')(results[0].data.start_date.iso, 'yyyy-MM-dd'),
					end_date: $filter('date')(results[0].data.end_date.iso, 'yyyy-MM-dd'),
					name: results[0].data.name,
					longitude: results[0].data.center.longitude,
					latitude: results[0].data.center.latitude
				};

				$scope.center = new google.maps.LatLng($scope.event.latitude, $scope.event.longitude);

				// Markers
	    		var markers = results[1].data.results;
	          	var dataLength = markers.length;
	          	var markersArr = [];

		        for(var i = 0; i < dataLength; i++) {
		          	markersArr.push({
		          		name: markers[i].name,
		          		objectId: markers[i].objectId,
		          		location: {
		          			lat: markers[i].location.latitude,
		          			lng: markers[i].location.longitude
		          		}
		          	});
		        }

		        $scope.markers = markersArr;

	    		progressbar.complete();
			});

	   	$scope.options = {
	      map: {
	        center: new google.maps.LatLng($scope.latitude, $scope.longitude),
	        zoom: 14,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	      },
	      default: {
	        icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png',
	      },
	      selected: {
	        icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/yellow-dot.png',
	      }
	    };

	    // Watches for change to center and updates map
	    $scope.$watch('center', function(center) {
			if (center) {
				$scope.centerLat = center.lat();
				$scope.centerLng = center.lng();
			}
	    });

	    // Alternate idea to update route on click
	    $scope.editEvent = function() {
	    	$scope.EditEvent = true;
	    	// Better naming to hide marker form
	    	// 
	    };

	    $scope.submitEvent = function(event) {
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

 			var updateEventPromise = api.update($routeParams.id, 'classes/Events', params);

 			updateEventPromise
 				.then(function(response) {
 					progressbar.complete();

 					$scope.EditEvent = false;
 				});
	    };

     	$scope.submitMarker = function(form) {
     		progressbar.start();

     		var params = {
 				"name": form.name,
 				"location": {
		          "__type": "GeoPoint",
		          "latitude": parseFloat(form.latitude),
		          "longitude": parseFloat(form.longitude)
		        },
 				"event": {
 					"__type":"Pointer",
 					"className":"Events",
 					"objectId": $routeParams.id
 				}
 			};

     		if($scope.updateMarker) {
     			var updateMarkerPromise = api.update(form.objectId, 'classes/EventMarkers', params);

     			// Isnt updating marker on map
     			updateMarkerPromise
     				.then(function(response) {
     					progressbar.complete();

     					// Update marker object
     					var markersLength = $scope.markers.length;

	     				for(var i = 0; i < markersLength; i++) {
	     					if($scope.markers[i].objectId === form.objectId) {
	     						$scope.markers[i].location = {
	     							lat: form.latitude,
	     							lng: form.longitude
	     						};

	     						// Clears form
					        	$scope.form = {};
					        	// Change form back to add
					        	$scope.updateMarker = false;

	     						return;
	     					}
	     				}
			        	
     				});
     		}else{
				var addMarkerPromise = api.add('classes/EventMarkers/', params);

		      	addMarkerPromise
			        .then(function(response) {
			        	progressbar.complete();

			        	// Adds marker to nav
			        	$scope.markers.push({
			          		name: form.name,
			          		objectId: response.data.objectId,
			          		location: {
			          			lat: form.latitude,
			          			lng: form.longitude
			          		}
			          	});

			        	// Clears form
			        	$scope.form = {};
			        	// Change form back to add
			        	$scope.updateMarker = false;
			        });
     		}
     	};

     	$scope.deleteMarker = function(objectId) {
     		var deleteMarkerPromise = api.remove('classes/EventMarkers/' + objectId);

     		deleteMarkerPromise
     			.then(function(response) {
     				var markersLength = $scope.markers.length;

     				for(var i = 0; i < markersLength; i++) {
     					if($scope.markers[i].objectId === objectId) {
     						$scope.markers.splice(i, 1);

     						$scope.form = {};

     						$scope.updateMarker = false;

     						return;
     					}
     				}
					
     			});
     	};

     	$scope.newMarker = function() {
     		$scope.form = {};
     		$scope.updateMarker = false;
     		$scope.EditEvent = false;
     	};

     	$scope.selectMarker = function(marker) {
     		$scope.form = {
     			objectId: marker.objectId,
     			name: marker.name,
     			latitude: marker.location.lat,
     			longitude: marker.location.lng
     		};

     		$scope.updateMarker = true;
     		$scope.EditEvent = false;
     	};

     	// ng-mouseover="{expression}"
     	// Also add to the home map
     	$scope.highlightMarker = function(marker) {
     		//marker.setOptions($scope.options.selected);
     	};

     	// ng-mouseleave="{expression}"
     	$scope.unhighlightMarker = function(marker) {

     	};
	    
    });

})();