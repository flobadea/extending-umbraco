(function () {
    'use strict';
    var app = angular.module('orders');
    app.controller('EditorsController', ['$rootScope', '$scope',
        'notificationsService', 'serverValidationManager' , controller]);
    function controller($rootScope, $scope,
        notificationsService, serverValidationManager) {
        var vm = this;
        vm.model = {};
        vm.submit = function () {
            $rootScope.$broadcast('formSubmitting', $scope.form2);
            if ($scope.form2.$invalid) {
                return;
            }
            if (vm.properties[0].value === 'x') {
                serverValidationManager.addPropertyError(
                    'label', 'value', 'Some server error');
                return;
            }

            notificationsService.success('saved: ' + angular.toJson(vm.properties[0].value));
            $rootScope.$broadcast('formSubmitted', $scope.form2);
            serverValidationManager.reset();
        };
        vm.properties = [{
            label: 'Label',
            description: 'Label description',
            alias: 'label',
            view: 'textbox',
            hideLabel: false,
            validation: {
                mandatory: true
            },
            config: {
                maxChars: 20
            },
        },
        {
            label: 'Label',
            description: 'Label description',
            alias: 'label',
            view: 'textarea',
            config: {
                maxChars: 20,
                rows: 3
            },
            hideLabel: false,
            validation: {
                mandatory: true,
                pattern: null
            }
        },
            {
                label: 'Decimal',
                description: 'Decimal description',
                alias: 'label',
                view: 'decimal',
                config: {
                    min: 20,
                    max: 80,
                    step: 5
                },
                hideLabel: false,
                validation: {
                    mandatory: true,
                    pattern: null
                }
            },
            {
                label: 'Checkbox',
                description: 'Checkbox description',
                alias: 'label',
                view: 'boolean',
                config: {
                    'default': 0,
                    labelOn: 'On',
                    labelOff: 'Off',
                },
                hideLabel: false,
                validation: {
                    mandatory: false,
                    pattern: null
                }
            },
            {
                label: 'Slider',
                description: 'Label description',
                alias: 'label',
                view: 'slider',
                config: {
                    enableRange: '1',
                    orientation: 'horizontal',
                    initVal1: 30,
                    initVal2: 60,
                    minVal: 0,
                    maxVal: 100,
                    step: 5,
                    precision: 0,
                    handle: 'triangle',
                    tooltip: 'show'
                },
                hideLabel: false,
                validation: {
                    mandatory: false,
                    pattern: null
                }
            },
            {
                label: 'Tags',
                description: 'Label description',
                alias: 'label',
                view: 'tags',
                config: {
                    group: 'default',
                    storageType: 'Json'
                },
                hideLabel: false,
                validation: {
                    mandatory: false,
                    pattern: null
                }
            },
            {
                label: 'Date picker',
                description: 'picker description',
                alias: 'label',
                view: 'datepicker',
                config: {
                    pickDate: true,
                    pickTime: true,
                    useSeconds: true,
                    format: 'YYYY-MM-DD HH:mm:ss',
                    offsetTime: '1'
                },
                hideLabel: false,
                validation: {
                    mandatory: true,
                    pattern: null
                }
            },
            {
                label: 'Dropdown',
                description: 'Label description',
                alias: 'label',
                view: 'dropdownFlexible',
                config: {
                    multiple: '0',
                    items: [
                        { id: 1, value: 'item1', sortOrder: 2 },
                        { id: 2, value: 'item2', sortOrder: 1 },
                    ]
                },
                hideLabel: false,
                validation: {
                    mandatory: true,
                    pattern: null
                }
            },
            {
                label: 'Checkbox List',
                description: 'Label description',
                alias: 'label',
                view: 'checkboxlist',
                config: {
                    items: [
                        { id: 10, value: 'val1', sortOrder: 2 },
                        { id: 20, value: 'val2', sortOrder: 1 },
                    ]
                },
                hideLabel: false,
                validation: {
                    mandatory: true,
                    pattern: null
                }
            },
            {
                label: 'Multi textbox',
                description: 'Label description',
                alias: 'label',
                view: 'multipletextbox',
                config: {
                    min: 2,
                    max: 4
                },
                hideLabel: false,
                validation: {
                    mandatory: true,
                    pattern: null
                }
            },
            {
                label: 'Color picker',
                description: 'Label description',
                alias: 'label',
                view: 'colorpicker',
                config: {
                    items: [
                        { id: 10, value: 'ed2727', sortOrder: 2, label: 'Red' },
                        { id: 20, value: '27ed27', sortOrder: 1, label: 'Green' },
                    ],
                    multiple: false,
                    useLabel: '1'
                },
                value: {},
                hideLabel: false,
                validation: {
                    mandatory: true,
                    pattern: null
                }
            },
            {
                label: 'Media Picker',
                description: 'Label description',
                alias: 'label',
                view: 'mediapicker',
                config: {
                    multiPicker: '1',
                    onlyImages: '1',
                    disableFolderSelect: '1',
                    startNodeId: -1
                },
                hideLabel: false,
                validation: {
                    mandatory: false,
                    pattern: null
                }
            },
            {
                label: 'markdown',
                description: 'Label description',
                alias: 'label',
                view: 'markdowneditor',
                config: {
                    preview: '1'
                },
                hideLabel: false,
                validation: {
                    mandatory: false,
                    pattern: null
                }
            }
        ];
    }
}());
