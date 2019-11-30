(function () {
    'use strict';
    var app = angular.module('orders');
    app.controller('OrderController',
        ['$rootScope', '$scope', '$location', '$routeParams',
            'orderItemsService', 'ordersService', controller]);
    function controller($rootScope, $scope, $location, $routeParams,
        orderItemsService, ordersService) {
        var vm = this;
        vm.model = {};
        vm.saveState = 'init';
        vm.navigation = [
            {
                "name": "Order",
                "view": "/App_Plugins/orders/orders/order.html",
                "icon": "icon-document-dashed-line",
                "active": true,
            },
            {
                "name": "Line Items",
                "view": "/App_Plugins/orders/orders/line-items.html",
                "icon": "icon-document-dashed-line",
                "active": false,
            },
        ];
        orderItemsService.setOrder(+$routeParams.id);
        vm.model.gridConfig = {
            dataSource: orderItemsService,
            pageSize: 10,
            columns: [
                {
                    header: 'Product', fieldName: 'productName',
                    allowSorting: false, allowFiltering: false
                },
                {
                    header: 'Quantity', fieldName: 'qty',
                    allowSorting: false, allowFiltering: false
                },
                {
                    header: 'Unit Price', fieldName: 'unitPrice',
                    allowSorting: false, allowFiltering: false
                },
            ],
            onInit: function (e) {
                vm.theGrid = e;
            }
        }; 
        function getIdFromStatus(status) {
            if (status === 'Created') {
                return 0;
            } else if (status === 'Shipped') {
                return 1;
            }
            return 2;
        }
        function getOrder(orderId) {
            ordersService.get(orderId).then(function (response) {
                vm.model.model = response;
                vm.model.model.statusId = getIdFromStatus(response.status);
                vm.model.items = [
                    { id: 0, value: 'Created' },
                    { id: 1, value: 'Shipped' },
                    { id: 2, value: 'Delivered' },
                ];
            });
        }
        getOrder(+$routeParams.id);
        vm.submit = function () {
            $rootScope.$broadcast('formSubmitting', $scope.form);
            if ($scope.form.$invalid) {
                return;
            }
            var orderId = +$routeParams.id;
            vm.saveState = 'busy';
            ordersService.update({
                orderId: orderId,
                status: vm.model.model.statusId
            }).then(function () {
                vm.saveState = 'success';
                $rootScope.$broadcast('formSubmitted', $scope.form);
                getOrder(orderId);
            }, function () {
                vm.saveState = 'error';
            });
        };
        vm.onBack = function () {
            $location.path('orders/ordersTree/orders').search({});
        };
    }
}());
