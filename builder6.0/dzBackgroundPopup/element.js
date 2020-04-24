var app = angular.module('demoApp');
app.directive('dzBackgroundPopup', function ($compile, $templateRequest, $mdDialog, $dazzlePopup,$dazzleFn,$dazzleInit) {
    var name = 'dzBackgroundPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/dzBackgroundPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dzBackgroundPopup";
            scope.type = "dzBackgroundPopup";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser,dzFn) {
                // console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');
                //$scope.items = params.items;
                $scope.images =[];
//                $scope.images = JSON.parse(angular.toJson(images)) || [];

                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');

                $scope.userGalleryAngularGridOptions = {
                    gridWidth: 100,
                    gutterSize: 10,
                    infiniteScrollDelay: 1000,
                    infiniteScrollDistance: 95,
                    scrollContainer: '#dialogContent_gallery'
                };
                $scope.getFileUrl = function(size,id) {
                   if (!id) {
                        return null;
                    }


                    if (id.indexOf(".jpg")>=0) {
                        id=id.replace(".jpg","");
                    }

                    return "//d1xlk80q2h0qiy.cloudfront.net/images/"+$dazzleUser.getUser().uid+"/"+size+"/"+id+".jpg";
                }

                $scope.findBg = function(item){
                    //return item.css('background-image');
                    return item['bg'];
                    
                }
                $scope.uploadBg = function(item){
                        var params = {
                            name: "dzImageGalleryPopup",
                            directive:"<dz-image-gallery-popup></dz-image-gallery-popup>"
                        };

                    $dazzlePopup.callPopup(params).then(function(output){
//                        console.log($dazzleFn.getFileUrl('large-web',output.gid));
                        var url = "url('"+$scope.getFileUrl('large-web',output.gid)+"')";
                        console.log('URL',url);
                        //var id = item.attr('id');
                        var id=item['id'];
                        console.log('ID',id);
                        //item.css('background-image',url); 
                        $scope.$apply(function () {
                            item['bg'] = url;
                        });
                        console.log(item);
    //                    	document.getElementById(id).style.backgroundImage=url;
                        $('#'+id).css('background-image',url);
                        $('#'+id).attr('style','background-image:'+url);

                        
                    });                   
                    
                }
                
                $scope.uploadImg = function(item){
                        var params = {
                            name: "dzImageGalleryPopup",
                            directive:"<dz-image-gallery-popup></dz-image-gallery-popup>"
                        };

                    $dazzlePopup.callPopup(params).then(function(output){
                        var url = $scope.getFileUrl('large-web',output.gid);
                        var id=item['id'];
                        console.log('ID',id);
                        $scope.$apply(function () {
                            item['bg'] = url;
                        });
                        console.log('URL',id,url);
                        $('#'+id).attr('src',url);

                        
                    });                   
                    
                }
                $scope.bg2Img = function(bg){
                    bg = bg.replace('url(','').replace(')','').replace(/\"/gi, "");
                    bg = bg.replace(/\'/g,"");
                    return bg;
                }
                $scope.init = function(){
                    
                    $scope.items =[];
                    // console.log('Items',params.items);
                    angular.forEach(params.items,function(item,index){
                        var bg = item.css('background-image');
                        var id = item.attr('id') || 'bg-'+new Date().getTime();
                        var backgroundPos = item.css('backgroundPosition').split(" ");
                        //now contains an array like ["0%", "50px"]
                        
                        var xPos = backgroundPos[0],
                            yPos = backgroundPos[1];
                        
                        console.log('BG',bg);
                        $scope.items.push({
                            'bg':bg,
                            'id':id,
                            'xPos':xPos,
                            'yPos':yPos
                        });
                    });
                    $scope.image_items =[];
                    // console.log('Items',params.items);
                    angular.forEach(params.image_items,function(item,index){
                        var bg = item.attr('src');
                        var id = item.attr('id') || 'bg-'+new Date().getTime();
                        console.log('BG',bg);
                        $scope.image_items.push({
                            'bg':bg,
                            'id':id
                        });
                    });
                }
                $scope.upload = function () {

                     var params = {
                            name: "userGalleryPopup",
                            directive:"<user-gallery-popup></user-gallery-popup>"
                        };

                    $dazzlePopup.callPopup(params).then(function(output){
                        //var image = output['image'];
    //                    var image = output;
//                                $scope.model.data = $dazzleFn.getFileUrl('large-web',output.gid);
                        console.log($dazzleFn.getFileUrl('large-web',output.gid));
                        var json = {
                            bucket: 'designerrrr-output',
                            key: 'images/'+$dazzleUser.getUser().uid+"/large-web/",
                            filename: output.gid+".jpg",
                            path: 'images/'+$dazzleUser.getUser().uid+"/large-web/"+output.gid+".jpg",
                            type: 'image/jpeg'
                        };
                        console.log('Galllery JSON',json);
                   //     console.log(images);
                                
                                console.log($scope.images);
                                 $scope.$apply(function () {
                                    $scope.images = $scope.images.concat(json);
                                });
    
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
                    $mdDialog.hide($scope.items);
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