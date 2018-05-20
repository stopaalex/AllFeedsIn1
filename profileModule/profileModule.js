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

    $scope.profileInformaiton;
    $scope.isActiveUserProfile = false;


    function goBack() {
        $rootScope.selectedApp = 'landing';
    }

    function initialize() {
        $scope.profileInformation = $rootScope.selectedProfile;
        if ($scope.profileInformation === $rootScope.activeUser) {
            $scope.isActiveUserProfile = true;
        }
        
        console.log($scope.isActiveUserProfile);
        console.log('profile');
    }

    initialize();
});