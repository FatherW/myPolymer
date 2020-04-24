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
            var observeDOM = (function () {
                var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
                    eventListenerSupported = window.addEventListener;
                return function (obj, callback) {
                    if (MutationObserver) {
                        var obs = new MutationObserver(function (mutations, observer) {
                            if (mutations[0].addedNodes.length || mutations[0].removedNodes.length)
                                callback();
                        });
                        obs.observe(obj, {childList: true, subtree: true});
                    }
                    else if (eventListenerSupported) {
                        obj.addEventListener('DOMNodeInserted', callback, false);
                        obj.addEventListener('DOMNodeRemoved', callback, false);
                    }
                };
            })();
            observeDOM(document.getElementById($element[0]), function () {
                console.log('dom changed');
            });
        }
    };
    return master;
});