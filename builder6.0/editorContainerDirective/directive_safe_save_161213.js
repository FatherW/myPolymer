var app = angular.module('demoApp');
app.directive('editorContainer', function ($compile, $templateRequest) {
    var editorContainer = {
        restrict: 'E',
        scope: true,
        link: function (scope, element, attr) {
            console.log('link');
            scope.id = element[0].id || "con" + new Date().getTime();
            element[0].id = scope.id;
            if (angular.isUndefined(scope.atom[scope.id])) {
                console.log('this is new container,copy content to html', element.html());
                scope.atom[scope.id] = {
                    "id": scope.id,
                    "type": "editor-container",
                    "html": element.html()
                };
                console.log('linked1');
            } else {
                scope.model = scope.atom[scope.id];
                console.log(scope.model);
                console.log('linked2');
            }
            console.log('linked3');
            /*$templateRequest("http://d27btag9kamoke.cloudfront.net/builder6.0/editorContainerDirective/directive.html").then(function (html) {
             var template = angular.element(html);
             element.append(template);
             $compile(template)(scope);
             });*/
        },
        template: function () {
            console.log('template');
        },
        controller: function ($scope, $element) {
            console.log('controller');
            //$scope.model = $scope.atom[$scope.id];
            //$scope.model.html = $element.html();
        }
    };
    return editorContainer;
});