var app = angular.module('demoApp');
app.filter('myFilter', function() {
    // the filter takes an additional input filterIDs
    return function(inputArray, filterIDs) {
        // filter your original array to return only the objects that
        // have their ID in the filterIDs array
        return inputArray.filter(function (ID) {
            return this.indexOf(ID) !== -1;
        }, filterIDs); // filterIDs here is what "this" is referencing in the line above
    };
});

app.controller('commentUserController',function($scope,$element,$dazzleData){
   $scope.loadUser = function(uid){
       $dazzleData.loadElasticRecordById('hotyeah','user',uid).then(function(user){
            $scope.user = user; 
       });
   }
    
});