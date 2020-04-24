
var app = angular.module('demoApp');
app.directive('dazzleUser', function ($compile, $templateRequest,  $mdDialog,$dazzlePopup,$dazzleUser,$http,$dazzleElastic) {
    var dzUser = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {

        },
        controller: function ($scope, $element, $attrs) {
            console.log('appController');
            $scope.user = $dazzleUser.getUser();
            if ($dazzleUser.getUser() && $dazzleUser.getUser().token) {
                $dazzleUser.userLogin($dazzleUser.getUser().token).then(function () {
                    $scope.$apply(function () {
                        $scope.user = $dazzleUser.getUser();
                    });
                }, function () {
                    $scope.logout();
                });
            }
            $scope.loginPopup = function () {
                $dazzlePopup.login().then(function (user) {
                    $dazzleUser.setUser(user);
                    $scope.$apply(function () {
                        $scope.user = $dazzleUser.getUser();
                    });
                    $scope.goToDashboard();
                });
            };
            $scope.goToDashboard = function () {
                if ($scope.user) {
                    window.location.href = "https://dashboard.dazzle.website/index.html?token:===:" + $scope.user.token;
                }
            }
            $scope.logout = function () {
                store.clearAll();
                location.reload();
            }

            $scope.getMyWebsite = function () {
                $scope.myWebsites = {};
                if (angular.isArray($scope.user.webdomain)) {
                    for (var i = 0; i < $scope.user.webdomain.length; i++) {
                        getWebsiteJson($scope.user.webdomain[i]);
                    }
                } else {
                    getWebsiteJson($scope.user.webdomain);
                }

                function getWebsiteJson(websiteId) {
                    $dazzleS3.getJson("dazzle-user-" + $scope.user.uid, "website/" + websiteId + '/json/website.json').then(function (json) {
                        $scope.$apply(function () {
                            $scope.myWebsites[websiteId] = json;
                        });
                    });
                }
            }

            $scope.editWebsite = function (website) {
                window.open(
                    "http://builder.dazzle.website/index.html?token:===:" + $scope.user.token + "&&&websiteId:===:" + website.website + "&&&editPage:===:" + "index",
                    '_blank'
                );
            }
        }

    };
    return dzUser;
});



//
//
// var app = angular.module('demoApp');
// app.directive('dazzleTable2', function ($compile, $templateRequest, $mdDialog, $uibModal) {
//     var dazzleTable2 = {
//         restrict: 'E',
//         priority: 1000,
//         scope: true,
//         link: function (scope, element, attrs) {
//             scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
//             scope.directiveId = "dazzleTable2";
//             scope.type = "dazzleTable2";
//             scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
//             scope.templateUrl = scope.http + scope.templatePath;
//             scope.editorCustomInit(scope, element, attrs).then(function () {
//                 /*if (angular.isUndefined(scope.model.field)) {
//                  scope.model.field = "xxx";
//                  scope.updateHtml();
//                  //scope.updateRealHtml();
//                  }*/
//                 var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
//                 element.html(template);
//                 scope.$apply(function () {
//                     $compile(template)(scope);
//                 });
//             });
//         },
//         controller: function ($scope, $element, $attrs) {
//
//             $scope.showTarget = function($event){
//
//                 console.log('SHow Target',$event.currentTarget);
//             }
//             $scope.menuOptions = [
//                 ["加月份", function () {
//                     $( ".data_table tr:first-child" ).after( `<tr><th valign="top">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
// <th colspan="4" valign="top">(請輸入)2018年3月</th></tr>`);
//
//                 }],
//                 ["加課程", function () {
//                     $( ".data_table tr:nth-child(2)" ).after( `<tr>
// <td valign="top">
// 				1818</td>
// <td valign="top">大笑瑜伽領袖訓練課程 (認證課程)</td>
// <td align="center" valign="top" width="12%"><u style="color: rgb(0, 98, 160); font-size: 13.3333px;"><a href="http://www.hkswgu.org.hk/files/1818_大笑瑜伽領袖訓練課程 (認證課程).pdf"><img alt="" src="http://www.hkswgu.org.hk/sites/default/files/images/general/icon_file.gif" style="width: 12px; height: 15px;"></a></u></td>
// <td align="center" valign="top" width="12%">
// 				<a href="課程／講座報名表.html" style="color: rgb(0, 98, 160); text-decoration-line: underline; font-size: 13.3333px;"><img alt="" src="http://www.hkswgu.org.hk/sites/default/files/images/general/icon_online.gif" style="width: 14px; height: 15px;"></a></td>
// <td align="center" valign="top" width="12%">
// 				<u style="font-size: 13.3333px; color: rgb(0, 98, 160);"><a href="http://www.hkswgu.org.hk/sites/default/files/_20160907.pdf" style="color: rgb(0, 98, 160);"><img alt="" src="http://www.hkswgu.org.hk/sites/default/files/images/general/icon_save.gif" style="width: 14px; height: 15px;"></a></u></td>
// </tr>` );
//
//                 }],
//                 ["刪除此行", function() {
//  //                   console.log('Origina',$event);
// //                    $($event.originalEvent).closest('tr').remove();
//                     $(event.target).closest('tr').remove();
//                 }],
//                  ["更換模版", function () {
//                     var params = {
//                         "name": 'templatePopup',
//                         "directive": '<template-popup></template-popup>',
//                         'model': $scope.model
//                     };
//
//                     $dazzlePopup.callPopup(params).then(function(template){
//                         console.log(template);
//                         $scope.loadData();
//                         if (!angular.isUndefined($scope.model.db))
//                             $dazzleData.loadDataByModelDb($scope.model.db).then(function(record){
//                                 $scope.model.data = record;
//                                 $scope.useTemplate();
//                             });
//                     });
//                  }]
//             ];
//             $scope.beforeAtomSaved = function () {
//
//             }
//             $scope.afterAtomSaved = function () {
//
//             }
//         }
//     };
//     return dazzleTable2;
// });