var app = angular.module('demoApp');
var name = 'hkfspaCourse';

app.directive(name, function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleUser,$dazzleS3,$dazzlePopup,$dazzleFn,$dazzleInit,pageInfo,userInfo,dzFn) {
    var link = {
        restrict: 'E',
        scope: true,
      //  templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/hkfspaCourse/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "//d27btag9kamoke.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http,$mdSidenav, $mdBottomSheet,$log) {
             $(document).ready(function(){
                //$('.panel-outline .medium-editor-element').hide();
                $('a[type=submit]').attr('href','#');
                /*$('.submitPay').click(function(e){
                    console.log('Hello');
                    console.log(location.pathname);
                    var id = location.pathname.replace(".html","");
                    id = id.replace("/","");
                    location.href ="enroll.html?course="+id;
                });
                */
                $(".panel-outline .icon").click(function(){
                    $(this).parent().find('.medium-editor-element').slideToggle();
                    $(this).find('i').toggleClass('glyphicon-chevron-right');
                    $(this).toggleClass('active');
                });
            });

        }
    };
    return link;
});


