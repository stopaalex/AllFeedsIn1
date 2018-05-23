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
    $scope.addConnections = addConnections;

    function openProfile(id) {
        $scope.users.forEach(function (user) {
            if (user.unique_ID === id) {
                $rootScope.selectedProfile = user;
                $rootScope.selectedApp = 'profile';
            }
        })
    }

    function addConnections(id) {
        var profileID = $rootScope.activeUser.unique_ID;

        if (!$rootScope.activeUser.connections) {
            $rootScope.database.ref('users/' + profileID).update({
                connections: ',' + id
            });
        } else if ($rootScope.activeUser.connections) {
            if (!$rootScope.activeUser.connections.includes(id)) {
                $rootScope.database.ref('users/' + profileID).update({
                    connections: $rootScope.activeUser.connections + ',' + id
                });
            }
        }

    }

    function goBack() {
        $rootScope.selectedApp = document.querySelector('#goBack').dataset.module;
    }

    function reloadUsers() {
        $scope.users = [];
        var tempUsers = [];
        var ref = $rootScope.database.ref("users");

        ref.once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                // console.log(childSnapshot.val());
                tempUsers.push(childSnapshot.val());
            });
        }).then(function () {
            tempUsers.forEach(function (user) {
                if (user.unique_ID !== $rootScope.activeUser.unique_ID) {
                    $scope.users.push(user);
                }
            });
            $scope.$apply();
        });
    }

    function initialize() {
        if (!$rootScope.userTrail) {
            $rootScope.userTrail = 'networking,'
        } else {
            $rootScope.userTrail = $rootScope.userTrail + 'networking,'
        }
        var userTrailClear = $rootScope.userTrail.split(',');
        var last = userTrailClear.length - 3;
        var goBackLocation = document.querySelector('#goBack');

        goBackLocation.dataset.module = userTrailClear[last];
        goBackLocation.innerHTML = '<i class="fa fa-chevron-left"></i>' + userTrailClear[last];
        reloadUsers();
    }

    initialize();
});