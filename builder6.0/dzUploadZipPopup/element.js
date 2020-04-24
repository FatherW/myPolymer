var app = angular.module('demoApp');
var name = 'dzUploadZipPopup';
app.directive(name, function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleUser) {
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
                    if ($scope.uploaded >=1){
                        alert('只能上載一個檔案');
                        return;
                    }
                        
                    console.log('This file',file);
                    var s3 = new AWS.S3();
                    var params = {
                        Bucket: $scope.bucket,
                        Key:  $scope.key +'template.zip',
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
                            "key": $scope.key+'template.zip',
                            "filename": $scope.uploadedFiles[i].lfFileName,
                            "path": $scope.key + $scope.uploadedFiles[i].lfFileName,
                            "type": $scope.uploadedFiles[i].lfFileType,
                        })
                    }
                    $mdDialog.hide(uploadedFiles);
                }
                        
            
            
            
                //     $mdDialog.hide(uploadedFiles);
                // }


        }
    };
    return link;
});