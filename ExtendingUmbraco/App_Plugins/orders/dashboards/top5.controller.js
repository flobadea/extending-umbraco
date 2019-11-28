(function () {
    'use strict';
    var app = angular.module('orders');
    app.controller('Top5Controller', ['dashboardService', controller]);
    function controller(dashboardService) {
        var vm = this;
        vm.refreshButtonState = 'init';
        vm.refresh = function () {
            vm.refreshButtonState = 'busy';
            dashboardService.getTop5ProductData()
                .then(function (result) {
                    vm.refreshButtonState = 'success';
                    vm.options = getOptions();
                    //labels
                    vm.labels = result.map(function (val) {
                        return val.productName;
                    });
                    //series
                    vm.series = ['Sales'];
                    //data
                    var data = [];
                    var set = result.map(function (val) {
                        return val.value;
                    });
                    data.push(set);
                    vm.data = data;
                }, function () {
                    vm.refreshButtonState = 'error';
                });
        }
        vm.refresh();
        function getOptions() {
            return {
                title: {
                    display: true,
                    text: 'Top 5 Products'
                }
            };
        }
    }
}());