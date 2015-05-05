(function () {
  'use strict';

  angular
    .module('orders.controllers')
    .controller('OfferController', OfferController);

  OfferController.$inject = [
    '$scope', '$filter', '$state', '$stateParams', '$log', '$cookies', 'Authentication', 'Account', 'Company', 'Order', 'toastr',
  ];

  function OfferController($scope, $filter, $state, $stateParams, $log, $cookies, Authentication, Account, Company, Order, toastr) {

    var vm = this;
 
    vm.orderId = $stateParams.orderId;

    vm.offer = {};
    vm.offer.offer_item = [];
    vm.offer.blank_item = [];

    activate();

    $scope.page = {
      title: 'Offer',
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


    function activate() {
        var authenticatedAccount = Authentication.getAuthenticatedAccount();
        
        console.log(authenticatedAccount);
        if (!authenticatedAccount) {
            $state.go('core.login');
            toastr.error('You are not authorized to view this page.');
        } 
      // else {
      //   // Redirect if logged in, but not the owner of this account.
      //   if (authenticatedAccount) {
      //       // debugger;
      //       $location.url('/');
      //     // toastr.error('You are not authorized to view this page.');
      //     // console.log("2");
      //   }
      // }
        
        console.log(vm.orderId);

        Order.getOrder(vm.orderId).then(getOrderSuccess).catch(getOrderError);

        function getOrderSuccess(data, status, headers, config) {
          vm.order = data;
          console.log(vm.order);
        }

        function getOrderError(errorMsg) {
            $state.go('app.dashboard');
            toastr.error('Your request can not be processed '+errorMsg+'');          
        }
    }
    console.log(vm.offer);

     vm.addItem = function (req_item){
        console.log(req_item);
        req_item.item_sub_total = req_item.quantity*req_item.price;
        // console.log(vm.req_item);
        // console.log(vm.offer.offer_item);
        // if(vm.offer.offer_item.length == 0){
        //     var leng = vm.offer.offer_item.length+=vm.order.req_order.length;
        // } else {
        // var leng = vm.offer.offer_item.length;
        // }
        // console.log(leng);
        // vm.offer.offer_item.push(req_item)
        // vm.offer.offer_item.push({
        //     item_name:req_item.item_name,
        //     item_details:req_item.item_details,
        //     quantity:blank_item.quantity,
        //     rate:blank_item.rate            
        // })
        // angular.forEach(vm.req_item, function(k, v, obj){
        //     console.log(k);
        //     console.log(v);
        //     console.log(obj);
        //     console.log(obj.item_name);
        //     console.log(obj.item_details);
        //     vm.offer.offer_item.item_name = obj.item_name;
        //     vm.offer.offer_item.item_details = obj.item_details;
        // })
        // vm.offer.offer_item.item_name = req_item.item_name,
        // vm.offer.offer_item.item_details = req_item.item_details,
        console.log(req_item);
        console.log(vm.offer);
        getTotal(req_item.item_sub_total);
        // vm.req_item = {};
    };

    vm.addBlankItem = function (blank_item){
        console.log(vm.offer.blank_item);
        console.log(blank_item);
        // if(blank_item.quantity&&blank_item.rate){
        blank_item.item_sub_total = blank_item.quantity*blank_item.price;
        // };
        console.log(blank_item);
        // console.log(vm.order.req_order.length);
        // if(vm.offer.offer_item.length === 0){
        //     vm.offer.offer_item.length+=vm.order.req_order.length;
        // } else {
        //     vm.offer.offer_item.length;
        // }
        // console.log(leng);
        // console.log(vm.offer.offer_item);
        // vm.offer.offer_item.splice(leng, blank_item);
        vm.offer.blank_item.push(blank_item);
        // vm.offer.offer_item.push({
        //     item_name:blank_item.item_name,
        //     item_details:blank_item.item_details,
        //     quantity:blank_item.quantity,
        //     rate:blank_item.rate
        // })
        vm.blank_item = {};
        console.log(vm.offer);
        getTotal(blank_item.item_sub_total);
    }

    function getTotal(item){
        console.log(vm.offer.blank_item);
        console.log(vm.offer.offer_item);
        console.log(item);
        if(vm.offer.offer_total){
            vm.offer['offer_total'] = vm.offer.offer_total += item;
        }else{
            vm.offer['offer_total'] = item;
        }
        console.log(vm.offer.offer_total);
        console.log(vm.offer);
    };

    vm.addOffer = function (){
        console.log(vm.offer);
        vm.offer['order'] = vm.orderId
        angular.forEach(vm.offer.blank_item, function (value, prop, obj) {
            console.log(value); 
            console.log(prop); 
            console.log(obj);
            vm.offer.offer_item.push(value);
        });
        console.log(vm.offer);
        Order.createOffer(vm.orderId, vm.offer)
            .then(addOfferSuccess)
            .catch(addOfferError);
    };

    function addOfferSuccess (data){
        $log.info(data);
        $state.go('app.orders.order', {orderId:vm.orderId})  
    }

    function addOfferError (errorMsg){
        $log.error(errorMsg);
    }
  }

})();
