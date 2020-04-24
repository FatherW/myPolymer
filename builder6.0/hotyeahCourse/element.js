var app = angular.module('demoApp');
var nodata = "未有資料（可右click新增)";
app.directive('hotyeahCourse', function ($compile,$http,$dazzleInit,$dazzleUser,$dazzlePopup,$dazzleFn,$dazzleData,$mdDialog,$templateRequest) {
    var dazzleData = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            
                scope.http = "//d25k6mzsu7mq5l.cloudfront.net/";
                scope.directiveId = "hotyeahCourse";
                scope.type = "hotyeahCourse";
                scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
                scope.templateUrl = scope.http + scope.templatePath;
            
              $dazzleInit.editorCustomInit(scope, element, attrs).then(function () {
                    $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                            "data": {
                                "action":"getData",
                                "index":"hotyeah",
                                "type":"school",
                                "id": $('#dazzle-key').text()
                            }
    
                        }).then(function (result) {
                            if (result.data.code >0) {
                                scope.schoolname = result.data.resolve['學校名稱'];
                            } else
                                scope.schoolname = "查無資料";                            
                        },function(){
                                scope.schoolname = "查無資料";                            
                        });          
                        
                  console.log('Hotyeah Load Data');
                    scope.loadData().then(function(){
                        console.log('Hotyeah Loaded');
                            //$dazzleInit.useTemplate(scope);
                            element.html('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                            $compile(element.contents())(scope);
                            
                            setTimeout(function(){ 
                                console.log('Compile DZ Field');
                                 $dazzleInit.useTemplate(scope);
                            }, 5000);
                    });
             });
             
        
          scope.loadHtml = function(type) {
              return new Promise(function (resolve, reject) {
                  var html='';
                  refer = element.attr('refer');
                    index = element.attr('index');
                    scope.model.ids = scope.model.data;
                    scope.model.data = [];                                    
                    if(!Array.isArray(scope.model.ids))
                        scope.model.ids = [scope.model.ids];
                        
                    console.log("IDS",scope.model.ids);
                    scope.loadData(index,refer).then(function(){
                        
                        var templateUrl = "http://d25k6mzsu7mq5l.cloudfront.net/builder6.0/template/dzField/hotyeah.html?id"+ new Date().getTime();
                        
                        $templateRequest(templateUrl).then(function (output) {
                            html = output;
                            resolve(html);
                        });
                    });    
   
                  

              });
              
          }     
             
          scope.loadData = function () {
                console.log('Load Core Directive');
                var i=0;
                
                return new Promise(function (resolve, reject) {
                        $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                            "data": {
                                "action":"searchData",
                                "index":"hotyeah",
                                "type":"course3",
                                "body": {
                                    "query":{
                                        "match":{
                                            "學校ID": $('#dazzle-key').text()
                                        }
                                    }
                                }
                            }
    
                        }).then(function (result) {
                            console.log('Hotyeah Result',result);
                            if (result.data.code >0) {
                                scope.model.data = result.data.resolve;
                            }
                            resolve();
                        },function(){
                            resolve();
                        });     
                });
            }

           
                

        },
        controller: function ($scope, $element, $attrs) {
            var index,table,field;
            $scope.init = function() {

            }
            $scope.myDate = function(timestamp){
                return new Date(timestamp*1000).toLocaleDateString();
            }
			$scope.myTags = function(arr) {
				var str='';
				if (!Array.isArray(arr))
					arr = [arr];
				
				arr.forEach(function(item,index) {
					str = item+','+str;
				});
				return str;
			}
	        $scope.myNumber = function(value){
                if (angular.isUndefined(value))
                    return 0;
                else
                    return parseInt(value);
            }


            $scope.imageUrl = function(uid,file,size) {
                var url = "https://designerrrr-output.s3-ap-northeast-1.amazonaws.com/images/"+uid+"/"+size+"/"+ file;

                console.log('Url',url);
                return url;
            }

            $scope.addData = function(){
                
                var fields  = [
                        '名稱','首圖','描述','價錢','日期s'
                    ];
                var params = {
                    "name": 'hotyeahDataPopup',
                    "directive": '<hotyeah-data-popup></hotyeah-data-popup>',
                    "fields": fields                        
                }
                $dazzlePopup.callPopup(params).then(function(output){
                    
                });
            }

                $scope.exportPage = function (page) {
                    return new Promise(function (resolve, reject) {
                        var json = {
                            "user": $dazzleUser.getUser(),
                            "website": $dazzleUser.dazzleInfo['website'],
                            "exportPage": [page]
                        };
                        console.log('Export JSON',json);

                        $http.post('https://d8fz9pfue5.execute-api.ap-northeast-1.amazonaws.com/prod/single-export', json).then(function (result) {
                            console.log(page + ' Success');
                            resolve(result);
                        }, function () {
                            console.log(page + ' Fail');
                            resolve();
                        });

                    });
                }
            $scope.editPage = function(page){

                  var thisTable = params.$scope.$dazzleUser.dazzleInfo['thisTable'];
                                // createPage(params.data['cid'],'newCourseDetails').then(function () {
                                //   console.log('Hello'); 
                                // });
                    
                    $dazzleData.getTableParamsByName(thisTable).then(function(json){
                        createPage(page,'newCoursesDetails').then(function () {
                            $scope.exportPage(page).then(function(){
                                createCourse(page).then(function(){
                                   $dazzlePopup.toast('成功匯出'); 
                                });                                
                            });

                        });
                    });
             


                function createPage (page, template) {
                    
                    console.log('dazzle-user-' +$dazzleUser.getUser().uid + '/website/' + $dazzleUser.dazzleInfo['websiteId'] + '/json/' + template + '.json', 'dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $dazzleUser.dazzleInfo['websiteId'] + '/json/' + page + '.json');
                    return new Promise(function (resolve, reject) {
                        if (!template) {
                            resolve();
                        } else {
                            Promise.all([
                                $dazzleS3.copyFile('dazzle-user-' + $dazzleUser.getUser().uid + '/website/' + $dazzleUser.dazzleInfo['websiteId'] + '/json/' + template + '.json', 'dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $dazzleUser.dazzleInfo['websiteId'] + '/json/' + page + '.json'),
                                $dazzleS3.copyFile('dazzle-user-' + $dazzleUser.getUser().uid + '/website/' + $dazzleUser.dazzleInfo['websiteId'] + '/page/' + template + '/page.html', 'dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $dazzleUser.dazzleInfo['websiteId'] + '/page/' + page + '/page.html'),
                                $dazzleS3.copyFile('dazzle-user-' + $dazzleUser.getUser().uid + '/website/' + $dazzleUser.dazzleInfo['websiteId'] + '/page/' + template + '/atom.json', 'dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $dazzleUser.dazzleInfo['websiteId'] + '/page/' + page + '/atom.json')
                            ]).then(function () {
                                createCourse(page);
                                resolve();
                            });
        
                        }
                    })
                }
        
                    function createCourse(page) {
                        return new Promise(function (resolve, reject) {
                            var id =  new Date().getTime();
                            var db = {
                                "action":"createData",
                                "index":"dazzle",
                                "type":"website6",
                                "id":id,
                                "body": {
                                    "id":id,
                                    "bucket":"www.hot-yeah.com",
                                    "pagePath":"/admin/"+page+".html",
                                    "用家":["dazzleadmin","hotyeah",$dazzleUser.getUser().uid]
                                }
                            }
                            query = db;
                            console.log('Query',JSON.stringify(query));
                            $http({
                                "method": "post",
                                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                "data": query
        
                            }).then(function (result) {
                                if (result.data.code > 0) {
                                    resolve();
                           
                                } else {
                                    reject();
                                }
                            });                
                        });
                    }
                    
            
            }
              $scope.menuOptions = [
                ["新增課程",function() {
                    
                    $scope.addData();
                }],
                ["課程日曆",function() {
                      var params2 = {
                            big: true,
                            name: 'dzTimeslotPopup',
                            directive:'<dz-timeslot-popup></dz-timeslot-popup>'
                        };
                        $dazzlePopup.callPopup(params2).then(function(events){
                                console.log('My Schedule',events);
                                $dazzleUser.dazzleInfo['atom'][$scope.model.id] = events;
//                                $scope.model.events = events;
                                
                        });
                }],
                
                ["更新課程", function () {
                    
                    index  = $element.attr('index');
                    table = $element.attr('table');
                    field= $element.attr('field');
                    type=$element.attr('type');
                    id = $('#dazzle-key').text();

                    value = $scope.model.data;
                    

                       var params ={
                           name:'dzDataPopup',
                           directive: '<dz-data-popup></dz-data-popup>',
                           index: 'hotyeah',
                           table: 'course3',
                           websiteId: 'www.hot-yeah.com',
                           cols: [
                                'cid','名稱','首圖','描述','價錢','課程日期','匯出'
                            ],
                           filter: {
                             "學校ID":   $('#dazzle-key').text()
                           },
                           big:true
                       };
                        $dazzlePopup.callPopup(params).then(function(result){
                                
                            $scope.loadData().then(function(){
//                                $element.html('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                                $dazzleInit.useTemplate($scope);
                            });                           
                           console.log('Success'); 
                        });               
                        

                }]

            ];

        }
    };
    return dazzleData;
});

