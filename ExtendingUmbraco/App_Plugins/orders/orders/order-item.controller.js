(function () {
    'use strict';
    var app = angular.module('orders');
    app.controller('OrderItemController',
        ['$scope', 'productsService', dialogController]);
    function dialogController($scope, productsService) {
        var vm = this;
        vm.orderItem = $scope.$parent.dialogData.orderItem || {};
        vm.model = {
            id: vm.orderItem.productId,
            qty: vm.orderItem.quantity
        };
        productsService.load({}).then(function (response) {
            vm.products = response.data;
            vm.onChange();
        });
        vm.onChange = function () {
            var prodcuts = vm.products.filter(function (itm) {
                return itm.id === vm.model.id
            });
            if (prodcuts.length) {
                vm.model.product = prodcuts[0];
            }
        };
        vm.save = function () {
            $scope.submit({
                qty: vm.model.qty,
                product: vm.model.product
            });
        };

    }
}());
