'use strict';

angular.module('EventDashboard', [
    'ngRoute',
    'ngTouch',
    'ngCookies',
    'ngAnimate',
    'ngProgress',
    'common.navMenuDirective',
    'common.appController',
    'app.translations',
    'templates-app',
    'home',
    'event'
  ])
  .config( function ($routeProvider, progressbarProvider) {
    progressbarProvider.setColor('#3285bb');
    progressbarProvider.setHeight('4px');
    //progressbarProvider.setTop('55px');

    $routeProvider
      .otherwise({
        redirectTo: '/',
        title: 'Home'
      });
  });

