var app = angular.module('demoApp');
app.directive('dazzleForm3', function ($compile, $templateRequest, $uibModal, $mdDialog,$dazzlePopup,$dazzleUser,$dazzleInit,$dazzleS3) {
    var dazzleForm3 = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "//d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dazzleForm3";
            scope.type = "dazzleForm3";
            //scope.data = element.attr('data');
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;

            scope.data = element.attr('formname');

            if (angular.isUndefined(scope.data)) {
                scope.data = 'mydataform';
            }

            scope.editorCustomInit(scope, element, attrs).then(function () {
            	//scope.thisPageJson.js.push('https://sdk.amazonaws.com/js/aws-sdk-2.2.22.min.js');
            	scope.thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');
            	
            	if(scope.thisPageJson.js.indexOf('http://d25k6mzsu7mq5l.cloudfront.net/file6.0/dazzleForm3.js')<0){
            		scope.thisPageJson.js.push('http://d25k6mzsu7mq5l.cloudfront.net/file6.0/dazzleForm3.js');
            	}
                if(scope.thisPageJson.js.indexOf('http://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/js/aws-sdk-2.169.0.min.js')<0){
            		scope.thisPageJson.js.push('http://d25k6mzsu7mq5l.cloudfront.net/file6.0/dazzleForm3.js');
            	}
            	
            	if(scope.thisPageJson.css.indexOf('http://dazzle.website/css/bootstrap.min.css')<0){
					scope.thisPageJson.css.push('http://dazzle.website/css/bootstrap.min.css');
            	}
            	
            	$dazzleUser.setDazzleInfo('thisPageJson');
            	element.attr('myangular-controller','formController');

				console.log(scope.model);
            	if (angular.isUndefined(scope.model.receiveemail)) {
                	scope.model.receiveemail = '';
            	}
                if (angular.isUndefined(scope.model.form)) {

                    scope.formInit();


                } else {
                    var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                    element.html(template);
                    scope.$apply(function () {
                        $compile(template)(scope);
                    });
                    
                }
            });
        },
        controller: function ($scope, $element, $attrs) {


            $scope.userBucket = $dazzleUser.getDazzleInfo('userBucket');
            $scope.websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
            $scope.formInit = function() {
                var params = {
                    name: "formSetting",
                    formid: $scope.model.formid || 'form-'+ new Date().getTime(),
                    form: $scope.model.form,
                    directive:"<form-setting></form-setting>"
                };

                $dazzlePopup.callPopup(params).then(function(output) {
                    console.log('My Form Params',output);
                    $scope.model.form= output;
                    // angular.forEach(output.schema,function(item,index){
                    //     item.directive.headerName = item.headerName;
                    //     $scope.model.form.push(item.directive);
                    // });
                    console.log($scope.model.form);

//                    $scope.data = output.formid;
                    $scope.model.formid = output.formid;
                    $scope.model.receiveemail = output.email;
                    $scope.receiveemail=output.email;

                    var table = {
                        "data": {
                            "type": "s3",
                            "index":$dazzleUser.getUser().uid,
                            "table":output.formid
                        },
                        "buttons": []
                    };
                    // save Table Json
                    $dazzleS3.saveJson($dazzleUser.getDazzleInfo('userBucket'), $dazzleUser.getDazzleInfo('websiteKey') + "content/"+output.formid+"-table.json", table);

                    // save Schema Json
                    $dazzleS3.saveJson($dazzleUser.getDazzleInfo('userBucket'), $dazzleUser.getDazzleInfo('websiteKey') + "content/"+output.formid+"-schema.json", $scope.model.form);
                    // save Data json
                    $dazzleS3.getJson($dazzleUser.getDazzleInfo('userBucket'), $dazzleUser.getDazzleInfo('websiteKey') + "content/"+output.formid+"-data.json").then(function(json){
                            $scope.data = json;
                    },function(err){
                        $dazzleS3.saveJson($dazzleUser.getDazzleInfo('userBucket'), $dazzleUser.getDazzleInfo('websiteKey') + "content/"+output.formid+"-data.json",[]);
                    });

                    // update Html
                    var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                    element.html(template);
                    $scope.$apply(function () {
                        $compile(template)($scope);
                    });

                });
            }
            $scope.loadData = function() {
                return new Promise(function (resolve, reject) {
                    $scope.getJson($scope.userBucket, $scope.websiteKey + "content/"+$scope.model.formid+"-schema.json").then(function (json) {
                        $scope.model.form = json;
                        console.log(json);
                        $scope.updateHtml();

                        resolve(json);
                    }, function () {
                        $scope.saveJson($scope.userBucket, $scope.websiteKey + "content/"+$scope.model.formid+"-schema.json", []);
                        resolve([]);
                    });
                });
            }

            $scope.menuOptions = [
                /*["編緝表格", function ($itemScope) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'models/formPopup/popup.html' + '?id=' + new Date().getTime(),
                        controller: 'formPopupCtrl',
                        size: 'lg',
                        resolve: {
                            rootScope: function () {
                                console.log('resolve scope', $scope);
                                return $scope;
                            },
                            menu: function () {
                                console.log('Resolveform', $scope.model.form);

                                return $scope.model.form;
                            },
                            table : function () {

                                return $scope.data;
                            }

                        }
                    });
                    modalInstance.result.then(function (menu) {

                        $scope.model.form = menu;
                        $scope.useTemplate();
                    }, function() {
                        console.log('cancel');
                    });
                }],*/

                ["編輯表格", function () {
                    $scope.formInit();

                }],
                ["編輯資料", function () {

                        console.log('My Model',$scope.model);
                      $dazzlePopup.dataManagement($scope.websiteId, $scope.model.formid,null,"form").then(function () {
                             $scope.loadData();
                      });
                      
                }],
                ["編輯接收電郵", function () {

                     var confirm = $mdDialog.prompt()
                      .title('想用什麼電郵接收表格?')
                      .ok('確認')
                      .cancel('取消');

                    $mdDialog.show(confirm).then(function(result) {
                            $scope.model.receiveemail=result;
                            $scope.receiveemail=result;
                            console.log(result);
                    }, function() {
                            alert('取消了');
                    });
                }],
                ["更換模版", function () {
                    $mdDialog.show({
                        controller: 'templatePopupController',
                        templateUrl: 'models/templatePopup/popup.html' + "?id=" + new Date().getTime(),
                        locals: {
                            rootScope: $scope
                        }
                    }).then(function (template) {
                        $scope.useTemplate();
                    });
                }]
            ];

            $scope.beforeAtomSaved = function () {

            }
            $scope.afterAtomSaved = function () {

            }
        }
    };
    return dazzleForm3;
});

