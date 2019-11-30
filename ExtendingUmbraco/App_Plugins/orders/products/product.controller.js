(function () {
    'use strict';
    var app = angular.module('orders');
    app.controller('ProductController', ['$rootScope', '$scope', '$location',
        '$routeParams', '$timeout',
        'productsService', 'categoriesService', controller]);
    function controller($rootScope, $scope, $location, $routeParams,
        $timeout, productsService, categoriesService) {
        var vm = this;
        vm.saveState = 'init';
        vm.model = {};

        vm.properties = [
            {
                label: 'Product Name',
                view: 'textbox',
                description: 'The product name',
                alias: 'name',
                hideLabel: false,
                readonly: false,
                validation: {
                    mandatory: true,
                    pattern: null,
                },
            },
            {
                label: 'Description',
                description: 'The product description',
                alias: 'description',
                view: 'textbox',
                hideLabel: false,
                validation: {
                    mandatory: false,
                },
            },
            {
                label: 'Price',
                description: 'The product price',
                alias: 'price',
                view: 'decimal',
                hideLabel: false,
                config: {
                    min: 0,
                    step: 1,
                    max: 10000
                },
                validation: {
                    mandatory: true,
                    pattern: '[0-9]+([,\.][0-9]+)?'
                },
            },
            {
                label: 'Category',
                description: 'The product category',
                alias: 'category',
                hideLabel: false,
                view: 'dropdownFlexible',
                validation: {
                    mandatory: true,
                },
                config: {
                    multiple: 0
                }
            }
        ];
        function getCategories() {
            categoriesService.load({}).then(function (response) {
                vm.properties[3].config.items = response.data.map(function (itm) {
                    return { id: itm.id, value: itm.name };
                });
            });
        }
        getCategories();
        vm.onBack = function () {
            $location.path('orders/ordersTree/products').search({});
        };
        function updateModelFromProperties() {
            vm.model.name = vm.properties[0].value;
            vm.model.description = vm.properties[1].value;
            vm.model.price = vm.properties[2].value;
            vm.model.categoryId = vm.properties[3].singleDropdownValue;
        }
        vm.submit = function () {
            updateModelFromProperties();
            $rootScope.$broadcast('formSubmitting', $scope.form);
            if ($scope.form.$invalid) {
                return;
            }
            vm.saveState = 'busy';
            if (!vm.model.id) {
                productsService.add(vm.model).then(function (response) {
                    vm.saveState = 'success';
                    vm.model.id = response.id;
                    $rootScope.$broadcast('formSubmitted', $scope.form);
                }, onError);
            } else {
                productsService.update(vm.model).then(function (response) {
                    vm.saveState = 'success';
                    $rootScope.$broadcast('formSubmitted', $scope.form);
                }, onError);
            }
        }
        function onError(reason) {
            vm.saveState = 'error';
        }
        function getProduct(productId) {
            productsService.get(productId).then(function (response) {
                vm.model = response;
                $timeout(function () {
                    vm.properties[0].value = response.name;
                    vm.properties[1].value = response.description;
                    vm.properties[2].value = response.price;
                    vm.properties[3].singleDropdownValue = response.categoryId;
                }, 0);
            });
        }
        if ($routeParams.id !== undefined) {
            getProduct($routeParams.id);
        }

    }
}());
