(function () {
    'use strict';
    var app = angular.module('orders');
    app.factory('categoriesService',
        ['$http', 'notificationsService', service]);
    function service($http, notificationsService) {
        var baseUrl = 'backoffice/orders/categoriesapi/';
        return {
            load: load,
            add: add,
            update: update,
            remove: remove,
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
            return $http.get(baseUrl + 'all', { params: params })
                .then(function (response) {
                    return {
                        page: response.data.currentPage,
                        totalPages: response.data.totalPages,
                        data: response.data.items
                    };
                }, function (reason) {
                    notificationsService.error('Error', 'Problem getting categories');
                });
        }
        function add(category) {
            return $http.post(baseUrl + 'post', category).then(function (response) {
                notificationsService.success('Success', 'Category was added.');
                return response.data;
            }, function (reason) {
                notificationsService.error('Error', 'Problem inserting category');
            });
        }
        function update(category) {
            return $http.put(baseUrl + 'put/' + category.id, category)
                .then(function (response) {
                    notificationsService.success('Success', 'Category was updated.');
                    return response.data;
                }, function (reason) {
                    notificationsService.error('Error', 'Problem updating category');
                });
        }
        function remove(category) {
            return $http.delete(baseUrl + 'delete/' + category.id)
                .then(function (response) {
                    notificationsService.success('Success', 'Category was deleted.');
                    return response.data;
                }, function (reason) {
                    notificationsService.error('Error', 'Problem deleting category');
                });
        }

    }
}());
