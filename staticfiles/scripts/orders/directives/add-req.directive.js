(function () {
  'use strict';

  angular
    .module('orders.directives')
    .directive('addReq', addReq);

  function addReq() {

	var directive = {
		// replace: true,
		// transclude:true,
    controller: 'AddRequestController',
    controllerAs: 'vm',
		restrict: 'E',
		scope: {
			req: '=',
      comp: '=',
		},
        templateUrl: '/static/views/directives/addreq-directive.html',
	}

    return directive;
  }

})();