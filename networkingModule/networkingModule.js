var myNetworking = angular.module('myNetworking', []);

myNetworking.directive('myNetworking', function () {
    return {
        link: function (scope) {
            scope.getNetworkingUrl = function () {
                return 'networkingModule/networkingModule.html'
            }
        },
        restrict: 'A',
        template: '<div ng-include="getNetworkingUrl()"></div>'
    };
});

myNetworking.controller('myNetworkingCtrl', function ($scope, $rootScope) {

    $scope.initialize = initialize;
    $scope.goBack = goBack;

    function goBack() {
        $rootScope.selectedApp = 'landing';
    }

    function initialize() {
        console.log('netowrking')
    }

    initialize();
});