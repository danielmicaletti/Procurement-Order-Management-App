(function () {
  'use strict';

  angular
    .module('accounts.directives')
    .directive('address', address);

  function address() {

	var directive = {
		// replace: true,
		// transclude:true,
    controller: 'RequestController',
    controllerAs: 'vm',
		restrict: 'E',
		scope: {
			req: '=',
      comp: '=',
      newreq: '=',
		},
        templateUrl: static_path('/views/directives/address-directive.html'),
	}

    return directive;
  }

})();