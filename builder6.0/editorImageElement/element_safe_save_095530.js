var app = angular.module('demoApp');
app.directive('editorImageElement', function ($compile, $uibModal, $templateRequest) {
    var path = "https://d27btag9kamoke.cloudfront.net/builder6.0/editorImageElement/";
    var editorImageElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        /*compile: function (element, attributes) {
         //add menu to directive
         var compile = false;
         if (!element.attr('context-menu')) {
         element.attr('context-menu', "menuOptions");
         compile = true;
         }
         return {
         post: function postLink(scope, iElement, iAttrs, controller) {
         if (compile) {
         $compile(iElement)(scope);
         }
         }
         };
         },*/
        link: function (scope, element) {
            $templateRequest(path + "element.html" + "?id" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $element, $attrs, $http) {
            var featherEditor = new Aviary.Feather({
                apiKey: 'cdafe997-4562-44ad-a074-6a79cd643067',
                theme: 'light',
                tools: 'all',
                language: "zh_HANT",
                appendTo: '',
                apiVersion: 3,
                onSave: function (imageID, newURL) {
                    $http({
                        "method": "post",
                        "url": "https://122nqw3zfj.execute-api.ap-northeast-1.amazonaws.com/prod",
                        "data": {
                            "photoUrl": newURL,
                            "bucket": $scope.exportBucket
                        }
                    }).then(function (result) {
                        var jdate = JSON.parse(result.data);
                        if (jdate.code > 0) {
                            $scope.$apply(function () {
                                $scope.model.src = jdate.text;
                            });
                        }
                        featherEditor.close();
                    });
                }
            });

            function copyToExportBucket(key) {
                AWS.config.httpOptions.xhrAsync = true;
                var s3 = new AWS.S3();
                var params = {
                    Bucket: $scope.exportBucket,
                    Key: key,
                    CopySource: $scope.userBucket + '/' + encodeURI(key)
                };
                s3.copyObject(params, function (err, data) {
                    $scope.$apply(function () {
                        $scope.model.src = 'http://' + $scope.exportBucket + '/' + key;
                    });
                });
            }

            //element init
            $scope.id = $element[0].id || "ele" + new Date().getTime();
            $scope.src = "http://dazzle.gallery/img/logo.svg";
            $element[0].id = $scope.id;
            console.log($element.html());
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "src": $scope.src,
                    "html": '<img id="img-{{model.id}}" class="img-responsive" ng-src="{{model.src}}"/>',
                    "type": "editor-image-element"
                };
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.menuOptions = [
                ["編緝圖片", function ($itemScope) {
                    featherEditor.launch({
                        image: 'img' + '-' + $scope.model.id,
                        url: $scope.model.src
                    });
                }],
                ["更換圖片", function () {
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'models/galleryPopup/popup.html' + "?id=" + new Date().getTime(),
                        controller: 'userGalleryPopupController',
                        size: 'lg',
                        resolve: {
                            rootScope: function () {
                                return $scope
                            }
                        }
                    }).result.then(function (image) {
                        copyToExportBucket(image.key);
                    });
                }]
            ];
            //element init
        }
    }
    return editorImageElement;
});