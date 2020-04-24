var app = angular.module('demoApp');
app.directive('dzStaticDataset', function ($compile, $mdDialog,$dazzleUser,$dazzleS3,$http,$dazzleFn,
    pageInfo,userInfo,atomInfo,dzS3) {
    var master = {
        require: '^^dzContainer',
        restrict: 'A',
        priority: 1000,
        scope: true,
        
        compile : function(elements, attributes){
            return{
                pre : function($scope,$element,attribute) {
                        console.log('Load DZ Dataset');    
                        var id = $element.attr('id') || null;
                        if (!id)
                            id= new Date().getTime();                            
                            
                        $element.attr('id',id);

                         console.log('Load Static Dataset');
                        var json;
                        var thisPage = decodeURIComponent(location.pathname).substring(location.pathname.lastIndexOf('/') + 1) || 'index.html';
                        $scope.dataId = $('dz-content-id').text();
                        $scope.table = $element.attr('data-table');
                        $scope.count = $element.attr('data-count') || null;
                        $scope.sort = $element.attr('data-sort') || null;
                        $scope.order = $element.attr('data-order') || 'desc';
                        var filter = $element.attr('data-filter') || null;

        
                        if (filter) {
                            console.log('FIlter',filter);
                            var filters = filter.split(":");
                                                
                            $scope.filter ={};
                            $scope.filter[filters[0]] = filters[1];
                            
                        }
                        
                        if (angular.isUndefined(atomInfo.atom[id]))
                            atomInfo.atom[id] = {
                              'id': id,
                              'dataId':$scope.dataId,
                              'table': $scope.table,
                              'count': $scope.count,
                              'sort' :$scope.sort,
                              'order' :$scope.order,
                              'filter': filter
                            };
                            
                            
                        var mode = store.get('editMode');
                        console.log('/content/'+$scope.table+'-table.json');
                        if (angular.isUndefined(mode) || mode=="normal"){
                            dzS3.getAtomById(id).then(function(json){
                                if (angular.isUndefined(json.data))
                                         dbFactory.loadData($scope.table, $scope.count, $scope.sort, $scope.order, $scope.filter).then(function (data) {
                                                atominfo.atom[id]['data'] = data; 
                                                $scope.data = data;
                                                $element.html(json.template);
                                                $compile($element.contents())($scope);
                                        }); 
                                else{
                                    $scope.data = json.data;
                                    $element.html(result.template);
                                    $compile($element.contents())($scope);
                                }
                                
                            })
                              $http({
                                    method: 'GET',
                                    url: '/json/'+thisPage+'/'+id+'-atom.json',
                                }).then(function successCallback(result) {
                                    
                                },function(){
                                    
                                });
                          
                        } else {
                            dbFactory.loadData($scope.table, $scope.count, $scope.sort, $scope.order, $scope.filter).then(function (data) {
                                    atominfo.atom[id]['data'] = data; 
                                    $scope.data = data;
                                    $element.html(result.template);
                                    $compile($element.contents())($scope);
                            });
                        }

                },
                post : function(scope, element, attribute){
                  
                  
                  
                }
            };
        },
        link: function (scope, element, attrs) {
            console.log('Init DZ Master Link');
        },
        controller: function ($scope, $http, $element, $attrs) {

        }
    };
    return master;
});
