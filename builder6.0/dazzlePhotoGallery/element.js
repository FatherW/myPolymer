var app = angular.module('demoApp');
app.directive('dazzlePhotoGallery', function ($compile, $templateRequest) {
    var path = "https://d25k6mzsu7mq5l.cloudfront.net/";
    var key = "builder6.0/dazzlePhotoGallery/html/id-1490834830850.html";
    var dazzlePhotoGallery = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            //console.log('dazzlePhotoGallery loading start');
            $templateRequest(path + key + "?id" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
                //console.log('dazzlePhotoGallery loading end');
            });
        },
        controller: function ($scope, $element, $attrs) {
            //console.log('dazzlePhotoGallery init start');
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "type": "editor-dazzlePhotoGallery-element"
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<div>dazzlePhotoGallery</div>'
                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);


            $scope.getRealHtml = function () {
                $templateRequest("https://s3-ap-southeast-1.amazonaws.com/dazzle-template/builder6.0/dazzlePhotoGallery/html/template.html" + "?id" + new Date().getTime()).then(function (html) {
                    var template = angular.element(html);
                    $compile(template)($scope);
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.model.html = template[0].outerHTML
                                .replace(/(ng-\w+-\w+="(.|\n)*?"|ng-\w+="(.|\n)*?"|ng-(\w+-\w+)|ng-(\w+))/g, "")
                                .replace(/<!--(.*?)-->/gm, "");
                        });
                    }, 500);
                });
            };

            $scope.init = function () {
                $scope.getRealHtml();
            }();
            
            //console.log('dazzlePhotoGallery init end');
        }
    };
    return dazzlePhotoGallery;
});