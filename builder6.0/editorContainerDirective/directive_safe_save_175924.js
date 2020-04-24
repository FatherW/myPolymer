var app = angular.module('demoApp');
app.directive('container', function ($compile) {
    var container = {
        restrict: 'E',
        scope: true,
        template: '<div bind-html-compile="model.html"></div>',
        controller: function ($scope, $element, $attrs) {
            $scope.container = 'container';
            $scope.model = {
                "html": "<div>container-{{container}}</div>"
            }
        }
    };
    return container;
});

app.directive('menu', function ($compile) {
    var menu = {
        restrict: 'E',
        scope: true,
        template: '<div bind-html-compile="model.html"></div>',
        controller: function ($scope, $element, $attrs) {
            $scope.menu = 'menu';
            $scope.model = {
                "html": "<div>menu-{{menu}}</div>"
            }
        }
    };
    return menu;
});

app.directive('imagee', function ($compile) {
    var imagee = {
        restrict: 'E',
        scope: true,
        template: '<div bind-html-compile="model.html"></div>',
        controller: function ($scope, $element, $attrs) {
            $scope.model = {
                "html": "<img src='http://dazzle.gallery/img/logo.svg'>"
            }
        }
    };
    return imagee;
});