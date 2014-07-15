'use strict';

/* Controllers */

angular.module('app.UserCtrl', [])
  .controller('MyCtrl1', ['$scope', function($scope) {
  	$scope.test = 'User Test';
  }]);
