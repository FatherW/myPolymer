var app = angular.module('demoApp');
app.directive('dzCrop', function ($compile, $templateRequest, $http, $ocLazyLoad, $mdDialog,$dazzleUser,$dazzleS3,$dazzlePopup,
    atomInfo,dzS3) {
    var dzImage = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/dzCrop/element.html?id=" + new Date().getTime(),

        compile: function (tElem, tAttrs) {
           return {
               pre: function (scope, iElem, iAttrs) {

               },
               post: function (scope, iElem, iAttrs) {


               }
           }
       },
        link: function ($scope, $element, attrs) {



        },
        controller: function ($scope, $element, $attrs) {
            
            console.log('Loaded dzCrop');
        //     var load = document.getElementById('load');
        //   var image = document.querySelector('#image');
        //   var data = document.querySelector('#data');
        //   var button = document.getElementById('button');
        //   var result = document.getElementById('result');
        //   var cropper;
          
         
          function loading(){
                 var image = document.querySelector('#image');
                  var data = document.querySelector('#data');
                  var cropBoxData = document.querySelector('#cropBoxData');
                  var button = document.getElementById('button');
                  var result = document.getElementById('result');
                  var cropper = new Cropper(image, {
                    ready: function (event) {
                      // Zoom the image to its natural size
                      cropper.zoomTo(1);
                    },
            
                    crop: function (event) {
                      data.textContent = JSON.stringify(cropper.getData());
                      cropBoxData.textContent = JSON.stringify(cropper.getCropBoxData());
                    },
            
                    zoom: function (event) {
                      // Keep the image in its natural size
                      if (event.detail.oldRatio === 1) {
                        event.preventDefault();
                      }
                    },
                  });
            
                  button.onclick = function () {
                    result.innerHTML = '';
                    result.appendChild(cropper.getCroppedCanvas());
                  };
          }
          
           $scope.init = function(){
            loading();   
          }
          
            
              
        
               
          

         
        }
    };
    return dzImage;
});