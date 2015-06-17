
(function () {
  'use strict';

  angular
    .module('accounts.services')
    .factory('Company', Company);

  Company.$inject = ['$http', '$q'];

  function Company($http, $q) {

    var Company = {
      getAll: getAll,
      destroy: destroy,
      get: get,
      update: update
    };

    return Company;

    function generalCallbackSuccess(response){
      console.log(response.data)
      console.log(response)
      return response.data;
    }

    function generalCallbackError(response){
      return $q.reject('Error '+response.status+'');
    }

    function getAll() {
      return $http.get('/api/v1/companies/')
        .then(generalCallbackSuccess)
        .catch(generalCallbackError);
    }

    function destroy(companyId) {
      return $http.delete('/api/v1/companies/' + companyId + '/')
        .then(generalCallbackSuccess)
        .catch(generalCallbackError);
    }

    function get(companyId) {
      return $http.get('/api/v1/companies/' + companyId + '/')
        .then(generalCallbackSuccess)
        .catch(generalCallbackError);
    }

    function update(companyId, company) {
      return $http.put('/api/v1/companies/' + companyId + '/', company)
        .then(generalCallbackSuccess)
        .catch(generalCallbackError);
    }      

  }
})();