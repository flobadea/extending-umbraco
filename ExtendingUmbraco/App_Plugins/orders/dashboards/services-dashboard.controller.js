(function () {
    'use strict';
    var app = angular.module('orders');
    app.controller('ServicesDashboardController', ['localizationService', 'notificationsService', 'dialogService', controller]);
    function controller(localizationService, notificationsService, dialogService) {
        var vm = this;
        localizationService.localize('demo_header')
            .then(function (translatedText) {
                vm.localizedText = translatedText;
            });
        localizationService.localize('demo_header2', ['param1', 'param2'])
            .then(function (translatedText) {
                vm.localizedText2 = translatedText;
            });
        vm.showError = function () {
            notificationsService.error('Error', 'the operation failed');
        };
        vm.showWarning = function () {
            notificationsService.warning('Warning', 'something unexpected happened');
        };
        vm.showSuccess = function () {
            notificationsService.success('Success', 'the operation completed successfully');
        };
        vm.showNotification = function () {
            notificationsService.showNotification({
                type: 0,
                header: 'Success',
                message: 'The operation completed successfully'
            });
        };
        vm.add = function () {
            notificationsService.add({
                type: 'custom',
                headline: 'the header',
                message: 'the notification message',
                url: 'http://www.google.com',
                sticky: true,
            });
        };
        vm.showConfirmation = function () {
            notificationsService.add({
                view: "/App_Plugins/orders/common/confirmation.html",
                sticky: true,
                args: {
                    title: 'Unsaved changes',
                    message: 'Are you sure you want to navigate away from this page?',
                    okText: 'Navigate',
                    cancelText: 'Stay',
                    okCallback: function () {
                        //navigate
                    },
                    cancelCallback: function () {
                        //do nothing
                    }
                }
            });
        };

        vm.showIconPicker = function () {
            dialogService.iconPicker({
                callback: function (icon) {
                    //so something with the icon css classes
                }
            });
        };
        vm.showMediaPicker = function () {
            dialogService.mediaPicker({
                multiPicker: true,
                onlyImages: true,
                callback: function (data) {
                    //do something with the image data
                }
            });
        };
        vm.showLinkPicker = function () {
            dialogService.linkPicker({
                callback: function (data) {
                    //do something with the selected link
                }
            });
        };
        vm.showMemberPicker = function () {
            dialogService.memberPicker({
                multiPicker: true,
                callback: function (data) {
                    //do something with the selected members
                }
            });
        };
        vm.showTreePicker = function () {
            dialogService.treePicker({
                multiPicker: false,
                section: 'developer',
                treeAlias: 'dataTypes',
                callback: function (item) {
                    //do something with the item
                }
            }); 
        };
        vm.showDialog = function () {
            dialogService.open({
                template: '/App_Plugins/orders/common/dialog1.html',
                show: true,
                dialogData: {
                    firstName: 'Thomas',
                    lastName: 'Anderson'
                },
                closeCallback: function (data) {
                    //do something when dialog is dismissed
                },
                callback: function (data) {
                    //do something with the data
                }
            });
        };

    }
}());
