var myLanding = angular.module('myLanding', []);

myLanding.directive('myLanding', function () {
   return {
       link: function(scope, element, attrs) {
           scope.getContentURL = function() {
               return 'landingModule/landingModule.html'
           }
       },
      restrict: 'A',
      template: '<div ng-include="getContentURL()"></div>'
   };
});

myLanding.controller('myLandingCtrl', function($scope, $rootScope) {

    console.log($rootScope.activeUser);

});