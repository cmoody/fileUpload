'use strict';

// Declare app level module which depends on filters, and services
angular.module('app', [
  'ngRoute',
  'app.HomeCtrl',
  'app.UserCtrl',
  'app.OrganizationCtrl',
  'app.ProductCtrl'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
  	.when('/', {
  		templateUrl: 'js/home/partials/index.html',
  		controller: 'HomeCtrl'
  	})
    .when('/user', {
      templateUrl: 'js/user/partials/index.html',
      controller: 'UserCtrl'
    })
    .when('/organization', {
      templateUrl: 'js/organization/partials/index.html',
      controller: 'OrganizationCtrl'
    })
    .when('/product', {
      templateUrl: 'js/product/partials/index.html',
      controller: 'ProductCtrl'
    })
  	.otherwise({
  		redirectTo: '/'
  	});
}]);
