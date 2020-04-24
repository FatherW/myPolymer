var app = angular.module('demoApp');
app.directive('kpleeRunningElement', function ($compile, $templateRequest) {
    var path = "https://d27btag9kamoke.cloudfront.net/";
    var key = "builder6.0/id-1490239396685/html/id-1490239396685.html";
    var kpleeRunningElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            //console.log('kplee-running loading start');
            $templateRequest(path + key + "?id" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
                //console.log('kplee-running loading end');
            });
        },
        controller: function ($scope, $element, $attrs) {
            //console.log('kplee-running init start');
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);
            $element[0].id = $scope.id;
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "src": $scope.src,
                    "link": "#",
                    "html": "",
                    "list":[
                        {
                            "title":"項目一",
                            "link":"#"
                        },
                        {
                            "title":"項目二",
                            "link":"#"
                        },
                        {
                            "title":"項目三",
                            "link":"#"
                        }
                    ]

                };
            }
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id + Object.keys($scope.atom).length,
                    "type": "kplee-running-element",
                    "list":[
                        {
                            "title":"圖片1",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-02.jpg"
                        },
                        {
                            "title":"圖片2",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-04.jpg"
                        },
                        {
                            "title":"圖片3",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        }
                    ]
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<div>kplee-running</div>'
                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);
            //console.log('kplee-running init end');
        }
    };
    return kpleeRunningElement;
});