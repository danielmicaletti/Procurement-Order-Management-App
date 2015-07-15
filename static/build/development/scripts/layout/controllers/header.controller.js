(function () {
    'use strict';

    angular
        .module('layout.controllers')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$scope', '$state', 'Authentication', 'Messages',];

    function HeaderController($scope, $state, Authentication, Messages) { 
    
        var vm = this;
        vm.logout = logout;

        getNotifications();

        function getNotifications(){
            Messages.getNotifications()
                .then(getNotificationsSuccess)
                .catch(getNotificationsError);
        }

        function getNotificationsSuccess(data){
            console.log(data);
            vm.notifications = data;
            vm.notColor = {
                'order': 'bg-greensea',
                'company': 'bg-drank',
            }
            vm.icon = {
                'order': 'fa fa-pencil-square-o',
                'company': 'fa fa-users',                
            }
        }

        function getNotificationsError(errorMsg){
            console.log(errorMsg);
            vm.msgError = 'There was an issue with notifications';
        }

        vm.goTo = function(content_type, obj_id){
            console.log(content_type);
            console.log(obj_id);
            if(content_type === 'order'){
                $state.go('app.orders.order', {orderId:obj_id});
            }else{
                $state.go('app.pages.company-profile', {companyId:obj_id});
            } 
        }

        function logout() {
            Authentication.logout();
        }

    }
})();
