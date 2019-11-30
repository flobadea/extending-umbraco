(function () {
    'use strict';
    var app = angular.module('orders');
    app.factory('ordersService',
        ['$http', '$location', 'navigationService',
            'notificationsService', service]);
    function service($http, $location, navigationService, notificationsService) {
        var baseUrl = 'backoffice/orders/ordersapi/';
        return {
            load: load,
            add: add,
            remove: remove,
            onNavigate: onNavigate,
            get: get,
            update: update
        };
        function load(loadOptions) {
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
            return $http.get(baseUrl + 'getpaged', { params: params })
                .then(function (response) {
                    return {
                        page: response.data.currentPage,
                        totalPages: response.data.totalPages,
                        data: response.data.items
                    };
                }, function (reason) {
                    notificationsService.error('Error', 'Problem getting orders');
                });
        }
        function remove(order) {
            return $http.delete(baseUrl + 'delete/' + order.id)
                .then(function (response) {
                    notificationsService.success('Success', 'Order was deleted.');
                    return response.data;
                }, function (reason) {
                    notificationsService.error('Error', 'Problem deleting order');
                });
        }
        function onNavigate(args) {
            navigationService.hideNavigation();
            var route = '/' + args.section + '/' + args.treeAlias + '/new-order';
            $location.path(route);
        }
        function add(order) {
            return $http.post(baseUrl + 'post', order).then(function (response) {
                notificationsService.success('Success', 'Order was added.');
                return response.data;
            }, function (reason) {
                notificationsService.error('Error', 'Problem inserting order');
            });
        }
        function get(orderId) {
            return $http.get(baseUrl + 'byid/' + orderId)
                .then(function (response) {
                    return response.data;
                }, function (reason) {
                    notificationsService.error('Error', 'Problem getting order');
                });
        }
        function update(order) {
            return $http.put(baseUrl + 'update/' + order.orderId, order)
                .then(function (response) {
                    notificationsService.success('Success', 'Order was updated.');
                    return response.data;
                }, function (reason) {
                    notificationsService.error('Error', 'Problem updating order');
                });
        }

    }
}());
