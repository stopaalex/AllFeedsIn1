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
    }

    initialize();
});