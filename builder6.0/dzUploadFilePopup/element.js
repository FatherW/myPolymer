var app = angular.module('demoApp');
var name = 'dzUploadFilePopup';
app.directive(name, function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleUser,dbFactory,userInfo) {
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/dzUploadFilePopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },
        controller: function ($scope, $element, $attrs,$dazzleS3, $http,$mdSidenav, $mdBottomSheet,$dazzleUser) {
            // New Code
             var params = $dazzleUser.getDazzleInfo('params');
                $scope.rootScope = $dazzleUser.getRootScope();
                $scope.bucket = params.bucket;
                $scope.key = params.key;
                $scope.uploading = false;
                $scope.uploadedFiles = [];
            
                $scope.upload = function () {
                    $scope.uploading = true;
                    $scope.uploaded = 0;
                    for (var i = 0; i < $scope.files.length; i++) {
                        $scope.uploadThis($scope.files[i]);
                    }
                }
                $scope.uploadAgain = function () {
                    $scope.uploading = false;
                    $scope.uploaded = 0;
                    $scope.files = [];
                }
                $scope.uploadThis = function (file) {
                    console.log('This file',file);
                    var s3 = new AWS.S3();
                    var params = {
                        Bucket: $scope.bucket,
                        Key: $scope.key + file.lfFileName,
                        ContentType: file.lfFileType,
                        Body: file.lfFile
                    };
                    file.upload = s3.upload(params);
            
                    file.upload.on('httpUploadProgress', function (evt) {
                        console.log('Event',evt);
                        file.uploadProgress = parseInt((evt.loaded * 100) / evt.total);
                    });
            
                    file.upload.send(function (err, data) {
                        $scope.uploadedFiles.push(file);
                        $scope.$apply(function () {
                            $scope.uploaded++;
                        });
                    });
            
                }
                $scope.remove = function (index) {
                    $scope.files[index].upload.abort();
                    $scope.files.splice(index, 1);
                    $scope.uploaded--;
                    if ($scope.files.length <= 0) {
                        $scope.uploading = false;
                        $scope.uploaded = 0;
                    }
                }
                $scope.close = function () {
                    var uploadedFiles = [];
                    for (var i = 0; i < $scope.uploadedFiles.length; i++) {
                        uploadedFiles.push({
                            "bucket": $scope.bucket,
                            "key": $scope.key,
                            "filename": $scope.uploadedFiles[i].lfFileName,
                            "path": $scope.key + $scope.uploadedFiles[i].lfFileName,
                            "type": $scope.uploadedFiles[i].lfFileType,
                        });
                        var json = {
                            "id":  userInfo.uid+'-'+$scope.uploadedFiles[i].lfFileName,
                            "key": $scope.key,
                            "fileName":$scope.uploadedFiles[i].lfFileName,
                            "bucket":$scope.bucket,
                            "meta": [$scope.uploadedFiles[i].lfFileType,userInfo.uid],
                            "updated":new Date().getTime(),
                            "isPublish":false,
                            "owner":userInfo.uid,
                            "fileType":$scope.uploadedFiles[i].lfFileType
                        };                    
                        
                        $scope.saveDataByID(json['id'],json);
                    }
                    $mdDialog.hide(uploadedFiles);
                }
                        
             $scope.saveDataByID = function(id,body) {

                return new Promise(function (resolve, reject) {
    
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "addData",
                            "index": "dazzle",
                            "type": "document",
                            "id": id,
                            "body":body
                        }
                    }).then(function (result) {
                        console.log('dz Data',result);
                        if (result.data.code < 0) {
                            resolve({});
                        } else {
                            console.log('Success',id);
                            resolve(result.data.resolve);
                        }
                    });
    
                });
    
            }
            
            
                //     $mdDialog.hide(uploadedFiles);
                // }


        }
    };
    return link;
});