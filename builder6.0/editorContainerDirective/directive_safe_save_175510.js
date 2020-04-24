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

app.directive('image', function ($compile) {
    var editorContainer = {
        restrict: 'E',
        scope: true,
        template: '<div bind-html-compile="model.html"></div>',
        controller: function ($scope, $element, $attrs) {
            $scope.image = 'container';
            $scope.model = {
                "html": "<div>container-{{container}}</div>"
            }
        }
    };
    return editorContainer;
});