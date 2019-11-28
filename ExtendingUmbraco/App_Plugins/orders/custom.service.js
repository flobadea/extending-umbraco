(function () {
    'use strict';
    var app = angular.module('umbraco.services');
    app.factory('customService',
        ['notificationsService', 'navigationService', customService]);

    function customService(notificationsService, navigationService) {
        return {
            customMethod: customMethod
        };
        function customMethod() {
            navigationService.hideNavigation();
            notificationsService.success('Success',
                'the operation completed successfully');
        }
    }
}());