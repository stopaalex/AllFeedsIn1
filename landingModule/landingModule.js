var myLanding = angular.module('myLanding', []);

myLanding.directive('myLanding', function () {
    return {
        link: function (scope) {
            scope.getLandingUrl = function () {
                return 'landingModule/landingModule.html'
            }
        },
        restrict: 'A',
        template: '<div ng-include="getLandingUrl()"></div>'
    };
});

myLanding.controller('myLandingCtrl', function ($scope, $rootScope) {

    $scope.selectModule = selectModule;
    $scope.loopText = loopText;
    $scope.initialize = initialize;

    $scope.modules = [
        {
            name: 'Networking',
            fa: 'fa fa-users'
        },
        {
            name: 'Stocks',
            fa: 'fa fa-chart-line'
        },
        {
            name: 'Weather',
            fa: 'fa fa-sun'
        },
        {
            name: 'Clock',
            fa: 'fa fa-clock'
        },
        {
            name: 'Todos',
            fa: 'fa fa-list-ul'
        }
    ];
    $scope.currentModule = 'Networking';

    function selectModule(module) {
        if (module === 'Profile') {
            $rootScope.selectedProfile = $rootScope.activeUser;
        }
        var selectModule = module.toLowerCase();
        clearInterval($scope.loopText);
        $rootScope.selectedApp = selectModule;
    }

    function loopText() {
        $scope.loopText = setInterval(function () {
            var randomNum = Math.floor(Math.random() * 6);
            $scope.modules.forEach(function (module, index) {
                if (index === randomNum) {
                    $scope.currentModule = module.name;
                    $scope.$apply();
                }
            });
        }, 1500);
    }

    function initialize() {
        if (!$rootScope.userTrail) {
            $rootScope.userTrail = 'landing,'
        } else {
            $rootScope.userTrail = $rootScope.userTrail + 'landing,'
        }
        loopText();
    }

    initialize();
});