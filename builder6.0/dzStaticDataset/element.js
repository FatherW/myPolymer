var app = angular.module('demoApp');
app.directive('dzStaticDataset', function ($compile, $templateRequest, $mdToast,$http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,
    $dazzlePopup,$dazzleData,$dazzleFn,dbFactory,dataInfo,dzFn,dzS3,atomInfo,dbFactory) {
    var myAtom;        
    var dzDataset = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
        compile: function ($element, tAttrs) {
           return {
               pre: function ($scope, $element, iAttrs) {
                    $element.attr('context-menu','menuOptions');
                    dzFn.checkAtom($element);
                    $scope.id = $element.attr('id');
               },
               post: function ($scope, $element, iAttrs) {
                    
                   myAtom = atomInfo.atom[$scope.id];
                   console.log('Dz Static Dataset Load',atomInfo.atom[$scope.id],myAtom);

                   
                    $scope.field = atomInfo.atom[$scope.id].field || null;
                    $scope.type =  atomInfo.atom[$scope.id].type || null;
                    $scope.dataId =  atomInfo.atom[$scope.id].dataId || null;
                    $scope.table =  atomInfo.atom[$scope.id].table || null;
                    $scope.count =  atomInfo.atom[$scope.id].count || null;
                    $scope.sort =  atomInfo.atom[$scope.id].sort || null;
                    $scope.order = atomInfo.atom[$scope.id].order || "desc";
                    $scope.filter =  atomInfo.atom[$scope.id].filter || null;
                    console.log('My Atom',$scope.id,atomInfo.atom,myAtom);
                    
                   var mode = store.get('editMode');
                    console.log('/content/'+$scope.table+'-table.json');
                    if (angular.isUndefined(mode) || mode=="normal")
                        $scope.mode = "normal";
                    else
                        $scope.mode = "admin";
                        
            
                    if ($scope.mode=="normal")
                        $element.removeAttr('context-menu');
                        
                     $http({
                        method: 'GET',
                        url: '/content/'+atomInfo.atom[$scope.id].table+'-table.json',
                    }).then(function successCallback(result) {
                        var id = result.data.data.key;
                        console.log('Hello ID',result,id);
                        $scope.tableKey = id;
                        if (angular.isUndefined(atomInfo.atom[$scope.id].data) || $scope.mode=="admin")
                            dbFactory.loadData($scope.table, $scope.count, $scope.sort, $scope.order, $scope.filter).then(function (data) {
                                        atomInfo.atom[$scope.id].data = data;
                                        $scope.updateTemplate(data,myAtom);
                            });
                        else {
                            var data = atomInfo.atom[$scope.id].data;
                            $scope.updateTemplate(data,myAtom);
                            
                        }
                    });
               }
           }
       },

        link: function ($scope, $element, attrs) {      
                 
                
        },
        controller: function ($scope, $element, $attrs) {

                     $scope.updateTemplate = function(data,myAtom) {
                         
                        console.log('Data Set', myAtom['dbTemplate']);
                        var template = $element.find('[dz-template]');
                        console.log('Dataset Template',template,template.html());
                        template.html(myAtom['dbTemplate']);        
                        console.log('Dataset Template',template,template.html());
                        
                        var text = '';
                        var id = $scope.tableKey;
        //                            $dazzleUser.dazzleInfo['data'] = {};
                        angular.forEach(data, function (item, index) {
                            var ele = angular.element(template);
                            var obj = {};
        
                            console.log('Ele', item[id]);
                            ele.attr('id', 'data-' + myAtom.table + '-' + item[id]);
                            ele.find('[dz-field]').attr('data-id', 'data-' + myAtom.table + '-' + item[id]);
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
                            $dazzleUser.dazzleInfo['data']['data-' + myAtom.table + '-' + item[id]] = item;
                        });
                        console.log('Data Info',$dazzleUser.dazzleInfo['data']);
                        console.log('Template text',text);
                        // $element.find('[dz-template]').replaceWith(text);
        
                        $element.find('[dz-template]').html(text);
                        $compile($element.find('[dz-field]'))($scope);

                    }
                    
                    $scope.menuOptions = [

                            ["選擇資料", function () {
                             dzS3.getData('table.json').then(function(tableList){
                                var params = {
                                    name: 'dzSelectPopup',
                                    directive: '<dz-select-popup></dz-select-popup>',
                                    options: tableList,
                                    select: tableList[0].id,
                                    width:"300px"
                                }
                                $dazzlePopup.callPopup(params).then(function(tableId){
                                    atomInfo.atom[$scope.id].table = tableId;
                                });                             
                             
                             });
                                 
                            }],
                            ["設定篩選條件", function () {
                                atomInfo.atom[$scope.id].filter=null;
                            }],
                            ["設定樣辦", function () {
                                 var params = {
                                    name: 'dzCodePopup',
                                    directive: '<dz-code-popup></dz-code-popup>',
                                    body: atomInfo.atom[$scope.id]['dbTemplate'] || ''
                                }
                                    $dazzlePopup.callPopup(params).then(function(result){
                                            atomInfo.atom[$scope.id]['dbTemplate'] = result;
                                            //$('panel').find('dz-text').html(result);
                                            console.log('Select Atom Info',atomInfo);
                                    });     
            
                            }],["排序方式", function () {
                                    atomInfo.atom[$scope.id].sort = null;
                                    atomInfo.atom[$scope.id].order = null;
                                    
                            }]
                        ];

        }
    };
    return dzDataset;
});