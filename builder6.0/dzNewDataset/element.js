var app = angular.module('demoApp');
                console.log('dz New Dataset');

app.directive('dzNewDataset', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzlePopup,$ocLazyLoad,
    dzFn,atomInfo,userInfo,dbFactory,pageInfo,dzS3) {

    var dzLink = {
      restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/dzNewDataset/element.html?id=" + new Date().getTime(),
        // css: {
        //   href: "//d27btag9kamoke.cloudfront.net/builder6.0/innoCompany/element.css?id=" + new Date().getTime(),
        //   preload: true
        // },
             compile : function(elements, attributes){
            return{
                pre : function($scope,$element,attribute) {
                    var id = $element.attr('id') || 'dataset-'+new Date().getTime();

                    if (!$scope.isSuperUser)
                        $element.find('dazzle-data-toolbar').remove();

                    $scope.editData = function() {
                         var params = {
                            name: 'dzDataPopup2',
                            directive: '<dz-data-popup2></dz-data-popup2>',
                            width:'90%',
                            table: atomInfo.atom[$scope.id]['query']['table'] || ''
                        }
                        $dazzlePopup.callPopup(params).then(function(result){

                        });             
                        
                    }
                    $scope.editTemplate = function(){
                         var template = atomInfo.atom[$scope.id]['template'] || ''
                         var params = {
                            name: 'dzCodePopup',
                            directive: '<dz-code-popup></dz-code-popup>',
                            body: template
                        }
                        $dazzlePopup.callPopup(params).then(function(result){
                            atomInfo.atom[$scope.id]['template'] = result;
                            console.log(result);
                        });             
                    }
                
                    $scope.dataSettings = function(){
                        var params ={
                            'name':"dzDatasetSettingsPopup",
                            "directive":"<dz-dataset-settings-popup></dz-dataset-settings-popup>",
                            "settings": atomInfo.atom[$scope.id]['query'] || {}
                        }
                        $dazzlePopup.callPopup(params).then(function(db){
                            console.log('DB',db);
                            db['order'] = 'desc';
                            atomInfo.atom[$scope.id]['query'] = db;
                            
                        });                       
                        
                        console.log('Data Settings');
                    }
                
                
                    $scope.updateDisplay = function(){
                        
                       if (!angular.isUndefined(atomInfo.atom[$scope.id]['query'])){
                            var db = atomInfo.atom[$scope.id]['query'];
                            $scope.table = atomInfo.atom[$scope.id]['query']['table'];
                            $scope.key = atomInfo.atom[$scope.id]['query']['key'];
                            $scope.schema = db;
                            $scope.template = atomInfo.atom[$scope.id]['query']['template'];
                            dbFactory.getDatas($scope.schema).then(function(result){
        
                                $scope.data = result;
                                atomInfo.atom[$scope.id]['data'] = $scope.data;
                                console.log('Display 2',result);
                                $scope.updateDisplay3();                  
                            
                            });
                        } else {
                            var id = $element.attr('id') || 'dataset-'+new Date().getTime();

                            $scope.data = atomInfo.atom[id]['data'];
                            console.log('My Atom',id,atomInfo.atom,$scope.data);

                            $scope.updateDisplay3();
                        }                    
                    }
                     var id = $element.attr('id') || 'dataset-'+new Date().getTime();
                     $scope.id= id;
                    $element.attr('id',id);
                    if (angular.isUndefined(atomInfo.atom[$scope.id]))
                        atomInfo.initAtom($scope.id);               
                            
                         $.getJSON( "/json/"+pageInfo.thisPage+"/"+id+"-atom.json?id=" + new Date().getTime())    
                          .done(function( json ) {
                            console.log('New Dataset',json);
                            atomInfo.atom[$scope.id] = json;
                            console.log('Dz Dataset Atom',atomInfo.atom);
                            $scope.updateDisplay();
                
                          })
                          .fail(function( jqxhr, textStatus, error ) {
                                $scope.updateDisplay();
                    
                          });
                    
                        
                        
                  $.getJSON( "/json/"+pageInfo.thisPage+"/"+id+"-atom.json?id=" + new Date().getTime(), function( json ) {
                            console.log('New Dataset',json);
                            
                            atomInfo.atom[$scope.id] = json;
                            console.log('Dz Dataset Atom',atomInfo.atom);
                            
                            $scope.updateDisplay();
                            
                      },function(){
                          console.log('No Data JSON');
                        //   $.getJSON("/json/"+pageInfo.thisPage+"/atom.json?id="+new Date().getTime(),function(json){
                        //         $scope.data = atomInfo.atom[$scope.id]['data'];
                        //         $scope.updateDisplay3();
                              
                        //   });
                          
                        //   console.log(id,'Nothing');
                        //   atomInfo.atom[id]['template'] = '';
                        //   atomInfo.atom[id]['query'] ={};
                       });
                
                    
                
                
                },
                post : function($scope, $element, attribute){
                  
                    var editMode = store.get('editMode') || 'normal';
                    var isDataPanel = false;    
//                    dazzleDataToolbar
                    var id = $element.attr('id') || 'dataset-'+new Date().getTime();
                    
                    console.log('Start');
                    


                    // if (angular.isUndefined(atomInfo.atom[id])) {
                    //     console.log('Init Atom');
                    // //    atomInfo.initAtom(id);
                    //     atomInfo.atom[id]['template'] ='';
                    //     atomInfo.atom[id]['query'] ={};
                    // }
                    

                

                   
                    $element.bind('contextmenu', function($event) {
                        console.log('Context Menu');
                    });
                    $element.bind('dblclick', function($event){
                        console.log("It's a double click");
                         
                        isSingleClick = false;
                        
                        setTimeout(function(){
                            isSingleClick = true;
                            return;
                        }, 500);

                        // if (isDataPanel)    {
                        //     $('dazzle-data-toolbar').hide();
                        //     isDataPanel = false;
                        // }else {
                        //     $('dazzle-data-toolbar').show();
                        //     isDataPanel = true;
                        // }


                     });
                     
                     
                }
            };
        },    
       
        controller: function ($scope, $element, $attrs) {
            
            $scope.updateDbfactory=function(data){
                if (angular.isUndefined(dbFactory.dataset[$scope.table]))                    
                    dbFactory.dataset[$scope.table] ={};
                angular.forEach(data,function(item,index){
                   var dataid = item[$scope.key];
                   dbFactory.dataset[$scope.table][dataid] = item; 
                });
            }
            $scope.isSuperUser = function() {
                var editMode = store.get('editMode');
                if (editMode =="admin")
                    return true;
                else
                    return false;
            }

            $scope.isUser = function(){
                var user = store.get('subUser') || null;
                if (user !=null)
                    return true;
                else
                    return false;
            }  
        

            //$dazzleInit.featherEditorInit($scope);
       $scope.updateDisplay3 = function(data){
                
                $element.find('[dz-display]').html(''); 
                var templateText =atomInfo.atom[$scope.id]['template'];
                console.log('template Text',templateText);
                var oele = angular.element(templateText);
                oele.removeAttr('dz-template');
                var size = parseInt(oele.attr('size')) || 1;
                    console.log('Size',size,$scope.data);
                oele.unwrap();
                for (var k=0;k<$scope.data.length;k+=size){
                    var ele = oele.clone();                    
                    var obj = {};
                    var i=0;
                    ele.find('[dz-data-item]').each(function(){
                        $(this).removeAttr('dz-data-item');
                        $(this).attr('dz-display-item','');
                        var ele2 = $(this);
                        var index = k+i;
                        if (index<$scope.data.length) {
                            console.log('Index',index,' ',k,' ',i);
                            var item = $scope.data[index];
                            var id = $scope.id+"-"+index.toString();
                            $(this).attr('id',id);
                            atomInfo.initAtom(id);
                            atomInfo.atom[id]['data'] = item;
                            atomInfo.atom[id]['key'] = $scope.key;
                            atomInfo.atom[id]['table'] = $scope.table;
                            atomInfo.atom[id]['template']  = $scope.template;
                            atomInfo.atom[id]['datasetID'] = $scope.id;
                            if (!angular.isUndefined(item[$scope.key]))
                                $(this).attr('dataId',item[$scope.key]);
    
                            if ($scope.isSuperUser()){
//                                $(this).attr('context-menu',"recordMenuOptions");                
                                console.log('is Super');
                            }                            
                        }
                            

                        
                      
                        i++;
                    });

    
                    ele.show();
                    $element.find('[dz-display]').append(ele);
                    
            }

            $ocLazyLoad.load(["//d27btag9kamoke.cloudfront.net/builder6.0/dzDisplayItem/element.js?id=" + new Date().getTime()], {cache: false}).then(function () {
                $compile($element.find('[dz-display]'))($scope);
                $element.find('[dz-display] *').show();
            }, function () {

                console.log("Can't load display");
            });
        
                
        }
            $scope.updateDisplay2 = function(data){
                
                $element.find('[dz-display]').html(''); 
                var size = parseInt($element.find('[dz-template]').attr('size')) || 1;
                var template = $element.find('[dz-template]').clone();
                $element.find('[dz-template]').hide();
                console.log('Template',template);
                
                template.removeAttr('dz-template');
                var templateText = template[0].outerHTML;
            
                for (var k=0;k<data.length;k+=size){
                    
                    var ele = angular.element(templateText);
                    
                    var obj = {};
                    var i=0;
                    ele.find('[dz-data-item]').each(function(){
                        $(this).removeAttr('dz-data-item');
                        $(this).attr('dz-display-item','');
                        var ele2 = $(this);
                        var index = k+i;
                        console.log('Index',index,' ',k,' ',i);
                        var item = $scope.data[index];
                        var id = $scope.id+"-"+index.toString();
                        $(this).attr('id',id);
                        atomInfo.initAtom(id);
                        atomInfo.atom[id]['data'] = item;
                        atomInfo.atom[id]['key'] = $scope.key;
                        atomInfo.atom[id]['table'] = $scope.table;
                        atomInfo.atom[id]['datasetID'] = $scope.id;
                        
                        $(this).attr('dataId',item[$scope.key]);

                        if ($scope.isSuperUser()){
                            $(this).attr('context-menu',"recordMenuOptions");                
                            console.log('is Super');
                        }
                        
                      
                        i++;
                    });

    
                    ele.show();
                    $element.find('[dz-display]').append(ele);
                    
            }

            $ocLazyLoad.load(["//d27btag9kamoke.cloudfront.net/builder6.0/dzDisplayItem/element.js?id=" + new Date().getTime()], {cache: false}).then(function () {
                $compile($element.find('[dz-display]'))($scope);
                $element.find('[dz-display] *').show();
            }, function () {

                console.log("Can't load display");
            });
        
                
        }
            
             
            $scope.updateTemplate = function(data) {

//                console.log($element.find['dz-data-display']);


                var template = $element.find('[dz-template]').clone();
                console.log('Template',template);
                
                template.removeAttr('dz-template');
                var templateText = template[0].outerHTML;
                var text = '';
                var id = $scope.tableKey;
//                            $dazzleUser.dazzleInfo['data'] = {};
                angular.forEach(data, function (item, index) {
                    var ele = angular.element(templateText);
                    var obj = {};

                    console.log('Ele', item[id]);
//                    ele.attr('id', 'data-' + $scope.table + '-' + item[$scope.key]);
                    // ele.find('[dz-new-field]').attr('dataset-id', $scope.id);
                    // ele.find('[dz-new-field]').attr('dataset-index',index);
                    ele.find('[dz-new-field]').attr('data-table',$scope.table);
                    ele.find('[dz-new-field]').attr('data-id',item[$scope.key]);
                    ele.find('[dz-new-field]').attr('data-key',$scope.key);
                    text = text + ele[0].outerHTML;
                });
                console.log('Template Text',text);
                $element.find('[dz-template]').hide();
                $element.find('[dz-display]').html(text);            
                var content = $element.find('[dz-display]').contents();
                $compile(content)($scope);
                $element.find('[dz-display] *').show();
            }
    
          $scope.save = function(){
            
          }
            $scope.new = function(){
                
            }
         
         
//             $scope.recordMenuOptions = [

//                 ["新增", function () {
//                   var index = location.hostname;
//                     var table = $scope.schema['table'];
//                     var isAdd = false;
//                     var template = table+"-template.html";
//                     var created = new Date();       
//                     var json = {};
//                     var title = prompt("請輸入新資料標題。注意：重覆標題會導致資料被覆寫！");
//                     dzS3.checkFile(userInfo.exportBucket,title+'.html').then(function(answer){
//                         json[$scope.key] = title; 

//                         if (answer){
//                             if (!confirm('匯出會覆蓋舊頁，有否問題？'))
//                                 return;
//                             else
//                               dzFn.addNewPage(title+'.html',title+'.html',template,json,$scope.table);       
//                         } else
//                             dzFn.addNewPage(title+'.html',title+'.html',template,json,$scope.table);

                            
                        
//                     });

//                 }],     
//                 ["刪除", function ($itemScope,$event) {
// //                        $scope.remove();
//                     var ele = angular.element($event.currentTarget);
//                     var index = ele.attr('data-index');
//                     console.log('Current',ele.attr('data-index'),$scope.key,$scope.data,$scope.table);
//                     var dataId = $scope.data[index][$scope.key];
//                     console.log('Data ID',dataId);
//                     dbFactory.removeData($scope.table,dataId).then(function(){
//                         alert('成功刪除資料。');
//                         ele.remove();
//                     });
//                 }],                
//                 [ "更新", function () {
//                     var ele = angular.element($event.currentTarget);
//                     var index = ele.attr('data-index');
//                     var dataId = $scope.data[index][$scope.key];
                    
//                     dbFactory.updateData($scope.table,dataId,data).then(function(){
//                         alert('成功更新資料。');
//                         ele.remove();
//                     });
//                 }]
//             ];
         
            $scope.menuOptions = [
                // ["儲存公司", function () {
                //     $scope.save();
                    
                // }],
                 ["新增", function () {
                   
                                    

                }],     
                ["資料管理", function () {
                        console.log('Data Management');
                }],                
                [ "更新現有資料", function () {
                    //$scope.save();
                    console.log('Update Data');    
                }]
            ];
            
            $scope.myDate = function(timestamp){
                return new Date().getTime();
            }
           // atomInfo.atom[$scope.id]['contextMenu'] = $scope.menuOptions;
            
            function getDataId(data,key){
                return data[key];
            }

        }
    };
    return dzLink;
});