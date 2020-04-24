var app = angular.module('demoApp');
      console.log('DZ Dataset');
app.directive('dzDataset', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,
    $dazzlePopup,dbFactory,dataInfo,dzFn, atomInfo) {
    var dzDataset = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
//        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/file6.0/directive-template.html",


        link: function ($scope, $element, attrs) {
        console.log('DZ Link');
            var json;
                $scope.field = $element.attr('data-field');
                $scope.type = $element.attr('data-type');
                $scope.dataId = $('dz-content-id').text();
                $scope.table = $element.attr('data-table') || null;
                $scope.count = $element.attr('data-count') || null;
                $scope.sort = $element.attr('data-sort') || null;
                $scope.order = $element.attr('data-order') || 'desc';
                $scope.key = $element.attr('data-key') || 'id';
                var filters = $element.attr('data-filter') || null;
                
//                var id= $element.attr('id') || null;
                   var id = $element.attr('id') || new Date().getTime();
                    $scope.id= id;
                    $element.attr('id',id);
                    atomInfo.initAtom(id);
                    
                if (filters) {
                    var item = filters.split(";");
                    i=0;
                    $scope.filter ={
                        "bool":{
                            "must":[]
                        }
                    };
                    item.forEach(function(filter){
                        console.log('FIlter',filter);
                        var sentence = filter.split(":");
                        var ele={};
                        ele[sentence[0]]=sentence[1];
                        $scope.filter['bool']['must'].push({
                           "match":ele
                        });
                    });
                }
                else 
                    $scope.filter =null;
                        
                console.log('Filter',id,$scope.filter);        
                json = {
                    "field":$scope.field,
                    "type":$scope.type,
                    "dataId": $scope.dataId,
                    "table":$scope.table,
                    "count":$scope.count,
                    "sort":$scope.sort,
                    "order":$scope.order,
                    "filter":$scope.filter,
                    "key":$scope.key
                };
                dzFn.checkAtom($element,json);


                var mode = store.get('editMode');
                console.log('/content/'+$scope.table+'-table.json');
                if (angular.isUndefined(mode) || mode=="normal")
                    $scope.mode = "normal";
                else
                    $scope.mode = "admin";
                    
            
                    $http({
                        method: 'GET',
                        url: '/content/'+$scope.table+'-table.json',
                    }).then(function successCallback(result) {
                        var id = result.data.data.key;
                        console.log('ID',result,id);
                        $scope.tableKey = id;
                        if (result.data.data.type=="dynamodb"){
                            console.log('Load Data',$scope.table, $scope.count, $scope.sort, $scope.order, $scope.filter);
                            dbFactory.loadData($scope.table, $scope.count, $scope.sort, $scope.order, $scope.filter).then(function (data) {
                                $scope.data = data;
                                $scope.updateTemplate(data);
                            });
                        } else {
                            $http({
                                method: 'GET',
                                url: '/content/'+$scope.table+'-data.json',
                            }).then(function successCallback(result) {
                                $scope.updateAngularTemplate(result.data);
                            });
                        }

                    });
                // }
                // var editMode = store.get('editMode') || 'normal';
                // if (editMode=='admin'){
                //     console.log('Edit Admin Mode');
                //     $scope.isSuper = true;
                //     $element.find('#dzContextMenu').attr('context-menu','menuOptions');
                //     $compile($element.find("#dzContextMenu"))($scope);
                // }

                
        },
        controller: function ($scope, $element, $attrs) {
            
                    $scope.menuOptions = [
                            ["新增", function ($itemScope,$event) {
                                var title = prompt("請輸入資料標題. 注意! 標題不能與其他資料重覆. 錯誤輸入會引致資料覆寫, 敬請注意.");
                                dbFactory.saveDataByID($scope.table,title,$scope.data).then(function(){
                                      dzFn.addNewPage(title,'title','newsTemplate.html',$scope.data);
                                });                               
                            }],
                            ["更新", function ($itemScope,$event) {
                                var ele = angular.element($event.currentTarget);
                               
                            }]
                            ["刪除", function ($itemScope,$event) {
                                var ele = angular.element($event.currentTarget);
                               
                            }]
                        ];
            $scope.addClass = function(ele){

            }
            $scope.getYouTubeID = function (url) {
                var ID = '';
                url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
                if (url[2] !== undefined) {
                    ID = url[2].split(/[^0-9a-z_\-]/i);
                    ID = ID[0];
                } else {
                    ID = url;
                }
                return ID;
            }
            $scope.getYouTubeEmbed = function(item){
                var id = $scope.getYouTubeID(item);
                return "https://www.youtube.com/embed/"+id;
            }
            $scope.updateAngularTemplate = function(data) {
                console.log('Data Set', data);
                $scope.data = data;
                var template = $element.find('[dz-template]');
                console.log('Template',template);
                var text = '';
                var id = $scope.tableKey;
                var repeatText = 'item in data';

                if ($scope.filter)
                    repeatText =repeatText + "| filter:"+JSON.stringify($scope.filter);
                template.attr('ng-repeat',repeatText);
                template.find('[dz-field]').each(function(){
                    var field = $(this).attr('data-field');
                    var type = $(this).attr('data-type');
                    switch(type){

                        case 'youtube':
                            var embed = `
                            <iframe width="100%" height="auto" ng-src="{{getYouTubeEmbed(item['`+field+`'])}}" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        `;
                            $(this).html(embed);
                            break;

                        case 'dlink':
                            $(this).attr('ng-href',"{{item['"+field+"']}}");
                            break;
                        case 'text':
                        default:
                            $(this).text("{{item['"+field+"']}}");
                            break;
                    }
                    $(this).removeAttr('dz-field');
                });

                //
                // angular.forEach(data, function (item, index) {
                //     var ele = angular.element(template);
                //     var obj = {};
                //
                //     console.log('Ele', item[id]);
                //     ele.attr('id', 'data-' + $scope.table + '-' + item[id]);
                //     ele.find('[dz-field]').attr('data-id', 'data-' + $scope.table + '-' + item[id]);
                //     var cEle = ele.find('[data-class]');
                //     var oddEven;
                //     if (cEle) {
                //         var classType = cEle.attr('data-class');
                //         switch(classType) {
                //             case 'odd-even':
                //                 oddEven = index %2? 'odd': 'even';
                //                 cEle.attr('class',oddEven);
                //                 break;
                //         }
                //     }
                //     text = text + ele.html();
                //     $dazzleUser.dazzleInfo['data']['data-' + $scope.table + '-' + item[id]] = item;
                // });
                // console.log('Data Info',$dazzleUser.dazzleInfo['data']);
                // console.log('Template text',text);
                // $element.find('[dz-template]').replaceWith(text);


                    $compile($element.find('[dz-template]'))($scope);


            }

            $scope.updateTemplate = function(data) {
                console.log('Data Set', data,$scope.table);


//                if ($element.find(['dz-data-display']))

                    console.log($element.find['dz-data-display']);


                var template = $element.find('[dz-template]');
                console.log('Template',template);
                var templateText = template.html();
                var text = '';
                var id = $scope.tableKey;
//                            $dazzleUser.dazzleInfo['data'] = {};
                angular.forEach(data, function (item, index) {
                    var ele = angular.element(template);
                    var obj = {};

                    console.log('Ele', item[id]);
                    ele.attr('id', 'data-' + $scope.table + '-' + item[id]);
                    ele.find('[dz-field]').attr('data-id', 'data-' + $scope.table + '-' + item[id]);
                    ele.find('[dz-field]').each(function(){
                       var field=$(this).attr('data-field'); 
                       var type=$(this).attr('data-type');
                       if(type=="text")
                           $(this).text(item[field]);
                    });
                    
                    var cEle = ele.find('[data-class]');
                    var oddEven;
                    if (cEle) {
                        var classType = cEle.attr('data-class');
                        switch(classType) {
                            case 'odd-even':
                                oddEven = index %2? 'odd': 'even';
                                cEle.attr('class',oddEven);
                                break;
                        }
                    }
//                                ele.wrap('<div></div>');
                    text = text + ele.html();
                    $dazzleUser.dazzleInfo['data']['data-' + $scope.table + '-' + item[id]] = item;
                });
                console.log('Data Info',$dazzleUser.dazzleInfo['data']);
                // $element.find('[dz-template]').replaceWith(text);

                $element.find('[dz-template]').html(text);
                var ele = angular.element($element.find('[dz-template]')).clone();
                $scope.templateText = ele.html();
                ele.removeAttr('dz-template').attr('dz-data-display','');
                console.log('Dataset',ele);
                console.log('Dataset',$element.find('[dz-data-display]'));
                $element.find('[dz-data-display]').remove();

                // $element.append(ele);
                ele.insertAfter($element.find('[dz-template]'));
                $compile($element.find('[dz-field]'))($scope);
                $element.find('[dz-template]').html(templateText);
                $element.find('[dz-template]').hide();
                $element.find('[dz-data-display]').attr('style','');
            }
    
        }
    };
    return dzDataset;
});