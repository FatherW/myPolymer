var app = angular.module('demoApp');
var _cdn = "//d27btag9kamoke.cloudfront.net/";
var _name ="dzVideo";
app.directive(_name, function ($compile, $templateRequest, $mdDialog, $dazzlePopup,dzFn,atomInfo) {
    var link = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: _cdn+"builder6.0/"+_name+"/element.html?id=" + new Date().getTime(),

        link: function ($scope, element, attrs) {
            // scope.model={
            //     "video":"https://www.youtube.com/embed/ieHjrXtS0GQ?autoplay=1&controls=1&showinfo=1&modestbranding=1&loop=1&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=0&playlist=ieHjrXtS0GQ&enablejsapi=1&origin=http%3A%2F%2Fdemo.dazzle.website&widgetid=1"
            // };
            // scope.model.video = $sce.trustAsResourceUrl("https://www.youtube.com/embed/L0MK7qz13bU");
            
            
                var id = element.attr('id') || new Date().getTime();
                $scope.id = id;
                element.attr('id',id);
                $scope.model = atomInfo.initAtom(id);
                
                 $scope.menuOptions = 
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
                                atomInfo.atom[$scope.id] = $scope.model;
                                $compile(element.contents())($scope);
                            });
                        }];
                atomInfo.atom[$scope.id]['contextMenu'] = $scope.menuOptions;
                
                if (angular.isUndefined(atomInfo.atom[id]['src']))
                    atomInfo.atom[id]['src']  =  "https://youtu.be/ieHjrXtS0GQ";
                $scope.model = atomInfo.atom[id];
                console.log('DZ Youtube',$scope.model);
                $compile(element.contents())($scope);




                

        },
        controller: function ($scope, $element, $attrs) {
           
            
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
        }
    };
    return link;
});

app.filter('trustUrl', function ($sce) {
    return function(url) {
    return $sce.trustAsResourceUrl(url);
   };
});


