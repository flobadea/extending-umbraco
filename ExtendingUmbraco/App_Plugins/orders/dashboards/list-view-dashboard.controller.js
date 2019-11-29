(function () {
    'use strict';
    var app = angular.module('orders');
    app.controller('ListViewDashboardController', ['peopleService', controller]);
    function controller(peopleService) {
        var vm = this;
        vm.config = {
            dataSource: peopleService,
            pageSize: 5,
            columns: [
                { header: 'First Name', fieldName: 'firstName', allowSorting: true, allowFiltering:true  },
                { header: 'Last Name', fieldName: 'lastName', allowSorting: true  },
                { header: 'Email', fieldName: 'email', allowFiltering: true },
                {
                    header: 'Birthdate', fieldName: 'dob', dataType: 'datetime',
                    format: 'yyyy MMM-dd HH:mm:ss'
                }],
            selectionEnabled: true,
            onSelectionChanged: function (e) {
                var config = e.config;
                var item = e.selectedItem;
            },
            loadIndicator: {
                visible: true,
                message: 'Loading...'
            },
            nameField: 'firstName',
            nameClicked: function (item) {
                //...
            }
        };
    }
}());