 var dazzle = angular.module("dazzle");
 
        dazzle.service("$dazzlePopup", function ($mdDialog, $mdBottomSheet, $mdToast, $ocLazyLoad, $dazzleUser) {
    var that = this;


            this.login = function () {
                return new Promise(function (resolve, reject) {
                    var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/loginPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/loginPopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: loginPopupController,
                            clickOutsideToClose: false,
                            escapeToClose: false,
                            multiple: true
                        }).then(function (user) {
                            resolve(user);
                        }, function () {
                            reject();
                        });
                    });
                });
            }
            this.toast = function (text) {
                $mdToast.show(
                    $mdToast.simple()
                        .position('top right')
                        .textContent(text)
                        .hideDelay(1500)
                );
            }
            this.alert = function (title, text) {
                return new Promise(function (resolve, reject) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .escapeToClose(false)
                            .clickOutsideToClose(false)
                            .title(title)
                            .textContent(text)
                            .ok('OK')
                    ).then(function () {
                        resolve();
                    });
                });
            };
            
            
            this.loading = function () {
                var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/loadingPopup/popup.html" + "?id=" + new Date().getTime();
                var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/loadingPopup/popup.js" + "?id=" + new Date().getTime();
                $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                    $mdDialog.show({
                        templateUrl: templateUrl,
                        controller: loadingPopupController,
                        clickOutsideToClose: false,
                        fullscreen: false
                    });
                });
            }


            this.question = function (title, text, yText, nText) {
                return new Promise(function (resolve, reject) {
                    var confirm = $mdDialog.confirm()
                        .title(title)
                        .textContent(text)
                        .ariaLabel('question')
                        .multiple(true)
                        .ok(yText)
                        .cancel(nText);

                    $mdDialog.show(confirm).then(function () {
                        resolve();
                    }, function () {
                        reject();
                    });
                });
            }
           
            this.callBottomSheet = function (params) {
                return new Promise(function (resolve, reject) {
                    $dazzleUser.setDazzleInfo('params', params);
                    var jss = [];
                    if (!angular.isUndefined(params.name) && params.name){
                        var directiveUrl = "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/"+params.name+"/element.js" + "?id=" + new Date().getTime();
                        jss.push(directiveUrl);
                    }

                    var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/modelPopup/popupModel.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/modelPopup/popup.js" + "?id=" + new Date().getTime();
                    jss.push(controllerUrl);

                    $ocLazyLoad.load(jss, {cache: false}).then(function () {
                        $mdBottomSheet.show({
                            templateUrl: templateUrl,
                            controller: modelPopupController,
                            clickOutsideToClose: true,
                            escapeToClose: true,
                            multiple: true
                        }).then(function (output) {
                            resolve(output);
                        }, function () {
                            reject();
                        });
                    });
                });
            }
            this.callPopup = function (params) {
                return new Promise(function (resolve, reject) {
                    $dazzleUser.setDazzleInfo('params', params);
                    var jss = [];
                    if (!angular.isUndefined(params.name) && params.name){
                        var directiveUrl = "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/"+params.name+"/element.js" + "?id=" + new Date().getTime();
                        jss.push(directiveUrl);
                    }

                    var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/modelPopup/dzPopupModel.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/modelPopup/dzPopup.js" + "?id=" + new Date().getTime();
                    jss.push(controllerUrl);

                    $ocLazyLoad.load(jss, {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: modelPopupController,
                            clickOutsideToClose: true,
                            escapeToClose: true,
                            multiple: true
                        }).then(function (output) {
                            resolve(output);
                        }, function () {
                            reject();
                        });
                    });
                });
            }
            this.login6 = function () {
                return new Promise(function (resolve, reject) {
                    var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/login6Popup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/login6Popup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: login6PopupController,
                            clickOutsideToClose: false,
                            escapeToClose: false,
                            multiple: true
                        }).then(function (user) {
                            resolve(user);
                        }, function () {
                            reject();
                        });
                    });
                });
            }



            this.codeManagerPopup = function () {
                return new Promise(function (resolve, reject) {
                    var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/codeManagerPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/codeManagerPopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: 'codeManagerPopupController',
                            clickOutsideToClose: false,
                            escapeToClose: false,
                            multiple: true
                        }).then(function (result) {
                            resolve(result);
                        }, function () {
                            reject();
                        });
                    });
                });
            };

            this.directivePopup = function () {
                return new Promise(function (resolve, reject) {
                    var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/directivePopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/directivePopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: 'directivePopupController',
                            clickOutsideToClose: false,
                            escapeToClose: false,
                            multiple: true
                        }).then(function (result) {
                            resolve(result);
                        }, function () {
                            reject();
                        });
                    });
                });
            };

            this.addPagePopup = function () {
                return new Promise(function (resolve, reject) {
                    var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/addPagePopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/addPagePopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: 'addPagePopupController',
                            clickOutsideToClose: false,
                            escapeToClose: false,
                            multiple: true
                        }).then(function (result) {
                            resolve(result);
                        }, function () {
                            reject();
                        });
                    });
                });
            };


            this.recharge = function () {
                var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/rechargePopup/popup.html" + "?id=" + new Date().getTime();
                var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/rechargePopup/popup.js" + "?id=" + new Date().getTime();
                $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                    $mdDialog.show({
                        templateUrl: templateUrl,
                        controller: rechargePopupController
                    });
                });
            }
            this.sellWebsite = function (website) {
                if (website) {
                    var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/sellWebsitePopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/sellWebsitePopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: sellWebsitePopupController,
                            locals: {
                                website: website
                            }
                        });
                    });
                }
            }
            this.websiteSetting = function (websiteId) {
                if (websiteId) {
                    var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/websiteSettingPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/websiteSettingPopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: websiteSettingPopupController,
                            locals: {
                                websiteId: websiteId
                            }
                        });
                    });
                }
            }
            this.photoDetail = function (gid, type) {
                if (!type) {
                    type = "photo";
                }
                if (gid) {
                    var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/photoDetailPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/photoDetailPopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: photoDetailPopupController,
                            locals: {
                                gid: gid,
                                type: type
                            }
                        });
                    });
                }
            }
            this.websiteDetail = function (wid, website) {
                if (wid) {
                    var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/websiteDetailPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/websiteDetailPopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: websiteDetailPopupController,
                            locals: {
                                wid: wid,
                                website: website || null
                            }
                        });
                    });
                }
            }
            this.buyDomain = function () {
                return new Promise(function (resolve, reject) {
                    var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/buyDomainPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/buyDomainPopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: buyDomainPopupController,
                            multiple: true
                        });
                    }).then(function (domain) {
                        resolve(domain);
                    }, function () {
                        reject();
                    });
                });
            }

            this.formView = function (headerJson, formJson) {
                return new Promise(function (resolve, reject) {
                    var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/formViewPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/formViewPopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: formViewPopupController,
                            multiple: true,
                            locals: {
                                headerJson: headerJson,
                                formJson: formJson
                            }
                        }).then(function (ele) {
                            resolve(ele);
                        }, function () {
                            reject();
                        });
                    });
                });
            }

            this.linkPopup = function (element, oldLink, rootScope) {
                return new Promise(function (resolve, reject) {
                    var params = {
                        "name":"linkPopup",
                        "directive":"<link-popup></link-popup>",
                        "oldLink":oldLink,
                        "element":element,
                        "big":true
                    }
                    that.callPopup(params).then(function(ele){
                        resolve(ele);
                    },function(){
                        reject();
                    });

                    // var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/linkPopup/popup.html" + "?id=" + new Date().getTime();
                    // var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/linkPopup/popup.js" + "?id=" + new Date().getTime();
                    // $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                    //     $mdDialog.show({
                    //         templateUrl: templateUrl,
                    //         controller: 'linkPopupDazzleCtrl',
                    //         multiple: true,
                    //         locals: {
                    //             element: element || null,
                    //             oldLink: oldLink || '',
                    //             rootScope: rootScope
                    //         }
                    //     }).then(function (ele) {
                    //         resolve(ele);
                    //     }, function () {
                    //         reject();
                    //     });
                    // });
                });
            }

            this.importPopup = function (json) {
                return new Promise(function (resolve, reject) {
                    var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/importPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/importPopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: importPopupController,
                            multiple: true,
                            clickOutsideToClose: true,
                            locals: {
                                result: json
                            }
                        }).then(function (ele) {
                            console.log('Dazzle importPopup', ele);
                            resolve(ele);
                        }, function () {
                            reject();
                        });
                    });
                });

            }


            this.popupCall = function (functionName, scope) {
                return new Promise(function (resolve, reject) {
                    var controllerName = functionName + "Controller";
                    var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/" + functionName + "/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/" + functionName + "/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: eval(controllerName),
                            multiple: true,
                            clickOutsideToClose: true,
                            locals: {
                                rootScope: scope
                            }
                        }).then(function (ele) {
                            console.log('Dazzle popupCall', ele);
                            resolve(ele);
                        }, function () {
                            reject();
                        });
                    });
                });

            }

            this.addElement = function (scope) {
                return new Promise(function (resolve, reject) {
                    var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/addElementPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/addElementPopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: addElementPopupController,
                            multiple: true,
                            locals: {
                                rootScope: scope
                            }
                        }).then(function (ele) {
                            console.log('Dazzle Add Element', ele);
                            resolve(ele);
                        }, function () {
                            reject();
                        });
                    });
                });
            }

            this.dataAddSelect = function (website, table) {
                return new Promise(function (resolve, reject) {
                    if (website && table) {
                        var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/dataSelectPopup/addselect.html" + "?id=" + new Date().getTime();
                        var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/dataSelectPopup/popup.js" + "?id=" + new Date().getTime();
                        $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                            $mdBottomSheet.show({
                                templateUrl: templateUrl,
                                controller: addSelectPopupController,
                                multiple: true,
                                clickOutsideToClose: true,
                                locals: {
                                    website: website,
                                    table: table,
                                    filter: null
                                }
                            }).then(function (data) {
                                resolve(data);
                            }, function () {
                                reject();
                            });
                        });
                    } else {
                        reject();
                    }
                });
            }

            this.dataSelect = function (website, table, ids,filter) {
                return new Promise(function (resolve, reject) {
                    if (website && table) {
                        var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/dataSelectPopup/popup.html" + "?id=" + new Date().getTime();
                        var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/dataSelectPopup/popup.js" + "?id=" + new Date().getTime();
                        $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                            $mdDialog.show({
                                templateUrl: templateUrl,
                                controller: dataSelectPopupController,
                                multiple: true,
                                clickOutsideToClose: true,
                                locals: {
                                    website: website,
                                    table: table,
                                    ids: ids,
                                    filter: filter
                                }
                            }).then(function (data) {
                                resolve(data);
                            }, function () {
                                reject();
                            });
                        });
                    } else {
                        reject();
                    }
                });
            }
            this.dataSelectById = function (website, table, ids) {
                return new Promise(function (resolve, reject) {
                    if (website && table) {
                        var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/dataSelectByIdPopup/popup.html" + "?id=" + new Date().getTime();
                        var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/dataSelectByIdPopup/popup.js" + "?id=" + new Date().getTime();
                        $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                            $mdDialog.show({
                                templateUrl: templateUrl,
                                controller: dataSelectByIdPopupController,
                                multiple: true,
                                locals: {
                                    website: website,
                                    table: table,
                                    ids: ids || null,
                                    alasql: alasql
                                }
                            }).then(function (data) {
                                resolve(data);
                            }, function () {
                                resolve();
                            });
                        });
                    } else {
                        reject();
                    }
                });
            }
            this.dataManagement = function (website, table, filter, isForm) {
                return new Promise(function (resolve, reject) {
                    if (website && table) {
                        var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/dataManagementPopup/popup.html" + "?id=" + new Date().getTime();
                        var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/dataManagementPopup/popup.js" + "?id=" + new Date().getTime();
                        $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                            $mdDialog.show({
                                templateUrl: templateUrl,
                                controller: dataManagementPopupController,
                                multiple: true,
                                locals: {
                                    website: website,
                                    table: table,
                                    filter: filter || null,
                                    isForm: isForm || "normal",
                                    alasql: alasql
                                }
                            }).then(function (data) {
                                resolve(data);
                            }, function () {
                                resolve();
                            });
                        });
                    } else {
                        reject();
                    }
                });
            }

            this.schema = function (website, table, isForm) {
                return new Promise(function (resolve, reject) {
                    if (website && table) {
                        var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/editSchemaPopup/popup.html" + "?id=" + new Date().getTime();
                        var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/editSchemaPopup/popup.js" + "?id=" + new Date().getTime();
                        $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                            $mdDialog.show({
                                templateUrl: templateUrl,
                                controller: editSchemaPopupController,
                                clickOutsideToClose: false,
                                escapeToClose: false,
                                multiple: true,
                                locals: {
                                    website: website,
                                    table: table,
                                    isForm: isForm
                                }
                            }).then(function (json) {
                                resolve(json);
                            }, function () {
                                reject();
                            });
                        });
                    } else {
                        reject();
                    }
                });
            }
            this.saveCode = function (code, type, bucket, key) {
                return new Promise(function (resolve, reject) {
                    var params = {
                        code: code,
                        type: type,
                        bucket: bucket,
                        key: key
                    }
                    var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/editCodePopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/editCodePopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: editCodePopupController,
                            clickOutsideToClose: false,
                            escapeToClose: false,
                            multiple: true,
                            locals: {
                                params: params || {}
                            }
                        }).then(function (newCode) {
                            resolve(newCode);
                        }, function () {
                            reject();
                        });
                    });
                });
            }

            this.code = function (code, type) {
                return new Promise(function (resolve, reject) {
                    var params = {
                        code: code,
                        type: type
                    }
                    var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/editCodePopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/editCodePopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: editCodePopupController,
                            clickOutsideToClose: false,
                            escapeToClose: false,
                            multiple: true,
                            locals: {
                                params: params || {}
                            }
                        }).then(function (newCode) {
                            resolve(newCode);
                        }, function () {
                            reject();
                        });
                    });
                });
            }
            this.html = function (html) {
                return new Promise(function (resolve, reject) {
                    var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/editHtmlPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/editHtmlPopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: editHtmlPopupController,
                            clickOutsideToClose: false,
                            escapeToClose: false,
                            multiple: true,
                            locals: {
                                html: html
                            }
                        }).then(function (newHtml) {
                            resolve(newHtml);
                        }, function () {
                            reject();
                        });
                    });
                });
            }
            this.tag = function (tags, allTags) {
                return new Promise(function (resolve, reject) {
                    if (tags) {
                        var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/editTagsPopup/popup.html" + "?id=" + new Date().getTime();
                        var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/editTagsPopup/popup.js" + "?id=" + new Date().getTime();
                        $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                            $mdDialog.show({
                                templateUrl: templateUrl,
                                controller: editTagsPopupController,
                                clickOutsideToClose: false,
                                escapeToClose: false,
                                multiple: true,
                                locals: {
                                    tags: tags,
                                    allTags: allTags || []
                                }
                            }).then(function (newTags) {
                                resolve(newTags);
                            }, function () {
                                reject();
                            });
                        });
                    } else {
                        reject();
                    }
                });
            }
            this.documents = function (files) {

                return new Promise(function (resolve, reject) {

                    console.log('Load Documents');
                    var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/editDocumentsPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/editDocumentsPopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: editDocumentsPopupController,
                            clickOutsideToClose: false,
                            escapeToClose: false,
                            multiple: true,
                            locals: {
                                files: files
                            }
                        }).then(function (newFiles) {
                            resolve(newFiles);
                        }, function () {
                            reject();
                        });
                    });

                });
            }
            this.gallery = function (images) {
                console.log('Load Gallery');

                return new Promise(function (resolve, reject) {

                    console.log('Load Gallery')
                    var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/editGalleryPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/editGalleryPopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: editGalleryPopupController,
                            clickOutsideToClose: false,
                            escapeToClose: false,
                            multiple: true,
                            locals: {
                                images: images
                            }
                        }).then(function (newImages) {
                            resolve(newImages);
                        }, function () {
                            reject();
                        });
                    });

                });
            }
            this.uploadFile = function (uid) {
                return new Promise(function (resolve, reject) {
                    if (uid) {
                        var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/uploadFilePopup/popup.html" + "?id=" + new Date().getTime();
                        var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/uploadFilePopup/popup.js" + "?id=" + new Date().getTime();
                        $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                            $mdDialog.show({
                                templateUrl: templateUrl,
                                controller: "uploadFileController",
                                clickOutsideToClose: false,
                                escapeToClose: false,
                                multiple: true,
                                locals: {
                                    uid: uid
                                }
                            }).then(function (uploadedFiles) {
                                resolve(uploadedFiles);
                            }, function () {
                                reject();
                            });
                        });
                    } else {
                        reject();
                    }
                });
            }

            this.uploadImage = function (uid) {
                return new Promise(function (resolve, reject) {
                    if (uid) {
                        var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/uploadImagePopup/popup.html" + "?id=" + new Date().getTime();
                        var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/uploadImagePopup/popup.js" + "?id=" + new Date().getTime();
                        $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                            $mdDialog.show({
                                templateUrl: templateUrl,
                                controller: uploadImageController,
                                clickOutsideToClose: false,
                                escapeToClose: false,
                                multiple: true,
                                locals: {
                                    uid: uid
                                }
                            }).then(function (uploadedFiles) {
                                resolve(uploadedFiles);
                            }, function () {
                                reject();
                            });
                        });
                    } else {
                        reject();
                    }
                });
            }
        

        });