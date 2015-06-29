(function () {
  'use strict';

  angular
    .module('orders.controllers')
    .controller('OrdersTableController', OrdersTableController);

  OrdersTableController.$inject = [
    '$scope', '$state', '$stateParams', '$log', 'Authentication', 'Account', 'Company', 'Order', 'toastr', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'DTColumnBuilder'
  ];

  function OrdersTableController($scope, $state, $stateParams, $log, Authentication, Account, Company, Order, toastr, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {
    var vm = this;

    vm.authenticatedAccount = Authentication.getAuthenticatedAccount();
    
    vm.orders = [];

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

    Order.getAllSimple().then(getAllSuccess, getAllError);

    function getAllSuccess(data, status, headers, config) {
      vm.orders = data;
      console.log(vm.orders);
    }

    function getAllError(errorMsg) {
      $state.go('app.dashboard');
      toastr.error('Your request can not be processed '+errorMsg+'. Please contact Optiz.');
    }

    vm.dtOptions = DTOptionsBuilder.newOptions()
      .withBootstrap()
      .withOption('order', [[2, 'desc']])
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
