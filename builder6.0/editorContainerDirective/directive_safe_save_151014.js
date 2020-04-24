var app = angular.module('demoApp');
app.directive('editorContainer', function ($compile) {
    var editorContainer = {
        restrict: 'E',
        scope: true,
        require: "ngModel",
        template: '<div ng-bind-html="model.html | to_trusted" ng-model="model.html"></editor-html-directive>',
        link: function (scope, element, attrs, ngModel) {
            function read() {
                ngModel.$setViewValue(element.html());
            }

            ngModel.$render = function () {
                element.html(ngModel.$viewValue || "");
            };

            element.bind("blur change", function () {
                scope.$apply(read);
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.id = $element[0].id || "con" + new Date().getTime();
            $element[0].id = $scope.id;
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "type": "editor-container",
                    "html": '<div>container</div>'
                };
            }
            $scope.model = $scope.atom[$scope.id];
        }
    };
    return editorContainer;
});