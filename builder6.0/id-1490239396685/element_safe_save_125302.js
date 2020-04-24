var app = angular.module('demoApp');
app.requires.push('angular-marquee');
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
        controller: function ($scope, $element, $attrs,$uibModal) {
            //console.log('kplee-running init start');
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);
            
            /*$scope.marqueeMenuOptions = [
                ['編輯圖片', function($itemScope) {
                	console.log($itemScope);
                    
                }]
            ];*/
            $scope.marqueeMenuOptions = [
                ["編緝圖片", function ($itemScope) {
                    featherEditor.launch({
                        image: 'img' + '-' + $scope.model.id,
                        url: $scope.model.src
                    });
                }],
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
                    	console.log(modelData);
                    	$scope.model=modelData;
                    	console.log($scope.atom[$scope.id]);
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
                        },
                        {
                            "title":"圖片4",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        },
                        {
                            "title":"圖片5",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        },
                        {
                            "title":"圖片6",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        },
                        {
                            "title":"圖片7",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        },
                        {
                            "title":"圖片8",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        },
                        {
                            "title":"圖片9",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        },
                        {
                            "title":"圖片10",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        },
                        {
                            "title":"圖片11",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        },
                        {
                            "title":"圖片12",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        },
                        {
                            "title":"圖片13",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        },
                        {
                            "title":"圖片14",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        },
                        {
                            "title":"圖片15",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        },
                        {
                            "title":"圖片16",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        },
                        {
                            "title":"圖片17",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        }
                        
                    ]
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<img src="'+$scope.atom[$scope.id].list[0]['link']+'">';
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