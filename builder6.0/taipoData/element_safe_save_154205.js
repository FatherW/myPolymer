var app = angular.module('demoApp');
app.directive('taipoData', function($compile, $templateRequest, $http, $mdDialog, $dazzleUser, $dazzleS3, $dazzleInit, $dazzlePopup, $dazzleData, $dazzleFn, dbFactory, dataInfo) {
    var taipoData = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
        link: function($scope, $element, attrs) {
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
                console.log('FIlter', filter);
                var filters = filter.split(":");

                $scope.filter = {};
                $scope.filter[filters[0]] = filters[1];

            }
            var mode = store.get('editMode');
            console.log('/content/' + $scope.table + '-table.json');
            if (angular.isUndefined(mode) || mode == "normal") {
                $http({
                    method: 'GET',
                    url: '/content/' + $scope.table + '-table.json',
                }).then(function successCallback(result) {
                    var id = result.data.data.key;
                    console.log('ID', result, id);
                    dbFactory.loadData($scope.table, $scope.count, $scope.sort, $scope.order, $scope.filter).then(function(data) {
                        $scope.model.data = data;
                        console.log($scope.model.data);
                        $scope.sortReverse  = true;
                        $scope.sortType="publishDate";
                        $scope.toSort = function(name){
                            if ($scope.sortType !=name)
                                $scope.sortType = name;
                            else
                                $scope.sortReverse = ! $scope.sortReverse;
                        }

                        console.log($scope.model.data);
                        $compile($element.contents())($scope);
                    });
                });
            }

        },
        controller: function($scope, $element, $attrs) {



        }
    };
    return taipoData;
});