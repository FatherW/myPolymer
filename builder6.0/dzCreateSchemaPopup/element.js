var app = angular.module('demoApp');
app.directive('dzCreateSchemaPopup', function ($compile, $templateRequest, $mdDialog, $ocLazyLoad) {
    var name = 'dzCreateSchemaPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/dzCreateSchemaPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dzCreateSchemaPopup";
            scope.type = "dzCreateSchemaPopup";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element,$timeout,$q,$log, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser,$dazzleFn,$dazzleData,$sce) {
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
                $scope.tableId = params['tableId'];
                $dazzleFn.getUserForms($scope.uid,$scope.websiteId).then(function(forms){
                    
                    console.log(forms);
                    $scope.myForm = [];
                    $scope.myForm = forms;    
                });
                $scope.model = {};
              $scope.sizes = [
                  "small (12-inch)",
                  "medium (14-inch)",
                  "large (16-inch)",
                  "insane (42-inch)"
              ];
                  
                $scope.save = function() {
                    console.log($scope.schemas);
                    console.log($dazzleUser.getUser(),$scope.tableId);
                    var uid = $dazzleUser.getUser().uid;
                    angular.forEach($scope.schemas,function(item,index){
                        console.log(item);
                        var data = {
                                    id : $scope.tableId+"-"+ item['fieldName'],
                                    websiteId: uid,
                                    tableId : $scope.tableId,
                                    fieldName : item['fieldName'],
                                    directive : item['directive'],
                                    object : JSON.stringify(item['model']),
                                    order : index,
                                    isKey: item['isKey']
                                };
                        console.log(data);
                        
                        $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                            "data": {
                                "action": "addData",
                                "index": uid,
                                "type": "_schema",
                                "id": $scope.tableId+"-"+ item['fieldName'],
                                "body": data
                            }
                        }).then(function (result) {
                            console.log('Save Result',result);
                    
                        });
                    });
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
                                "isKey": false
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
                    
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "searchData",
                            "index": $dazzleUser.getUser().uid,
                            "type": "_schema",
                            "body": {
                                "query":{
                                    "match": {
                                        "tableId" : $scope.tableId
                                    }
                                },
                                "sort" : [
                                    { "order" : {"order" : "asc"}},
                                ]
                            }
                        }
                    }).then(function (result) {
                    
                        if (result.data.code>0){
                            $scope.schemas = result.data.resolve;
                        } else {
                            $scope.schemas = [];
                        }
                        if (!$scope.schemas.length)
                            $scope.schemas.push({
                                isKey:true,
                                fieldName: 'ID',
                                mapping:'keyword',
                                directive:'text',
                                model: {}
                            });
                        console.log('Schemas',$scope.schemas);

                    });
                    


                    
                    $scope.currentSelection = [
                        
                        ];
                    console.log('Hello',$scope.schemas);
                    
                    // $dazzleS3.getJson('dazzle-template','file6.0/form-schema-tpl.json').then(function(json){
                        
                    //     $scope.schemas = json;
                    //     console.log($scope.schemas);

                    //     $scope.schemaNames = [];
                    //     angular.forEach($scope.schemas,function(item,index){
                    //       $scope.schemaNames.push(item.directivename);
                    //     });
                    // });

                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "searchData",
                            "index": "dazzle",
                            "type": "backend",
                            "body": {
                                "query":{
                                    "bool":{
                                        "should":[
                                            {"term": {"owner":"dazzleadmin"}},
                                            {"term":{"owner": $dazzleUser.getUser().uid }}
                                        ]
                                    }
                                }
                            }
                        }
                    }).then(function (result) {
                        console.log('Type',result);
                    
                        if (result.data.code>0){
                            $scope.types = result.data.resolve;
                        } else {
                            $scope.types = [];
                        }
                        
                        
                    });

                    

                }
                
                $scope.generate = function() {
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "createIndex",
                            "index": $dazzleUser.getUser().uid+"."+$scope.tableId
                        }
                    }).then(function (result) {
                        console.log('Create table',result);

                    });
                    // console.log($scope.model);                    
                    // if (!$scope.isTable){
                    //     // Form table
                    //     $scope.model.data = {
                    //         "type":"s3"  
                    //     };
                    //     $scope.model.button = [];
                    //     $dazzleData.saveFormByName($scope.model.name,$scope.model);
                    //     var mySchema = [];
                    //     var schemaItem = {};
                    //     angular.forEach($scope.model.schema,function(item,index){

                    //       console.log('Schema Item',schemaItem);
                    //       schemaItem = item.directive;
                    //       schemaItem.headerName = item.headerName;
                    //       mySchema.push(schemaItem);
                    //     });
                    //     $dazzleData.saveSchemaByName($scope.model.name,JSON.parse(angular.toJson(mySchema)));
                    //     $dazzleData.initDataByName($scope.model.name);
                    // }

                }
                
                $scope.addItem = function(index){
                    if (index==-1)
                        $scope.schemas.push( {
                                fieldName: 'ID',
                                directive: 'text',
                                key:true,
                                mapping: 'keyword',
                                model: {},
                                isKey: true
                        });
                    else {
                        $scope.schemas.splice(index+1, 0,  {
                                directive: 'text',
                                mapping: 'keyword',
                                key:false,
                                headerName:'新項目',
                                model: {},
                                isKey: false
                        });
                    }
                }
                $scope.removeItem = function(index){
                    $scope.schemas.splice(index, 1);
                }
                $scope.closeSidebar = function() {
                    
                     $mdSidenav('right').close();
                }


                $scope.choose = function(item){
                        $scope.currentType = item.field;
                        var type = item.field;
                        console.log('Open It');
                        
                        var params = {
                            name: type,
                            directive: '<'+type+'-backend-settings></'+type+'-backend-settings>',
                            model: item.model
                        };
                        $scope.callSidenav(params).then(function(result){
                                console.log(result);                        
                        });

                        // $mdSidenav('right').toggle().then(function(result){

                        // });
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
                $scope.getTemplateUrl = function() {
                    var url,id;
                    // id = $scope.currentType.id;  
                    console.log('ID',$scope.currentType);
                    id = $scope.currentType;
                    src= '//d25k6mzsu7mq5l.cloudfront.net/backend6.0/'+id+'/setting2.html';
                    return $sce.trustAsResourceUrl(src);
                }
                
                $scope.callSidenav = function (params) {
                    return new Promise(function (resolve, reject) {
                        $dazzleUser.setDazzleInfo('params', params);
                        var jss = [];
                        if (!angular.isUndefined(params.name) && params.name){
                            var directiveUrl = "https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/"+params.name+"/setting2.js" + "?id=" + new Date().getTime();
                            jss.push(directiveUrl);
                        }
    
                        var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/modelSidenav/popupModel.html" + "?id=" + new Date().getTime();
                        var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/modelSidenav/popup.js" + "?id=" + new Date().getTime();
                        jss.push(controllerUrl);
    					console.log(jss);
                        $ocLazyLoad.load(jss, {cache: false}).then(function () {
                            
                             var ele = $element.find('#popupDialog');
                             ele.html(params.directive);
                             $compile(ele.contents())($scope);
                            
                             $mdSidenav('right').toggle().then(function(result){

                             });
                            
                            
    //                         $mdSidenav.show({
    //                             templateUrl: templateUrl,
    //                             controller: modelPopupController,
    //                             clickOutsideToClose: true,
    //                             escapeToClose: true,
    //                             multiple: true
    //                         }).then(function (output) {
    // //                            var output = $dazzleUser.getDazzleInfo('output');
    // 							console.log('Success Load');
    //                             resolve(output);
    //                         }, function () {
    //                             reject();
    //                         });
                        });
                    });
                }
        }
    };
    return link;
});
