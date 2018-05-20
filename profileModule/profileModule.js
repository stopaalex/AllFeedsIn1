var myProfile = angular.module('myProfile', []);

myProfile.directive('myProfile', function () {
    return {
        link: function (scope) {
            scope.myProfileUrl = function () {
                return 'profileModule/profileModule.html'
            }
        },
        restrict: 'A',
        template: '<div ng-include="myProfileUrl()"></div>'
    };
});

myProfile.controller('myProfileCtrl', function ($scope, $rootScope) {

    $scope.initialize = initialize;
    $scope.goBack = goBack;
    $scope.updateInterests = updateInterests;

    $scope.profileInformation;
    $scope.isActiveUserProfile = false;


    function goBack() {
        $rootScope.selectedProfile = {};
        $rootScope.selectedApp = 'landing';
    }

    function updateInterests() {
        var interests;
        if (typeof $scope.profileInformation.interests === 'string') {
            interests = $scope.profileInformation.interests.split(', ');
        } else {
            interests = $scope.profileInformation.interests;
            console.log('dont split');
        }
        $scope.profileInformation.interests = interests;
    }
    
    function initialize() {
        $scope.profileInformation = $rootScope.selectedProfile;
        if ($scope.profileInformation === $rootScope.activeUser) {
            $scope.isActiveUserProfile = true;
        }

        updateInterests();

        console.log('profile');
    }

    initialize();
});