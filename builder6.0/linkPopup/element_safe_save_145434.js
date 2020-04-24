var app = angular.module('demoApp');
app.directive('linkPopup', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var name = 'linkPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "http://d27btag9kamoke.cloudfront.net/builder6.0/linkPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "linkPopup";
            scope.type = "linkPopup";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');

                var element = params.element;
                var oldLink = params.oldLink;
                
                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');

                if (element) {
                    $scope.element = element;
                }
            
                if (oldLink && oldLink !== '#' && !oldLink.startsWith('#')) {
                    $scope.setLink = oldLink.replace(/^.*[\\\/]/, '') || '';
                    console.log('Set Link',$scope.setLink);
                }
        
                $scope.cancelLink = function () {
                    $scope.setLink = "#";
                    var output = {
                        setLink: $scope.setLink
                    };
                    $dazzleUser.setDazzleInfo('output',output);                    
                    $mdDialog.hide({
                        type: 'saveLink',
                        link: "#"
                    });
                };
            
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
            
                $scope.save = function () {
                    if (!angular.isUndefined($scope.needAddHttp) && $scope.needAddHttp) {
                        $scope.setLink = "http://" + $scope.setLink
                    }
                    
                    var output = {
                        setLink: $scope.setLink
                    };
                    $dazzleUser.setDazzleInfo('output',output);                    

                    $mdDialog.hide({
                        type: 'setLink',
                        link: $scope.setLink
                    });
                };
            
                $scope.saveAnchor = function (anchorName) {
                    var output = {
                        setLink: anchorName
                    };
                    $dazzleUser.setDazzleInfo('output',output);                    

                    $mdDialog.hide({
                        type: 'saveLink',
                        link: anchorName
                    });
                }
            
                $scope.openRight = function () {
                    $mdSidenav("rightAddAnchor").toggle();
                };
            
                $scope.openUploadFileBottom = function () {
                    $mdBottomSheet.show({
                        templateUrl: 'https://d27btag9kamoke.cloudfront.net/cdn6.0/models/uploadFilePopup/popup.html' + '?id=' + new Date().getTime(),
                        controller: 'uploadFileController',
                        parent: $element.find('md-dialog'),
                        clickOutsideToClose: false,
                        disableParentScroll: true,
                        locals: {
                            rootScope: $scope.rootScope,
                            bucket: $scope.userBucket,
                            key: "files/"
                        }
                    }).then(function () {
                        $scope.initFiles();
                    })
                };
            
                $scope.initFiles = function () {
                    $scope.showUploadFileBottom = true;
                    $dazzleS3.listObject($scope.userBucket, 'files/').then(function (files) {
                        $scope.$apply(function () {
                            $scope.filesCollection = files
                        });
                    });
                }
            
                $scope.downloadFile = function (fileNameKey) {
                    var params = {
                        Bucket: $scope.userBucket,
                        Key: fileNameKey,
                        Expires: 60
                    };
                    var url = new AWS.S3().getSignedUrl('getObject', params);
                    var a = document.createElement('a');
                    a.href = url;
                    a.download = fileNameKey.replace("files/", "");
                    a.click();
                    window.URL.revokeObjectURL(url);
                }
            
                $scope.chooseFile = function (fileNameKey) {
                    $dazzleS3.copyFile($scope.userBucket + "/" + fileNameKey, $scope.exportBucket, fileNameKey).then(function () {
                    
                        var output = {
                            setLink: "http://" + $scope.exportBucket + "/" + fileNameKey
                        };
                        $dazzleUser.setDazzleInfo('output',output);                    

                        $mdDialog.hide({
                            type: 'setLink',
                            link: "http://" + $scope.exportBucket + "/" + fileNameKey
                        });
                    });
                }
            
                $scope.initLinkSearch = function () {
                    $element.find('#linkSelectSearchPage').on('keydown', function (ev) {
                        ev.stopPropagation();
                    });
                }
            
                $scope.add = function(){
            
                }
                $scope.edit = function(page) {
                    location.href = page;
                    
                }
                $scope.del = function(page){
                    
                }
        }
    };
    return link;
});