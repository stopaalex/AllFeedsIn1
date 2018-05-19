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

myHome.controller('myHomeCtrl', function ($scope, $rootScope) {

    // FUNCTIONS
    ////////////
    $scope.initializeFirebase = initializeFirebase;
    $scope.getUsers = getUsers;
    $scope.logInFromInput = logInFromInput;
    $scope.logInWithCredentials = logInWithCredentials;
    $scope.checkforSavedCreds = checkforSavedCreds;
    $scope.initialize = initialize;

    // VARIABLES
    ////////////
    $rootScope.selectedApp = 'landing';
    $scope.databse;
    $scope.storage;
    $scope.users = [];
    $rootScope.activeUser;
    $scope.loggedIn = false;
    $scope.saveCredsCheck = document.querySelector('#saveCreds');
    $scope.saveChecked = false;

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
        });
    }

    function logInFromInput() {
        $scope.inputEmail = document.querySelector('#logInEmail');
        $scope.inputPassword = document.querySelector('#logInPassword');

        $scope.users.forEach(function(user) {
            if (user.email === $scope.inputEmail.value && user.pass === $scope.inputPassword.value) {
                $rootScope.activeUser = user;
                var activeUserLocal = $rootScope.activeUser;

                if ($scope.saveChecked) {
                    delete activeUserLocal.pass;
                    window.localStorage.setItem('AFiOneSavedUser', JSON.stringify(activeUserLocal));
                }

                $scope.loggedIn = true;
            }
        });
    }

    function logInWithCredentials(savedCredentials) {
        var ref = $scope.database.ref("users/" + savedCredentials.unique_ID + "");
        var credentialsFromLS;

        ref.once("value", function (snapshot) {
            credentialsFromLS = snapshot.val();
            $rootScope.activeUser = credentialsFromLS;
            $scope.loggedIn = true;
        });

        return true;
    }

    function checkforSavedCreds() {
        var returnBool;
        var savedCredentials = JSON.parse(window.localStorage.getItem('AFiOneSavedUser'));
        if (savedCredentials) {
            returnBool = logInWithCredentials(savedCredentials);
        }
        return returnBool;
    }

    function initialize() {
        initializeFirebase();

        $scope.loggedIn = checkforSavedCreds();

        $scope.saveCredsCheck.addEventListener('change', function() {
            if ($scope.saveCredsCheck.checked) {
                $scope.saveCredsCheck.classList.add('checked');
                $scope.saveChecked = true;
            } else {
                $scope.saveCredsCheck.classList.remove('checked');
                $scope.saveChecked = false;
            }
        })
    }

    initialize();

});