var app = angular.module('demoApp');
app.directive('text', function ($compile) {
    var text = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "editorTextDirective";
            scope.type = "editorTextDirective";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $http, $element, $attrs) {

            $scope.afterAtomSaved = function () {
                if (!angular.isUndefined($scope.model) && angular.isUndefined($scope.model.html)) {
                    if ($element.find("[bind-html-compile]").length > 0) {
                        $scope.model.html = $element.find("[bind-html-compile]").html();
                    } else {
                        console.log('model updated');
                        $scope.model.html = $element.html();
                    }
                }
            }

            var editorIndex = $element.attr('data-medium-editor-editor-index');
            $("#medium-editor-anchor-preview-" + editorIndex).remove();
            $("#medium-editor-toolbar-" + editorIndex).remove();

            $element.removeAttr('contentEditable');
            $element.removeAttr('spellcheck');
            $element.removeAttr('data-medium-focused');
            $element.removeAttr('data-medium-editor-element');
            $element.removeAttr('role');
            $element.removeAttr('aria-multiline');
            $element.removeAttr('medium-editor-index');
            $element.removeAttr('data-medium-editor-editor-index');
            $element.removeClass('medium-editor-element');


            setTimeout(function () {
                var AnchorButton = MediumEditor.Extension.extend({
                    name: 'anchorButton',
                    init: function () {
                        this.button = this.document.createElement('button');
                        this.button.classList.add('medium-editor-action');
                        this.button.innerHTML = '<i class="fa fa-anchor"></i>';
                        this.on(this.button, 'click', this.handleClick.bind(this));
                    },
                    getButton: function () {
                        return this.button;
                    },
                    handleClick: function (event) {
                        $scope.editor.saveSelection();
                        $scope.linkPopup($element).then(function (result) {
                            $scope.editor.restoreSelection();
                            switch (result.type) {
                                case "setLink":
                                    $scope.editor.events.base.execAction('createLink', {"value": result.link});
                                    break;
                                case "saveLink":
                                    if (angular.isUndefined($scope.thisPageJson.anchor)) {
                                        $scope.thisPageJson.anchor = [];
                                    }
                                    $scope.thisPageJson.anchor.push(result.link);
                                    break;
                            }
                        });
                    }
                });

                var ImageElementButton = MediumEditor.Extension.extend({
                    name: 'imageElementButton',
                    init: function () {
                        this.button = this.document.createElement('button');
                        this.button.classList.add('medium-editor-action');
                        this.button.innerHTML = '<i class="fa fa-picture-o"></i>';
                        this.on(this.button, 'click', this.handleClick.bind(this));
                    },
                    getButton: function () {
                        return this.button;
                    },
                    handleClick: function (event) {
                        $scope.editor.events.base.pasteHTML('<editor-image-element></editor-image-element>');
                        if ($element.children("[bind-html-compile]").length > 0) {
                            if ($.trim($element.children("[bind-html-compile]").html())) {
                                $scope.$apply(function () {
                                    $scope.model.html = $element.children("[bind-html-compile]").html();
                                });
                            }
                        }
                    }
                });

                $scope.editor = new MediumEditor($element, {
                    autoLink: true,
                    buttonLabels: 'fontawesome',
                    placeholder: false,
                    imageDragging: false,
                    anchorPreview: {
                        hideDelay: 500
                    },
                    paste: {
                        forcePlainText: false,
                        cleanPastedHtml: false
                    },
                    toolbar: {
                        buttons: ['anchorButton', 'imageElementButton', 'fontsize', 'bold', 'italic', 'underline', 'orderedList', 'unorderList', 'justifyLeft', 'justifyRight', 'justifyCenter', 'justifyFull', 'removeFormat', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                    },
                    extensions: {
                        'imageElementButton': new ImageElementButton(),
                        'anchorButton': new AnchorButton()
                    }
                });

            }, 2000);
        }
    };
    return text;
});