define(['jquery', 'angular', 'aws-sdk', 'store', 'moment', 'ace', 'aviary', 'medium-editor', 'ag-grid-enterprise', 'alasql', 'xlsx', 'jquery-ui', 'bootstrap', 'slick', 'angular-animate', 'angular-aria', 'angular-route', 'angular-messages', 'angular-ui-bootstrap', 'angular-ui-sortable', 'angular-ui-ace', 'angular-ui-tree', 'angular-material', 'angular-material-fileinput', 'angular-slick', 'angular-grid', 'ocLazyLoad', 'angular-contextMenu'], function ($, angular, AWS, store, moment, ace, Aviary, MediumEditor, agGrid, alasql, xlsx) {
    console.log('dazzle.js');
    agGrid.LicenseManager.setLicenseKey("ag-Grid_Evaluation_License_Not_for_Production_100Devs21_June_2017__MTQ5Nzk5OTYwMDAwMA==896e8af7accaf15a04ddf6b6577c55c8");
    agGrid.initialiseAgGridWithAngular1(angular);

    var dazzle = angular.module("dazzle", ['ngMaterial', 'agGrid', 'angularGrid', 'ui.bootstrap', 'ui.tree', 'ui.ace', 'ui.sortable', 'oc.lazyLoad', 'slickCarousel', 'lfNgMdFileInput', "ui.bootstrap.contextMenu"]);
    dazzle.config(function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'https://s3-ap-southeast-1.amazonaws.com/**',
            'http://s3-ap-southeast-1.amazonaws.com/**',
            'https://s3-ap-northeast-1.amazonaws.com/**',
            'http://s3-ap-northeast-1.amazonaws.com/**',
            'https://d25k6mzsu7mq5l.cloudfront.net/**',
            'http://d25k6mzsu7mq5l.cloudfront.net/**'
        ]);
    });
    dazzle.config(function ($sceProvider, $mdDateLocaleProvider) {
        moment.locale('zh-HK');
        $mdDateLocaleProvider.formatDate = function (date) {
            return moment(date).format('DD/MM/YYYY');
        };

        $mdDateLocaleProvider.parseDate = function (dateString) {
            var m = moment(dateString, 'DD/MM/YYYY', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };
        $sceProvider.enabled(false);
    });
    dazzle.config(function () {
        function loadJs(url) {
            var link = document.createElement("script");
            link.type = "application/javascript";
            link.src = url;
            document.getElementsByTagName("head")[0].appendChild(link);
        }

        function loadCss(url) {
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = url;
            document.getElementsByTagName("head")[0].appendChild(link);
        }

        loadCss("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/font-awesome-4.7.0.min.css");
        loadCss("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/medium-editor-5.23.1.min.css");
        loadCss("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/jquery-ui-1.12.1.min.css");
        loadCss("https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css");
        loadCss("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/angular-jk-rating-stars-1.0.7.min.css");
        loadCss("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/angular-multirange-slider-1.1.1.css");
        loadCss("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/angular-ui-tree-2.22.5.min.css");
        loadCss("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/bootstrap-3.3.7.min.css");
        loadCss("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/slick-1.6.0.min.css");
        loadCss("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/slick-1.6.0-theme.min.css");
        loadCss("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/angular-material-fileinput-1.5.2.min.css");
        loadCss("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/angular-material-1.1.4.min.css");
        loadCss("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/builder-index.css");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/aceEditorPopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/pageJsCssPopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/directivePopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/userGalleryPopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/exportPopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/masterPopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/addPagePopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/linkPopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/contentPopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/recoveryPopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/menuPopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/imagePopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/chartPopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/templatePopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/tabPopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/suntaGalleryInputPopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/addStructurePopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/uploadFilePopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/formTablePopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/dataPopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/editSchemaPopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/formTextElementPopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/codeManagerPopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/elementPopup/popup.js?id=asdfflsa");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/galleryPopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/tagPopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/infoPopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/backgroundPopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/editFormSchemaPopup/popup.js");
        loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/formDataSchemaPopup/popup.js");
    });
    dazzle.QueryString = function () {
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&&&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split(":===:");
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = decodeURIComponent(pair[1]);
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                query_string[pair[0]] = arr;
            } else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return query_string;
    }();

    dazzle.service('$dazzleS3', function () {
        var that = this;
        this.getJson = function (bucket, key) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Key: key,
                    ResponseExpires: new Date().getTime()
                };
                s3.getObject(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        try {
                            resolve(JSON.parse(data.Body.toString()));
                        } catch (e) {
                            reject();
                        }
                    }
                });
            });
        }

        this.saveJson = function (bucket, key, json) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Key: key,
                    ContentType: "application/json",
                    Body: JSON.stringify(json, null, 4)
                }
                s3.putObject(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            })
        }

        this.getFile = function (bucket, key) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Key: key,
                    ResponseExpires: new Date().getTime()
                };
                s3.getObject(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data.Body.toString());
                    }
                });
            });
        }

        this.saveFile = function (bucket, key, string) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Key: key,
                    Body: string
                }

                var ext = key.substr(key.lastIndexOf('.') + 1);
                if (ext === 'css') {
                    params.ContentType = 'text/css';
                } else if (ext === 'less') {
                    params.ContentType = 'text/css';
                } else if (ext === 'js') {
                    params.ContentType = 'application/javascript';
                } else if (ext === 'json') {
                    params.ContentType = 'application/json';
                } else if (ext === 'jpg') {
                    params.ContentType = 'image/jpeg';
                } else if (ext === 'jpeg') {
                    params.ContentType = 'image/jpeg';
                } else if (ext === 'png') {
                    params.ContentType = 'image/png';
                } else if (ext === 'gif') {
                    params.ContentType = 'image/gif';
                } else if (ext === 'html') {
                    params.ContentType = 'text/html';
                }

                s3.putObject(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        }

        this.saveImage = function (uid, file) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var oldFilename = encodeURIComponent(file.name);
                var fileExtansion = oldFilename.split('.').pop();
                var newFilename = 'id' + new Date().getTime() + '.jpg';
                var params = {
                    Bucket: "designerrrr",
                    Key: "images/" + uid + "/" + newFilename,
                    ContentType: file.type,
                    Body: file,
                    Metadata: {
                        "newVersion": "new",
                        "gid": newFilename,
                        "owner_id": uid,
                        "original_name": oldFilename,
                        "galleryType": "photo"
                    }
                };
                s3.putObject(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            "oldFilename": oldFilename,
                            "newFilename": newFilename,
                            "fileExtansion": fileExtansion,
                            "fileType": file.type
                        });
                    }
                });
            });
        }

        this.listObject = function (bucket, key) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Prefix: key
                };
                s3.listObjects(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data.Contents);
                    }
                });
            });
        }

        this.copyFile = function (copySource, bucket, key) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Key: key,
                    CopySource: encodeURIComponent(copySource)
                }
                s3.copyObject(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        }

        this.checkFile = function (bucket, key) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Key: key
                };
                s3.headObject(params, function (err, data) {
                    if (err) {
                        resolve(false)
                    } else {
                        resolve(true);
                    }
                });
            });
        }

        this.getFileUrl = function (bucket, key, expires) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    "Bucket": bucket,
                    "Key": key
                };
                if (expires) {
                    params.Expires = expires;
                }
                s3.getSignedUrl('getObject', params, function (err, url) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(url);
                    }
                });
            })
        }

    });
    dazzle.service('$dazzlePopup', function ($mdDialog, $mdBottomSheet, $mdToast, $ocLazyLoad) {
        var that = this;
        //ben start
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
        this.login = function (params) {
            return new Promise(function (resolve, reject) {
                var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/loginPopup/popup.html" + "?id=" + new Date().getTime();
                var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/loginPopup/popup.js" + "?id=" + new Date().getTime();
                if (params && params.version) {
                    templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/loginPopup" + params.version + "/popup.html" + "?id=" + new Date().getTime();
                    controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/loginPopup" + params.version + "/popup.js" + "?id=" + new Date().getTime();
                }

                $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                    $mdDialog.show({
                        templateUrl: templateUrl,
                        controller: loginPopupController,
                        clickOutsideToClose: false,
                        escapeToClose: false,
                        multiple: true,
                        locals: {
                            params: params
                        }
                    }).then(function (user) {
                        resolve(user);
                    }, function () {
                        reject();
                    });
                });
            });
        }
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
                                isForm: isForm || "normal"
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
        this.code = function (code, type) {
            return new Promise(function (resolve, reject) {
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
                            code: code,
                            type: type
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
        this.gallery = function (images) {
            return new Promise(function (resolve, reject) {
                if (images) {
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
        //ben end

        //henry start
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
        this.popupCall = function (functionName, scope) {
            return new Promise(function (resolve, reject) {
                var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/" + functionName + "/popup.html" + "?id=" + new Date().getTime();
                var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/" + functionName + "/popup.js" + "?id=" + new Date().getTime();
                $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                    $mdDialog.show({
                        templateUrl: templateUrl,
//                    controller: eval(functionName+"Controller"),
                        controller: "exportPopupController",
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
//                        parent:angular.element('#data-select'),
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
        this.dataSelect = function (website, table, filter) {
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
//                        parent:angular.element('#data-management'),
                            locals: {
                                website: website,
                                table: table,
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
        //henry end
    });
    dazzle.service('$dazzleUser', function ($http, $location, $interval) {
        var that = this;

        this.getToken = function () {
            return store.get('token');
        }

        this.login = function (token) {
            return new Promise(function (resolve, reject) {
                if (token) {
                    $http({
                        "method": "post",
                        "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/login",
                        "data": {
                            "token": token,
                            "loginUrl": $location.$$absUrl,
                            "type": "loginByToken"
                        }
                    }).then(function (result) {
                        if (result.data.code > 0) {
                            resolve(result.data.resolve);
                        } else {
                            reject(result.data.reject);
                        }
                    });
                }
            });
        }

        this.getUserJson = function (token) {
            return new Promise(function (resolve, reject) {
                if (token) {
                    that.login(token).then(function (tokenJson) {
                        resolve(tokenJson.userJson);
                    }, function (error) {
                        reject(error);
                    });
                }
            });
        }

        this.getAwsJson = function (token) {
            return new Promise(function (resolve, reject) {
                if (token) {
                    that.login(token).then(function (tokenJson) {
                        resolve(tokenJson.awsJson);
                    }, function (error) {
                        reject(error);
                    });
                }
            });
        }

        this.getDataJson = function (token) {
            return new Promise(function (resolve, reject) {
                if (token) {
                    that.login(token).then(function (tokenJson) {
                        resolve(tokenJson.data);
                    }, function (error) {
                        reject(error);
                    });
                }
            });
        }

        this.setAws = function (awsJson) {
            if (awsJson && awsJson.AccessKeyId && awsJson.SecretAccessKey && awsJson.SessionToken) {
                AWS.config = new AWS.Config();
                AWS.config.accessKeyId = awsJson.AccessKeyId;
                AWS.config.secretAccessKey = awsJson.SecretAccessKey;
                AWS.config.sessionToken = awsJson.SessionToken;
                AWS.config.region = 'ap-northeast-1';
            } else {
                AWS.config.accessKeyId = null;
                AWS.config.secretAccessKey = null;
                AWS.config.sessionToken = null;
                AWS.config.region = null;
            }

        }

        this.setToken = function (token) {
            store.set('token', token);
        }

        this.updateData = function (token, data) {
            return new Promise(function (resolve, reject) {
                if (token) {
                    $http({
                        "method": "post",
                        "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/login",
                        "data": {
                            "token": token,
                            "data": data,
                            "type": "updateDataByToken"
                        }
                    }).then(function (result) {
                        if (result.data.code > 0) {
                            resolve(result.data.resolve);
                        } else {
                            reject(result.data.reject);
                        }
                    });
                }
            });
        }
    });
    dazzle.service("$dazzleFn", function ($dazzleS3) {
        var that = this;
        this.getUserTables = function (userId, websiteId) {
            return new Promise(function (resolve, reject) {
                var tables = [];
                if (userId, websiteId) {
                    $dazzleS3.listObject('dazzle-user-' + userId, 'website/' + websiteId + '/content/').then(function (files) {
                        for (var i = 0; i < files.length; i++) {
                            var file = files[i].Key.split('\\').pop().split('/').pop();
                            if (file && file.length > 0) {
                                var filename = file.split('.')[0];
                                var fileExtension = file.split('.')[1];
                                if (filename && filename.length > 0) {
                                    var isTable = filename.endsWith('-table');
                                    if (isTable) {
                                        var tableName = filename.replace('-table', "");
                                        if (tableName && tables.indexOf(tableName) < 0 && tableName !== 'undefined' && tableName !== 'null') {
                                            tables.push(tableName);
                                        }
                                    }
                                }
                            }
                        }
                        resolve(tables);
                    }, function () {
                        reject();
                    });
                } else {
                    reject();
                }
            });
        }
        this.getTableTable = function (userId, websiteId, tableName) {
            return new Promise(function (resolve, reject) {
                $dazzleS3.getJson('dazzle-user-' + userId, 'website/' + websiteId + '/content/' + tableName + '-table.json').then(function (json) {
                    resolve(json);
                }, function () {
                    reject();
                });
            });
        }
        this.getTableSchema = function (userId, websiteId, tableName) {
            return new Promise(function (resolve, reject) {
                $dazzleS3.getJson('dazzle-user-' + userId, 'website/' + websiteId + '/content/' + tableName + '-schema.json').then(function (json) {
                    resolve(json);
                }, function () {
                    reject();
                });
            });
        }
    });

    return dazzle;
});