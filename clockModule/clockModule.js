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
    $scope.getTime = getTime;
    $scope.updateHands = updateHands;

    $scope.clockInterval;
    $scope.currentHours;
    $scope.currentMins;
    $scope.currentSeconds;

    function getTime() {
        var tempDate = new Date();
            $scope.currentMins = tempDate.getMinutes();
            $scope.currentHours = tempDate.getHours();
            $scope.currentSeconds = tempDate.getSeconds();
            if ($scope.currentHours > 12) {
                $scope.currentHours = $scope.currentHours - 12;
            }
        $scope.clockInterval = setInterval(function() {
            var date = new Date();
            $scope.currentMins = date.getMinutes();
            $scope.currentHours = date.getHours();
            $scope.currentSeconds = date.getSeconds();
            if ($scope.currentHours > 12) {
                $scope.currentHours = $scope.currentHours - 12;
            }
            $scope.$apply();
            updateHands();
        }, 1000);
    }

    function updateHands() {

    }

    function goBack() {
        clearInterval($scope.clockInterval);
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

        getTime();
    }

    initialize();
});