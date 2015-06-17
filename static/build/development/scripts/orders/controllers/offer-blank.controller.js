(function () {
    'use strict';

    angular
        .module('orders.controllers')
        .controller('BlankOfferController', BlankOfferController);

    BlankOfferController.$inject = [
        '$scope', '$filter', '$state', '$stateParams', '$log', '$cookies', 'Authentication', 'Account', 'Company', 'Order', 'toastr',
    ];

    function BlankOfferController($scope, $filter, $state, $stateParams, $log, $cookies, Authentication, Account, Company, Order, toastr) {

        var vm = this;
        // vm.offer = {};
        // vm.order = {};
        // vm.da = {};
        // vm.offer.offer_item = [];
        // vm.offer.blank_item = [];

        activate();

        $scope.page = {
            title: 'Blank Offer',
        };

        function activate() {
            var authenticatedAccount = Authentication.getAuthenticatedAccount();

            console.log(authenticatedAccount);
            if (!authenticatedAccount.optiz) {
                $state.go('app.dashboard');
            } 
            Company.getAll()
              .then(allCompanySuccess)
              .catch(allCompanyError);

            function allCompanySuccess(data){
              console.log(data);
              vm.companies = data;
            }

            function allCompanyError(errorMsg){
              console.log(errorMsg);
            }            
        };

        vm.selectComp = function(company) {
            console.log(vm.companies);
            console.log(company);
            vm.offer = {};
            vm.order = {};
            vm.da = {};
            vm.offer.offer_item = [];
            vm.offer.blank_item = [];
            vm.order.order_company = company;
            console.log(vm.order.order_company);
        };

        vm.addAddr = function(addr){
            console.log(addr);
            console.log(addr.id);
            vm.order['delivery_address'] = addr;
            vm.offer['delivery_address'] = addr.id;
            console.log(vm.order);
            console.log(vm.offer);
        };

        vm.addRef = function(refNum){
            console.log(refNum);
            vm.order['reference_number'] = refNum;
            vm.offer['reference_number'] = refNum;
            console.log(vm.order);
            console.log(vm.offer);
        };        

        vm.addBlankItem = function(blank_item){
            console.log(vm.offer.blank_item);
            console.log(blank_item);
            blank_item.item_sub_total = blank_item.quantity*blank_item.price;
            vm.offer.blank_item.push(blank_item);
            vm.blank_item = {};
            console.log(vm.offer);
            getTotal(blank_item.item_sub_total);
            toastr.success(blank_item.item_name+' has been added to Current Offer');
            vm.offerTab = true;
        };

        function getTotal(item){
            console.log(vm.offer.blank_item);
            console.log(vm.offer.offer_total);
            if(vm.offer.offer_total){
                vm.offer['offer_total'] = vm.offer.offer_total += item;
            }else{
                vm.offer['offer_total'] = item;
            }
            if(!vm.offer.offer_total){
                vm.offer['offer_total'] = 0;
            }
            console.log(vm.offer.offer_total);
            console.log(vm.offer);
        };

        vm.addOffer = function (){
            console.log(vm.order.order_company);
            console.log(vm.offer);
            if(!vm.offer.delivery_address || vm.offer.delivery_address === 'Null'){
                toastr.error('Please add a delivery address');
            }else{
                if(!vm.offer.offer_terms){
                    console.log(vm.offer);
                    vm.offer['offer_terms'] = '';
                    console.log(vm.offer.offer_terms);
                }
                console.log(vm.offer.blank_item);
                vm.offer['offer_item'] = vm.offer.blank_item;
                vm.offer['blank_item'] = {};
                vm.offer['offer_company'] = vm.order.order_company.id;
                vm.offer['blank_offer'] = true;
                console.log(vm.offer);
                Order.createBlankOffer(vm.offer)
                    .then(addOfferSuccess)
                    .catch(addOfferError);
            }
        };

        function addOfferSuccess(data){
            $log.info(data);
            $state.go('app.orders.order', {orderId:data.order})  
        }

        function addOfferError(errorMsg){
            $log.error(errorMsg);
        }

       //  vm.delOfferItem = function(ofrItem){
       //    console.log(ofrItem);
       //    var index = vm.offer.offer_item.indexOf(ofrItem);
       //    vm.offer.offer_item.splice(index, 1); 
       //  }

        vm.delBlankItem = function(ofrItem){
            console.log(ofrItem);
            var index = vm.offer.blank_item.indexOf(ofrItem);
            vm.offer.blank_item.splice(index, 1);
            if(ofrItem.item_sub_total){
                var item = -ofrItem.item_sub_total;
                console.log(item);
                getTotal(item);
            }
        };

        vm.cancelOffer = function(){
            console.log('cancel');
            vm.offer.offer_item = [];
            vm.offer.blank_item = [];            
            vm.offer = {};
            vm.order = {};
            vm.da = {};
            vm.comp = {};
        };

    }

})();
