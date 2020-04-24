var app = angular.module('demoApp');
app.directive('dzUl', function ($compile, $templateRequest, $uibModal, $mdDialog,$dazzlePopup,$dazzleInit) {
    var dzUl = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
//        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/file6.0/directive-template.html",
        link: function (scope, element, attrs) {
            scope.http = "//d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dzUl";
            scope.type = "dzUl";
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

//            console.log('DZ UL',element.text());

            var menu = [];
            angular.forEach(element.find('li'),function(item,key){
                console.log('DZ UL',angular.element(item).text());
                        menu.push({
                            "title": angular.element(item).text(),
                            "link": angular.element(item).find('a').attr('href'),
                            "html": angular.element(item)[0].outerHTML,
                            "id": "item-" + new Date().getTime() + key
                        });
                                
            });
            
            
            $dazzleInit.editorCustomInit(scope, element, attrs).then(function () {
      
                    scope.model.menu = menu;

                console.log('Dz Ul',scope.model.menu);
                
                 element.html('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                $compile(element.contents())(scope);
                    
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["編緝Menu", function ($itemScope) {
                
                    var params = {
                        name: 'menuPopup',
                        menu: $scope.model.menu,
                        directive: "<menu-popup></menu-popup>"
                    };
                    
                    $dazzlePopup.callPopup(params).then(function(menu){
                        $scope.model.menu = menu;
                        // var html = '';
                        // angular.forEach(menu,function(item,key){
                        //     html += item.html
                        // });
                        // $scope.model.html = html;
                        // console.log($scope.model.html);
                        $dazzleInit.useTemplate($scope);
                    });
                    
                }],
                 ["刪除", function ($itemScope) {
                        $element.remove();
                 }],
               ["更換模版", function () {
                    var params = {
                        "name": 'templatePopup',
                        "directive": '<template-popup></template-popup>',
                        'model': $scope.model
                    };

                    $dazzlePopup.callPopup(params).then(function(template){
                             $dazzleInit.useTemplate($scope);
                    });

                }]
            ];
        }
    };
    return dzUl;
});