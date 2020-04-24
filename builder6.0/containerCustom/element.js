var app = angular.module('demoApp');
    app.directive('concustom', function ($compile) {
        var custom = {
            restrict: 'A',
            priority: 1000,
            scope: true,
            link: function (scope, element, attrs) {
//                element.addClass('dazzle-custom');
//                element.addClass('dazzle-concustom');
               // element.prop('droppable',true);
                var id = element.attr('id');
                var toolbar = `
                <md-toolbar class="md-accent dazzle strColor">
                    <div class="md-toolbar-tools-dazzle">
                        <i class="fa fa-x fa-arrows" aria-hidden="true" ng-click="up()"></i>
                        <i class="fa fa-x fa-cog" aria-hidden="true"></i>
                        <i class="fa fa-x fa-bank" aria-hidden="true" ng-click="addElement()"></i>
                        <i class="fa fa-x fa-database" aria-hidden="true"></i>                            
                        <i class="fa fa-x fa-info" aria-hidden="true"></i>                            
                        <i class="fa fa-close right" ng-click="remove()"></i>
                    </div>
                  </md-toolbar>
                `;


       var startX,startY,start,stop,drag,container,x=0,y=0;

                element.bind('dragenter',function(event){
                    console.log('Container: drag enter',id);    
                    store.set('containerDropId',id);
                });
                element.bind('dragend',function(event){
                    var dragId,dragPageX,dragPageY;
                    var dropEle;
                    var dropId = store.get('dropId');
                    dragId= store.get('dragContentId');
                    dragPageX = store.get('dragPageX');
                    dragPageY = store.get('dragPageY');


                    console.log(dragId +" drops "+dropId);
  
                });


                 element.bind("mouseenter", function(event) {
//                        element.addClass('dazzle-frame');
//                        element.find('md-toolbar').removeClass('ng-hide');
//                        var newElement = $compile(toolbar)(scope);
//                        element.prepend(newElement);                            


                  });
                element.bind("mouseover",function(event){
                        var id=element.attr('id');
                        //console.log("Mouse Over",id);
                });

                 element.bind("mouseleave", function(event) {
                        var id = element.attr('id');
//                          element.find('md-toolbar').remove();
//                          element.removeClass('dazzle-frame');
                  });




          },
          
          
          controller: function ($scope, $http, $element, $attrs,$mdDialog,$dazzlePopup) {
            $scope.up = function() {
                console.log('Up');
                var id = $element.attr('id');
                var element;
                var pid;
                element = $('#'+id).parent().closest('.dazzle-custom');
                pid = element.attr('id');
                console.log('PID',pid);

            }
            $scope.remove= function(){
                console.log('Remove');
                $element.remove();
            }
            $scope.addElement = function(){

                $dazzlePopup.addElement($scope).then(function(ele) {
                    console.log('Add Element',ele);
                    var html = angular.element(ele.code);
                    $compile(html)($scope);
                    $element.children('[context-menu]').eq(0).append(html);

                    setTimeout(function(){
                        $scope.$apply();
                    },500);

                    
                    
                });
                
            }
          }
        };
        return custom;
    });
