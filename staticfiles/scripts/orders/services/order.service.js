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
        updateOrderStatus: updateOrderStatus,
    };

    return Order;

    // Get all orders
    function getAll() {
      return $http.get('api/v1/orders/')
      .then(getAllResponse)
      .catch(getAllError);
    }

    function getAllResponse(response){
      console.log("order")
      console.log(response.data)
      return response.data;
    }

    function getAllError(response){
      return $q.reject('Error retrieving order details '+response.status+'');
    }

    // Get single order details
    function getOrder(orderId) {
      return $http.get('api/v1/orders/'+orderId+'/')
      .then(getOrderResponse)
      .catch(getOrderError);
    }

    function getOrderResponse(response){
      console.log("order")
      console.log(response.data)
      return response.data;
    }

    function getOrderError(response){
      return $q.reject('Error retrieving order details '+response.status+'');
    }

    // Create order offer
    function createOffer(orderId, data) {
      console.log(orderId);
      console.log(data);
      return $http.post('/api/v1/orders/'+orderId+'/offers/', data)
        .then(createOfferSuccess)
        .catch(createOfferError);
    }

    function createOfferSuccess(response){
      console.log(response.data);
      return response.data;
    }

    function createOfferError(response){
      return $q.reject('Error creating request '+response.status+'');
    }

    // Update order status
    function updateOrderStatus(orderId, data) {
      console.log(orderId);
      console.log(data);
      return $http.put('/api/v1/orders/'+orderId+'/', data)
        .then(updateOrderStatusSuccess)
        .catch(updateOrderStatusError);
    }

    function updateOrderStatusSuccess(response){
      console.log(response.data);
      return response.data;
    }

    function updateOrderStatusError(response){
      return $q.reject('Error updating order status '+response.status+''); 
    }

  }
})();