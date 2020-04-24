var app = angular.module('demoApp');
app.directive('dzLink', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,$dazzlePopup,$dazzleData,$dazzleFn) {
    var dzLink = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "//d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dzLink";
            scope.type = "dzLink";
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

          var text  = element.text();
           $dazzleInit.editorCustomInit(scope, element, attrs).then(function () {

        
                    //     scope.model.link=element.href;

                    element.html('<span context-menu="menuOptions">'+text+'</span>');
                    $compile(element.contents())(scope);
                    


             });
        },
        controller: function ($scope, $element, $attrs) {
           

            //$dazzleInit.featherEditorInit($scope);
            $scope.menuOptions = [
                ["編緝連結文字", function ($itemScope) {
                     var confirm = $mdDialog.prompt()
                      .title('更改連結文字')
                      .placeholder('諭輸入內容')
                      .initialValue($element.text())
                      .required(true)
                      .ok('OK')
                      .cancel('取消');
                
                    $mdDialog.show(confirm).then(function(result) {
                        $element.find('span').text(result);
                    }, function() {

                    });
                }],
                ["更換連結", function () {
                    var params = {
                        "name":"dzLinkPopup",
                        "directive":"<dz-link-popup></dz-link-popup>"
                    }
                    $dazzlePopup.callPopup(params).then(function(result){
                       console.log(result); 
                       $element.attr('href',result.link);
                       
                    });

                }]
            ];


        }
    };
    return dzLink;
});