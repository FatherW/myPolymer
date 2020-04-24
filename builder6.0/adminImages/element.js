var app = angular.module('demoApp');



app.directive('adminImages', function ($compile, $templateRequest, $mdDialog, $dazzleUser,$dazzleS3,$dazzlePopup,userInfo,dzS3) {
    var name = 'adminImages';

    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/"+name+"/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http,$mdSidenav, $mdBottomSheet,$log) {
                  console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');
                var userBucket = $dazzleUser.getDazzleInfo('userBucket');
                var uid =  location.hostname;
                //$scope.rootScope = params['rootScope'];
                
                
                $scope.myTags = [];
                $scope.owner = userInfo.uid || '';
                
                $scope.mySize = 'medium';
                
                $scope.toggleRight = buildToggler('right');

                $scope.isOpenRight = function(){
                  return $mdSidenav('right').isOpen();
                };
            

                $scope.inited = false;
                $scope.userGallery = [];
                $scope.allList = [];
                $scope.tags = [];
                $scope.multiple = false;
                $scope.myElements =[]; 
//                $scope.tags = $scope.tags.push($scope.owner);
                
                $scope.userGalleryAngularGridOptions = {
                    gridWidth: 100,
                    gutterSize: 10,
                    infiniteScrollDelay: 1000,
                    infiniteScrollDistance: 95,
                    scrollContainer: '#dialogContent_gallery'
                };

                $scope.getImages = function() {
                    
                }


                $scope.init = function () {
                    $scope.inited = false;
                    
                    var params = {};



                    params = {
                        "action": "listMyGalleryByTags",
                        "uid": uid,
                        "tags": $scope.tags
                    };    
                
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzleEditorMiscFunction",
                        "data": params
                    }).then(function (result) {
                        if (result.data.code > 0) {
                            $scope.allList = result.data.resolve;
                            console.log('User Gallery****************************',$scope.allList);

                            $scope.userGallery = result.data.resolve;
                            $scope.inited = true;
                        }
                        console.log(result);
                    });
                    
                    



                }

                $scope.buildTags=function(tags){
                    // console.log(tags);
                    if (!angular.isUndefined(tags))
                        return tags.join();
                    else
                        return '';
                }
                $scope.getFileUrl = function (size, id) {
                    // return '';
                    //   return $dazzleFn.getFileUrl(size,id);
                    if (!id) {
                        return null;
                    }


                    if (id.indexOf(".jpg")>=0) {
                        id=id.replace(".jpg","");
                    }

                    return "//designerrrr-output.s3.amazonaws.com/images/"+uid+"/"+size+"/"+id+".jpg";
                   
                   
                }
                $scope.getSrc = function (image) {
                    $dazzleS3.getFileUrl(userBucket, image.key).then(function (url) {
                        image.url = url;
                    });
                }

                $scope.loadMore = function () {
                    $scope.$apply(function () {
                        $scope.userGallery = $scope.userGallery.concat($scope.allList.slice($scope.userGallery.length, $scope.userGallery.length + 20));
                    });
                };
                $scope.choose = function (element) {
                    // image = $scope.getFileUrl('large-web',element.gid);
                    // var output = {
                    //     'image':image
                    // };
                    // $dazzleUser.setDazzleInfo('output',output);
                    // $mdDialog.hide(image);
                    var index;
                    if (!$scope.multiple) {
                        console.log('My Element',element);
                        $scope.myElement = element;
                        $scope.myGid = element.gid;
                        $scope.myTags = element.tags;
                        $scope.mySize = "medium-web";
                        $scope.toggleRight();
                    }  else {
                        
                        if (angular.isUndefined(element.selected) || !element.selected){
                            element.selected = true;
//                            $scope.myElements.push(element);                            
                        }

                        else {
                            element.selected = false;                            
                            // $scope.myElements.indexOf(element);
                            // if (index > -1) {
                            //   $scope.myElements.splice(index, 1);
                            // }
                        }

                        


                    }
                    
//                    $mdDialog.hide(element);
                }
                $scope.cancel = function() {
                   $scope.toggleRight(); 
                }

                $scope.multiAddTags = function() {
                    // $dazzleUser.dazzleInfo['imageSize'] = $scope.mySize;
                    // if (!$scope.multiple)
                    //     $mdDialog.hide($scope.myElement);
                    // else 
                    //     $mdDialog.hide($scope.myElements);
                    $scope.toggleRight();

                    
                }

                $scope.unSelected = function(image){
                    image.selected = false;
                }
                $scope.deleteChoice = function() {
                    angular.forEach($scope.userGallery,function(item,index){
                       if (item.selected) {
                           console.log('Delete Item',item);
                           $scope.delete(item,index);                           
                       }

                    });
                    
                }
                
                
                $scope.delete = function(element,index){                    
                    $scope.userGallery.splice(index,1);

                     $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzleEditorMiscFunction",
                            "data": {

                                "action": "deleteByGid",
                                "gid": element.gid

                            }
                        }).then(function (result) {
                            if (result.data.code > 0) {

                            }
                            console.log('Delete',result);
                        });
                }

                $scope.newUpload = function() {

                    // $dazzlePopup.uploadImage(uid).then(function (images) {

                    //     console.log(images);
                    //     setTimeout(function(){
                    //         $scope.init();
                    //     },2000);
                    // });
                    

                    var params = {
                        'name': 'dzUploadImagePopup',
                        'directive':'<dz-upload-image-popup></dz-upload-image-popup>',
                        'uid':uid,
                        'owner':$scope.owner
                    }
                    $dazzlePopup.callPopup(params).then(function(images){
                        console.log(images);
                        setTimeout(function(){
                            $scope.init();
                        },2000);
                    });
                    

                }

                $scope.upload = function () {
                    var params = {
                        'name':'uploadFilePopup',
                        'rootScope':$scope,
                        'bucket': userInfo.exportBucket,
                        'key': 'image/',
                        'owner': userInfo.uid,
                        'directive':'<upload-file-popup></upload-file-popup>'
                    }
                    $dazzlePopup.callPopup(params).then(function(){
                      $scope.inited= false;
                      $scope.userGallery = [];
                        $scope.allList = [];

                        setTimeout(function () {
                            $scope.init();
                        }, 1000);
                    });

                };
                $scope.closePopup = function () {
                    $mdDialog.cancel();
                }
                
                $scope.groupSaveTag = function(){
                    angular.forEach($scope.userGallery,function(item,index){
                        var tags;
                       if (item.selected) {
                            console.log('Tags',$scope.myTags);
                            tags = union_arrays (item['tags'],$scope.myTags);
                            item['tags'] = tags;
                            $scope.saveThisTags(item['gid'],item['tags']);
                       }

                    });
                }

                $scope.saveThisTags = function(id,tags) {
                    console.log('Save This Tags',tags);
                    $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzleEditorMiscFunction",
                            "data": {

                                "action": "updateByGid",
                                "gid": id,
                                "tags": tags

                            }
                        }).then(function (result) {
                            if (result.data.code > 0) {
                                $dazzlePopup.toast("更新成功");
                                console.log('Updated');
                            } else {
                                $dazzlePopup.toast("更新失敗");
                                console.log(result);
                            }

                        });
                }
                
                $scope.saveTag = function(element) {
                    console.log(element);
                    $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzleEditorMiscFunction",
                            "data": {

                                "action": "updateByGid",
                                "gid": $scope.myGid,
                                "tags": $scope.myTags

                            }
                        }).then(function (result) {
                            if (result.data.code > 0) {

                            }
                            console.log('Delete',result);
                        });
                }
                
                function loading(){
                     
              }
              
              var cropper,result;
              $scope.cut = function(){
                  $scope.cutted();
              }
               $scope.cutted = function(){
                      var image = document.querySelector('#dz-cropper');
                   //   var data = document.querySelector('#data');
                //      var cropBoxData = document.querySelector('#cropBoxData');
                 //     var button = document.getElementById('button');
                  //    var result = document.getElementById('result');
                      cropper = new Cropper(image, {
                        ready: function (event) {
                          // Zoom the image to its natural size
                          cropper.zoomTo(1);
                        },
                
                        crop: function (event) {
//                          data.textContent = JSON.stringify(cropper.getData());
 //                         cropBoxData.textContent = JSON.stringify(cropper.getCropBoxData());
                        },
                
                        zoom: function (event) {
                          // Keep the image in its natural size
                          if (event.detail.oldRatio === 1) {
                            event.preventDefault();
                          }
                        },
                      });
                
                    //   button.onclick = function () {
                    //     result.innerHTML = '';
                    //     result.appendChild(cropper.getCroppedCanvas());
                    //   };  
               }
                $scope.getCrop = function(){
                    result = cropper.getCroppedCanvas();
                    cropper.destroy();
                }    
                
                  function buildToggler(navID) {
                      return function() {
                        // Component lookup should always be available since we are not using `ng-if`
                        $mdSidenav(navID)
                          .toggle()
                          .then(function () {
                            $log.debug("toggle " + navID + " is done");
                          });
                      };
                    }
                    
                function union_arrays (x, y) {
                  var obj = {};
                  for (var i = x.length-1; i >= 0; -- i)
                     obj[x[i]] = x[i];
                  for (var i = y.length-1; i >= 0; -- i)
                     obj[y[i]] = y[i];
                  var res = []
                  for (var k in obj) {
                    if (obj.hasOwnProperty(k))  // <-- optional
                      res.push(obj[k]);
                  }
                  return res;
                }
        }
    };
    return link;
});

 app.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
  });

