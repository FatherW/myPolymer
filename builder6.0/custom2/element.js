var app = angular.module('demoApp');
require(['store'],function(store){
    app.directive('custom2', function ($compile) {
        var custom = {
            restrict: 'A',
            priority: 2000,
            scope: true,
            link: function (scope, element, attrs) {
                // setTimeout(function () {
                console.log('Link2');
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
                
                 element.bind("mouseenter", function(event) {
                 console.log('Custom2 Mouse Enter');

                            element.prepend("<dazzle-toolbar></dazzle-toolbar>");
//                            scope.useTemplate();
                  });
                  
                   element.bind("mouseleave", function(event) {
                        console.log('Custom2 Mouse Leave');
                        $('dazzle-toolbar').remove();
//                        element.parent().unwrap();
                  });


                element.bind('dblclick',function(event)  {
                        element.find('.dazzle-screen').hide();
                        
                });


                  
                  
                 

                    function dropFn(direction) {
                        var dragId =store.get('dragContentId');
                        var dropId =store.get('dropId');
                        var containerDropId = store.get('containerDropId');
                        
                        var code = $('#'+dragId)[0].outerHTML;
//                        var dragObject = $('#'+dragId);
//                        console.log(dragObject);
                        
                        var vacuum = $('#'+containerDropId).children('[context-menu]').eq(0).html();
                        
                        if (vacuum) {
                            console.log('Vacuum');
                            console.log('Drag Id',dragId);
                            console.log('Drop Id',dropId);
                        
                            var DropEle = $('#'+dropId);                
//                            var $clone = $('#'+dragId).clone();
//                            $clone.wrap('<div>');
//                            var code = $clone.parent().html();
                            $('#'+dragId).remove();
                            var html = angular.element(code);
                            
                            if (direction =="up")
                                html.insertAfter(DropEle);
                            else
                                html.insertBefore(DropEle);
                            
                                $compile(html)(scope);

                        } else {
                            var DropEle = $('#'+containerDropId);                
//                            var $clone = $('#'+dragId).clone();
//                            $clone.wrap('<div>');
//                            var code = $clone.parent().html();

                            $('#'+dragId).remove();
                            var html = angular.element(code);
                            DropEle.children('[context-menu]').eq(0).append(html);
                                $compile(html)(scope);

                        
                        }
                        
                               // angular.element(document.getElementById('editor-header')).scope().saveAtom();
                    
                    }

          },
          
          
          controller: function ($scope, $http, $element, $attrs,$dazzlePopup,$mdDialog) {
          
            $element.find('md-toolbar').hide();
            $element.find('.dazzle-screen').hide();
            $scope.up = function() {
                console.log('Up');
                var id = $element.attr('id');
                var element;
                var pid;
                element = $('#'+id).parent().closest('.dazzle-custom');
                pid = element.attr('id');
                console.log('PID',pid);
                if (!angular.isUndefined(pid)){
                    $scope.atom[id].toolbar = false;
                    $scope.atom[pid].toolbar = true;                
                }
             
            }
            $scope.addElement = function() {
                    $dazzlePopup.addElement($scope).then(function(ele) {
                    console.log('Add Element',ele);
                    var html = angular.element(ele.code);
                    $compile(html)($scope);
//                    $element.children('[context-menu]').eq(0).append(html);
                      html.insertAfter($element);
 
                    setTimeout(function(){
                        $scope.$apply();
                        $element.remove();
                    },500);

                });

            }
            $scope.dbsettings = function() {
                var confirm = $mdDialog.prompt()
                  .title('請輸入對應的資料欄位')
                  .textContent('儲存時，會直接更新資料')
                  .initialValue('')
                  .required(true)
                  .ok('OK')
                  .cancel('Cancel');
            
                $mdDialog.show(confirm).then(function(result) {
                        $element.attr('field',result);
                }, function() {

                });
            }
            $scope.remove= function(){
                console.log('Remove');
                $element.remove();
            }
          }
        };
        return custom;
    });
});
