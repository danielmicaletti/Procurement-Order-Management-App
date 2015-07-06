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
                    vm.isAuth = true;      
                    console.log(vm.company);
                }else{
                    $state.go('app.dashboard');
                    toastr.error('You are not authorized to view this page.');
                }
                if(vm.authenticatedAccount.optiz){
                    Company.getOptiz()
                        .then(getOptizSuccess)
                        .catch(getOptizError);
                    console.log(vm.company.company_assigned_to);
                    vm.addOptiz = angular.copy(vm.company.company_assigned_to);
                    console.log(vm.addOptiz);
                }  
            }

            function companyErrorFn(errorMsg) {
                $state.go('app.dashboard');
                toastr.error('There was a problem retrieving your information '+errorMsg+'. Please contact Optiz.');
            }

            function getOptizSuccess(data){
                console.log(data);
                vm.optizUsers = data;
            }

            function getOptizError(errorMsg){
                console.log(errorMsg);
            }
        }

        function destroy() {
            Company.destroy(vm.company.id)
                .then(companySuccessFn)
                .catch(companyErrorFn);
        }

        function companySuccessFn(data, status, headers, config) {
            $state.go('app.dashboard');
            toastr.warning('Your company has been deleted.');
        }

        function companyErrorFn(data, status, headers, config) {
            toastr.error(data.error);
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

        vm.delAddr = function(addr){
            console.log(addr);
            Company.destroyAddress(addr)
                .then(destroyAddressSuccess)
                .catch(destroyAddressError);
        }

        function destroyAddressSuccess(data){
            console.log(data);
            activate();
        }

        function destroyAddressError(errorMsg){
            console.log(errorMsg);
            toastr.error('There was an issue to delete this address. Please contact Optiz.');
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

        vm.editAddr = function(index, addr){
            console.log(index);
            console.log(addr);
            vm.hideStatic = index;
            vm.updAddr = angular.copy(addr);
            console.log(vm.updAddr);
        }

        vm.cancelEdit = function(addr){
            console.log(addr);
            vm.updAddr = addr;
            vm.hideStatic = '';
        }

        vm.updateAddr = function(addr){
            console.log(addr);
            Company.updAddress(addr)
                .then(updateAddressSuccess)
                .catch(updateAddressError);
        }

        function updateAddressSuccess(data){
            activate();
            vm.hideStatic = '';
        }

        function updateAddressError(errorMsg){
            toastr.error(errorMsg);
        }

        vm.assignOptiz = function(optiz){
            console.log(optiz);
            var ao = {};
            ao['assign_optiz'] = optiz;
            Company.update(companyId, ao)
                .then(assignOptizSuccess)
                .catch(assignOptizError);
        }

        function assignOptizSuccess(data){
            console.log(data);
            vm.company = data;
            vm.addOptiz = data.company_assigned_to
            toastr.info('The account has been updated')
        }

        function assignOptizError(errorMsg){
            console.log(errorMsg);
        }

    }
})();
