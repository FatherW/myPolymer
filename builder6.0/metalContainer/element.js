var app = angular.module('demoApp');

app.directive('dzContainer', function ($compile, $templateRequest, $mdDialog,$dazzlePopup,$dazzleS3,$dazzleUser,$dazzleData,$dazzleInit,$dazzleFn) {
    
    var dzContainer = {
        restrict: 'E',
        priority: 1000,
        scope: true,
 //       transclude: true,
  //      template: '<div context-menu="menuOptions" ng-transclude></div>',
        compile : function(elements, attributes){
            return{
                post : function(scope, element, attribute){
                    var isSingleClick = true;
                    var isCheck = true;
                    setInterval(function(){
                            if (scope.isCheck)
                                scope.isCheck = false;    
                    },250);
                    
                    scope.isEdit = false;
                    element.bind('mouseover', function($event){
                        var ele =  angular.element($event.target);
                        
//                        isCheck = false;
                        if (scope.needOverlay()) {
                            scope.newRemoveOverlay();
                            scope.newAddOverlay(ele);
                            scope.currentTarget = ele;                        
                            scope.isCheck = true;
                        }

                        
                        
                        
//                      if (target != angular.element($event.target) )
                    
                    //   if (scope.checkNeedOverlay(ele))
                    //     if (isCheck && !scope.isEdit) {
                    //         //scope.removeDirective();
                    //         scope.removeOverlay();


                    //         target = angular.element($event.target);
                    //         scope.tagName = target[0].tagName;                            
                    //         scope.ctrlTarget = target;
                            
                    //         scope.addOverlay(target);
                    //         isCheck = false;                     

                    //     } 
                    });
                    element.bind('mouseenter',function($event){

                            
                    });
                    element.bind('mouseleave',function($event){
//                          scope.removeOverlay();
                    });
                    element.bind('mousemove', function($event){

                    });
                     element.bind('click', function($event){
                         

                         
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
  
                        console.log('My Current Target',scope.currentTarget);
                        console.log('My Current ID',scope.currentTarget.attr('id'));
                        if (!scope.isEdit) 
                            scope.addPanel();
                        else
                            scope.removePanel();



//                        var ele = angular.element($event.target);
//                         var tagName = scope.tagName;
//                         var parent;
//                         if (ele.hasClass('dz-overlay'))
//                             parent=ele.parent();
//                         else
//                             parent = ele;

// //                        $dazzleUser.dazzleInfo['currentEle']=parent;
// //                        $dazzleUser.dazzleInfo['tagName'] = tagName;
                        
//                         //scope.removeDirective();
//                         scope.removeOverlay();
                        
//                         if(scope.isEdit){
//                             console.log('Add Overlay');
//                             scope.removeDirective();
//                             scope.addOverlay(ele);
//                             scope.isEdit = false;
//                         } else {
//                             console.log('Remove Overlay');
//                             scope.removeOverlay();
//                             scope.loadDirective(parent,tagName);
//                             scope.isEdit = true;
//                         }

                     });
                }
            };
        },
        link: function (scope, element, attrs) {
            scope.http = "https://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dzContainer";
            scope.type = "dzContainer";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
  
  
            
        },
        controller: function ($scope, $element, $attrs) {

            $scope.userBucket = $dazzleUser.dazzleInfo['userBucket'];
            $scope.websiteKey = $dazzleUser.dazzleInfo['websiteKey'];
            $scope.thisPage = $dazzleUser.dazzleInfo['thisPage'];
            
            $scope.needOverlay = function() {
                
                if (!$scope.isCheck && !$scope.isEdit)
                    return true;
                else
                    return false;
            }

            $scope.init = function() {

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

            $element.find('img').attr('context-menu','imgMenuOptions');      


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
                $element.find('.dz-overlay').remove();
            }
            $scope.removePanel = function() {
                return new Promise(function (resolve, reject) {
                    var panel = $element.find('panel');
                    var html = panel.html();
                    
                    
                    ele2 = angular.element(html);
                    panel.replaceWith(ele2);
                    
                    $scope.isEdit = false;
                    $scope.isCheck = false;
                    resolve();
                });                
            }
            $scope.addPanel = function(){
                
                $scope.removePanel().then(function(){
                    var target=$scope.currentTarget;
                    
                    $scope.isEdit = true;
                    $scope.menuOptions =$scope.updateContextMenu(target);
                    target.wrap('<panel dz-text class="dz-border" context-menu="menuOptions"></panel>');
                
                    $compile(target.parent())($scope);
                    $scope.newRemoveOverlay();                    
                });

            }
            $scope.newAddOverlay = function(target){
                var height,width,top,left;
                
                height = target[0].offsetHeight;
                width = target[0].offsetWidth;  
                //top = target[0].offsetTop;
                //left = target[0].offsetLeft;
                top = target.offset().top;
                left = target.offset().left;
                
                $scope.menuOptions =$scope.updateContextMenu(target);
                console.log('Top Left Height Width',top,left,height,left);
                console.log('Current Target',$scope.currentTarget);
                $element.append('<div class="dz-overlay" style="position:absolute;" context-menu="menuOptions"></div>');
                $element.find('.dz-overlay').css('width',width);
                $element.find('.dz-overlay').css('height',height);
                $element.find('.dz-overlay').css('top',top);
                $element.find('.dz-overlay').css('left',left);
                
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