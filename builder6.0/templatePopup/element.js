var app = angular.module('demoApp');
var name = 'templatePopup';
app.directive(name, function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleUser,$dazzleS3,$dazzlePopup) {
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/templatePopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "//d27btag9kamoke.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element,$mdDialog, $templateRequest, $mdSidenav,$http,$dazzleS3,$compile,$dazzleUser,$dazzleInit,$dazzleData) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');
                var userBucket = $dazzleUser.getDazzleInfo('userBucket');
                var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                
                    $scope.exportBucket = $dazzleUser.getDazzleInfo('exportBucket');
                    $scope.model = params.model;
                    console.log({
                            "method": "post",
                            "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/getdirective",
                            "data": {
                                "uid": $dazzleUser.getUser().uid,
                                "type": "getTemplateByType",
                                "directiveType": $scope.model.type
                            }});
                    $scope.init = function () {
                        $http({
                            "method": "post",
                            "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/getdirective",
                            "data": {
                                "uid": $dazzleUser.getUser().uid,
                                "type": "getTemplateByType",
                                "directiveType": $scope.model.type
                            }
                        }).then(function (result) {
                            if (result.data.code > 0) {
                                $scope.templates = result.data.data;
                                if (!angular.isUndefined($scope.model) &&
                                    !angular.isUndefined($scope.model.template) &&
                                    $scope.model.template !== null) {
                                    for (var i = 0; i < $scope.templates.length; i++) {
                                        if ($scope.model.template.id == $scope.templates[i].id) {
                                            $scope.selectedIndex = i;
                                            return;
                                        }
                                    }
                                }
                            } else {
                                $scope.templates = [];
                            }
                        });
                    };
                
                    $scope.openRight = function () {
                        $mdSidenav("rightAddTemplate").toggle();
                    };
                
                    $scope.closePopup = function (template) {
//                        $dazzleUser.setDazzleInfo('model',$scope.model);
                        if (template) {
                            $scope.getTemplateCode(template, "html").then(function (code) {
                                template.htmlCode = code;
                
                                $scope.getTemplateCode(template, "css").then(function (code) {
                                    $dazzleS3.saveFile($scope.exportBucket, 'css/' + template.type + '-' + template.id + '.css', code).then(function () {
                                        template.cssCode = "http://" + $scope.exportBucket + '/css/' + template.type + '-' + template.id + '.css';
                
                                        $scope.getTemplateCode(template, "js").then(function (code) {
                                            $dazzleS3.saveFile($scope.exportBucket, 'js/' + template.type + '-' + template.id + '.js', code).then(function () {
                                                template.jsCode = "http://" + $scope.exportBucket + '/js/' + template.type + '-' + template.id + '.js';
                
                                                $scope.model.template = JSON.parse(angular.toJson(template));
                                                $mdDialog.hide(template);
                
                                            });
                                        });
                                    });
                                });
                            });
                        } else {
                            $mdDialog.cancel();
                        }
                    };
                
                    $scope.getTemplateCode = function (template, type) {
                        return new Promise(function (resolve, reject) {
                            AWS.config.region = 'ap-southeast-1';
                            $dazzleS3.getFile('dazzle-template', 'builder6.0/template/' + template.type + '/' + template.id + '.' + type).then(function (code) {
                                AWS.config.region = 'ap-northeast-1';
                                resolve(code);
                            }, function () {
                                AWS.config.region = 'ap-northeast-1';
                                resolve("");
                            });
                        });
                    }
                
                    $scope.copyUrl = function (url, parent) {
                        function copyTextToClipboard(text) {
                            var textArea = document.createElement("textarea");
                            textArea.style.position = 'fixed';
                            textArea.style.top = 0;
                            textArea.style.left = 0;
                            textArea.style.width = '2em';
                            textArea.style.height = '2em';
                            textArea.style.padding = 0;
                            textArea.style.border = 'none';
                            textArea.style.outline = 'none';
                            textArea.style.boxShadow = 'none';
                            textArea.style.background = 'transparent';
                            textArea.value = text;
                            document.body.appendChild(textArea);
                            textArea.select();
                            var successful = document.execCommand('copy');
                            document.body.removeChild(textArea);
                        }
                
                        copyTextToClipboard(url);
                        $mdToast.show(
                            $mdToast.simple()
                                .position('top right')
                                .textContent('複制成功')
                                .hideDelay(1500)
                        );
                    };
                
                    $scope.saveTemplate = function (template) {
                        console.log('Template',template);
                        $http({
                            "method": "post",
                            "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/getdirective",
                            "data": {
                                "type": "updateTemplate",
                                "template": template
                            }
                        }).then(function () {
                            for (var i = 0; i < $scope.templates.length; i++) {
                                if (template.id == $scope.templates[i].id) {
                                    $scope.selectedIndex = i;
                                    return;
                                }
                            }
                
                            $mdToast.show(
                                $mdToast.simple()
                                    .position('top right')
                                    .textContent(template.name + ' 儲存成功 ')
                                    .hideDelay(1500)
                            );
                        });
                    };
                
                    $scope.edit = function (template, type) {
                        $scope.getTemplateCode(template, type,'dazzle-template','builder6.0/template/' + template.type + '/' + template.id + '.' + type).then(function (htmlCode) {
                            $dazzlePopup.code(htmlCode, type).then(function (newHtmlCode) {
                                AWS.config.region = 'ap-southeast-1';
                                $dazzleS3.saveFile('dazzle-template', 'builder6.0/template/' + template.type + '/' + template.id + '.' + type, newHtmlCode);
                                AWS.config.region = 'ap-northeast-1';
                            });
                        });
                    }
                
                    $scope.removeTemplate = function (template) {
                        if (confirm("是否要移除此Template?") == true) {
                            $http({
                                "method": "post",
                                "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/getdirective",
                                "data": {
                                    "type": "removeTemplateById",
                                    "id": template.id
                                }
                            }).then(function (result) {
                                if ($scope.selectedIndex > -1) {
                                    $scope.templates.splice($scope.selectedIndex, 1);
                                    $mdToast.show(
                                        $mdToast.simple()
                                            .position('top right')
                                            .textContent(template.name + ' 移除成功 ')
                                            .hideDelay(1500)
                                    );
                                }
                            });
                        }
                    }
                
                    $scope.isMine = function (template) {
                        if (template.owner == $dazzleUser.getUser().uid) {
                            return true;
                        } else {
                            return false;
                        }
                    }



        }
    };
    return link;
});
app.controller('rightAddTemplateCtrl', function ($scope, $http, $mdSidenav, $mdToast, $dazzleS3,$dazzlePopup,$dazzleFn,$dazzleUser) {
    $scope.add = function () {
        if ($scope.name) {
            $http({
                "method": "post",
                "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/getdirective",
                "data": {
                    "type": "getTemplateById",
                    "id": $scope.name
                }
            }).then(function (result) {
                if (result.data.code > 0) {
                    $scope.exist();
                } else {
                    AWS.config.region = 'ap-southeast-1';
                    $dazzleS3.checkFile('dazzle-template', 'builder6.0/template/' + $scope.model.type + '/' + $scope.name + '.html').then(function (result) {
                        AWS.config.region = 'ap-northeast-1';
                        if (result) {
                            $scope.exist();
                        } else {
                            $scope.create();
                        }
                    });
                }
            });
        }
    };
    $scope.exist = function () {
        $mdToast.show(
            $mdToast.simple()
                .position('top right')
                .textContent('Template已存在')
                .hideDelay(1500)
        );
    }
    $scope.create = function () {
        $mdSidenav('rightAddTemplate').close().then(function () {
            var newTemplate = {
                "owner": $dazzleUser.getUser().uid,
                "website": $dazzleUser.getDazzleInfo('websiteId'),
                "type": $scope.model.type,
                "version": "6.0",
                "tags": [],
                "html": "https://s3-ap-southeast-1.amazonaws.com/dazzle-template/builder6.0/template/" + $scope.model.type + '/' + $scope.name + '.html',
                "css": "https://s3-ap-southeast-1.amazonaws.com/dazzle-template/builder6.0/template/" + $scope.model.type + '/' + $scope.name + '.css',
                "js": "https://s3-ap-southeast-1.amazonaws.com/dazzle-template/builder6.0/template/" + $scope.model.type + '/' + $scope.name + '.js',
                "name": $scope.name,
                "id": $scope.name
            };

            AWS.config.region = 'ap-southeast-1';
            $dazzleS3.saveFile('dazzle-template', 'builder6.0/template/' + $scope.model.type + '/' + $scope.name + '.html', "<div>" + $scope.name + "</div>");
            $dazzleS3.saveFile('dazzle-template', 'builder6.0/template/' + $scope.model.type + '/' + $scope.name + '.css', "");
            $dazzleS3.saveFile('dazzle-template', 'builder6.0/template/' + $scope.model.type + '/' + $scope.name + '.js', "");
            AWS.config.region = 'ap-northeast-1';
            $scope.saveTemplate(newTemplate);
            $scope.templates.push(newTemplate);
            $scope.name = null;
        });
    }
});
    function directiveConvert(name){
        // var strArr = name.split('');
        // var dummyArr = strArr;
        // var directive;
        // console.log(strArr.length);
        // for (e = 0; e< strArr.length; e++) {
        //     if (strArr[e] == strArr[e].toUpperCase())
        //         dummyArr.splice(e,0,"-");
        // }
        // directive = dummyArr.join("");

        // directive = directive.toLowerCase();
        // console.log('Hello');
        // return directive;
              var re = /[A-Z]/g;      
        return name.replace(re, function(match, index, original){

            return "-" + match.toLowerCase()
        });
    }

