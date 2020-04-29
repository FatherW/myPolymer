var app = angular.module('demoApp');
app.directive('ccpyportfolio', function ($compile, $templateRequest) {
    var path = "https://d27btag9kamoke.cloudfront.net/";
    var key = "builder6.0/ccpyportfolio/html/id-1490759764911.html";
    var ccpyportfolio = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            //console.log('ccpyportfolio loading start');
            $templateRequest(path + key + "?id" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
                //console.log('ccpyportfolio loading end');
            });
        },
        controller: function ($scope, $element, $attrs) {
            //console.log('ccpyportfolio init start');
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "type": "editor-ccpyportfolio-element"
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<div>ccpyportfolio</div>'
                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);
            //console.log('ccpyportfolio init end');

            $scope.dataUpdate = function () {
                $scope.updateHtml();
            }

            $scope.updateHtml = function () {
                $scope.getJson($scope.userBucket, $scope.websiteKey + 'content/portfolio-data.json').then(function (portfolio) {
                    console.log(portfolio);
                    $scope.initCategory();
                    $templateRequest("https://s3-ap-southeast-1.amazonaws.com/dazzle-template/builder6.0/ccpyportfolio/html/1490759774849.html" + "?id" + new Date().getTime()).then(function (html) {
                        var template = angular.element(html);
                        $compile(template)($scope);
                        setTimeout(function () {
                            $scope.model.html = template.html();
                        }, 500);
                    });
                })
            }

            $scope.initCategory = function (json) {
                
            }

            $scope.init = function () {
                $scope.updateHtml();
            }();
        }
    };
    return ccpyportfolio;
});