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
    $scope.goBack = goBack;
    $scope.addNewTodo = addNewTodo;
    $scope.removeItem = removeItem;
    $scope.applyChecks = applyChecks;
    $scope.checkItem = checkItem;

    $scope.todos = [
        {
            item: 'Add Items to Todo List',
            complete: false
        }
    ]

    function addNewTodo() {
        var newTodo = document.querySelector('#newTodo');
        $scope.todos.push({
            item: newTodo.value,
            complete: false
        });
        newTodo.value = '';
        window.localStorage.setItem('savedTodos', JSON.stringify($scope.todos));
        setTimeout(function() {
            createListeners();
        }, 100);
    }

    function removeItem(itemToRemove) {
        $scope.todos.forEach(function (todo, index) {
            if (todo === itemToRemove) {
                $scope.todos.splice(index, 1);
                window.localStorage.setItem('savedTodos', JSON.stringify($scope.todos));
                return;
            }
        });
    }

    function applyChecks() {
        $scope.todos.forEach(function (todo, index) {
            if (todo.complete) {
                var input = document.getElementById(index);
                input.checked = true;
                input.classList.add('complete');
            }
        });
    }

    function checkItem(item) {
        $scope.todos.forEach(function (todo, index) {
            if (index.toString() === item.id || index === item) {
                if (typeof item === 'object') {
                    if (item.checked) {
                        todo.complete = true;
                        item.classList.add('complete')
                    } else if (!item.checked) {
                        todo.complete = false;
                        item.classList.remove('complete')
                    }
                } else {
                    var input = document.getElementById(item);
                    if (!input.checked) {
                        todo.complete = true;
                        input.classList.add('complete');
                        input.checked = true;
                    } else if (input.checked) {
                        todo.complete = false;
                        input.classList.remove('complete')
                        input.checked = false;
                    }
                }
            }
        });
        if (typeof item === 'object') {
            $scope.$apply();
        }
    }

    function goBack() {
        $rootScope.selectedApp = document.querySelector('#goBack').dataset.module;
    }

    function createListeners() {
        $scope.checks = Array.from(document.querySelectorAll('.check input'));
        $scope.checks.forEach(function (check) {
            check.addEventListener('change', function () {
                checkItem(check);
            });
        });
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

        $scope.todos = JSON.parse(window.localStorage.getItem('savedTodos')) || [];

        setTimeout(function () {
            applyChecks();
            createListeners();
        }, 100);
    }

    initialize();
});