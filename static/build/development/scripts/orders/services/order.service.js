(function () {
  'use strict';

  angular
    .module('orders.services')
    .factory('Order', Order);

  Order.$inject = ['$http', '$q'];

  function Order($http, $q) {
	var Order = {
        getAll: getAll,
        getOrder: getOrder,
        createOffer: createOffer,
        addToOrder: addToOrder,
    };

    return Order;

    // Get all orders
    function getAll() {
      return $http.get('api/v1/orders/')
        .then(generalCallbackSuccess)
        .catch(generalCallbackError);
    }

    function generalCallbackSuccess(response){
      console.log("order")
      console.log(response.data)
      return response.data;
    }

    function generalCallbackError(response){
      return $q.reject('Error retrieving order details '+response.status+'');
    }

    // Get single order details
    function getOrder(orderId) {
      return $http.get('api/v1/orders/'+orderId+'/')
        .then(generalCallbackSuccess)
        .catch(generalCallbackError);
    }

    // function getOrderResponse(response){
    //   console.log("order")
    //   console.log(response.data)
    //   return response.data;
    // }

    // function getOrderError(response){
    //   return $q.reject('Error retrieving order details '+response.status+'');
    // }

    // Create order offer
    function createOffer(orderId, data) {
      console.log(orderId);
      console.log(data);
      return $http.post('/api/v1/orders/'+orderId+'/offers/', data)
        .then(generalCallbackSuccess)
        .catch(generalCallbackError);
    }

    // function createOfferSuccess(response){
    //   console.log(response.data);
    //   return response.data;
    // }

    // function createOfferError(response){
    //   return $q.reject('Error creating request '+response.status+'');
    // }

    // // Update order status
    // function updateOrderStatus(orderId, data) {
    //   console.log(orderId);
    //   console.log(data);
    //   return $http.put('/api/v1/orders/'+orderId+'/', data)
    //     .then(generalCallbackSuccess)
    //     .catch(generalCallbackError);
    // }

    // function updateOrderStatusSuccess(response){
    //   console.log(response.data);
    //   return response.data;
    // }

    // function updateOrderStatusError(response){
    //   return $q.reject('Error updating order status '+response.status+''); 
    // }

    // Add or update order
    function addToOrder(orderId, data) {
      console.log(orderId);
      console.log(data);
      return $http.put('/api/v1/orders/'+orderId+'/', data)
        .then(generalCallbackSuccess)
        .catch(generalCallbackError);
    }

    // function addRefSuccess(response){
    //   console.log(response.data);
    //   return response.data;
    // }

    // function addRefError(response){
    //   return $q.reject('Error updating order status '+response.status+''); 
    // }

    // Change order delivery address
    // function addRef(orderId, data) {
    //   console.log(orderId);
    //   console.log(data);
    //   return $http.put('/api/v1/orders/'+orderId+'/', data)
    //     .then(generalCallbackSuccess)
    //     .catch(generalCallbackError);
    // }

    // function addRefSuccess(response){
    //   console.log(response.data);
    //   return response.data;
    // }

    // function addRefError(response){
    //   return $q.reject('Error updating order status '+response.status+''); 
    // }        

  }
})();