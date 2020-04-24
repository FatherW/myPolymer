var app = angular.module('demoApp');
app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
app.directive('dzField2', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,$dazzlePopup,$dazzleData,$dazzleFn) {
    var dzField2 = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
        
        link: function (scope, element, attrs) {
            scope.http = "//d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dzField2";
            scope.type = "dzField2";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.myElement = element;
            $dazzleFn.editorCustomInit(scope,element, attrs).then(function (object) {
                
					var type = element.attr('type') || 'text';
                    var html = $dazzleFn.updateInputByType(scope,type);
                    element.html(html);
                    $compile(element.contents())(scope);
                    //   var content = element[0].outerHTML;
                    //     console.log('dz Image Content',content);
                    //     content = content.replace('dz-field2','dummy');
                    //     var src = element.attr('src');
                    //     var id = element.attr('id');
                    //     var html = '<panel>'+$dazzleUser.dazzleInfo['toolbar']+'<div class="dz-panel-content" context-menu="menuOptions">'+content+'</div></panel>';
                    //     var e = $compile(html)(scope);
                    //     element.replaceWith(e);
            });    
                 
        },
        controller: function ($scope, $element, $attrs) {
           
           
           $scope.myFunct = function(keyEvent) {
              if (keyEvent.which === 13) {
                    console.log($scope.model);
                    $dazzleUser.dazzleInfo['atom'][$scope.model.id] =$scope.model;
 //                   if ($scope.model.isDb)
//                        $dazzleFn.saveDataValue($scope.model.db,$scope.model.data);
                    $dazzleFn.saveElasticAtom($scope.model.id,$scope.model,false).then(function() {
						console.log('Model',$scope.model);
						$element.html($scope.model.data);						
					});
					
//                    $element.dblclick();
              }
            }
            

                        $scope.menuOptions = [
                 
                             ["資料管理", function () {

                                if ('isDb' in $scope.model) {
                                    $scope.model.isDb = true;
                                    $scope.model.db = {};
                                }
                                var params = {
                                    db:$scope.model.db|| {},
                                    'directive':'<db-setting-popup></db-setting-popup>'
                                    
                                };
                                $dazzlePopup.callPopup(params).then(function(result){
                                    console.log(result);
                                    
                                    if(result === null) {
                                        $scope.model.isDb = false;
                                        $scope.model.db = {}; 
                                    } else {
                                        $scope.model.isDb = true;
                                        $scope.model.db = result; 
                                    }
                                    $dazzleFn.saveElasticAtom($scope.model.id,$scope.model,false).then(function(){
										console.log($scope.model);
										$dazzleFn.useTemplate($scope.model);
										
									});
									

                                    
                                },function(err){

                                });
                                
                            }],["刪除", function () {
                                $element.remove();
                            }]
                        ];

         
        }
    };
    return dzField2;
});