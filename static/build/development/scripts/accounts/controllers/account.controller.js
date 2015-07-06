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
            // Get Auth user
            vm.authAcct = Authentication.getAuthenticatedAccount();
            console.log(vm.authAcct);
            // GET Account with success/error callbacks
            Account.get(vm.username)
                .then(accountSuccessFn)
                .catch(accountErrorFn);

            function accountSuccessFn(data) {
                vm.account = data;  
                console.log(vm.account); 
                getCompany();
                if(vm.authAcct.id === vm.account.id){
                    vm.isUser = true;
                }else{
                    vm.isUser = false;
                }
            }

            function accountErrorFn(errorMsg) {
                $state.go('app.dashboard');
                toastr.error('That user does not exist.');
            }
        }

        function getCompany(){
            console.log(vm.account.user_company);
            Company.get(vm.account.user_company)
              .then(companySuccessFn)
              .catch(companyErrorFn);  
        }

        // GET company details success/error callbacks
        function companySuccessFn(data, status, headers, config) {
            console.log(data);
            vm.company = data;
        }

        function companyErrorFn(data, status, headers, config) {
            console.log(data);
            $state.go('app.dashboard');
            toastr.error('That company does not exist.');
        }

        // Destroy Account with success/error callbacks
        function destroy() {
            Account.destroy(vm.account.username)
                .then(destroySuccessFn)
                .catch(destroyErrorFn);
        }

        function destroySuccessFn(data, status, headers, config) {
            Authentication.unauthenticate();
            $state.go('app.dashboard');
            toastr.warning('Your account has been deleted.');
        }

        function destroyErrorFn(errorMsg) {
            toastr.error(errorMsg);
        }

        // Update Account with success/error callbacks
        function update() {
            Account.update(vm.username, vm.account)
                .then(updateSuccessFn)
                .catch(updateErrorFn);
        }

        function updateSuccessFn(data, status, headers, config) {
            console.log(data);
            if(vm.account.id === vm.authAcct.id){
                vm.account = data;
                Authentication.setAuthenticatedAccount(data)
            }
            getCompany();
            toastr.success('Your account has been updated.');
        }

        function updateErrorFn(data, status, headers, config) {
            toastr.error('There was an issue to update your account '+errorMsg+'. Please contact Optiz.');
        }
        // vm.showPass = function(){

        // }
    };
})();