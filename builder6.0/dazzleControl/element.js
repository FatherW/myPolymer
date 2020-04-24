var app = angular.module('demoApp');
app.directive('dazzleControl', function ($compile, $templateRequest, $http, $mdDialog) {
    var dazzleToolbar = {
        restrict: 'E',
        scope: true,
        transclude: true,
        compile: function (tElement, attrs, transclude) {
        return function ($scope) {
                transclude($scope, function (clone) {
                    tElement.append(clone);
                    tElement.append("<dazzle-toolbar></dazzle-toolbar>");
                });
            };
        },

        controller: function ($scope, $element, $attrs) {

            
            $element.on("mouseleave",function(e) {
                console.log('Mouse Controller Leave',$scope.controlID);
                $scope.unwrap($element);
            });


            $scope.up = function() {
            
            }
            $scope.addElement = function() {
            
            }
            $scope.dbsettings = function() {
            
            }
            
            $scope.remove = function() {
            
            }
        }
    };
    return dazzleToolbar;
});