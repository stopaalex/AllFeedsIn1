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

    $scope.reloadUsers = reloadUsers;
    $scope.initialize = initialize;
    $scope.goBack = goBack;
    $scope.openProfile = openProfile;

    function openProfile(id) {
        $scope.users.forEach(function(user) {
            if (user.unique_ID === id) {
                $rootScope.selectedProfile = user;
                $rootScope.selectedApp = 'profile';
            }
        })
    }

    function goBack() {
        $rootScope.selectedApp = 'landing';
    }

    function reloadUsers() {
        $scope.users = [];
        var ref = $rootScope.database.ref("users");

        ref.once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                // console.log(childSnapshot.val());
                $scope.users.push(childSnapshot.val());
            });
        }).then(function() {
            $scope.$apply();
        });
    }

    function initialize() {
        reloadUsers();
    }

    initialize();
});