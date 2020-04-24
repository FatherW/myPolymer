var app = angular.module('demoApp');
app.directive('text', function () {
    var text = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            $element.removeAttr('contenteditable');
            $element.removeAttr('spellcheck');
            $element.removeAttr('spellcheck');
            $element.removeAttr('medium-editor-index');
            $element.removeAttr('data-medium-editor-editor-index');
            $element.removeAttr('data-medium-editor-element');
            console.log($element[0].outerHTML);
            setTimeout(function () {
                var editor = new MediumEditor($element[0], {
                    autoLink: true,
                    buttonLabels: 'fontawesome',
                    placeholder: false,
                    toolbar: {
                        buttons: ['fontsize', 'bold', 'italic', 'underline', 'orderedList', 'unorderList', 'justifyLeft', 'justifyRight', 'justifyCenter', 'justifyFull', 'removeFormat', 'h2', 'h4', 'h6'],
                    }
                }).subscribe('editableInput', function (event, element) {
                    console.log($element.html());
                });
            }, 2000);
        }
    };
    return text;
});

/*<h1 class="ng-scope" text="">hi1</h1>
 <h2 class="ng-scope" text="">hi2</h2>
 <h3 class="ng-scope" text="">hi3</h3>*/