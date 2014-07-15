'use strict';

angular.module('authentication', [])
  .factory('authentication', function($http, $cookies, $location, $window, $q, config) {

    return {
      authToken: '',
      headers: {
        'Authorization': '',
        'X-Force-Type': 'production'
      },
      url: config.apiUrl,
      checkAuth: function () {
        if (localStorage.getItem('i.mm.id')) {
          this.authToken  = localStorage.getItem('i.mm.id');
          this.headers['Authorization'] = 'Bearer ' + this.authToken;
          console.info('Authorization Token: ' + this.authToken);
        } else {
          $window.location.assign(config.idUrl + config.client_id + config.idUrlRedirect + 'http://localhost:8080');
        }
      }
    }
});