'use strict';

angular.module('api.parse', [])
  .config(function ($httpProvider) {

    $httpProvider.defaults.headers.common['X-Parse-Application-Id'] =  '';
    $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] =  '';

  })
  .factory('api', function($http, $location, $window) {

    return {
      url: '',

      query: function (path, params) {
        if(params) {
          path = path + '?where=' + JSON.stringify(params);
        }

        return $http({
          method: 'GET',
          url: this.url + path,
          params: params || null
        });

      },

      get: function (id, path, params) {

        return $http({
          method: 'GET',
          url: this.url + path + '/' + id,
          params: params || null
        });

      },

      update: function (id, path, params) {

        return $http({
          method: 'PUT',
          url: this.url + path + '/' + id,
          data: params
        });

      },

      add: function (path, params) {

        return $http({
          method: 'POST',
          url: this.url + path,
          data: params
        });

      },

      remove: function(path) {

        return $http({
          method: 'DELETE',
          url: this.url + path
        });

      },

      upload: function (params) {

        return $http({
          method: 'POST',
          headers: {
            'Content-type' : params.type
          },
          url: this.url + 'files/' + params.name,
          data: params
        });

      },

      deleteFile: function (params) {
        return $http({
          method: 'DELETE',
          headers: {
            'X-Parse-Master-Key': 'qEiL3UYE4MSKSFDdqihnKnyyzDCR88d61EPZiKMz'
          },
          url: this.url + 'files/' + params.name
        });
      },

      test: function() {
        return 'Test';
      }

    }
  });