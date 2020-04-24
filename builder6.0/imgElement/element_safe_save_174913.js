var app = angular.module('demoApp');
app.directive('imgElement', function ($ocLazyLoad) {
    var path = "https://d27btag9kamoke.cloudfront.net/builder6.0/imgElement/";
    var imgElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: path + 'element.html' + '?id=' + new Date().getTime(),
        controller: function ($scope, $element, $attrs,$timeout,$uibModal) {
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
                    imageEditor('img' + '-' + $scope.model.id, $scope.model.src, function (newURL) {
                        $scope.$apply(function () {
                            $scope.model.src = newURL.replace('https://s3-ap-northeast-1.amazonaws.com/', 'http://');
                            //$scope.featherEditor.close();
                            //$scope.updateHtml();
                        });
                    });
                }],
            	["更換圖片", function () {
                	$scope.model.src = 'http://qnimate.com/wp-content/uploads/2014/03/images2.jpg';
                	console.log('更換圖片');
            	}],
            	['上傳／選擇圖片', function () {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: '//dazzle.website/builder/5.4/views/userGalleryPopup.html' + "?id=" + new Date().getTime(),
                        controller: 'userGalleryPopupController',
                        size: 'lg'
                    });
                    modalInstance.result.then(function (image) {
                        copyToExportBucket(image.key, $scope.model).then(function () {
                            $scope.updateHtml();
                        });
                    });
                }]
            ];
            $scope.updateHtml = function () {
                $timeout(function () {
                    //if ($scope.node.type == 'htmlelement') {
                    if (false) {
                        angular.element(document.getElementById('html' + '-' + $scope.node.id)).scope().updateHtml();
                    } else {
                        $scope.model.html = $('#' + $scope.node.id).html();
//                        console.log($scope.model.html)
                    }
                }, 500);
            };
            function imageEditor(id, src, callback) {
            	var website = store.get('website');
                $scope.featherEditor=new Aviary.Feather({
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
                        //aviary.close();
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

angular.module('demoApp').controller('userGalleryPopupController', function ($scope, $window, $uibModalInstance) {
    AWS.config.httpOptions.xhrAsync = true;
    var webBucket = new AWS.S3();
    $scope.userGallery = [];
    $scope.allList = [];
	var user=store.get('user');
    $scope.userGalleryAngularGridOptions = {
        gridWidth: 200,
        gutterSize: 5,
        refreshOnImgLoad: true,
        scrollContainer: '.modal'
    };
    $scope.listImageObject = function () {
        return new Promise(function (resolve, reject) {
            var params = {
                Bucket: bucket,
                Prefix: 'image/'
            };
            webBucket.listObjects(params, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.Contents);
                }
            });
        });
    }
    $scope.init = function () {
        $scope.listImageObject().then(function (data) {
            function insertionSort(files, attrToSortBy) {
                for (var k = 1; k < files.length; k++) {
                    for (var i = k; i > 0 && new Date(files[i][attrToSortBy]) <
                    new Date(files[i - 1][attrToSortBy]); i--) {
                        var tmpFile = files[i];
                        files[i] = files[i - 1];
                        files[i - 1] = tmpFile;

                    }
                }
            }

            insertionSort(data, "LastModified");

            angular.forEach(data.reverse(), function (value, key) {
                if (value.Key.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
                    fileName = value.Key.replace('image/', '');
                    fileName = fileName.replace('images%2F', '');
                    fileNameToJpg = fileName.substr(0, fileName.lastIndexOf(".")) + ".jpg";
                    $scope.allList.push({
                        key: value.Key,
                        filename: fileName,
                        url: 'https://designerrrr-output.s3-ap-northeast-1.amazonaws.com/images/medium/' + fileNameToJpg
                    });
                }
            });
            $scope.$apply(function () {
                $scope.userGallery = $scope.userGallery.concat($scope.allList.slice($scope.userGallery.length, $scope.userGallery.length + 100));
            });
        });
    }
    $scope.loadMore = function () {
        $scope.$apply(function () {
            $scope.userGallery = $scope.userGallery.concat($scope.allList.slice($scope.userGallery.length, $scope.userGallery.length + 20));
        });
    };
    $scope.choose = function (image) {
        $uibModalInstance.close(image);
    }
    $scope.goToGallery = function () {
        $window.open('http://dazzle.gallery/index.html' + '?uid=?' + user.uid + '&?AccessKeyId=?' + awsKey.AccessKeyId + '&?SecretAccessKey=?' + awsKey.SecretAccessKey + '&?SessionToken=?' + awsKey.SessionToken + '&?action=?index', '_blank');
        $uibModalInstance.dismiss('cancel');
    }
    $scope.uploadImage = function () {
        $window.open('http://dazzle.gallery/index.html' + '?uid=?' + user.uid + '&?AccessKeyId=?' + awsKey.AccessKeyId + '&?SecretAccessKey=?' + awsKey.SecretAccessKey + '&?SessionToken=?' + awsKey.SessionToken + '&?action=?callupload', '_blank');
        $uibModalInstance.dismiss('cancel');
    }
});