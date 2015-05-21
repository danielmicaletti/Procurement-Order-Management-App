(function () {
  'use strict';

  angular
    .module('orders.controllers')
    .controller('OrdersTableController', OrdersTableController);

  OrdersTableController.$inject = [
    '$scope', '$stateParams', '$log', 'Authentication', 'Account', 'Company', 'Order', 'toastr', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'DTColumnBuilder'
  ];

  function OrdersTableController($scope, $stateParams, $log, Authentication, Account, Company, Order, toastr, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {
    var vm = this;

    vm.orders = [];

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


      // 'WQR':'bg-slategray',
      // 'PEN':'bg-orange',
      // 'OFR':'bg-drank',
      // 'VAL':'bg-greensea',
      // 'REF':'bg-lightred',
      // 'APV':'bg-success',
      // 'COM':'bg-primary',
      // 'CAN':'bg-red',
      // 'ARC':'bg-darkgray',

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

    Order.getAll().then(getAllSuccess, getAllError);

    function getAllSuccess(data, status, headers, config) {
      vm.orders = data;
      console.log(vm.orders);      
    }

    function getAllError(errorMsg) {
      $state.go('app.dashboard');
      toastr.error('Your request can not be processed '+errorMsg+'');
    }

    vm.dtOptions = DTOptionsBuilder.newOptions()
      .withBootstrap()
      .withOption('order', [[0, 'desc']])
      .withDOM('<"row"<"col-md-8 col-sm-12"<"inline-controls"l>><"col-md-4 col-sm-12"<"pull-right"f>>>t<"row"<"col-md-4 col-sm-12"<"inline-controls"l>><"col-md-4 col-sm-12"<"inline-controls text-center"i>><"col-md-4 col-sm-12"p>>')
      .withLanguage({
        "sLengthMenu": 'View _MENU_ records',
        "sInfo":  'Found _TOTAL_ records',
        "oPaginate": {
          "sPage":    "Page",
          "sPageOf":  "of"
        }
      })
      .withPaginationType('input')
      // .withScroller()
      // .withOption("sScrollY", false)
      // .withOption("sScrollX")
      .withColumnFilter();


    vm.dtColumnDefs = [
      // DTColumnDefBuilder.newColumnDef(0).notSortable(),
      DTColumnDefBuilder.newColumnDef(8).notSortable()
    ];

    vm.selectedAll = false;

    vm.selectAll = function () {

      if ($scope.selectedAll) {
        $scope.selectedAll = false;
      } else {
        $scope.selectedAll = true;
      }

      angular.forEach(vm.orders, function(order) {
        order.selected = $scope.selectedAll;
      });
    };
  }
})();
