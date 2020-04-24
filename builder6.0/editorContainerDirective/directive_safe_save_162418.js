var app = angular.module('demoApp');
app.directive('editorContainer', function ($compile, $templateRequest) {
    var editorContainer = {
        restrict: 'E',
        scope: true,
        /*link: function (scope, element, attr) {
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
         } else {
         scope.model = scope.atom[scope.id];
         console.log(scope.model);
         }
         },*/
        template: function (element, attrs) {
            setTimeout(function () {
                console.log('template');
                return "http://d27btag9kamoke.cloudfront.net/builder6.0/editorContainerDirective/directive.html"
            }, 200);
        },
        compile: function (element, attributes) {
            return {
                pre: function (scope, element, attributes, controller, transcludeFn) {
                    console.log('compile-pre');
                },
                post: function (scope, element, attributes, controller, transcludeFn) {
                    console.log('compile-post');
                }
            }
        },
        controller: function ($scope, $element) {
            console.log('controller');
            //$scope.model = $scope.atom[$scope.id];
            //$scope.model.html = $element.html();
        }
    };
    return editorContainer;
});