var app = angular.module('demoApp');
app.directive('master', function ($mdDialog) {
    var master = {
        restrict: 'A',
        require: '?ngModel',
        scope: true,
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) return; // do nothing if no ng-model

            // Specify how UI should be updated
            ngModel.$render = function () {
                element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
            };

            // Listen for change events to enable binding
            element.on('blur keyup change', function () {
                scope.$evalAsync(read);
            });
            read(); // initialize

            // Write data to the model
            function read() {
                var html = element.html();
                // When we clear the content editable the browser leaves a <br> behind
                // If strip-br attribute is provided then we strip this out
                if (attrs.stripBr && html == '<br>') {
                    html = '';
                }
                ngModel.$setViewValue(html);
            }
        }
        controller: function ($scope, $http, $element, $attrs) {
            $scope.initMaster = function () {
                console.log($element.html());
                if (angular.isUndefined($scope.model.masterId) || angular.isUndefined($scope.masterAtom[$scope.model.masterId])) {
                    $scope.model.masterId = $attrs.id;
                    $scope.masterAtom[$scope.model.masterId] = $scope.model;
                }
                $scope.model = $scope.masterAtom[$scope.model.masterId];

                //console.log($scope.masterAtom[$scope.model.masterId].html);
                //console.log($scope.model.html);

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
        }
    };
    return master;
});