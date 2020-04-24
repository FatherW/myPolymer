var app = angular.module('demoApp');
var name = 'dzUploadImagePopup';

app.directive(name, function ($compile, $templateRequest, $mdDialog, $dazzleUser,$dazzleS3,$dazzlePopup,
dzS3) {
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/dzUploadImagePopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http,$mdSidenav, $mdBottomSheet,$log) {

            $dazzleS3.saveMyImage = function (uid, file,subowner=0) {
                return new Promise(function (resolve, reject) {
                        
                     var s3 = new AWS.S3();
                    
                    var oldFilename = encodeURIComponent(file.name);
                    var fileExtansion = oldFilename.split('.').pop();
                    var newId = 'id' + new Date().getTime()
                    var newFilename =  newId + '.jpg';
                    var params = {
                        Bucket: "designerrrr",
                        Key: "images/" + uid + "/" + newFilename,
                        ContentType: file.type,
                        Body: file,
                        Metadata: {
                            "newVersion": "new",
                            "gid": newId,
                            "owner_id": uid,
                            "original_name": oldFilename,
                            "galleryType": "photo",
                            "subowner": subowner
                        }

                    };
                    console.log('Sub-owner',subowner);
                    // if (subowner !='')
                    //         params.Metadata['subowner'] = subowner;

                    s3.putObject(params, function (err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({
                                "oldFilename": oldFilename,
                                "newFilename": newFilename,
                                "fileExtansion": fileExtansion,
                                "fileType": file.type
                            });
                        }
                    });
                });
            }


                console.log('uploadImageController');
                var params = $dazzleUser.getDazzleInfo('params');
                $scope.uid = params.uid;
                // $scope.uid = "5metal.dazzle.website";
                $scope.owner = params.owner;
                console.log('Owner',$scope.owner);
                if (!$scope.owner)
                    $scope.owner = "No Sub-Owner";
                $scope.files = [];
                $scope.uploadedFiles = [];
                $scope.uploading = false;
                $scope.close = function () {
                    $mdDialog.cancel();
                }
                $scope.upload = function () {
                    $scope.uploading = true;
                    for (var i = 0; i < $scope.files.length; i++) {
                        $scope.uploadThis($scope.files[i]);
                    }
                }
                $scope.uploadThis = function (file) {
                    file.icon = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/images/loadingTo.gif";
                    dzS3.saveMyImage($scope.uid, file.lfFile,$scope.owner).then(function (uploadImage) {
                        $scope.$apply(function () {
                            file.icon = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/images/loadingToSuccess-once.gif";
                            $scope.uploadedFiles.push({
                                "bucket": "designerrrr",
                                "key": "images/" + $scope.uid + "/",
                                "filename": uploadImage.newFilename,
                                "path": "images/" + $scope.uid + "/" + uploadImage.newFilename,
                                "type": uploadImage.fileType
                            });
                        });
                        if ($scope.files.length == $scope.uploadedFiles.length) {
                            $mdDialog.hide($scope.uploadedFiles);
                        }
                    });
                }
        }
    };
    return link;
});
