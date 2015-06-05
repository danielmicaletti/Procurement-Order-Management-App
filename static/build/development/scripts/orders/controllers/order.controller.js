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

    }

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
      Order.addToOrder(vm.order.id, stat)
        .then(updateOrderStatusSuccess)
        .catch(updateOrderStatusError);
    }

    function updateOrderStatusSuccess(data, status, headers, config) {
      console.log(data);
      vm.order = data;
      toastr.info('Your response has been sent to Optiz');   
    }

    function updateOrderStatusError(errorMsg) {
      toastr.error('Your request can not be processed '+errorMsg+'');
    }

    vm.addRef = function(rn){
      var refNum = {};
      refNum.reference_number = rn;
      Order.addToOrder(vm.order.id, refNum)
        .then(addRefSuccess)
        .catch(addRefError);
    }

    function addRefSuccess(data, status, headers, config) {
      console.log(data);
      vm.order.reference_number = data.reference_number;
      // toastr.info('Your response has been sent to Optiz');   
    }

    function addRefError(errorMsg) {
      vm.order.reference_number = vm.order.reference_number;
      toastr.error('Your request can not be processed. Please contact Optiz');
    }

    vm.addAddr = function(addr){
      console.log(addr);
      console.log(vm.order.delivery_address);
      var delAddr = {};
      delAddr.delivery_address = addr;
      Order.addToOrder(vm.order.id, delAddr)
        .then(addAddrSuccess)
        .catch(addAddrError);
    }

    function addAddrSuccess(data, status, headers, config) {
      console.log(data);
      vm.order.delivery_address = data.delivery_address; 
    }

    function addAddrError(errorMsg) {
      vm.order.delivery_address = vm.order.delivery_address;
      toastr.error('Your request can not be processed. Please contact Optiz');
    }

  }
})();
