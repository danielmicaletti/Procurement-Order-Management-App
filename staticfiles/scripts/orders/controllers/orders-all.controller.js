// 'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:ShopOrdersCtrl
 * @description
 * # ShopOrdersCtrl
 * Controller of the minovateApp
 */
// angular.module('minovateApp')
//   .controller('OrdersCtrl', function ($scope) {
//     $scope.page = {
//       title: 'Orders',
//       subtitle: 'Place subtitle here...'
//     };
//   })

//   .controller('OrdersTableCtrl', function ($scope, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder, $resource) {

//     var vm = this;
//     vm.orders = [];
//     vm.dtOptions = DTOptionsBuilder.newOptions()
//       .withBootstrap()
//       .withOption('order', [[1, 'asc']])
//       .withDOM('<"row"<"col-md-8 col-sm-12"<"inline-controls"l>><"col-md-4 col-sm-12"<"pull-right"f>>>t<"row"<"col-md-4 col-sm-12"<"inline-controls"l>><"col-md-4 col-sm-12"<"inline-controls text-center"i>><"col-md-4 col-sm-12"p>>')
//       .withLanguage({
//         "sLengthMenu": 'View _MENU_ records',
//         "sInfo":  'Found _TOTAL_ records',
//         "oPaginate": {
//           "sPage":    "Page",
//           "sPageOf":  "of"
//         }
//       })
//       .withPaginationType('input')
      //.withScroller()
      //.withOption("sScrollY", false)
      //.withOption("sScrollX")
  //     .withColumnFilter();


  //   vm.dtColumnDefs = [
  //     DTColumnDefBuilder.newColumnDef(0).notSortable(),
  //     DTColumnDefBuilder.newColumnDef(8).notSortable()
  //   ];

  //   vm.selectedAll = false;

  //   vm.selectAll = function () {

  //     if ($scope.selectedAll) {
  //       $scope.selectedAll = false;
  //     } else {
  //       $scope.selectedAll = true;
  //     }

  //     angular.forEach(vm.orders, function(order) {
  //       order.selected = $scope.selectedAll;
  //     });
  //   };

  //   $resource('http://www.filltext.com/?rows=300&id={index}&date={date|01-01-2012,01-01-2015}&placedby={firstName}~{lastName}&status=["pending","closed","sent","cancelled"]&quantity={number|20}&total={numberLength|3}}&shipto={streetAddress}~{city}&selected=false&pretty=true').query().$promise.then(function(orders) {
  //     vm.orders = orders;
  //   });

  // });




(function () {
  'use strict';

  angular
    .module('orders.controllers')
    .controller('OrdersController', OrdersController);

  OrdersController.$inject = [
    '$scope', '$stateParams', '$log', 'Authentication', 'Account', 'Company', 'Order', 'toastr'
  ];

  function OrdersController($scope, $stateParams, $log, Authentication, Account, Company, Order, toastr) {
    var vm = this;

    activate();

    $scope.page = {
      title: 'Orders',
    };

    // $scope.stati = {

    //   'WQR':'text-slategray',
    //   'PEN':'text-orange',
    //   'OFR':'text-drank',
    //   'VAL':'text-greensea',
    //   'REF':'text-lightred',
    //   'APV':'text-success',
    //   'COM':'text-primary',
    //   'CAN':'text-red',
    //   'ARC':'text-darkgray',

      
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
    // }

    function activate() {
      var authenticatedAccount = Authentication.getAuthenticatedAccount();
      console.log(authenticatedAccount)
      vm.user = authenticatedAccount;
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

      // Order.getAll().then(getAllSuccess, getAllError);

      // function getAllSuccess(data, status, headers, config) {
      //   vm.allOrders = data;
      //   console.log("Orderz Info");
      //   console.log(vm.allOrders);      
      // }

      // function getAllError(errorMsg) {
      //   $state.go('app.dashboard');
      //   toastr.error('Your request can not be processed '+errorMsg+'');
      // }
    }

    // vm.orders = [];
    // vm.dtOptions = DTOptionsBuilder.newOptions()
    //   .withBootstrap()
    //   .withOption('order', [[1, 'asc']])
    //   .withDOM('<"row"<"col-md-8 col-sm-12"<"inline-controls"l>><"col-md-4 col-sm-12"<"pull-right"f>>>t<"row"<"col-md-4 col-sm-12"<"inline-controls"l>><"col-md-4 col-sm-12"<"inline-controls text-center"i>><"col-md-4 col-sm-12"p>>')
    //   .withLanguage({
    //     "sLengthMenu": 'View _MENU_ records',
    //     "sInfo":  'Found _TOTAL_ records',
    //     "oPaginate": {
    //       "sPage":    "Page",
    //       "sPageOf":  "of"
    //     }
    //   })
    //   .withPaginationType('input')
    //   //.withScroller()
    //   //.withOption("sScrollY", false)
    //   //.withOption("sScrollX")
    //   .withColumnFilter();


    // vm.dtColumnDefs = [
    //   DTColumnDefBuilder.newColumnDef(0).notSortable(),
    //   DTColumnDefBuilder.newColumnDef(8).notSortable()
    // ];

    // vm.selectedAll = false;

    // vm.selectAll = function () {

    //   if ($scope.selectedAll) {
    //     $scope.selectedAll = false;
    //   } else {
    //     $scope.selectedAll = true;
    //   }

    //   angular.forEach(vm.orders, function(order) {
    //     order.selected = $scope.selectedAll;
    //   });
    // };

  }
})();
