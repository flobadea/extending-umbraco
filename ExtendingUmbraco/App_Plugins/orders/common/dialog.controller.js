(function () {
    'use strict';
    var app = angular.module('orders');
    app.controller('DialogController',
        ['$scope', 'dialogService', dialogController]);
    function dialogController($scope, dialogService) {
        var vm = this;
        vm.model = $scope.$parent.dialogData;
    }
}());
