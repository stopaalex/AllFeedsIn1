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
    $scope.toggleJellyMenu = toggleJellyMenu;
    $scope.signOut = signOut;
    $scope.openProfile = openProfile;
    $scope.goHome = goHome;
    $scope.openCreateProfile = openCreateProfile;
    $scope.closeCreateProfileModal = closeCreateProfileModal;
    $scope.submitNewProfile = submitNewProfile;
    $scope.initialize = initialize;

    // VARIABLES
    ////////////
    $rootScope.selectedApp = 'landing';
    $rootScope.selectedProfile = {};
    $rootScope.activeUser;
    $rootScope.database;
    $rootScope.storage;
    $rootScope.userTrail;

    $scope.databse;
    $scope.storage;
    $scope.users = [];
    $scope.loggedIn = false;
    $scope.saveCredsCheck = document.querySelector('#saveCreds');
    $scope.saveChecked = false;
    $scope.menuOpen = false;
    $rootScope.menuOpen2 = false;
    $scope.createProfileModalOpen = false;

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
        $rootScope.database = firebase.database();
        $rootScope.storage = firebase.storage();

        getUsers();
    }

    function getUsers() {
        $scope.users = [];
        var ref = $rootScope.database.ref("users");

        ref.once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                // console.log(childSnapshot.val());
                $scope.users.push(childSnapshot.val());
            });
        }).then(function () {
            checkforSavedCreds();
        });
    }

    function logInFromInput() {
        $scope.inputEmail = document.querySelector('#logInEmail');
        $scope.inputPassword = document.querySelector('#logInPassword');

        $scope.users.forEach(function (user) {
            if (user.email === $scope.inputEmail.value && user.pass === $scope.inputPassword.value) {
                $rootScope.activeUser = user;
                if ($scope.saveChecked) {
                    window.localStorage.setItem('AFiOneSavedUser', JSON.stringify($rootScope.activeUser));
                }
                $scope.animateLoader = false;
                $scope.loggedIn = true;
                $rootScope.selectedApp = 'landing';
                $scope.userProfPic = document.querySelector('#loggedInUserImg');
                $scope.userProfPic.src = $rootScope.activeUser.imgUrl;
                // $scope.$apply();
            }
        });
    }

    function logInWithCredentials(savedCredentials) {
        $scope.users.forEach(function (user) {
            if (user.email === savedCredentials.email && user.pass === savedCredentials.pass) {
                $rootScope.activeUser = user;
                $scope.loggedIn = true;
                // Forcing the digest since this stirng of functions is automatically run and angular doesn't like that ish apparently...
                $scope.$apply();
                $scope.userProfPic = document.querySelector('#loggedInUserImg');
                $scope.userProfPic.src = $rootScope.activeUser.imgUrl;
                setTimeout(function () {
                    var reloadFromEdit = window.localStorage.getItem('reloadedFromEdit');
                    if (reloadFromEdit) {
                        $rootScope.selectedProfile = $rootScope.activeUser;
                        $rootScope.selectedApp = 'profile';
                        window.localStorage.removeItem('reloadedFromEdit')
                    }
                }, 10);
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

    function toggleJellyMenu() {
        var prof = document.querySelector('.home-menu-container .open');
        var more = document.querySelector('.home-menu-container .more');
        var sOut = document.querySelector('.home-menu-container .sign-out');
        if (!$rootScope.menuOpen2) {
            prof.style.right = '80px'
            prof.style.top = '10px'
            more.style.right = '65px';
            more.style.top = '65px';
            sOut.style.top = '80px';
            $rootScope.menuOpen2 = true;
        } else {
            prof.style.right = '0px'
            prof.style.top = '-3px'
            more.style.right = '0px';
            more.style.top = '-3px';
            sOut.style.top = '-3px';
            $rootScope.menuOpen2 = false;
        }
    }

    function signOut() {
        $scope.activeUser = {};
        $rootScope.selectedProfile = {};
        $rootScope.selectedApp = '';
        $scope.loggedIn = false;
        $scope.userProfPic.src = '';
        // toggleMenu();
        window.localStorage.removeItem('AFiOneSavedUser');
    }

    function openProfile() {
        $rootScope.selectedProfile = $rootScope.activeUser;
        $rootScope.selectedApp = 'profile';
    }

    function goHome() {
        $rootScope.selectedApp = 'landing';
    }

    function openCreateProfile() {
        $scope.createProfileModalOpen = true;
    }

    function closeCreateProfileModal() {
        $scope.createProfileModalOpen = false;

        var firstName = document.querySelector('#createFirstName').value = '',
            lastName = document.querySelector('#createLastName').value = '',
            about = document.querySelector('#createAbout').value = '',
            interests = document.querySelector('#createInterests').value = '',
            phone = document.querySelector('#createPhone').value = '',
            workCompany = document.querySelector('#createWorkCompany').value = '',
            workTitle = document.querySelector('#createWorkTitle').value = '',
            workFocus = document.querySelector('#createWorkFocus').value = '',
            skills = document.querySelector('#createWorkSkills').value = '',
            city = document.querySelector('#createCity').value = '',
            state = document.querySelector('#createState').value = '',
            email = document.querySelector('#createEmail').value = '',
            password = document.querySelector('#createPassword').value = '',
            confirmPassword = document.querySelector('#createPasswordConfirmation').value = '';
    }

    function submitNewProfile() {
        var firstName = document.querySelector('#createFirstName').value,
            lastName = document.querySelector('#createLastName').value,
            about = document.querySelector('#createAbout').value,
            interests = document.querySelector('#createInterests').value,
            phone = document.querySelector('#createPhone').value,
            workCompany = document.querySelector('#createWorkCompany').value,
            workTitle = document.querySelector('#createWorkTitle').value,
            workFocus = document.querySelector('#createWorkFocus').value,
            skills = document.querySelector('#createWorkSkills').value,
            city = document.querySelector('#createCity').value,
            state = document.querySelector('#createState').value,
            email = document.querySelector('#createEmail').value,
            password = document.querySelector('#createPassword').value,
            confirmPassword = document.querySelector('#createPasswordConfirmation').value;

        var numArray = [];
        for (var i = 0; i < 11; i++) {
            var num = Math.floor(Math.random() * 9) + 0;
            numArray.push(num);
        }
        var uniqueID = numArray.map(function (number) {
            return number;
        }).join('');

        // GET TEH SELECTED FILE AND PUSH TO STORAGE
        var picturePath = document.querySelector('#pictureUpload');
        var pictureFile = picturePath.files[0];

        var storageRef = $rootScope.storage.ref();
        var imageFolderRef = storageRef.child('images')
        var imageRef = imageFolderRef.child(uniqueID + '.jpeg');
        imageRef.put(pictureFile).then(function () {
            imageRef.getDownloadURL().then(function (url) {
                // PUSH THE DATA TO THE DATABASE
                $rootScope.database.ref('users/' + uniqueID).set({
                    about: about || '',
                    email: email,
                    first_name: firstName || '',
                    imgUrl: url || '',
                    interests: interests || '',
                    last_name: lastName || '',
                    location: {
                        city: city || '',
                        state: state || ''
                    },
                    pass: password,
                    phone: phone || '',
                    share_contact: true,
                    unique_ID: uniqueID,
                    work: {
                        company: workCompany || '',
                        focus: workFocus || '',
                        skills: skills || '',
                        title: workTitle || ''
                    }
                }).then(function () {
                    $scope.users = [];
                    var ref = $rootScope.database.ref("users");

                    ref.once("value", function (snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                            // console.log(childSnapshot.val());
                            $scope.users.push(childSnapshot.val());
                        });
                    }).then(function () {
                        closeCreateProfileModal();
                    });
                });

            }).catch(function (error) {
                console.log(error);
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    function initialize() {
        initializeFirebase();

        $scope.saveCredsCheck.addEventListener('change', function () {
            if ($scope.saveCredsCheck.checked) {
                $scope.saveCredsCheck.classList.add('checked');
                $scope.saveChecked = true;
            } else {
                $scope.saveCredsCheck.classList.remove('checked');
                $scope.saveChecked = false;
            }
        });

        window.addEventListener('click', function(e) {
            // for the Jelly menu
            var targetClear = JSON.stringify(e.target.classList).includes('jelly'),
                parentClear;
            if (e.target.offsetParent !== null) {
                parentClear = JSON.stringify(e.target.offsetParent.classList).includes('jelly');
            } else {
                parentClear = false;
            }
            if (targetClear || parentClear) {
                console.log('dont close menu');
            } else {
                if($rootScope.menuOpen2) {
                    toggleJellyMenu();
                }
            }

            if (JSON.stringify(e.target.classList).includes('go-back')) {
            }

        });
    }

    initialize();

});