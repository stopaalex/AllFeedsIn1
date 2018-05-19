var myHome = angular.module('myHome', []);

myHome.directive('myHome', function () {
    return {
        link: function (scope, element, attrs) {
            scope.getContentURL = function () {
                return 'home.html'
            }
        },
        restrict: 'A',
        template: '<div ng-include="getContentURL()"></div>'
    };
});

myHome.controller('myHomeCtrl', function ($scope) {

    // FUNCTIONS
    ////////////
    $scope.initializeFirebase = initializeFirebase;
    $scope.getUsers = getUsers;
    $scope.initialize = initialize;

    // VARIABLES
    ////////////
    $scope.selectedApp = 'landing';
    $scope.databse;
    $scope.storage;
    $scope.users = [];
    $scope.activeUser;
    $scope.loggedIn = false;

    function initializeFirebase() {
        var config = {
            apiKey: "AIzaSyDmhOnSLgpxFDryaKyK3mAEhXdXu6MLvsc",
            authDomain: "socialnetwork-6ff89.firebaseapp.com",
            databaseURL: "https://socialnetwork-6ff89.firebaseio.com",
            projectId: "socialnetwork-6ff89",
            storageBucket: "socialnetwork-6ff89.appspot.com",
            messagingSenderId: "492815653675"
        };
        firebase.initializeApp(config);
        $scope.database = firebase.database();
        $scope.storage = firebase.storage();

        getUsers();
    }

    function getUsers() {
        $scope.users = [];
        var ref = $scope.database.ref("users");

        ref.once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                // console.log(childSnapshot.val());
                $scope.users.push(childSnapshot.val());
            });

            console.log($scope.users)
            // checkForSavedCreds();
        });
    }

    function getFirebase() {

    }

    function initialize() {
        initializeFirebase();
    }

    initialize();

});