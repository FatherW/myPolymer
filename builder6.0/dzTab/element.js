var app = angular.module('demoApp');
app.directive('dzTab', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,$dazzlePopup,$dazzleData,$dazzleFn) {
    var dzTab = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
        
        compile: function (tElem, tAttrs) {
           console.log(': compile');
           console.log(tElem.html());
           return {
               pre: function (scope, iElem, iAttrs) {
                    iElem.attr('context-menu','menuOptions');
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
            scope.directiveId = "dzTab";
            scope.type = "dzTab";
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
            $scope.menuOptions =  [
                ["編輯Menu", function () {
    

                    var params = {
                        menu: $scope.model.menu,
                        directive:'<menu-popup></menu-popup>'
                    };
                    $dazzlePopup.callPopup(params).then(function(menu) {
                        $scope.model.menu = menu;
                        $scope.useTemplate();

                    
                    });
                    

                }], ["更換模版", function () {
                    $mdDialog.show({
                        controller: 'templatePopupController',
                        templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/templatePopup/popup.html' + "?id=" + new Date().getTime(),
                        locals: {
                            rootScope: $scope
                        }
                    }).then(function (template) {
                        $scope.useTemplate();
                    });
                }]
                
            ];


        }
    };
    return dzTab;
});