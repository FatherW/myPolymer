var app = angular.module('demoApp');
require(['store'],function(store){
    app.directive('dazzleMenuItem', function ($compile) {
        var dazzleMenuItem = {
            restrict: 'A',
            scope: true,
            link: function (scope, element, attrs) {
                var id = element.attr('id');

                  element.prop('draggable', true);
                var startX,startY,start,stop,drag,container,x=0,y=0;

                  element.on('dragstart', function(event) {
                        store.set('dragContentId',id);
                    console.log('Drag',id);
                        store.set('dragPageX',event.pageX);
                        store.set('dragPageY',event.pageY);
                        console.log(event);
                  });


                element.bind('dragover',function(event){
                    console.log('drag over',id);            
                });
                element.bind('dragenter',function(event){
                    console.log('drag enter',id);    
                    store.set('dropId',id);
                    
                });
                element.bind('dragend',function(event){
                    var dragId,dragPageX,dragPageY;
                    var dropEle;
                    var dropId = store.get('dropId');
                    dropELe = angular.element( document.querySelector( '#'+dropId ) );
                    console.log('Drop ID',dropId);
                    console.log('drag end',id);      
                    dragId= store.get('dragContentId');
                    console.log('Drag ID',dragId);
                    dragPageX = store.get('dragPageX');
                    dragPageY = store.get('dragPageY');
                    console.log(dragPageX+','+dragPageY);
                    console.log(event);
                    console.log(event.pageX+','+event.pageY);
                    
                    if (dragId !=dropId){
                    
                        if (event.pageY > dragPageY)
                            dropFn("up");
                        else
                            dropFn("down");
                    }
                });
                element.bind('dragleave',function(event){
                    console.log('drag leave',id);            
                });
                element.bind('drop',function(event){
                    console.log('drop',id);            
                });
                 


                    function dropFn(direction) {
                        var dragId =store.get('dragContentId');
                        var dropId =store.get('dropId');
                        var containerDropId = store.get('containerDropId');
                        
                        var code = $('#'+dragId)[0].outerHTML;
                        
                            console.log('Drag Id',dragId);
                            console.log('Drop Id',dropId);
                        
                            var DropEle = $('#'+dropId);                
                            $('#'+dragId).remove();
                            var html = angular.element(code);
                            
                            if (direction =="up")
                                html.insertAfter(DropEle);
                            else
                                html.insertBefore(DropEle);
                            
                                $compile(html)(scope);

                        
                            angular.element(document.getElementById('editor-header')).scope().saveAtom();
                    
                    }

          },
          
          
          controller: function ($scope, $http, $element, $attrs,$dazzlePopup,$mdDialog) {
              $element.bind('mouseenter',function(event) {
                var toolbar = `
                      <md-toolbar class="md-accent dazzle">
                                <div class="md-toolbar-tools-dazzle">
                                    <i class="fa fa-x fa-plus" aria-hidden="true" ng-click="insert()"></i>
                                    <i class="fa fa-x fa-minus" aria-hidden="true" ng-click="remove()"></i>
                                </div>
                              </md-toolbar>           
                    `;
                    
                    $element.prepend(toolbar);
                    $element.find('md-toolbar').show();
                });
                $element.bind('mouseleave',function(event) {
                    $element.find('md-toolbar').hide();
                    $element.find('md-toolbar').remove();
                
                });

            $scope.remove= function(){
                console.log('Remove');
                $element.remove();
            }
            $scope.insert = function() {
                var egg = $element.clone();
                egg.insertAfter($element);
                $compile(egg)($scope);
            }
          }
        };
        return dazzleMenuItem;
    });
});