(function () {
  'use strict';

  angular
    .module('messages.controllers')
    .controller('MailController', MailController);

  MailController.$inject = ['$scope', 'Authentication', 'Messages'];

  function MailController($scope, Authentication, Messages) {
    var vm = this;
    vm.messages = {};
    activate();

    function activate(){
        vm.user = Authentication.getAuthenticatedAccount();
        console.log(vm.user);
        getMessages();
    }

    function getMessages(){
        Messages.getAllMail()
            .then(getAllMailSuccess)
            .catch(getAllMailError);
    }

    function getAllMailSuccess(data){
        console.log(data);
        vm.messages.inbox = [];
        vm.messages.sent = [];
        vm.messages.draft = [];
        vm.messages.trash = [];
        angular.forEach(data, function (v, k, o){
            console.log(v);
            if(v.mail_created_by.username === vm.user.username){
                console.log('sent');
                vm.messages.sent.push(v);
            }
            if(v.mail_draft === true){
                console.log('draft');
                vm.messages.draft.push(v);
            }
            if(v.trash === true){
                console.log('trash');
                vm.messages.trash.push(v);
            }
            angular.forEach(v.mail_to, function (val, key, obj){
                console.log(val);
                if(val.username === vm.user.username){
                    console.log('inbox');
                    vm.messages.inbox.push(v);
                }
            }) 
        })
        console.log(vm.messages);
    }

    function getAllMailError(errorMsg){
        console.log(errorMsg);
    }

    vm.mailType = function(mail){
        console.log(mail)
        vm.msgs = mail;
    }

  }
})();
