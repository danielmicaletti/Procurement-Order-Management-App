(function () {
    'use strict';

    angular
        .module('filters', ['filters.filters',]);

    angular
        .module('filters.filters', [])
        .filter('capFirst', capFirst);

    var capFirst = function () {

        return function(input, scope) {
            return input ? input.substring(0,1).toUpperCase()+input.substring(1).toLowerCase() : "";
        }
    };


}());
