var app = angular.module('demoApp');
var states={
  value: [],
  display:[]
};
app.directive('dazzleMassMailPopup', function ($compile, $templateRequest, $mdDialog, $dazzlePopup,$dazzleFn,$dazzleInit,$q,$log,$timeout,$http) {
    var name = 'dazzleMassMailPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "//d25k6mzsu7mq5l.cloudfront.net/builder6.0/dazzleMassMailPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dazzleMassMailPopup";
            scope.type = "dazzleMassMailPopup";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;

        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
                // console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');

             
//                $scope.images = JSON.parse(angular.toJson(images)) || [];

                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');
                
                $scope.successEmail = [];
                $scope.failEmail = [];
                
                
               $scope.sendEmail = function(from,to,subject,text) {
                    return new Promise(function (resolve, reject) {
                        console.log('Load DynamoDB Data');
                        $http({
                            "method": "post",
                            "url": "https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail",
                            "data": {
                                "from": from,       // sender address
                                "to": to,           // list of receivers
                                "subject": subject, // Subject line
                                "text": text        // html body
        
                            }
                        }).then(function (result) {
                            console.log(result);
                            if (result.data.code < 0) {
                                $scope.failEmail.push(to);
                                reject();
                            } else {
                                $scope.successEmail.push(to);
                                resolve();
                            }
                        });
                    });
                }
                
                $scope.cancel = function() {
                    $mdDialog.hide();
                }
                $scope.massMail = function(){
                    var selectedRows = $dazzleUser.dazzleInfo['selectedRows'];
                    var from,to,subject,html,text;
                    console.log('Send Email',selectedRows);
                    from = "support@01power.net";
        
        
                    angular.forEach(selectedRows,function(item,index){
                        // text = "各位石硤尾官小的校友﹕\n" +
                        //     "\n" +
                        //     " \n" +
                        //     "因學校網頁已經轉移到較快的新系統中，現需麻煩各位重新設定個人密碼來使用網站內之所有功能，請點擊以下連結及使用現提供之用戶登入名稱及臨時密碼登入及完成重設密碼手續，謝謝﹗"+
                        // "\n" +
                        // " \n" +
                        // "連結：http://www.skmgps.org/更改密碼.html"
                        // " \n" + "賬號："+item['login']
                        // " \n" + "密碼："+item['password']
                        // "\n" +
                        // " \n" +
                        //     "在輸入賬號、密碼、及新密碼後，用戶即可使用本站的留言版、尋找同學及時光隧道等功能。"
        
                        text = $scope.text;
                        text = text.replace("[[login]]",item['login']);
                        text = text.replace("[[password]]",item['password']);
                        $scope.sendEmail(from,item['email'],$scope.subject,text);
                    });
        
                    $mdDialog.hide();
        
        
        
                    // api = "https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail";
                    //
        
        
        
                }
            
            
             
             
        }
    };
    return link;
});
