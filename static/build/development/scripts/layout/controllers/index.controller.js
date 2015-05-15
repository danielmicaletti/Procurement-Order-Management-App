
(function () {
  'use strict';

  angular
    .module('layout.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', '$sce', '$state', 'Authentication'];

  /**
   * @namespace IndexController
   */
  function IndexController($scope, $sce, $state, Authentication) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    console.log(vm.isAuthenticated);
    $scope.au = Authentication.getAuthenticatedAccount();
    console.log($scope.au);

    $scope.main = {
      title: 'WeASe',
      settings: {
        navbarHeaderColor: 'scheme-default',
        sidebarColor: 'scheme-default',
        brandingColor: 'scheme-default',
        activeColor: 'default-scheme-color',
        headerFixed: true,
        asideFixed: true,
        rightbarShow: false
      }
    };

    var mediaPath = media_path('');
    console.log('media path'+mediaPath);
    var staticPath = static_path('');
    console.log('static path'+staticPath);
    var headerPath = static_path('views/header.html');
    var navPath = static_path('views/nav.html');
    var rbPath = static_path('views/rightbar.html');

    $scope.path = { 
      static_files: $sce.trustAsResourceUrl(staticPath),
      media: $sce.trustAsResourceUrl(mediaPath),
      nav: $sce.trustAsResourceUrl(navPath),
      header: $sce.trustAsResourceUrl(headerPath),
      rb: $sce.trustAsResourceUrl(rbPath)
    };
  }
})();
