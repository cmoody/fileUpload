'use strict';

angular.module('common.navMenuDirective', [])
  .directive('navMenu', function($location) {
    return function (scope, element, attrs) {
      var links = element.find('a'),
        link,
        currentLink,
        urlMap = {},
        activeClass = 'active';

      for (var i = 0, l= links.length; i < l; i++) {
        link = angular.element(links[i]);
        urlMap[link.attr('href').replace('#', '')] = link;
      }

      scope.$on('$routeChangeStart', function() {
        var pathLink = urlMap[$location.path()];

        if (pathLink) {
          if (currentLink) {
            //li needs active class
            currentLink.parent().removeClass(activeClass);
          }
          currentLink = pathLink;
          currentLink.parent().addClass(activeClass);
        }
      });
    };
  });