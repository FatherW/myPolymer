var app = angular.module('demoApp');
app.directive('dzLi', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,$dazzlePopup,$dazzleData,$dazzleFn) {
    var dzLi = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
        
        compile: function (tElem, tAttrs) {
           console.log(': compile');
           console.log(tElem.html());
           return {
               pre: function (scope, iElem, iAttrs) {
                    iElem.attr('context-menu','menuOptions');
                    iElem.attr('text','');
                     $dazzleInit.editorCustomInit(scope, iElem, iAttrs);
               },
               post: function (scope, iElem, iAttrs) {
                   console.log(': post link');
//                   console.log(iElem.html());
               }
           }
       },
        link: function (scope, element, attrs) {
            scope.http = "//d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dzLi";
            scope.type = "dzLi";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
 

            //   element.on('mouseenter', function() {
            //         height = element.children('div')[0].offsetHeight;
            //         width = element.children('div')[0].offsetWidth;
                    
            //         element.children('div').append('<div class="dz-overlay"></div>');
            //         element.find('.dz-overlay').css('width',width);
            //         element.find('.dz-overlay').css('height',height);
            //     });
    
            //     element.on('mouseleave', function() {
            //         element.find('.dz-overlay').remove();
            //     });

                // scope.id = element.attr('id') || new Date().getTime();
                
                // element.attr('id',scope.id);
                
                // console.log('Ele',element.attr('id'));
          
           //$dazzleFn.editorCustomInit(scope, element, attrs).then(function (object) {
                
        
                //    element.html('<span bind-html-compile="model.html" context-menu="menuOptions"></span>');
                //    $compile(element.contents())(scope);
                    


         // });
        },
        controller: function ($scope, $element, $attrs) {
           

            //$dazzleInit.featherEditorInit($scope);
            $scope.menuOptions = [
                ["向上增加", function ($itemScope) {
                    
                    console.log('My ID',$scope.id);
                    var cloneEle = $('#'+$scope.id).clone();
                    cloneEle.attr('id',new Date().getTime());
                    
                    var ele = angular.element(cloneEle);
                    ele.insertBefore($element);
                    $compile(ele)($scope);
                     
                    
                }],
                ["向下增加", function ($itemScope) {
                    
                    var cloneEle = $('#'+$scope.id).clone();
                    cloneEle.attr('id',new Date().getTime());
                    
                    var ele = angular.element(cloneEle);
                    ele.insertAfter($element);
                    $compile(ele)($scope);
                        

                }],
                
                ["更換模版", function () {
                  

                }], ["刪除", function () {
                    
                    $element.remove();
                }]
            ];


        }
    };
    return dzLi;
});