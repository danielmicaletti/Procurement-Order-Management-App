(function () {
    'use strict';

    angular
        .module('authentication.services')
        .factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http', '$q', '$state', 'toastr'];

    function Authentication($cookies, $http, $q, $state, toastr) {

        var Authentication = {
            getAuthenticatedAccount: getAuthenticatedAccount,
            isAuthenticated: isAuthenticated,
            login: login,
            logout: logout,
            register: register,
            setAuthenticatedAccount: setAuthenticatedAccount,
            unauthenticate: unauthenticate
        };

        return Authentication;

        function getAuthenticatedAccount() {
            if (!$cookies.authenticatedAccount) {
                return;
            }
            // console.log($cookies.authenticatedAccount);
            return JSON.parse($cookies.authenticatedAccount);
        }

        function isAuthenticated() {
            console.log(!!$cookies.authenticatedAccount);
            return !!$cookies.authenticatedAccount;
        }

        function login(email, password) {
            return $http.post('/api/v1/auth/login/', {
                email: email, 
                password: password
            }).then(loginSuccessFn).catch(loginErrorFn);
        }

        function loginSuccessFn(data, status, headers, config) {
            Authentication.setAuthenticatedAccount(data.data);
            $state.go('app.dashboard');
        }

        function loginErrorFn(data, status, headers, config) {
            console.error('Epic failure!');
        }

        function logout() {
            return $http.post('/api/v1/auth/logout/')
                .then(logoutSuccessFn)
                .catch(logoutErrorFn);
        }

        function logoutSuccessFn(data, status, headers, config) {
            Authentication.unauthenticate();
            $state.go('core.login');
        }

        function logoutErrorFn(data, status, headers, config) {
            console.error('Epic failure!');
        }

        function register(company, username, email, first_name, last_name, password, confirm_password) {
            return $http.post('/api/v1/accounts/', {
                company: company, 
                username: username,
                email: email,
                first_name: first_name,
                last_name: last_name,
                password: password,
                confirm_password: confirm_password
            }).then(registerSuccessFn).catch(registerErrorFn);
        }

        function registerSuccessFn(response) {
            return response.data;
        }

        function registerErrorFn(response) {
            return $q.reject('Error '+response.status+'');
        }

        function setAuthenticatedAccount(account) {
            $cookies.authenticatedAccount = JSON.stringify(account);
        }

        function unauthenticate() {
            delete $cookies.authenticatedAccount;
        }
  }
})();










