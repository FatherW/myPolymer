var app = angular.module('demoApp');
window['ace'] = null;
var editor;

app.directive('dzCodePopup', function ($compile,$ocLazyLoad, $templateRequest, $mdDialog, $dazzleUser,$dazzleS3,$dazzlePopup,
hotkeys) {
    var name ='dzCodePopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/dzCodePopup/element.html?id=" + new Date().getTime(),
        link: function ($scope, $element, attrs) {
            
              var params = $dazzleUser.getDazzleInfo('params');
         
              $scope.model = {};
              if (params) {
                  $scope.bucket = params.bucket || '';
                  $scope.key = params.key || '';
                  $scope.body = params.body || '';
                  
              }
              
              
              
//const editor = ace.edit('editor');
//editor.getSession().setMode('ace/mode/javascript');
//editor.setTheme('ace/theme/monokai');
//editor.setValue($scope.body);


               $ocLazyLoad.load(['https://dazzle-template.s3.amazonaws.com/cdn6.0/js/src-noconflict/ace.js'], {cache: false}).then(function () {
                     window['ace'] = ace;
                     editor = ace.edit("editor");
                     //editor.setTheme("ace/theme/monokai");
                     editor.setTheme("ace/theme/twilight");
                     editor.session.setMode("ace/mode/javascript");
                     editor.setValue($scope.body);
                     editor.resize();

                 },function(){
				 	reject();				
				 });

              


        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http,$mdSidenav, $mdBottomSheet,$log) {
          //  $("#dz-dropzone").dropzone({ url: "/file/post" });
//            var myDropzone = new Dropzone("#dz-dropzone", { url: "/file/post"});

   
              hotkeys.add({
                combo: 'ctrl+s',
                description: 'Save',
                callback: function() {
                  $scope.save();
                }
              });
        
            $scope.shiftScreen = function(){
                $('md-dialog-container').css('position','fixed').css('width','100%').css('height','100%');
                $('md-dialog').css('width','100%').css('top','0px').css('left','0px').css('height','100%');
                $('#popupDialog').css('height','100%');
            }
                $scope.recovery = function(){
                        var params = {
                                  name : 'recoveryPopup',
                                  directive: '<recovery-popup></recovery-popup>',
                                  bucket: $scope.bucket,
                                  page: $scope.key
                        };
                        $dazzlePopup.callPopup(params).then(function(result){
                            
                        });            
                }
                
              $scope.init = function() {
       
              }
              $scope.find = function() {
            //    editor.execCommand("find");
              }
              $scope.cancel = function() {
                $mdDialog.cancel();
              }
              $scope.save = function() {
                var value;
                value = editor.getValue();
                console.log($scope.bucket, $scope.key, value);
                
                if ($scope.bucket && $scope.key) {
                  $dazzleS3.saveFile($scope.bucket, $scope.key, value).then(function(result) {
                    $dazzlePopup.toast('成功儲存');
                  }, function(err) {
                    $dazzlePopup.toast('儲存失敗');
                    console.log('Error', err);
                  });
                } else {
                            $mdDialog.hide(value);
                }
        
        
              }



        }
    };
    return link;
});




// var app = angular.module('demoApp');
// app.directive('dzCodePopup', function($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast, $dazzleUser, $dazzleInit, $dazzleS3, $dazzlePopup, $ocLazyLoad, $dazzleFn, hotkeys) {
//   var name = 'dzCodePopup';
//   var link = {
//     restrict: 'E',
//     scope: true,
//     templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/dzCodePopup/element.html?id=" + new Date().getTime(),
//     link: function(scope, element, attrs) {

//     },
//     controller: function($scope, $element, $attrs, $dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet, $dazzleUser) {
          
//             var editor;
//       var params = $dazzleUser.getDazzleInfo('params');
//     //   var editor = ace.edit("editor");
//     //   $scope.pageJson = $dazzleUser.getDazzleInfo('pageJson');
//     //   $scope.thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');
//     //   $scope.userBucket = $dazzleUser.getDazzleInfo('userBucket');
//     //   $scope.exportBucket = $dazzleUser.getDazzleInfo('exportBucket');
//       $scope.model = {};
//       $scope.bucket = params.bucket || '';
//       $scope.key = params.key || '';
//       $scope.body = params.body || '';
      
 
            
            
      
//       console.log('DZ Code params', params);
//       hotkeys.add({
//         combo: 'ctrl+s',
//         description: 'Save',
//         callback: function() {
//           $scope.save();
//         }
//       });

//     $scope.shiftScreen = function(){
//         $('md-dialog-container').css('position','fixed').css('width','100%').css('height','100%');
//         $('md-dialog').css('width','100%').css('top','0px').css('left','0px').css('height','100%');
//         $('#popupDialog').css('height','100%');
//     }
//         $scope.recovery = function(){
//                 var params = {
//                           name : 'recoveryPopup',
//                           directive: '<recovery-popup></recovery-popup>',
//                           bucket: $scope.bucket,
//                           page: $scope.key
//                 };
//                 $dazzlePopup.callPopup(params).then(function(result){
                    
//                 });            
//         }
        
//       $scope.init = function() {
          
//             editor = ace.edit("editor");
//             editor.setTheme("ace/theme/twilight");
//             editor.session.setMode("ace/mode/javascript");
//             editor.setValue($scope.body);
            
//         // $('#editor').css('font-family', "12px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace !important");
//         // editor.setTheme("ace/theme/twilight");
//         //   editor.session.setMode("ace/mode/javascript");

//         // editor.setOptions({
//         //   fontFamily: "Monaco !important",
//         //   fontSize: "10pt"
//         // });



//         // editor.commands.addCommand({
//         //   name: 'ctrlS',
//         //   bindKey: {
//         //     win: 'Ctrl-S',
//         //     mac: 'Ctrl-S'
//         //   },
//         //   exec: function() { // do something
//         //     $scope.save();
//         //   }
//         // });

//         // editor.commands.addCommand({
//         //   name: 'ctrlF',
//         //   bindKey: {
//         //     win: 'Ctrl-F',
//         //     mac: 'Ctrl-F'
//         //   },
//         //   exec: function() { // do something
//         //     console.log('FInd');
//         //     $scope.find();
//         //     //            editor.execCommand("find");
//         //   }
//         // });


//       // editor.setValue($scope.body);

//       }
//       $scope.find = function() {
//     //    editor.execCommand("find");
//       }
//       $scope.cancel = function() {
//         $mdDialog.cancel();
//       }
//       $scope.save = function() {
//         var value;
//         value = editor.getValue();
//         console.log($scope.bucket, $scope.key);
//         if ($scope.bucket && $scope.key) {
//           $dazzleS3.saveFile($scope.bucket, $scope.key, value).then(function(result) {
//             $dazzlePopup.toast('成功儲存');
//           }, function(err) {
//             $dazzlePopup.toast('儲存失敗');
//             console.log('Error', err);
//           });
//         } else {
//                     $mdDialog.hide(value);
//         }


//       }
//     }
//   };
//   return link;
// });