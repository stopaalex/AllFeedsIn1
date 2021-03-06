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
    $scope.loadPosts = loadPosts;
    $scope.addNewPost = addNewPost;
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
                connections: id
            });
        } else if ($rootScope.activeUser.connections) {
            if (!$rootScope.activeUser.connections.includes(id)) {
                $rootScope.database.ref('users/' + profileID).update({
                    connections: $rootScope.activeUser.connections + ',' + id
                }).then(function() {
                    $scope.$apply();
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

    function loadPosts() {
        $scope.posts = [];
        var tempPosts = [];
        var ref = $rootScope.database.ref("posts");

        ref.once("value", function (snapshot) {
            snapshot.forEach(function(childSnapshot) {
                tempPosts.push(childSnapshot.val());
            });
        }).then(function(){
            tempPosts.forEach(function(post) {
                $scope.posts.push(post);
            });
            $scope.posts.sort(function (a, b) {
                if (a.timestamp > b.timestamp) {
                    return -1
                } else if (a.timestamp < b.timestamp) {
                    return 1;
                } else {
                    return 0
                }
              });
            $scope.$apply();
        });
    }

    function addNewPost() {
        var content = document.querySelector('#newPost').value;
        var date = new Date(),
            dateDay = date.getDate(),
            dateMonth = date.getMonth(),
            dateYear = date.getFullYear(),
            dateMins = date.getMinutes(),
            dateHours = date.getHours();

        var randomPostID = Math.floor(Math.random() * 99999999999999999999);

        var ref = $rootScope.database.ref('posts/' + randomPostID).set({
            content: content,
            created_by: $rootScope.activeUser,
            date_string: dateMonth + '/' + dateDay + '/' + dateYear + '/' + ' ' + dateHours + ':' + dateMins,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(function() {
            console.log('ADDED');
            content = '';
            $scope.$apply();
            loadPosts();
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
        loadPosts();
    }

    initialize();
});