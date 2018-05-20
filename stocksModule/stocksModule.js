var myStocks = angular.module('myStocks', []);

myStocks.directive('myStocks', function () {
    return {
        link: function (scope) {
            scope.myStocksUrl = function () {
                return 'stocksModule/stocksModule.html'
            }
        },
        restrict: 'A',
        template: '<div ng-include="myStocksUrl()"></div>'
    };
});

myStocks.controller('myStocksCtrl', function ($scope, $rootScope) {

    $scope.initialize = initialize;
    $scope.goBack = goBack;

    function goBack() {
        $rootScope.selectedApp = 'landing';
    }

    function initialize() {
        console.log('stocks');
    }

    initialize();
});