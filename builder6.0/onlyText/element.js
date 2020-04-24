var app = angular.module('demoApp');

    app.directive('onlyText', function ($compile) {
        var text = {
            restrict: 'EA',
            priority: 1000,
            scope: true,
            transclude: true,
            controller: function ($scope, $element, $attrs, $transclude, $mdDialog, $dazzlePopup) {

/*                $transclude(function (clone, scope) {
                    var element = angular.element("<div contenteditable=true>Please Type Some Text</div>").append(clone);
                    scope.model.text = scope.thisPageJson.exportDatas[$element.attr('field')];
                    if ($.trim(element.html())) {
                        $element.html(element.html());
                    }

                });
 */
                    $element.attr('contenteditable','true');
                   if ($element.attr('field') &&
                        $scope.thisPageJson &&
                        $scope.thisPageJson.exportDatas &&
                        $scope.thisPageJson.exportDatas[$element.attr('field')]) {
                            $element.text($scope.thisPageJson.exportDatas[$element.attr('field')]);
                    } else {
                        $element.text('未有對應的資料');
                            
                    }
                    
                    

                    $compile($element.contents())($scope);
 


                $scope.beforeAtomSaved = function () {
                    if ($element.attr('field') &&
                        $scope.thisPageJson &&
                        $scope.thisPageJson.exportDatas &&
                        $scope.thisPageJson.exportDatas[$element.attr('field')]) {
                        var field = $element.attr('field');

                        $scope.thisPageJson.exportDatas[field] = $element.text();

                    }

                    console.log('Before Save',$scope.thisPageJson);
                    if ($element.attr('id')) {
                        var id = $element.attr('id');
                        console.log('ID',id);

                        $scope.atom[id] = {
                            "id":  id,
                            "type": "onlyText",
                            "text": $element.text()
                        };
                    }
                }

            }
        };
        return text;
    });

