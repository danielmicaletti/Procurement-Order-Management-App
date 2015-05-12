'use strict';

angular.module('minovateApp')
  .controller('AddReqModalCtrl', function ($scope, $modal, $log, $localStorage) {
    var vm = this;

    $scope.items = $localStorage.goods;

    $scope.open = function(size) {

      var modalInstance = $modal.open({
        templateUrl: 'static/views/modals/addreq-modal.html',
        controller: 'ModalInstanceCtrl',
        scope: $scope,
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  })

  // Please note that $modalInstance represents a modal window (instance) dependency.
  // It is not the same as the $modal service used above.

  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  })

  .controller('ReqItemModalCtrl', function ($scope, $modal, $log, $localStorage) {
    var vm = this;

    $scope.items = $localStorage.goods;

    $scope.open = function(size) {

      var modalInstance = $modal.open({
        templateUrl: 'static/views/modals/reqitem-modal.html',
        controller: 'ModalInstanceCtrl',
        scope: $scope,
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  })

  .controller('OfferReqItemModalCtrl', function ($scope, $modal, $log, $localStorage) {
    var vm = this;
  
    $scope.isCollapsed = true;
    $scope.items = $localStorage.goods;

    $scope.open = function(size) {

      var modalInstance = $modal.open({
        templateUrl: 'static/views/modals/offeritem-modal.html',
        controller: 'ModalInstanceCtrl',
        scope: $scope,
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

  })

  .controller('OfferBlankItemModalCtrl', function ($scope, $modal, $log, $localStorage) {
    var vm = this;
  
    $scope.items = $localStorage.goods;

    $scope.open = function(size) {

      var modalInstance = $modal.open({
        templateUrl: 'static/views/modals/offeritem-blank-modal.html',
        controller: 'ModalInstanceCtrl',
        scope: $scope,
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

  })  

  .controller('OfferApvlModalCtrl', function ($scope, $modal, $log) {
    var vm = this;
  
    $scope.items = [];

    $scope.open = function(size, type) {
      console.log(type);
      $scope.type = type;

      var modalInstance = $modal.open({
        templateUrl: 'static/views/modals/offerapvl-modal.html',
        controller: 'ModalInstanceCtrl',
        scope: $scope,
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

  });  