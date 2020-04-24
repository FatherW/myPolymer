var app = angular.module('demoApp');
//                var ace = require('brace');
//                require('brace/mode/javascript');
//                require('brace/theme/monokai');
                 
                
app.directive('dzEditCodePopup', function ($compile, $templateRequest, $mdDialog, $dazzlePopup,$dazzleS3) {
    var name = 'dzEditCodePopup';
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
                console.log(params);
                console.log('dzEditCodePopupController');
                
                $scope.bucket = params.bucket || "";
                $scope.key = params.key || '';
                $scope.id = params.id || '';
                console.log('My ID',$scope.id);
                $scope.codeType = params['codeType'] || "";
            
                // var hotkeys = $dazzleUser.getHotKeys();
                //
                // hotkeys.bindTo($scope).add({
                //     combo: ['ctrl','s'],
                //     callback: function() {
                //         $scope.save();
                //     }
                // });
                //
                $scope.loadTemplate = function(type){
                    return new Promise(function(resolve,reject){
                        switch(type){
                            case 'renderer':
                                
                                break;
                                
                            case 'editor':
                                
                                break;
                                
                            case 'directive':
                                $dazzleS3.getFile('dazzle-template','file6.0/backend6.0-settings.tpl.js').then(function(code){
                                    code = code.replace(/DIRECTIVENAME/g,$scope.id);
                                    resolve(code);
                                },function(err){
                                    reject();
                                });
                                break;
                            
                            default:
                                resolve('');
                            break;
                            
                        }
                        
                    });
                    
                }
                $scope.init = function(){
//                    var editor = brace.edit('javascript-editor');
 //                   editor.getSession().setMode('ace/mode/javascript');
//                    editor.setTheme('ace/theme/monokai');
                                return new Promise(function (resolve, reject) {
                                    $dazzleS3.getFile($scope.bucket,$scope.key).then(function(code){
                                        $scope.$apply(function(){
                                            $scope.code = code;
                                        });
                                        resolve();
                                    },function(err){
                                        $scope.loadTemplate($scope.codeType).then(function(code){
                                            $scope.$apply(function(){
                                                $scope.code = code;
                                            });
                                            resolve();
                                        });
                                    });
                                });

                }
                
            $scope.aceOption = {
                onLoad: function (_ace) {
                    //_ace.setTheme('ace/theme/twilight');
                    if (params.type == 'js' || params.type == 'Javascript' || params.type == 'javascript') {
                        _ace.getSession().setMode("ace/mode/javascript");
                    } else if (params.type == 'css') {
                        _ace.getSession().setMode("ace/mode/css");
                    } else if (params.type == 'html' || params.type == 'htm') {
                        _ace.getSession().setMode("ace/mode/html");
                    }
                }
            };

            
                $scope.save = function () {
                    if ($scope.bucket && $scope.key)
                        $dazzleS3.saveFile($scope.bucket, $scope.key, $scope.code).then(function () {
                            console.log('Saved');
                        });
                    else
                        $mdDialog.hide($scope.code);
            
                }
                $scope.cancel = function () {
                    $mdDialog.cancel();
                }
                
        }
    };
    return link;
});