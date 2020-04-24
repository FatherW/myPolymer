var app = angular.module('demoApp');
app.directive('dzBlogPopup', function ($compile, $templateRequest, $mdDialog, $dazzlePopup,$dazzleFn,$dazzleInit,
    dzFn,dzS3,userInfo,pageInfo,dbFactory) {
    var name = 'dzBlogPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/dzBlogPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "//d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dzBlogPopup";
            scope.type = "dzBlogPopup";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
                // console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');
                
                $scope.blogTemplate = params.blogTemplate;
                console.log('dzGallery########Params',params);

                if (!Array.isArray(params.images))
                    $scope.images = [];
                else
                    $scope.images = params.images || [];
//                $scope.images = JSON.parse(angular.toJson(images)) || [];

                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');


                $scope.setTemplate = function(){
                    
                    var person = prompt("請輸入要設定的樣辦頁面名稱.注意：不用輸入\".html\" ", "");
                    
                    if (person != null) {

                          $scope.blogTemplate = person+".html";

                    }
                    console.log('Blog Template',$scope.blogTemplate);
                }
                
                function initBlog(src){
                    var json = {
                        'title': '沙拉的故事',
                        'src': src,
                        'date': new Date().getTime()
                    }
                    return json;
                }
                $scope.upload = function () {

                    
                    
                     var params = {
                            name: "dzImageGalleryPopup",
                            directive:"<dz-image-gallery-popup></dz-image-gallery-popup>"
                        };

                    $dazzlePopup.callPopup(params).then(function(output){
                         console.log('Output',output);
                            if (output.length >1){
                                angular.forEach(output,function(item,index){
        //                            console.log('Output',dzFn.getFileUrl('large-web',item.gid));
                                    $scope.images.push(initBlog(dzFn.getFileUrl('large-web',item.gid)));
                                });                            
                            } else {
                                    $scope.images.push(initBlog(dzFn.getFileUrl('large-web',output.gid)));                                
                            }
                    });
            
                }
                $scope.edit = function(index){
     
                    $scope.newPageName = $scope.images[index]['title'];
                    
                    dzS3.checkFile(userInfo.exportBucket,$scope.images[index]['title']+'.html').then(function(check){
                        if (!check)
                            if ($scope.blogTemplate)
                                   dzS3.copyFile(location.hostname+'/'+$scope.blogTemplate,userInfo.exportBucket,$scope.newPageName+'.html').then(function(){
                                        if (confirm('新頁已開，是否跳至新頁？'))
                                            location.href = $scope.newPageName+'.html';
                                   });
                            else {
                                alert('你還沒設定樣辦，請先設定後再來');
                            }
                        else 
                            if (confirm('此頁已開，是否跳至此頁？'))
                                location.href = $scope.newPageName+'.html';
                    });
                }
            
            
                $scope.addLink = function(index){

                    console.log('dzGallery######index', index);
                    console.log('dzGallery######oldLink', $scope.images[index]['link'] || '#');

                    var params = {
                        name: 'dzLinkPopup',
                        element: $element,
                        oldLink: $scope.images[index]['link'] || '#',
                        directive:"<dz-link-popup></dz-link-popup>"
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