(function() {
  function config($stateProvider, $locationProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });
    $stateProvider
      .state('landing', {
        url: '/',
        controller: 'LandingCtrl as landing',
        templateUrl: '/templates/landing.html'
      })
      .state('album', {
        url: '/album',
        controller: 'AlbumCtrl as album',
        templateUrl: '/templates/album.html'
      })
      .state('collection', {
        url: '/collection',
        controller: 'CollectionCtrl as collection',
        templateUrl: '/templates/collection.html'
      })
      .state('analytics', {
        url: '/analytics',
        controller: 'AnalyticsCtrl as analytics',
        templateUrl: '/templates/analytics.html'
      });
  }
  angular
    .module('blocJams', ['nvd3','ui.router'])
    .config(config);
})();
