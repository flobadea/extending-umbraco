(function () {
    'use strict';
    var app = angular.module('orders');
    app.factory('peopleService', ['$q', '$timeout', 'orderByFilter', 'filterFilter', peopleService]);
    function peopleService($q, $timeout, orderByFilter, filterFilter) {
        var data = null;
        return {
            load: load
        };
        function load(loadOptions) {
            var page = loadOptions.page || 0;
            var pageSize = loadOptions.pageSize || 20;

            if (data == null) {
                data = [];
                for (var i = 0; i < 100; i++) {
                    data.push({
                        firstName: 'fn#' + i, lastName: 'ln#' + i,
                        email: 'test' + i + '@test.com', dob: new Date(2017, 9, 10)
                    });
                }
            }
            var data2 = data;
            if (loadOptions.filter) {
                data2 = filterFilter(data2, loadOptions.filter);
            }

            if (loadOptions.sortColumn) {
                if (loadOptions.sortOrder === 'asc') {
                    data2 = orderByFilter(data, '+' + loadOptions.sortColumn);
                } else {
                    data2 = orderByFilter(data, '-' + loadOptions.sortColumn);
                }
            }
            var res = {
                data: data2.slice(page * pageSize, (page + 1) * pageSize),
                page: page,
                totalPages: Math.ceil(100 / pageSize)
            }
            var deferred = $q.defer();
            $timeout(function () {
                return deferred.resolve(res);
            }, 1000);
            return deferred.promise;
        }
    }
}());
