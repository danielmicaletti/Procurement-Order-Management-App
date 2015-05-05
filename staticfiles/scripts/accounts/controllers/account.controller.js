/**
* AccountController
* @namespace thinkster.accounts.controllers
*/
(function () {
  'use strict';

  angular
    .module('accounts.controllers')
    .controller('AccountController', AccountController);

  AccountController.$inject = ['$location', '$routeParams', 'Posts', 'Account', 'toastr'];

  /**
  * @namespace AccountController
  */
  function AccountController($location, $routeParams, Posts, Account, toastr) {
    
    var vm = this;

    vm.account = undefined;
    vm.posts = [];

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf thinkster.accounts.controllers.AccountController
    */
    function activate() {
      var username = $routeParams.username.substr(1);

      Account.get(username).then(accountSuccessFn, accountErrorFn);
      Posts.get(username).then(postsSuccessFn, postsErrorFn);

      /**
      * @name accountSuccessAccount
      * @desc Update `account` on viewmodel
      */
      function accountSuccessFn(data, status, headers, config) {
        vm.account = data.data;
      }


      /**
      * @name accountErrorFn
      * @desc Redirect to index and show error Snackbar
      */
      function accountErrorFn(data, status, headers, config) {
        $location.url('#/app/dashboard');
        toastr.error('That user does not exist.');
      }


      /**
        * @name postsSucessFn
        * @desc Update `posts` on viewmodel
        */
      function postsSuccessFn(data, status, headers, config) {
        vm.posts = data.data;
      }


      /**
        * @name postsErrorFn
        * @desc Show error snackbar
        */
      function postsErrorFn(data, status, headers, config) {
        toastr.error(data.data.error);
      }
    }
  }
})();
