var app = angular.module('demoApp');


app.directive('dzDropZone', function ($compile, $templateRequest, $mdDialog, $dazzleUser,$dazzleS3,$dazzlePopup,
dzS3,hotkeys) {
    var editor;
    var name ='dzDropZone';
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
                  
                  editor.setValue($scope.body);
              }
              
            editor = ace.edit("editor");
            editor.setTheme("ace/theme/twilight");
            editor.session.setMode("ace/mode/javascript");
            editor.setValue("Hello, World");

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
                console.log($scope.bucket, $scope.key);
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
