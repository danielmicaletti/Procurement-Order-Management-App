(function () {
  'use strict';

  angular
    .module('messages.controllers')
    .controller('InboxController', InboxController);

  InboxController.$inject = ['$scope', 'Messages'];

  function InboxController($scope, Messages) {
    var vm = this;

    // vm.isAuthenticated = Authentication.isAuthenticated();

	$scope.selectedAll = false;

	$scope.selectAll = function() {

		if ($scope.selectedAll) {
			$scope.selectedAll = false;
		} else {
			$scope.selectedAll = true;
		}

		angular.forEach($scope.mails, function(mail) {
			mail.selected = $scope.selectedAll;
		});
	};

	

  }
})();