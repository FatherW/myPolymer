var app = angular.module('demoApp');
app.directive('metalUploadImage', function ($compile, $templateRequest, $mdDialog, $dazzlePopup,$dazzleFn,$dazzleInit) {
    var name = 'metalUploadImage';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalUploadImage/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "metalUploadImage";
            scope.type = "metalUploadImage";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
        console.log('uploadImageController');
        
            var params = $dazzleUser.dazzleInfo['params'];
            $scope.uid = params.uid;
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
                file.icon = "https://d27btag9kamoke.cloudfront.net/cdn6.0/images/loadingTo.gif";
                $dazzleS3.saveImage($scope.uid, file.lfFile).then(function (uploadImage) {
                    $scope.$apply(function () {
                        file.icon = "https://d27btag9kamoke.cloudfront.net/cdn6.0/images/loadingToSuccess-once.gif";
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
