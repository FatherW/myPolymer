var app = angular.module('demoApp');

app.directive('dzAtomOverlay', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,
    $dazzlePopup,$dazzleData,$dazzleFn,panelInfo,atomInfo,dzFn,hotkeys) {
    var dzOverlay = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
        templateUrl: "//d25k6mzsu7mq5l.cloudfront.net/builder6.0/dzAtomOverlay/element.html?id=" + new Date().getTime(),
        compile: function (tElem, tAttrs) {

           return {
               pre: function ($scope, iElem, iAttrs) {
                    console.log('Overlay Init');
                    $scope.isData = false;
                    var ele = $dazzleUser.dazzleInfo['overlayEle'];
                    var size = $dazzleUser.dazzleInfo['overlaySize'];
                    var isInMaster = false;
                    var isInData = false;
                    master = ele.attr('dz-master');

                    iElem.css('position','absolute');
                    iElem.css('width',size.width);
                    iElem.css('height',size.height);
                    iElem.css('top',size.top);
                    iElem.css('left',size.left);
                
                    // Master Overlay
                    if (size.master)
                        iElem.css('background','rgba(255,0,0,0.3)');
                    else
                        iElem.css('background','rgba(0,255,0,0.3)');
                        


                    ele.parents()
                      .map(function() {
                          var thisEle = angular.element(this);
                          var isMaster = thisEle.attr('dz-master');
                          if (!angular.isUndefined(isMaster)) 
                            isInMaster = true;
                      });    
                    
                    if (isInMaster)
                         iElem.css('background','rgba(255,0,0,0.3)');                       
                    


                    iElem.bind('mouseenter', function($event){
                        console.log('Overlay Mouseenter');
                      ele.trigger("mouseenter");
                  });

               },
               post: function ($scope, iElem, iAttrs) {

                   iElem.bind('dblclick', function($event){

                        // isSingleClick = false;
                        
                        // setTimeout(function(){
                        //     isSingleClick = true;
                        //     return;
                        // }, 500);
  
                        //  $dazzleUser.dazzleInfo['isEdit'] = true;
                        // if (!$scope.isData)
                        //     $dazzleUser.dazzleInfo['addPanel'] = true;
                        // else
                        //     $dazzleUser.dazzleInfo['addDataPanel'] = true;
                        // iElem.remove();

                     });
               }
           }
       },
        link: function (scope, element, attrs) {
            scope.http = "//d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dzAtomOverlay";
            scope.type = "dzAtomOverlay";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
 

        },
        controller: function ($scope, $element, $attrs) {
            

            $scope.target = $dazzleUser.dazzleInfo['overlayEle'];


            // var contextMenu=dzFn.getContextMenu($scope.target);
            // console.log('Context Menu',contextMenu);


            $scope.menuOptions = [];

            // $scope.menuOptions = [
            //     ["編輯", function () {
            //         var ele = $scope.target;

            //         $dazzleUser.dazzleInfo['isEdit'] = true;
            //         // $dazzleUser.dazzleInfo['needCompile'] = true;
            //         $dazzleUser.dazzleInfo['addPanel'] = true;
            //         $element.remove();
            //     }],
                
            //     ["啟用／取消Master", function () {
            //         var ele = $scope.target;
            //         var master = ele.attr('dz-master');
            //         if (!angular.isUndefined(master))
            //             ele.removeAttr('dz-master');
            //         else
            //             ele.attr('dz-master','');
            //         $compile(ele)($scope);
            //         $element.remove();
            //     }],
            //     ["刪除", function ($itemScope) {
            //         var ele = $scope.target;
            //         ele.remove();                    
            //         $element.remove();
            //     }]
            // ];

            var ele = $scope.target;
            var eleMenu = [];

 //           eleMenu = dzFn.getContextMenu(ele);
            eleMenu = $dazzleUser.dazzleInfo['contextMenu'];
            console.log('Context2',eleMenu);
            $scope.menuOptions.push(eleMenu);


            function changeModel(ele,name){
                var item = ele.parent().find('input');
                if (!angular.isUndefined(item))
                    item.attr('ng-model',"form['"+name+"']");
            }
        }
    };
    return dzOverlay;
});



// }
// })