var app = angular.module('demoApp');
var name = 'uploadFilePopup';
app.directive(name, function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleUser,userInfo) {
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/uploadFilePopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },
        controller: function ($scope, $element, $attrs,$dazzleS3, $http,$mdSidenav, $mdBottomSheet,$dazzleUser) {
            
            // Old Code
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');

                $scope.rootScope = $dazzleUser.getRootScope();
                $scope.bucket = userInfo.exportBucket;
                console.log($scope.bucket);
                $scope.key = params['key'];
                $scope.uploading = false;
                $scope.uploadedFiles = [];
                $scope.owner = params.owner || '';
                console.log('Upload Owner',$scope.owner);
            
                $scope.upload = function () {
                    $scope.uploading = true;
                    $scope.uploaded = 0;
                    for (var i = 0; i < $scope.files.length; i++) {
                        console.log('File',$scope.files[i]);
                        $scope.uploadThis($scope.files[i]);
                    }
                }
                $scope.uploadAgain = function () {
                    $scope.uploading = false;
                    $scope.uploaded = 0;
                    $scope.files = [];
                }
                $scope.uploadThis = function (file) {
                    var s3 = new AWS.S3();
                    var params = {
                        Bucket: $scope.bucket,
                        Key: $scope.key + file.lfFileName,
                        ContentType: file.lfFileType,
                        Body: file.lfFile,
                        Metadata: $scope.owner
                    };
                    
                    console.log('FIle Params',params);
                    file.upload = s3.upload(params);
            
                    file.upload.on('httpUploadProgress', function (evt) {
                        file.uploadProgress = parseInt((evt.loaded * 100) / evt.total);
                    });
            
                    file.upload.send(function (err, data) {
                        $scope.uploadedFiles.push(file);
                            $scope.uploaded++;
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
                        })
                    }
                    $mdDialog.hide(uploadedFiles);
                }


        }
    };
    return link;
});