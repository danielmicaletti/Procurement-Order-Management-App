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


        function activate() {
            var authenticatedAccount = Authentication.getAuthenticatedAccount();

            console.log(authenticatedAccount);
            if (!authenticatedAccount.optiz) {
                $state.go('core.login');
                toastr.error('You are not authorized to view this page.');
            } 
            getOrder();
        }
        console.log(vm.orderId);

        function getOrder(){
            Order.getOrder(vm.orderId)
                .then(getOrderSuccess)
                .catch(getOrderError);
        }

        function getOrderSuccess(data, status, headers, config) {
            vm.order = data;
            console.log(vm.order);
            if(vm.order.order_offer){
                $scope.page = {
                    ref_title: 'Offer',
                };
            }else{
                $scope.page = {
                    ref_title: 'Request',
                };
            }
            if(vm.order.order_status === 'PEN'){
                vm.order.order_status_display = 'demande disponible';
            }
        }

        function getOrderError(errorMsg) {
            $state.go('app.dashboard');
            toastr.error('Your request can not be processed '+errorMsg+'');          
        }
        console.log(vm.offer);

        vm.reqTab = true;

       vm.addItem = function (req_item){
          console.log(req_item);
          req_item.item_sub_total = req_item.quantity*req_item.price;
          console.log(req_item.item_name);
          console.log(vm.offer);
          getTotal(req_item.item_sub_total);
          toastr.success(req_item.item_name+' has been added to Current Offer');
          vm.reqTab = '';
          vm.offerTab = true;

        };

        vm.addBlankItem = function (blank_item){
            console.log(vm.offer.blank_item);
            console.log(blank_item);
            blank_item.item_sub_total = blank_item.quantity*blank_item.price;
            vm.offer.blank_item.push(blank_item);
            vm.blank_item = {};
            console.log(vm.offer);
            getTotal(blank_item.item_sub_total);
            toastr.success(blank_item.item_name+' has been added to Current Offer');
            vm.reqTab = '';
            vm.offerTab = true;
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
          console.log(vm.order);  
          console.log(vm.offer);
          if(!vm.offer.offer_terms){
            console.log(vm.offer);
            vm.offer['offer_terms'] = '';
            console.log(vm.offer.offer_terms);
          }
          if(!vm.offer.offer_total){
            vm.offer['offer_total'] = 0;
          }
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

        function addOfferSuccess(data){
            $log.info(data);
            $state.go('app.orders.order', {orderId:vm.orderId})  
        }

        function addOfferError(errorMsg){
            $log.error(errorMsg);
        }

        vm.delOfferItem = function(ofrItem){
          console.log(ofrItem);
          var index = vm.offer.offer_item.indexOf(ofrItem);
          vm.offer.offer_item.splice(index, 1); 
        }

        vm.delBlankItem = function(ofrItem){
          console.log(ofrItem);
          var index = vm.offer.blank_item.indexOf(ofrItem);
          vm.offer.blank_item.splice(index, 1); 
        }

    }

})();
