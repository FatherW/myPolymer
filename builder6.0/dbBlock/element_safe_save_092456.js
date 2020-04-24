var app = angular.module('demoApp');
app.directive('dbBlock', function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzlePopup,$dazzleData,$dazzleUser,$dazzleFn) {
    var name = 'dbBlock';
    var link = {
        restrict: 'EA',
        scope: true,
        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/dbBlock/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "//d27btag9kamoke.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            
            var thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');

            scope.editorCustomInit(scope, element, attrs).then(function () {

                // if(!angular.isUndefined(scope.model.db))
                //     scope.model.db.id = thisPageJson.exportDatas[thisPageJson.exportID];
                    
                $dazzleFn.dataInitByType(scope.model.db).then(function(value){
                //   if (!value)
                //     value = "請右click更新對應資料欄位";
                   scope.model.value = value || "請右click 以更新／設定資料";;
                   console.log('IDS',value);
                   scope.useTemplate();
                },function(err){
                    scope.model.value = "請右click 以更新／設定資料";
                });

              
              //  element.attr('contenteditable','true');
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });

            });
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
           var thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');

              $scope.menuOptions = [];
            
               $scope.menuOptions.push(["編輯資料", function ($itemScope) {
                    if (!$scope.model.db)
                         $mdDialog.show(
                              $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title('沒有資料設定，請點選「資料管理」設定')
                                .ok('Got it!')
                            );
                   else if (!$scope.model.db.edit) {
                         $mdDialog.show(
                              $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title('沒有權限編輯')
                                .ok('Got it!')
                            );

                   } else {

                       $dazzleFn.dataPopupByType($scope.model.db,$scope.model.value).then(function(result){
                          console.log(result); 
                          $scope.model.value = result;
                            $scope.useTemplate();
                            $dazzleData.saveRecord($scope.model.db,$scope.model.value).then(function(result){
                               console.log('Saved');
                            });
                       });
                   } 
                }]);
            
            if (angular.isUndefined(thisPageJson.myID)) {
                $scope.menuOptions.push(["資料管理", function ($itemScope) {
                    var params = {
                        db:$scope.model.db|| {},
                        'directive':'<db-setting-popup></db-setting-popup>'
                        
                    };
                    $dazzlePopup.callPopup(params).then(function(result){
                        console.log(result);
                       $scope.model.db = result; 
                    });
                    
                }]);
                 $scope.menuOptions.push(["更換模版", function () {
                     var params = {
                         name: 'templatePopup',
                         directive: '<template-popup></template-popup>',
                         model: $scope.model
                     }
                     $dazzlePopup.callPopup(params).then(function(template){
                         $scope.useTemplate();
                     });
                }]);
            }
            $scope.beforeAtomSaved = function () {

            }

            
        }
    };
    return link;
});