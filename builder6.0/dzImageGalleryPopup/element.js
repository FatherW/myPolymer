var app = angular.module('demoApp');
app.directive('dzImageGalleryPopup', function ($compile, $templateRequest, $mdDialog, $dazzleUser,$dazzleS3,$dazzlePopup) {
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/dzImageGalleryPopup/element.html?id=" + new Date().getTime(),
        link: function ($scope, $element, attrs) {
                console.log('Window',window);
                // var $image = $('#dz-cropper');
                // $image.cropper({
                //   aspectRatio: 16 / 9,
                //   crop: function(event) {
                //     console.log(event.detail.x);
                //     console.log(event.detail.y);
                //     console.log(event.detail.width);
                //     console.log(event.detail.height);
                //     console.log(event.detail.rotate);
                //     console.log(event.detail.scaleX);
                //     console.log(event.detail.scaleY);
                //   }
                // });
                // // Get the Cropper.js instance after initialized
                // var cropper = $image.data('cropper');
                
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http,$mdSidenav, $mdBottomSheet,$log) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');
                var userBucket = $dazzleUser.getDazzleInfo('userBucket');
                var user = store.get('user') || null;
                var uid;
                if (!user)
                    uid =  location.hostname;
                else
                    uid = user.exportBucket;
                    
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


function crop(){
      'use strict';

  var console = window.console || { log: function () {} };
  var URL = window.URL || window.webkitURL;
  var $image = $('#dz-cropper');
  var $download = $('#download');
  var $dataX = $('#dataX');
  var $dataY = $('#dataY');
  var $dataHeight = $('#dataHeight');
  var $dataWidth = $('#dataWidth');
  var $dataRotate = $('#dataRotate');
  var $dataScaleX = $('#dataScaleX');
  var $dataScaleY = $('#dataScaleY');
  var options = {
    aspectRatio: 16 / 9,
    preview: '.img-preview',
    crop: function (e) {
      $dataX.val(Math.round(e.detail.x));
      $dataY.val(Math.round(e.detail.y));
      $dataHeight.val(Math.round(e.detail.height));
      $dataWidth.val(Math.round(e.detail.width));
      $dataRotate.val(e.detail.rotate);
      $dataScaleX.val(e.detail.scaleX);
      $dataScaleY.val(e.detail.scaleY);
    }
  };
  var originalImageURL = $image.attr('src');
  var uploadedImageName = 'cropped.jpg';
  var uploadedImageType = 'image/jpeg';
  var uploadedImageURL;

  // Tooltip
 // $('[data-toggle="tooltip"]').tooltip();

  // Cropper
  $image.cropper(options);

  // Buttons
  if (!$.isFunction(document.createElement('canvas').getContext)) {
    $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
  }

  if (typeof document.createElement('cropper').style.transition === 'undefined') {
    $('button[data-method="rotate"]').prop('disabled', true);
    $('button[data-method="scale"]').prop('disabled', true);
  }

  // Download
  if (typeof $download[0].download === 'undefined') {
    $download.addClass('disabled');
  }

  // Options
  $('.docs-toggles').on('change', 'input', function () {
    var $this = $(this);
    var name = $this.attr('name');
    var type = $this.prop('type');
    var cropBoxData;
    var canvasData;

    if (!$image.data('cropper')) {
      return;
    }

    if (type === 'checkbox') {
      options[name] = $this.prop('checked');
      cropBoxData = $image.cropper('getCropBoxData');
      canvasData = $image.cropper('getCanvasData');

      options.ready = function () {
        $image.cropper('setCropBoxData', cropBoxData);
        $image.cropper('setCanvasData', canvasData);
      };
    } else if (type === 'radio') {
      options[name] = $this.val();
    }

    $image.cropper('destroy').cropper(options);
  });

  // Methods
  $('.docs-buttons').on('click', '[data-method]', function () {
    var $this = $(this);
    var data = $this.data();
    var cropper = $image.data('cropper');
    var cropped;
    var $target;
    var result;

    if ($this.prop('disabled') || $this.hasClass('disabled')) {
      return;
    }

    if (cropper && data.method) {
      data = $.extend({}, data); // Clone a new one

      if (typeof data.target !== 'undefined') {
        $target = $(data.target);

        if (typeof data.option === 'undefined') {
          try {
            data.option = JSON.parse($target.val());
          } catch (e) {
            console.log(e.message);
          }
        }
      }

      cropped = cropper.cropped;

      switch (data.method) {
        case 'rotate':
          if (cropped && options.viewMode > 0) {
            $image.cropper('clear');
          }

          break;

        case 'getCroppedCanvas':
          if (uploadedImageType === 'image/jpeg') {
            if (!data.option) {
              data.option = {};
            }

            data.option.fillColor = '#fff';
          }

          break;
      }

      result = $image.cropper(data.method, data.option, data.secondOption);

      switch (data.method) {
        case 'rotate':
          if (cropped && options.viewMode > 0) {
            $image.cropper('crop');
          }

          break;

        case 'scaleX':
        case 'scaleY':
          $(this).data('option', -data.option);
          break;

        case 'getCroppedCanvas':
          if (result) {
            // Bootstrap's Modal
            $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

            if (!$download.hasClass('disabled')) {
              download.download = uploadedImageName;
              $download.attr('href', result.toDataURL(uploadedImageType));
            }
          }

          break;

        case 'destroy':
          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
            uploadedImageURL = '';
            $image.attr('src', originalImageURL);
          }

          break;
      }

      if ($.isPlainObject(result) && $target) {
        try {
          $target.val(JSON.stringify(result));
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  });

  // Keyboard
  $(document.body).on('keydown', function (e) {
    if (e.target !== this || !$image.data('cropper') || this.scrollTop > 300) {
      return;
    }

    switch (e.which) {
      case 37:
        e.preventDefault();
        $image.cropper('move', -1, 0);
        break;

      case 38:
        e.preventDefault();
        $image.cropper('move', 0, -1);
        break;

      case 39:
        e.preventDefault();
        $image.cropper('move', 1, 0);
        break;

      case 40:
        e.preventDefault();
        $image.cropper('move', 0, 1);
        break;
    }
  });

  // Import image
  var $inputImage = $('#inputImage');

  if (URL) {
    $inputImage.change(function () {
      var files = this.files;
      var file;

      if (!$image.data('cropper')) {
        return;
      }

      if (files && files.length) {
        file = files[0];

        if (/^image\/\w+$/.test(file.type)) {
          uploadedImageName = file.name;
          uploadedImageType = file.type;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
          }

          uploadedImageURL = URL.createObjectURL(file);
          $image.cropper('destroy').attr('src', uploadedImageURL).cropper(options);
          $inputImage.val('');
        } else {
          window.alert('Please choose an image file.');
        }
      }
    });
  } else {
    $inputImage.prop('disabled', true).parent().addClass('disabled');
  }
  

    
    
}
