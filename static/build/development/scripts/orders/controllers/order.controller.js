(function () {
  'use strict';

  angular
    .module('orders.controllers')
    .controller('OrderController', OrderController);

  OrderController.$inject = [
    '$scope', '$location', '$stateParams', '$state', '$log', 'Authentication', 'Account', 'Company', 'Order', 'toastr',
  ];

  function OrderController($scope, $location, $stateParams, $state, $log, Authentication, Account, Company, Order, toastr) {
    var vm = this;

    activate();

    $scope.page = {
      title: 'Order',
    };

    $scope.stati = {

      'WRQ':'text-cyan',
      'PEN':'text-warning',
      'OFR':'text-drank',
      'VAL':'text-greensea',
      'REF':'text-lightred',
      'APV':'text-success',
      'COM':'text-amethyst',
      'CAN':'text-red',
      'ARC':'text-darkgray',

      // WAITING_REQUEST = 'WRQ'
      // PENDING = 'PEN'
      // OFFER = 'OFR'
      // VALIDATED = 'VAL'
      // REFUSED = 'REF'
      // APPROVED = 'APV'
      // COMPLETED = 'COM'
      // INVOICED = 'INV'
      // CANCELED = 'CAN' 
      // ARCHIVED = 'ARC'   
      // REQUEST_SUBMITTED = 'RSB'
      // APPROVE_REQUEST = 'APR'
      // APPROVE_OFFER = 'APO'
      // APPROVAL_NEEDED = 'APN'
      // OFFER_SUBMITTED = 'OSB'
      // NOT_APPROVED = 'NAP'
      // RETURNED = 'RET'
      // IN_PROGRESS = 'INP'
      // BACKORDER = 'BOR'
    }

  $scope.$watch( 'vm.order.order_status',
      function(newValue, oldValue){
          console.log('nv');
          console.log(newValue);
          console.log(oldValue);
      }
    );

    function activate() {
      var authenticatedAccount = Authentication.getAuthenticatedAccount();
      console.log(authenticatedAccount);
      var orderId = $stateParams.orderId;

      Order.getOrder(orderId).then(getOrderSuccess, getOrderError);

      function getOrderSuccess(data, status, headers, config) {
        vm.order = data;
        console.log(vm.order); 
        if(authenticatedAccount.optiz && vm.order.order_status === 'PEN'){
          toastr.info('Offer needed for this order');
        }     
      }

      function getOrderError(errorMsg) {
        $state.go('app.dashboard');
        toastr.error('Your request can not be processed '+errorMsg+'');
      }
    
    }

    vm.offerApvl = function(status){
      console.log(status);
      var stat={};
      stat.offer = vm.order.offer_order[vm.order.offer_order.length - 1].id;
      stat.order_status = status;
      stat.company_approval_status = status;
      console.log(stat);
      console.log(vm.order.id);
      Order.updateOrderStatus(vm.order.id, stat)
        .then(updateOrderStatusSuccess)
        .catch(updateOrderStatusError);
    }

    function updateOrderStatusSuccess(data, status, headers, config) {
      console.log(data);
      vm.order = data;
      toastr.info('Your response has been sent to Optiz');   
    }

    function updateOrderStatusError(errorMsg) {
      // $state.go('app.dashboard');
      toastr.error('Your request can not be processed '+errorMsg+'');
    }

  }
})();
