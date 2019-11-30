(function () {
    'use strict';
    var app = angular.module('orders');
    app.factory('productsService',
        ['$http', '$location', 'navigationService', 'notificationsService', service]);
    function service($http, $location, navigationService, notificationsService) {
        var baseUrl = 'backoffice/orders/productsapi/';
        return {
            load: load,
            remove: remove,
            onNavigate: onNavigate,
            add: add,
            get: get,
            update: update,
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
            return $http.get(baseUrl + 'paged', { params: params })
                .then(function (response) {
                    return {
                        page: response.data.currentPage,
                        totalPages: response.data.totalPages,
                        data: response.data.items
                    };
                }, function (reason) {
                    notificationsService.error('Error', 'Problem getting products');
                });
        }
        function remove(product) {
            return $http.delete(baseUrl + 'delete/' + product.id)
                .then(function (response) {
                    notificationsService.success('Success', 'Product was deleted.');
                    return response.data;
                }, function (reason) {
                    notificationsService.error('Error', 'Problem deleting product');
                });
        }
        function onNavigate(args) {
            navigationService.hideNavigation();
            var route = '/' + args.section + '/' + args.treeAlias + '/product';
            $location.path(route).search({ create: true })
        }
        function add(product) {
            return $http.post(baseUrl + 'post', product).then(function (response) {
                notificationsService.success('Success', 'Product was added.');
                return response.data;
            }, function (reason) {
                notificationsService.error('Error', 'Problem inserting product');
            });
        }
        function get(productId) {
            return $http.get(baseUrl + 'byid/' + productId)
                .then(function (response) {
                    return response.data;
                }, function (reason) {
                    notificationsService.error('Error', 'Problem getting product');
                });
        }
        function update(product) {
            return $http.put(baseUrl + 'put/' + product.id, product)
                .then(function (response) {
                    notificationsService.success('Success', 'Product was updated.');
                    return response.data;
                }, function (reason) {
                    notificationsService.error('Error', 'Problem updating product');
                });
        }

    }
}());
