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

    vm.companyPage = true;

    vm.destroy = destroy;
    vm.update = update;

    vm.newUser = {};
    activate();

    $scope.page = {
      title: 'Profile Page',
    };

    function activate() {
      vm.authenticatedAccount = Authentication.getAuthenticatedAccount();
      console.log("AuthAcct Comp");
      console.log(vm.authenticatedAccount);

      Company.get(companyId)
        .then(companySuccessFn)
        .catch(companyErrorFn);

      function companySuccessFn(data) {
        console.log(data);
        var authUserCo = parseInt(vm.authenticatedAccount.user_company);
        if(vm.authenticatedAccount.optiz || authUserCo === data.id){
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
      }
    }

    function destroy() {
      Company.destroy(vm.company.id).then(companySuccessFn, companyErrorFn);

      function companySuccessFn(data, status, headers, config) {
        $state.go('app.dashboard');
        toastr.warning('Your company has been deleted.');
      }

      function companyErrorFn(data, status, headers, config) {
        toastr.error(data.error);
      }
    }

    function update() {
      Company.update(companyId, vm.company)
        .then(companySuccessFn)
        .catch(companyErrorFn);
    }

    function companySuccessFn(data) {
      toastr.success('Your account has been updated.');
      vm.company = data;
    }

    function companyErrorFn(errorMsg) {
      toastr.error(errorMsg);
    }

    vm.register = function() {
      Authentication.register(
        vm.company.id,
        vm.newUser)
        .then(registerSuccess)
        .catch(registerError);
    }

    function registerSuccess(data){
      console.log(data);
      vm.newUser = {};
      activate();
    }

    function registerError(errorMsg){
      console.log(errorMsg);
    }

    vm.setAddr = function(addr){
      console.log(addr);
      console.log(companyId);
      var da = {};
      da.default_address = {};
      da.default_address['id'] = addr;
      console.log(da);
      Company.update(companyId, da)
        .then(companySuccessFn)
        .catch(companyErrorFn);
    }

    vm.newAddress = function(addr){
      console.log(addr);
      console.log(companyId);
      addr['addr_company'] = companyId;
      console.log(addr);
      var na = {}
      na['new_addr'] = addr;
      console.log(na);
      Company.newAddress(addr)
        .then(newAddressSuccess)
        .catch(newAddressError);
    }

    function newAddressSuccess(data) {
      toastr.success('Your address has been added.');
      activate();
      vm.newAddr = {};
    }

    function newAddressError(errorMsg) {
      toastr.error(errorMsg);
    }

  }
})();
