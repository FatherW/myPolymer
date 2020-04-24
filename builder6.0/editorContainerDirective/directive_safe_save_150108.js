var app = angular.module('demoApp');
app.directive('editorContainer', function ($compile) {
    var editorContainer = {
        restrict: 'E',
        scope: true,
        template: '<div ng-bind-html="model.html | to_trusted" ng-model="model.html" contenteditable="true"></editor-html-directive>',
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) return;
            ngModel.$render = function () {
                element.html(ngModel.$viewValue || '');
            };
            element.on('blur keyup change', function () {
                scope.$apply(read);
                console.log('container content changed');
            });
            read();
            function read() {
                var html = element.html();
                if (attrs.stripBr && html == '<br>') {
                    html = '';
                }
                ngModel.$setViewValue(html);
            }
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