(function () {
    'use strict';
    var app = angular.module('orders');
    app.controller('ListViewController', ['$scope', '$timeout',
        'filterFilter', 'orderByFilter', listViewController]);
    function listViewController($scope, $timeout, filterFilter, orderByFilter) {
        function getPage(page, pageSize) {
            var params = {
                page: page,
                pageSize: pageSize,
            };
            if ($scope.sortColumn && $scope.isAscending !== null) {
                params.sortColumn = $scope.sortColumn;
                params.sortOrder = $scope.isAscending ? 'asc' : 'desc';
            }
            var filterObject = getFilterObject();
            if (Object.keys(filterObject).length > 0) {
                params.filter = filterObject;
            }
            
            if (!$scope.config.dataSource) {
                $scope.config.dataSource = [];
            }
            if (angular.isArray($scope.config.dataSource)) {
                getFromArray(params);
            } else {
                getFromServer(params);
            }
        }
        function getFilterObject() {
            var res = {};
            for (var i = 0; i < $scope.config.columns.length; i++) {
                var col = $scope.config.columns[i];
                if (col.allowFiltering &&
                    col.filterValue !== undefined &&
                    col.filterValue !== null) {
                    res[col.fieldName] = col.filterValue;
                }
            }
            return res;
        }

        var component = {
            refresh: function () {
                getPage($scope.pageInfo.page, $scope.config.pageSize);
            }
        };
        if ($scope.config) {
            if ($scope.config.onInit) {
                $scope.config.onInit(component);
            }
            getPage(0, $scope.config.pageSize);
        }
        function getFromArray(params) {
            var filtered = filterFilter($scope.config.dataSource, params.filter || {});
            var sort = null;
            if (params.sortColumn) {
                sort = params.sortColumn === 'desc' ? '-' : '' + params.sortColumn;
            }
            var sorted = orderByFilter(filtered, sort);

            var take = parseInt(params.pageSize);
            var skip = parseInt(params.page) * take;
            var items = sorted.slice(skip, skip + take);
            $timeout(function () {
                $scope.pageInfo = {
                    page: params.page,
                    totalPages: Math.ceil(filtered.length / params.pageSize),
                    data: items
                };
            }, 0);
        }
        function getFromServer(params) {
            $scope.loading = true;
            $scope.config.dataSource.load(params)
                .then(function (response) {
                    $scope.loading = false;
                    $scope.pageInfo = response;
                },
                    function (reason) {
                        $scope.loading = false;
                    });
        }
        $scope.pageInfo = {};
        $scope.getPagingLabel = function () {
            if ($scope.pageInfo && $scope.pageInfo.page >= 0) {
                return 'page ' + ($scope.pageInfo.page + 1) +
                    ' of ' + $scope.pageInfo.totalPages;
            }
        };
        $scope.getPrevPage = function () {
            getPage($scope.pageInfo.page - 1, $scope.config.pageSize);
        };
        $scope.getFirstPage = function () {
            getPage(0, $scope.config.pageSize);
        };
        $scope.canGoBack = function () {
            return $scope.pageInfo.page > 0;
        };
        $scope.getNextPage = function () {
            getPage($scope.pageInfo.page + 1, $scope.config.pageSize);
        };
        $scope.getLastPage = function () {
            getPage($scope.pageInfo.totalPages - 1, $scope.config.pageSize);
        };
        $scope.canGoForward = function () {
            return $scope.pageInfo.page < $scope.pageInfo.totalPages - 1;
        };

        $scope.onSelectedItem = function (item) {
            if (!$scope.config.selectionEnabled) {
                return;
            }
            $scope.selectedItem = item;
            if ($scope.config.onSelectionChanged) {
                $scope.config.onSelectionChanged({
                    config: $scope.config, selectedItem: item
                });
            }
        };
        $scope.onSortChanged = function (columnData) {
            if (!columnData.allowSorting) {
                return;
            }
            if ($scope.sortColumn == columnData.fieldName) {
                if ($scope.isAscending === false) {
                    $scope.isAscending = null;
                } else {
                    $scope.isAscending = !$scope.isAscending;
                }
            } else {
                $scope.sortColumn = columnData.fieldName;
                $scope.isAscending = true;
            }
            $scope.onSelectedItem(null);
            getPage($scope.pageInfo.page, $scope.config.pageSize);
        };
        $scope.showSort = function (col) {
            return $scope.sortColumn === col;
        };
        $scope.showFilterRow = function () {
            for (var i = 0; i < $scope.config.columns.length; i++) {
                var col = $scope.config.columns[i];
                if (col.allowFiltering) {
                    return true;
                }
            }
            return false;
        };
        $scope.filterChanged = function (value, columnName) {
            $scope.onSelectedItem(null);
            getPage(0, $scope.config.pageSize);
        };
        $scope.onNameClicked = function (item, $event) {
            $event.stopPropagation();
            $scope.config.nameClicked(item);
        };
    }
}());
