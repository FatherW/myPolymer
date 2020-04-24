var app = angular.module("app", ['smart-table']);


app.controller("DataController", function ($scope, $http) {
  $scope.model={};
	$http.get('content/magazine-data.json').then(function(response) {
        $scope.model.data = response.data;


        console.log($scope.model.data);
    });



});