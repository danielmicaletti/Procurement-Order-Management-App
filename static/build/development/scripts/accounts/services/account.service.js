
(function () {
  'use strict';

  angular
    .module('accounts.services')
    .factory('Account', Account);

  Account.$inject = ['$http'];

  function Account($http) {

    var Account = {
      destroy: destroy,
      get: get,
      update: update
    };

    return Account;

    function destroy(username) {
      return $http.delete('/api/v1/accounts/' + username + '/');
    }

    function get(username) {
      return $http.get('/api/v1/accounts/' + username + '/');
    }

    function update(username, account) {
      return $http.put('/api/v1/accounts/' + username + '/', account);
    }    

  }
})();
