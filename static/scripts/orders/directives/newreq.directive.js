(function () {
  'use strict';

  angular
    .module('orders.directives')
    .directive('newReq', newReq);

  function newReq() {

	var directive = {
		// replace: true,
		// transclude:true,
    controller: 'RequestController',
    controllerAs: 'vm',
		restrict: 'E',
		scope: {
			req: '=',
      comp: '=',
		},
        templateUrl: '/static/views/directives/newreq-directive.html',
	}

    return directive;
  }

})();