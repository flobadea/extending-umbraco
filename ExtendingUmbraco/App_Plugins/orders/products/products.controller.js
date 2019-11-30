(function () {
    'use strict';
    var app = angular.module('orders');
    app.controller('ProductsController',
        ['$location', 'productsService', 'notificationsService', controller]);
    function controller($location, productsService, notificationsService) {
        var vm = this;
        vm.deleteState = 'init';

        vm.config = {
            dataSource: productsService,
            pageSize: 15,
            columns: [
                {
                    header: 'Name', fieldName: 'name', allowSorting: true,
                    allowFiltering: true
                },
                {
                    header: 'Description', fieldName: 'description', allowSorting: true,
                    allowFiltering: true
                },
                {
                    header: 'Price', fieldName: 'price', allowSorting: true,
                    allowFiltering: false
                },
                {
                    header: 'Category Name', fieldName: 'categoryName', allowSorting: true,
                    allowFiltering: true
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
            nameField: 'name',
            nameClicked: function (item) {
                var route = 'orders/ordersTree/product/' + item.id;
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
                    title: 'Delete Product',
                    message: 'Are you sure you want to delete the ' + vm.selectedItem.name + ' product?',
                    okText: 'Delete',
                    cancelText: 'Cancel',
                    okCallback: function () {
                        productsService.remove(vm.selectedItem).then(function () {
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
