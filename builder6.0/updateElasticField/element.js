var dazzle = angular.module("dazzle");


dazzle.service("$dazzleData", function ($window, $http, $compile, $uibModal, $mdDialog, $mdToast, $mdBottomSheet, $ocLazyLoad, $mdDateLocale, $dazzleS3, $dazzlePopup, $dazzleUser,  moment) {

    this.updateElasticField = function(index,table,id,field,value){
                var term={};
                term[field]=value;
                var params = {
                    "action": "updateData",
                    'index': index,
                    'type': table,
                    'id': id,
                    body:{
                        doc:term
                    }
                };
        return new Promise(function (resolve, reject) {
            $http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                "data": params
            }).then(function (result) {
                console.log(result);
                if (result.data.code > 0) {
                    resolve();
                } else {
                    $dazzlePopup.toast(result.data.text + ":" + result.data.err.code);
                    reject();
                }
            });
        });
    }
    
});