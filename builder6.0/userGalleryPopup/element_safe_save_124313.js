var app = angular.module('demoApp');
var name = 'userGalleryPopup';
app.directive(name, function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleUser,$dazzleS3,$dazzlePopup) {
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/userGalleryPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http,$mdSidenav, $mdBottomSheet,$dazzleUser) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');
                var userBucket = $dazzleUser.getDazzleInfo('userBucket');
                
                //$scope.rootScope = params['rootScope'];
                $scope.inited = false;
                $scope.userGallery = [];
                $scope.allList = [];
                $scope.tags =[];
                $scope.userGalleryAngularGridOptions = {
                    gridWidth: 100,
                    gutterSize: 10,
                    infiniteScrollDelay: 1000,
                    infiniteScrollDistance: 95,
                    scrollContainer: '#dialogContent_gallery'
                };

                $scope.getImages = function() {
                    
                }

                $scope.newInit = function() {

                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzleEditorMiscFunction",
                        "data": {

                            "action": "listMyGalleryByTags",
                            "uid": "taipo520.dazzle.website",
                            "tags": []

                        }
                    }).then(function (result) {
                        console.log(result);
                    });

                }
                $scope.init = function () {

                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzleEditorMiscFunction",
                        "data": {

                            "action": "listMyGalleryByTags",
                            "uid": "taipo520.dazzle.website",
                            "tags": []

                        }
                    }).then(function (result) {
                        if (result.data.code > 0) {
                            $scope.allList = result.data.resolve;
                            $scope.$apply(function () {
                                $scope.userGallery = $scope.userGallery.concat($scope.allList.slice($scope.userGallery.length, $scope.userGallery.length + 50));
                                $scope.inited = true;
                            });
                        }

                        // http://designerrrr-output.s3.amazonaws.com/images/taipo520.dazzle.website/thumbnail-web/id1510718102945.jpg
                        console.log(result);
                    });

                    $dazzleS3.listObject(userBucket, 'image/').then(function (data) {
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
                                    filename: fileName
                                });
                            }
                        });
                        $scope.$apply(function () {
                            $scope.userGallery = $scope.userGallery.concat($scope.allList.slice($scope.userGallery.length, $scope.userGallery.length + 50));
                            $scope.inited = true;
                        });
                    });
                }

                $scope.getFileUrl = function (size, id) {

                    return "//designerrrr-output.s3.amazonaws.com/images/"+$dazzleUser.getUser().uid+"/"+size+"/"+id+".jpg";
                }
                $scope.getSrc = function (image) {
                    $dazzleS3.getFileUrl(userBucket, image.key).then(function (url) {
                        image.url = url;
                    });
                }

                $scope.loadMore = function () {
                    $scope.$apply(function () {
                        $scope.userGallery = $scope.userGallery.concat($scope.allList.slice($scope.userGallery.length, $scope.userGallery.length + 20));
                    });
                };
                $scope.choose = function (gid) {

                    image = $scope.getFileUrl()

                    var output = {
                        'image':image
                    };
                    $dazzleUser.setDazzleInfo('output',output);
                    $mdDialog.hide(image);
                }


                $scope.newUpload = function() {
                    $dazzlePopup.uploadImage($scope.user.uid).then(function (images) {
                        console.log(images);
                        $scope.$apply(function () {
                            if ($scope.images.length)
                                $scope.images = $scope.images.concat(images);
                            else
                                $scope.images = images;
                        });




                    });
                }

                $scope.upload = function () {
                    var params = {
                        'name':'uploadFilePopup',
                        'rootScope':$scope,
                        'bucket': userBucket,
                        'key': 'image/',
                        'directive':'<upload-file-popup></upload-file-popup>'
                    }
                    $dazzlePopup.callPopup(params).then(function(){
                      $scope.inited= false;
                      $scope.userGallery = [];
                        $scope.allList = [];
                        setTimeout(function () {
                            $scope.init();
                        }, 1000);
                    });

//                     $mdBottomSheet.show({
//                         templateUrl: 'https://d27btag9kamoke.cloudfront.net/cdn6.0/models/uploadFilePopup/popup.html' + '?id=' + new Date().getTime(),
//                         controller: 'uploadFileController',
//                         parent: $element.find('md-dialog-content'),
//                         clickOutsideToClose: false,
//                         disableParentScroll: true,
//                         locals: {
//                             rootScope: $scope,
// //                            bucket: userBucket,
//                             bucket: $dazzleUser.getDazzleInfo('exportBucket'),
//                             key: "image/"
//                         }
//                     }).then(function () {
//                         $scope.inited = false;
//                         $scope.userGallery = [];
//                         $scope.allList = [];
//                         setTimeout(function () {
//                             $scope.init();
//                         }, 1000);
//                     });
                };
                $scope.closePopup = function () {
                    $mdDialog.cancel();
                }
        }
    };
    return link;
});