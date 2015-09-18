(function () {
  'use strict';

  angular
    .module('messages.controllers')
    .controller('ChatController', ChatController);

  ChatController.$inject = ['$scope', '$dragon', 'Account', 'Company', 'Messages'];

  function ChatController($scope, $dragon, Account, Company, Messages) {
    var vm = this;

    activate();

    vm.toUsers = [];

    vm.chat = {};

    $scope.something = 'blah';

    function activate(){
        vm.user = $scope.au;
        console.log(vm.user);
        getChats();
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

    function getChats(){
        Messages.getChats()
            .then(getChatsSuccess)
            .catch(getChatsError);
    }

    function getChatsSuccess(response){
        console.log(response)
        vm.chats = response;
    }

    function getChatsError(errorMsg){
        console.log(errorMsg)
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

    vm.sendChat = function(chat, convo_id){
        console.log(chat);
        console.log(convo_id);
        if(!convo_id){
            var updChat = _.omit(chat, 'users');
            console.log('updcht', updChat);
            updChat.users = [];
            console.log(updChat);
            angular.forEach(chat.users, function(v,k,o){
                updChat.users.push(v.id);
            })            
        }else{
            chat.chatid = convo_id;
            console.log(chat);
            var updChat = chat;
        }
        Messages.sendChat(updChat)
            .then(sendChatSuccess)
            .catch(sendChatError);

    }

    function sendChatSuccess(response){
        console.log(response);
        vm.chat = {};
        // getChats();
        // vm.convos = _.findWhere(vm.chats, {id: response.chat});
        // console.log(vm.convos);

    }

    function sendChatError(errorMsg){
        console.log(errorMsg);
    }

    vm.getConv = function(chat_id){
        console.log(chat_id);
        vm.convos = {};
        if(!chat_id){
            vm.convos = {};
        }else{
            vm.convos = _.findWhere(vm.chats, {id: chat_id});
            console.log(vm.convos);
        }
    }
    // vm.tmpCnv = {};
    // $scope.chatChannel = 'chat';
    $scope.chatMessageChannel = 'chat-message'
    $dragon.onReady(function() {
        // $dragon.subscribe('chat', $scope.chatChannel, {}).then(function(response) {
        //         // $scope.dataMapper = new DataMapper(response.data);
        //         // console.log($scope.dataMapper);
        //         console.log(response);
        // });
        $dragon.subscribe('chat-message', $scope.chatMessageChannel, {}).then(function(response) {
                // $scope.dataMapper = new DataMapper(response.data);
                console.log(response);
        });
    });

    $dragon.onChannelMessage(function(channels, message) {
        // if (indexOf.call(channels, $scope.chatChannel) > -1) {
        //     $scope.$apply(function() {
        //         // $scope.dataMapper.mapData(vm.messages, message);
        //         console.log(message);


        //     });
        // }

        if (indexOf.call(channels, $scope.chatMessageChannel) > -1) {
            $scope.$apply(function() {
                // $scope.dataMapper.mapData(vm.messages, message);
                console.log(message.data._type, message);
                console.log( _.contains(vm.chats, {chat_group:[{id:message.data.id}]}) );

                // if(message.data._type === 'chat'){

                //     var chatId = message.data.id;
                //     console.log(!_.contains(vm.chats, {'id':chatId}));
                //     if(!vm.convos.id || !_.contains(vm.chats, {'id':chatId}) ){ 
                //         vm.tmpCnv['chat_group'] = []
                //         vm.tmpCnv.id = chatId;
                //         vm.tmpCnv['users'] = message.data.users;
                //         console.log('new chat', vm.tmpCnv);
                //         vm.convos = vm.tmpCnv;
                //     }

                // }else if(message.data._type === 'chatmessage'){
                    console.log(vm.chats);
                    // vm.tmpConv = _.findWhere(vm.chats, {id:message.data.chat.id });
                    // if(vm.tmpConv){
                    //     console.log('in chats', vm.tmpChat)
                    // }else{
                    //     console.log('not in chats', vm.tmpChat)
                    // }
                    vm.tmpChat = _.findWhere(vm.chats, {id:message.data.chat.id });
                    vm.chatGroup = _.omit(message.data, 'chat');
                    console.log('vm chat grp', vm.chatGroup);
                    if(vm.tmpChat){
                        console.log('in chats', vm.tmpChat)
                        vm.tmpChat['chat_group'].push(vm.chatGroup);
                        console.log('add to chats', vm.tmpChat)
                    }else{
                        console.log('not in chats', vm.tmpChat)
                        vm.tmpObj = {}
                        vm.tmpObj = message.data.chat;
                        vm.tmpObj['chat_group'] = [];
                        vm.tmpObj['chat_group'].push(vm.chatGroup);
                        console.log('tmpObj', vm.tmpObj);
                        vm.chats.push(vm.tmpObj);
                        vm.convos = vm.tmpObj;
                    }
                    console.log(vm.chats);
                    // angular.forEach(vm.chats, function (val, key, obj){
                    //     if(message.data.chat.id === val.id){
                    //         vm.isChat = true;
                    //     }else{
                    //         vm.isChat = false;
                    //     }
                    // });
                    // console.log(vm.tmpChats);
                    // console.log(vm.chats);
                    // console.log(vm.isChat);
                    // if(!vm.isChat){
                    //     console.log('new conv',vm.tmpCnv);
                    //     vm.tmpCnv['chat_group'].push(message.data);
                    //     console.log(vm.tmpCnv);
                    //     vm.chats.push(vm.tmpCnv);
                    // }else{
                    //     vm.tmpChat = _.findWhere(vm.chats, {id:message.data.chat.id });
                    //     console.log('exist chat', vm.tmpChat);
                    //     vm.tmpChat['chat_group'].push(message.data);
                    //     console.log(vm.chats);
                    // }
                    // if(message.data.chat.id === vm.convos.id){

                    //     vm.convos['chat_group'].push(message.data);
                    //     console.log('cur chat', vm.convos);
                    // }
                    // var tmpChat = _.findWhere(vm.chats, {id:message.data.chat.id });
                    // console.log(tmpChat);
                    // tmpChat['chat_group'].push(message.data);
                    // console.log(vm.chats);
                // }


            });
        }
    });

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