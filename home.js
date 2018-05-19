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
    $scope.toggleMenu = toggleMenu;
    $scope.signOut = signOut;
    $scope.initialize = initialize;

    // VARIABLES
    ////////////
    $rootScope.selectedApp = 'landing';
    $scope.databse;
    $scope.storage;
    $scope.users = [];
    $scope.loggedIn = false;
    $scope.saveCredsCheck = document.querySelector('#saveCreds');
    $scope.saveChecked = false;
    $scope.menuOpen = false;

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
        }).then(function() {
            checkforSavedCreds();
        });
    }

    function logInFromInput() {
        $scope.inputEmail = document.querySelector('#logInEmail');
        $scope.inputPassword = document.querySelector('#logInPassword');

        $scope.users.forEach(function(user) {
            if (user.email === $scope.inputEmail.value && user.pass === $scope.inputPassword.value) {
                $rootScope.activeUser = user;
                if ($scope.saveChecked) {
                    // delete activeUserLocal.pass;
                    window.localStorage.setItem('AFiOneSavedUser', JSON.stringify($rootScope.activeUser));
                }
                $scope.loggedIn = true;
                $scope.userProfPic = document.querySelector('#loggedInUserImg');
                $scope.userProfPic.src = $rootScope.activeUser.imgUrl;
            }
        });
    }
    
    function logInWithCredentials(savedCredentials) {
        $scope.users.forEach(function(user) {
            if (user.email === savedCredentials.email && user.pass === savedCredentials.pass) {
                $rootScope.activeUser = user;
                $scope.loggedIn = true;
                // Forcing the digest since this stirng of functions is automatically run and angular doesn't like that ish apparently...
                $scope.$apply();
                $scope.userProfPic = document.querySelector('#loggedInUserImg');
                $scope.userProfPic.src = $rootScope.activeUser.imgUrl;

            }
        });
    }
    
    function checkforSavedCreds() {
        var savedCredentials = JSON.parse(window.localStorage.getItem('AFiOneSavedUser'));
        if (savedCredentials) {
            logInWithCredentials(savedCredentials);
        }
    }

    function toggleMenu() {
        $scope.menuSlider = document.querySelector('#menuSlider');
        if (!$scope.menuOpen) {
            $scope.menuOpen = !$scope.menuOpen
            $scope.menuSlider.style.right = '0'
        } else {
            $scope.menuOpen = !$scope.menuOpen
            $scope.menuSlider.style.right = '-301px'
        }
    }

    function signOut() {
        $scope.activeUser = {};
        $scope.loggedIn = false;
        $scope.userProfPic.src = '';
        toggleMenu();
        window.localStorage.removeItem('AFiOneSavedUser');
    }

    function initialize() {
        initializeFirebase();

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