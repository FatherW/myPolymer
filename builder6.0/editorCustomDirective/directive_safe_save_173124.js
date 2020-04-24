var app = angular.module('demoApp');
app.directive('custom', function ($mdDialog) {
    var custom = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        link: function (scope, element, attr) {
            var options = element.children();
            $(element).on('mouseover', 'option', function(){
                console.log('mouseover');
            });
            $(element).on('mouseleave', 'option', function(){
                console.log('mouseleave');
            });
        }
    };
    return custom;
});