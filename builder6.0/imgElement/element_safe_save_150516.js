var app = angular.module('demoApp');
app.directive('imgElement', function ($ocLazyLoad) {
    var path = "https://d27btag9kamoke.cloudfront.net/builder6.0/imgElement/";
    var imgElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: path + 'element.html' + '?id=' + new Date().getTime(),
        controller: function ($scope, $element, $attrs) {
            //element init
            $ocLazyLoad.load('http://feather.aviary.com/imaging/v3/editor.js');
            $scope.id = $element[0].id || "ele" + new Date().getTime();
            $scope.src = $attrs.src || "http://dazzle.gallery/img/logo.svg";
            $element[0].id = $scope.id;
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "src": $scope.src
                };
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.imgMenuOptions = [
            	["編緝圖片2", function ($itemScope) {
            		console.log($scope.model);
                	console.log('編緝圖片');
            	}],
            	['編緝圖片', function () {
            		console.log($scope.model);
                    imageEditor($scope.model.id, $scope.model.src, function (newURL) {
                        $scope.$apply(function () {
                            $scope.model.src = newURL.replace('https://s3-ap-northeast-1.amazonaws.com/', 'http://');
                            $scope.updateHtml();
                        });
                    });
                }],
            	["更換圖片", function () {
                	$scope.model.src = 'http://qnimate.com/wp-content/uploads/2014/03/images2.jpg';
                	console.log('更換圖片');
            	}]
            ];
            
            function imageEditor(id, src, callback) {
            	console.log(id);
            	console.log(src);
                new Aviary.Feather({
                    apiKey: 'cdafe997-4562-44ad-a074-6a79cd643067',
                    theme: 'light',
                    tools: 'all',
                    language: "zh_HANT",
                    appendTo: '',
                    onSave: function (imageID, newURL) {
                        $.ajax({
                            url: 'https://122nqw3zfj.execute-api.ap-northeast-1.amazonaws.com/prod',
                            type: 'post',
                            data: JSON.stringify({
                                "photoUrl": newURL,
                                "bucket": website.bucket
                            }),
                            dataType: 'json',
                            success: function (data) {
                                var Jdata = JSON.parse(data);
                                if (Jdata.code > 0) {
                                    callback(Jdata.text);
                                }
                            }
                        });
                        aviary.close();
                    },
                    onError: function (errorObj) {
                        alert(errorObj.message);
                    }
                }).launch({
                    image: id,
                    url: src
                });
                return false;
            }
            
            //element init
        }
    }
    return imgElement;
});