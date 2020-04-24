var app = angular.module('demoApp');
app.directive('dzCodePopup', function($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast, $dazzleUser, $dazzleInit, $dazzleS3, $dazzlePopup, $ocLazyLoad, $dazzleFn, hotkeys) {
  var name = 'dzCodePopup';
  var link = {
    restrict: 'E',
    scope: true,
    templateUrl: "//d25k6mzsu7mq5l.cloudfront.net/builder6.0/dzCodePopup/element.html?id=" + new Date().getTime(),
    link: function(scope, element, attrs) {

    },
    controller: function($scope, $element, $attrs, $dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet, $dazzleUser) {

      var params = $dazzleUser.getDazzleInfo('params');
      var editor = ace.edit("editor");
      $scope.pageJson = $dazzleUser.getDazzleInfo('pageJson');
      $scope.thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');
      $scope.userBucket = $dazzleUser.getDazzleInfo('userBucket');
      $scope.exportBucket = $dazzleUser.getDazzleInfo('exportBucket');
      $scope.model = {};
      $scope.bucket = params.bucket || '';
      $scope.key = params.key || '';
      $scope.body = params.body || '';
      console.log('DZ Code params', params);
      hotkeys.add({
        combo: 'ctrl+s',
        description: 'Save',
        callback: function() {
          $scope.save();
        }
      });


      $scope.init = function() {
        //   $element.find('.editor').text($scope.body);
        //  $('#editor').text($scope.body); 

        $('#editor').css('font-family', "12px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace !important");
        editor.setTheme("ace/theme/twilight");
        //    editor.setFontSize(14);
          editor.session.setMode("ace/mode/javascript");
        // switch (params.mode) {
        //   case 'js':
        //     editor.session.setMode("ace/mode/javascript");
        //     break;
        //
        //  case 'html':
        //  case 'css':
        //  default:
        //    editor.session.setMode("ace/mode/html");
        //    break;
        // }

        editor.setOptions({
          fontFamily: "Monaco !important",
          fontSize: "10pt"
        });



        editor.commands.addCommand({
          name: 'ctrlS',
          bindKey: {
            win: 'Ctrl-S',
            mac: 'Ctrl-S'
          },
          exec: function() { // do something
            $scope.save();
          }
        });

        editor.commands.addCommand({
          name: 'ctrlF',
          bindKey: {
            win: 'Ctrl-F',
            mac: 'Ctrl-F'
          },
          exec: function() { // do something
            console.log('FInd');
            $scope.find();
            //            editor.execCommand("find");
          }
        });


        editor.setValue($scope.body);

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
        console.log($scope.bucket, $scope.key, value);
        if ($scope.bucket && $scope.key) {
          $dazzleS3.saveFile($scope.bucket, $scope.key, value).then(function(result) {
            $dazzlePopup.toast('成功儲存');
          }, function(err) {
            $dazzlePopup.toast('儲存失敗');
            console.log('Error', err);
          });
        } else {
          //          $mdDialog.hide(value);
        }


      }
    }
  };
  return link;
});