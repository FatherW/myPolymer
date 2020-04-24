var app = angular.module('demoApp');

        app.directive("contenteditable", function () {
            return {
                restrict: "A",
                require: "ngModel",
                link: function (scope, element, attrs, ngModel) {
                    function read() {
                        ngModel.$setViewValue(element.html());
                    }

                    ngModel.$render = function () {
                        element.html(ngModel.$viewValue || "");
                    };

                    element.bind("blur change", function () {
                        console.log('contenteditable changed');
                        scope.$apply(read);
                    });
                }
            };
        });
        
app.directive('container', function ($ocLazyLoad) {
    var path = "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/id-1489479930223";
    var container = {
        restrict: 'E',
        priority: 1000,
        scope: true,
//        templateUrl: path + '/html/id-1489479930223.html' + '?id=' + new Date().getTime(),
        controller: function ($scope, $element, $attrs) {
            //element init
            $scope.id = $element[0].id || "ele" + new Date().getTime();
            $element[0].id = $scope.id;
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "src": $scope.src,
                    "link": "#",
                    "html": "hello,hello2345"
                };
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.imgMenuOptions = [
                ["Menu", function ($itemScope) {
                    console.log('Menu clicked');
                }]
            ];
            $element[0].addEventListener("DOMSubtreeModified", function () {
                console.log('DOM changed');
            });
            //element init
        }
    }
    return container;
});