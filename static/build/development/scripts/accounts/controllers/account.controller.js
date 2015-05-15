(function () {
  'use strict';

  angular
    .module('accounts.controllers')
    .controller('AccountController', AccountController);

  AccountController.$inject = [
    '$scope', '$state', '$stateParams', 'Authentication', 'Account', 'Company','toastr',
  ];

  function AccountController($scope, $state, $stateParams, Authentication, Account, Company, toastr) {
    var vm = this;

    vm.destroy = destroy;
    vm.update = update;

    vm.username = $stateParams.username;

    activate();

    $scope.page = {
      title: 'Profile Page',
    };

    // activate function to initialize on page/controller load
    function activate() {

      // GET Account with success/error callbacks
      Account.get(vm.username)
        .then(accountSuccessFn)
        .catch(accountErrorFn);

      function accountSuccessFn(data, status, headers, config) {
        vm.account = data.data;  
        console.log(vm.account); 
        // GET company details of user with success/error callbacks
        Company.get(vm.account.user_company)
          .then(companySuccessFn)
          .catch(companyErrorFn);   
      }

      function accountErrorFn(data, status, headers, config) {
        $state.go('app.dashboard');
        toastr.error('That user does not exist.');
      }

      // GET company details success/error callbacks
      function companySuccessFn(data, status, headers, config) {
        console.log(data.data);
        vm.company = data.data;
      }

      function companyErrorFn(data, status, headers, config) {
        console.log(data.data);
        $state.go('app.dashboard');
        toastr.error('That company does not exist.');
      }
    }

    // Destroy Account with success/error callbacks
    function destroy() {
      Account.destroy(vm.account.username)
        .then(destroySuccessFn)
        .catch(destroyErrorFn);

      function destroySuccessFn(data, status, headers, config) {
        Authentication.unauthenticate();
        $state.go('app.dashboard');
        toastr.warning('Your account has been deleted.');
      }

      function destroyErrorFn(data, status, headers, config) {
        toastr.error(data.error);
      }
    }

    // Update Account with success/error callbacks
    function update() {
      
      Account.update(vm.username, vm.account)
        .then(updateSuccessFn)
        .catch(updateErrorFn);

      function updateSuccessFn(data, status, headers, config) {
        toastr.success('Your account has been updated.');
      }

      function updateErrorFn(data, status, headers, config) {
        toastr.error(data.error);
      }
    }
  };
})();