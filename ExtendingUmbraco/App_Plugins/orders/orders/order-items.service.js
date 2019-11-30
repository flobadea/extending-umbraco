(function () {
    'use strict';
    var app = angular.module('orders');
    app.factory('orderItemsService',
        ['$http', '$q', 'notificationsService', service]);
    function service($http, $q, notificationsService) {
        var baseUrl = 'backoffice/orders/ordersapi/';
        var data = {};
        return {
            load: load,
            setOrder: setOrder,
        };
        function setOrder(orderId) {
            data.orderId = orderId;
        }
        function load(loadOptions) {
            if (!data.orderId) {
                return $q.when({ page: 0, totalPages: 0, data: [] });
            }
            var params = {};
            params.page = loadOptions.page;
            params.pageSize = loadOptions.pageSize;
            if (loadOptions.sortColumn) {
                params.sortColumn = loadOptions.sortColumn;
                params.sortOrder = loadOptions.sortOrder;
            }
            if (loadOptions.filter) {
                params.filter = loadOptions.filter;
            }
            return $http.get(baseUrl + 'getitems/' + data.orderId,
                { params: params }).then(function (response) {
                    return {
                        page: response.data.currentPage,
                        totalPages: response.data.totalPages,
                        data: response.data.items
                    };
                }, function (reason) {
                    notificationsService.error('Error', 'Problem getting orders');
                });
        }
    }
}());
