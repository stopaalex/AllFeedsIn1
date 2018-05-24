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
    $scope.createCustomBackgrounds = createCustomBackgrounds;
    $scope.initialize = initialize;

    $scope.modules = [
        {
            name: 'Networking',
            about: 'Connect with your friends and share your thoughts, ideas, and modules with them!',
            fa: 'fa fa-users'
        },
        {
            name: 'Stocks',
            about: 'Follow the markets in real time.  Save stocks you\'re interested in.  Make Money.',
            fa: 'fa fa-chart-line'
        },
        {
            name: 'Weather',
            about: 'Track the forcast for your area to make sure you\'re prepared.',
            fa: 'fa fa-sun'
        },
        {
            name: 'Clock',
            about: 'Set Timers, alarms, and stay on track.',
            fa: 'fa fa-clock'
        },
        {
            name: 'Todos',
            about: 'Create a list and mark as complete to make sure you don\'t fall hehind on anything!',
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

    function createCustomBackgrounds() {
        var mods = document.querySelectorAll('.module');
    }

    function initialize() {
        if (!$rootScope.userTrail) {
            $rootScope.userTrail = 'landing,'
        } else {
            $rootScope.userTrail = $rootScope.userTrail + 'landing,'
        }
        setTimeout(function() {
            createCustomBackgrounds();
        }, 10);
    }

    initialize();
});