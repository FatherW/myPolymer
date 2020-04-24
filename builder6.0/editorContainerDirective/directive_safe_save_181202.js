var app = angular.module('demoApp');
app.directive('container', function ($compile) {
    var container = {
        restrict: 'E',
        scope: true,
        template: '<div bind-html-compile="model.html"></div>',
        controller: function ($scope, $element, $attrs) {
            $scope.container = 'container';
            $scope.model = {
                "html": "<div>container-{{container}}<menu></menu><imagee></imagee></div>"
            }
            $scope.$watch('model.html', function () {
                console.log('container model.html updated');
            })
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
            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.model.html = "<div class='col-md-6'><imagee></imagee><imagee></imagee></div>"
                });
            }, 7000);
            $scope.$watch('model.html', function () {
                console.log('menu model.html updated');
            })
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
                "html": "<div class='col-md-2'><img src='http://dazzle.gallery/img/logo.svg'></div>"
            }
            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.model.html = "<div class='col-md-6'><img src='http://dazzle.gallery/img/logo.svg'></div>"
                });
            }, 3000);
            $scope.$watch('model.html', function () {
                console.log('img model.html updated');
            })
        }
    };
    return imagee;
});