
(function () {
    'use strict';

    angular
        .module('layout.controllers')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '$cookies', 'Authentication', 'Order'];

    function AppController($scope, $cookies, Authentication, Order) {
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

        // function apvOrders(){
        Order.getAllApv()
            .then(getAllApvSuccess)
            .catch(getAllApvError);
        // }

        function getAllApvSuccess(data){
            console.log(data);
            $scope.apvNeeded = [];
            angular.forEach(data, function(v, k, o) {
                $scope.apvNeeded.push(v.id);
            });
            console.log($scope.apvNeeded);
        }

        function getAllApvError(errorMsg){
            console.log(errorMsg);
        }

        $scope.stati = {
            'WRQ':'text-cyan',
            'PEN':'text-warning',
            'OFR':'text-drank',
            'APN':'text-dutch',
            'REF':'text-lightred',
            'APV':'text-success',
            'COM':'text-greensea',
            'CAN':'text-red',
            'ARC':'text-darkgray',
            'INP':'text-primary',
            'INV':'text-amethyst',
        } 

        $scope.statiBg = {
            'WRQ':'bg-cyan',
            'PEN':'bg-warning',
            'OFR':'bg-drank',
            'APN':'bg-dutch',
            'REF':'bg-lightred',
            'APV':'bg-success',
            'COM':'bg-greensea',
            'CAN':'bg-red',
            'ARC':'bg-darkgray',
            'INP':'bg-primary',
            'INV':'bg-amethyst',
        }

        $scope.notIcon = {
            'company registered': 'fa-university',
            'company updated': 'fa-plus',
            'user created': 'fa-user',
            'optiz assigned': 'fa-users',
            'request item created': 'fa-file-text-o',
            'request item updated': 'fa-pencil',
            'request submitted': 'fa-sign-in',
            'request created': 'fa-sign-out',
            'offer created': 'fa-clipboard', 
            'order status updated': 'fa-pencil-square-o',
            'comment added': 'fa-quote-right',          
        }

        $scope.notColor = {
            'company registered': 'bg-primary',
            'company updated': 'bg-slategray',
            'user created': 'bg-blue lt',
            'optiz assigned': 'bg-dutch',
            'request item created': 'bg-info',
            'request item updated': 'bg-amethyst dk',
            'request submitted': 'bg-hotpink dk',
            'request created': 'bg-greensea',
            'offer created': 'bg-drank',
            'order status updated': 'bg-default',
            'comment added': 'bg-slategray',
        }

        $scope.notTextColor = {
            'company registered': 'text-primary',
            'company updated': 'text-slategray',
            'user created': 'text-blue lt',
            'optiz assigned': 'text-dutch',
            'request item created': 'text-info',
            'request item updated': 'text-amethyst dk',
            'request submitted': 'text-hotpink dk',
            'request created': 'text-greensea',
            'offer created': 'text-drank',
            'order status updated': 'text-default',
            'comment added': 'text-slategray',
        }

    }
})();