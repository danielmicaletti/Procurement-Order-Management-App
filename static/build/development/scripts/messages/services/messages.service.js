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
        };

        return Messages;

        function generalCallbackSuccess(response){
            console.log(response.data)
            console.log(response)
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

    }
})();
