var app = angular.module('demoApp');
app.directive('dzMaster', function ($compile, $mdDialog,$dazzleUser,$dazzleS3,$http,
    pageInfo,userInfo,atomInfo,dzS3,dzFn) {
    var master = {
//        require: '^^dzContainer',
        restrict: 'A',
        priority: 1000,
        scope: true,
        
        compile : function(elements, attributes){
            return{
                pre : function($scope,$element,attribute) {
                        console.log('Load DZ Master');    
                        dzFn.checkAtom($element);
                        var id = $element.attr('id');
                        atomInfo.atom[id].master = true;
                        console.log('My Master',atomInfo.atom);

                        dzS3.loadMasterAtomById(id).then(function(master){
                            console.log('My Master',master);
                            $element.html(master.html);
                        },function(){
                            atomInfo.atom[id]['html'] = $element.html(); 
                            dzS3.saveAtomById(id,atomInfo.atom[id]); 
                        });
            
                                                

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

        }
    };
    return master;
});
