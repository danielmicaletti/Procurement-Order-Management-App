(function () {
  'use strict';

  angular
    .module('accounts.controllers')
    .controller('CompanySettingsController', CompanySettingsController);

  CompanySettingsController.$inject = [
    '$scope', '$state', '$stateParams', 'Authentication', 'Company', 'toastr',
  ];

  function CompanySettingsController($scope, $state, $stateParams, Authentication, Company, toastr) {
    
    var companyId = $stateParams.companyId;
    console.log("companyId");
    console.log(companyId);

    var vm = this;

    vm.destroy = destroy;
    vm.update = update;

    activate();

    $scope.page = {
      title: 'Profile Page',
    };

    function activate() {
      var authenticatedAccount = Authentication.getAuthenticatedAccount();
      console.log("AuthAcct Comp");
      console.log(authenticatedAccount);

      Company.get(companyId)
        .then(companySuccessFn)
        .catch(companyErrorFn);

      function companySuccessFn(data) {
        console.log(data);
        if(authenticatedAccount.optiz || authenticatedAccount.user_company === data.id){
          vm.company = data;     
          console.log(vm.company);
        }else{
          $state.go('app.dashboard');
          toastr.error('You are not authorized to view this page.');
        }  
      }

      function companyErrorFn(errorMsg) {
        $state.go('app.dashboard');
        toastr.error('There was a problem retrieving your information '+errorMsg+'. Please contact Optiz.');
        console.log("COMP ERROR");
      }
    }

    function destroy() {
      Company.destroy(vm.company.id).then(companySuccessFn, companyErrorFn);

      function companySuccessFn(data, status, headers, config) {
        window.location = ('/dashboard');
        toastr.warning('Your company has been deleted.');
        console.log("COMP DESTROY NEED TO DESTROY>>>");
      }

      function companyErrorFn(data, status, headers, config) {
        toastr.error(data.error);
      }
    }

    function update() {
      var companyId = $stateParams.companyId;

      Company.update(companyId, vm.company).then(companySuccessFn, companyErrorFn);
      console.log("COMP UPDATE");
    }

    function companySuccessFn(data, status, headers, config) {
      toastr.success('Your account has been updated.');
      console.log("COMP UPDATE SUCCESS");
      $location.url('/app/pages/company-profile/'+companyId+'/'); 
    }

    function companyErrorFn(data, status, headers, config) {
      toastr.error(data.error);
    }

    vm.register = function() {
      Authentication.register(
        vm.company.id,
        vm.username, 
        vm.email, 
        vm.first_name, 
        vm.last_name, 
        vm.password, 
        vm.confirm_password)
        .then(registerSuccess)
        .catch(registerError);
    }

    function registerSuccess(data){
      console.log(data);
      vm.username = {};
      vm.email = {};
      vm.first_name = {};
      vm.last_name = {};
      vm.password = {};
      vm.confirm_password = {};
      activate();
    }

    function registerError(errorMsg){
      console.log(errorMsg);
    }
  }
})();
