(function () {
    'use strict';

    angular
        .module('orders.directives')
        .directive('orderActivity', orderActivity);

    function orderActivity($sce) {

        var directive = {
            restrict: 'E',
            scope: {
                activity: '=',
                stati: '=',
            },          
            templateUrl: $sce.trustAsResourceUrl(static_path('views/directives/orderactivity-directive.html')),
        }

        return directive;
    }
})();