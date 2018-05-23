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
        $rootScope.selectedApp = document.querySelector('#goBack').dataset.module;
    }

    function initialize() {
        if (!$rootScope.userTrail) {
            $rootScope.userTrail = 'clock,'
        } else {
            $rootScope.userTrail = $rootScope.userTrail + 'clock,'
        }
        var userTrailClear = $rootScope.userTrail.split(',');
        var last = userTrailClear.length - 3;
        var goBackLocation = document.querySelector('#goBack');

        goBackLocation.dataset.module = userTrailClear[last];
        goBackLocation.innerHTML = '<i class="fa fa-chevron-left"></i>' + userTrailClear[last];
    }

    initialize();
});