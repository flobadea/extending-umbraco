(function () {
    'use strict';
    var app = angular.module('orders');
    app.factory('dashboardService', ['$http', service]);
    function service($http) {
        return {
            getTop5ProductData: getTop5ProductData,
            getDailySalesData: getDailySalesData
        };
        function getTop5ProductData() {
            return $http.get('backoffice/orders/salesapi/top5')
                .then(function (response) {
                    return response.data;
                }, function () {
                    notificationsService.error('Error getting top 5 products');
                });

        }
        function getDailySalesData() {
            return $http.get('backoffice/orders/salesapi/dailysales')
                .then(function (response) {
                    return response.data;
                }, function () {
                    notificationsService.error('Error getting daily sales');
                });
        }
    }
}());
