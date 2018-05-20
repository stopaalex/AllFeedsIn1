var myClock = angular.module('myClock', []);

myClock.directive('myClock', function () {
    return {
        link: function (scope) {
            scope.myClockUrl = function () {
                return 'clockModule/clockModule.html'
            }
        },
        restrict: 'A',
        template: '<div ng-include="myClockUrl()"></div>'
    };
});

myClock.controller('myClockCtrl', function ($scope, $rootScope) {

    $scope.initialize = initialize;
    $scope.goBack = goBack;

    function goBack() {
        $rootScope.selectedApp = 'landing';
    }

    function initialize() {
        console.log('clock');
    }

    initialize();
});