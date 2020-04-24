var app = angular.module('demoApp');
app.directive('dzField', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,$dazzlePopup,$dazzleData,$dazzleFn,dataInfo,moment) {
    var dzField = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
//        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/file6.0/directive-template.html",
        link: function ($scope, $element, attrs) {
            var json;
                $scope.field = $element.attr('data-field');
                $scope.type = $element.attr('data-type');
                $scope.dataId =  $element.attr('data-id') || $('dz-content-id').text();
                $scope.exist = true;

                console.log($scope.field,$scope.type,$scope.dataId);
                // console.log(dataInfo.data);
                console.log('Dazzle User',$dazzleUser.dazzleInfo);
                
                
               var mode = store.get('editMode');
                console.log('Mode',mode);
                if (angular.isUndefined(mode) || mode=="normal"){
                    console.log($dazzleUser.dazzleInfo['data']);

                    $http({
                      method: 'GET',
                      url: '/content/'+$scope.dataId+'-data.json',
                    }).then(function successCallback(result) {
                        console.log('DZ Field',result.data);
                        json = result.data;
                        $scope.item = json[$scope.field];
                        $scope.formatByType();
                    }, function errorCallback(response) {
    //                    var item = store.get($scope.dataId);
                        $scope.item = $dazzleUser.dazzleInfo['data'][$scope.dataId][$scope.field];
                        console.log($scope.dataId,$scope.item);
                        $scope.formatByType();
                    });
                    
                }
        
                
                
        },
        controller: function ($scope, $element, $attrs) {
            
            $scope.formatByType = function() {
            console.log('Format',$scope.type,$scope.item);
                switch($scope.type){


                    case 'youtube':
                        var embed = `
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/JFuxtn6A3QA" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        `;
                        $element.html(embed);
                        break;
                        
                    case 'timestamp':
                         var time =   parseInt($scope.item)|| 1262304000;
                        if (time < 1000000000000)
                            var a = new Date(time*1000);
                        else
                            var a = new Date(time);
                        str = a.toISOString();
                        var timeStr =moment(str,"YYYY-MM-DD").format("YYYY-MM-DD");
                        $element.text(timeStr);
                        break;

                    case 'album-thumbnail':

                        $element.attr('src',"//"+$scope.item[0]['bucket']+".s3.amazonaws.com/"+$scope.item[0]['path']);

                        break;
                    case 'file':
                    case 'image':
                        $element.attr('src',$scope.item);
                        break;
                        
                    case 'html':
                        $element.html($scope.item);
                        break;
                        
                    case 'gallery':
                        var text='';
                        angular.forEach($scope.item,function(item,index){
                           text +='<img src="'+item+'">'; 
                        });
                        
                        $element.html(text);
                        break;
                    
                    case 'date':
                        $element.text($scope.item);
                        break;

                    case 'dlink':
                        $element.attr('href',$scope.item);
                        break;

                    case 'link':
                        $element.attr('href',$scope.item+".html");
                        break;
                    case 'text':
                    default:
                        $element.text($scope.item);
                        break;
                    
                }                
            }
            

     
     
            // $scope.menuOptions = [

            //     ["更換資料", function () {
            //         console.log('Update Info');
            //         index  = $scope.model.index;
            //         table = $scope.model.table;
            //         field= $scope.model.field;
            //         $scope.model.dbtype=$element.attr('type');
                    
            //         id = $scope.model.did;
            //         value = $scope.model.data;
                    

            //           switch($scope.model.dbtype) {
            //                 case 'text':
            //                 case 'facebook':
            //                 case 'email':
            //                 case 'password':
            //                     var confirm = $mdDialog.prompt()
            //                         .title('你要變更資料嗎?')
            //                         .textContent('輸入你的資料')
            //                         .placeholder(field)
            //                         .initialValue(value)
            //                         .required(true)
            //                         .ok('變更')
            //                         .cancel('取消');

            //                     $mdDialog.show(confirm).then(function(result) {
            //                         $scope.model.data = result;
            //                         $dazzleInit.useTemplate($scope);
            //                         $dazzleData.updateElasticField(index,table,id,field,$scope.model.data);
            //                     });

            //                     break;


            //                 case 'number':
            //                     var params2 = {
            //                         'value': value,
            //                         'small': true,
            //                         'name': 'dzNumberPopup',
            //                         'directive':'<dz-number-popup></dz-number-popup>'
            //                     };
            //                     $dazzlePopup.callPopup(params2).then(function(output){
            //                         $scope.model.data = output;
            //                         $dazzleInit.useTemplate($scope);
            //                         $dazzleData.updateElasticField(index,table,id,field,$scope.model.data);

            //                     });                                
            //                     break;
            //                 case 'html':


            //                     var params2 = {
            //                         html: value,
            //                         big: true,
            //                         source: 'dashboard',
            //                         thisPage: $dazzleUser.dazzleInfo['thisPage'],
            //                         name: 'dzHtmlPopup',
            //                         directive:'<dz-html-popup></dz-html-popup>'
            //                     };
            //                     $dazzlePopup.callPopup(params2).then(function(output){
            //                         $scope.model.data = output;
            //                         $dazzleInit.useTemplate($scope);
            //                         $dazzleData.updateElasticField(index,table,id,field,$scope.model.data);

            //                     });
            //                     break;
            //                 case 'textarea':
            //                 case 'code':
            //                     $dazzlePopup.code(value,'html').then(function(output){
            //                          $scope.model.data = output;
            //                          $dazzleInit.useTemplate($scope);
            //                          $dazzleData.updateElasticField(index,table,id,field,$scope.model.data);

            //                     });

            //                     break;

            //                 case 'tags':
            //                     // $dazzlePopup.tag(value).then(function (tags) {
            //                     //     $scope.model.data = tags;
            //                     //     $dazzleInit.useTemplate($scope);
            //                     //     $dazzleData.updateElasticField(index,table,id,field,$scope.model.data);
            //                     // });
            //                     var params = {
            //                             'value': value,
            //                             'name':'dzTagsPopup',
            //                             'directive': '<dz-tags-popup></dz-tags-popup>'
            //                         };

            //                         $dazzlePopup.callPopup(params).then(function(output){
            //                             $scope.model.data = output;
            //                             $dazzleInit.useTemplate($scope);
            //                             $dazzleData.updateElasticField(index,table,id,field,$scope.model.data);
            //                         });
                                
            //                     break;
                                
            //                 case 'select':    
            //                     var sourcefield;
            //                     switch(field) {
            //                         case '課程種類(大)': sourcefield = 'Layer1'; break;
            //                         case '課程種類(小)': sourcefield = 'Layer2'; break;
            //                     } 
            //                   // console.log(sourcefield);
            //                     var selectdata = new Array();
            //                     var thisdb = {
            //                           "action": "searchData",
            //                           "index": "hotyeah",
            //                           "type": "activities",
            //                           "_source": [
            //                             sourcefield
            //                           ],
            //                           "body": {
            //                             "aggs" : {
            //                                 "layer" : {
            //                                     "terms" : 
            //                                     { "field": sourcefield,
            //                                       "size": 10000
            //                                     }
            //                                 }
            //                             }
            //                           }
            //                         }

            //                     thisquery = thisdb;

            //                      $http({
            //                         "method": "post",
            //                         "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
            //                         "data": thisquery

            //                     }).then(function (result) {
            //                      //   console.log('Result: ',field,result);
            //                         if (result.data.code < 0) {
            //                             //$dazzlePopup.toast(result.data.text + ":" + result.data.err.code);
            //                             //reject();
            //                             $scope.isNoData = true;
            //                         } else {
            //                             $.each(result.data.resolve, function(i){
            //                                 selectdata.push(result.data.resolve[i][sourcefield]);
            //                             });

            //                             selectdata = $.unique(selectdata);
            //                           // console.log(selectdata);
            //                             selectoption(selectdata);
            //                         }
            //                     });

            //                     function selectoption(selectdata) {
            //                      var params = {
            //                             'select': selectdata,
            //                             'options': selectdata,
            //                             'name': 'dzSelectPopup',
            //                             'directive': "<dz-select-popup></dz-select-popup>"
            //                         };

            //                         $dazzlePopup.callPopup(params).then(function(output){
            //                             //var image = output['image'];
            //                              $scope.model.data = output;
            //                             $dazzleInit.useTemplate($scope);
            //                             $dazzleData.updateElasticField(index,table,id,field,$scope.model.data);
            //                         });
            //                     }
            //                     break;
                                
            //                 case 'image':
            //                     var params = {
            //                         name: "userGalleryPopup",
            //                         directive:"<user-gallery-popup></user-gallery-popup>"
            //                     };

            //                     $dazzlePopup.callPopup(params).then(function(output){
            //                         //var image = output['image'];
            //                         var image = output;
            //                                 $scope.model.data = $dazzleFn.getFileUrl('large-web',output.gid);
            //                                  id =$element.attr('did');

            //                               // console.log(index,table,id,field)
            //                                 if (typeof id !== typeof undefined && id !== false) {
            //                                     id=$element.attr('did');
            //                                 } else
            //                                     id= $('#dazzle-key').text();
            //                                 $dazzleData.updateElasticField(index,table,id,field,$scope.model.data);
            //                                 $dazzleInit.useTemplate($scope);
            //                     });
            //                     break;

            //                 case 'gallery':
            //                     var params = {
            //                         name: 'dzGalleryPopup',
            //                         'images':value,
            //                         directive:"<dz-gallery-popup></dz-gallery-popup>"
            //                     }
            //                     $dazzlePopup.callPopup(params).then(function (images) {
            //                         $scope.model.data = images;
            //                         $dazzleInit.useTemplate($scope);
            //                         $dazzleData.updateElasticField(index,table,id,field,$scope.model.data);
            //                     });
            //                     break;

            //                 case 'formview':
            //                     break;

            //                 case 'file':
            //                     $dazzlePopup.uploadFile($dazzleUser.user.uid).then(function(uploaded){
            //                         $scope.model.data = uploaded;
            //                         $dazzleInit.useTemplate($scope);
            //                         $dazzleData.updateElasticField(index,table,id,field,$scope.model.data);

            //                     });
            //                     break;


            //                 case 'datetime':
            //                 case 'date':
            //                 case 'time':
            //                     break;

            //                 case 'button':
            //                     break;
                                
            //                 case 'checkbox':
            //                     break;
                            
            //               case 'data':
            //                   var params ={
            //                       name:'dzDataPopup',
            //                       directive: '<dz-data-popup></dz-data-popup>',
            //                       table: $element.attr('refer'),
            //                       filter: {
            //                          "學校":   $('#dazzle-key').text()
            //                       },
            //                       big:true
            //                   }
            //                     $dazzlePopup.callPopup(params).then(function(result){
            //                       console.log('Success'); 
            //                     });               
            //                     break;
            //                 default:
            //                     break;
            //             }




            //     }],
            //     ["更換模版", function () {
            //         var params = {
            //             "name": 'templatePopup',
            //             "directive": '<template-popup></template-popup>',
            //             'model': $scope.model
            //         };

            //         $dazzlePopup.callPopup(params).then(function(template){
            //                     $scope.useTemplate();
            //         });

            //     }]
            // ];

        }
    };
    return dzField;
});