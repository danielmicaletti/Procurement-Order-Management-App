(function () {
  'use strict';

  angular
    .module('authentication.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$cookies', '$http'];

  /**
   * @namespace Authentication
   * @returns {Factory}
   */
  function Authentication($cookies, $http) {
    /**
     * @name Authentication
     * @desc The Factory to be returned
     */
    var Authentication = {
      getAuthenticatedAccount: getAuthenticatedAccount,
      isAuthenticated: isAuthenticated,
      login: login,
      logout: logout,
      register: register,
      setAuthenticatedAccount: setAuthenticatedAccount,
      unauthenticate: unauthenticate
    };
    console.log(Authentication);
    return Authentication;

    ///////////////////

    /**
     * @name getAuthenticatedAccount
     * @desc Return the currently authenticated account
     * @returns {object|undefined} Account if authenticated, else `undefined`
     * @memberOf thinkster.authentication.services.Authentication
     */
    function getAuthenticatedAccount() {
      if (!$cookieStore.get(authenticatedAccount)) {
        console.log("NOT Cookies AUTH acct");
        console.log($cookieStore.get(authenticatedAccount));
        return;
      }
      console.log("JSON PARSE get auth acct");
      console.log(JSON.parse($cookieStore.get(authenticatedAccount)));
      return JSON.parse($cookieStore.get(authenticatedAccount));
    }


    /**
     * @name isAuthenticated
     * @desc Check if the current user is authenticated
     * @returns {boolean} True is user is authenticated, else false.
     * @memberOf thinkster.authentication.services.Authentication
     */
    function isAuthenticated() {
      // console.log("IS ALREADY AUTHENTICATED");
      // console.log($cookies.get(authenticatedAccount));
      // return !!$cookies.get(authenticatedAccount);
    }


    /**
     * @name login
     * @desc Try to log in with email `email` and password `password`
     * @param {string} email The email entered by the user
     * @param {string} password The password entered by the user
     * @returns {Promise}
     * @memberOf thinkster.authentication.services.Authentication
     */
    function login(email, password) {
      return $http.post('/api/v1/auth/login/', {
        email: email, password: password
      }).then(loginSuccessFn, loginErrorFn);
      console.log("loginfct");
      
      /**
       * @name loginSuccessFn
       * @desc Set the authenticated account and redirect to index
       */
      function loginSuccessFn(data, status, headers, config) {
        console.log("loginsuccess");
        console.log(data);
        debugger;
        Authentication.setAuthenticatedAccount(data.data);
        window.location = '/';
      }

      /**
       * @name loginErrorFn
       * @desc Log "Epic failure!" to the console
       */
      function loginErrorFn(data, status, headers, config) {
        console.error('Epic failure!');
      }
    }


    /**
     * @name logout
     * @desc Try to log the user out
     * @returns {Promise}
     * @memberOf thinkster.authentication.services.Authentication
     */
    function logout() {
      console.log("AUTHLOGOUT");
      return $http.post('/api/v1/auth/logout/')
        .then(logoutSuccessFn, logoutErrorFn);

      /**
       * @name logoutSuccessFn
       * @desc Unauthenticate and redirect to index with page reload
       */
      function logoutSuccessFn(data, status, headers, config) {
        Authentication.unauthenticate();
        console.log("logOUTsuccess");
        console.log(data);
        window.location = '#/core/login';
      }

      /**
       * @name logoutErrorFn
       * @desc Log "Epic failure!" to the console
       */
      function logoutErrorFn(data, status, headers, config) {
        console.log("logOUTerror");
        console.log(data);
        debugger;
        console.error('Epic failure!');
      }
    }


    /**
    * @name register
    * @desc Try to register a new user
    * @param {string} email The email entered by the user
    * @param {string} password The password entered by the user
    * @param {string} username The username entered by the user
    * @returns {Promise}
    * @memberOf thinkster.authentication.services.Authentication
    */
    function register(email, password, username) {
      return $http.post('/api/v1/accounts/', {
        username: username,
        password: password,
        email: email
      }).then(registerSuccessFn, registerErrorFn);

      /**
      * @name registerSuccessFn
      * @desc Log the new user in
      */
      function registerSuccessFn(data, status, headers, config) {
        Authentication.login(email, password);
      }

      /**
      * @name registerErrorFn
      * @desc Log "Epic failure!" to the console
      */
      function registerErrorFn(data, status, headers, config) {
        console.error('Epic failure!');
      }
    }


    /**
     * @name setAuthenticatedUser
     * @desc Stringify the account object and store it in a cookie
     * @param {Object} account The acount object to be stored
     * @returns {undefined}
     * @memberOf thinkster.authentication.services.Authentication
     */
    function setAuthenticatedAccount(account) {
      console.log("SET AUTH ACCT");
      console.log(account);
      var authAcct = JSON.stringify(account)
      console.log(authAcct);
      $cookieStore.put('authenticatedAccount', account);
      console.log("SET COOKIES...")
      // console.log($cookies.put(authenticatedAccount);
      console.log($cookieStore.get(authenticatedAccount));
    }


    /**
     * @name unauthenticate
     * @desc Delete the cookie where the account object is stored
     * @returns {undefined}
     * @memberOf thinkster.authentication.services.Authentication
     */
    function unauthenticate() {
      console.log("UNAUTHENTICATE");
      console.log($cookies.get(authenticatedAccount));
      $cookies.remove(authenticatedAccount);
      console.log($cookies.get(authenticatedAccount));
      console.log("UNAUTHENTICATE COMPLETE");
      debugger;
    }
  }
})();