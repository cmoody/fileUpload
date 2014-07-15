'use strict';

// Declare app level module which depends on filters, and services
angular.module('app', [
  'ngRoute',
  'app.filters',
  'app.services',
  'app.directives',
  'app.UserCtrl'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
  	.when('/view1', {
  		templateUrl: 'js/user/partials/partial1.html',
  		controller: 'MyCtrl1'
  	})
  	.otherwise({
  		redirectTo: '/view1'
  	});
}]);
