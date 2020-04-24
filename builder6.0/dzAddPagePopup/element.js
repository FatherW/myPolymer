var app = angular.module('demoApp');
app.directive('dzAddPagePopup', function ($compile, $templateRequest, $mdDialog,userInfo,pageInfo,dzS3,dzFn) {
    var name = 'dzAddPagePopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: 'https://d27btag9kamoke.cloudfront.net/builder6.0/'+name+'/element.html?id=' + new Date().getTime(),
//        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/dzAddPagePopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "//d27btag9kamoke.cloudfront.net/";
//            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dzAddPagePopup";
            scope.type = "dzAddPagePopup";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser,$dazzlePopup) {
            
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');
                var link = params['link'] || '';
                $scope.template = params.template || pageInfo.thisPage;
                console.log('Template',$scope.template);
                $scope.useTemplate = true;
                $scope.thisSite = location.hostname;
                $scope.newPageName = link.replace(".html","") || '';
                $('#success').hide();
                
                $scope.addNewPage = function() {
                    
                    
                    dzS3.checkFile(userInfo.exportBucket,$scope.newPageName+'.html').then(function(check){
                        if (!check)
                            addPage($scope.template);
                        else {
                             if (confirm('此頁已開，是否覆寫？(註：此頁曾經儲存的東西將會刪除。）')) {
                                 dzFn.removePage($scope.newPageName+'.html').then(function(){
                                    addPage($scope.template);                                
                                 });
                             }

                        }
                           
                    });
                       
                }
                
                $scope.copyTemplate = function() {
                    dzS3.getFile(userInfo.exportBucket,"template.html").then(function(html){
                            dzS3.saveFile(userInfo.exportBucket,$scope.newPageName+'.html',html).then(function(){
                                    if (confirm('新頁已開，是否跳至新頁？'))
                                        location.href = $scope.newPageName+'.html';
                            });                                          
                    });

                    

                }
                $scope.copyPage=function() {
                    var link = prompt("請輸入欲複製之網頁連結");
                    $scope.url = link;
                    
                }
                function addPage(template=null){
                    if (!$scope.newPageName){
                        alert('未輸入新頁名稱');
                        return;
                    }
                    if ($scope.url){
                        dzFn.pageImport($scope.url,$scope.newPageName+'.html').then(function(){
                            $scope.newUrl = "http://"+location.hostname+'/'+$scope.newPageName+'.html';
                            $('#success').show();
                        });                        
                    }

                    else {
                        if (confirm('沒有網頁複製源連結，要開空白頁？')){
                            $dazzlePopup.toast('空白頁會開通');
                            dzS3.saveFile(userInfo.exportBucket,$scope.newPageName+'.html','').then(function(){
                                    if (confirm('新頁已開，是否跳至新頁？'))
                                        location.href = $scope.newPageName+'.html';
                            });  
                        }
                    }
                    
                    // if(template) {
                    //     dzS3.copyFile(userInfo.exportBucket+'/'+template,userInfo.exportBucket,$scope.newPageName+'.html').then(function(){
                    //         if (confirm('新頁已開，是否跳至新頁？'))
                    //             location.href = $scope.newPageName+'.html';
                    //   });
                    // } else {
                    //   $dazzlePopup.toast('空白頁會開通');
                    //     dzS3.saveFile(userInfo.exportBucket,$scope.newPageName+'.html','').then(function(){
                    //             if (confirm('新頁已開，是否跳至新頁？'))
                    //                 location.href = $scope.newPageName+'.html';
                    //     });  
                    // }
                    
                }
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
            
            
        }
    };
    return link;
});