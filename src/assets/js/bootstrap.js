angular.element(document).ready(function () {
    angular.bootstrap(document, ['EventDashboard']);

    $(document).ready(function() {
      $('[data-toggle=offcanvas]').click(function() {
        $('.row-offcanvas').toggleClass('active');
      });
    });
  });