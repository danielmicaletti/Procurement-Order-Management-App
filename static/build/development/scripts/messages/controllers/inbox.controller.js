(function () {
  'use strict';

  angular
    .module('messages.controllers')
    .controller('InboxController', InboxController);

  InboxController.$inject = ['$scope', '$state', '$stateParams', 'Messages'];

  function InboxController($scope, $state, $stateParams, Messages) {
    var vm = this;

    vm.fp = $stateParams.filterParam;
    console.log(vm.fp);
    vm.mail = {};
	vm.mail['selected'] = false;

	vm.selectAll = function() {

		if (vm.selectedAll === true) {
			vm.mail['selected'] = true;
		} else {
			vm.mail['selected'] = false;
		}

		angular.forEach($scope.mails, function(mail) {
			mail.selected = $scope.selectedAll;
		});
	};

    Messages.getAllMessages()
        .then(getAllMessagesSuccess)
        .catch(getAllMessagesError);

    function getAllMessagesSuccess(response){
        console.log(response);
        if(vm.fp === 'sent'){
        	vm.messages = response.sent;
        }else if(vm.fp === 'draft'){
        	vm.messages = response.draft;
        }else if(vm.fp === 'trash'){
        	vm.messages = response.trash;
    	}else{
    		vm.messages = response.inbox;
    	}
        console.log(vm.messages);
    }

    function getAllMessagesError(errorMsg){
        console.log(errorMsg);
    }
  }
})();