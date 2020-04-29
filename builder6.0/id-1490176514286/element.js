var app = angular.module('demoApp');
app.directive('kpleeMenu', function ($compile, $templateRequest) {
    var path = "https://d25k6mzsu7mq5l.cloudfront.net/";
    var key = "builder6.0/id-1490176514286/html/id-1490176514286.html";
    var kpleeMenu = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            //console.log('kpleeMenu loading start');
            $templateRequest(path + key + "?id" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
                //console.log('kpleeMenu loading end');
            });
        },
        controller: function ($scope, $element, $attrs) {
            //console.log('kpleeMenu init start');
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id + Object.keys($scope.atom).length,
                    "type": "editor-kpleeMenu-element"
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<div>kpleeMenu</div>'
                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);
            //console.log('kpleeMenu init end');
        }
    };
    return kpleeMenu;
});