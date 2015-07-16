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
                'company registered': 'bg-primary',
                'company updated': 'bg-slategray',
                'user created': 'bg-blue lt',
                'optiz assigned': 'bg-dutch',
                'request item created': 'bg-info',
                'request item updated': 'bg-amethyst dk',
                'request submitted': 'bg-hotpink dk',
                'request created': 'bg-greensea',
                'offer created': 'bg-drank',
                'order status updated': 'bg-default',
                'comment added': 'bg-slategray',
            }
            vm.icon = {
                'company registered': 'fa fa-university',
                'company updated': 'fa fa-plus',
                'user created': 'fa fa-user',
                'optiz assigned': 'fa fa-users',
                'request item created': 'fa fa-file-text-o',
                'request item updated': 'fa fa-pencil',
                'request submitted': 'fa fa-sign-in',
                'request created': 'fa fa-sign-out',
                'offer created': 'fa fa-clipboard', 
                'order status updated': 'fa fa-pencil-square-o',
                'comment added': 'fa fa-quote-right',          
            }
        }

        function getNotificationsError(errorMsg){
            console.log(errorMsg);
            vm.msgError = 'There was an issue with notifications';
        }

        vm.goTo = function(notId){
            console.log(notId);
            Messages.notificationViewed(notId)
                .then(notificationViewedSuccess)
                .catch(notificationViewedError); 
        }

        function notificationViewedSuccess(data){
            console.log(data);
            getNotifications();
            if(data.content_type === 'order'){
                $state.go('app.orders.order', {orderId:data.object_id});
            }else{
                $state.go('app.pages.company-profile', {companyId:data.object_id});
            }
        }

        function notificationViewedError(errorMsg){
            console.log(errorMsg);
        }

        function logout() {
            Authentication.logout();
        }

    }
})();
