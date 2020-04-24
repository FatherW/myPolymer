var app = angular.module('demoApp');
app.directive('compnedForm', function ($compile, $templateRequest, $uibModal, $mdDialog,$dazzlePopup) {
    var compnedForm = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "compnedForm";
            scope.type = "compnedForm";
            //scope.data = element.attr('data');
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;

            scope.data = element.attr('formname');

            if (angular.isUndefined(scope.data)) {
                scope.data = 'mydataform';
            }

            scope.editorCustomInit(scope, element, attrs).then(function () {
            	//scope.thisPageJson.js.push('https://sdk.amazonaws.com/js/aws-sdk-2.2.22.min.js');
            	if(scope.thisPageJson.css.indexOf('http://dazzle.website/css/bootstrap.min.css')==-1){
					scope.thisPageJson.css.push('http://dazzle.website/css/bootstrap.min.css');
            	}

				console.log(scope.model);
            	if (angular.isUndefined(scope.model.receiveemail)) {
                	scope.model.receiveemail = '';
            	}
                if (angular.isUndefined(scope.model.form)) {

                    // default one email field    
                    scope.model.form = [{
                            "directive": "email",
                            "directiveName": "電郵",
                            "headerName": "電郵",
                            "field": "電郵",
                            "key": false,
                            "required": false,
                            "default": "",
                            "defaultByTimestamp": false,
                            "cellRenderer": "emailRenderer",
                            "cellEditor": "emailEditor"
                    }];

console.log('model.form', scope.model.form);

                    scope.updateHtml();
                }
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });
            });
        },
        controller: function ($scope, $element, $attrs) {

            $scope.loadData = function() {
                return new Promise(function (resolve, reject) {
                    $scope.getJson($scope.userBucket, $scope.websiteKey + "content/"+$scope.data+"-schema.json").then(function (json) {
                        $scope.model.form = json;
                        console.log(json);
                        $scope.updateHtml();

                        resolve(json);
                    }, function () {
                        $scope.saveJson($scope.userBucket, $scope.websiteKey + "content/"+$scope.data+"-schema.json", []);
                        resolve([]);
                    });
                });
            }

            $scope.menuOptions = [
               
                ["編輯表格及資料", function () {

                      $dazzlePopup.dataManagement($scope.websiteId, $scope.data,null,"form").then(function () {
                      
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
    return compnedForm;
});

