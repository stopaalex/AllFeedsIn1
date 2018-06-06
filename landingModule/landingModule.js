var myLanding = angular.module('myLanding', []);

myLanding.directive('myLanding', function () {
    return {
        link: function (scope) {
            scope.getLandingUrl = function () {
                return 'landingModule/landingModule.html'
            }
        },
        restrict: 'A',
        template: '<div ng-include="getLandingUrl()"></div>'
    };
});

myLanding.controller('myLandingCtrl', function ($scope, $rootScope) {

    $scope.selectModule = selectModule;
    $scope.createCustomBackgrounds = createCustomBackgrounds;
    $scope.initialize = initialize;

    $scope.modules = [
        {
            name: 'Networking',
            about: 'Connect with your friends and share your thoughts, ideas, and modules with them!',
            fa: 'fa fa-users'
        },
        {
            name: 'Stocks',
            about: 'Follow the markets in real time.  Save stocks you\'re interested in.  Make Money.',
            fa: 'fa fa-chart-line'
        },
        {
            name: 'Weather',
            about: 'Track the forcast for your area to make sure you\'re prepared.',
            fa: 'fa fa-sun'
        },
        {
            name: 'Clock',
            about: 'Set Timers, alarms, and stay on track.',
            fa: 'fa fa-clock'
        },
        {
            name: 'Todos',
            about: 'Create a list and mark as complete to make sure you don\'t fall hehind on anything!',
            fa: 'fa fa-list-ul'
        }
    ];
    $scope.currentModule = 'Networking';

    function selectModule(module) {
        if (module === 'Profile') {
            $rootScope.selectedProfile = $rootScope.activeUser;
        }
        var selectModule = module.toLowerCase();
        clearInterval($scope.loopText);
        $rootScope.selectedApp = selectModule;
    }

    function createCustomBackgrounds() {
        var mods = document.querySelectorAll('.module');
    }

    function initialize() {
        if (!$rootScope.userTrail) {
            $rootScope.userTrail = 'landing,'
        } else {
            $rootScope.userTrail = $rootScope.userTrail + 'landing,'
        }
        setTimeout(function() {
            createCustomBackgrounds();
        }, 10);

        particlesJS("particles-js", {
            "particles": {
              "number": {
                "value": 250,
                "density": {
                  "enable": true,
                  "value_area": 800
                }
              },
              "color": {
                // "value": ['#336699', '#4fa4de', '#990000']
                "value": "random"
              },
              "shape": {
                "type": "circle",
                "stroke": {
                  "width": 0,
                  "color": "#000000"
                },
                "polygon": {
                  "nb_sides": 5
                },
                "image": {
                  "src": "img/github.svg",
                  "width": 100,
                  "height": 100
                }
              },
              "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                  "enable": false,
                  "speed": 1,
                  "opacity_min": 0.1,
                  "sync": false
                }
              },
              "size": {
                "value": 3,
                "random": true,
                "anim": {
                  "enable": false,
                  "speed": 40,
                  "size_min": 0.1,
                  "sync": false
                }
              },
              "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#e7e7e7",
                "opacity": 0.4,
                "width": 1
              },
              "move": {
                "enable": true,
                "speed": 4,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                  "enable": false,
                  "rotateX": 600,
                  "rotateY": 1200
                }
              }
            },
            "interactivity": {
              "detect_on": "canvas",
              "events": {
                "onhover": {
                  "enable": false,
                  "mode": "grab"
                },
                "onclick": {
                  "enable": true,
                  "mode": "repulse"
                },
                "resize": true
              },
              "modes": {
                "grab": {
                  "distance": 140,
                  "line_linked": {
                    "opacity": 1
                  }
                },
                "bubble": {
                  "distance": 400,
                  "size": 40,
                  "duration": 2,
                  "opacity": 8,
                  "speed": 3
                },
                "repulse": {
                  "distance": 200,
                  "duration": 0.4
                },
                "push": {
                  "particles_nb": 4
                },
                "remove": {
                  "particles_nb": 2
                }
              }
            },
            "retina_detect": true
          });
    }

    initialize();
});