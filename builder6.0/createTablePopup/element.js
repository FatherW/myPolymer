var app = angular.module('demoApp');
app.directive('createTablePopup', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var name = 'createTablePopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/createTablePopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "createTablePopup";
            scope.type = "createTablePopup";
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
                $scope.isTable = true;
                $dazzleFn.getUserForms($scope.uid,$scope.websiteId).then(function(forms){
                    
                    console.log(forms);
                    $scope.myForm = [];
                    $scope.myForm = forms;    
                });
                
              $scope.sizes = [
                  "small (12-inch)",
                  "medium (14-inch)",
                  "large (16-inch)",
                  "insane (42-inch)"
              ];
                  
                $scope.save = function() {
                    console.log($scope.model);
                }
				
				$scope.edit = function() {
				    $scope.model = $scope.selectedForm;    
				    console.log($scope.model);
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
				    return $scope.order = index;
				}
                $scope.init = function(){
                    $scope.schemas =[];
                    console.log('Hello');
                    $dazzleS3.getJson('dazzle-template','file6.0/form-schema-tpl.json').then(function(json){
                        
                        $scope.schemas = json;
                        console.log($scope.schemas);

                        $scope.schemaNames = [];
                        angular.forEach($scope.schemas,function(item,index){
                           $scope.schemaNames.push(item.directivename);
                        });
                    });

                    

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
                $scope.closeSidebar = function() {
                    
                     $mdSidenav('right').close();
                }


                $scope.choose = function(sm,i){
//                    var headerName = $scope.model.schema[sm];
 //                   $scope.model.schema[sm] = $scope.schemas[i];
   //                 $scope.model.schema[sm].headerName = headerName;
                    sm.directive = i;
                    $scope.currentDirective = i;
                    console.log(i);
                    if (!angular.isUndefined(i.settings) && i.settings) {
                        console.log('Open It');
                        $mdSidenav('right').toggle().then(function(result){
                            sm.directive = $scope.currentDirective;
//                            console.log('Hello');
                        });
                    }
                    // $scope.openSettings($scope.schemas[i]);
                }
                $scope.openSettings = function(directive){
                    console.log(directive);
                    $scope.currentDirecive = directive;
                    console.log($scope.currentDirective);
                        if (!angular.isUndefined($scope.currentDirective.settings) && settings) {
                            console.log('Open It');
                            $mdSidenav('right').toggle();
                        }
                }
                $scope.close = function() {
                    var json = JSON.parse(angular.toJson($scope.model));
                    $mdDialog.hide(json);
                }
                $scope.finish = function() {
                    
                    $scope.generate();
                    $scope.setOrder(2);
                }
        }
    };
    return link;
});