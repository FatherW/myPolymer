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

app.directive('dzContainer', function ($document,$compile, $templateRequest, $mdDialog,$dazzlePopup,$dazzleS3,$dazzleUser,$dazzleData,$dazzleInit,$dazzleFn,userInfo,pageInfo,panelInfo) {
    
    var dzContainer = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        compile : function(elements, attributes){
            return{
                pre : function(scope,element,attribute) {
                                        
                    //userInfo.init();
					scope.user = $dazzleUser.getUser();
					scope.userBucket = 'dazzle-user-'+scope.user['uid'];
					scope.thisPage = decodeURIComponent(location.pathname);
					
					
					pageInfo.init().then(function(){
					    //element.html(html); 
					    console.log('Init Body',pageInfo.body);
                        $('dz-container').html(pageInfo.body);
                        for(var key in pageInfo.masterBlock){
                            $('#'+key).attr('dz-master','');
                        }
                        $compile(element.contents())(scope);
					});
				// 	scope.loadBody().then(function(html){
    //                     $('dz-container').html(html);
    //                     $compile(element.contents())(scope);
    //                 }); 
					
                },
                post : function(scope, element, attribute){
                    var isSingleClick = true;
                    var isCheck = true;
                    $dazzleUser.dazzleInfo['isCheck'] = true;
                    
                    $dazzleUser.dazzleInfo['isEdit'] = false;
                    scope.isEdit = false;
                    element.bind('mouseover', function($event){
                        var ele =  angular.element($event.target);
                        $dazzleUser.dazzleInfo['overlayEle'] = ele;
                        var addPanel = $dazzleUser.dazzleInfo['addPanel'] || false;
                    
                        if (addPanel){
                            scope.addPanel();
                            $dazzleUser.dazzleInfo['addPanel'] = false;
                        }

                        if (scope.needOverlay(ele)) {
                            scope.newRemoveOverlay();
                            scope.newAddOverlay(ele);
                            scope.currentTarget = ele;                        
                            $dazzleUser.dazzleInfo['isCheck'] = true;

                        } 

                        
                        
                    });
                    

                    element.bind('mouseenter',function($event){

                            
                    });
                    element.bind('mouseleave',function($event){
//                          scope.removeOverlay();
                    });
                    element.bind('mousemove', function($event){

                    });
                    
                    element.bind('contextmenu', function($event) {
                            console.log('Context Menu',$event.target);
                    });
                     element.bind('click', function($event){
                         
                          console.log('Click',$event.target);
                         
                        setTimeout(function(){
                            if(isSingleClick){
                                console.log("It's a single click");
                                return;
                            }
                        }, 500);
                    });
                    
                    element.bind('dblclick', function($event){
                        console.log("It's a double click");
                         
                        isSingleClick = false;
                        
                        setTimeout(function(){
                            isSingleClick = true;
                            return;
                        }, 500);
                         scope.removePanel();                            
                     });
                     
                     
                }
            };
        },
        link: function (scope, element, attrs) {
            scope.http = "//d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dzContainer";
            scope.type = "dzContainer";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;

  
            
        },
        controller: function ($scope, $element, $attrs) {

            $('a').css('pointer-events','auto');
            $('a').attr('context-menu','linkMenuOptions');
            $('a[href*="http:"]').on('click',function(e){
               e.preventDefault();
            });
            $('a[href*=".html"]').on('click',function(e){
               e.preventDefault();
            });
            $('a[href*=".htm"]').on('click',function(e){
               e.preventDefault();
            });
            $('a[href*=".php"]').on('click',function(e){
               e.preventDefault();
            });
            $('a[href*=".asp"]').on('click',function(e){
               e.preventDefault();
            });
//            $('*').stop();
			$(document).ready(function(e){
				console.log('Window',window);
					for (var i = 1; i < 99999; i++)
						window.clearInterval(i);
					setInterval(function(){
                            if ($dazzleUser.dazzleInfo['isCheck'])
                                $dazzleUser.dazzleInfo['isCheck'] = false;
                    },250);
			});
			
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
                
                $dazzleUser.dazzleInfo['simple-toolbar'] =`
                <md-toolbar class="md-accent dazzle _md _md-toolbar-transitions">
                        <div class="md-toolbar-tools-dazzle-field-edit">
                            <i class="fa fa-check-circle fa-x" ng-click="update(model)" role="button" aria-hidden="true"></i>
                            <i class="fa fa-times-circle fa-x" ng-click="cancel()" role="button" aria-hidden="true"></i>
                            <i class="fa fa-edit fa-x" ng-click="edit(model)" role="button" aria-hidden="true"></i>
                        </div>
                </md-toolbar>
                `;
                $dazzleUser.dazzleInfo['toolbar'] = `
                <md-toolbar class="md-accent dazzle _md _md-toolbar-transitions">
                        <div class="md-toolbar-tools-dazzle">
                            <i class="fa fa-x fa-arrows" aria-hidden="true" ng-click="up()" role="button" tabindex="0"></i>
                            <i class="fa fa-x fa-cog" aria-hidden="true"></i>
                            <i class="fa fa-x fa-bank" aria-hidden="true" ng-click="addElement()" role="button" tabindex="0"></i>
                            <i class="fa fa-x fa-database" aria-hidden="true" ng-click="dbsettings()" role="button" tabindex="0"></i>                            
                            <i class="fa fa-x fa-info" aria-hidden="true"></i>                            
                            <i class="fa fa-close right" ng-click="remove()" role="button" tabindex="0"></i>
                        </div>
                      </md-toolbar>`;

                $dazzleUser.setDazzleInfo('newAtom',{});
                var atom = {};
            
                console.log('DZ Init');
               // console.log('DZ Init',$scope.userBucket,$scope.websiteKey + 'page/' + $scope.thisPage + '/body.html');

          $scope.linkMenuOptions = [
				["轉頁", function ($itemScope,$event) {
                       console.log('My Element',$itemScope,$event);
                       var ele = angular.element($event.target);
                       console.log(ele);
                       var link= ele.attr('href');
                      location.href = link;
                    // var newUrl = "/admin/neodance/secondary.html";
                    //     window.history.pushState({ path: newUrl }, null, newUrl);

                }], ["管理鏈結", function () {
                    var params = {
                        name:"dzLinkPopup",
                        element: ele,
                        oldLink: ele.attr('href'),
                        directive:"<dz-link-popup></dz-link-popup>"
                    };
                    $dazzlePopup.callPopup(params).then(function(output) {
                        console.log('Link',linkEle);
                        linkEle.attr('href', output['link']);

                    });                  
                }]
			];
        $scope.imgMenuOptions = [
				["更換圖片", function ($itemScope,$event) {
                    console.log('My Element',$itemScope);
                
                      var params = {
                        name: "dzUserGalleryPopup",
                        directive:"<dz-user-gallery-popup></dz-user-gallery-popup>"
                    };

                    $dazzlePopup.callPopup(params).then(function(output){

                        $scope.model.src = $dazzleFn.getFileUrl('large-web',output.gid);
//                        $dazzleInit.useTemplate($scope);
                    });
                }], ["管理鏈結", function () {
              
                }]
				];
// Update context menu

            //$element.find('img').attr('context-menu','imgMenuOptions');      


//                     $dazzleFn.loadAtom().then(function(result){
//                     console.log('Load Atom Result2',result);
//                     angular.forEach(result,function(item,index){
//                       var json = JSON.parse(item.object);
//                       $dazzleFn.loadElasticAtom(json.id,item.isMaster).then(function(item){
//                           console.log('New Atom',item.id,item);
                          
//                           $dazzleFn.useTemplate(item).then(function(){
//                                 $dazzleUser.dazzleInfo['newAtom'][json.id] = item;
//                           });
//                       });
//                     });
//                 });

//                   $dazzleS3.getFile($scope.userBucket,$scope.websiteKey + 'page/' + $scope.thisPage + '/body.html').then(function(html){
//                      console.log('DZ Init',$scope.userBucket,$scope.websiteKey + 'page/' + $scope.thisPage + '/body.html');
//                      $element.html(html);
//                      $scope.removeDirective();
//                      $dazzleUser.dazzleInfo['bodyHtml'] = $element.html();
                    
//                  },function(err){
//  //                    scope.model.html = element.html();
//                  });
            
            
             $scope.loadBody = function() {
                    
                        var userBucket, websiteKey, thisPage;
                        
//                        userBucket = $dazzleUser.dazzleInfo['userBucket'];
                        
                        
                        //var html = $('dz-container').html();
                        //console.log(html);
						console.log($scope.userBucket,  location.hostname + $scope.thisPage +'/body.html');
						return new Promise(function (resolve, reject) {
                            $dazzleS3.getFile($scope.userBucket,  location.hostname + $scope.thisPage +'/body.html').then(function (html) {
                                $dazzlePopup.toast('Success to Load Page');
                                console.log(html);
                                resolve(html);
                            },function(err){
								console.log('Load Body Error',err);
								resolve();
							});
                        });
                    }
            $scope.bgMenuOptions = [
                ['更換背景', function () {
                    
                    var params = {
                        name: "dzUserGalleryPopup",
                        directive:"<dz-user-gallery-popup></dz-user-gallery-popup>"
                    };

                    $dazzlePopup.callPopup(params).then(function(output){
                        $scope.currentTarget.css('background-image', 'url('+$dazzleFn.getFileUrl('large-web',output.gid)+')');
//                        $dazzleInit.useTemplate($scope);
                    });

                }],
                ["取消背景", function () {
                        $scope.currentTarget.css('background', 'none');
//                  
                }],
                ["設為Master", function () {
                    $scope.currentTarget.attr('dz-master','');
                }]
            ];
            
            $scope.loadDirective =function (parent,tagName){
                var html, src;
                //console.log(tagName);
                 switch(tagName){
                        case 'UL':
//                            parent.attr('dz-ul','');
                            break;

                        case 'IMG':
                            // html = parent.html();
                            // src = parent.attr('src');
                            // parent.html('<dz-image src="'+src+'">'+html+'</dz-image>');
            
            
                            parent.attr('dz-image','');
   
                            // var params = {
                            //     name: "dzUserGalleryPopup",
                            //     directive:"<dz-user-gallery-popup></dz-user-gallery-popup>"
                            // };
        
                            // $dazzlePopup.callPopup(params).then(function(output){
                            //     //height = target[0].offsetHeight;
                            //     //width = target[0].offsetWidth;
                            //     target.attr('src',$dazzleFn.getFileUrl('large-web',output.gid));
                                
                            //     //target.css('width',width);
                            //     //target.css('height',height);    
                                
                            // });


                          break;
                          
                          
                        case 'hello':

                            var imghtml;
                            
                            html = parent.html();
                            parent.html('<dz-text>'+html+'</dz-text>');

                            if (parent.find('img').length==1){
                                src=parent.find('img').attr('src');
                                // imghtml = parent.html();
                                // parent.find('img').html('<dz-image src="'+src+'">'+imghtml+'</dz-image>');
 
                                src.attr('dz-image','');

                            }
                             
                            // if (parent.find('ul').length==1){
                            //     var ele = parent.find('ul');
                            //     ele.attr('dz-ul','');
                            // }   
                          break;
                  }

                $compile(parent)($scope);
            }
            
            $scope.updateContextMenu = function(ele){
                
               // if (ele.find('img').length==1) 
                //    return [];
                
                return $scope.bgMenuOptions;
                
            }
            
            $scope.removeDirective = function(){
                $dazzleFn.removePanel();

                // var directive_list = ['dz-text','dz-ul'];
                // var html,parent;
                // angular.forEach(directive_list,function(item,index){
                //     ele = $element.find(item);

                //     if (ele.length) {
                //         console.log(item,ele);
                //         html = ele.html();
                //         parent = ele.parent();
                //         parent.html(html);                        
                //     }

                // });
              
            }
            $scope.removeOverlay = function(){
                $element.find('.dz-overlay').remove();
                $element.find('.dz-border').removeClass('dz-border');
            }
            
            $scope.newRemoveOverlay = function() {
                // $element.find('.dz-overlay').remove();
                
                $element.find('dz-overlay').remove();
                
            }
            $scope.removePanel = function() {
                return new Promise(function (resolve, reject) {
                    var panel = $element.find('panel');
                    panel.find('md-toolbar').remove();
                    var html = panel.find('dz-text').html();
                    
                    
                    ele2 = angular.element(html);
                    // ele2 = $dazzleUser.dazzleInfo['editEle'];
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
            $scope.addPanel = function(){
                
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
                    target.wrap('<panel><dz-text></dz-text></panel>');
                    $dazzleUser.dazzleInfo['bodyCode'] = target.html();
                    $('panel').append("<dazzle-toolbar></dazzle-toolbar");
                    $compile($('panel').contents())($scope);
                    //$compile($('dz-text').contents())($scope);
                    $scope.newRemoveOverlay();       
                    $dazzleUser.dazzleInfo['addPanel'] = false;
					
					// stop interval

                // });

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

