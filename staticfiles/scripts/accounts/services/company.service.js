
(function () {
  'use strict';

  angular
    .module('accounts.services')
    .factory('Company', Company);

  Company.$inject = ['$http'];

  /**
   * @namespace Account
   */
  function Company($http) {
    /**
     * @name Account
     * @desc The factory to be returned
     * @memberOf thinkster.accounts.services.Account
     */
    var Company = {
      destroy: destroy,
      get: get,
      update: update
    };

    return Company;

    /////////////////////

    /**
     * @name destroy
     * @desc Destroys the account with username `username`
     * @param {string} username The username of the account to be destroyed
     * @returns {Promise}
     * @memberOf thinkster.accounts.services.Account
     */
    function destroy(companyId) {
      return $http.delete('/api/v1/companies/' + companyId + '/');
    }


    /**
     * @name get
     * @desc Gets the account with username `username`
     * @param {string} username The username of the account to get
     * @returns {Promise}
     * @memberOf thinkster.accounts.services.Account
     */
    function get(companyId) {
      return $http.get('/api/v1/companies/' + companyId + '/');
    }


    /**
     * @name update
     * @desc Update the account with username `username`
     * @param {string} username The username of the account to be updated
     * @param {Object} account The updated account model
     * @returns {Promise}
     * @memberOf thinkster.accounts.services.Account
     */
    function update(companyId, company) {
      return $http.put('/api/v1/companies/' + companyId + '/', company);
    }      

  }
})();