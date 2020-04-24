var app = angular.module('demoApp');
app.directive('master', function ($compile, $mdDialog,$dazzleUser) {
    var master = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            $scope.masterAtom = $dazzleUser.getDazzleInfo('masterAtom');

            $scope.initMaster = function () {
                if (angular.isUndefined($scope.model)) {
                    setTimeout(function () {
                        //console.log("This model still loading,master will init 0.5s later", $element);
                        $scope.initMaster();
                    }, 500);
                    return;
                }
                if (angular.isUndefined($scope.model.masterId) || angular.isUndefined($scope.masterAtom[$scope.model.masterId])) {
                    $scope.model.masterId = $scope.model.id;
                    $scope.masterAtom[$scope.model.masterId] = $scope.model;
                } else {
                    $scope.model.masterId = $element.attr('id');
                    $scope.masterAtom[$scope.model.masterId] = $scope.model;
                    $scope.atom[$scope.model.id] = $scope.model;
                }

                $scope.model = $scope.masterAtom[$scope.model.masterId];
            };

            if ($element[0].nodeName == 'EDITOR-CONTAINER-ELEMENT') {
                setTimeout(function () {
                    var id = $element.attr('id') || "master" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
                    $element.attr('id', id);
                    //console.log($scope);
                    if (angular.isUndefined($scope.masterAtom[id])) {
                        var masterHtml = angular.element("<div></div>").append($element.html());
                    } else {
                        var masterHtml = angular.element("<div></div>").append($scope.masterAtom[id].html);
                    }
                    $scope.unwrap(masterHtml);
                    $element.children('[context-menu]').eq(0).html(masterHtml.html());
                    $compile($element.children('[context-menu]').eq(0).contents())($scope);
                }, 200);
            } else {
                $scope.initMaster();
            }
        }
    };
    return master;
});
var target;
var isEdit = false;
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
                            if (!scope.isEdit)
                                isCheck = true;    
                    },250);
                    
                    element.bind('mouseover', function($event){
                        var ele =  angular.element($event.target);
                        
                        
//                        isCheck = false;
                     // if (target != angular.element($event.target) )
                    
                      if (scope.checkNeedOverlay(ele))
                        if (isCheck && !scope.isEdit) {
                            //scope.removeDirective();
                            scope.removeOverlay();


                            target = angular.element($event.target);
                            scope.tagName = target[0].tagName;                            
                            scope.ctrlTarget = target;
                            
                            scope.addOverlay(target);
                            isCheck = false;                     

                        } 
                    });
                    element.bind('mouseenter',function($event){
//                        target = angular.element($event.target);
                        //console.log('Target',target);
                        // console.log('Mouse Over',angular.element($event.target));
                            
                    });
                    element.bind('mouseleave',function($event){
                          scope.removeOverlay();
                    });
                    element.bind('mousemove', function($event){
//                        scope.removeOverlay();
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
                        
                        var ele = angular.element($event.target);
                        var tagName = scope.tagName;
                        var parent;
                        if (ele.hasClass('dz-overlay'))
                            parent=ele.parent();
                        else
                            parent = ele;

                        $dazzleUser.dazzleInfo['currentEle']=parent;
                        $dazzleUser.dazzleInfo['tagName'] = tagName;
                        
                        //scope.removeDirective();
                        scope.removeOverlay();
                        
                        if(scope.isEdit){
                            console.log('Add Overlay');
                            scope.removeDirective();
                            scope.addOverlay(ele);
                            scope.isEdit = false;
                        } else {
                            console.log('Remove Overlay');
                            scope.removeOverlay();
                            scope.loadDirective(parent,tagName);
                            scope.isEdit = true;
                        }
           
    /*
                        if (ele.hasClass('dz-overlay')) {
                            ele.remove();
                            isEdit = true;
                        } else {

                          if(!isEdit)
                            {
                                    var tEle = element.find('dz-text');
                                    var html = tEle.html();
                                    parent = tEle.parent();
                                    console.log(parent);
                                    parent.html(html);
                                    isEdit = false;
                                    isCheck = true;
                            }
                        }



                            //console.log('Target',target);
                            //console.log('Ele',ele.parent());
//                            console.log(parent[0].tagName);

                            var html;    
                            if (isEdit){
                                switch(tagName){
                                    case 'UL':
                                        parent.attr('dz-ul','');
                                        break;

                                    case 'IMG':
                                        html = parent.html();
                                        var src = parent.attr('src');
                                        parent.html('<dz-image src="'+src+'">'+html+'</dz-image>');

//                                                 var params = {
//                                                     name: "dzUserGalleryPopup",
//                                                     directive:"<dz-user-gallery-popup></dz-user-gallery-popup>"
//                                                 };
                            
//                                                 $dazzlePopup.callPopup(params).then(function(output){
//   //                                                  height = parent[0].offsetHeight;
// //                                                    width = parent[0].offsetWidth;
//                                                     console.log(output,height,width);
//                                                     parent.attr('src',$dazzleFn.getFileUrl('large-web',output.gid));
// //                                                    parent.css('width',width);
// //                                                    parent.css('height',height);    
                                                    
//                                                 });


                                      break;
                                      
                                      
                                    default:
                                        
                                        var html;
                                        if (parent.find('img').length==1){
                                            var src=parent.find('img').attr('src');
                                            html = parent.html();
                                            parent.find('img').html('<dz-image src="'+src+'">'+html+'</dz-image>');
                                        }
                                         
                                        if (parent.find('ul').length==1){
                                            var ele = parent.find('ul');
                                            ele.attr('dz-ul','');
                                        }   

                                        html = parent.html();
                                        parent.html('<dz-text>'+html+'</dz-text>');

                                      break;
                                }

                                $compile(parent)(scope);
                            } 
                        

                        */
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

            $scope.userBucket = $dazzleUser.dazzleInfo['userBucket'];
            $scope.websiteKey = $dazzleUser.dazzleInfo['websiteKey'];
            $scope.thisPage = $dazzleUser.dazzleInfo['thisPage'];
            

            $scope.init = function() {

                $dazzleUser.setDazzleInfo('atom',{});
                var atom = {};
            
                console.log('DZ Init');
               // console.log('DZ Init',$scope.userBucket,$scope.websiteKey + 'page/' + $scope.thisPage + '/body.html');

                $dazzleFn.loadAtom().then(function(result){
                    angular.forEach(result,function(item,index){
                      var json = JSON.parse(item.object);

                      if (json.isDb) {
                            $dazzleFn.getDataValue(json.db).then(function(result){
  //                            var obj={};
                              console.log('Load DB Result',result);
                              json.data = result;
//                              obj[item.objectid] = json;
                              $dazzleFn.updateHtml(json);
                            });
                        }else{
                            $dazzleFn.updateHtml(json);
                        }
                    });
                    

                    
                });

                  $dazzleS3.getFile($scope.userBucket,$scope.websiteKey + 'page/' + $scope.thisPage + '/body.html').then(function(html){
                     console.log('DZ Init',$scope.userBucket,$scope.websiteKey + 'page/' + $scope.thisPage + '/body.html');
                     $element.html(html);
                     $scope.removeDirective();
                     $dazzleUser.dazzleInfo['bodyHtml'] = $element.html();
                    
                 },function(err){
 //                    scope.model.html = element.html();
                 });
            }
            $scope.menuOptions = [
                ['更換背景', function () {
                    
                    var params = {
                        name: "dzUserGalleryPopup",
                        directive:"<dz-user-gallery-popup></dz-user-gallery-popup>"
                    };

                    $dazzlePopup.callPopup(params).then(function(output){
                        target.css('background-image', 'url('+$dazzleFn.getFileUrl('large-web',output.gid)+')');
//                        $dazzleInit.useTemplate($scope);
                    });

                }],
                ["取消背景", function () {
                        target.css('background-image', 'none');
//                  
                }],
                ["成為Master", function () {
                    $element.css('background', 'none');
                    $element.css('display', 'block');
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