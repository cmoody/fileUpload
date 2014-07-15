'use strict';

/* Controllers */

angular.module('app.UserCtrl', [])
  .controller('UserCtrl', ['$scope', function($scope) {
  	$scope.user = 'Chase Moody';
  }]);
