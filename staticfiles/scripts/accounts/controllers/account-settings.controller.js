(function () {
  'use strict';

  angular
    .module('accounts.controllers')
    .controller('AccountSettingsController', AccountSettingsController);

  AccountSettingsController.$inject = [
    '$scope', '$location', '$stateParams', 'Authentication', 'Account', 'Company','toastr',
  ];

  /**
   * @namespace AccountSettingsController
   */
  function AccountSettingsController($scope, $location, $stateParams, Authentication, Account, Company, toastr) {
    var vm = this;

    vm.destroy = destroy;
    vm.update = update;

    activate();

    $scope.page = {
      title: 'Profile Page',
    };

    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated.
     * @memberOf thinkster.accounts.controllers.AccountSettingsController
     */
    function activate() {
      var authenticatedAccount = Authentication.getAuthenticatedAccount();
      var username = $stateParams.username;
      console.log(authenticatedAccount);
      // Redirect if not logged in
      if (!authenticatedAccount) {
        $location.url('/login');
      } 
      // else {
      //   // Redirect if logged in, but not the owner of this account.
      //   if (authenticatedAccount) {
      //       // debugger;
      //       $location.url('/');
      //     // toastr.error('You are not authorized to view this page.');
      //     // console.log("2");
      //   }
      // }

      Account.get(username).then(accountSuccessFn, accountErrorFn);

      /**
       * @name accountSuccessFn
       * @desc Update `account` for view
       */
      function accountSuccessFn(data, status, headers, config) {
        vm.account = data.data;      
      }

      /**
       * @name accountErrorFn
       * @desc Redirect to index
       */
      function accountErrorFn(data, status, headers, config) {
        $location.url('/dashboard');
        toastr.error('That user does not exist.');
      }

      Company.get(authenticatedAccount.user_company).then(companySuccessFn, companyErrorFn);

      function companySuccessFn(data, status, headers, config) {
        console.log(data.data);
        vm.company = data.data;
      }

      function companyErrorFn(data, status, headers, config) {
        console.log(data.data);
        $location.url('/dashboard');
        toastr.error('That company does not exist.');
      }

    }


    /**
     * @name destroy
     * @desc Destroy this account
     * @memberOf thinkster.accounts.controllers.AccountSettingsController
     */
    function destroy() {
      Account.destroy(vm.account.username).then(accountSuccessFn, accountErrorFn);

      /**
       * @name accountSuccessFn
       * @desc Redirect to index and display success snackbar
       */
      function accountSuccessFn(data, status, headers, config) {
        Authentication.unauthenticate();
        window.location = '/';
        toastr.warning('Your account has been deleted.');
      }


      /**
       * @name accountErrorFn
       * @desc Display error snackbar
       */
      function accountErrorFn(data, status, headers, config) {
        toastr.error(data.error);
      }
    }


    /**
     * @name update
     * @desc Update this account
     * @memberOf thinkster.accounts.controllers.AccountSettingsController
     */
    function update() {
      var username = $stateParams.username;

      Account.update(username, vm.account).then(accountSuccessFn, accountErrorFn);
      /**
       * @name accountSuccessFn
       * @desc Show success snackbar
       */
      function accountSuccessFn(data, status, headers, config) {
        toastr.success('Your account has been updated.');
      }


      /**
       * @name accountErrorFn
       * @desc Show error snackbar
       */
      function accountErrorFn(data, status, headers, config) {
        toastr.error(data.error);
      }
    }
  }
})();
