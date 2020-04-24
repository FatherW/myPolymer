var app = angular.module('demoApp');
app.controller('newsletterPopupController', function ($scope, $uibModalInstance) {
    $scope.info = {
        "from": "",
        "to": "",
        "subject": ""
    };
    $scope.ok = function () {
        $uibModalInstance.close($scope.info);
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    }
});

app.directive('dazzleNewsletter', function ($compile, $templateRequest, $mdDialog, $timeout, $http, $uibModal) {
    var dazzleNewsletter = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dazzleNewsletter";
            scope.type = "dazzleNewsletter";
            scope.templateDir = scope.http + "builder6.0/" + scope.directiveId + "/";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {

                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["會員管理", function () {
                    $mdDialog.show({
                        controller: "dataPopupController",
                        templateUrl: 'models/dataPopup/popup.html' + '?id=' + new Date().getTime(),
                        clickOutsideToClose: false,
                        locals: {
                            rootScope: $scope,
                            table: "member2"
                        }
                    }).then(function () {
                        console.log('closed');
                    });
                }],
                ["電子報管理", function () {
                    $mdDialog.show({
                        controller: "dataPopupController",
                        templateUrl: 'models/dataPopup/popup.html' + '?id=' + new Date().getTime(),
                        clickOutsideToClose: false,
                        locals: {
                            rootScope: $scope,
                            table: "newsletter"
                        }
                    }).then(function () {
                        console.log('closed');
                    });
                }],
                ["發送電子報", function () {
                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: $scope.templateDir + 'newsletterSetting.html?id=' + new Date().getTime(),
                        locals: {
                            rootScope: $scope,

                        },
                        clickOutsideToClose: true
                    }).then(function (answer) {
                        console.log(answer);
                        var to = [];
                        var html = $element.html();

                        if (answer.test) {
                            to.push(answer.receiver);
                            $http({
                                url: 'https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail',
                                method: "POST",
                                data: {
                                    "from": answer.sender,
                                    "to": to,
                                    "subject": answer.title,
                                    "html": html
                                }
                            }).then(function (result) {
                                alert('電郵已發. 接收時間有長有短，請耐心等候.');
                            });
                        }
                        else {
                            $scope.getJson($scope.userBucket, $scope.websiteKey + 'content/member-data.json').then(function (data) {
                                angular.forEach(data, function (item, index) {
                                    to.push(item['email']);
                                    console.log(item);
                                });
                                to.push(answer.receiver);
                                $http({
                                    url: 'https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail',
                                    method: "POST",
                                    data: {
                                        "from": answer.sender,
                                        "to": to,
                                        "subject": answer.title,
                                        "html": html
                                    }
                                }).then(function (result) {
                                    alert('電郵已發. 大概需要半日至一日時間，請耐心等候。 ');
                                });
                            });

                        }

                    }, function () {

                    });
                }],
                ["更換模版", function () {
                    $mdDialog.show({
                        controller: 'templatePopupController',
                        templateUrl: 'models/templatePopup/popup.html' + "?id=" + new Date().getTime(),
                        locals: {
                            rootScope: $scope
                        }
                    }).then(function (template) {
                        $scope.useTemplate();
                    });
                }]
            ];
        }
    };
    return dazzleNewsletter;
});

function DialogController($scope, $mdDialog, rootScope) {

    $scope.model = rootScope.model;

    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.test = function () {
        $scope.model.test = true;
        $mdDialog.hide($scope.model);
    };
    $scope.send = function () {
        $scope.model.test = false;
        $mdDialog.hide($scope.model);
    };
}
