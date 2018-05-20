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

    function goBack() {
        $rootScope.selectedApp = 'landing';
    }

    function initialize() {
        console.log('todos');
    }

    initialize();
});