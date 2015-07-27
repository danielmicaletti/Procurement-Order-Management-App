(function () {
    'use strict';

    angular
        .module('messages.services')
        .factory('Messages', Messages);

    Messages.$inject = ['$http', '$q',];

    function Messages($http, $q) {

        var Messages = {
            orderActivity: orderActivity,
            getNotifications: getNotifications,
            notificationViewed: notificationViewed,
            getAllMail: getAllMail,
        };

        return Messages;

        function generalCallbackSuccess(response){
            return response.data;
        }

        function generalCallbackError(response){
            return $q.reject('Error '+response.status+'');
        }

        function orderActivity(orderId) {
            return $http.get('/api/v1/order-activity/'+orderId+'/')
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }    

        function getNotifications() {
            return $http.get('/api/v1/notifications/')
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function notificationViewed(notId){
            return $http.put('/api/v1/notifications/'+notId+'/')
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);            
        }

        function getAllMail(){
            return $http.get('api/v1/mail/')
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

    }
})();
