//var AutoList= require('http://d25k6mzsu7mq5l.cloudfront.net/cdn6.4/js/app.bundle.js');
//var MediumEditor=require('http://d25k6mzsu7mq5l.cloudfront.net/cdn6.4/js/app.bundle.js');

var app = angular.module('demoApp');
// jQuery.noConflict();
// (function( $ ) {
//   $(function() {
        app.directive('dzText', function ($compile,hotkeys,$ocLazyLoad) {
            
            var dzText = {
                restrict: 'EA',
                priority: 1000,
                scope: true,
//                transclude: true,

               compile : function(elements, attributes){
                        return{
                            post : function(scope, element, attribute){
                                var isSingleClick = true;
                                var isShow = false;
                                element.bind('click', function(event) {
                                    // scope.$apply(function() {
                                        
                                    // });
//                                    event.preventDefault();
//                                    $('.medium-editor-toolbar').css('visibility','visible');
                                });
                            }
                        }
               },
                link: function (scope, element, attrs) {

//                    $ocLazyLoad.load(["//cdn.jsdelivr.net/npm/medium-editor@latest/dist/js/medium-editor.min.js","//cdn.jsdelivr.net/npm/medium-editor@latest/dist/css/medium-editor.min.css"], {cache: false});

                    console.log('Window',window);
                    scope.http = "//d25k6mzsu7mq5l.cloudfront.net/";
                    scope.directiveId = "dzImage";
                    scope.type = "dzImage";
                    scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
                    scope.templateUrl = scope.http + scope.templatePath;
                    scope.myElement = element;
                    $dazzleFn.editorCustomInit(scope,element, attrs).then(function (object) {
                               var content = element[0].outerHTML;
                                console.log('dz Image Content',content);
                                content = content.replace('dz-image','dummy');
                                var src = element.attr('src');
                                var id = element.attr('id');
                                var html = '<panel>'+$dazzleUser.dazzleInfo['toolbar']+'<div class="dz-panel-content" context-menu="menuOptions">'+content+'</div></panel>';
                                var e = $compile(html)(scope);
                                element.replaceWith(e);
                    });    
                   

                              
                }, 
                controller: function ($scope, $element, $attrs, $transclude, $mdDialog, $dazzlePopup,$dazzleInit,$dazzleS3) {



                    // $transclude(function (clone, scope) {
                    //     var element = angular.element("<div></div>").append(clone);
                    //     if ($.trim(element.html())) {
                    //         $element.html(element.html());
                    //     }
    
                    //     $compile($element.contents())($scope);
                    // })
    
       
                    var editorIndex = $element.attr('data-medium-editor-editor-index');
                    $element.attr('atom',true);
                    
                    $("#medium-editor-anchor-preview-" + editorIndex).remove();
                    $("#medium-editor-toolbar-" + editorIndex).remove();
                    //$element.attr('custom','editorTextElement');
                    $element.removeAttr('contentEditable');
                    $element.removeAttr('spellcheck');
                    $element.removeAttr('data-medium-focused');
                    $element.removeAttr('data-medium-editor-element');
                    $element.removeAttr('role');
                    $element.removeAttr('aria-multiline');
                    $element.removeAttr('medium-editor-index');
                    $element.removeAttr('data-medium-editor-editor-index');
                    $element.removeClass('medium-editor-element');
    
    
                    var currentTextSelection;
    
                    /**
                     * Gets the color of the current text selection
                     */
                    function getCurrentTextColor() {
                        return $($scope.editor.getSelectedParentElement()).css('color');
                    }
    
                    /**
                     * Custom `color picker` extension
                     */
    
    
    
    
    
                    function setColor(color) {
                        var finalColor = color ? color.toRgbString() : 'rgba(0,0,0,0)';
    
                        pickerExtension.base.importSelection(currentTextSelection);
                        pickerExtension.document.execCommand("styleWithCSS", false, true);
                        pickerExtension.document.execCommand("foreColor", false, finalColor);
                    }
    
                    function initPicker(element) {
                        $(element).spectrum({
                            allowEmpty: true,
                            color: "#f00",
                            showInput: true,
                            showAlpha: true,
                            showPalette: true,
                            showInitial: true,
                            hideAfterPaletteSelect: true,
                            preferredFormat: "hex3",
                            change: function (color) {
                                setColor(color);
                            },
                            hide: function (color) {
                                setColor(color);
                            },
                            palette: [
                                ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
                                ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
                                ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
                                ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
                                ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
                                ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
                                ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
                                ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
                            ]
                        });
                    }
    
                    var fontButton = MediumEditor.Extension.extend({
                        name: 'fontButton',
                        init: function () {
                            this.button = this.document.createElement('button');
                            this.button.classList.add('medium-editor-action');
                            this.button.innerHTML = '<i class="fa fa-font"></i>';
                            this.on(this.button, 'click', this.handleClick.bind(this));
                        },
                        getButton: function () {
                            return this.button;
                        },
                        handleClick: function (event) {
                            currentTextSelection = $scope.editor.exportSelection();
    
                           $scope.editor.saveSelection();
                            var params = {
                                directive: '<font-popup></font-popup>'
                            };
                            $dazzlePopup.callPopup(params).then(function(result) {
                                $scope.editor.restoreSelection();
                                var classDiv = '<div class="'+result.label+'"></div>';
                                var str = '<div class="hello">abcdefsd</div>';
                                var html = $(classDiv);
                                html.append(getSelectionHtml());
                                console.log(html[0].outerHTML);
                                 $scope.editor.events.base.pasteHTML(str);
                                 $dazzlePopup.toast('字款更新');
                            });
    
    
    
                        }
                    });
    
    
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
                            var oldlink = $($scope.editor.getSelectedParentElement()).attr('href') || "";
                            var params = {
                                name: 'dzLinkPopup',
                                directive: '<dz-link-popup></dz-link-popup>',
                                oldLink: oldlink
                            }
                            
                            $dazzlePopup.callPopup(params).then(function(result){
//                            $dazzlePopup.linkPopup($element, oldlink).then(function (result) {
                                $scope.editor.restoreSelection();
                                switch (result.type) {
                                    case "cancelLink":
                                        var html = $('<div></div>');
                                        html.append(getSelectionHtml());
                                        html.find('a').contents().unwrap();
                                        $scope.editor.events.base.pasteHTML(html.html());
                                        break;
                                    case "setLink":
                                        if (result.link == '#') {
    //                                        $($scope.editor.getSelectedParentElement()).find("a").contents().unwrap();
                                            //$($scope.editor.getSelectedParentElement()).find("a").contents().unwrap();
                                            // var range = $scope.editor.getSelectionRange();
                                            var html = $('<div></div>');
                                            html.append(getSelectionHtml());
                                            html.find('a').contents().unwrap();
                                            $scope.editor.events.base.pasteHTML(html.html());
                                            //$compile($element)($scope);
                                            
                                            //angular.element(document.getElementById('editor-header')).scope().saveAtom();
    
    //                                        console.log(html.html());
                                        } else {
                                            $scope.editor.events.base.execAction('createLink', {"value": result.link});
                                        }
                                        break;
                                    case "saveLink":
                                        $scope.editor.events.base.execAction('createLink', {"value": result.link});
                                        setTimeout(function () {
                                            $($scope.editor.getSelectedParentElement()).closest("a").removeAttr("href");
                                            $($scope.editor.getSelectedParentElement()).closest("a").attr('id', result.link);
                                        }, 200);
                                        if (angular.isUndefined($scope.thisPageJson.anchor)) {
                                            $scope.thisPageJson.anchor = [];
                                        }
                                        $scope.thisPageJson.anchor.push(result.link);
                                        $dazzleUser.setDazzleInfo('thisPageJson',thisPageJson);
                                        break;
                                }
                            });
                        }
                    });
    
                    var elementButton = MediumEditor.Extension.extend({
                        name: 'elementButton',
                        init: function () {
                            this.button = this.document.createElement('button');
                            this.button.classList.add('medium-editor-action');
                            this.button.innerHTML = '<i class="fa fa-search"></i>';
                            this.on(this.button, 'click', this.handleClick.bind(this));
                        },
                        getButton: function () {
                            return this.button;
                        },
                        handleClick: function (event) {
                            $scope.editor.saveSelection();
                            var params = {
                              name: 'dzAddElementPopup',
                              directive: '<dz-add-element-popup></dz-add-element-popup>'
                            };
                            $dazzlePopup.callPopup(params).then(function(result){
                                $scope.editor.restoreSelection();
                                var str = result.code;
                                $scope.editor.events.base.pasteHTML(str);
                                $compile($element.contents())($scope);
                                $dazzlePopup.toast('元素生成成功');                            
                            });
    
                            // $dazzlePopup.addElement($scope).then(function (result) {
                            //     $scope.editor.restoreSelection();
                            //     var str = result.code;
                            //     $scope.editor.events.base.pasteHTML(str);
                            //     $compile($element.contents())($scope);
                                
                            //     $dazzlePopup.toast('元素生成成功');
    
                            // });
    
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
                            var html = "<img dz-image src='http://dazzle.website/image/lgo.png' context-menu='menuOptions'/>";
                            $scope.editor.events.base.pasteHTML(html);
                              setTimeout(function () {
                                $scope.$apply(function () {
                                    $compile($element.contents())($scope);
                                });
                            }, 1000);
                            $dazzlePopup.toast('元素生成成功');
    
    
                        }
                    });
                    var FieldButton = MediumEditor.Extension.extend({
                        name: 'fieldButton',
                        init: function () {
                            this.button = this.document.createElement('button');
                            this.button.classList.add('medium-editor-action');
                            this.button.innerHTML = '<i class="fa fa-database"></i>';
                            this.on(this.button, 'click', this.handleClick.bind(this));
                        },
                        getButton: function () {
                            return this.button;
                        },
                        handleClick: function (event) {
                            var html;
                             var params = {
                                  name: 'referFieldPopup',
                                  directive: '<refer-field-popup></refer-field-popup>',
                                  table: 'activity'    
                                };
                                $dazzlePopup.callPopup(params).then(function(result){
                                    
                                   $scope.editor.restoreSelection();
                                    var html = "[[model['"+result+"']]]";
                                    console.log('DZ TEXT',html);
                                  //  $scope.editor.events.base.pasteHTML(html);
                                    // $compile($element.contents())($scope);
                                     
                                    $scope.editor.events.base.pasteHTML(html);
                                      setTimeout(function () {
                                        $scope.$apply(function () {
                                            $compile($element.contents())($scope);
                                        });
                                    }, 1000);
                                    $dazzlePopup.toast('元素生成成功');
                                     
                                     
                                });
                            
                            
                            // var html = "<img dz-image src='http://dazzle.website/image/lgo.png' context-menu='menuOptions'/>";
                            // $scope.editor.events.base.pasteHTML(html);
                            //   setTimeout(function () {
                            //     $scope.$apply(function () {
                            //         $compile($element.contents())($scope);
                            //     });
                            // }, 1000);
                            // $dazzlePopup.toast('元素生成成功');
    
    
                        }
                    });
                    $scope.editor = new MediumEditor($element, {
                        autoLink: false,
                        buttonLabels: 'fontawesome',
                        placeholder: false,
                        imageDragging: false,
                        anchorPreview: false,
                        placeholder: {
                            /* This example includes the default options for placeholder,
                               if nothing is passed this is what it used */
                            text: 'Type your text. 輸入文字',
                            hideOnClick: true
                        },
                        paste: {
                            forcePlainText: false,
                            cleanPastedHtml: false
                        },
                        toolbar: {
                            buttons: ['elementButton', 'anchorButton', 'imageElementButton','fieldButton', 'fontButton', 'fontsize', 'bold', 'italic', 'underline', 'orderedList', 'unorderList', 'justifyLeft', 'justifyRight', 'justifyCenter', 'justifyFull', 'removeFormat', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'],
                        },
                        extensions: {
                            'elementButton': new elementButton(),
                            'imageElementButton': new ImageElementButton(),
                            'anchorButton': new AnchorButton(),
                            'fieldButton': new FieldButton(),
                            'fontButton': new fontButton()
                        },
                         keyboardCommands: {
                                /* This example includes the default options for keyboardCommands,
                                   if nothing is passed this is what it used */
                                commands: [
                                    {
                                        command: 'bold',
                                        key: 'B',
                                        meta: true,
                                        shift: false,
                                        alt: false
                                    },
                                    {
                                        command: 'italic',
                                        key: 'I',
                                        meta: true,
                                        shift: false,
                                        alt: false
                                    },
                                    
                                    {
                                        command: 'fieldButton',
                                        key: 'F',
                                        meta: true,
                                        shift: false,
                                        alt: false
                                    },
                                    {
                                        command: 'anchorButton',
                                        key: 'A',
                                        meta: true,
                                        shift: false,
                                        alt: false
                                    },
                                    {
                                    command: 'imageElementButton',
                                        key: 'I',
                                        meta: true,
                                        shift: true,
                                        alt: false
                                    },

                                    {
                                        command: 'underline',
                                        key: 'U',
                                        meta: true,
                                        shift: false,
                                        alt: false
                                    }
                                ],
                            }
                    });
    
                    // $scope.beforeAtomSaved = function () {
                    //     if ($element.attr('field') &&
                    //         $scope.thisPageJson &&
                    //         $scope.thisPageJson.exportDatas &&
                    //         $scope.thisPageJson.exportDatas[$element.attr('field')]) {
                    //         var field = $element.attr('field');
                    //         var dataIsText = $element.attr('dataIsText');
    
                    //         // For some browsers, `attr` is undefined; for others,
                    //         // `attr` is false.  Check for both.
                    //         if (typeof dataIsText !== typeof undefined && dataIsText !== false) {
                    //             $scope.thisPageJson.exportDatas[field] = $element.text();
                    //         } else{
                    //             $scope.thisPageJson.exportDatas[field] = $element.html();
                    //         }
    
                    //     }
    
                    //     if ($element.attr('id')) {
                    //         var id = $element.attr('id');
                    //         console.log('ID',id);
    
                    //         $scope.atom[id] = {
                    //             "id":  id,
                    //             "type": "editorTextElement",
                    //             "html": $element.html()
                    //         };
                    //     }
                    // }
    
                }
            };
            return dzText;
        });
    // More code using $ as alias to jQuery
//  });
// })(jQuery);
 
function getSelectionHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
}

