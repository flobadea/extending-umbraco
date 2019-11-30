(function () {
    'use strict';
    var app = angular.module('orders');
    app.controller('OrdersController',
        ['$location', 'ordersService', 'notificationsService', controller]);
    function controller($location, ordersService, notificationsService) {
        var vm = this;
        vm.deleteState = 'init';

        vm.config = {
            dataSource: ordersService,
            pageSize: 15,
            columns: [
                {
                    header: 'Order Id', fieldName: 'id', allowSorting: false,
                    allowFiltering: false
                },
                {
                    header: 'Created', fieldName: 'createdAt', dataType: 'datetime',
                    format: 'yyyy-MM-dd HH:mm:ss', allowSorting: false, allowFiltering: false
                },
                {
                    header: 'Shipped', fieldName: 'shippedAt', dataType: 'datetime',
                    format: 'yyyy-MM-dd HH:mm:ss', allowSorting: false, allowFiltering: false
                },
                {
                    header: 'Delivered', fieldName: 'deliveredAt', dataType: 'datetime',
                    format: 'yyyy-MM-dd HH:mm:ss', allowSorting: false, allowFiltering: false
                },
                {
                    header: 'Status', fieldName: 'status', allowSorting: false,
                    allowFiltering: false
                },
                {
                    header: 'Total', fieldName: 'total', allowSorting: false,
                    allowFiltering: false
                },
            ],
            selectionEnabled: true,
            onSelectionChanged: function (e) {
                vm.selectedItem = e.selectedItem;
            },
            onInit: function (e) {
                vm.theGrid = e;
            },
            loadIndicator: {
                visible: true,
                message: 'Loading...'
            },
            nameField: 'id',
            nameClicked: function (item) {
                var route = 'orders/ordersTree/order/' + item.id;
                $location.path(route);
            }
        };
        vm.isDeleteDisabled = function () {
            return vm.selectedItem === null ||
                vm.selectedItem === undefined ||
                vm.deleteState === 'busy';
        };
        vm.onDelete = function () {
            vm.deleteState = 'busy';
            notificationsService.add({
                view: "/App_Plugins/orders/common/confirmation.html",
                sticky: true,
                args: {
                    title: 'Delete Order',
                    message: 'Are you sure you want to delete the order?',
                    okText: 'Delete',
                    cancelText: 'Cancel',
                    okCallback: function () {
                        ordersService.remove(vm.selectedItem).then(function () {
                            vm.deleteState = 'success';
                            vm.selectedItem = null;
                            vm.theGrid.refresh();
                        }, function () {
                            vm.deleteState = 'error';
                        });
                    },
                    cancelCallback: function () {
                        vm.deleteState = 'init';
                    }
                }
            });
        };

    }
}());
