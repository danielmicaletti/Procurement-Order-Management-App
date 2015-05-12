
(function () {
  'use strict';

  angular
    .module('layout.controllers')
    .controller('NavController', NavController);

  NavController.$inject = ['$scope', '$localStorage', 'Authentication', 'Goods'];

  function NavController($scope, $localStorage, Authentication, Goods) {  
    var vm = this;
    vm.icon = ['file-o','building','table','desktop','th-large','plus-square-o']
    vm.user = Authentication.getAuthenticatedAccount();
    console.log(vm.user);
    Goods.get().then(getGoodsSuccess).catch(getGoodsError);
    
    function getGoodsSuccess (goods){
      console.log(goods);
    	vm.allGoods = goods;
      $localStorage.goods = goods;
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