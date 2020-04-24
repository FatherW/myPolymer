import jQuery from 'jquery';
import $ from 'jquery';

require('webpack-jquery-ui');
require('webpack-jquery-ui/css'); 

import angular from 'angular';
import bootstrap from 'bootstrap';
import store from 'store';
import AWS from 'aws-sdk';
const ngRoute = require('angular-route');
const ngAnimate = require('angular-animate');
const ngTouch  = require('angular-touch');
//const ngMessages = require('angular-messages');
const ngMaterial =require('angular-material');
const ezfb = require('angular-easyfb');
//const uiBootstrap = require('angular-ui-bootstrap');
//const uiSortable =require('angular-ui-sortable');
//const uiBootstrapContextMenu = require('angular-bootstrap-contextmenu');


window.$ = $;
window.jQuery = jQuery;
window.angular = angular;
window.store = store;


//    loadJs("https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js");
//    loadJs("https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.9/angular.min.js");
//    loadJs("https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js");
    // loadJs("https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js");
    // loadJs("https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js");
    // loadJs("https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular-touch.min.js");
    // loadJs("https://pc035860.github.io/angular-easyfb/angular-easyfb.min.js");
    // loadJs("http://www.hot-yeah.com/js/isteven-multi-select.js");
    // loadJs("http://www.hot-yeah.com/js/bower_components/masonry/masonry.js");
    // loadJs("https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.js");
    // loadJs("https://cdnjs.cloudflare.com/ajax/libs/store.js/1.3.20/store.min.js");
    // loadJs("https://cdnjs.cloudflare.com/ajax/libs/aws-sdk/2.79.0/aws-sdk.min.js");
    // loadJs("https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.1/less.min.js");
    // loadJs("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js");            
    // loadJs("http://www.hot-yeah.com/js/jk-rating/jk-rating-stars.min.js");
    // loadJs("http://www.hot-yeah.com/js/bower_components/ev-emitter/ev-emitter.js");
    // loadJs("http://www.hot-yeah.com/js/bower_components/jquery-bridget/jquery-bridget.js");
    // loadJs("http://www.hot-yeah.com/js/bower_components/desandro-matches-selector/matches-selector.js");
    // loadJs("http://www.hot-yeah.com/js/bower_components/fizzy-ui-utils/utils.js");
    // loadJs("http://www.hot-yeah.com/js/bower_components/get-size/get-size.js");
    // loadJs("http://www.hot-yeah.com/js/bower_components/outlayer/item.js");
    // loadJs("http://www.hot-yeah.com/js/bower_components/outlayer/outlayer.js");
    // loadJs("http://www.hot-yeah.com/js/bower_components/masonry/masonry.js");
    // loadJs("http://www.hot-yeah.com/js/bower_components/imagesloaded/imagesloaded.js");
    // loadJs("http://www.hot-yeah.com/js/bower_components/angular-masonry/angular-masonry.js");  
    // loadJs("https://ghiden.github.io/angucomplete-alt/js/libs/angucomplete-alt.js");
    // loadJs("https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.4/js/bootstrap-select.min.js");


	function loadCss(url) {
		var link = document.createElement("link");
		link.type = "text/css";
		link.rel = "stylesheet";
		link.href = url;
		document.getElementsByTagName("head")[0].appendChild(link);
	}

    function loadJs(url, callback){

        var script = document.createElement("script")
        script.type = "text/javascript";

        if (script.readyState){  //IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                        script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  //Others
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

console.log('My Master');
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        console.log('Response',response);
//        statusChangeCallback(response);
    });
}



var app = angular.module("demoApp", ['ngMaterial','ezfb']);



app.config(function (ezfbProvider) {
    /**
     * Basic setup
     *
     * https://github.com/pc035860/angular-easyfb#configuration
     */
    ezfbProvider.setInitParams({
        appId: '386469651480295'
    });
})

app.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

app.directive('dzField', function ($compile,$http) {
    var dazzleData = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            console.log('Init Link');
                     var table,field,id,index,key,query,name;
                     scope.model ={
                        data:[]
                     };
                    index  = element.attr('index');
                    table = element.attr('table');
                    field= element.attr('field');

                id = element.attr('did');


                if (typeof id !== typeof undefined && id !== false) {
                    id=element.attr('did');
                } else
                    id= $('#dazzle-key').text();


                    console.log('Index:',id,index,table);

                    // var db = {
                    //       "action": "searchData",
                    //       "index": index,
                    //       "type": table,
                    //       "from": 0,
                    //       "size": parseInt(limit),
                    //       "body": {
                    //         "query": {
                    //           "match_all": {}
                    //         },
                    //           "sort":{}
                    //       }
                    //     };
                    // db['body']['sort'][sort]= { "order": "desc" };

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
                        } else {
                            scope.model.data = result.data.resolve;
                            console.log(field,scope.model.data);
                            $compile(element.contents())(scope);
                        }
                    });



        },
        controller: function ($scope, $element, $attrs) {
            $scope.init = function() {

            }
            $scope.myDate = function(timestamp){
                return new Date(timestamp*1000).toLocaleDateString();
            }

            $scope.myNumber = function(value){
                if (angular.isUndefined(value))
                    return 0;
                else
                    return parseInt(value);
            }


            $scope.myTags = function(arr) {
                console.log(arr);
                var str='';
                if (!Array.isArray(arr))
                    arr = [arr];

                arr.forEach(function(item,index) {
                    str = item+','+str;
                });

                str = str.substring(0, str.length-1);

                return str;
            }

            $scope.imageUrl = function(uid,file,size) {
                var url = "https://designerrrr-output.s3-ap-northeast-1.amazonaws.com/images/"+uid+"/"+size+"/"+ file;

                console.log('Url',url);
                return url;
            }

        }
    };
    return dazzleData;
});

// app.directive('dzField', function ($compile, $templateRequest, $http) {
//     var dzField = {
//         restrict: 'EA',
//         priority: 1000,
//         scope: true,
// //        templateUrl: "https://dazzle-template.s3.amazonaws.com/file6.0/directive-template.html",
//         link: function (scope, element, attrs) {
//             scope.http = "//dazzle-template.s3.amazonaws.com/";
//             scope.directiveId = "dzField";
//             scope.type = "dzField";
//             scope.templatePath = "builder6.0/template/" + scope.directiveId + "/"+element.attr('type')+".html?id=" + new Date().getTime();
//             // scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
//             scope.templateUrl = scope.http + scope.templatePath;
//             scope.isNoData = false;
//
// //            $dazzleInit.editorCustomInit(scope, element, attrs).then(function () {
//
//
//                 var table,field,id,index,key,query,html,refer;
//                 scope.model ={
//                     data:[]
//                 };
//                 index  = element.attr('index') || '';
//                 table = element.attr('table') || '';
//                 field= element.attr('field') || '';
//                 id = element.attr('did');
//
//
//                 if (typeof id !== typeof undefined && id !== false) {
//                     id=element.attr('did');
//                 } else
//                     id= $('#dazzle-key').text();
//
//                 tp= element.attr('type') || '';
//                 refer = element.attr('refer') || '';
//                 tempid = element.attr('tempid') || '';
//                 if (!id || angular.isUndefined(id))
//                     id = $dazzleUser.dazzleInfo['thisPageJson'].id;
//
//
//                 console.log('Index:',id,index,table,tp,field);
//
//
//                 var db = {
//                     "action":"getField",
//                     "index":index,
//                     "type":table,
//                     "field":field,
//                     "id":id
//                 }
//                 query = db;
//                 console.log('Query',JSON.stringify(query));
//                 $http({
//                     "method": "post",
//                     "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
//                     "data": query
//
//                 }).then(function (result) {
//                     console.log(field,result);
//                     if (result.data.code < 0) {
//                         //$dazzlePopup.toast(result.data.text + ":" + result.data.err.code);
//                         //reject();
//                         scope.isNoData = true;
//
//                     } else {
//                         scope.model.data = result.data.resolve;
//                         if (!scope.model.data)
//                             scope.isNoData = true;
//
//                         $templateRequest(scope.templateUrl).then(function(html){
//                             scope.model.html = html;
//                             console.log('Template',html);
//                             var template = angular.element('<span ng-bind-html="model.html| to_trusted" ></span>');
//                             element.html(template);
//                             $compile(template)(scope);
//                         });
//
//                     }
//                 });
//
//
//
//
//    //         });
//         },
//         controller: function ($scope, $element, $attrs) {
//             $scope.myDate = function(timestamp){
//                 return new Date(timestamp*1000).toLocaleDateString();
//             }
//
//             $scope.myNumber = function(value){
//                 if (angular.isUndefined(value))
//                     return 0;
//                 else
//                     return parseInt(value);
//             }
//
//
//          $scope.myTags = function(arr) {
//              var str='';
//              if (!Array.isArray(arr))
//                  arr = [arr];
//
//              arr.forEach(function(item,index) {
//                  str = item+','+str;
//              });
//
//              return str;
//          }
//
//             $scope.imageUrl = function(uid,file,size) {
//                 var url = "https://designerrrr-output.s3-ap-northeast-1.amazonaws.com/images/"+uid+"/"+size+"/"+ file;
//
//                 console.log('Url',url);
//                 return url;
//             }
//
//         }
//     };
//     return dzField;
// });

app.directive('dazzleData2', function ($compile,$http) {
    var dazzleData = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            console.log('Init Link');
                     var table,field,id,index,key,query;
                     scope.model ={
                        data:[]
                     };
                    index  = element.attr('index');
                    table = element.attr('table');
                    sort = element.attr('sort');
                    limit = element.attr('limit');
                    if (!limit)
                        limit = 10;
                    console.log('Index:',id,index,table);
                    var db = {
                          "action": "searchData",
                          "index": index,
                          "type": table,
                          "from": 0,
                          "size": parseInt(limit),
                          "body": {
                            "query": {
                              "match_all": {}
                            },
                              "sort":{}
                          }
                        };
                    db['body']['sort'][sort]= { "order": "desc" };
                    query = db;
                    console.log('Query',JSON.stringify(query));
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": query

                    }).then(function (result) {
                        console.log(result);
                        if (result.data.code < 0) {
                            //$dazzlePopup.toast(result.data.text + ":" + result.data.err.code);
                            //reject();
                        } else {
                            scope.model.data = result.data.resolve;
                            console.log(scope.model.data);
                        }
                    });       
           
                

        },
        controller: function ($scope, $element, $attrs) {
            $scope.init = function() {

            }
            $scope.myDate = function(timestamp){
                return new Date(timestamp*1000).toLocaleDateString();
            }


        }
    };
    return dazzleData;
});

app.controller('AppController', function ($scope, $http,$mdDialog,ezfb) {
    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = "AKIAIOCIHTJ47YSHEE7Q";
    AWS.config.secretAccessKey = "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";
    AWS.config.region = "ap-northeast-1";
    console.log('Master');


     $scope.SOCIAL_PLUGINS = [
          'like', 'share-button', 'send', 'post', 'video', 
          'comments', 'page', 'follow', 'send-to-messenger', 'messengermessageus',
          'login-button', 'comment-embed', 'save'
        ];
  
      $scope.pluginOn = true;
      $scope.rendering = false;
      
      $scope.goto = function (dirTag) {
        $location.path('/' + dirTag);
      };
      
      $scope.isActive = function (dirTag) {
        return ($location.path() === '/' + dirTag);
      };
      
      $scope.rendered = function () {
        $scope.rendering = false;
      };
      
      $scope.$watch('pluginOn', function (newVal, oldVal) { 
        if (newVal !== oldVal) {
          $scope.rendering = true;
        }
      });
      
      // $scope.$on('$routeChangeSuccess', function () {
      //   $scope.rendering = true;
      // });

    function showWait(){
        // $mdDialog.show({
        //     controller: 'waitCtrl',
        //     template: '<md-dialog style="background-color:transparent;box-shadow:none">' +
        //     '<div layout="row" layout-sm="column" layout-align="center center" aria-label="wait">' +
        //     '<md-progress-circular md-mode="indeterminate" ></md-progress-circular>' +
        //     '</div>' +
        //     '</md-dialog>',
        //     parent: angular.element(document.body),
        //     clickOutsideToClose:false,
        //     fullscreen: false
        // })
        //     .then(function(answer) {
        //
        //     });
    }
    $scope.courseOwner = false;

    $scope.checkPermission = function() {
        var name = location.pathname;
        name = name.substring(1);
        name = name.replace(".html","");
        name = decodeURIComponent(name);
        console.log(name,$scope.user);

        if (!$scope.logged)
            return false;
        else {
            $http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzle-website-directive",
                "data": {
                  "action": "checkPermission",
                  "courseName": name,
                  "uid":   $scope.user.UID
                }
            }).then(function (result) {
                console.log(result);
                if (result.data.code > 0)
                    $scope.courseOwner = true;
                else
                    $scope.courseOwner = false;
            });            
        }
    }
        $scope.loadCourses = function() {
                return new Promise(function (resolve, reject) {
//                    console.log('Load Elastic Data',id,table,index);
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "searchData",
                            "index": "hotyeah",
                            "type": "course3",
                            "body": {"query": {"match_all": {}}}
                        }
                    }).then(function (result) {
                        if (result.data.code < 0) {

                            alert(result.data.text + ":" + result.data.err.code);
                            reject();
                        } else {
                            $scope.courses = result.data.resolve;
                            resolve(result.data.resolve);
                        }
                    });
                });
            }

    $scope.loadSchool = function(id) {
        return new Promise(function (resolve, reject) {
//                    console.log('Load Elastic Data',id,table,index);

            $http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                "data": {
                    "action": "getData",
                    "index": "hotyeah",
                    "type": "school",
                    "id": id
                }
            }).then(function (result) {
                console.log('School',result);
                if (result.data.code < 0) {

                    alert(result.data.text + ":" + result.data.err.code);
                    reject();
                } else {
                    $scope.school = result.data.resolve;
                    resolve(result.data.resolve);
                }
            });
        });
    }

      $scope.loadSchools = function() {
                return new Promise(function (resolve, reject) {
//                    console.log('Load Elastic Data',id,table,index);
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "searchData",
                            "index": "hotyeah",
                            "type": "school",
                            "body": {"query": {"match_all": {}}}
                        }
                    }).then(function (result) {
                        console.log('School',result);
                        if (result.data.code < 0) {

                            alert(result.data.text + ":" + result.data.err.code);
                            reject();
                        } else {
                            $scope.schools = result.data.resolve;
                            resolve(result.data.resolve);
                        }
                    });
                });
            }


    $scope.init = function() {
        console.log('Hello');
        $scope.user=store.get('user');
        console.log('User',$scope.user);
        if (angular.isUndefined($scope.user) || $scope.user == null)
            $scope.logged = false;
        else{
            $scope.logged = true;
            $scope.checkPermission();
        }
        //$scope.courseCategory = "美容";

        // Course List
        $scope.myQuestions = [];
        $scope.tags=[];
        $scope.getCourseCategory();
        /*$scope.getCourseCategory().then(function(result){
            $scope.getCourseMainCategory();
            $scope.getCourseSubCategory($scope.courseCategory);
        });*/
        $scope.loadCourses();
//       $scope.goto('page');

    }

    $scope.categorySelect = function(event){
        
        var ele= angular.element(event.currentTarget);
        var tag = ele.parent().text();
        $('.categorySet.filterItem').removeClass('active');
        ele.parent().addClass('active');
        if ($scope.tags.indexOf(tag)<0)
            $scope.tags.push(tag);
        $scope.getSelectedCategoryCourse($scope.tags);
                
    }

    $scope.getSelectedCategoryCourse = function(tags) {
         if (tags == "") {
            $('.categorySet.filterItem').removeClass('active');
            $('.subCategorySet.filterItem').removeClass('active');
            $('.subCategorySet').css('display','none');
            $scope.loadCourses();
         } else {
             return new Promise(function (resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzle-website-directive",
                    "data": {
                        "action": "getSelectedCategoryCourse",
                        "category": tags
                    }
                }).then(function (result) {
                    if (result.data.code < 0) {

                        alert(result.data.text + ":" + result.data.err.code);
                        reject();
                    } else {
                        $scope.courses = result.data.resolve;
                        resolve(result.data.resolve);
                    }
                });
            });
        }
    }

    $scope.removeTags = function(event){
        
        var ele= angular.element(event.currentTarget);
        var tag = ele.parent().text();
        var index = $scope.tags.indexOf(tag);
        $scope.tags.splice(index,1);
//        ele.parent().remove();
        $scope.getSelectedCategoryCourse($scope.tags);
    }
    $scope.areaSelect = function(event){
        var ele= angular.element(event.currentTarget);
        $('.areaSet.filterItem').removeClass('active');
        ele.parent().addClass('active');
    }

    $scope.logout = function() {
        store.set('user',null);
        $scope.logged = false;
    }


    $scope.getCourseArea = function() {
        console.log('Get Course Area');
        return new Promise(function (resolve, reject) {
            $http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzle-website-directive",
                "data": {
                    "action": "getCourseArea"
                }
            }).then(function (result) {
                console.log('Load Area Result',result);

                if (result.data.code > 0) {
//                    console.log(result.data.resolve);
                    $scope.courseArea = result.data.text;
                    resolve(result.data.text);
                } else {
                    reject();
                }
            });
        });
    }


    $scope.getCourseMainCategory = function() {
        var params = {
            'select': $scope.mainCategoryTree,
            'options': $scope.mainCategoryTree,
            'name': 'dzSelectPopup',
            'directive': "<dz-select-popup></dz-select-popup>"
        };
        /*
        $dazzlePopup.callPopup(params).then(function(output){
            //var image = output['image'];
            $scope.model.data = output;
            $dazzleInit.useTemplate($scope);
            $dazzleData.updateElasticField(index,table,id,field,$scope.model.data);
        });
        */
    }

    $scope.getCourseSubCategory = function(index) {
        
        var ele= angular.element(event.currentTarget);
        //var tag = ele.parent().text();
        $('.categorySet.filterItem').removeClass('active');
        ele.parent().addClass('active');
        var category = $('#category'+index).attr('value');  
        console.log('Get Course Sub Category',category,$scope.courseCategoryJson[category]);
        $scope.subCategory = $scope.courseCategoryJson[category];
        $('.subCategorySet').css('display','block');
        
        // angular.forEach($scope.courseCategoryJson,function(item,index){
        //     if (item['Layer1']=='category')
        //         $scope.subCategory.push(item['Layer2']);
        // });
//        $scope.subCategory = $scope.categoryTree[category];
    };



    $scope.getCourseCategory = function() {
        console.log('Get Course Category');
        return new Promise(function (resolve, reject) {
            $http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzle-website-directive",
                "data": {
                    "action": "getCourseCategory"
                }
            }).then(function (result) {
                console.log('Load Result',result);

                if (result.data.code > 0) {
//                    console.log(result.data.resolve);
                    //$scope.courseCategory = result.data.text;
                    // $scope.courseCategory = [];

                    $scope.categoryTree = {};
                    $scope.mainCategoryTree = [];
                    $scope.layer1 = [];
                    angular.forEach(result.data.text,function(item,index){

                       // if ($scope.layer1.indexOf(item['Layer1']) < 0 )
                       //  $scope.layer1.push(item['Layer1']);

                        if (!$scope.categoryTree.hasOwnProperty(item['Layer1']))
                            $scope.categoryTree[item['Layer1']]=[];

                       $scope.mainCategoryTree .push(item['Layer1']);

                       $scope.categoryTree[item['Layer1']].push(item['Layer2']);

                    });
                    $scope.mainCategoryTree = $.unique($scope.mainCategoryTree);
                    console.log('Category Tree',$scope.categoryTree);
                    console.log('Main Category Tree',$scope.mainCategroyTree);
                    $scope.courseCategoryJson = $scope.categoryTree;
                    $scope.courseCategoryTree=$scope.generateOptionJson($scope.categoryTree);
                    console.log('Course Category Tree',$scope.courseCategoryJson);
                    //console.log(result.data.text);


                    resolve(result.data.text);
                } else {
                    reject();
                }
            });
        });
    }

    $scope.fClick = function(data){
 //       data.name;
        $scope.courseCategory = data.name;
        $scope.getCourseSubCategory($scope.courseCategory);
    }

    $scope.generateOptionJson = function(tree){
        var json = [];

        for (var property in tree) {
            if (tree.hasOwnProperty(property)) {
                json.push({
                    name: property,
                    msGroup: true,
                    ticked: false   
                });
                // angular.forEach(tree[property],function(item,index){
                //     json.push({
                //         //         icon: '<img  src="https://cdn1.iconfinder.com/data/icons/humano2/32x32/apps/firefox-icon.png" />',
                //         name: item,
                //         maker: '('+property+')',
                //         ticked: false
                //     });
                // });

            }
        }

        return json;


    }

    $scope.redirectProfile = function() {
        location.href = "http://www.hot-yeah.com/user-profile.html";
    }
    $scope.redirectSchoolProfile = function() {
        if (angular.isUndefined($scope.user)){
            alert('未有用戶資料。請重新登入');
            return;
        } 

        if (angular.isUndefined($scope.user['用戶類別'])){
            alert('用戶類別不明，請聯絡管理員');
            return;
        }

        $scope.getToken().then(function(token){

            switch($scope.user['用戶類別']){
                case '普通用家':
                    location.href="http://www.hot-yeah.com/user-profile.html";
                break;

                case '學校／導師':
                //http://builder.dazzle.website/index.html?token:===:01935686cd55535edde0&&&websiteId:===:www.hot-yeah.com&&&editPage:===:index
                    showWait();
                    $scope.loadSchool($scope.user['對應學校']).then(function(school){
                        store.set('token',token);
                        store.set('editPage',school['學校名稱']);
                        store.set('exportID',school['id']);
                        store.set('templateHtml','schoolDetail');
                         // location.href = "http://www.hot-yeah.com/school-edit.html?token:===:"+token+"&&&editPage:===:"+school['學校名稱']+"&&&exportID:===:"+school['id'];
                         location.href = "http://www.hot-yeah.com/school-edit.html";
                    });
                break;            
            }
        },function(err){
            alert('無法提出token，請聯絡管理員');
        });


    }
    $scope.removeBmCourse = function(item){
        var index = $scope.user['收藏課程'].indexOf(item['ID']);

        if (index > -1) {
            $scope.user['收藏課程'].splice(index,1);
            angular.forEach($scope.bookmarkCourses,function(course,cid){
                if ($scope.bookmarkCourses[cid]['ID']== item['ID'])
                    $scope.bookmarkCourses.splice(cid,1);
            });
        }
        console.log(index,item['ID'],$scope.user['收藏課程']);
    }
    $scope.removeMyQuestions = function(item){
        var index = $scope.user['已發表討論'].indexOf(item['ID']);

        if (index > -1) {
            $scope.user['已發表討論'].splice(index,1);
            angular.forEach($scope.myQuestions,function(course,cid){
                if ($scope.myQuestions[cid]['ID']== item['ID'])
                    $scope.myQuestions[cid].splice(cid,1);
            });
        }

        console.log(index,item['ID'],$scope.user['已發表討論']);
    }

    $scope.removeBmSchool = function(item){
        var index = $scope.user['收藏學校'].indexOf(item['ID']);

        if (index > -1) {
                $scope.user['收藏學校'].splice(index,1);
                angular.forEach($scope.bookmarkSchools,function(course,cid){
                    if ($scope.bookmarkSchools[cid]['ID']== item['ID'])
                        $scope.bookmarkSchools.splice(cid,1);
                });        

        }
    }
    $scope.loadMyQuestions = function(ids){
        $scope.myQuestions = [];
        return new Promise(function (resolve, reject) {
            var count=0;
            if (!Array.isArray(ids))
                ids =[ids];

            console.log('My QID',ids);
            angular.forEach(ids,function(item,index){
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzle-website-directive",
                    "data": {
                      "action": "loadQuestion",
                      "id":item
                    }
                }).then(function (result) {
                        console.log('Load Question Popup',result);

                    if (result.data.code > 0) {

                        var question = result.data.resolve;
                        console.log('Refer Course',question['對應課程']);
                        $scope.loadCourse(question['對應課程']).then(function(item){

                               question['課程首圖'] = item['首圖'];
                               question['課程名稱'] = item['名稱'];
                               $scope.myQuestions.push(question);                                 
                        });
                    } 
                    count++;
                    if (count==ids.length) {
                        console.log($scope.myQuestions);
                        resolve();
                    }
                });
            });

        });
    }

    $scope.getToken = function(){
       console.log('Get Token');
        return new Promise(function (resolve, reject) {
            $http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzle-website-directive",
                "data": {
                  "action": "getToken",
                  "user":$scope.user
                }
            }).then(function (result) {
                console.log('Load Result',result);

                if (result.data.code > 0) {
                    resolve(result.data.resolve);
                } else {
                    reject();
                 }
            });    
        });
    }
    $scope.checkUserExist = function(fbid) {
       console.log('Check Unique');
        return new Promise(function (resolve, reject) {
            $http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzle-website-directive",
                "data": {
                  "action": "checkUnique",
                  "id":email
                }
            }).then(function (result) {
                console.log('Load Popup',result);

                if (result.data.code > 0) {

                
                } else {
                        $('.schoolUnique').css('border','green 2px solid');
                        $scope.uniqueMsg = "此電郵可使用";
                        $scope.regValid = true;
                }
            });    
        });
        
    }
    $scope.checkUnique = function(email){
        console.log('Check Unique');
        return new Promise(function (resolve, reject) {
            $http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzle-website-directive",
                "data": {
                  "action": "checkUnique",
                  "id":email
                }
            }).then(function (result) {
                console.log('Load Popup',result);

                if (result.data.code > 0) {
                        $('.schoolUnique').css('border','red 2px solid');
                        $scope.uniqueMsg = "此電郵已被註冊";
                        $scope.regValid = false;
                } else {
                        $('.schoolUnique').css('border','green 2px solid');
                        $scope.uniqueMsg = "此電郵可使用";
                        $scope.regValid = true;
                }
            });    
        });
    }
    $scope.checkPassword = function() {
            console.log('Check Password',$scope.newUser['password'],$scope.repassword);
            // if (angular.isUndefined($scope.regUser['password'] || !$scope.regUser['password'] )){
            //     $('#regPassword').css('border','red 2px solid');
            //     $scope.regValid = false;
            //     return;
            // }
            if (angular.isUndefined($scope.newUser['password'])){
                $scope.newUser['password']='';
            }

            if ($scope.newUser['password']==''){
                $('#regPassword').css('border','red 2px solid');
                $scope.passMsg = "未輸入密碼";
                $scope.regValid = false;

            }

            if ($scope.newUser['password'] == $scope.repassword){
                $('#regPassword').css('border','green 2px solid');
                $('#regRePassword').css('border','green 2px solid');
                $scope.passMsg = "密碼已被確認";
                $scope.regValid = true;
            }
            else{
                $('#regPassword').css('border','red 2px solid');
                $('#regRePassword').css('border','red 2px solid');
                $scope.passMsg = "確認密碼失敗，請檢查。";
                $scope.regValid = false;
            }
    }
    $scope.FBRegUser = function(role) {

        return new Promise(function (resolve, reject) {
            $http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzle-website-directive",
                "data": {
                  "action": "regUser",
                  "role":role,
                  "data": $scope.newUser
                }
            }).then(function (result) {
                console.log('Load Popup',result);

                if (result.data.code > 0) {
                        resolve(result.data.resolve);              
                } else {
                        reject();
                }
            });
        

        });
    }       
    $scope.regUser = function(role) {
        if (!$scope.regValid){
            alert('尚有資料未填寫或有誤');
            return;
        }

        return new Promise(function (resolve, reject) {
            $scope.newUser['UID'] = $scope.newUser['電郵'];
            $http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzle-website-directive",
                "data": {
                  "action": "regUser",
                  "role":role,
                  "data": $scope.newUser
                }
            }).then(function (result) {
                console.log('Load Popup',result);

                if (result.data.code > 0) {
                        resolve(result.data.resolve);
                        alert('成功註冊');
                } else {
                        reject();
                        alert('更新失敗');
                }
            });
        

        });

    }
    $scope.regSchool = function() {
        if (!$scope.company['password'] || $scope.company['password']!=$scope.repassword){
            alert("沒有密碼或確認密碼與密碼不相符，請檢查。");
            return;
        }
        return new Promise(function (resolve, reject) {
            $http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzle-website-directive",
                "data": {
                  "action": "regUser",
                  "role":"學校／導師",
                  "user": $scope.company
                }
            }).then(function (result) {
                console.log('Load Popup',result);

                if (result.data.code > 0) {
                        alert('成功更新');
                } else 
                        alert('更新失敗');
            });
        

        });

    }
    $scope.loadMySchool = function(){
        console.log('Load My School');
            var id = $('dazzle-key').text();
            $scope.loadCourse(id).then(function (data) {
                $scope.loadSchool(data['學校ID']).then(function (result) {
                    $scope.mySchool = result;
                });
            });
    }
    $scope.loadBookmarkSchools = function(ids){
        $scope.bookmarkSchools = [];
        return new Promise(function (resolve, reject) {
            var count=0;
            if (!Array.isArray(ids))
                ids =[ids];
            angular.forEach(ids,function(item,index){
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzle-website-directive",
                    "data": {
                      "action": "loadSchool",
                      "id":item
                    }
                }).then(function (result) {
                    console.log('Load Popup',result);

                    if (result.data.code > 0) {
                        $scope.bookmarkSchools.push(result.data.resolve); 
                    } 
                    count++;
                    if (count==ids.length) {
                        console.log($scope.bookmarkSchools);
                        resolve();
                    }
                });
            });

        });

    }
    $scope.loadBookmarkCourses = function(ids){
        $scope.bookmarkCourses = [];
        if (!Array.isArray(ids))
            ids =[ids];
        return new Promise(function (resolve, reject) {
            var count=0;
            angular.forEach(ids,function(item,index){
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzle-website-directive",
                    "data": {
                      "action": "loadCourse",
                      "id":item
                    }
                }).then(function (result) {
                    console.log('Load Popup',result);

                    if (result.data.code > 0) {
                        $scope.bookmarkCourses.push(result.data.resolve); 
                    } 
                    count++;
                    if (count==ids.length) {
                        console.log($scope.bookmarkCourses);
                        resolve();
                    }
                });
            });

        });

    }


    $scope.loadCourse = function(id){
        return new Promise(function (resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzle-website-directive",
                    "data": {
                      "action": "loadCourse",
                      "id":id
                    }
                }).then(function (result) {
                    console.log('Load Course Popup',result);
                    if (result.data.code > 0) {
                        resolve(result.data.resolve); 
                    } 
                });
        });
    }
    $scope.loadRegCourses = function(ids){
        $scope.regCourses = [];
        if (!Array.isArray(ids))
            ids =[ids];
        return new Promise(function (resolve, reject) {
            var count=0;
            angular.forEach(ids,function(item,index){
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzle-website-directive",
                    "data": {
                      "action": "loadCourse",
                      "id":item
                    }
                }).then(function (result) {
                    console.log('Load Popup',result);

                    if (result.data.code > 0) {
                        $scope.regCourses.push(result.data.resolve); 
                    } 
                    count++;
                    if (count==ids.length) {
                        console.log($scope.regCourses);
                        resolve();
                    }
                });
            });

        });

    }
    $scope.saveProfile = function(){

        console.log($scope.user);
        return new Promise(function (resolve, reject) {
            $http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzle-website-directive",
                "data": {
                  "action": "saveProfile",
                  "user": $scope.user,
                  "id": $scope.user.UID
                }
            }).then(function (result) {
                console.log('Load Popup',result);

                if (result.data.code > 0) {
                        alert('成功更新');
                } else 
                        alert('更新失敗');
            });
        

        });

    }

    $scope.FBlogin = function() {


        FB.login(function (response) {

          // Check if the user logged in successfully.
          if (response.authResponse) {

            console.log('You are now logged in.');
            console.log(response);
                 FB.api('/me', {fields: 'email'}, function(response) {
                   console.log(response);
                   $scope.email = response.email;
                 });
        
            // Add the Facebook access token to the Cognito credentials login map.
            
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
              IdentityPoolId: 'ap-northeast-1:b54d3fd9-74f4-4b03-b217-833d7a4af25b',
              Logins: {
                'graph.facebook.com': response.authResponse.accessToken
              }
            });

            // Obtain AWS credentials
            AWS.config.credentials.get(function(){
                // Access AWS resources here.

                var accessKeyId = AWS.config.credentials.accessKeyId;
                var secretAccessKey = AWS.config.credentials.secretAccessKey;
                var sessionToken = AWS.config.credentials.sessionToken;


                console.log(accessKeyId,secretAccessKey,sessionToken);

                $scope.regValid=true;               
                $scope.newUser = {
                        'UID':response.authResponse.userID,
                        '電郵':$scope.email,
                        '用戶名稱':'待填寫',
                        '電話':'待填寫',
                        'password':response.authResponse.userID,
                        '狀態': '有效',
                        '用戶類別':'普通用家'                   
                };

                $scope.FBRegUser('普通用家').then(function(result) {
                    console.log(result);
                            

                    $scope.login = response.authResponse.userID;
                    $scope.password = response.authResponse.userID;
                    $scope.Login();
                },function(err){
                    $scope.login = response.authResponse.userID;
                    $scope.password = response.authResponse.userID;
                    $scope.Login();             
                });
                
//              $('#myModalRegister').modal('show');

                
            });

          } else {
            console.log('There was a problem logging you in.');
          }

        });



        // FB.login(function(response){
        //    if (response.authResponse){
        //         console.log('Welcome');

        //         FB.api('/me', {fields: 'email'}, function(response) {
        //           console.log(response);
        //         });

        //         FB.getLoginStatus(function(response) {
        //           if (response.status === 'connected') {
        //                 console.log('Response',response);
        //             var uid = response.authResponse.userID;
        //             var accessToken = response.authResponse.accessToken;
        //           } else if (response.status === 'not_authorized') {
        //             // the user is logged in to Facebook, 
        //             // but has not authenticated your app
        //           } else {
        //             // the user isn't logged in to Facebook.
        //           }
        //          });
        //    } else {
        //        console.log('Login Fail');
        //    }

        // });

    }

    $scope.Login = function() {
        console.log('Login',$scope.login,$scope.password);
     return new Promise(function (resolve, reject) {

                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzle-website-directive",
                    "data": {
                      "action": "elasticLogin",
                      "index": "hotyeah",
                      "type": "user",
                      "login": $scope.login,
                      "password": $scope.password
                    }
                }).then(function (result) {
                    console.log('Load Popup',result);

                    if (result.data.code > 0) {
                        store.set('user',result.data.resolve);
                        $scope.user = result.data.resolve;
                        $scope.logged = true;
                        location.reload();
                        resolve(result.data.resolve);
                    } else {
                        $scope.logged = false;
                        alert('登入失敗');
                        resolve([]);
                    }
                });
        });
    }
        $scope.formdata={};
    $scope.submitMyForm = function() {

        console.log($scope.formdata);
        console.log($scope.hostname);
        if($scope.myForm.$valid){
        //https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/saveformdatatojson
        var createData=new Date();
        $scope.formdata.formid=createData.getTime();
        var nd=new Date((createData.getTime()/1000+(3600*8))*1000);
        $scope.formdata['�𠯫�������']=nd.toGMTString();
        $scope.formdata['�𠯫���']=createData.getTime();
        $http(
                {
                    method: 'POST',
                    url: 'https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/saveformdatatojson',
                    data: {'formdata':$scope.formdata,'formname':$scope.formname,'bucketname':$scope.hostname,'websiteKey':$scope.websiteKey}
                })
                .then(function(succeed) {
                    console.log(succeed);
                    if (succeed.data.code > 0) {
                        emailToUser();
                        emailToAdmin();
                    } else {
                        alert('��𣂷漱憭望�梹�諹�钅�齿鰵�滩岫');
                    }
                },
                function(error) {
                    alert('��𣂷漱憭望�梹�諹�钅�齿鰵�滩岫');
                }
        );
        
        }//end if
    }
    $scope.uploadToProfile=function(acceptType='imageOnly'){
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
                var params = { Bucket: 'www.hot-yeah.com', Key: 'files/'+new Date().getTime()+"_"+file.name, ContentType: file.type, Body: file };
                bucket.upload(params, function(err, data) {
                    $scope.$apply(function(){
                        if(acceptType=='imageOnly')
                            $scope.user['頭像'] = data.Location;
                        alert('上載成功');
                    });
                });
            };
        });
    
    }
    $scope.uploadToDomain=function(dataName,filename,acceptType='all'){
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
                var params = { Bucket: $location.host(), Key: 'files/'+new Date().getTime()+"_"+file.name, ContentType: file.type, Body: file };
                bucket.upload(params, function(err, data) {
                    $scope.$apply(function(){
                        var thisLink=document.getElementById(filename);
                        thisLink.href=data.Location;
                        thisLink.text=file.name;
                        if(acceptType=='imageOnly'){
                            var thisImageLink=document.getElementById('img_'+filename);
                            thisImageLink.src=data.Location;
                        }
                        $scope.formdata[dataName]=data.Location;
                        alert('銝𡃏�㗇�𣂼��');
                    });
                });
            };
        });
    
    }
    
    function emailToAdmin() {
            console.log($scope.receiveemail);
            if(!$scope.receiveemail){
                    alert("��𣂷漱��𣂼��");
                    location.reload();
                    return false;
            }
            api = "https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail";
            var jsonToAdmin = {};
            jsonToAdmin['from'] = 'support@01power.net';
            jsonToAdmin['to'] = $scope.receiveemail;
            jsonToAdmin['subject'] = $scope.formname+'銵冽聢';
            jsonToAdmin['html'] = '��㗇鰵�� '+$scope.formname+' 銵冽聢��𣂷漱<br><br>����蝺刻�毺��:'+$scope.formdata.formid+"<br><br>"+JSON.stringify($scope.formdata);

            console.log('Form',$scope.formdata);
            $.ajax({
                type: "POST",
                url: api,
                data: JSON.stringify(jsonToAdmin),
                //async: false,
                contentType: "text/json; charset=utf-8",
                dataType: "json",
                success: function(msg) {
                    alert("��𣂷漱��𣂼��");
                    location.reload();
                },
                error: function(msg) {
                    alert("��𣂷漱��𣂼��");
                    location.reload();
                }
            });
        }
    
    function emailToUser() {
            console.log($scope.receiveemail);
            if(angular.isUndefined($scope.formdata['�𤓖��'])){
                    //alert("��𣂷漱��𣂼��");
                    emailToAdmin();
                    //location.reload();
                    return false;
            }
            api = "https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail";
            var jsonToAdmin = {};
            jsonToAdmin['from'] = 'support@01power.net';
           jsonToAdmin['to'] = $scope.formdata['�𤓖��'];
            jsonToAdmin['subject'] = $scope.formname+'銵冽聢';
            jsonToAdmin['html'] = '�函�'+$scope.formname+'銵冽聢��𣂼���𣂷漱<br><br>����蝺刻�毺��:'+$scope.formdata.formid+"<br><br>"+JSON.stringify($scope.formdata);
            console.log($scope.formdata);
            $.ajax({
                type: "POST",
                url: api,
                data: JSON.stringify(jsonToAdmin),
                //async: false,
                contentType: "text/json; charset=utf-8",
                dataType: "json",
                success: function(msg) {
                    //alert("��𣂷漱��𣂼��");
                    //location.reload();
                    emailToAdmin();
                },
                error: function(msg) {
                    //alert("��𣂷漱��𣂼��");
                    //location.reload();
                    emailToAdmin();
                }
            });
        }
});

    
	

