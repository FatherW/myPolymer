var app = angular.module('demoApp');
var name = 'dzUploadImagePopup';

app.directive(name, function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleUser,$dazzleS3,$dazzlePopup,$dazzleFn) {
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/dzUploadImagePopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http,$mdSidenav, $mdBottomSheet,$log) {

                            
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
                    file.icon = "https://d27btag9kamoke.cloudfront.net/cdn6.0/images/loadingTo.gif";
                    $dazzleS3.saveMyImage($scope.uid, file.lfFile,$scope.owner).then(function (uploadImage) {
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
