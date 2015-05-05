(function () {
  'use strict';

  angular
    .module('accounts.controllers')
    .controller('CompanySettingsController', CompanySettingsController);

  CompanySettingsController.$inject = [
    '$scope', '$location', '$stateParams', 'Authentication', 'Company', 'toastr',
  ];

  /**
   * @namespace AccountSettingsController
   */
  function CompanySettingsController($scope, $location, $stateParams, Authentication, Company, toastr) {
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
      // var username = $stateParams.username;
      console.log("AuthAcct Comp");
      console.log(authenticatedAccount);

      var companyId = $stateParams.companyId;
      console.log("companyId");
      console.log(companyId);
      // Redirect if not logged in
      if (!authenticatedAccount) {
        $location.url('/login');
        toastr.error('You are not authorized to view this page.');

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

      Company.get(companyId).then(companySuccessFn, companyErrorFn);

      /**
       * @name accountSuccessFn
       * @desc Update `account` for view
       */
      function companySuccessFn(data, status, headers, config) {
        console.log("COMP Success");
        vm.company = data.data;     
        console.log(vm.company); 
      }

      /**
       * @name accountErrorFn
       * @desc Redirect to index
       */
      function companyErrorFn(data, status, headers, config) {
        $location.url('/dashboard');
        toastr.error('That user does not exist.');
        console.log("COMP ERROR");
      }
    }


    /**
     * @name destroy
     * @desc Destroy this account
     * @memberOf thinkster.accounts.controllers.AccountSettingsController
     */
    function destroy() {
      Company.destroy(vm.company.id).then(companySuccessFn, companyErrorFn);

      /**
       * @name accountSuccessFn
       * @desc Redirect to index and display success snackbar
       */
      function companySuccessFn(data, status, headers, config) {
        // Authentication.unauthenticate();
        window.location = ('/dashboard');
        toastr.warning('Your company has been deleted.');
        console.log("COMP DESTROY NEED TO DESTROY>>>");
      }


      /**
       * @name accountErrorFn
       * @desc Display error snackbar
       */
      function companyErrorFn(data, status, headers, config) {
        toastr.error(data.error);
        console.log("6");
      }
    }


    /**
     * @name update
     * @desc Update this account
     * @memberOf thinkster.accounts.controllers.AccountSettingsController
     */
    function update() {
      var companyId = $stateParams.companyId;

      Company.update(companyId, vm.company).then(companySuccessFn, companyErrorFn);
      console.log("COMP UPDATE");
      /**
       * @name accountSuccessFn
       * @desc Show success snackbar
       */
      function companySuccessFn(data, status, headers, config) {
        toastr.success('Your account has been updated.');
        console.log("COMP UPDATE SUCCESS");
        $location.url('/app/pages/company-profile/'+companyId+'/'); 
      }


      /**
       * @name accountErrorFn
       * @desc Show error snackbar
       */
      function companyErrorFn(data, status, headers, config) {
        toastr.error(data.error);
      }
    }
  }
})();
