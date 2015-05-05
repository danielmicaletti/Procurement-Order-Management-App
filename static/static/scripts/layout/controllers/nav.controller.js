
(function () {
  'use strict';

  angular
    .module('layout.controllers')
    .controller('NavCtrl', NavCtrl);

  NavCtrl.$inject = ['$scope', '$localStorage', 'Authentication', 'Goods'];

  function NavCtrl($scope, $localStorage, Authentication, Goods) {  
    var vm = this;
    vm.icon = ['file-o','building','table','desktop','th-large','plus-square-o']
    vm.user = Authentication.getAuthenticatedAccount();
    console.log(vm.user);
    Goods.get().then(getGoodsSuccess).catch(getGoodsError);
    
    function getGoodsSuccess (goods){
    	vm.allGoods = goods.data;
      $localStorage.goods = goods.data;
    	console.log(vm.allGoods);
    };

    function getGoodsError (msg){
    	console.log('Goods Error '+ msg);
    };

    $scope.oneAtATime = false;

    $scope.status = {
      isFirstOpen: true,
      isSecondOpen: false,
      isThirdOpen: false
    };

  }
})();