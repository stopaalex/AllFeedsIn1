var myWeather = angular.module('myWeather', []);

myWeather.directive('myWeather', function () {
   return {
       link: function(scope, element, attrs) {
           scope.getContentURL = function() {
               return 'weatherModule/weatherModule.html'
           }
       },
      restrict: 'A',
      template: '<div ng-include="getContentURL()"></div>'
   };
});

myWeather.controller('myWeatherCtrl', function($scope) {
    $scope.testFunction = testFunction;

    function testFunction() {
        console.log('Weather')
    }
});