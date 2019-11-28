(function () {
    'use strict';
    var app = angular.module('orders', ['chart.js']);
    var umbracoModule = angular.module('umbraco');
    umbracoModule.requires.push('orders');
}());
