'use strict';

// Declare app level module which depends on filters, and services
angular.module('home', [
    'ngRoute',
    'home.homeController',
    'api.parse'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl:'assets/js/app/home/partials/home.html',
        controller:'HomeController',
        title: 'Home'
      });
  });