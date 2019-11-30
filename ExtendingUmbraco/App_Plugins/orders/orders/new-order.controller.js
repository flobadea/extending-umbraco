(function () {
    'use strict';
    var app = angular.module('orders');
    app.controller('NewOrderController',
        ['$rootScope', '$scope', '$location',
            'dialogService', 'ordersService', controller]);
    function controller($rootScope, $scope, $location, dialogService, ordersService) {
        var vm = this;
        vm.model = { items: [] };
        vm.saveState = 'init';

        vm.gridConfig = {
            dataSource: vm.model.items,
            pageSize: 10,
            selectionEnabled: true,
            onSelectionChanged: function (e) {
                vm.selectedItem = e.selectedItem;
            },
            onInit: function (e) {
                vm.theGrid = e;
            },
            columns: [
                {
                    header: 'Product', fieldName: 'productName',
                    allowSorting: false, allowFiltering: false
                },
                {
                    header: 'Quantity', fieldName: 'quantity',
                    allowSorting: false, allowFiltering: false
                },
                {
                    header: 'Unit Price', fieldName: 'price',
                    allowSorting: false, allowFiltering: false
                },
            ],
            onInit: function (e) {
                vm.theGrid = e;
            }
        };
        $scope.$watch('vm.model.items', function (newVal, oldVal) {
            if (!newVal) {
                return;
            }
            if (newVal.length === 0) {
                vm.itemString = null;
            } else {
                vm.itemString = angular.toJson(newVal);
            }
        }, true);
        vm.submit = function () {
            $rootScope.$broadcast('formSubmitting', $scope.form);
            if ($scope.form.$invalid) {
                return;
            }
            vm.saveState = 'busy';
            ordersService.add(vm.model).then(function (response) {
                vm.saveState = 'success';
                $rootScope.$broadcast('formSubmitted', $scope.form);
                vm.onBack();
            }, onError);
        }
        function onError(reason) {
            vm.saveState = 'error';
        }
        vm.onBack = function () {
            $location.path('orders/ordersTree/orders').search({});
        }
        vm.addItem = function () {
            showEditDialog({}, function (data) {
                var exists = vm.model.items.some(function (itm) {
                    return itm.productId === data.product.id;
                });
                if (exists) {
                    return;
                }
                vm.model.items.push({
                    productId: data.product.id,
                    productName: data.product.name,
                    quantity: data.qty,
                    price: data.product.price
                });
                vm.theGrid.refresh();
            });
        };
        vm.editItem = function () {
            if (!vm.selectedItem) {
                return;
            }
            showEditDialog(vm.selectedItem, function (data) {
                vm.selectedItem.productId = data.product.id;
                vm.selectedItem.productName = data.product.name;
                vm.selectedItem.quantity = data.qty;
                vm.selectedItem.price = data.product.price;
            });
        };
        function showEditDialog(item, callback) {
            dialogService.open({
                template: '/App_Plugins/orders/orders/order-item-dialog.html',
                show: true,
                dialogData: {
                    orderItem: angular.copy(item)
                },
                callback: callback
            });
        }
        vm.deleteItem = function () {
            if (!vm.selectedItem) {
                return;
            }
            var idx = vm.model.items.indexOf(vm.selectedItem);
            if (idx >= 0) {
                vm.model.items.splice(idx, 1);
            }
            vm.selectedItem = null;
            if (vm.theGrid) {
                vm.theGrid.refresh();
            }
        };

    }
}());
