var app = angular.module('demoApp');

//            angular.module('ng').requires.push('theCommentSystemModule');

var name = 'userGalleryPopup';
app.directive(name, function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleUser,$dazzleS3,$dazzlePopup,$dazzleFn) {
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/userGalleryPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;


            
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http,$mdSidenav, $mdBottomSheet,$log) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');
                var userBucket = $dazzleUser.getDazzleInfo('userBucket');
                
                //$scope.rootScope = params['rootScope'];
                $scope.myTags = [];
                $scope.mySize = 'medium';
                
                $scope.toggleRight = buildToggler('right');

                $scope.isOpenRight = function(){
                  return $mdSidenav('right').isOpen();
                };
            

                $scope.inited = false;
                $scope.userGallery = [];
                $scope.allList = [];
                $scope.tags =[];
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

                        console.log({

                            "action": "listMyGalleryByTags",
                            "uid": $dazzleUser.getUser().uid,
                            "tags": $scope.tags

                        });

                        $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzleEditorMiscFunction",
                            "data": {

                                "action": "listMyGalleryByTags",
                                "uid": $dazzleUser.getUser().uid,
                                "tags": $scope.tags

                            }
                        }).then(function (result) {
                            if (result.data.code > 0) {
                                $scope.allList = result.data.resolve;
//                            $scope.$apply(function () {
//                                $scope.userGallery = $scope.userGallery.concat($scope.allList.slice($scope.userGallery.length, $scope.userGallery.length + 50));
                                $scope.userGallery = result.data.resolve;
                                $scope.inited = true;
                                //                          });
                            }

                            // http://designerrrr-output.s3.amazonaws.com/images/taipo520.dazzle.website/thumbnail-web/id1510718102945.jpg
                            console.log(result);
                        });
                }

                $scope.buildTags=function(tags){
                    console.log(tags);
                    if (!angular.isUndefined(tags))
                        return tags.join();
                    else
                        return '';
                }
                $scope.getFileUrl = function (size, id) {

                    return $dazzleFn.getFileUrl(size,id);
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
                    console.log('My Element',element);
                    $scope.myElement = element;
                    $scope.myGid = element.gid;
                    $scope.myTags = element.tags;
                    $scope.mySize = "medium-web";
                    $scope.toggleRight();
//                    $mdDialog.hide(element);
                }
                $scope.cancel = function() {
                   $scope.toggleRight(); 
                }

                $scope.select = function() {
                    $dazzleUser.dazzleInfo['imageSize'] = $scope.mySize;
                    console.log('My Size',$scope.mySize);
                    $mdDialog.hide($scope.myElement);
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
        

                    var params = {
                        uid : $dazzleUser.getUser().uid,
                        name: 'dzUploadImagePopup',
                        directive: '<dz-upload-image-popup></dz-upload-image-popup>'
                    };      

                    //$dazzlePopup.uploadImage($dazzleUser.getUser().uid).then(function (images) {
                    $dazzlePopup.callPopup(params).then(function(images){
                        console.log(images);
                        setTimeout(function(){
                            $scope.init();
                        },2000);                        
                    });

                }

                $scope.selectSize = function(size) {
                    $scope.mySize = size;
                    console.log($scope.mySize);
                }
                $scope.upload = function () {
                    var params = {
                        'name':'uploadFilePopup',
                        'rootScope':$scope,
                        'bucket': userBucket,
                        'key': 'image/',
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

