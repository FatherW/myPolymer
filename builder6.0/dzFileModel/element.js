var app = angular.module('demoApp');
var name = 'dzFileModel';

app.directive(name, function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleUser,$dazzleS3,$dazzlePopup,$dazzleFn,userInfo,dzS3) {
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/dzFileModel/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http,$mdSidenav, $mdBottomSheet,$log,$dazzleFn) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');
                var userBucket = userInfo.exportBucket;
                
                //$scope.rootScope = params['rootScope'];
                $scope.myTags = [];
                $scope.owner = params.owner || '';
//                $scope.searchTags = params.searchTags || [];
                
                $scope.mySize = 'medium';
                $scope.prefix = params.prefix || '';
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
                  return new Promise(function (resolve, reject) {

                    $scope.inited = false;
                    
                    var params = {};


                    switch(params['action']){

                        default:
                            $scope.userGallery = [];
                            dzS3.listObject(userBucket,$scope.prefix).then(function(files){
                                    console.log('Files',files);
                                    var arr = [];
                                    angular.forEach(files,function(item,index){
                                        console.log('Key',item);
                                       var key = item['Key'];
                                       var paths = key.split("/");
                                           
                                       if (key.indexOf("/")>0) {
                                            if (arr.indexOf(paths[0]+'/')<0)
                                                arr.push(paths[0]+'/');
                                       }
                                       else{
                                           arr.push(paths[0]);
                                       }                                           
                                    });
                                    $scope.userGallery = arr;
                                    console.log('User Gallery',$scope.userGallery);
                                            $scope.allList = $scope.userGallery;
                            //    $scope.$apply(function () {
                                    console.log('User Gallery****************************',$scope.allList);
        
                                //    $scope.userGallery = $scope.userGallery.concat($scope.allList.slice($scope.userGallery.length, $scope.userGallery.length + 50));
                                    console.log($scope.userGallery);
                                    $scope.inited = true;
                                    $compile($('#fileGallery').contents())($scope);
                                    resolve();

                            });
                            

                        break;                        
                        
                        // default:
                        
                        // break;
                    }                    
                    
                    
                  }); 


                }

                $scope.buildTags=function(tags){
                    // console.log(tags);
                    if (!angular.isUndefined(tags))
                        return tags.join();
                    else
                        return '';
                }
                $scope.getFileUrl = function (item) {
                    if (item.indexOf(".htm")>0)
                        type = 'html';
                    else if (item.indexOf("/")>0)
                        type= 'folder';
                    else
                        type = 'file';
                    
                    switch(type){
                        case 'html':
                            return "https://d27btag9kamoke.cloudfront.net/file6.0/images/html.png";                            
                            break;
                        
                        case 'json':
                            return "https://d27btag9kamoke.cloudfront.net/file6.0/images/json.png";                            
                            break;
                        
                        case 'jpg':
                        case 'png':    
                        case 'jpeg':    
                            return "https://d27btag9kamoke.cloudfront.net/file6.0/images/jpg.jpeg";                            
                            break;    

                        case 'folder':
                            return "https://d27btag9kamoke.cloudfront.net/file6.0/images/folder.png";                            
                            break;

                        case 'css':
                        case 'js':
                        default:
                            return "https://d27btag9kamoke.cloudfront.net/file6.0/images/file.png";
                        break;
                        
                    }
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
                
                    var slashPos = element.indexOf("/");
                    var length = element.length;
                    
                    if (slashPos == length -1){
                            element=element.replace("/",'');
                            $scope.prefix = element;                           
                            $scope.init();

                    } else {
                        dzS3.getFile(userInfo.exportBucket,element).then(function(body){
                          var params = {
                                    name :'dzCodePopup',
                                    directive: '<dz-code-popup></dz-code-popup>',
                                    body:body,
                                    bucket : userInfo.exportBucket,
                                    key: element,
                                    big:true
                                };
                                $dazzlePopup.callPopup(params).then(function(newCode){
                                    dzS3.saveFile(userInfo.exportBucket, element, newCode);
                                });                        
                        },function(){
                            alert('不能讀取檔案');
                        });                        
                    }


                    
                    // var index;
                    // if (!$scope.multiple) {
                    //     console.log('My Element',element);
                    //     $scope.myElement = element;
                    //     $scope.myGid = element.gid;
                    //     $scope.myTags = element.tags;
                    //     $scope.mySize = "medium-web";
                    //     $scope.toggleRight();
                    // }  else {
                    //     if (angular.isUndefined(element.selected) || !element.selected){
                    //         element.selected = true;
                    //         $scope.myElements.push(element);                            
                    //     }

                    //     else {
                    //         element.selected = false;                            
                    //         $scope.myElements.indexOf(element);
                    //         if (index > -1) {
                    //           $scope.myElements.splice(index, 1);
                    //         }
                    //     }

                        


                    // }
                    
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

                    // $dazzlePopup.uploadImage($dazzleUser.getUser().uid).then(function (images) {

                    //     console.log(images);
                    //     setTimeout(function(){
                    //         $scope.init();
                    //     },2000);
                    // });

                    alert('注意！此上載將會覆寫所有網站內容！');
                    
                    var params = {
                        "name": "dzUploadFilePopup",
                        "directive":"<dz-upload-file-popup></dz-upload-file-popup>",
                        "key":"",
                        "bucket":userInfo.exportBucket
                    };
                    
                    $dazzlePopup.callPopup(params).then(function(files){
                        $scope.init();
                        //$scope.initFiles();
                    });

                    // var params = {
                    //     'name': 'dzUploadFilePopup',
                    //     'directive':'<dz-upload-file-popup></dz-upload-file-popup>',
                    //     'uid':$dazzleUser.getUser().uid,
                    //     'owner':$scope.owner
                    // }
                    // $dazzlePopup.callPopup(params).then(function(images){
                    //     console.log(images);
                    //     setTimeout(function(){
                    //         $scope.init();
                    //     },2000);
                    // });
                    

                }

                $scope.upload = function () {
                    var params = {
                        'name':'uploadFilePopup',
                        'rootScope':$scope,
                        'bucket': userBucket,
                        'key': '',
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

