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
    $scope.initialize = initialize;
    $scope.goBack = goBack;

    function goBack() {
        $rootScope.selectedApp = document.querySelector('#goBack').dataset.module;
    }

    function initialize() {
        if (!$rootScope.userTrail) {
            $rootScope.userTrail = 'weather,'
        } else {
            $rootScope.userTrail = $rootScope.userTrail + 'weather,'
        }
        var userTrailClear = $rootScope.userTrail.split(',');
        var last = userTrailClear.length - 3;
        var goBackLocation = document.querySelector('#goBack');

        goBackLocation.dataset.module = userTrailClear[last];
        goBackLocation.innerHTML = '<i class="fa fa-chevron-left"></i>' + userTrailClear[last];
    }

    initialize();
});