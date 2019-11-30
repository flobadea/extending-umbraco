(function () {
    'use strict';
    var app = angular.module('orders');
    app.controller('CategoryController',
        ['$scope', '$location', 'categoriesService',
            'navigationService', dialogController]);
    function dialogController($scope, $location, categoriesService, navigationService) {
        var vm = this;
        vm.model = $scope.$parent.dialogData.category || {};
        vm.saveState = 'init';
        vm.close = function () {
            if (vm.model.id) {
                $scope.close();
            } else {
                navigationService.hideNavigation();
            }
        };
        vm.submit = function () {
            vm.saveState = 'busy';
            if (!vm.model.id) {
                categoriesService.add(vm.model).then(function (response) {
                    vm.saveState = 'success';
                    navigationService.hideNavigation();
                    var location = 'orders/ordersTree/categories';
                    $location.path(location);
                }, onError);
            } else {
                categoriesService.update(vm.model).then(function (response) {
                    vm.saveState = 'success';
                    $scope.submit(vm.model);
                }, onError);
            }
        };
        function onError(reason) {
            vm.saveState = 'error';
        }
    }
}());
