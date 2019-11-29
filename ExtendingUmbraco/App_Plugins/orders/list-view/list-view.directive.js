(function () {
    'use strict';
    var app = angular.module('orders');
    app.directive('listView', [listViewDirective]);
    function listViewDirective() {
        return {
            restrict: 'E',
            scope: {
                config: '='
            },
            templateUrl: '/App_Plugins/orders/list-view/list-view.html',
            controller: 'ListViewController'
        };
    }
}());
