var app = angular.module('demoApp');
app.directive('custom', function ($compile) {
    var custom = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            setTimeout(function () {
                if (!angular.isUndefined(scope.model) && !angular.isUndefined(scope.model.masterId)) {
                    $(element).append('<i id="masterIcon" class="fa fa-maxcdn"></i>');
                }
            }, 3000);
        }
    };
    return custom;
});