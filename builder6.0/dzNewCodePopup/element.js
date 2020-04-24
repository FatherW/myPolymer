var app = angular.module('demoApp');

// angular.module('demoApp', ['cfp.hotkeys'])
//   .config(function(hotkeysProvider) {
//     hotkeysProvider.includeCheatSheet = false;
//   })
  
app.directive('dzNewCodePopup', function($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast, $dazzleUser, $dazzleInit, $dazzleS3, $dazzlePopup, $ocLazyLoad, $dazzleFn) {
  var name = 'dzNewCodePopup';
  var link = {
    restrict: 'E',
    scope: true,
    templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/dzNewCodePopup/element.html?id=" + new Date().getTime(),
    link: function(scope, element, attrs) {

    },
    controller: function($scope, $element, $attrs, $dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet, $dazzleUser) {



       var editor = ace.edit("editor");
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode("ace/mode/javascript");
        
    
    
      var params = $dazzleUser.getDazzleInfo('params');
      var editor = ace.edit("editor");
     
      $scope.model = {};
      $scope.bucket = params.bucket || '';
      $scope.key = params.key || '';
      $scope.body = params.body || '';
      console.log('DZ Code params', params);

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
        
    
      $scope.find = function() {
        editor.execCommand("find");
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