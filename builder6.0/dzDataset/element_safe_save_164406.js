var app = angular.module('demoApp');
app.directive('dzDataset', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,$dazzlePopup,$dazzleData,$dazzleFn,dbFactory,dataInfo) {
    var dzDataset = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
//        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/file6.0/directive-template.html",
        link: function ($scope, $element, attrs) {
            var json;
                $scope.field = $element.attr('data-field');
                $scope.type = $element.attr('data-type');
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
                var mode = store.get('editMode');
                console.log('/content/'+$scope.table+'-table.json');
                if (angular.isUndefined(mode) || mode=="normal"){
                    $http({
                        method: 'GET',
                        url: '/content/'+$scope.table+'-table.json',
                    }).then(function successCallback(result) {
                        var id = result.data.data.key;
                        console.log('ID',result,id);
                        if (result.data.data.type=="dynamodb"){
                            dbFactory.loadData($scope.table, $scope.count, $scope.sort, $scope.order, $scope.filter).then(function (data) {
                                $scope.updateTemplate(data);
                            });
                        } else {
                            $http({
                                method: 'GET',
                                url: '/content/'+$scope.table+'-data.json',
                            }).then(function successCallback(result) {
                                $scope.updateTemplate(result.data);
                            });
                        }

                    });
                }
                


                
        },
        controller: function ($scope, $element, $attrs) {
            $scope.addClass = function(ele){

            }

            $scope.updateTemplate = function(data) {
                console.log('Data Set', data);
                var template = $element.find('[dz-template]');
                console.log('Template',template);
                var text = '';
//                            $dazzleUser.dazzleInfo['data'] = {};
                angular.forEach(data, function (item, index) {
                    var ele = angular.element(template);
                    var obj = {};
                    console.log('Ele', item[id]);
                    ele.attr('id', 'data-' + $scope.table + '-' + item[id]);
                    ele.find('[dz-field]').attr('data-id', 'data-' + $scope.table + '-' + item[id]);
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
                console.log('Template text',text);
                $element.find('[dz-template]').replaceWith(text);
//                            $element.html(text);
                $compile($element.find('[dz-field]'))($scope);
            }
    
        }
    };
    return dzDataset;
});