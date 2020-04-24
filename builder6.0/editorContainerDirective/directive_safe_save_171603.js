var app = angular.module('demoApp');
app.directive('editorContainer', function ($compile, $templateRequest) {
    var editorContainer = {
        restrict: 'E',
        scope: true,
        controller: function ($scope, $element, $attrs) {
            $scope.id = $element[0].id || "con" + new Date().getTime();
            $element[0].id = $scope.id;
            if (angular.isUndefined($scope.atom[$scope.id])) {
                console.log('new container');
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "type": "editor-container",
                    "html": $element.html()
                };
            }

            $scope.model = $scope.atom[$scope.id];

            var titleEl = $element[0];
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
            var MutationObserverConfig = {
                childList: true,
                subtree: true,
                characterData: true
            };
            var observer = new MutationObserver(function (mutations) {
                $scope.model.html = $element.html();
            });
            observer.observe(titleEl, MutationObserverConfig);
        }
    };
    return editorContainer;
});