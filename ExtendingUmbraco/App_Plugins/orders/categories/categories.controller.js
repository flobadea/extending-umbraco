(function () {
    'use strict';
    var app = angular.module('orders');
    app.controller('CategoriesController',
        ['categoriesService', 'dialogService', 'notificationsService', controller]);
    function controller(categoriesService, dialogService, notificationsService) {
        var vm = this;
        vm.config = {
            dataSource: categoriesService,
            pageSize: 15,
            columns: [
                {
                    header: 'Category Name', fieldName: 'name',
                    allowSorting: true, allowFiltering: true
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
                showEditDialog(item);
            }
        };
        function showEditDialog(item) {
            dialogService.open({
                template: '/App_Plugins/orders/categories/category.html',
                show: true,
                dialogData: {
                    category: angular.copy(item)
                },
                closeCallback: function (data) {
                    //do something when dialog is dismissed
                },
                callback: function (data) {
                    vm.theGrid.refresh();
                }
            });

        }
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
                    title: 'Delete Category',
                    message: 'Are you sure you want to delete the ' +
                        vm.selectedItem.name + ' category?',
                    okText: 'Delete',
                    cancelText: 'Cancel',
                    okCallback: function () {
                        categoriesService.remove(vm.selectedItem).then(function () {
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
