var app = angular.module('demoApp');
app.directive('dbImage', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzlePopup,$dazzleData) {
    var dbImage = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
//        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/file6.0/directive-template.html",
        link: function (scope, element, attrs) {
            scope.http = "//d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dbImage";
            scope.type = "dbImage";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                 if (angular.isUndefined(scope.model.src))
                    scope.model.src = "http://dazzle.website/image/lgo.png";

                console.log('Db Text',scope.model.db);
                
              if (!angular.isUndefined(scope.model.db)){
                    //var db
                    $dazzleData.getAtomData(scope.model.db).then(function(value){
                        if (!value)
                            value = "http://dazzle.website/image/lgo.png";
                       scope.model.src = value;
                       console.log('Src',value);
                       scope.useTemplate();
                    });
                }
                
              
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });

            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["編緝圖片", function ($itemScope) {
                    $scope.featherEditor.scope = $scope;
                    $scope.featherEditor.launch({
                        image: 'img' + '-' + $scope.model.id,
                        url: $scope.model.src
                    });
                }],
                ["更換圖片", function () {
                    var params = {
                        directive:"<user-gallery-popup></user-gallery-popup>"
                    };

                    $dazzlePopup.callPopup(params).then(function(output){
                        //var image = output['image'];
                        var image = output;
                        $scope.copyFile($scope.userBucket + '/' + encodeURI(image.key), $scope.exportBucket, image.key).then(function () {
                            $scope.$apply(function () {
                                $scope.model.src = 'http://' + $scope.exportBucket + '/' + image.key;
                                $scope.useTemplate();
                                
                                console.log('DB',$scope.model.db);
                                if (!angular.isUndefined($scope.model.db)){
                                    $dazzleData.saveRecord($scope.model.db,$scope.model.src).then(function(result){
                                            console.log('Saved');
                                    });                 
                                }

                            });
                        });
                    
                    });

                }],
                ["資料管理", function ($itemScope) {
                    
                   
                    var params = {
                        db:$scope.model.db|| {},
                        'directive':'<db-setting-popup></db-setting-popup>'
                        
                    };
                    $dazzlePopup.callPopup(params).then(function(result){
                        console.log(result);
                       $scope.model.db = result; 
                    });
                    
                }]
            ];

        }
    };
    return dbImage;
});