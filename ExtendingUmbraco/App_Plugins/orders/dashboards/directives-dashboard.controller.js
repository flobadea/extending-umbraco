(function () {
    'use strict';
    var app = angular.module('orders');
    app.controller('DirectivesDashboardController', ['$rootScope', '$timeout', 'notificationsService', controller]);
    function controller($rootScope, $timeout, notificationsService) {
        var vm = this;
        
        vm.buttonState = 'init';
        vm.onRefresh = function () {
            vm.buttonState = 'busy';
            $timeout(function () {
                var value = Math.round(Math.random());
                if (value) {
                    vm.buttonState = 'success';
                    return;
                }
                vm.buttonState = 'error';
            }, 1000);
        };
        //btn group
        vm.options = {
            defaultButton: {
                labelKey: "op1",
                hotKey: "ctrl+a",
                hotKeyWhenHidden: true,
                handler: function () {
                    notificationsService.success('Clicked', 'Default option was selected');
                }
            },
            subButtons: [
                {
                    labelKey: "op2",
                    hotKey: "ctrl+b",
                    hotKeyWhenHidden: true,
                    handler: function () {
                        notificationsService.success('Clicked', 'Option 2 was selected');
                    }
                },
                {
                    labelKey: "op3",
                    hotKey: "ctrl+c",
                    hotKeyWhenHidden: true,
                    handler: function () {
                        notificationsService.success('Clicked', 'Option 3 was selected');
                    }
                }
            ]
        };
        //toggle
        vm.checked = true;
        vm.toggle = function () {
            vm.checked = !vm.checked;
            if (vm.checked) {
                notificationsService.success('checked');
            } else {
                notificationsService.success('unchecked');
            }
        }
        //tooltip
        vm.tooltip = {
            show: false,
            event: null
        };
        vm.mouseOver = function ($event) {
            vm.tooltip = {
                show: true,
                event: $event
            };
        };
        vm.mouseLeave = function () {
            vm.tooltip = {
                show: false,
                event: null
            };
        };
        //dropdown
        vm.dropdownOpen = false;
        vm.items = [
            { "name": "Item 1", icon: 'fa fa-list' },
            { "name": "Item 2", icon: 'fa fa-list' },
            { "name": "Item 3", icon: 'fa fa-list' }
        ];
        vm.toggleDropdown = function () {
            vm.dropdownOpen = true;
        };
        vm.closeDropdown = function () {
            vm.dropdownOpen = false;
        };
        vm.selectDropdown = function (item) {
            notificationsService.success(item);
            vm.dropdownOpen = false;
        };
        //date picker
        vm.config = {
            pickDate: true,
            pickTime: true,
            useSeconds: true,
            format: "YYYY-MM-DD HH:mm:ss",
        };
        vm.pickerChange = function (event) {
            var date = null;
            if (event.date && event.date.isValid()) {
                date = event.date.format(vm.config.format);
            }
            var msg = 'selected: ' + date;
            notificationsService.success(msg);
        };
        vm.pickerError = function (event) {
            //handle the error
        };
        //grid content
        getItems();
        function getItems() {
            var res = [], i;
            for (i = 0; i < 10; i++) {
                res.push({
                    "name": "name " + i,
                    "icon": "fa fa-bus",
                    "firstName": "first #" + i,
                    "lastName": "last #" + i,
                    "email": "test" + i + '@test.com',
                    "address": "addr #" + i,
                    "dob": "15-02-2016",
                    "selected": false
                });
            }
            vm.items = res;
        }
        vm.itemProperties = [
            { "alias": "firstName", "header": "First Name" },
            { "alias": "lastName", "header": "Last Name" },
            { "alias": "email", "header": "E-Mail" },
            { "alias": "address", "header": "Address" }
        ];
        vm.selectedItem = null;
        vm.clickItem = function (item, $event, $index) {
            if ($event.isDefaultPrevented()) {
                return;
            }
            if (vm.selectedItem) {
                vm.selectedItem.selected = false;
            }
            if (vm.selectedItem === item) {
                vm.selectedItem = null;
            } else {
                vm.selectedItem = item;
                vm.selectedItem.selected = true;
            }
        };
        vm.clickName = function (item, $event, $index) {
            $event.preventDefault();
        }; 
        //table
        vm.tableItems = getTableItems();
        function getTableItems() {
            var res = [];
            for (var i = 0; i < 5; i++) {
                res.push({
                    "icon": "icon-document",
                    "name": "My node " + i,
                    "description": "A short description",
                    "author": "Author " + i,
                });
            }
            return res;
        }

        vm.includeProperties = [
            { alias: "description", header: "Description" },
            { alias: "author", header: "Author" }
        ];

        vm.tableSelectedItems = [];
        vm.tableSelectItem = function (selectedItem, $index, $event) {
            var items = vm.tableSelectedItems.filter(function (itm) {
                return itm === selectedItem;
            });
            if (items.length === 0) {
                vm.tableSelectedItems.push(selectedItem);
                selectedItem.selected = true;
            } else {
                vm.tableSelectedItems = vm.tableSelectedItems.filter(function (itm) {
                    return itm !== selectedItem;
                });
                selectedItem.selected = false;
            }
        };
        vm.isAllSelected = false;
        vm.tableSelectAll = function () {
            if (vm.isAllSelected) {
                vm.tableSelectedItems = [];
            } else {
                vm.tableSelectedItems = vm.tableItems;
            }
            vm.tableItems.map(function (itm) {
                itm.selected = !vm.isAllSelected;
            });
        };
        vm.tableSelectedAll = function () {
            vm.isAllSelected = !vm.isAllSelected;
        };
        vm.tableClickItem = function (clickedItem) {
            notificationsService.info('clicked on ' + clickedItem.name);
        };
        //confirm action
        vm.showPrompt = function () {
            vm.promptIsVisible = true;
        };
        vm.confirmAction = function () {
            vm.promptIsVisible = false;
            //go to server and delete
        };
        vm.hidePrompt = function () {
            vm.promptIsVisible = false;
        };
        //control group 
        vm.model = {};
        vm.submit = function () {
            vm.showValidation = true;
            $rootScope.$broadcast('formSubmitting', $scope.form);
            if ($scope.form.$invalid) {
                return;
            }
            vm.showValidation = false;
            notificationsService.success('saved: ' + angular.toJson(vm.model.name));
            $rootScope.$broadcast('formSubmitted', $scope.form);
        };

    }
}());
