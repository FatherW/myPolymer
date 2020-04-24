var app = angular.module('demoApp');

// jQuery.noConflict();
// (function( $ ) {
//   $(function() {
      
app.directive('dzPanelToolbar', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,
    $dazzlePopup,$dazzleData,$dazzleFn,panelInfo,atomInfo,dzFn,dzMenu,hotkeys) {
    var dzPanelToolbar = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/dzPanelToolbar/element.html?id=" + new Date().getTime(),
        compile: function (tElem, tAttrs) {
     //      console.log(': compile');
     //      console.log(tElem.html());
           return {
               pre: function ($scope, iElem, iAttrs) {
                   $scope.demo = {
                       isOpen: false,
                       direction:'left'
                   };
                   
                    var ele = $dazzleUser.dazzleInfo['panelEle'];
                    var size = $dazzleUser.dazzleInfo['panelSize'];
                    var pos = $dazzleUser.dazzleInfo['panelButtonPos']; 
                    
                    if (pos[0]<400)
                        $scope.demo.direction = 'right';
                   
                    // iElem.css('position','absolute');
                    // iElem.css('top',pos[1]+30);
                    // iElem.css('left',pos[0]+30);

               },
               post: function ($scope, iElem, iAttrs) {
         //          console.log(': post link');
                  // $compile(iElem)(scope);
                  
                
               }
           }
       },
        link: function (scope, element, attrs) {
        

        },
        controller: function ($scope, $element, $attrs) {
                   var ele = $dazzleUser.dazzleInfo['panelEle'];
                var tagName = ele[0].tagName;
                $scope.tagName = tagName;
                var icon;
                switch(tagName){
                    case 'IMG':
                        icon = 'fa-image';
                        $scope.funcs = ['img-edit','link','data','remove'];
                        break;
                        
                    case 'A':
                        icon="fa-link";
                        $scope.funcs = ['text','link','cancel','import','data'];

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
                        $scope.funcs = ['edit','text','code','copy-up','copy-down','background','remove'];

                        break;
                    
                }
                
                $scope.triggerIcon = icon;
                
                
            $scope.getIcon = function(name){
                var icon="";
                switch(name){
                    
                    case 'text':
                        icon= 'fa-font';
                        break;
                  
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
    return dzPanelToolbar;
});



// }
// })