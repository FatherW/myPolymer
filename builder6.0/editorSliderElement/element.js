var app = angular.module('demoApp');
app.directive('editorSliderElement', function ($compile, $templateRequest, $mdDialog, $dazzlePopup,$dazzleData) {
    var editorSliderElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "//d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "editorSliderElement";
            scope.type = "editorSliderElement";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                if (angular.isUndefined(scope.model.images)) {
                    scope.model.images = [{
                        "bucket": "dazzle.website",
                        "path": "builder/6.0/images/image1.jpg"
                    }, {
                        "bucket": "dazzle.website",
                        "path": "builder/6.0/images/image2.jpg"
                    }, {
                        "bucket": "dazzle.website",
                        "path": "builder/6.0/images/image3.jpg"
                    }]
                }
                
                    
                    if (!angular.isUndefined(scope.model.db)){
                    //var db
                    

                    $dazzleData.getAtomData(scope.model.db).then(function(value){
                        
                           scope.model.images = value;
                           console.log('Slider',value);
                           scope.useTemplate();
                        });
                    } else 
                        console.log('No SLider DB');

                
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.myLink = function(link) {
                if (!link)
                    return "#";
                else
                    return link;
            }
            $scope.menuOptions = [
                ["編緝Slider", function () {
                
                    var params = {
                        'images': $scope.model.images || [],
                        'directive':"<gallery-popup></gallery-popup>"
                    };
                    $dazzlePopup.callPopup(params).then(function(images) {
                        $scope.model.images = images;
                        console.log($scope.model.images);
                        $scope.useTemplate();
                        
                        $dazzleData.saveRecord($scope.model.db,images).then(function(result){
                                console.log('Saved');
                        });    

                    });
/*                    
                    $mdDialog.show({
                        controller: "galleryPopupController",
                        templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/galleryPopup/popup.html' + '?id=' + new Date().getTime(),
                        locals: {
                            rootScope: $scope,
                            images: $scope.model.images || []
                        }
                    }).then(function (images) {
                        $scope.model.images = images;
                        $scope.useTemplate();
                    });
*/
                }],
                ["更換模版", function () {
                    $mdDialog.show({
                        controller: 'templatePopupController',
                        templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/templatePopup/popup.html' + "?id=" + new Date().getTime(),
                        locals: {
                            rootScope: $scope
                        }
                    }).then(function (template) {
                        $scope.useTemplate();
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
    return editorSliderElement;
});
