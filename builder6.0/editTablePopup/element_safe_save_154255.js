var app = angular.module('demoApp');
app.directive('editTablePopup', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var name = 'editTablePopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/editTablePopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "editTablePopup";
            scope.type = "editTablePopup";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser,$dazzleFn,$dazzleData) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');
                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');
				$scope.websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
				$scope.uid = $dazzleUser.getUser().uid;
				$scope.websiteId = $dazzleUser.getDazzleInfo('websiteId');
                $scope.currentDirective;
                $scope.order = 0;
                $scope.isTable = params.isTable;
                $scope.selectedIndex=0;

                $scope.myForm = params.formJson;
                $scope.selectedForm = params.formJson;
                $scope.model = params.formJson;
                // $dazzleFn.getUserForms($scope.uid,$scope.websiteId).then(function(forms){
                //     console.log(forms);
                //     $scope.myForm = forms;
                // });
                

                $scope.save = function() {
                    console.log($scope.model);
                }
				
				$scope.edit = function() {
				    $scope.model = JSON.parse(angular.toJson($scope.selectedForm));
				    console.log($scope.model);
				    $scope.setOrder(1);
				}

                $scope.addForm = function() {
                        // Appending dialog to document.body to cover sidenav in docs app
                            // var confirm = $mdDialog.prompt()
                            //   .title('請填上表單名稱:')
                            //   .textContent('留意不要和之前表單名稱重覆, 否則資料會被覆蓋')
                            //   .placeholder('輸入名稱')
                            //   .required(true)
                            //     .targetEvent($element)
                            //   .ok('輸入')
                            //   .cancel('取消');
                            //
                            // $mdDialog.show(confirm).then(function(result) {
                            //     console.log('Hello',result);
                            //     $scope.model = {};
                            //     $scope.model.formid =  'form-'+ new Date().getTime();
                            //     $scope.model.name = result;
                            //     $scope.model.schema = [
                            //             {
                            //                 "headerName": 'ID',
                            //                 "directive": "text",
                            //                  "directiveName": "文字"
                            //             }
                            //     ];
                            //     $scope.setOrder(1);
                            //
                            // }, function() {
                            //
                            // });

                    $scope.model = {};
                    $scope.model.formid =  'form-'+ new Date().getTime();
                    $scope.model.name = '';
                    $scope.model.schema = [
                        {
                            "headerName": 'ID',
                            "directive": "text",
                            "directiveName": "文字"
                        }
                    ];
                    $scope.setOrder(1);


                }
                $scope.selectForm = function(form){
                    $scope.selectedForm = form;
                }
                $scope.delForm = function() {
                    var  myTable = 'website/' +$dazzleUser.dazzleInfo['websiteId'] + '/' + "content/" + $scope.selectedForm + "-form.json";
					$dazzleS3.removeFile('dazzle-user-' + $dazzleUser.getUser().uid,myTable).then(function (json) {
                        alert('表單已被刪除');
					});
                }
                $scope.editForm = function() {
                        console.log($scope.selectedForm);
                        alert('警告！編輯將導致資料被清空！');
                        var myTable = 'website/' + $dazzleUser.dazzleInfo['websiteId'] + '/' + "content/" + $scope.selectedForm + "-form.json";
                        $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, myTable).then(function (json) {
                            // console.log('Hello');
                            $scope.model = json;
                            // $scope.setOrder(1);
                        });

                    console.log('Hello');
//                    $scope.model = json;
                    $scope.setOrder(1);
                }
                $scope.add = function() {
                    $scope.model = {};
                    $scope.model.formid =  'form-'+ new Date().getTime();
                    $scope.model.schema = [
                            {
                                "headerName": 'ID',
                                "directive": "text",
                                 "directiveName": "文字"
                            }
                    ];
                    $scope.setOrder(1);                    
                }				
				$scope.tabOrder = function(index){
				    if ($scope.order != index)
				        return true;
				    else
				        return false;
				}
				$scope.setOrder = function(index){
                    $scope.order = index;
                    $scope.selectedIndex=index;
				}

                $scope.init = function(){

                        $scope.schemas =[];
                        console.log('Hello');
                        $dazzleS3.getJson('dazzle-template','file6.0/form-schema-tpl.json').then(function(json){
                            $scope.schemas = json;
                            console.log($scope.schemas);
                        });
                    $scope.action = "edit";

				    switch($scope.action){
                        case 'create':
                            break;
                        case 'edit':
//                            $scope.selectedForm = params.table;
                           $scope.selectedForm = $scope.formJson;
                            break;
                    }

                    

                }
                $scope.isAction = function(value){
                    if ($scope.action == value)
                        return true;
                    else
                        return false;
                }
                
                $scope.generate = function() {

                    console.log($scope.model);                    
                    if (!$scope.isTable){
                        // Form table
                        $scope.model.data = {
                            "type":"s3"  
                        };
                        $scope.model.button = [];
                        $dazzleData.saveFormByName($scope.model.name,$scope.model);
                        var mySchema = [];
                        var schemaItem = {};
                        angular.forEach($scope.model.schema,function(item,index){

                          console.log('Schema Item',schemaItem);
                          schemaItem = item.directive;
                          schemaItem.headerName = item.headerName;
                          schemaItem.field = item.headerName;
                          schemaItem.directiveName = item.directiveName;
                          mySchema.push(schemaItem);
                        });
                        $dazzleData.saveSchemaByName($scope.model.name,JSON.parse(angular.toJson(mySchema)));
                        $dazzleData.initDataByName($scope.model.name);
                    }

                }
                
                $scope.addItem = function(index){
                    if (index==-1)
                        $scope.model.schema.push( {
                                directiveName: '文字',
                                directive: 'text'
                            });
                    else {
                        $scope.model.schema.splice(index+1, 0,  {
                                directiveName: '文字',
                                directive: 'text'
                            });
                    }
                }
                $scope.removeItem = function(index){
                    $scope.model.schema.splice(index, 1);
                }
                $scope.closeSidebar = function(index) {
                    
                     $mdSidenav('right-'+index).close();
                }

                $scope.settingItem = function(index){
                    $mdSidenav('right-'+index).toggle().then(function(result){

                    });
                }
                $scope.isSetting = function(directive){
                    if (!angular.isUndefined(directive.settings) && directive.settings)
                        return true;
                    else
                        return false;
                }

                $scope.choose = function(sm,i){
                    sm.directive = i;
                }
                $scope.openSettings = function(sm){
                    console.log(sm.directive);
                    $scope.currentDirecive = sm.directive;
                    $mdSidenav('right').toggle().then(function(result){
                           sm.directive = $scope.currentDirective;
                    });
                }

                $scope.selectFormAndClose = function(){
                    $mdDialog.hide($scope.selectedForm);
                }
                $scope.close = function() {
                    var json = JSON.parse(angular.toJson($scope.model));
                    $mdDialog.hide($scope.model.name);
                }
                $scope.finish = function() {

                    var confirm = $mdDialog.confirm()
                      .title('你是否確定編輯？')
                      .textContent('之前表格的資料有機會不能顯示，甚至操作異常。請注意。')
                      .targetEvent($element)
                      .ok('確定')
                      .cancel('取消');

                    $mdDialog.show(confirm).then(function(result) {
                        $scope.generate();
                    }, function() {

                    });
                    $scope.generate();
                    $scope.setOrder(2);
                }
        }
    };
    return link;
});