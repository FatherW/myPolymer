var app = angular.module('demoApp');
app.directive('dzMaster', function ($compile, $mdDialog,$dazzleUser,$dazzleS3,$http,$dazzleFn,pageInfo) {
    var master = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        
        compile : function(elements, attributes){
            return{
                pre : function($scope,$element,attribute) {
                        console.log('Load DZ Master');    
                        $scope.userBucket = $dazzleUser.getDazzleInfo('userBucket');
                        $scope.websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                        $scope.websiteId = $dazzleUser.getDazzleInfo('websiteId');
                        $scope.thisPage = $dazzleUser.getDazzleInfo('thisPage');
                        var id = $element.attr('id') || null;
                        
                        if (!id) {
                            id= new Date().getTime();                            
                            $element.attr('id',id);
                        }
                        
                       $element.html(pageInfo.getMaster(id));

                        
                            // console.log('Master ID',id,$scope.userBucket, $scope.websiteKey + 'page/_master/'+id+'.html');
                            //  $dazzleS3.getFile($scope.userBucket, $scope.websiteKey + 'page/_master/'+id+'.html').then(function (html) {
                            //     $element.html(html);
                            // });

                },
                post : function(scope, element, attribute){
                  
                  
                    element.bind('mouseover', function($event){
                        
                    });
                    element.bind('mouseenter',function($event){

                            
                    });
                    element.bind('mouseleave',function($event){

                    });
                    element.bind('mousemove', function($event){

                    });
                     element.bind('click', function($event){

                    });
                    
                    element.bind('dblclick', function($event){


                    });
                }
            };
        },
        link: function (scope, element, attrs) {
            console.log('Init DZ Master Link');
        },
        controller: function ($scope, $http, $element, $attrs) {
            console.log('Init DZ Master Container');
         //   $dazzleFn.editorCustomInit($scope,$element,$attrs);            

        }
    };
    return master;
});
