var app = angular.module('demoApp');

app.filter('to_FileName', ['$sce', function ($sce) {
    return function (text) {
        return text.replace("files/", "");
    };
}]);
app.filter('to_fileSize', ['$sce', function ($sce) {
    return function (text) {
        var sizeStr = "";
        var size = parseInt(text);
        var sizeKB = size / 1024;
        if (parseInt(sizeKB) > 1024) {
            var sizeMB = sizeKB / 1024;
            sizeStr = sizeMB.toFixed(2) + " MB";
        } else {
            sizeStr = sizeKB.toFixed(2) + " KB";
        }
        return sizeStr;
    };
}]);

app.directive('dzLinkPopup', function ($compile, $templateRequest, $mdDialog, $uibModal,userInfo) {
    var name = 'dzLinkPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/"+name+"/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dzLinkPopup";
            scope.type = "dzLinkPopup";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser,$dazzlePopup,$dazzleData,$dazzleInit) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');

                var element = params.element;
                var oldLink = params.oldLink;
                
//                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                $scope.pageJson = [];
                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                // $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=userInfo.exportBucket;
                console.log($dazzleUser.dazzleInfo);

                $scope.changeLink = function(page){
                    console.log(page);
                    $scope.setLink = page+'.html';                        

                }
                $scope.init = function() {
                    return new Promise(function (resolve, reject) {
                        if (element) {
                            $scope.element = element;
                        }
                    
                        if (oldLink && oldLink !== '#' && !oldLink.startsWith('#')) {
                            $scope.setLink = oldLink.replace(/^.*[\\\/]/, '') || '';
                            console.log('Set Link',$scope.setLink);
                        }
                    
                        $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                            "data": {
                                "action": "searchData",
                                "index": "dazzle",
                                "type": "webpage",
                                "body":{
                                    "query": {
                                        "match":{
                                            "bucket":location.hostname                                            
                                        }

                                    }
                                }
                            }
                        }).then(function (result) {
                            if (result.data.code < 0) {
                                $scope.pageJson = [];    
                            } else {
                                console.log('Page Path',result.data.resolve);
                                $scope.pageJson = result.data.resolve;

                            }
                            resolve();    
                        });
                       
                
                    });
                    
                }

                // $dazzleInit.loadPageJson().then(function(json){
                //     console.log('Page JSOn',json);
                //   $scope.pageJson = json; 
                // });
                


        
                $scope.cancelLink = function () {
                    $scope.setLink = "#";
                    var output = {
                        setLink: $scope.setLink
                    };
                    $dazzleUser.setDazzleInfo('output',output);                    
                    $mdDialog.hide({
                        type: 'cancelLink',
                        link: "#"
                    });
                };
            
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                 $scope.addPage = function() {
                    var params = {
                        name: 'dzAddPagePopup',
                        directive: '<dz-add-page-popup></dz-add-page-popup>',
                        link: $scope.setLink
                    }
    
                    $dazzlePopup.callPopup(params).then(function(result){
                        
                    });                
                }
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
                    
                    var params = {
                        "name": "dzUploadFilePopup",
                        "directive":"<dz-upload-file-popup></dz-upload-file-popup>",
                        "key":"files/",
                        "bucket":$scope.exportBucket
                    };
                    
                    $dazzlePopup.callPopup(params).then(function(files){
                        $scope.initFiles();
                    });
                    
                    // $mdBottomSheet.show({
                    //     templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/uploadFilePopup/popup.html' + '?id=' + new Date().getTime(),
                    //     controller: 'uploadFileController',
                    //     parent: $element,
                    //     clickOutsideToClose: false,
                    //     disableParentScroll: true,
                    //     locals: {
                    //         rootScope: $scope,
                    //         bucket: $scope.userBucket,
                    //         key: "files/"
                    //     }
                    // }).then(function () {
                    //     $scope.initFiles();
                    // })
                };
            
                $scope.initFiles = function () {
                    $scope.showUploadFileBottom = true;
                    $dazzleS3.listObject(userInfo.exportBucket, 'files/').then(function (files) {
                        $scope.$apply(function () {
                            $scope.filesCollection = files
                        });
                    });
                }
            
                $scope.downloadFile = function (fileNameKey) {
                    var params = {
                        Bucket: location.hostname,
                        Key: fileNameKey,
                        Expires: 60
                    };
//                    var url = new AWS.S3().getSignedUrl('getObject', params);
                    var url = "//"+location.hostname+"/"+fileNameKey;
                    var a = document.createElement('a');
                    a.href = url;
                    a.download = fileNameKey.replace("files/", "");
                    a.click();
                    window.URL.revokeObjectURL(url);
                }
            
                $scope.chooseFile = function (fileNameKey) {
                    
                    
                   // $dazzleS3.copyFile($scope.exportBucket + "/" + fileNameKey,location.hostname, fileNameKey).then(function () {
                    
                        var output = {
                            setLink: "//" + $scope.exportBucket + "/" + fileNameKey
                        };
                        $dazzleUser.setDazzleInfo('output',output);                    

                        $mdDialog.hide({
                            type: 'setLink',
                            link: "http://" + $scope.exportBucket + "/" + fileNameKey
                        });
                   // });
                }
            
                $scope.initLinkSearch = function () {
                    $element.find('#linkSelectSearchPage').on('keydown', function (ev) {
                        ev.stopPropagation();
                    });
                }
            
                $scope.add = function() {
                    var params = {
                        name: 'dzAddPagePopup',
                        directive: '<dz-add-page-popup></dz-add-page-popup>'
                    }
    
                    $dazzlePopup.callPopup(params).then(function(result){
                        
                    });                
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
app.controller('rightAddAnchorController', function ($scope, $mdSidenav, $mdToast) {
    $scope.add = function () {
        $mdSidenav('rightAddAnchor').close().then(function () {
            $scope.saveAnchor($scope.name);
        });
    };
});

app.controller('uploadFileController', function ($scope, $element, $mdBottomSheet, rootScope, bucket, key) {
    $scope.rootScope = rootScope;
    $scope.bucket = bucket;
    console.log(bucket);
    $scope.key = key;
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
        var s3 = new AWS.S3();
        var params = {
            Bucket: $scope.bucket,
            Key: $scope.key + file.lfFileName,
            ContentType: file.lfFileType,
            Body: file.lfFile
        };
        file.upload = s3.upload(params);

        file.upload.on('httpUploadProgress', function (evt) {
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
            })
        }
        $mdBottomSheet.hide(uploadedFiles);
    }
});