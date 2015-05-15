
(function () {
  'use strict';

  angular
    .module('layout.controllers')
    .controller('AppController', AppController);

  AppController.$inject = ['$scope', 'Authentication'];

  function AppController($scope, Authentication) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    console.log(vm.isAuthenticated);
    $scope.au = Authentication.getAuthenticatedAccount();
    console.log($scope.au);
  }
})();