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
    $scope.toggleEditProfile = toggleEditProfile;
    $scope.saveNewInfo = saveNewInfo;
    $scope.updateSkills = updateSkills;

    $scope.profileInformation;
    $scope.isActiveUserProfile = false;
    $scope.editingProfile = false;


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
        }
        $scope.profileInformation.interests = interests;
    }

    function updateSkills() {
        var skills;
        if (typeof $scope.profileInformation.work.skills === 'string') {
            skills = $scope.profileInformation.work.skills.split(', ');
        } else {
            skills = $scope.profileInformation.work.skills;
        }
        $scope.profileInformation.work.skills = skills;
    }

    function toggleEditProfile() {
        $scope.editingProfile = !$scope.editingProfile;
    }

    function saveNewInfo() {
        $scope.editingProfile = false;
    }

    function initialize() {
        $scope.profileInformation = $rootScope.selectedProfile;
        if ($scope.profileInformation === $rootScope.activeUser) {
            $scope.isActiveUserProfile = true;
        }

        updateInterests();
        updateSkills();

        console.log('profile');
    }

    initialize();
});