var app = angular.module('demoApp');
app.directive('text', function ($compile) {
    var text = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.id = element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys(scope.atom).length;
            scope.type = "editorTextDirective";
            element.attr('id', scope.id);
            element.attr('custom', scope.type);
            if (angular.isUndefined(scope.atom[scope.id])) {
                console.log('new text');
                scope.atom[scope.id] = {
                    "id": scope.id,
                    "type": scope.type,
                    "html": "<div>請給我填上一些東西吧。</div>"
                };
                if ($.trim(element.html())) {
                    console.log(element.html());
                    if (element.children("[bind-html-compile]").length > 0) {
                        console.log(element.children("[bind-html-compile]").html());
                        scope.atom[scope.id].html = element.children("[bind-html-compile]").html();
                    }
                    element.find("[bind-html-compile]").removeAttr('bind-html-compile');
                }
            }
            scope.model = scope.atom[scope.id];
            var template = angular.element('<div bind-html-compile="model.html"></div>');
            element.html(template);
            $compile(template)(scope);
        },
        controller: function ($scope, $http, $element, $attrs) {
            $scope.afterAtomSaved = function () {
                if (!angular.isUndefined($scope.model) && angular.isUndefined($scope.model.html)) {
                    $scope.model.html = $element.html();
                }
            }
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
                        editor.saveSelection();
                        $scope.linkPopup($element).then(function (result) {
                            editor.restoreSelection();
                            switch (result.type) {
                                case "setLink":
                                    editor.events.base.execAction('createLink', {"value": result.link});
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
                        editor.events.base.pasteHTML('<editor-image-element></editor-image-element>');
                        $compile($element)($scope);
                        this.base.checkContentChanged();
                    }
                });

                var editor = new MediumEditor($element[0], {
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