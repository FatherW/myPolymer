var app = angular.module('demoApp');
app.directive('text', function () {
    var text = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            $scope.initEditor = function () {
                var editor = new MediumEditor($element[0], {
                    autoLink: true,
                    buttonLabels: 'fontawesome',
                    placeholder: false,
                    toolbar: {
                        buttons: ['fontsize', 'bold', 'italic', 'underline', 'orderedList', 'unorderList', 'justifyLeft', 'justifyRight', 'justifyCenter', 'justifyFull', 'removeFormat', 'h2', 'h4', 'h6'],
                    }
                }).subscribe('editableInput', function (event, element) {
                    console.log('test changed');
                });
            }
            setTimeout(function () {
                console.log($element.html());
                $scope.initEditor();
            }, 1000);
        }
    };
    return text;
});