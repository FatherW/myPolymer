var app = angular.module('demoApp');
app.directive('master', function ($mdDialog) {
    var master = {
        restrict: 'A',
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            $scope.initMaster = function () {
                if (angular.isUndefined($scope.model.masterId) || angular.isUndefined($scope.masterAtom[$scope.model.masterId])) {
                    $scope.model.masterId = $attrs.id;
                    $scope.masterAtom[$scope.model.masterId] = $scope.model;
                }
                $scope.model = $scope.masterAtom[$scope.model.masterId];
                $scope.setMasterMenu = function () {
                    $scope.menuOptions.push(["模版", function () {
                        $mdDialog.show({
                            templateUrl: 'models/masterPopup/popup.html' + '?id=' + new Date().getTime(),
                            controller: 'masterPopupController',
                            clickOutsideToClose: true,
                            parent: angular.element(document.body),
                            locals: {
                                rootScope: $scope,
                                model: $scope.model
                            }
                        }).then(function (master) {
                            $scope.model.masterId = master.id;
                            $scope.atom[$scope.model.id] = $scope.model;
                            $scope.compile();
                        });
                    }]);
                }
                for (var i = 0; i < $scope.menuOptions.length; i++) {
                    if ($scope.menuOptions[i][0] == '模版') {
                        return;
                    }
                    if (i + 1 == $scope.menuOptions.length) {
                        $scope.setMasterMenu();
                    }
                }
            }
            if (angular.isUndefined($scope.model)) {
                setTimeout(function () {
                    $scope.initMaster();
                }, 1000);
            } else {
                $scope.initMaster();
            }

            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
            var MutationObserverConfig = {
                childList: true,
                subtree: true,
                characterData: true
            };
            var observer = new MutationObserver(function (mutations) {
                if (!angular.isUndefined($scope.templateKey)) {
                    console.log($scope.templateUrl);
                    $scope.saveJson('dazzle-template', $scope.templateUrl, $element[0].html());
                }
                console.log($scope.templateKey);
                console.log($element.html);
            });
            observer.observe($element[0], MutationObserverConfig);
        }
    };
    return master;
});