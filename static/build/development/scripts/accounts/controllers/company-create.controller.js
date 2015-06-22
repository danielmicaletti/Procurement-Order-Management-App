(function () {
    'use strict';

    angular
        .module('accounts.controllers')
        .controller('CreateCompanyController', CreateCompanyController);

    CreateCompanyController.$inject = [
        '$scope', '$state', '$stateParams', 'Authentication', 'Account', 'Company','toastr',
    ];

    function CreateCompanyController($scope, $state, $stateParams, Authentication, Account, Company, toastr) {
        var vm = this;

        vm.company = {};

        activate();

        $scope.page = {
            title: 'Create Company',
        };

        function activate() {
            vm.authAcct = Authentication.getAuthenticatedAccount();
            console.log(vm.authAcct);
            if(!vm.authAcct.optiz){
                $state.go('app.dashboard');
            }
        }

        vm.createCompany = function(){
            console.log(vm.company);
            Company.create(vm.company)
                .then(createCompanySuccess)
                .catch(createCompanyError);
        }

        function createCompanySuccess(data){
            console.log(data);
        }

        function createCompanyError(errorMsg){
            toastr.error('There was a problem creating this company '+errorMsg+'');
        }

    };
})();