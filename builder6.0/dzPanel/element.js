var app = angular.module('demoApp');

// jQuery.noConflict();
// (function( $ ) {
//   $(function() {
      
app.directive('dzPanel', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,
    $dazzlePopup,$dazzleData,$dazzleFn,panelInfo,atomInfo,dzFn,dzMenu,hotkeys) {
    var dzPanel = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/dzPanel/element.html?id=" + new Date().getTime(),
        compile: function (tElem, tAttrs) {
     //      console.log(': compile');
     //      console.log(tElem.html());
           return {
               pre: function ($scope, iElem, iAttrs) {
                    console.log('Overlay Init');
//                    $dazzleInit.editorCustomInit($scope, iElem, iAttrs);
                    $scope.isData = false;
                    var ele = $dazzleUser.dazzleInfo['panelEle'];
                    var size = $dazzleUser.dazzleInfo['panelSize'];
                    var pos = $dazzleUser.dazzleInfo['currentPos'] ; 
                    console.log(size,pos);
                    var buttonLeft, buttonTop;
                    // buttonLeft = pos[0]- size.left+50;
                    // buttonTop = pos[1] -size.top;
                    // // buttonTop = 30;
                    // console.log('New Pos',buttonLeft,buttonTop);
                    // iElem.find('#dzButton').css('position','absolute');
                    // iElem.find('#dzButton').css('top','0px');
                    // iElem.find('#dzButton').css('left','0px');
                    buttonLeft = pos[0];
                    buttonTop = pos[1];
                    buttonLeft +=100;
                    if (buttonLeft<300)
                        buttonLeft +=200;
                    buttonTop -= 150;
                    if (buttonTop<100)
                    buttonTop +=100;
                    var toolbar = angular.element("<dz-panel-toolbar></dz-panel-toolbar>");
                    toolbar.css('position','fixed');
                    toolbar.css('top',buttonTop);
                    toolbar.css('left',buttonLeft);
                    $compile(toolbar)($scope);
                    $('dz-container').append(toolbar);
                    
                    
                    
                    var isInMaster = false;
                    var isInData = false;
                    
                    // $scope.tagIcon = function(){
                    //     return "user";
                    // } 
                    
                    
                    // height = ele[0].offsetHeight;
                    // width = ele[0].offsetWidth;  
                    // //top = target[0].offsetTop;
                    // //left = target[0].offsetLeft;
                    // top = ele.offset().top;
                    // left = ele.offset().left;
                    master = ele.attr('dz-master');
               //     console.log('Size',size.width,size.height,size.top,size.left);
                
                    iElem.css('position','absolute');
                    iElem.css('width',size.width);
                    iElem.css('height',size.height);
                    iElem.css('top',size.top);
                    iElem.css('left',size.left);
                    iElem.css('z-index',8000);
                    iElem.find('#dzPos').text(size.width+'x'+size.height);
                
                    // Master Overlay
                    if (size.master)
                        iElem.css('background','rgba(255,0,0,0.3)');
                    else
                        iElem.css('background','rgba(0,0,0,0.3)');
                        


                    ele.parents()
                      .map(function() {
                          var thisEle = angular.element(this);
                          var isMaster = thisEle.attr('dz-master');
                          if (!angular.isUndefined(isMaster)) 
                            isInMaster = true;
                      });    
                    
                    if (isInMaster)
                         iElem.css('background','rgba(255,0,0,0.3)');                       
                    
                    // Data Overlay 
                    //var isInData= $.contains($('[dz-data]'),$('.pop_title'));

                      var thisEle = angular.element(ele);
                      var isData = thisEle.attr('dz-data');
                      if (!angular.isUndefined(isData)) 
                        isInData = true;
                      else {
                        ele.parents()
                          .map(function() {
                              thisEle = angular.element(this);
                              isData = thisEle.attr('dz-data');
                              if (!angular.isUndefined(isData)) 
                                isInData = true;
                          }); 
                          if (isInData)
                            iElem.remove();
                      }
                      

            //        console.log(isInData);
                    if (isInData) {
                         iElem.css('background','rgba(0,255,0,0.3)');   
                         $scope.isData = true;
                    }


                   

                    iElem.bind('mouseenter', function($event){
                        console.log('Overlay Mouseenter');
                      ele.trigger("mouseenter");
                  });

               },
               post: function ($scope, iElem, iAttrs) {
         //          console.log(': post link');
                  // $compile(iElem)(scope);
                  
                
               }
           }
       },
        link: function (scope, element, attrs) {
            scope.http = "//d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dzPanel";
            scope.type = "dzPanel";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
 

        },
        controller: function ($scope, $element, $attrs) {
                var ele = $dazzleUser.dazzleInfo['panelEle'];
                var tagName = ele[0].tagName;
                $scope.tagName = tagName;
                var icon;
                switch(tagName){
                    case 'JITPO-MEDI':
                        icon = 'fa-keyboard';
                        $scope.funcs=['edit','save'];
                        
                        
                        break;
                    case 'IMG':
                        icon = 'fa-image';
                        $scope.funcs = ['img-edit','link','data','remove'];
                        break;
                        
                    case 'A':
                        icon="fa-link";
                        $scope.funcs = ['link','cancel','import','data'];

                        break;
                    
                    case 'FORM':
                        icon = "fa-clipboard-list";
                        $scope.funcs = ['settings','data'];
                        break;
                        
                    case 'INPUT':
                    case 'TEXTAREA':
                        icon = "fa-tasks";
                        
                        break;
                    case 'DIV':
                        icon="fa-th-large";
                        $scope.funcs = ['edit','code','copy-up','copy-down','background','remove'];

                        break;
                    
                    default:
                        icon = "fa-keyboard";
                        $scope.funcs = ['edit','code','copy-up','copy-down','background','remove'];

                        break;
                    
                }
                
                $scope.triggerIcon = icon;
                
                
            $scope.getIcon = function(name){
                var icon="";
                switch(name){
                  
                    case 'import':
                        icon = "fa-file-import";
                        break;
                    case 'data':
                        icon = "fa-database";
                        break;
                    case 'link':
                        icon = "fa-link";
                        break;
                    case 'settings':
                        icon = "fa-cog";                                            
                        break;
                        
                    case 'cancel':
                        icon="fa-unlink";
                        break;
                    case 'img-edit':
                    case 'edit':
                        icon = "fa-edit";
                        break;
                    case 'code':
                        icon = "fa-code";
                        break;
                    
                    case 'copy-up':
                        icon = "fa-caret-square-up";
                        break;
                    case 'copy-down':
                        icon = "fa-caret-square-down";
                        break;
                    case 'background':
                        icon = "fa-image";
                        break;
                        
                    case 'save':
                        icon = 'fa-save';
                        break;
                    
                    case 'remove':
                        icon = "fa-times-circle";
                        break;
                    
                    
                }
                return icon;
                
            }
            $scope.getTriggerIcon = function(){
                
                return $scope.triggerIcon;
            }
            hotkeys.add({
			combo: 'ctrl+b',
			description: 'This one goes to 11',
			callback: function(event) {

                event.preventDefault();
				$scope.changeBackground();
			}
		  });
            
            
            $scope.target = $dazzleUser.dazzleInfo['overlayEle'];

            $scope.callFunction = function(name){
                 dzMenu.callFunction($scope.tagName,name);
            }


            $scope.changeBackground = function() {
                    var ele = $scope.target;
					var bkImg = '';
					var child = ele.find('*');
					var bkJson = [];
					angular.forEach(child,function(item,index){
					});
            }

            // var contextMenu=dzFn.getContextMenu($scope.target);
            // console.log('Context Menu',contextMenu);

            $scope.menuOptions = [
                ["編輯", function () {
                    var ele = $scope.target;

                    $dazzleUser.dazzleInfo['isEdit'] = true;
                    // $dazzleUser.dazzleInfo['needCompile'] = true;
                    $dazzleUser.dazzleInfo['addPanel'] = true;
                    $element.remove();
                }],
				["向上複製", function ($itemScope) {

                    var ele = $scope.target;
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
                    $element.remove();

                }],
                ["向下複製", function ($itemScope) {
                    var ele = $scope.target;
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
                    $element.remove();

                }],
                ["啟用／取消Master", function () {
                    var ele = $scope.target;
                    var master = ele.attr('dz-master');
                    if (!angular.isUndefined(master))
                        ele.removeAttr('dz-master');
                    else
                        ele.attr('dz-master','');
                    $compile(ele)($scope);
                    $element.remove();
                }],
                ["刪除", function ($itemScope) {
                    var ele = $scope.target;
                    ele.remove();                    
                    $element.remove();
                }]
            ];

            var ele = $scope.target;
            var eleMenu = [];

            eleMenu = dzFn.getContextMenu(ele);
            $scope.menuOptions.push(["元件選單",eleMenu]);

            function changeModel(ele,name){
                var item = ele.parent().find('input');
                if (!angular.isUndefined(item))
                    item.attr('ng-model',"form['"+name+"']");
            }
        }
    };
    return dzPanel;
});



// }
// })