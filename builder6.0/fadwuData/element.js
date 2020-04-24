var app = angular.module('demoApp');

app.directive('fadwuData', function ($compile, $templateRequest, $mdDialog, $uibModal, $dazzlePopup,$dazzleData) {
    var fadwuData = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "fadwuData";
            scope.type = "fadwuData";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.data = element.attr('data');
            scope.datafilter = element.attr('datafilter');
            scope.pageSize = element.attr('size') || 10;
            scope.editorCustomInit(scope, element, attrs).then(function () {
               
                
                if (!angular.isUndefined(scope.model.db)){
                    //var db
                    $fadwuData.loadDataByModelDb(scope.model.db).then(function(record){
                        scope.model.data = record;
                    });
                    
                    //scope.useTemplate();
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


             $scope.loadData = function () {
                    return new Promise(function (resolve, reject) {
                        console.log(scope.data);
                        $scope.years=[];
                        $scope.getJson($scope.userBucket, $scope.websiteKey + "content/" + $scope.data + "-data.json").then(function (json) {

                            angular.forEach(json,function(item,index){
                               if ($scope.years.indexOf(item['Year'])== -1) {
                                    $scope.years.push(item['Year']);
                                    $scope.model.data[item['Year']]=[];                     
                                    console.log(item['Year']);
                               }
                            });
                            angular.forEach(json,function(item,index){
                               $scope.model.data[item['Year']].push(item); 
                            });
//                            $scope.useTemplate();

                            resolve(json);
                        });
                    });
                }
            
            //$scope.loadYear();    
            $scope.loadData().then(function(){
                console.log('Load Data',$scope.model.data);
            });

            $scope.loadYear = function(){
                $scope.years = [];
                console.log('Load Year');
                var curYear = (new Date()).getFullYear();
                for (i=0; i<10; i++){
//                    $scope.model.data[curYear]=[];
                    $scope.years[i]=curYear;
                    curYear --;
                }
            }
            $scope.loadDataByYear = function(year) {
                $scope.model.report =[];
                angular.forEach($scope.model.data,function(item,index){
                    if (item['Year']==year)
                        $scope.model.report.push(item);
                });
            }

            $scope.numberOfPages = function () {
                return Math.ceil($scope.model.data.length / $scope.pageSize);
            }


            $scope.menuOptions = [

                ["編輯資料", function () {
                    
                    $dazzlePopup.dataManagement($scope.websiteId, $scope.data).then(function () {
                        if (!angular.isUndefined($scope.model.db))
                            $fadwuData.loadDataByModelDb($scope.model.db).then(function(record){
                                $scope.model.data = record;
                                $scope.useTemplate();
                            });
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
                        if (!angular.isUndefined($scope.model.db))
                        $fadwuData.loadDataByModelDb($scope.model.db).then(function(record){
                            $scope.model.data = record;
                            $scope.useTemplate();
                        });
                    });
                }],
                ["資料欄位設定", function () {
                
                    var params = {
                        db:$scope.model.db|| {},
                      directive: '<db-setting-popup></db-setting-popup>'  
                    };
                    $dazzlePopup.callPopup(params).then(function(result){
                       $scope.model.db = result; 
                       console.log($scope.model);
                    });
                }]

            ];
            $scope.beforeAtomSaved = function () {

            }
            $scope.afterAtomSaved = function () {

            }
        }
    };
    return fadwuData;
});


app.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
