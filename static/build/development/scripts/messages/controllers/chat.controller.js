(function () {
  'use strict';

  angular
    .module('messages.controllers')
    .controller('ChatController', ChatController);

  ChatController.$inject = ['$scope', '$dragon', 'Account', 'Company', 'Messages'];

  function ChatController($scope, $dragon, Account, Company, Messages) {
    var vm = this;

    activate();

    function activate(){
        vm.user = $scope.au;
        console.log(vm.user);
        if(vm.user.optiz){
            Account.getAll()
            .then(getAllSuccess)
            .catch(getCompanyAndOptizError);
        }else{
            Company.get($scope.au.user_company)
            .then(getCompanySuccess)
            .catch(getCompanyAndOptizError);
            Company.getOptiz()
            .then(getOptizSuccess)
            .catch(getCompanyAndOptizError);
        }
    }

    function getAllSuccess(data){
        console.log(data);
        vm.toUsers = data;
        console.log(vm.toUsers);
    }

    function getCompanySuccess(data){
        console.log(data);
        vm.userCompany = data.wease_company;
    }

    function getOptizSuccess(data){
        console.log(data);
        vm.optizUsers = data;
        setUsers();
    }

    function getCompanyAndOptizError(errorMsg){
        console.log(errorMsg);
    }

    function setUsers(){
        angular.forEach(vm.userCompany, function (compUser, key){
            vm.toUsers.push(compUser);
        });
        angular.forEach(vm.optizUsers, function (optizUser, key){
            vm.toUsers.push(optizUser);
        });
        console.log(vm.toUsers);
    }

    // $scope.dynamicPopover = {
    //     content: 'Hello, World!',
    //     templateUrl: 'myPopoverTemplate.html',
    //     title: 'Title'

    // };
    // Messages.getAllMail($scope.au)
    //     .then(getAllMessagesSuccess)
    //     .catch(getAllMessagesError);

    // function getAllMessagesSuccess(response){
    //     console.log(response);
    //     if(vm.fp === 'sent'){
    //     	vm.messages = response.sent;
    //     }else if(vm.fp === 'draft'){
    //     	vm.messages = response.draft;
    //     }else if(vm.fp === 'trash'){
    //     	vm.messages = response.trash;
    // 	}else{
    // 		vm.messages = response.inbox;
    // 	}
    //     console.log(vm.messages);
    // }

    // function getAllMessagesError(errorMsg){
    //     console.log(errorMsg);
    // }

    // $scope.$on("update_mail", function(event, message) {
    //     console.log(message);
    //     if(vm.fp === 'sent'){
    //         vm.messages = message.sent;
    //     }else if(vm.fp === 'draft'){
    //         vm.messages = message.draft;
    //     }else if(vm.fp === 'trash'){
    //         vm.messages = message.trash;
    //     }else{
    //         vm.messages = message.inbox;
    //     }
    //     console.log(vm.messages);
    // });
    // $scope.channel = 'mail';
    // $dragon.onReady(function() {
    //     $dragon.subscribe('mail', $scope.channel, {}).then(function(response) {
    //         $scope.dataMapper = new DataMapper(response.data);
    //         console.log($scope.dataMapper);
    //     });

    //     // $dragon.getList('mail', {}).then(function(response) {
    //     //     console.log(response.data);
    //     //     // getAllMessagesSuccess(response.data);
    //     // });
    //     // $dragon.getList('mail-reply', {}).then(function(response) {
    //     //     console.log(response.data);
    //     //     getAllMessagesSuccess(response.data);
    //     // });
    // });

    // $dragon.onChannelMessage(function(channels, message) {
    //     if (indexOf.call(channels, $scope.channel) > -1) {
    //         $scope.$apply(function() {
    //             // $scope.dataMapper.mapData(vm.messages, message);
    //             console.log('channel here');
    //             Messages.getAllMail($scope.au)
    //                 .then(getAllMessagesSuccess)
    //                 .catch(getAllMessagesError);

    //         });
    //     }
    // });

  }
})();