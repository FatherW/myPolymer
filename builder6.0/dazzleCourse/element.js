var app = angular.module('demoApp');

app.directive('dazzleCourse', function ($compile, $templateRequest, $mdDialog, $uibModal, $dazzlePopup,$dazzleS3) {
    var dazzleData = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dazzleData";
            scope.type = "dazzleData";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.data = scope.thisPageJson.exportDatas['Tutor']+"-course";
            scope.datafilter = element.attr('datafilter');
            scope.pageSize = element.attr('size') || 10;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                scope.loadData = function () {
                    return new Promise(function (resolve, reject) {
                        console.log(scope.data);
                        scope.getJson(scope.userBucket, scope.websiteKey + "content/" + scope.data + "-data.json").then(function (json) {
                            scope.model.data = [];
                            angular.forEach(json,function(item,index) {
                                if (item['Tutor']==scope.thisPageJson.exportDatas['Tutor'])
                                    scope.model.data.push(item);
                            });
                            console.log(scope.model.data);
                            //                        $scope.updateHtml();
                            scope.useTemplate();

                            resolve(json);
                        }, function () {
                            scope.saveJson(scope.userBucket, scope.websiteKey + "content/" + scope.data + "-data.json", []);
                            resolve([]);
                        });
                    });
                }
                scope.useTemplate();
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.currentPage = 0;

            $scope.numberOfPages = function () {
                return Math.ceil($scope.model.data.length / $scope.pageSize);
            }


            $scope.menuOptions = [

                ["編輯資料", function () {
                    var filter = {
                        key: 'Tutor',
                        data:[$scope.thisPageJson.exportDatas['Tutor'] ]
                    };
                    console.log(filter);
                    $dazzlePopup.dataManagement($scope.websiteId, $scope.data).then(function () {
                        if ($scope.loadData) {
                            $scope.loadData();
                        }
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
                    	console.log(template);
                        $scope.loadData();
                    });
                }]
            ];
            $scope.beforeAtomSaved = function () {
            
            
//                $dazzleS3.saveJson($scope.userBucket,$scope.websiteKey+'content/'+$scope.data+'-data.json',$scope.model.data).then(function(json) {
                    
                
 //               });
            }
            $scope.afterAtomSaved = function () {

            }
        }
    };
    return dazzleData;
});


app.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});