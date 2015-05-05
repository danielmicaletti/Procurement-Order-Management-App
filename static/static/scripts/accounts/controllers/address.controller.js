(function () {
  'use strict';

  angular
    .module('accounts.controllers')
    .controller('AddressController', AddressController);

  AddressController.$inject = [
    '$scope', '$location', '$stateParams', '$log', 'Authentication', 'Account', 'Company', 'Requests', 'toastr',
  ];

  function AddressController($scope, $location, $stateParams, $log, Authentication, Account, Company, Requests, toastr) {
    var vm = this;

    // activate();

    function activate() {
        // var authenticatedAccount = Authentication.getAuthenticatedAccount();
        // var goodId = $stateParams.goodId;
        // console.log(authenticatedAccount);
        // if (!authenticatedAccount) {
        //     $location.url('/login');
        //     toastr.error('You are not authorized to view this page.');
        // } 
      // else {
      //   // Redirect if logged in, but not the owner of this account.
      //   if (authenticatedAccount) {
      //       // debugger;
      //       $location.url('/');
      //     // toastr.error('You are not authorized to view this page.');
      //     // console.log("2");
      //   }
      // }

        // Requests.getDetails(goodId).then(detailsSuccess, detailsError);

        // function detailsSuccess(data, status, headers, config) {
        //     vm.details = data;
        //     console.log("Details");
        //     console.log(vm.details);      
        // }

        // function detailsError(errorMsg) {
        //     $location.url('/dashboard');
        //     toastr.error('Your request can not be processed '+errorMsg+'');
        // }

        // Company.get(authenticatedAccount.user_company).then(companySuccess).catch(companyError);
        
        // function companySuccess(data, status, headers, config) {
        //     vm.company = data;
        //     console.log("company");
        //     console.log(vm.company);      
        // }

        // function companyError(errorMsg) {
        //     $location.url('/dashboard');
        //     toastr.error('Your request can not be processed '+errorMsg+'');
        // }
    }

    // function getRequest(orderId, reqId){

      // Requests.get(orderId, reqId).then(getReqSuccess).catch(getReqError);
    // }

    // vm.addReq = function (){
    //     console.log("Req Data");
    //     console.log(vm.newReq);
    //     console.log("good Deet");
    //     console.log(vm.details);
    //     for(var item in vm.details){
    //         console.log(vm.details[item].good);
    //     }
    //     console.log(vm.details[item].good);
    //     var par = vm.details[item].good.replace(/domain: | family: | subfamily: |' '/g,'');
    //     console.log(par);
    //     var news = par.split(',');
    //     console.log(news);
    //     vm.newReq['good'] = news;
    //     console.log("Req Data 2");
    //     console.log(vm.newReq);
    //     Requests.createReq(vm.newReq)
    //         .then(addReqSuccess)
    //         .catch(addReqError);
    // };

    // function addReqSuccess (data){
    //     $log.info(data);
    //     $location.path('#/app/orders/order/'+data+'');
    // }

    // function addReqError (errorMsg){
    //     $log.error(errorMsg);

    // }

    // function destroy() {
    //   Request.destroy(vm.account.username).then(accountSuccessFn, accountErrorFn);

    //   function accountSuccessFn(data, status, headers, config) {
    //     Authentication.unauthenticate();
    //     window.location = '/';
    //     toastr.warning('Your account has been deleted.');
    //     console.log("5");
    //   }

    //   function accountErrorFn(data, status, headers, config) {
    //     toastr.error(data.error);
    //     console.log("6");
    //   }
    // }

    // function update() {
    //   var username = $stateParams.username;

    //   Account.update(username, vm.account).then(accountSuccessFn, accountErrorFn);

    //   function accountSuccessFn(data, status, headers, config) {
    //     toastr.success('Your account has been updated.');
    //   }

    //   function accountErrorFn(data, status, headers, config) {
    //     toastr.error(data.error);
    //   }
  }
})();
