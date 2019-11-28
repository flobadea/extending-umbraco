(function () {
    'use strict';
    var app = angular.module('orders');
    app.controller('ConfirmationController',
        ['$scope', 'notificationsService', confirmationController]);
    function confirmationController($scope, notificationsService) {
        var vm = this;
        vm.title = $scope.notification.args.title;
        vm.message = $scope.notification.args.message;
        vm.okText = $scope.notification.args.okText || 'OK';
        vm.cancelText = $scope.notification.args.cancelText || 'Cancel';
        vm.ok = function () {
            $scope.notification.args.okCallback();
            notificationsService.remove($scope.notification);
        };
        vm.cancel = function () {
            $scope.notification.args.cancelCallback();
            notificationsService.remove($scope.notification);
        };
    }
}());
