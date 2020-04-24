var app = angular.module('demoApp');
app.directive('ccpySlider', function ($compile, $templateRequest) {
    var path = "https://d25k6mzsu7mq5l.cloudfront.net/";
    var key = "builder6.0/id-1490364536322/html/id-1490364536322.html";
    var ccpySlider = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            //console.log('ccpySlider loading start');
            $templateRequest(path + key + "?id" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
                //console.log('ccpySlider loading end');
            });
        },
        controller: function ($scope, $element, $attrs) {
            console.log('CCPY Slider');
            var data=[];
            var key = "website/"+$scope.website['website']+"/content/slide-schema.json";
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);


            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "type": "editor-ccpySlider-element",
                    "link": "#",
                    "html": "",
                    "list":[]

                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<div>ccpySlider</div>'
                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            data = $scope.getJson($scope.userBucket,key);
            console.log('Data',data);

            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);
            //console.log('ccpySlider init end');
        }
    };
    return ccpySlider;
});