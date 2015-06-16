(function () {
  'use strict';

  angular
    .module('orders.controllers')
    .controller('OrdersController', OrdersController);

  OrdersController.$inject = [
    '$scope', '$state', '$stateParams', '$log', 'Authentication', 'Account', 'Company', 'Order', 'toastr'
  ];

  function OrdersController($scope, $state, $stateParams, $log, Authentication, Account, Company, Order, toastr) {
    var vm = this;

    activate();

    $scope.page = {
      title: 'Historique',
    };

    function activate() {
      var authenticatedAccount = Authentication.getAuthenticatedAccount();
      console.log(authenticatedAccount)
      vm.user = authenticatedAccount;
      if (!authenticatedAccount) {
        $state.go('core.login');
        toastr.error('You are not authorized to view this page.');
      } 
    }

  }
})();
