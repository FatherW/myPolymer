var app = angular.module('demoApp');
app.directive('skmgpsFindClassmate', function ($compile, $templateRequest, $mdDialog, $uibModal,$http) {
    var skmgpsFindClassmate = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "//d25k6mzsu7mq5l.cloudfront.net/builder6.0/skmgpsFindClassmate/element.html?id=" + new Date().getTime(),

        link: function ($scope, element, attrs) {

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
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "searchData",
                            "index": "www.skmgps.org",
                            "type": "chats",
                            "body": {
                                "query": {
                                    "bool":{
                                        "must":[
                                            { "match": { "parent": "0" } },
                                            { "match": { "tags": "找同學" } }
                                        ]
                                    }
        
                                },
                                "sort": [
                                    {"timestamp": {"order": "desc"}}
                                ],
                                "from": 0,
                                "size": 100
                            }
                        }
                    }).then(function (result) {
                        console.log(result);
                        if (result.data.code < 0) {
                            console.log('Login Unsucessful');
                            resolve();
                        } else {
                            //console.log('ID',id,result.data.resolve);
                            var posts = result.data.resolve;
                            var a=0;
                            $scope.posts = posts;
                        }
                    });
        
            $scope.now = function() {
                return new Date().getTime();
            }
            $scope.getReply=function(id) {
                return new Promise(function (resolve, reject) {
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data":{
                            "action": "searchData",
                            "index": "www.skmgps.org",
                            "type": "chats",
                            "body": {
                                "query":{
                                    "match":{
                                        "parent": id
                                    }
                                },
                                "sort":[
                                    {"timestamp":{"order":"desc"}}
                                ],
                                "from":0,
                                "size":100
                            }
                        }
                    }).then(function (result) {
                        console.log(result);
                        if (result.data.code < 0) {
                            console.log('Login Unsucessful');
                            resolve([]);
                        } else {
                            //console.log('ID',id,result.data.resolve);
                            resolve(result.data.resolve);
                        }
                    });
        
        
                });
            }
            $scope.initFindClassMate = function(){
                return new Promise(function (resolve, reject) {
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "searchData",
                            "index": "www.skmgps.org",
                            "type": "chats",
                            "body": {
                                "query": {
                                    "bool":{
                                        "must":[
                                            { "match": { "parent": "0" } },
                                            { "match": { "tags": "找同學" } }
                                        ]
                                    }
        
                                },
                                "sort": [
                                    {"timestamp": {"order": "desc"}}
                                ],
                                "from": 0,
                                "size": 100
                            }
                        }
                    }).then(function (result) {
                        console.log(result);
                        if (result.data.code < 0) {
                            console.log('Login Unsucessful');
                            resolve();
                        } else {
                            //console.log('ID',id,result.data.resolve);
                            var posts = result.data.resolve;
                            var a=0;
                            $scope.posts = posts;
                        }
                    });
                });
        
            }
            $scope.inits = function(){
                return new Promise(function (resolve, reject) {
                    $scope.user = store.get('client-user');
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "searchData",
                            "index": "www.skmgps.org",
                            "type": "chats",
                            "body": {
                                "query": {
                                    "match": {
                                        "parent": "0"
                                    }
                                },
                                "sort": [
                                    {"timestamp": {"order": "desc"}}
                                ],
                                "from": 0,
                                "size": 100
                            }
                        }
                    }).then(function (result) {
                        console.log(result);
                        if (result.data.code < 0) {
                            console.log('Login Unsucessful');
                            resolve();
                        } else {
                            //console.log('ID',id,result.data.resolve);
                            var posts = result.data.resolve;
                            var a=0;
                            $scope.posts = posts;
                        }
                    });
                });
        
            }
        
            $scope.reply = function(id){
                $('#reply-'+id).show();
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
                        "type": "chats",
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
        
        
            $scope.submitReply = function(parent,msg){
                console.log('Save Message',msg);
                var id = new Date().getTime();
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data":{
                        "action": "createData",
                        "index": "www.skmgps.org",
                        "type": "chats",
                        "id": id,
                        "body": {
                            "id":id,
                            "user": $scope.user['login'],
                            "message":msg,
                            "parent":parent,
                            "title":$scope.title,
                            "timestamp": id
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
        
            $scope.submitClassMessage = function(parent=0){
                console.log('Save Class Message');
                var id = new Date().getTime();
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data":{
                        "action": "createData",
                        "index": "www.skmgps.org",
                        "type": "chats",
                        "id": id,
                        "body": {
                            "id":id,
                            "user": $scope.user['login'],
                            "message":$scope.post,
                            "parent":parent,
                            "title":$scope.title,
                            "timestamp": id,
                            "tags":["找同學"]
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
        
            $scope.submitMessage = function(parent=0){
                console.log('Save Message');
                var id = new Date().getTime();
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data":{
                        "action": "createData",
                        "index": "www.skmgps.org",
                        "type": "chats",
                        "id": id,
                        "body": {
                            "id":id,
                            "user": $scope.user['login'],
                            "message":$scope.post,
                            "parent":parent,
                            "title":$scope.title,
                            "timestamp": id
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
                if ($scope.user['login']==user || $scope.user['login']=="admin")
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
    return skmgpsFindClassmate;
});