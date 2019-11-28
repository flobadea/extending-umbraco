(function () {
    'use strict';
    var app = angular.module('orders');
    app.factory('dashboardService', ['$q', service]);
    function service($q) {
        return {
            getTop5ProductData: getTop5ProductData,
            getDailySalesData: getDailySalesData
        };
        function getTop5ProductData() {
            var modifier = Math.random() * 3;
            return $q.when([
                { productName: 'Apples', value: Math.round(200 / modifier) },
                { productName: 'Oranges', value: Math.round(170 / modifier) },
                { productName: 'Banannas', value: Math.round(160 / modifier) },
                { productName: 'Cherries', value: Math.round(100 / modifier) },
                { productName: 'Nuts', value: Math.round(95 / modifier) },
            ]);
        }
        function getDailySalesData() {
            var modifier = Math.random() * 3;
            return $q.when([
                { day: 1, value: Math.round(130 / modifier) },
                { day: 2, value: Math.round(100 / modifier) },
                { day: 3, value: Math.round(140 / modifier) },
                { day: 4, value: Math.round(90 / modifier) },
                { day: 5, value: Math.round(110 / modifier) },
                { day: 6, value: Math.round(100 / modifier) },
                { day: 7, value: Math.round(80 / modifier) },
                { day: 8, value: Math.round(150 / modifier) },
                { day: 9, value: Math.round(10 / modifier) },
                { day: 10, value: Math.round(90 / modifier) },
            ]);
        }
    }
}());
