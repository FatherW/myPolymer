var app = angular.module('demoApp');
app.directive('jitpoMedi', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzlePopup, $ocLazyLoad,hotkeys,
dzFn,pageInfo,dzMenu) {
    var name = 'jitpoMedi';
    var link = {
        restrict: 'E',
        scope:  true,
        templateUrl: _cdn+"builder6.0/"+name+"/element.html?id=" + new Date().getTime(),
        css: {
          href: "//d27btag9kamoke.cloudfront.net/builder6.0/"+name+"/element.css?id=" + new Date().getTime(),
          preload: true
        },
          compile : function(elements, attributes){
                    return{
                        pre : function($scope,$element,attribute) {
                            $scope.title = [
                                '一些我做了會令我感覺良好的事',
                                '一些我做了會令我的人生更有意義的事',
                                '一些我做了會令我引以自豪的事',
                                '一些我平日享受做的事',
                                '當我感覺不快時能夠令我重新感覺良好的事',
                                '在我生命中最重要的事',
                                '我的家人, 他們是我最安全的後盾'
                            ];                                      
                            
        //                       <div id="medi">
        //   <h3>一些我做了會令我感覺良好的事</h3>
        //   <div class="accord-panel" context-menu="menuOptions">
        //       <ul>
        //         <li>點一</li>
        //         <li>點二</li>
        //     </ul>

        //   </div>


        // </div>
        
                                $scope.content =[];
                               
                             $element.find('.accord-panel').each(function(){
                                 var html = $(this).html();
                                 $scope.content.push(html);
                             });
                             
                              $scope.title = [];
                              $element.find('.ui-accordion-header').each(function(){
                                 var html = $(this).html();
                                 $scope.title.push(html);
                             });

                             var ele = angular.element("<div id='medi'></div>");
                             for(i=0;i<$scope.title.length;i++){
                                 ele.append("<h3>"+$scope.title[i]+"</h3>");
                                 ele.append("<div class='accord-panel'>"+$scope.content[i]+"</div>");
                             }
                             console.log(ele);
                             //$element.html('');
                             //$element.append(ele);
                             
                            
                            
                            if (!$scope.isAdmin)
                                   $ocLazyLoad.load(['https://code.jquery.com/jquery-1.12.4.js','https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css','https://code.jquery.com/ui/1.12.1/jquery-ui.js'], {cache: false}).then(function () {
                                        $( "#medi" ).accordion({
                                            active: false,
                                            collapsible: true
                                        });
                                    },function(){
                    
                    				 });
                    			else
                    			    $( "#medi" ).accordion({
                                            active: false,
                                            collapsible: true
                                        });
                          
                        },
                        post:function($scope,$element,attrs,ctrls) {
                            
                              var editMode = store.get('editMode') || 'normal';
                                if (editMode=='admin')
                                    $scope.isAdmin = true;
                                else
                                    $scope.isAdmin = false;
                                    
                                    
                                
                                // $element.bind('contextmenu', function($event){
                                //   console.log($event.clientX+','+$event.clientY);
                                //     $dazzleUser.dazzleInfo['panelButtonPos'] = [$event.clientX,$event.clientY]; 
                                //     scope.isEdit = true;
                                //     var ele = angular.element($event.target);
                                    
            
                                //     $dazzleUser.dazzleInfo['editElement'] = ele;
                                //     console.log('Context Menu',$dazzleUser.dazzleInfo['editElement']);
                                    
                                //     ele = dzFn.findEditElement();
                                    
                                    
                                //     $event.preventDefault();
                                //     $event.stopPropagation();
                                // });    
                                
                                
                //              },function(){
            
            				//  });
                        }
                    }
          },

        controller: function ($scope, $element, $attrs, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
            
            $scope.content = ['hello0','hello0','hello0','hello0','hello0','hello0','hello0'];
            $scope.load = function(){
                var i =0;
                $element.find('.accord-panel').each(function(){
                   $(this).html($scope.content[i]);
                   i++;
                });
            }
            $scope.save = function(){
                $scope.content =[];
                $element.find('.accord-panel').each(function(){
                   var html = $(this).html();
                   $scope.content.push(html);
                });
                console.log($scope.content);
            }
            $scope.isAdmin = function(){
                var mode = store.get('editMode') || 'normal';
                if (mode=='admin')
                    return true;
                else
                    return false;
            }
            
             $scope.addEditPanel = function(target){
                
                $dazzleUser.dazzleInfo['panelEle'] = target;
                $dazzleUser.dazzleInfo['oEle'] = target[0].outerHTML;
                var height,width,top,left,master,isMaster;
                
                height = target[0].offsetHeight;
                width = target[0].offsetWidth;  
                //top = target[0].offsetTop;
                //left = target[0].offsetLeft;
                top = target.offset().top;
                left = target.offset().left;
                master = target.attr('dz-master');
                if (!angular.isUndefined(master)) 
                    isMaster = true;
                else 
                    isMaster = false;
                
                var overlaySize = {
                  height: height,
                  width: width,
                  top: top,
                  left: left,
                  master: isMaster
                };
                
                $dazzleUser.dazzleInfo['panelSize'] = overlaySize;
                $('dz-panel').remove();
                $('dz-panel-toolbar').remove();
                $element.append('<dz-panel></dz-panel>');
                $compile($element.find('dz-panel'))($scope);
            }


          $scope.menuOptions = [
                            ["載入", function ($itemScope,$event) {
                               $scope.load();
                            }],

                            ["編輯", function ($itemScope,$event) {
                                console.log($event.currentTarget);
                                
                                 var ele = angular.element($event.currentTarget);
                                 $dazzleUser.dazzleInfo['panelEle']= ele;
                                dzMenu.quickAddPanel();
                            }],
                            ["儲存", function ($itemScope,$event) {
                                $scope.save();
                            }]
                        ];
        }
    };
    return link;
});
  

