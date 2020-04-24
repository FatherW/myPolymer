var app = angular.module('demoApp');

app.directive('dazzleField', function ($compile,$http,$dazzleInit,$dazzleUser,$dazzlePopup,$dazzleFn,$dazzleData,$mdDialog) {
    var dazzleData = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            
                scope.http = "//d25k6mzsu7mq5l.cloudfront.net/";
                scope.directiveId = "dazzleField";
                scope.type = "dazzleField";
                scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
                scope.templateUrl = scope.http + scope.templatePath;
            
        },
        controller: function ($scope, $element, $attrs) {
            var index,table,field;
            

            $scope.init = function() {

            
                    index  = $element.attr('index');
                    table = $element.attr('table');
                    field= $element.attr('field');
                    id = $element.attr('id');

                    var db = {
                        "action":"getField",
                        "index":index,
                        "type":table,
                        "field":field,
                        "id":id
                    }
                    query = db;
                    console.log('Query',JSON.stringify(query));
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": query

                    }).then(function (result) {
                        console.log(field,result);
                        if (result.data.code < 0) {
                        } else {
                                $scope.model.data = result.data.resolve;
                                console.log('Model Data',$scope.model.data);
                        }
                    });
            }
            $scope.myDate = function(timestamp){
                return new Date(timestamp*1000).toLocaleDateString();
            }
			$scope.myTags = function(arr) {
				var string;
				if (!Array.isArray(arr))
					arr = [arr];
				
				arr.forEach(function(item,index) {
					str = item+','+str;
				});
			}

            $scope.imageUrl = function(uid,file,size) {
                var url = "https://designerrrr-output.s3-ap-northeast-1.amazonaws.com/images/"+uid+"/"+size+"/"+ file;

                console.log('Url',url);
                return url;
            }
            
              $scope.menuOptions = [
                ["更換資料", function () {
                    
                    index  = $element.attr('index');
                    table = $element.attr('table');
                    field= $element.attr('field');
                    type=$element.attr('type');
                    name = location.pathname;
                    name = name.substring(1);
                    name = name.replace(".html","");
                    name = decodeURIComponent(name);
                    id = name;
                    value = $scope.model.data;
                    
//                    $dazzleData.getTypeByFieldName(table,field).then(function(type){
                       switch(type) {
                            case 'text':
                            case 'number':
                            case 'email':
                            case 'password':
                                var confirm = $mdDialog.prompt()
                                    .title('你要變更資料嗎?')
                                    .textContent('輸入你的資料')
                                    .placeholder(field)
                                    .initialValue(value)
                                    .required(true)
                                    .ok('變更')
                                    .cancel('取消');

                                $mdDialog.show(confirm).then(function(result) {
                                    $scope.model.data = result;
                                    $dazzleInit.useTemplate($scope);
                                    $dazzleData.updateElasticField(index,table,id,field,$scope.model.data);
                                });

                                break;

                            case 'html':


                                var params2 = {
                                    html: value,
                                    big: true,
                                    source: 'dashboard',
                                    thisPage: $dazzleUser.dazzleInfo['thisPage'],
                                    name: 'dzHtmlPopup',
                                    directive:'<dz-html-popup></dz-html-popup>'
                                };
                                $dazzlePopup.callPopup(params2).then(function(output){
                                    $scope.model.data = output;
                                    $dazzleInit.useTemplate($scope);
                                    $dazzleData.updateElasticField(index,table,id,field,$scope.model.data);

                                });
                                break;
                            case 'textarea':
                            case 'code':
                                $dazzlePopup.code(value,'html').then(function(output){
                                     $scope.model.data = output;
                                     $dazzleInit.useTemplate($scope);
                                     $dazzleData.updateElasticField(index,table,id,field,$scope.model.data);

                                });

                                break;

                            case 'tag':
                                $dazzlePopup.tag(value).then(function (tags) {
                                    $scope.model.data = tags;
                                    $dazzleInit.useTemplate($scope);
                                    $dazzleData.updateElasticField(index,table,id,field,$scope.model.data);
                                });
                                break;

                            case 'select':
                                $dazzleData.getOptionByFieldName(table,field).then(function(result){
                                    console.log('Options',result);
                                    var params = {
                                        select: value,
                                        options: result,
                                        directive:"<select-popup></select-popup>"
                                    };

                                    $dazzlePopup.callPopup(params).then(function(output){
                                        //var image = output['image'];
                                         $scope.model.data = output;
                                        $dazzleInit.useTemplate($scope);
                                        $dazzleData.updateElasticField(index,table,id,field,$scope.model.data);
                                    });
                                });
                                break;

                            case 'image':
                                var params = {
                                    name: "userGalleryPopup",
                                    directive:"<user-gallery-popup></user-gallery-popup>"
                                };

                                $dazzlePopup.callPopup(params).then(function(output){
                                    //var image = output['image'];
                                    var image = output;
                                    $dazzleInit.copyFile($dazzleUser.getDazzleInfo('userBucket') + '/' + encodeURI(image.key), $dazzleUser.getDazzleInfo('exportBucket'), image.key).then(function () {
                                        var src = 'http://' + $dazzleUser.getDazzleInfo('exportBucket') + '/' + image.key;
                                             $scope.model.data = src;
                                            $dazzleInit.useTemplate($scope);
                                            $dazzleData.updateElasticField(index,table,id,field,$scope.model.data);

                                    });
                                });
                                break;

                            case 'gallery':
                                var params = {
                                    name: 'galleryPopup',
                                    'images':value,
                                    directive:"<gallery-popup></gallery-popup>"
                                }
                                $dazzlePopup.callPopup(params).then(function (images) {
                                    $scope.model.data = images;
                                    $dazzleInit.useTemplate($scope);
                                    $dazzleData.updateElasticField(index,table,id,field,$scope.model.data);
                                });
                                break;

                            case 'formview':
                                break;

                            case 'file':
                                $dazzlePopup.uploadFile($dazzleUser.user.uid).then(function(uploaded){
                                    $scope.model.data = uploaded;
                                    $dazzleInit.useTemplate($scope);
                                    $dazzleData.updateElasticField(index,table,id,field,$scope.model.data);

                                });
                                break;


                            case 'datetime':
                            case 'date':
                            case 'time':
                                break;

                            case 'button':
                                break;
                            case 'checkbox':
                                break;
                                
                            default:
                                break;
                        }




                }], ["管理鏈結", function () {
                
                    var params = {
                        name:"linkPopup",
                        element: $element,
                        oldLink: $scope.model.link,
                        directive:"<link-popup></link-popup>"
                    };
                    $dazzlePopup.callPopup(params).then(function(output) {
                        console.log(output);
                        $scope.model.link = output['link'];
                        console.log($scope.model.link);
                        $scope.useTemplate();
                    });     
                    
                }], ["更換模版", function () {
                    var params = {
                        "name": 'templatePopup',
                        "directive": '<template-popup></template-popup>',
                        'model': $scope.model
                    };

                    $dazzlePopup.callPopup(params).then(function(template){
                        console.log(template);
                        $scope.loadData();
                        if (!angular.isUndefined($scope.model.db))
                            $dazzleData.loadDataByModelDb($scope.model.db).then(function(record){
                                $scope.model.data = record;
                                $scope.useTemplate();
                            });
                    });

                }], ["刪除", function () {
                    $element.remove();
                }]
            ];

        }
    };
    return dazzleData;
});

