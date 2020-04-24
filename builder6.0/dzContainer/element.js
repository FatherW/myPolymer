function eleDepth(ele){
    return ele.parents().length;
}
                    
var app = angular.module('demoApp');

var target;
var isEdit = false;
var KeyCodes = {
    BACKSPACE : 8,
    TABKEY : 9,
    RETURNKEY : 13,
    ESCAPE : 27,
    SPACEBAR : 32,
    LEFTARROW : 37,
    UPARROW : 38,
    RIGHTARROW : 39,
    DOWNARROW : 40,
};



app.directive('dzContainer', function ($document,$compile, $templateRequest, $mdDialog,
        $dazzlePopup,$dazzleS3,$dazzleUser,hotkeys,userInfo,pageInfo,dzFn,dzS3,dzMenu,atomInfo) {
    
    var dzContainer = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        compile : function(elements, attributes){
            return{
                pre : function(scope,element,attribute) {
                                      
                        hotkeys.add({
                            combo: 'ctrl+z',
                            callback: function() {
                                console.log('New and Old',$dazzleUser.dazzleInfo['panelEle'] ,$dazzleUser.dazzleInfo['oEle']);
                                var ele = angular.element($dazzleUser.dazzleInfo['oEle']);
                                var nEle = $dazzleUser.dazzleInfo['panelEle'];
                                var id = nEle.attr('id');
                                var attrs = ele.attr();
                                console.log('Attr',attrs);
                                for (var key in attrs){
                                    nEle.attr(key,attrs[key]);   
                                }
                                nEle.html(ele.html());

                            }
                        });                                                            
                      hotkeys.add({
                        combo: 'up',
                        description: 'This one goes to 11',
                        callback: function(e) {
                                console.log('Up');
                                 scope.depth += 1;
                                 $dazzleUser.dazzleInfo['myDepth'] = scope.depth;
                                 e.preventDefault();
                                 $('dz-overlay').remove();
                        }
                      });
                      
                      hotkeys.add({
                        combo: 'down',
                        description: 'This one goes to 11',
                        callback: function(e) {
                                    if (scope.depth<=0){
                                        $mdDialog.toast("已是最底層.");
                                        return;
                                    }
                                    
                                 scope.depth -= 1;
                                 $dazzleUser.dazzleInfo['myDepth'] = scope.depth;
                                 e.preventDefault();
                                 $('dz-overlay').remove();
                        }
                      });
                      
  
                    //userInfo.init();
					scope.user = $dazzleUser.getUser();
					scope.userBucket = 'dazzle-user-'+scope.user['uid'];
					scope.thisPage = decodeURIComponent(location.pathname);
					
					console.log('Page Info',pageInfo);
					pageInfo.init().then(function(){
                        //Load Body
                        console.log('Load Body');
                       $('dz-container').html(pageInfo.body);
                       $('dz-container').find('*').each(function(){
                           pageInfo.addID($(this)); 
                       });
                       pageInfo.mountAtom();
                    // $('dz-container').find( "*:not(:has(*))" ).attr('context-menu','conMenu($event)');

                    //  $('dz-container').find('a').attr('context-menu','aOptions');
                    //   $('dz-container').find('img').attr('dz-image','');
                    //  $('dz-container').find('img').attr('context-menu','menuOptions');
                    //  $('dz-container').find('li').attr('context-menu','liOptions');
                      $compile(element.contents())(scope);
                       var bodyScript = pageInfo.model.bodyScript || null;
                       $(bodyScript).insertAfter($('dz-container'));
					});


                },
                post : function(scope, element, attribute){
                    var isSingleClick = true;
                    var isCheck = true;
                    scope.myDepth = 0;
                    $dazzleUser.dazzleInfo['isCheck'] = true;
                    
                    $dazzleUser.dazzleInfo['isEdit'] = false;
                    scope.isEdit = false;
                    element.bind('mouseover', function($event){
                        var ele =  angular.element($event.target);
                        $dazzleUser.dazzleInfo['overlayEle'] = ele;
                        // console.log('Ele',ele);
                        // $('.dz-outline').removeClass('dz-outline');

                        // ele.addClass('dz-outline');
                      
                        var addPanel = $dazzleUser.dazzleInfo['addPanel'] || false;
                        var addDataPanel = $dazzleUser.dazzleInfo['addDataPanel'] || false;
                        
                        
                        // Check Whether it need overlay 
                        // Check what overlay it need
                        // update it's context menu
                        
                        
                        
                        if (addDataPanel){
                            dzFn.addDataPanel();
//                            scope.addDataPanel();
//                            $dazzleUser.dazzleInfo['addDataPanel'] = false;
                        } else if (addPanel){
                            dzFn.addPanel();
                            // scope.addPanel();
                            // $dazzleUser.dazzleInfo['addPanel'] = false;
                        }

                        $compile($('panel'))(scope);

                        switch(dzFn.needOverlay(ele)){
                            case 'master':
                                
                                break;
                                
                            case 'data':
                                
                                break;
                                
                            case 'atom':

                                // dzFn.newAddAtomOverlay(ele);
                                // $compile($('dz-atom-overlay'))(scope);
                                // scope.currentTarget = ele;
                                // $dazzleUser.dazzleInfo['isCheck'] = true;                             
                                
                                break;

                            
                            case 'normal':
                                dzFn.newAddOverlay(ele);
                                $compile($('dz-overlay'))(scope);
                                scope.currentTarget = ele;
                                $dazzleUser.dazzleInfo['isCheck'] = true;                            
                            break;
                        }

                        // if(dzFn.needOverlay(ele)) {
                        //     $('dz-overlay').remove();
                        //     dzFn.newAddOverlay(ele);
                        //     $compile($('dz-overlay'))(scope);
                        //     scope.currentTarget = ele;
                        //     $dazzleUser.dazzleInfo['isCheck'] = true;
                        // }


                        setTimeout(function(){
                            $dazzleUser.dazzleInfo['isCheck'] = false;
                          //  $('.dz-outline').removeClass('dz-outline');

                        }, 500);

                        
                    });
                      element.bind("DOMMouseScroll mousewheel onmousewheel", function(event) {
                           
                    	        // cross-browser wheel delta
                    	        var event = window.event || event; // old IE support
                    	        var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
                    	
                    	
        	                    if (scope.isEdit)
                        	        if(delta > 0) {
                                         scope.myDepth ++;
                                         $dazzleUser.dazzleInfo['myDepth']= scope.myDepth;
                                        console.log('Delta',delta,$dazzleUser.dazzleInfo['myDepth']);
                                        
                                        var editEle = dzFn.findEditElement(); 
                                        scope.addEditPanel(editEle);
                                        // for IE
                                        event.returnValue = false;
                                        // for Chrome and Firefox
                                        if(event.preventDefault) {
                                        	event.preventDefault();                        
                                        }
            
                                    }
                            });
        
                            element.bind("DOMMouseScroll mousewheel onmousewheel", function(event) {
                                   
                            	        // cross-browser wheel delta
                            	        var event = window.event || event; // old IE support
                            	        var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
                            	
                            	        if (scope.isEdit)
                                	        if(delta < 0) {
    
                                    
                                                if (scope.myDepth<=0){
                                                    return;
                                                }
                                	            
                            	                 scope.myDepth --;
                                                 $dazzleUser.dazzleInfo['myDepth']= scope.myDepth;
                                                console.log('Delta',delta,$dazzleUser.dazzleInfo['myDepth']);
                                                var editEle = dzFn.findEditElement(); 
                                                scope.addEditPanel(editEle);    
                                                // for IE
                                                event.returnValue = false;
                                                // for Chrome and Firefox
                                                if(event.preventDefault)  {
                                                	event.preventDefault();
                                                }
                    
                                            }
                            });

                    element.bind('mouseenter',function($event){
                        // console.log('it is mouseenter',$event.currentTarget);
                            
                    });
                    element.bind('mouseleave',function($event){
//                          scope.removeOverlay();
                         scope.isEdit = false;

                    });
                    element.bind('mousemove', function($event){
                        //console.log($event.clientX,$event.clientY);
                        $dazzleUser.dazzleInfo['currentPos'] = [$event.clientX,$event.clientY];
                        
                    });

                    element.bind('contextmenu', function($event) {
                        console.log($event.clientX+','+$event.clientY);
                        $dazzleUser.dazzleInfo['panelButtonPos'] = [$event.clientX,$event.clientY]; 
                        scope.isEdit = true;
                        var ele = angular.element($event.target);
                        

                        $dazzleUser.dazzleInfo['editElement'] = ele;
                        console.log('Context Menu',$dazzleUser.dazzleInfo['editElement']);
                        
                        ele = dzFn.findEditElement();
                        scope.addEditPanel(ele);
                    	$event.preventDefault();


                        // var tagName = $dazzleUser.dazzleInfo['editElement'][0].tagName; 
                        // $dazzleUser.dazzleInfo['editTagName'] = tagName;
                        // // scope.dzOptions =[];

                        // switch(tagName){
                        //     case 'DIV':
                        //         $('ul.dropdown-menu').find('a.dropdown-item').text('編輯區塊');
                                
                        //         break;
                        //     case 'LI':
                        //         $('ul.dropdown-menu').find('a.dropdown-item').text('編輯選單');
                                
                        //         break;
                        //     case 'A':
                        //         console.log('tag name',tagName);
                        //         $('ul.dropdown-menu').find('a.dropdown-item').text('編輯連結');
                        //         break;
            
                        //     case 'IMG':
                        //         console.log('tag name',tagName);
                        //         $('ul.dropdown-menu').find('a.dropdown-item').text('編輯圖片');
                        
                        //         break;
                                
                        //     default:
                        //         console.log('tag name',tagName);
                        //         break;

                            
                        // }
                        
                        
                        
                       

                    });
                     element.bind('click', function($event){
                        var ele = angular.element($event.target);
                        var tagName = ele[0].tagName;
                        var editEle;
//                        console.log('Click',tagName,$dazzleUser.dazzleInfo['myDepth']);
//                        if ($dazzleUser.dazzleInfo['isEdit'])
//                            $event.preventDefault();
                        scope.isEdit = false;
                        $('dz-panel').remove();
                        $('dz-panel-toolbar').remove();
                        $('md-tooltip').remove();
                        setTimeout(function(){
                            // editEle = $dazzleUser.dazzleInfo['editElement'];
                            // editEle.removeClass('dz-border');
                            // $dazzleUser.dazzleInfo['editElement'] = null;                        
                        }, 5000);
                        
                       // $('dz-panel').remove();
                        
                    });
                    
                    element.bind('dblclick', function($event){
                        console.log("It's a double click");
                         
                        isSingleClick = false;
                        
                        setTimeout(function(){
                            isSingleClick = true;
                            return;
                        }, 500);
                        
                        if($dazzleUser.dazzleInfo['isEdit']){
                            dzMenu.quickRemovePanel();
                                //ele.unwrap();
                                //ele.unwrap();
                                
                                // var html =ele.html();
                                // var id = ele.attr('id') || new Date().getTime();
                                // ele.attr('id',id);
                                // atomInfo.atom[id].html = html;
                                // $('.medium-editor-toolbar').remove();
                
                                // panel.find('md-toolbar').remove();
                                // ele2 = angular.element(html);
                                // panel.replaceWith(ele2);
                                // $dazzleUser.dazzleInfo['isEdit'] = false;
                                // $dazzleUser.dazzleInfo['isCheck'] = false;
                                // atomInfo.atom[panelId].html = html;
                                // console.log('Remove Panel Atom',atomInfo.atom);
                            
                            
                        } else {
                            dzMenu.quickAddPanel();
                        }
                        
                        
//                         $('dz-panel').remove();

//                         if ($('panel').length)
//                             dzFn.removePanel();
//                         else {
// //                            $dazzleUser.dazzleInfo['overlayEle'] = $dazzleUser.dazzleInfo['editElement'];
// //                            dzFn.addPanel($dazzleUser.dazzleInfo['overlayEle']);
// //                            dzFn.editElement();

//                             console.log('It is overlay',$event.currentTarget,$event.target);
// //                            $dazzleUser.dazzleInfo['overlayEle'] = $event.currentTarget;
//                             $dazzleUser.dazzleInfo['overlayEle'] = $dazzleUser.dazzleInfo['editElement'];

//                             dzFn.addPanel();
                            
//                         }

//                         scope.removePanel();
                     });
                     
                     
                }
            };
        },
        link: function (scope, element, attrs) {
            scope.http = "//d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dzContainer";
            scope.type = "dzContainer";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;

  
            
        },
        controller: function ($scope, $element, $attrs,$dazzleElastic) {

            console.log('Load Container');
             $scope.liOoptions = [
             	["向上複製", function ($itemScope,$event) {
                    
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
                    if (ele.parents('dz-data').length) {
                            alert('I find It');
                            // ele.closest( "dz-data" ).css('background','red');
                            // alert(ele.closest('dz-data').attr('id'));
                            
                            dzEle = ele.parents('dz-data')[0];
                            dzEle.css('border','red solid 1px');
                            ele.parents('dz-data').each(function(index){
                            //   console.log('DZ DATA',$(this)); 
                              console.log('DZ DATA',$(this).attr('id'));
                            });
                        } 

                    
                }],
                ["向下複製", function ($itemScope,$event) {
                    var ele = angular.element($event.currentTarget);
                    var id = ele.attr('id');
                    if (angular.isUndefined(id)){
                        id =new Date().getTime();
                        ele.attr('id',id);
                    }

                    var cloneEle = $('#'+id).clone();
                    cloneEle.attr('id',new Date().getTime());
                    
                    var ele2 = angular.element(cloneEle);
                    ele2.insertAfter(ele);
                    $compile(ele2)($scope);

                }]
                 
             ];
             $scope.aOptions = [
                 
                     	["向上複製", function ($itemScope,$event) {
                            
                            var ele = angular.element($event.currentTarget);
                            var i=0;
                            while(ele.parent()){
                                ele = ele.parent();
                                if (ele[0].tagName == 'LI')
                                    break;
                                console.log('Tagname',ele[0].tagName);
                                if (i>=5)
                                    break;
                            }
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
                        	["向下複製", function ($itemScope,$event) {
                            
                            var ele = angular.element($event.currentTarget);
                            var i=0;
                            while(ele.parent()){
                                ele = ele.parent();
                                if (ele[0].tagName == 'LI')
                                    break;
                                console.log('Tagname',ele[0].tagName);
                                if (i>=5)
                                    break;
                            }
                            var id = ele.attr('id');
                            if (angular.isUndefined(id)){
                                id =new Date().getTime();
                                ele.attr('id',id);
                            }
        
                            var cloneEle = $('#'+id).clone();
                            cloneEle.attr('id',new Date().getTime());
                            
                            var ele2 = angular.element(cloneEle);
                          
                            ele2.insertAfter(ele);
                            $compile(ele2)($scope);
                            
                            
                        }],
                        	["刪除", function ($itemScope,$event) {
                            
                            var ele = angular.element($event.currentTarget);
                            ele.remove();
                            
                            
                        }],
                             ["編輯", [
                                         ["更新文字", function ($itemScope,$event) {
                                              var ele = angular.element($event.currentTarget);
                                              var confirm = $mdDialog.prompt()
                                                  .title('更改連結文字')
                                                  .placeholder('諭輸入內容')
                                                  .initialValue(ele.text())
                                                  .required(true)
                                                  .ok('OK')
                                                  .cancel('取消');
                                            
                                                $mdDialog.show(confirm).then(function(result) {
                                                    ele.text(result);
                                                }, function() {
                            
                                                });
                                            
            
                                        }],
                                        ["更換圖片", function ($itemScope,$event) {
                   
                                               var ele = angular.element($event.currentTarget).find('img');
                                             console.log('My Element',ele);
                                                  var params = {
                                                    name: "dzImageGalleryPopup",
                                                    directive:"<dz-image-gallery-popup></dz-image-gallery-popup>"
                                                };
                            
                                                $dazzlePopup.callPopup(params).then(function(output){
                                                    var url = dzFn.getFileUrl('large-web',output.gid);
                                                    var id = ele.attr('id');
                                                    console.log('Atom',id,atomInfo.atom[id],url);
                                                    ele.attr('src',url);
                                                    if(atomInfo.checkIsData(id)) {
                                                        var field = ele.attr('data-field') || null;
                                                        atomInfo.atom[id]['data'][field] = url;
                                                    }
                                                    atomInfo.saveAtom(id,atomInfo.atom[id]);
                                                });
                                            }]
                                 
                                 
                                 ]
                                

                            ],

                             ["更新文字", function ($itemScope,$event) {
                                  var ele = angular.element($event.currentTarget);
                                  var confirm = $mdDialog.prompt()
                                      .title('更改連結文字')
                                      .placeholder('諭輸入內容')
                                      .initialValue(ele.text())
                                      .required(true)
                                      .ok('OK')
                                      .cancel('取消');
                                
                                    $mdDialog.show(confirm).then(function(result) {
                                        ele.text(result);
                                    }, function() {
                
                                    });
                                

                            }],
                             ["更換連結", function ($itemScope,$event) {
                            var ele = angular.element($event.currentTarget);
                            var params = {
                                name:"dzLinkPopup",
                                element: ele,
                                oldLink: ele.attr('href'),
                                directive:"<dz-link-popup></dz-link-popup>"
                            };
                            $dazzlePopup.callPopup(params).then(function(output) {
                         //       console.log('Link',ele);
                                ele.attr('href', output['link']);
            
                            });     
                        }]
                        ];
                        
                        //$scope.aOptions

			$(document).ready(function(e){
				console.log('Window',window);
					for (var i = 1; i < 99999; i++)
						window.clearInterval(i);
					setInterval(function(){
                            if ($dazzleUser.dazzleInfo['isCheck'])
                                $dazzleUser.dazzleInfo['isCheck'] = false;
                    },250);
			});
			
			//$dazzleElastic.checkUserIndexExists("www.skmgps.org","activities");
            $scope.needOverlay = function(ele) {
                // Check Depth
                console.log('Check Depth',userInfo);
                if ($dazzleUser.dazzleInfo['isCheck'] || $dazzleUser.dazzleInfo['isEdit'])
                    return false;

                $scope.newRemoveOverlay();
                
                var depthThershold = $dazzleUser.dazzleInfo['overlayDepth'];
                var depth = eleDepth(ele);

                if (depth<depthThershold)
                    return false;
                    
                console.log('Depth: ',eleDepth(ele));
                console.log('Body Depth',eleDepth($('body')));
                
                return true;
                     

            }

            $scope.init = function() {

            }  
            $scope.dzOptions = [
              ["編輯", function ($itemScope,$event) {
//                            var ele = angular.element($event.currentTarget);
                            dzFn.editElement();
                           
                }]
            ];
//             $scope.dzOptions = function(event){
//                 console.log('DZ Options',event);
// //                return dzFn.dzOptions($event);
//             }
            $scope.conMenu = function($event) {
                
                var menu = [];
//                console.log('Con Overlay',$dazzleUser.dazzleInfo['overlayEle']);
                // var ele = angular.element($event.target);
                var ele = $dazzleUser.dazzleInfo['overlayEle'];
              
                var tagName = ele[0].tagName;
                switch(tagName){
                    case 'A':

                        console.log('tag name',tagName);
                        break;
    
                    case 'IMG':
                        menu.push($scope.imgItems);
                        break;
                        
                    case 'H1':
                    case 'H2':
                    case 'H3':
                    case 'H4':
                    case 'H5':
                    case 'H6':
                    case 'P':
                    case 'SPAN':
                    case 'DIV':
                    default:
                        menu.push($scope.richItems);
                        menu.push($scope.conItems);
                        return menu;
                        break;

                    
                }
            }    
            
            
            $scope.aItems =  ["更換連結", function ($itemScope,$event) {
                        var ele = angular.element($event.currentTarget);
                        var params = {
                            name:"dzLinkPopup",
                            element: ele,
                            oldLink: ele.attr('href'),
                            directive:"<dz-link-popup></dz-link-popup>"
                        };
                        $dazzlePopup.callPopup(params).then(function(output) {
                     //       console.log('Link',ele);
                            ele.attr('href', output['link']);
        
                        });     
                    }];
            
            $scope.imgItems = 	["更換圖片", function ($itemScope,$event) {
                   
                   var ele = angular.element($event.currentTarget);
                 console.log('My Element',ele);
                      var params = {
                        name: "dzImageGalleryPopup",
                        directive:"<dz-image-gallery-popup></dz-image-gallery-popup>"
                    };

                    $dazzlePopup.callPopup(params).then(function(output){
                        var url = dzFn.getFileUrl('large-web',output.gid);
                        var id = ele.attr('id');
                        console.log('Atom',id,atomInfo.atom[id],url);
                        ele.attr('src',url);
                        if(atomInfo.checkIsData(id)) {
                            var field = ele.attr('data-field') || null;
                            atomInfo.atom[id]['data'][field] = url;
                        }
                        atomInfo.saveAtom(id,atomInfo.atom[id]);
                    });
                }];
            
            $scope.richItems = 
               ["更新HTML", function ($itemScope,$event) {
                            var ele = angular.element($event.currentTarget);
                            $dazzleUser.dazzleInfo['overlayEle'] = ele;
                            dzFn.addPanel(ele);
                }];
            $scope.conItems = 
                  ["更新文字", function ($itemScope,$event) {
                                  var ele = angular.element($event.currentTarget);
                                  
                                  
                                  var confirm = $mdDialog.prompt()
                                      .title('更改連結文字')
                                      .placeholder('諭輸入內容')
                                      .initialValue(ele.text())
                                      .required(true)
                                      .ok('OK')
                                      .cancel('取消');
                                
                                    $mdDialog.show(confirm).then(function(result) {
                                        var id = ele.attr('id');
                                        ele.text(result);
                                        console.log('Atom',id,atomInfo.atom[id]);
                                        atomInfo.atom[id]['html'] = result;
                                        if(atomInfo.checkIsData(id)) {
                                            var field = ele.attr('data-field') || null;
                                            atomInfo.atom[id]['data'][field] =result;
                                        }
                                        atomInfo.saveAtom(id,atomInfo.atom[id]);
                                    }, function() {
                
                                    });
                                

                            }];
                  

              
        $scope.imgMenuOptions = [
				["更換圖片", function ($itemScope,$event) {
                   
                   var ele = angular.element($event.currentTarget);
                 console.log('My Element',ele);
                      var params = {
                        name: "dzImageGalleryPopup",
                        directive:"<dz-image-gallery-popup></dz-image-gallery-popup>"
                    };

                    $dazzlePopup.callPopup(params).then(function(output){
                        var url = dzFn.getFileUrl('large-web',output.gid);
                        var id = ele.attr('id');
                        console.log('Atom',id,atomInfo.atom[id],url);
                        ele.attr('src',url);
                        if(atomInfo.checkIsData(id)) {
                            var field = ele.attr('data-field') || null;
                            atomInfo.atom[id]['data'][field] = url;
                        }
                        atomInfo.saveAtom(id,atomInfo.atom[id]);
                    });
                }],
                  ["更換連結", function ($itemScope,$event) {
                            var ele = angular.element($event.currentTarget);
                            var params = {
                                name:"dzLinkPopup",
                                element: ele,
                                oldLink: ele.attr('href'),
                                directive:"<dz-link-popup></dz-link-popup>"
                            };
                            $dazzlePopup.callPopup(params).then(function(output) {
                         //       console.log('Link',ele);
                                //ele.attr('href', output['link']);
            
                            });     
                }]
                
			];

            
            $scope.updateContextMenu = function(ele){
                
                return $scope.bgMenuOptions;
                
            }
            

            $scope.newRemoveOverlay = function() {
                $element.find('dz-overlay').remove();
            }

            $scope.removePanel = function() {
                return new Promise(function (resolve, reject) {
                    var panel = $element.find('panel');
                    panel.find('md-toolbar').remove();
                    var html = panel.find('dz-text').html();
                    
                    
                    ele2 = angular.element(html);
                    panel.replaceWith(ele2);
                    $dazzleUser.dazzleInfo['isEdit'] = false;
                    $dazzleUser.dazzleInfo['isCheck'] = false;

                    resolve();
                });                
            }
            
            $scope.addDirectiveInPanel = function(ele){
                    var tagName;
                    ele.find('img').attr('dz-image','');
                    tagName = ele[0].tagName;
                    
                    switch(tagName){
                        case 'IMG':
                            ele.attr('dz-image','');    
                            ele.attr('context-menu','menuOptions');
                        break;
                        
                        case 'A':
                            ele.attr('dz-link','');    
                            ele.attr('context-menu','menuOptions');
                        break;
                    }

            }
            $scope.addDataPanel = function(){
                
                // $scope.removePanel().then(function(){
                    // var target=$scope.currentTarget;
                    var target = $dazzleUser.dazzleInfo['overlayEle'];
                    console.log('Overlay',target);
                    $dazzleUser.dazzleInfo['editEle'] = $dazzleUser.dazzleInfo['overlayEle'];
                    console.log('EditEle',$dazzleUser.dazzleInfo['editEle'] );
                    
                    $dazzleUser.dazzleInfo['isEdit'] = true;
//                    $scope.isEdit = true;
                    $scope.menuOptions =$scope.updateContextMenu(target);
                    $scope.addDirectiveInPanel(target);
                    target.wrap('<panel><dz-data-template></dz-data-template></panel>');
                    $dazzleUser.dazzleInfo['bodyCode'] = target.html();
                    $('panel').append("<dazzle-data-toolbar></dazzle-data-toolbar");
                    $compile($('panel').contents())($scope);
                    //$compile($('dz-text').contents())($scope);
                    $scope.newRemoveOverlay();       
                    $dazzleUser.dazzleInfo['addDataPanel'] = false;
					
					// stop interval

                // });

            }
            $scope.addPanel = function(){
                
                // $scope.removePanel().then(function(){
                    // var target=$scope.currentTarget;
                    var target = $dazzleUser.dazzleInfo['overlayEle'];
                    console.log('Overlay',target);
                    $dazzleUser.dazzleInfo['editEle'] = $dazzleUser.dazzleInfo['overlayEle'];
                    console.log('EditEle',$dazzleUser.dazzleInfo['editEle'] );
                    $dazzleUser.dazzleInfo['isEdit'] = true;
                    dzFn.info['version'].push($('dz-container').html());
//                    $scope.isEdit = true;
                    $scope.menuOptions =$scope.updateContextMenu(target);
                    $scope.addDirectiveInPanel(target);
                    target.wrap('<panel><dz-text></dz-text></panel>');
                    $dazzleUser.dazzleInfo['bodyCode'] = target.html();
                    $dazzleUser.dazzleInfo['panelId'] = target.attr('id');
                    $('panel').append("<dazzle-toolbar></dazzle-toolbar");
                    $compile($('panel').contents())($scope);
                    //$compile($('dz-text').contents())($scope);
                    $scope.newRemoveOverlay();       
                    $dazzleUser.dazzleInfo['addPanel'] = false;
					
					// stop interval

                // });

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

            $scope.newAddOverlay = function(target){
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
                
                $dazzleUser.dazzleInfo['overlaySize'] = overlaySize;
                

            
                

                // $scope.menuOptions =$scope.updateContextMenu(target);
                // console.log('Top Left Height Width',top,left,height,left);
                // console.log('Current Target',$scope.currentTarget);
                // $element.find('.dz-overlay').css('width',width);
                // $element.find('.dz-overlay').css('height',height);
                // $element.find('.dz-overlay').css('top',top);
                // $element.find('.dz-overlay').css('left',left);

                $element.append('<dz-overlay context-menu="menuOptions"></dz-overlay>');
                $compile($element.find('dz-overlay'))($scope);
                
            }
            
            
            $scope.addOverlay = function(target){
                
                height = target[0].offsetHeight;
                width = target[0].offsetWidth;
                target.css('position','relative');

                target.append('<div class="dz-overlay"></div>');
                target.find('.dz-overlay').css('width',width);
                target.find('.dz-overlay').css('height',height);
                if ($scope.tagName =='IMG')
                    target.addClass('dz-border');
            }
            
            $scope.checkNeedOverlay = function(ele){
                // var isCheck = true;
                var checklist = ['ul','img'];
                var total=0;
                angular.forEach(checklist,function(item,index){
                   var len = ele.find(item).length;
                   total +=len;
                });
                //console.log('Total',total,ele.text());
                if (total<=3)
                    return true;
                else
                    return false;
            } 

            
            
        }
    }
    return dzContainer;
});

