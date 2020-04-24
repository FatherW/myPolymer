var app = angular.module('demoApp');
app.directive('dzUserGalleryPopup', function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleUser,$dazzleS3,$dazzlePopup,$dazzleFn) {
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/dzUserGalleryPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
     
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http,$mdSidenav, $mdBottomSheet,$log,$dazzleFn) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');
                var userBucket = $dazzleUser.getDazzleInfo('userBucket');
                var uid =  location.hostname;
                //$scope.rootScope = params['rootScope'];
                $scope.myTags = [];
                $scope.owner = params.owner || '';
                
                $scope.mySize = 'medium';
                
                $scope.toggleRight = buildToggler('right');

                $scope.isOpenRight = function(){
                  return $mdSidenav('right').isOpen();
                };
            

                $scope.inited = false;
                $scope.userGallery = [];
                $scope.allList = [];
                $scope.tags =params.tags || [];
                $scope.multiple = params.multiple || false;
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


                    switch(params['action']){
                        
                        
                        default:
                            if ($scope.owner)
                                params = {
                                        "action": "listMyGalleryByOwner",
                                        "uid": uid,
                                        'subowner': $scope.owner,
                                        "tags": $scope.tags                            
                                    }                
                            else 
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
                            //    $scope.$apply(function () {
                                    console.log('User Gallery****************************',$scope.allList);
        
                                //    $scope.userGallery = $scope.userGallery.concat($scope.allList.slice($scope.userGallery.length, $scope.userGallery.length + 50));
                                    $scope.userGallery = result.data.resolve;
                                    // console.log('User Gallery',$scope.userGallery);
                                    $scope.inited = true;
                                                            //  });
                                }
    
                                // http://designerrrr-output.s3.amazonaws.com/images/taipo520.dazzle.website/thumbnail-web/id1510718102945.jpg
                                console.log(result);
                            });
                        break;
                    }                    
                    
                    



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
                            $scope.myElements.push(element);                            
                        }

                        else {
                            element.selected = false;                            
                            $scope.myElements.indexOf(element);
                            if (index > -1) {
                              $scope.myElements.splice(index, 1);
                            }
                        }

                        


                    }
                    
//                    $mdDialog.hide(element);
                }
                $scope.cancel = function() {
                   $scope.toggleRight(); 
                }

                $scope.select = function() {
                    $dazzleUser.dazzleInfo['imageSize'] = $scope.mySize;
                    if (!$scope.multiple)
                        $mdDialog.hide($scope.myElement);
                    else 
                        $mdDialog.hide($scope.myElements);
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
                        'bucket': userBucket,
                        'key': 'image/',
                        'owner': $scope.owner,
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

                $scope.saveTag = function(element) {
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

