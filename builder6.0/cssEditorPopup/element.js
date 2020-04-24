var app = angular.module('demoApp');
app.directive('cssEditorPopup', function ($compile, $templateRequest, $mdDialog, $dazzlePopup) {
    var name = 'cssEditorPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/"+name+"/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');


                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');
                $scope.thisPage = $dazzleUser.getDazzleInfo('thisPage');
                $scope.csss = params.csss || [];
                $scope.selectedIndex = 0;
                
                $scope.code = '';

                $scope.init = function () {
                    
                    var bucket = $scope.exportBucket;
                    var key = 'css/'+$scope.thisPage+'.css';
                     $dazzleS3.getFile(bucket, key).then(function (oldCode) {
                        $scope.code = oldCode;
                    }, function (err) {
                        $scope.code = '';
                    });
                }
                $scope.selectFont = function(font) {
                    if (!font.label) {
                        var length = $scope.csss.length;
                        $scope.csss.push({
                            label:'css'+length,
                            text:''
                        });
                        $scope.currentFont = $scope.csss[length];
                    } else 
                        $scope.selectedIndex=1;
                    console.log($scope.currentFont);

                }
                
                $scope.saveCSS=function(css) {
                    $scope.selectedIndex=0;

                    console.log($scope.csss);
                }

                $scope.cancel = function() {
                    $mdDialog.hide();
                }
                $scope.save = function() {
                    var bucket = $scope.exportBucket;
                    var key = 'css/'+$scope.thisPage+'.css';
                    $dazzleUser.setDazzleInfo('csss',$scope.csss);
                    $dazzleS3.saveFile(bucket, key, $scope.code);
                    console.log($scope.code);
                    $mdDialog.hide($scope.csss);
                }
                $scope.editCSS = function() {
                    var bucket = $scope.exportBucket;
                    var key = 'css/'+$scope.thisPage+'.css';
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
                }
        }
    };
    return link;
});