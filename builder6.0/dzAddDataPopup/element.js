var app = angular.module('demoApp');
app.directive('dzAddDataPopup', function ($compile, $templateRequest, $mdDialog,userInfo,pageInfo,dzS3) {
    var name = 'dzAddDataPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: 'http://d27btag9kamoke.cloudfront.net/builder6.0/'+name+'/element.html?id=' + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "//d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dzAddPagePopup";
            scope.type = "dzAddPagePopup";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser,$dazzlePopup) {
            
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');
                $scope.template = params.template || null;
                $scope.table = params.table ||null;
                if (!$scope.template){
                    alert("未曾製作資料樣辦");
                    $scope.cancel();
                }
                if (!$scope.table){
                    alert("未曾設定資料表");
                    $scope.cancel();
                }
                console.log('Template',$scope.template);
                $scope.useTemplate = true;
                
                $scope.addNewData = function() {
                    
                                
                    dzS3.checkFile(userInfo.exportBucket,$scope.newPageName+'.html').then(function(check){
                        if (!check)
                            addPage($scope.template);
                        else {
                            
                             if (confirm('已有此資料頁, 會否到該頁繼續編輯?'))
                                 location.href = $scope.newPageName+'.html';

                        }
                           
                    });
                       
                }
                
                function addPage(template=null){
                    if(template) {
                        dzS3.copyFile(userInfo.exportBucket+'/'+template,userInfo.exportBucket,$scope.newPageName+'.html').then(function(){
                            if (confirm('新頁已開，是否跳至新頁？'))
                                location.href = $scope.newPageName+'.html';
                       });
                    } else {
                       $dazzlePopup.toast('空白頁會開通');
                        dzS3.saveFile(userInfo.exportBucket,$scope.newPageName+'.html','').then(function(){
                                if (confirm('新頁已開，是否跳至新頁？'))
                                    location.href = $scope.newPageName+'.html';
                        });  
                    }
                    
                }
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
            
            
        }
    };
    return link;
});