/**
 * NHeaderController
 * @namespace thinkster.layout.controllers
 */
(function () {
  'use strict';

  angular
    .module('layout.controllers')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', 'Authentication', 'Account'];

  /**
   * @namespace HeaderController
   */
  function HeaderController($scope, Authentication, Account) {
    console.log("Authentication");
    console.log(Authentication);
    console.log("Account");
    console.log(Account.data);    
    var vm = this;

    vm.logout = logout;
    
    vm.user = Authentication.getAuthenticatedAccount();
    console.log("SCOPE USER");
    console.log(vm.user);
    /**
     * @name logout
     * @desc Log the user out
     * @memberOf thinkster.layout.controllers.HeaderController
     */
    function logout() {
      console.log("ContrLogout");
      Authentication.logout();
    }

  }
})();
