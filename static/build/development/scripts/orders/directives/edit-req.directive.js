(function () {
  'use strict';

  angular
    .module('orders.directives')
    .directive('editReq', editReq);

  function editReq() {

	var directive = {
		// replace: true,
		// transclude:true,
    controller: 'EditRequestController',
    controllerAs: 'vm',
		restrict: 'E',
		scope: {
			req: '=',
      comp: '=',
		},
        templateUrl: static_path('/views/directives/editreq-directive.html'),
	}

    return directive;
  }

})();