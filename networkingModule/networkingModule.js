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

    $scope.initialize = initialize;
    $scope.goBack = goBack;

    function goBack() {
        $rootScope.selectedApp = 'landing';
    }

    function initialize() {
        console.log('netowrking');

        $scope.users = [];
        var ref = $rootScope.database.ref("users");

        ref.once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                // console.log(childSnapshot.val());
                $scope.users.push(childSnapshot.val());
            });
        }).then(function() {
            console.log($scope.users);
        });
    }

    initialize();
});