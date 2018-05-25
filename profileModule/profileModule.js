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
    $scope.updateSkills = updateSkills;
    $scope.stringifyInterests = stringifyInterests;
    $scope.stringifySkills = stringifySkills;
    $scope.toggleEditProfile = toggleEditProfile;
    $scope.saveNewInfo = saveNewInfo;
    $scope.getConnections = getConnections;
    $scope.openConnectionProfile = openConnectionProfile;

    $scope.profileInformation;
    $scope.isActiveUserProfile = false;
    $scope.editingProfile = false;
    $scope.connectionsArray = [];


    function goBack() {
        // $rootScope.selectedProfile = {};
        $rootScope.selectedApp = document.querySelector('#goBack').dataset.module;
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

    function stringifyInterests() {
        var returnVal;
        if (typeof $scope.profileInformation.interests !== 'string') {
            returnVal = JSON.stringify($scope.profileInformation.interests);
            returnVal = returnVal.replace(/\[|\]|\"/g, '');
            returnVal = returnVal.replace(/,/g, ', ');
            document.querySelector('#newInterests').value = returnVal;
        } else {
            returnVal = $scope.profileInformation.interests.replace(/\[|\]|\"/g, '');
            returnVal = returnVal.replace(/,/g, ', ');
            document.querySelector('#newInterests').value = returnVal;
        }
    }

    function stringifySkills() {
        var returnVal;
        if (typeof $scope.profileInformation.work.skills !== 'string') {
            returnVal = JSON.stringify($scope.profileInformation.work.skills);
            returnVal = returnVal.replace(/\[|\]|\"/g, '');
            returnVal = returnVal.replace(/,/g, ', ');
            document.querySelector('#newSkills').value = returnVal;
        } else {
            returnVal = $scope.profileInformation.work.skills.replace(/\[|\]|\"/g, '');
            returnVal = returnVal.replace(/,/g, ', ');
            document.querySelector('#newSkills').value = returnVal;
        }
    }

    function toggleEditProfile() {
        $scope.editingProfile = !$scope.editingProfile;
        if ($scope.editingProfile) {
            setTimeout(function () {
                stringifyInterests();
                stringifySkills();
            }, 50);
        }
    }

    function saveNewInfo() {
        $scope.editingProfile = false;
        var profileID = $rootScope.selectedProfile.unique_ID;

        var newFirstName = document.querySelector('#newFirstName'),
            newLastName = document.querySelector('#newLastName'),
            newCity = document.querySelector('#newCity'),
            newState = document.querySelector('#newState'),
            newAbout = document.querySelector('#newAbout'),
            newInterests = document.querySelector('#newInterests'),
            newWorkTitle = document.querySelector('#newWorkTitle'),
            newWorkCompany = document.querySelector('#newWorkCompany'),
            newWorkFocus = document.querySelector('#newWorkFocus'),
            newSkills = document.querySelector('#newSkills');

        $rootScope.database.ref('users/' + profileID).update({
            about: newAbout.value || '',
            // email: email,
            first_name: newFirstName.value || '',
            // imgUrl: url || '',
            interests: newInterests.value || '',
            last_name: newLastName.value || '',
            location: {
                city: newCity.value || '',
                state: newState.value || ''
            },
            // pass: password,
            // phone: phone || '',
            // share_contact: true,
            // unique_ID: uniqueID,
            work: {
                company: newWorkCompany.value || '',
                focus: newWorkFocus.value || '',
                skills: newSkills.value || '',
                title: newWorkTitle.value || ''
            }
        }).then(function () {
            $scope.editingProfile = false;
            window.localStorage.setItem('reloadedFromEdit', true);
            location.reload();
        })
    }

    function getConnections() {
        if ($scope.profileInformation.connections) {
            var connectionsStringArray = $scope.profileInformation.connections.split(',');
            if (connectionsStringArray) {
                connectionsStringArray.forEach(function (connection) {
                    var ref = $rootScope.database.ref('/users/' + connection),
                        connect;
                    ref.once("value", function (snapshot) {
                        connect = snapshot.val();
                    }).then(function () {
                        $scope.connectionsArray.push(connect);
                        $scope.$apply();
                    });
                });
            }
        } else {
            $scope.connectionsArray = [];
        }
    }

    function openConnectionProfile(connection) {
        $scope.connectionsArray = [];
        if (connection.unique_ID === $rootScope.activeUser.unique_ID) {
            $scope.isActiveUserProfile = true;
        } else {
            $scope.isActiveUserProfile = false;
        }
        $rootScope.selectedProfile = connection;
        initialize(true);
    }

    function initialize(reInitializing) {
        if (reInitializing) {
            console.log('reInitialize');
        } else {
            if (!$rootScope.userTrail) {
                $rootScope.userTrail = 'profile,'
            } else {
                $rootScope.userTrail = $rootScope.userTrail + 'profile,'
            }
            var userTrailClear = $rootScope.userTrail.split(',');
            var last = userTrailClear.length - 3;
            var goBackLocation = document.querySelector('#goBack');

            goBackLocation.dataset.module = userTrailClear[last];
            goBackLocation.innerHTML = '<i class="fa fa-chevron-left"></i>' + userTrailClear[last];
        }


        $scope.profileInformation = $rootScope.selectedProfile;
        if ($scope.profileInformation.unique_ID === $rootScope.activeUser.unique_ID) {
            $scope.isActiveUserProfile = true;
        }

        updateInterests();
        updateSkills();

        getConnections();
    }

    initialize();
});