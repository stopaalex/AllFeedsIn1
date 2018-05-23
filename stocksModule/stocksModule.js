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
        $rootScope.selectedApp = document.querySelector('#goBack').dataset.module;
    }

    function initialize() {
        if (!$rootScope.userTrail) {
            $rootScope.userTrail = 'stocks,'
        } else {
            $rootScope.userTrail = $rootScope.userTrail + 'stocks,'
        }
        var userTrailClear = $rootScope.userTrail.split(',');
        var last = userTrailClear.length - 3;
        var goBackLocation = document.querySelector('#goBack');

        goBackLocation.dataset.module = userTrailClear[last];
        goBackLocation.innerHTML = '<i class="fa fa-chevron-left"></i>' + userTrailClear[last];
    }

    initialize();
});