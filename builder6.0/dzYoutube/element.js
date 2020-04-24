var app = angular.module('demoApp');
var _cdn = "//d27btag9kamoke.cloudfront.net/";
var _name ="dzYoutube";
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
                var editMode = store.get('editMode') || 'normal';
                if (editMode=='admin')
                    $scope.isAdmin = true;
                else
                    $scope.isAdmin = false;
                    console.log('Youtube',editMode,$scope.isAdmin);
                $scope.id = id;
                element.attr('id',id);
                console.log(atomInfo.atom);
                if(angular.isUndefined(atomInfo.atom[id]))  
                    atomInfo.initAtom(id);
                
                if (angular.isUndefined(atomInfo.atom[id]['src']))
                    atomInfo.atom[id]['src']  =  "https://www.youtube.com/embed/L0MK7qz13bU";
                    
                $scope.model = atomInfo.atom[id];
                
                console.log('DZ Youtube',$scope.model);
                $compile(element.contents())($scope);




                

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
                        atomInfo.atom[$scope.id] = $scope.model;
                        $compile(element.contents())($scope);
                    });
                }]
            ];
            
            $scope.changeYoutube = function(){
                // var url = prompt("請輸入Youtube連結");
                // var youtubeID = $scope.getYouTubeID(url);
                // url = "https://www.youtube.com/embed/"+youtubeID;
                // atomInfo.atom[$scope.id]['src'] = url;
                // $scope.model = atomInfo.atom[$scope.id];
                // console.log($scope.model);
                // $compile($element.contents())($scope);
                
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
                        //$compile(element.contents())($scope);
                    });
            }
            
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


function start() {
  // 2. Initialize the JavaScript client library.
  gapi.client.init({
    'apiKey': '2FqEt8_S7k6lKi9EcDPWa_53',
    // Your API key will be automatically added to the Discovery Document URLs.
    'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
    // clientId and scope are optional if auth is not required.
    'clientId': '248308376430-16c600aage0quelo5cd0t6eh9mcd0qnt.apps.googleusercontent.com',
    'scope': 'profile',
  }).then(function() {
    // 3. Initialize and make the API request.
    return gapi.client.people.people.get({
      'resourceName': 'people/me',
      'requestMask.includeField': 'person.names'
    });
  }).then(function(response) {
    console.log(response.result);
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
  });
};
// 1. Load the JavaScript client library.
gapi.load('client', start);

