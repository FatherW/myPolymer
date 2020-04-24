var app = angular.module('demoApp');
var _cdn = "//d27btag9kamoke.cloudfront.net/";
app.directive('yesicanNews', function ($window,$compile, $templateRequest, $mdDialog, $dazzlePopup,dzFn,atomInfo,dbFactory) {
    var dzSlider = {
        restrict: 'E',
        priority: 1000,
        scope: true,
//        templateUrl: _cdn+"builder6.0/yesicanNews/element.html?id=" + new Date().getTime(),
        css: {
          href: "//d27btag9kamoke.cloudfront.net/builder6.0/yesicanNews/element.css?id=" + new Date().getTime(),
          preload: true
        },
        link: function ($scope, element, attrs) {
            
                $scope.subUser = store.get('subUser') || null;
                console.log('Sub ',$scope.subUser);   
                $scope.isUser = function(){
                    if ($scope.subUser == null)
                        return false;
                    else
                        return true;
                }
                $scope.isAdmin = function(){
                    var editMode = store.get('editMode') || 'normal';
                    if (editMode =='admin')
                        return true;
                    else
                        return false;
                }
                if ($scope.isAdmin) {
                    $element.find('li').attr('context-menu','menuOptions');
                    $compile($element.contents())($scope);
                }
                                        
        },
        controller: function ($scope, $element, $attrs,$http,$location) {
                        $scope.menuOptions = [

                            ["新增新聞", function ($itemScope,$event) {
                                var ele = angular.element($event.currentTarget);
                                var id = ele.attr('id');
                                if (angular.isUndefined(id)){
                                    id =new Date().getTime();
                                    ele.attr('id',id);
                                }
            
                                var cloneEle = $('#'+id).clone();
                                cloneEle.attr('id',new Date().getTime());
                                
                                var ele2 = angular.element(cloneEle);
                                ele2.insertBefore(ele);
                                $compile(ele2)($scope);
                                
                            }],                         
                            ["刪除新聞", function ($itemScope,$event) {
                                var ele = angular.element($event.currentTarget);
                                ele.remove();
                            }],                         
                        
                        ];

        }
    };
    return dzSlider;
});

