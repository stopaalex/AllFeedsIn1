var myWeather = angular.module('myWeather', []);

myWeather.directive('myWeather', function () {
   return {
       link: function(scope) {
           scope.getContentURL = function() {
               return 'weatherModule/weatherModule.html'
           }
       },
      restrict: 'A',
      template: '<div ng-include="getContentURL()"></div>'
   };
});

myWeather.controller('myWeatherCtrl', function($scope, $rootScope) {
    $scope.goBack = goBack;

    function goBack() {
        console.log('Weather');
        $rootScope.selectedApp = 'landing';
    }
});