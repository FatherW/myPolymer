var app = angular.module('demoApp');
app.directive('dzField', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,$dazzlePopup,$dazzleData,$dazzleFn) {
    var dzField = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
//        templateUrl: "https://d27btag9kamoke.cloudfront.net/file6.0/directive-template.html",
        link: function (scope, element, attrs) {
            scope.http = "//d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dzField";
            scope.type = "dzField";
            scope.templatePath = "builder6.0/template/" + scope.directiveId + "/"+element.attr('type')+".html?id=" + new Date().getTime();
            // scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.isNoData = false;
            
            $dazzleInit.editorCustomInit(scope, element, attrs).then(function () {

                    $scope.myTags = function(arr) {
                        var str='';
                        if (!Array.isArray(arr))
                            arr = [arr];

                        arr.forEach(function(item,index) {
                            str = item+','+str;
                        });

                        return str;
                    }

                    var table,field,id,index,key,query,html,refer;
                     scope.model ={
                        data:[]
                     };
                    index  = element.attr('index') || '';
                    table = element.attr('table') || '';
                    field= element.attr('field') || '';
                    id = element.attr('did');


                    if (typeof id !== typeof undefined && id !== false) {
                        id=element.attr('did');
                    } else
                        id= $('#dazzle-key').text();
                        
                    tp= element.attr('type') || '';
                    refer = element.attr('refer') || '';
                    tempid = element.attr('tempid') || '';
                    if (!id || angular.isUndefined(id))
                        id = $dazzleUser.dazzleInfo['thisPageJson'].id;
                

                    console.log('Index:',id,index,table,tp,field);

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
                            //$dazzlePopup.toast(result.data.text + ":" + result.data.err.code);
                            //reject();
                            scope.isNoData = true;
                            
                        } else {
                            scope.model.data = result.data.resolve;
                            if (!scope.model.data)
                                scope.isNoData = true;
                                
                            $templateRequest(scope.templateUrl).then(function(html){
                                scope.model.html = html;
                                console.log('Template',html);
                                var template = angular.element('<span bind-html-compile="model.html" context-menu="menuOptions"></span>');
                                element.html(template);
                                    $compile(template)(scope);
                            });                                
                            
                        }
                    });

    


            });
        },
        controller: function ($scope, $element, $attrs) {
           // $dazzleInit.featherEditorInit($scope);
            $scope.menuOptions = [

                ["更換資料", function () {
                    
                    index  = $element.attr('index');
                    table = $element.attr('table');
                    field= $element.attr('field');
                    type=$element.attr('type');
                    id = $('#dazzle-key').text();
                    if (!id || angular.isUndefined(id))
                        id = $dazzleUser.dazzleInfo['thisPageJson'].id;
                
                    value = $scope.model.data;
                    
//                    $dazzleData.getTypeByFieldName(table,field).then(function(type){


                       switch(type) {
                            case 'text':
                            case 'facebook':
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


                            case 'number':
                                var params2 = {
                                    'value': value,
                                    'small': true,
                                    'name': 'dzNumberPopup',
                                    'directive':'<dz-number-popup></dz-number-popup>'
                                };
                                $dazzlePopup.callPopup(params2).then(function(output){
                                    $scope.model.data = output;
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

                            case 'tags':
                                // $dazzlePopup.tag(value).then(function (tags) {
                                //     $scope.model.data = tags;
                                //     $dazzleInit.useTemplate($scope);
                                //     $dazzleData.updateElasticField(index,table,id,field,$scope.model.data);
                                // });
                                var params = {
                                        'value': value,
                                        'name':'dzTagsPopup',
                                        'directive': '<dz-tags-popup></dz-tags-popup>'
                                    };

                                    $dazzlePopup.callPopup(params).then(function(output){
                                        $scope.model.data = output;
                                        $dazzleInit.useTemplate($scope);
                                        $dazzleData.updateElasticField(index,table,id,field,$scope.model.data);
                                    });
                                
                                break;
                                
                            case 'select':    
                                var sourcefield;
                                switch(field) {
                                    case '課程種類(大)': sourcefield = 'Layer1'; break;
                                    case '課程種類(小)': sourcefield = 'Layer2'; break;
                                } 
                                console.log(sourcefield);
                                var selectdata = new Array();
                                var thisdb = {
                                      "action": "searchData",
                                      "index": "hotyeah",
                                      "type": "activities",
                                      "_source": [
                                        sourcefield
                                      ],
                                      "body": {
                                        "aggs" : {
                                            "layer" : {
                                                "terms" : 
                                                { "field": sourcefield,
                                                  "size": 10000
                                                }
                                            }
                                        }
                                      }
                                    }

                                thisquery = thisdb;

                                 $http({
                                    "method": "post",
                                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                    "data": thisquery

                                }).then(function (result) {
                                    console.log('Result: ',field,result);
                                    if (result.data.code < 0) {
                                        //$dazzlePopup.toast(result.data.text + ":" + result.data.err.code);
                                        //reject();
                                        $scope.isNoData = true;
                                    } else {
                                        $.each(result.data.resolve, function(i){
                                            selectdata.push(result.data.resolve[i][sourcefield]);
                                        });

                                        selectdata = $.unique(selectdata);
                                        console.log(selectdata);
                                        selectoption(selectdata);
                                    }
                                });

                                function selectoption(selectdata) {
                                 var params = {
                                        'select': selectdata,
                                        'options': selectdata,
                                        'name': 'dzSelectPopup',
                                        'directive': "<dz-select-popup></dz-select-popup>"
                                    };

                                    $dazzlePopup.callPopup(params).then(function(output){
                                        //var image = output['image'];
                                         $scope.model.data = output;
                                        $dazzleInit.useTemplate($scope);
                                        $dazzleData.updateElasticField(index,table,id,field,$scope.model.data);
                                    });
                                }
                                break;
                                
                            case 'image':
                                var params = {
                                    name: "userGalleryPopup",
                                    directive:"<user-gallery-popup></user-gallery-popup>"
                                };

                                $dazzlePopup.callPopup(params).then(function(output){
                                    //var image = output['image'];
                                    var image = output;
                                            $scope.model.data = $dazzleFn.getFileUrl('large-web',output.gid);
                                            $dazzleInit.useTemplate($scope);
                                            $dazzleData.updateElasticField(index,table,id,field,$scope.model.data);
                                });
                                break;

                            case 'gallery':
                                var params = {
                                    name: 'dzGalleryPopup',
                                    'images':value,
                                    directive:"<dz-gallery-popup></dz-gallery-popup>"
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
                            
                           case 'data':
                               var params ={
                                   name:'dzDataPopup',
                                   directive: '<dz-data-popup></dz-data-popup>',
                                   table: $element.attr('refer'),
                                   filter: {
                                     "學校":   $('#dazzle-key').text()
                                   },
                                   big:true
                               }
                                $dazzlePopup.callPopup(params).then(function(result){
                                   console.log('Success'); 
                                });               
                                break;
                            default:
                                break;
                        }




                }],
                ["更換模版", function () {
                    var params = {
                        "name": 'templatePopup',
                        "directive": '<template-popup></template-popup>',
                        'model': $scope.model
                    };

                    $dazzlePopup.callPopup(params).then(function(template){
                                $scope.useTemplate();
                    });

                }]
            ];

        }
    };
    return dzField;
});