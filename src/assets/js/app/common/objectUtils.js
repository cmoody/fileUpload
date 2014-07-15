'use strict';

angular.module('object.utils', [])
  .factory('objectUtils', function() {

    return {
      difference: function (template, override) {
        var ret = {};
        for (var name in template) {
          if (name in override) {
            if (angular.isObject(override[name]) && !angular.isArray(override[name])) {
              var diff = this.difference(template[name], override[name]);
              if (jQuery.isEmptyObject(diff)) {
                ret[name] = diff;
              }
            } else if (!angular.equals(template[name], override[name])) {
              ret[name] = override[name];
            }
          }
        }
        return ret;
      }
    }
});