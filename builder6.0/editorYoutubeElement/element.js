var app = angular.module('demoApp');
app.filter('utrusted', ['$sce', function ($sce) {
    return function (url) {
        var video_id = url.split('v=')[1].split('&')[0];
        return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + video_id);
    };
}]);
app.directive('editorYoutubeElement', function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleS3,$dazzleData,$dazzleFn) {
    var editorYoutubeElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
//        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/file6.0/directive-template.html",
        link: function (scope, element, attrs) {
            scope.http = "//d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "editorYoutubeElement";
            scope.type = "editorYoutubeElement";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {


                console.log('Editor Custom Init');

                if (angular.isUndefined(scope.model.youtubeId)) {
                    if (!angular.isUndefined(element.attr('src')) && element.attr('src')) {
                        scope.model.src = element.attr('src');
                    } else {
                        scope.model.src = "https://www.youtube.com/embed/L0MK7qz13bU";
                    }
                }
                
                $dazzleFn.dataInitByType(scope.model.db).then(function(value){
//                   scope.model.src = "https://www.youtube.com/embed/" + scope.getYouTubeID(value);
                    scope.model.src = value;
                   scope.useTemplate();
                },function(err){
                    scope.model.src = "";
                });


                element.find('[bind-html-compile]').addClass('paddingForMenu');
                 var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions" class="paddingForMenu"></div>');
                element.html(template);
                $compile(template)(scope);



            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["更換YouTube", function () {
                    var confirm = $mdDialog.prompt()
                        .title('請輸入你的Youtube URL')
                        .textContent('例如：https://www.youtube.com/watch?v=L0MK7qz13bU')
                        .ariaLabel('youtubeUrl')
                        .placeholder('請輸入你的Youtube URL')
                        .initialValue($scope.model.src)
                        .ok('確定')
                        .cancel('取消');
                    $mdDialog.show(confirm).then(function (result) {
                        $scope.model.src = "https://www.youtube.com/embed/" + $scope.getYouTubeID(result);
                        $scope.useTemplate();
                        if(!angular.isUndefined($scope.model.db))
                            $dazzleData.saveRecord($scope.model.db,$scope.model.src).then(function(result){
                               console.log('Saved');
                            });

                    });
                }]
            ];
            $scope.getYouTubeID = function (url) {
                var ID = '';
                url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
                if (url[2] !== undefined) {
                    ID = url[2].split(/[^0-9a-z_\-]/i);
                    ID = ID[0];
                } else {
                    ID = url;
                }
                return ID;
            }
             $scope.beforeAtomSaved = function () {
            
                if (!angular.isUndefined($scope.model.db)){
                    //var db
                    $dazzleData.saveRecord($scope.model.db,$scope.model.src).then(function(){
                        console.log('Saved');
                    });
                }
            }
        }
    };
    return editorYoutubeElement;
});