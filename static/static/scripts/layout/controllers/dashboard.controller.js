
(function () {
  'use strict';

  angular
    .module('layout.controllers')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', '$state', 'Authentication'];

  function DashboardController($scope, $state, Authentication) {
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


    $scope.page = {
      title: 'Dashboard',
    }

    function activate() {
      // if (!vm.isAuthenticated) {    
      //   $state.go('core.login');
      // } 
    }
  }
})();
