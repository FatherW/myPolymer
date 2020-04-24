var app = angular.module('demoApp');
var name = 'pageInfoManagerPopup';

app.directive(name, function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleUser,$dazzleS3,$dazzlePopup,$dazzleFn,$dazzleInit,pageInfo,userInfo,dzS3) {
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: '//d27btag9kamoke.cloudfront.net/builder6.0/'+name+'/element.html?id=' + new Date().getTime(),
//        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/pageInfoManagerPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http,$mdSidenav, $mdBottomSheet,$log) {

            console.log('New Version2');
            // $scope.title = pageInfo.title;
            // $scope.meta = pageInfo.meta;
            // $scope.pageJs = pageInfo.pageJs;
            // $scope.pageCss = pageInfo.pageCss;
            // $scope.masterJs = pageInfo.masterJs;
            // $scope.masterCss = pageInfo.masterCss;
            // $scope.thisPage = pageInfo.thisPage;
             var bucket;
            var key;
            $scope.showSource = false;
            $scope.isTemplate = false;
            $scope.toggleSource = function(){
                if ($scope.showSource)
                    $scope.showSource = false;
                else
                    $scope.showSource = true;
            }
            $scope.model = pageInfo.model;
            console.log('Info Model',$scope.model);
            $scope.thisPage = pageInfo.thisPage;
            
//            $compile($('#meta-wrapper'))($scope);

            $scope.addType = function(type,index){
                $scope.model[type].splice(index, 0, {'id':new Date().getTime(),'html':''});
            }
            $scope.removeType = function(type,index){
                $scope.model[type].splice(index,1);
            }

            $scope.addJS = function(index){
                $scope.model.script.splice(index, 0, {'id':new Date().getTime(),'html':''});
            }
            $scope.add = function (array, type) {
                    if (angular.isUndefined(array)) {
                        array = [];
                    }
                    array.push("http://");
            }
            
            $scope.new = function() {
                var params = {
                    name: 'dzAddPagePopup',
                    directive: '<dz-add-page-popup></dz-add-page-popup>'
                }

                $dazzlePopup.callPopup(params).then(function(result){
                    
                });                
            }
            
            $scope.removeJS = function(index){
                $scope.model.script.splice(index,1);
            }
            $scope.removePage = function(){
                var del = confirm('注意！頁面一經刪除，就無法復原。你是否確認要刪除此頁?');
                
                if (del) {

                    dzS3.removeFolder(userInfo.userBucket,userInfo.websiteKey).then(function(result){
                    //    dzS3.removeFile(userInfo.exportBucket,pageInfo.thisPage).then(function(result){
                            $dazzlePopup.toast('刪除成功');
                            alert('此頁已刪除。頁面將跳回主頁');
                            location.href = "index.html";
                      //  },function(err){
                        //    console.log('File Error',userInfo.exportBucket,pageInfo.thisPage,err);
                       //     $dazzlePopup.toast('刪除不成功');
                    //    });
                    },function(err){
                        console.log(err);
                      $dazzlePopup.toast('檔案已經不存在，刪除不成功.');
                    });
                }
            }
            $scope.remove = function (array, index) {
                array.splice(index, 1);
            }

            $scope.hasSrc = function(o){
                
                if (o.hasOwnProperty('src'))
                    return true;
                else
                    return false;
            }
            $scope.hasHref = function(o){
                if (o.hasOwnProperty('href'))
                    return true;
                else 
                    return false;
            }
            $scope.htmlEdit = function(bucket,key){
                var html = $('dz-container').html();
                var params = {
                    name :'dzCodePopup',
                    directive: '<dz-code-popup></dz-code-popup>',
                    body: html,
                    big:true
                };
                $dazzlePopup.callPopup(params).then(function(newCode){
                    pageInfo.body = newCode;
                    $('dz-container').html(newCode);
                    $compile($('dz-container'))($scope);
                },);
            }
            $scope.codePopup = function (type, page) {
                bucket = userInfo.exportBucket;
                switch (type) {
                    case "html":
                        if (page == 'master') {
                            key =  userInfo.masterKey+'master.html';
                        } else {
                            key =  $scope.thisPage;
                            $scope.htmlEdit(bucket,key);
                            return;
                        }
                        break;
                    case "js":
                        if (page == 'master') {
                            key =  'js/master.js';
                        } else {
                            key =  'js/'+$scope.thisPage + '.js';
                        }

                        break;
                    case "css":
                        if (page == 'master') {
                            key =  'css/master.css';
                        } else {
                            key =  'css/'+$scope.thisPage + '.css';
                        }

                        break;
                }

                console.log('Page Info',bucket,key);
                    $dazzleS3.getFile(bucket, key).then(function (oldCode) {
                        var params = {
                            name :'dzCodePopup',
                            directive: '<dz-code-popup></dz-code-popup>',
                            body: oldCode,
                            bucket: bucket,
                            key:  key,
                            big:true
                        };
                        $dazzlePopup.callPopup(params).then(function(newCode){
                            $dazzleS3.saveFile(bucket, key, newCode);
                        });
                    }, function (err) {
                        $dazzleS3.saveFile(bucket, key, '').then(function () {

                           var params = {
                                name :'dzCodePopup',
                                directive: '<dz-code-popup></dz-code-popup>',
                                body: '',
                                bucket : bucket,
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
            $scope.save = function () {
 
 
                // $scope.title = pageInfo.title;
                // $scope.meta = pageInfo.meta;
                // $scope.pageJs = pageInfo.pageJs;
                // $scope.pageCss = pageInfo.pageCss;
                // $scope.masterJs = pageInfo.masterJs;
                // $scope.masterCss = pageInfo.masterCss;
                // $scope.thisPage = pageInfo.thisPage;

                pageInfo.model = $scope.model;
                console.log('Page Info',pageInfo.model);
                pageInfo.saveStructure().then(function(){
                    $dazzlePopup.toast('儲存成功');
                });

            }
            $scope.export = function() {
                pageInfo.pageExport();
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

