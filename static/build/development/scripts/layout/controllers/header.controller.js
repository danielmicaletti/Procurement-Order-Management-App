/**
 * NHeaderController
 * @namespace thinkster.layout.controllers
 */
(function () {
  'use strict';

  angular
    .module('layout.controllers')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', 'Authentication'];

  function HeaderController($scope, Authentication) { 
    
    var vm = this;

    vm.logout = logout;

    function logout() {
      Authentication.logout();
    }

  }
})();
