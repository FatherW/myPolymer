var app = angular.module('demoApp');
app.directive('backendManagerPopup', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzleInit, $dazzleS3, $dazzlePopup, $ocLazyLoad,$dazzleFn) {
    var name = 'backendManagerPopup';
    var link = {
        restrict: 'E',
        scope:  {
           'popup': '@popup',
           'item': '=',
           'field':'@field'
        },
        templateUrl: "//d25k6mzsu7mq5l.cloudfront.net/builder6.0/backendManagerPopup/element.html?id=" + new Date().getTime(),
         link: function (scope, element, attrs) {

        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
  
            var userBucket = $dazzleUser.getDazzleInfo('userBucket');
            var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
            var exportBucket = $dazzleUser.getDazzleInfo('exportBucket');
            var params;
            $scope.params = $dazzleUser.dazzleInfo['params'];
            
            var id = $scope.params['id'];
                          
            $scope.thisPage = $dazzleUser.getDazzleInfo('thisPage');
            $scope.thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');
            $scope.masterJson = $dazzleUser.getDazzleInfo('masterJson');
      
            $scope.rendererPopup = function() {
  
                var params2 = {
                    name : 'dzEditCodePopup',
                    directive:'<dz-edit-code-popup></dz-edit-code-popup>',
                    type:'js',
                    id: id,
                    codeType:'renderer',
                    bucket:'dazzle-template',
                    key: 'backend6.0/'+id+'/'+id+'Renderer.js',
                    big:true
                }
        
                $dazzlePopup.callPopup(params2).then(function(newHtmlCode) {
                
                });
            }
            
            $scope.editorPopup = function(){
                var params2 = {
                    name : 'dzEditCodePopup',
                    directive:'<dz-edit-code-popup></dz-edit-code-popup>',
                    type:'js',
                    codeType:'editor',
                    id: id,
                    bucket:'dazzle-template',
                    key: 'backend6.0/'+id+'/'+id+'Editor.js',
                    big:true
                }
        
                $dazzlePopup.callPopup(params2).then(function(newHtmlCode) {
                });          
                
            }
            $scope.settingsJsPopup = function() {
                var params2 = {
                    name : 'dzEditCodePopup',
                    directive:'<dz-edit-code-popup></dz-edit-code-popup>',
                    type:'js',
                    codeType:'directive',
                    id: id,
                    bucket:'dazzle-template',
                    key: 'backend6.0/'+id+'/setting2.js',
                    big:true
                }
        
                $dazzlePopup.callPopup(params2).then(function(newHtmlCode) {
                });
            }
            $scope.settingsHtmlPopup = function() {
                 var params2 = {
                    name : 'dzEditCodePopup',
                    directive:'<dz-edit-code-popup></dz-edit-code-popup>',
                    type:'html',
                    codeType:'directiveTemplate',
                    id: id,
                    bucket:'dazzle-template',
                    key: 'backend6.0/'+id+'/setting2.html',
                    big:true
                }
        
                $dazzlePopup.callPopup(params2).then(function(newHtmlCode) {
                });
            }
            $scope.cancel = function () {
                $mdDialog.hide();
            }           
        }
    };
    return link;
});