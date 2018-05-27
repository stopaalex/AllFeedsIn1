var myTodos = angular.module('myTodos', []);

myTodos.directive('myTodos', function () {
    return {
        link: function (scope) {
            scope.myTodosUrl = function () {
                return 'todosModule/todosModule.html'
            }
        },
        restrict: 'A',
        template: '<div ng-include="myTodosUrl()"></div>'
    };
});

myTodos.controller('myTodosCtrl', function ($scope, $rootScope) {

    $scope.initialize = initialize;
    $scope.getTodos = getTodos;
    $scope.goBack = goBack;
    $scope.addNewTodo = addNewTodo;
    $scope.removeItem = removeItem;
    $scope.applyChecks = applyChecks;
    $scope.checkItem = checkItem;

    $scope.todos = []

    function getTodos() {
        $rootScope.database.ref('users/' + $rootScope.activeUser.unique_ID + '/todos/').once("value", function (snapshot) {
            $scope.todos = [];
            snapshot.forEach(function (childSnapshot) {
                $scope.todos.push(childSnapshot.val());
            });
        }).then(function () {
            $scope.$apply();
            applyChecks();
            createListeners();
        });
    }

    function applyChecks() {
        $scope.todos.forEach(function (todo) {
            if (todo.complete) {
                var input = document.getElementById(todo.id);
                input.checked = true;
                input.classList.add('complete');
            } else if (!todo.complete) {
                var input = document.getElementById(todo.id);
                input.checked = false;
                input.classList.remove('complete');
            }
        });
    }

    function createListeners() {
        $scope.checks = Array.from(document.querySelectorAll('.check input'));
        $scope.checks.forEach(function (check) {
            check.addEventListener('change', function () {
                checkItem(check);
            });
        });
    }

    function addNewTodo() {
        var newTodo = document.querySelector('#newTodo'),
            randomNum = Math.floor(Math.random() * 99999);

        $rootScope.database.ref('users/' + $rootScope.activeUser.unique_ID + '/todos/' + randomNum + '/').set({
            item: newTodo.value,
            complete: false,
            id: randomNum
        }).then(function () {
            newTodo.value = '';
            getTodos();
        });
    }

    function removeItem(itemToRemove) {
        var listItemID = itemToRemove.id;
        $rootScope.database.ref('users/' + $rootScope.activeUser.unique_ID + '/todos/' + listItemID + '/').remove().then(function() {
            getTodos();
        });
    }

    function checkItem(item) {
        var checkedBool,
            inputElement,
            listItemID;
        if (typeof item === 'number') {
            inputElement = document.getElementById(item);
            checkedBool = !inputElement.checked;
            listItemID = item;
        } else {
            inputElement = item;
            checkedBool = inputElement.checked;
            listItemID = item.id;
        }
        $rootScope.database.ref('users/' + $rootScope.activeUser.unique_ID + '/todos/' + listItemID + '/').update({
            complete: checkedBool,
        }).then(function () {
            getTodos();
        });
    }

    function goBack() {
        $rootScope.selectedApp = document.querySelector('#goBack').dataset.module;
    }

    function initialize() {
        if (!$rootScope.userTrail) {
            $rootScope.userTrail = 'todos,'
        } else {
            $rootScope.userTrail = $rootScope.userTrail + 'todos,'
        }
        var userTrailClear = $rootScope.userTrail.split(',');
        var last = userTrailClear.length - 3;
        var goBackLocation = document.querySelector('#goBack');

        goBackLocation.dataset.module = userTrailClear[last];
        goBackLocation.innerHTML = '<i class="fa fa-chevron-left"></i>' + userTrailClear[last];

        getTodos();
    }

    initialize();
});