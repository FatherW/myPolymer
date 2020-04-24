var app = angular.module('demoApp');

app.directive('metalProductItem', function ($compile, $timeout, $uibModal, $mdDialog, $mdToast, $dazzleS3,$dazzleData, $dazzleUser, $dazzlePopup,$dazzleInit) {
            // Function save$scope.thisPageJson, save$scope.masterJson, saveRootHtml, saveMasterAtom, save$scope.thisPage
                    // $scope.thisPage => $scope.pagename
                    // $scope.websiteKey => 'website/'+$scope.hostname;

    var metalProductItem = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalProductItem/element.html?id=" + new Date().getTime(),
        controller: function ($scope, $http, $element) {
  
            $scope.companyInit = function(id) {
                console.log('company Init');
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data":{
                        "action": "getData",
                        "index": "5metal.dazzle.website",
                        "type": "company",
                        "id": id
                    }
                }).then(function (result) {
                    //console.log(result);
                    if (result.data.code < 0) {
                        console.log('Unsuccess');
                    } else {
                        //console.log('ID',id,result.data.resolve);
                        $scope.model = result.data.resolve;
                    }
                });
            }

            $scope.companyCommentNo = function(id) {

            }


            $scope.companyNoProduct = function(id) {

            }
            $scope.companyAge = function(id) {
                var age,now;

                now = new Date().getTime();

                // console.log('Now',now);
                console.log($scope.model['created']);
                age = now - parseInt($scope.model['created']);

                // console.log('Age',age);
                return age;
            }
            $scope.init = function(id) {
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data":{
                        "action": "getData",
                        "index": "5metal.dazzle.website",
                        "type": "product",
                        "id": id
                    }
                }).then(function (result) {
                    //console.log(result);
                    if (result.data.code < 0) {
                        console.log('Unsuccess');
                    } else {
                        //console.log('ID',id,result.data.resolve);
                        $scope.model = result.data.resolve;
                        //console.log('Success');
                    }
                });
            }

            $scope.loadImage = function(images) {
                if (Array.isArray(images))
                    return images[0];
                else
                    return images;
            }
          
         
        }
    };
    return metalProductItem;
}); 
 
 
