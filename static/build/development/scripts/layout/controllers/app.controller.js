
(function () {
  'use strict';

  angular
    .module('layout.controllers')
    .controller('AppController', AppController);

  AppController.$inject = ['$scope', '$cookies', 'Authentication'];

  function AppController($scope, $cookies, Authentication) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    // console.log(vm.isAuthenticated);
    $scope.au = Authentication.getAuthenticatedAccount();
    // console.log($scope.au);
    // console.log($cookies.authenticatedAccount);

    // if(vm.isAuthenticated === true){
    //     // $scope.au = JSON.parse($cookies.authenticatedAccount);
    //     console.log($scope.au);
    //     console.log($cookies.authenticatedAccount);
    //     $scope.$watchCollection('au', function(newVal, oldVal){
    //         console.log('new Val');
    //         console.log(newVal);
    //         console.log('old Val');
    //         console.log(oldVal);
    //         console.log('cookies');
    //         console.log($cookies.authenticatedAccount);
    //         console.log($scope.au);
    //         $scope.au = newVal;
    //         console.log('new Val');
    //         console.log(newVal);
    //         console.log('old Val');
    //         console.log(oldVal);
    //         console.log($scope.au);
    //     });
    // }

    // $scope.$watchCollection('au', function(newVal, oldVal){
    // $scope.$apply(function(){
    //     console.log($scope.au);
    //     $scope.au = Authentication.getAuthenticatedAccount();
    //     console.log($scope.au);
    //     console.log(newVal);
        // $scope.au = newVal
        // console.log('new Val');
        // console.log(newVal);
        // console.log('old Val');
        // console.log(oldVal);
    // });

    // $scope.$watchCollection('authenticatedAccount', function(newVal, oldVal){
    //     console.log(account);
    //     console.log(newVal);
    //     console.log('new Val');
    //     console.log(newVal);
    //     console.log('old Val');
    //     console.log(oldVal);
    //     console.log(newVal);
    //     console.log('new Val');
    //     console.log(newVal);
    //     console.log('old Val');
    //     console.log(oldVal);
    // });
  }
})();