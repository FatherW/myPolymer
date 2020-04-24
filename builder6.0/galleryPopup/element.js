var app = angular.module('demoApp');
app.directive('galleryPopup', function ($compile, $templateRequest, $mdDialog, $dazzlePopup) {
    var name = 'galleryPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "//d25k6mzsu7mq5l.cloudfront.net/builder6.0/galleryPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "galleryPopup";
            scope.type = "galleryPopup";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
                // console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');
                console.log('Params',params);
                if (!Array.isArray(params.images))
                    $scope.images = [];
                else
                    $scope.images = params.images || [];
//                $scope.images = JSON.parse(angular.toJson(images)) || [];

                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');

                $scope.upload = function () {
                    $mdBottomSheet.show({
                        templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/uploadFilePopup/popup.html' + '?id=' + new Date().getTime(),
                        controller: 'uploadFileController',
                        parent: $element,
                        clickOutsideToClose: false,
                        disableParentScroll: true,
                        locals: {
                            rootScope: $dazzleUser.getRootScope(),
                            bucket: $scope.exportBucket,
                            key: "image/"
                        }
                    }).then(function (files) {
                        $scope.images = $scope.images.concat(files);
                    });
                }
            
                $scope.addLink = function(index){
                    var params = {
                        element: $element,
                        oldLink: $scope.images[index]['link'] || '#',
                        directive:"<link-popup></link-popup>"
                    };
            
                    $dazzlePopup.callPopup(params).then(function(result) {
                        $scope.images[index]['link']=result.link;
                        console.log('Result',result);
                    });
                }
                $scope.remove = function (index) {
                    $scope.images.splice(index, 1);
                }
                $scope.save = function () {
                    $mdDialog.hide($scope.images);
                }
                $scope.cancel = function () {
                    $mdDialog.cancel();
                }
        }
    };
    return link;
});