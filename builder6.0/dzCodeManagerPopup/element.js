var app = angular.module('demoApp');
var name = 'dzCodeManagerPopup';

app.directive(name, function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleUser,$dazzleS3,$dazzlePopup,$dazzleFn,$dazzleInit,$dazzleData) {
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/dzCodeManagerPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http,$mdSidenav, $mdBottomSheet,$log) {
            var userBucket = $dazzleUser.getDazzleInfo('userBucket');
            var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
            var exportBucket = $dazzleUser.getDazzleInfo('exportBucket');
            //$scope.thisPage = $dazzleUser.getDazzleInfo('thisPage');
            var filename = location.pathname.substring(location.pathname.lastIndexOf('/')+1);
					if (!filename)
						$scope.thisPage = 'index.html';
					else
						$scope.thisPage = filename;
            $dazzleUser.dazzleInfo['thisPage'] = $scope.thisPage;
            $scope.thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');
            $scope.masterJson = $dazzleUser.getDazzleInfo('masterJson');
            $scope.add = function (array, type) {
                if (type == 'js') {
                    if (angular.isUndefined(array.js)) {
                        array.js = [];
                    }
                    array.js.push("http://js.js/js.js");
                } else if (type == 'css') {
                    if (angular.isUndefined(array.css)) {
                        array.css = [];
                    }
                    array.css.push("http://css.css/css.css");
                }
            }
            $scope.remove = function (array, index) {
                array.splice(index, 1);
            }
            $scope.codePopup = function (type, page) {
                var bucket;
                var key;
                switch (type) {
                    case "html":
                        bucket = userBucket;
                        if (page == 'master') {
                            key = websiteKey + 'master.html';
                        } else {
                            key = 'js/' + page + '.js';
                            key = websiteKey + 'page/' + page + '/page.html';
                        }
                        break;
                    case "js":
                        bucket = exportBucket;
                        key = 'js/' + page + '.js';
                        break;
                    case "css":
                        bucket = exportBucket;
                        key = 'css/' + page + '.css';
                        break;
                }
//                if (page !== 'master' && type == 'html') {
//                    $dazzleInit.editRootHtml();
        
//                } else {
                    $dazzleS3.getFile(bucket, key).then(function (oldCode) {
                        var params = {
                            name :'dzEditCodePopup',
                            directive: '<dz-edit-code-popup></dz-edit-code-popup>',
                            code: oldCode,
                            bucket: bucket,
                            key: key,
                            big:true
                        };
                        $dazzlePopup.callPopup(params).then(function(newCode){
                            $dazzleS3.saveFile(bucket, key, newCode);
                        });
                        // $dazzlePopup.code(oldCode, type).then(function (newCode) {
                        //     $dazzleS3.saveFile(bucket, key, newCode);
                        // })
                    }, function (err) {
                        $dazzleS3.saveFile(bucket, key, '').then(function () {
                           // $scope.codePopup(type, page);
                           
                           var params = {
                                name :'dzEditCodePopup',
                                directive: '<dz-edit-code-popup></dz-edit-code-popup>',
                                code: '',
                                bucket: bucket,
                                key: key,
                                big:true
                            };
                            $dazzlePopup.callPopup(params).then(function(newCode){
                                $dazzleS3.saveFile(bucket, key, newCode);
                            });
                        });
                    });
     //           }
            }
        	$scope.changeBackground = function(page) {			
        //			console.log('Hello');
        		$dazzleFn.changeBackground(page);
        	}
            $scope.cancel = function () {
                $mdDialog.hide();
            }
        }
    };
    return link;
});

 app.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
  });

