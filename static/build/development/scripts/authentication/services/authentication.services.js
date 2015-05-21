(function () {
    'use strict';

    angular
        .module('authentication.services')
        .factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http', '$state', 'toastr'];

    function Authentication($cookies, $http, $state, toastr) {

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
            // console.log('authacct data');
            // console.log(data.data);
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
            // window.location = '#/core/login';
            $state.go('core.login');
        }

        function logoutErrorFn(data, status, headers, config) {
            console.error('Epic failure!');
        }

        function register(username, email, first_name, last_name, password, confirm_password) {
            return $http.post('/api/v1/accounts/', {
                username: username,
                email: email,
                first_name: first_name,
                last_name: last_name,
                password: password,
                confirm_password: confirm_password
            }).then(registerSuccessFn).catch(registerErrorFn);
        }

        function registerSuccessFn(data, status, headers, config) {
            toastr.success('New user has been created');
        }

        function registerErrorFn(data, status, headers, config) {
            toastr.error('There was an issue creating this user');
            console.error('Epic failure!'+data);
        }

        function setAuthenticatedAccount(account) {
            $cookies.authenticatedAccount = JSON.stringify(account);
            // console.log($cookies.authenticatedAccount);
        }

        function unauthenticate() {
            delete $cookies.authenticatedAccount;
        }
  }
})();










