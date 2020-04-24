var app = angular.module('demoApp');
app.directive('ccpyMenu', function ($compile, $templateRequest) {
    var path = "https://d25k6mzsu7mq5l.cloudfront.net/";
    var key = "builder6.0/id-1489894214444/html/id-1489894214444.html";
    var ccpyMenu = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            //console.log('ccpyMenu loading start');
            $templateRequest(path + key + "?id" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
                //console.log('ccpyMenu loading end');
            });
        },
        controller: function ($scope, $element, $attrs) {
            //console.log('ccpyMenu init start');
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id + Object.keys($scope.atom).length,
                    "type": "editor-ccpyMenu-element"
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<div>ccpyMenu</div>'
                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);
            //console.log('ccpyMenu init end');
        }
    };
    return ccpyMenu;
});