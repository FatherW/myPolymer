var app = angular.module('demoApp');

    app.directive('deleteUser', function($compile, $timeout,$mdDialog, $mdToast, $dazzleS3, $dazzleUser, 
        $dazzlePopup, $dazzleElastic, dzFn) {


      var deleteUser = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        template: `<md-button ng-click="delete()">刪除用戶</md-button>`,
        controller: function($scope, $http, $element) {
            $scope.delete = function () {
                    var rows = $dazzleElastic.gridOptions.api.getSelectedRows();
                    
                    console.log('Rows',rows);
            }
             $scope.removeBucket = function(bucket) {
                           
                return new Promise(function (resolve, reject) {

                    var i, length, key;
                    var msg;

                    msg = {
                        "bucket": bucket
                    };
                    console.log(JSON.stringify(msg));

                    dzFn.sendSystemMessage('removeBucket', msg).then(function (result) {
                        resolve();
                    },function(err){
                        reject();
                    });
                });
            
            }
         
        }
      };
      return deleteUser;
    });


//});