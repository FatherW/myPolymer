
    
var app = angular.module('demoApp');
app.directive('hotyeahSchoolBlock', function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleInit,$dazzlePopup,$dazzleData,$dazzleUser,$dazzleFn) {
    var name = 'hotyeahSchoolBlock';
    var link = {
        restrict: 'EA',
        scope: true,
        templateUrl: "http://d25k6mzsu7mq5l.cloudfront.net/builder6.0/hotyeahSchoolBlock/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            
            scope.editorCustomInit(scope, element, attrs).then(function () {
          
                console.log('Where are you');
    
                
               $dazzleFn.dataInitByType(scope.model.db).then(function(value){
                   scope.model.data = value.data[0];
                   scope.model.value = value.ids;
                   console.log('Tutor Info',scope.model.value);
                   console.log('Tutor Info',scope.model.data);
                   scope.useTemplate();
                },function(err){
                    scope.model.data = [];
                    scope.model.value = [];
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
                                    
            $scope.edit = function(item) {
                var token = store.get('token');
                store.set('token',token);
                store.set('editPage',item['名稱']);
                store.set('exportID',item['ID']);
                store.set('templateHtml','schoolDetail');
                
                // console.log(store.get('token'),store.get('editPage'),store.get('exportID'));
                window.open("http://www.hot-yeah.com/school-edit.html");

                

            }


            $scope.loadSchool = function(id){
                return new Promise(function (resolve, reject) {
                        $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzle-website-directive",
                            "data": {
                              "action": "loadSchool",
                              "id":id
                            }
                        }).then(function (result) {
                            console.log('Load Course Popup',result);
                            if (result.data.code > 0) {
                                resolve(result.data.resolve); 
                            } 
                        });
                });
            }
            
            $scope.remove = function(id){
                var index = $scope.model.value.indexOf(id);
                if (index > -1) {
                    $scope.model.value.splice(index, 1);
                }
                $dazzleData.loadElasticRecordByIds("hotyeah","course",$scope.model.value).then(function(data){
                       $scope.model.data = data;    
                       $scope.useTemplate();
                });
            }


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
                        $scope.edit($scope.model.data);
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
                    $mdDialog.show({
                        controller: 'templatePopupController',
                        templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/templatePopup/popup.html' + "?id=" + new Date().getTime(),
                        locals: {
                            rootScope: $scope
                        }
                    }).then(function (template) {
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

