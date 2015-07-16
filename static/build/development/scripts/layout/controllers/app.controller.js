
(function () {
    'use strict';

    angular
        .module('layout.controllers')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '$cookies', 'Authentication'];

    function AppController($scope, $cookies, Authentication) {
        var vm = this;

        vm.isAuthenticated = Authentication.isAuthenticated();
        console.log(vm.isAuthenticated);
        $scope.au = Authentication.getAuthenticatedAccount();
        console.log($scope.au);
        if($scope.au.access_level >= 8){
            $scope.admin = true;
            console.log($scope.admin);
        }
        if($scope.au.access_level >= 7){
            $scope.mgr = true;
            console.log($scope.mgr);
        }
        if($scope.au.access_level >= 6){
            $scope.apv = true;
            console.log($scope.apv);
        }
        if($scope.au.access_level >= 5){
            $scope.sub = true;
            console.log($scope.sub);
        }else{
            $scope.view = true;
            console.log($scope.view);
        }

        $scope.countries = ['France', 'Morocco', 'United States', 'Spain', 'Germany'];
        console.log($scope.countries);

        $scope.stati = {
            'WRQ':'text-cyan',
            'PEN':'text-warning',
            'OFR':'text-drank',
            'APN':'text-dutch',
            'VAL':'text-greensea',
            'REF':'text-lightred',
            'APV':'text-success',
            'COM':'text-amethyst',
            'CAN':'text-red',
            'ARC':'text-darkgray',
            'INP':'text-primary',
            'INV':'text-info',
        }  
    }
})();