var app = angular.module('demoApp');
app.directive('skmgpsPost', function ($compile, $templateRequest, $mdDialog, $uibModal,$http) {
    var skmgpsPost = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "//d25k6mzsu7mq5l.cloudfront.net/builder6.0/skmgpsPost/element.html?id=" + new Date().getTime(),

        link: function ($scope, element, attrs) {
            // scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            // scope.directiveId = "skmgpsPost";
            // scope.type = "skmgpsPost";
            // scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            // scope.templateUrl = scope.http + scope.templatePath;
            // scope.editorCustomInit(scope, element, attrs).then(function () {

            //     var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
            //     element.html(template);
            //     $compile(template)(scope);
            // });
            
            var user = store.get('client-user');
            
            if (!user) {
                alert('閣下並沒權限瀏覽此頁，請登入後再試吧。');
                location.href = "index.html";
            }
            $scope.user = user;
            
        },
        controller: function ($scope, $element, $attrs) {
             AWS.config = new AWS.Config();
            AWS.config.accessKeyId = "AKIAJAYI3B7RORBOTWPQ";
            AWS.config.secretAccessKey = "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";
            AWS.config.region = "ap-northeast-1";
            $scope.user = store.get('client-user');
                var query = {
                    "query":{
                        "match":{
                            "parent":"0"
                        }
                    },
                    "sort":[
                        {"timestamp":{"order":"desc"}}
                    ],
                    "from":0,
                    "size":100
                };
        
                console.log('Query',query);
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data":{
                        "action": "searchData",
                        "index": "www.skmgps.org",
                        "type": "posts",
                        "body":query
                    }
                }).then(function (result) {
                    console.log(result);
                    if (result.data.code < 0) {
                        console.log('Login Unsucessful');
                    } else {
        //                console.log('ID',id,result.data.resolve);
        
                        $scope.posts = result.data.resolve;
                    }
                });
            $scope.now = function() {
                return new Date().getTime();
            }
        
            $scope.inits = function(){
                $scope.user = store.get('client-user');
                var query = {
                    "query":{
                        "match":{
                            "parent":"0"
                        }
                    },
                    "sort":[
                        {"timestamp":{"order":"desc"}}
                    ],
                    "from":0,
                    "size":100
                };
        
                console.log('Query',query);
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data":{
                        "action": "searchData",
                        "index": "www.skmgps.org",
                        "type": "posts",
                        "body":query
                    }
                }).then(function (result) {
                    console.log(result);
                    if (result.data.code < 0) {
                        console.log('Login Unsucessful');
                    } else {
        //                console.log('ID',id,result.data.resolve);
        
                        $scope.posts = result.data.resolve;
                    }
                });
        
            }
        
            $scope.uploadPhoto=function(index,acceptType='imageOnly'){
                var x = document.createElement("INPUT");
                x.setAttribute("type", "file");
                if(acceptType=='imageOnly'){
                    x.setAttribute("accept","image/*");
                }
                x.click();
                x.addEventListener('change', function () {
                    var file = this.files[0];
                    console.log(file);
                    if (file) {
                        var bucket = new AWS.S3();
                        var params = { Bucket: 'www.skmgps.org', Key: 'files/'+new Date().getTime()+"_"+file.name, ContentType: file.type, Body: file };
                        bucket.upload(params, function(err, data) {
                        },function(err,data){
                            console.log('Index',index,data.Location);
        
                            $scope.$apply(function(){
                                if (index==1)
                                    $scope.image1 = data.Location;
                                if (index==2)
                                    $scope.image2 = data.Location;
                                if (index==3)
                                    $scope.image3 = data.Location;
                            });
        
        
                            console.log($scope.image1);
                        });
                    };
                });
        
            }
        
        
            $scope.deletePost = function(id){
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data":{
                        "action": "deleteData",
                        "index": "www.skmgps.org",
                        "type": "posts",
                        "id": id
                    }
                }).then(function (result) {
                    console.log(result);
                    if (result.data.code < 0) {
                        console.log('Delete Unsucessful');
                    } else {
                        location.reload();
        //                		$('.post-'+id).remove();
                    }
                });
            }
        
        
            $scope.submitMessage = function(){
                console.log('Save Message');
                var id = new Date().getTime();
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data":{
                        "action": "createData",
                        "index": "www.skmgps.org",
                        "type": "posts",
                        "id": id,
                        "body": {
                            "id":id,
                            "user": $scope.user['name'],
                            "message":$scope.post,
                            "parent":"0",
                            "timestamp": id,
                            "image1":$scope.image1,
                            "image2":$scope.image2,
                            "image3":$scope.image3
                        }
                    }
                }).then(function (result) {
                    console.log(result);
                    if (result.data.code < 0) {
                        console.log('Create Unsucessful');
                    } else {
                        console.log('Create Successful');
                        location.reload();
                    }
                });
            }
        
            $scope.isMyPost = function(user){
                if ($scope.user['name']==user || $scope.user['login']=="admin")
                    return true;
                else
                    return false;
            }
            $scope.myDate = function(timestamp){
                //console.log(timestamp);
                if (timestamp> 1000000000000)
                    return new Date(timestamp).toLocaleDateString();
                else
                    return new Date(timestamp*1000).toLocaleDateString();
            }          
            
        }
    };
    return skmgpsPost;
});