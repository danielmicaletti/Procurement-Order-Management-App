
(function () {
  'use strict';

  angular
    .module('layout.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', '$state', 'Authentication'];

  /**
   * @namespace IndexController
   */
  function IndexController($scope, $state, Authentication) {
    var vm = this;
    // console.log($state.go('core.login'));
    vm.isAuthenticated = Authentication.isAuthenticated();
    console.log(vm.isAuthenticated);
    // if (vm.isAuthenticated === false) {
    //   console.log(vm.isAuthenticated);
    //   console.log('here');
    //   $state.go('core.login');
    // } 
    activate();

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

    function activate() {
      // if (!vm.isAuthenticated) {
      //   $state.go('core.login');
      // } 
    }
  }
})();
