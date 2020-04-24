var app = angular.module('demoApp');
app.requires.push('angular-flexslider');
app.directive('kpleeSlideShow', function ($compile, $templateRequest) {
    var http = "https://d27btag9kamoke.cloudfront.net/";
    var path = "builder6.0/kpleeSlideShow/";
    var directiveName = "kpleeSlideShow";
    var kpleeSlideShow = {
        restrict: 'E',
        priority: 1000,
        
        scope: true,
        link: function (scope, element) {
            //console.log('kpleeSlideShow loading start');
            $templateRequest(http + path + "html/element.html?id=" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
            });
            //console.log('kpleeSlideShow loading end');
        },
        controller: function ($scope, $element, $attrs) {
            //console.log('kpleeSlideShow init start');
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);
            
            $scope.slideMenuOptions = [
                ["更換圖片", function ($itemScope) {
                	console.log($itemScope);
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'models/imagePopup/popup.html' + "?id=" + new Date().getTime(),
                        controller: 'userImagePopupController',
                        size: 'lg',
                        resolve: {
                            rootScope: function () {
                                return $scope
                            }
                        }
                    }).result.then(function (modelData) {
                    	$scope.atom[$scope.id]=angular.copy(modelData);
                    	$scope.model=angular.copy(modelData);
                        /*$scope.copyFile($scope.userBucket + '/' + encodeURI(image.key), $scope.exportBucket, image.key).then(function () {
                            $scope.$apply(function () {
                                $scope.model.list[2]['link'] = 'http://' + $scope.exportBucket + '/' + image.key;
                                
                            });
                        });*/
                        console.log("done");
                    });
                }]
            ];
            
            
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "type": "editor-kpleeSlideShow-element",
                    "list":[
                        {
                            "title":"圖片1",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        },
                        {
                            "title":"圖片2",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        },
                        {
                            "title":"圖片3",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        },
                        {
                            "title":"圖片4",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        }
                        
                    ]
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<div>kpleeSlideShow</div>'
                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);
            //console.log('kpleeSlideShow init end');

            $scope.updateHtml = function () {
                //call this function if your html compiled by data and template
                $templateRequest(http + path + "html/template.html?id=" + new Date().getTime()).then(function (html) {
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
            }
        }
    };
    return kpleeSlideShow;
});