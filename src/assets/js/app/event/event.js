'use strict';

// Declare app level module which depends on filters, and services
angular.module('event', [
    'ngRoute',
    'event.eventController',
    'api.parse'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/event/:id', {
        templateUrl:'assets/js/app/event/partials/event.html',
        controller:'EventController',
        title: 'Event'
      });
  });