'use strict';


(function() {

  angular.module('common.appController', [])
    .controller('AppController', function ($scope, $rootScope, $route) {

      $rootScope.$on('$routeChangeSuccess', function () {
        if ($route.current.hasOwnProperty('$$route')) {
          $rootScope.pageTitle = $route.current.$$route.title;
        }
      });

    });

})();

