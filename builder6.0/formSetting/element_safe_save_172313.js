var app = angular.module('demoApp');
app.directive('formSetting', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var name = 'formSetting';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/formSetting/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "formSetting";
            scope.type = "formSetting";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser,$dazzleS3) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');
                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');
                $scope.currentDirective;

                $scope.save = function() {
                    console.log($scope.model);
                }
                $scope.init = function(){
                    $scope.model = {};
                    $scope.model.formid = params.formid;
                    $scope.schemas =[];
                    $dazzleS3.getJson('dazzle-template','file6.0/form-schema-tpl.json').then(function(json){
                        $scope.schemas = json;
                    });

                    if (params.form.length ==0)
                        $scope.model.schema = [
                                {
                                    headerName: 'ID',
                                    "directive": "text",
                                     "directiveName": "文字"
                                }
                            ];
                    else {
                        $scope.model.schema = [];
                        angular.forEach(params.form,function(item,index){
                            $scope.model.schema.push({
                                headerName:item.headerName,
                                directiveName: item.directiveName,
                                directive: item
                            });
                        });
                    }

                    // $scope.schemas = [
                    //         {
                    //             name: '文字',
                    //             directive: 'text'
                    //         },
                    //         {
                    //             name: '選項',
                    //             directive: 'select'
                    //         }
                    //     ]
                }
                
                $scope.addItem = function(index){
                    if (index==-1)
                        $scope.model.schema.push( {
                                directiveName: '',
                                directive: 'text'
                            });
                    else {
                        $scope.model.schema.splice(index+1, 0,  {
                                directiveName: '',
                                directive: 'text'
                            });
                    }
                }
                $scope.removeItem = function(index){
                    $scope.model.schema.splice(index, 1);
                }
                $scope.closeSidebar = function() {
                     $mdSidenav('right').close();
                }
                
                $scope.openSettings = function(directive){
                    
                    console.log(directive);
                        if ( 'settings' in directive) {
                            $scope.currentDirective = directive;
                            $mdSidenav('right').toggle();
                        }
                }
                $scope.close = function() {
                    var json = JSON.parse(angular.toJson($scope.model));
                    $mdDialog.hide(json);
                }
        }
    };
    return link;
});