define(['moment','dazzle', 'store', 'aviary'], function (moment,dazzle, store, Aviary) {
      $(document).ready(function (e) {
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

        loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/font-awesome-4.7.0.min.css");
        loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/medium-editor-5.23.1.min.css");
        loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/jquery-ui-1.12.1.min.css");
        loadCss("https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css");
        loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/angular-jk-rating-stars-1.0.7.min.css");
        loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/angular-multirange-slider-1.1.1.css");
        loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/angular-ui-tree-2.22.5.min.css");
        loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/bootstrap-3.3.7.min.css");
        loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/slick-1.6.0.min.css");
        loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/slick-1.6.0-theme.min.css");
        loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/angular-material-fileinput-1.5.2.min.css");
        loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/angular-material-1.1.4.min.css");
        loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/builder-index.css");
        loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/angular-material-sidemenu.css");

        loadCss("https://fonts.googleapis.com/icon?family=Material+Icons");
        loadCss("https://dashboard.dazzle.website/css/index.css");

        //loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/controller/index.js");


        $('body').attr('ng-app', 'demoApp');
        $('body').attr('ng-controller', 'dashboardController');
        $('body').attr('ng-init', 'init()');
    });
    var app = angular.module("demoApp", ['dazzle', 'ngMaterialSidemenu', 'oc.lazyLoad']);
    app.config(function ($routeProvider) {
        $routeProvider
            .when('/main', {
                templateUrl: 'templates/main.html' + "?id=" + new Date().getTime(),
                controller: 'mainController'
            })
            .when('/detail', {
                templateUrl: 'templates/detail.html' + "?id=" + new Date().getTime(),
                controller: 'detailController'
            })
            .when('/changePassword', {
                templateUrl: 'templates/changePassword.html' + "?id=" + new Date().getTime(),
                controller: 'changePasswordController'
            })
            .when('/rechargeRecord', {
                templateUrl: 'templates/rechargeRecord.html' + "?id=" + new Date().getTime(),
                controller: 'rechargeRecordController'
            })
            .when('/buyRecord', {
                templateUrl: 'templates/buyRecord.html' + "?id=" + new Date().getTime(),
                controller: 'buyRecordController'
            })
            .when('/sellRecord', {
                templateUrl: 'templates/sellRecord.html' + "?id=" + new Date().getTime(),
                controller: 'sellRecordController'
            })
            .when('/listWebsite', {
                templateUrl: 'templates/listWebsite.html' + "?id=" + new Date().getTime(),
                controller: 'listWebsiteController'
            })
            .when('/myPhotos', {
                templateUrl: 'templates/myPhotos.html' + "?id=" + new Date().getTime(),
                controller: 'myPhotosController'
            })
            .when('/myWebsite', {
                templateUrl: 'templates/myWebsite.html' + "?id=" + new Date().getTime(),
                controller: 'myWebsiteController'
            })
            .when('/paypalCallback', {
                templateUrl: 'templates/paypalCallback.html' + "?id=" + new Date().getTime(),
                controller: 'paypalCallbackController'
            })
            .when('/myDoc', {
                templateUrl: 'templates/myDoc.html' + "?id=" + new Date().getTime(),
                controller: 'myDocController'
            })
            .when('/boughtImage', {
                templateUrl: 'templates/boughtImage.html' + "?id=" + new Date().getTime(),
                controller: 'boughtImageController'
            })
            .when('/soldImage', {
                templateUrl: 'templates/soldImage.html' + "?id=" + new Date().getTime(),
                controller: 'soldImageController'
            })
            .when('/myVideos', {
                templateUrl: 'templates/myVideos.html' + "?id=" + new Date().getTime(),
                controller: 'myVideosController'
            })
            .otherwise({
                redirectTo: '/main'
            });
    });
    app.config(function ($mdDateLocaleProvider) {
        $mdDateLocaleProvider.formatDate = function (date) {
            return moment(date).format('DD/MM/YYYY');
        };
    });
    app.filter('toDate', function () {
        return function (input) {
            return moment(input, 'DD/MM/YYYY').toDate();
        }
    });
    app.filter('toDDMMYYYDate', function ($filter) {
        return function (theDate) {
            if (theDate && angular.isDate(new Date(theDate))) {
                return moment(new Date(theDate)).format('DD/MM/YYYY');
            } else {
                return "";
            }
        }
    });

        app.directive('dashboard', function ($compile, $templateRequest, $mdDialog, $uibModal) {
            var dashboard = {
                restrict: 'E',
                priority: 1000,
                scope: true,
                templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard-view.html',
                link: function (scope, element, attrs) {
                },
                controller: function ($scope, $element, $attrs) {
                }
            };
            return dashboard;
        });

    app.controller('dashboardController', function ($scope, $http, $timeout, $ocLazyLoad, $mdDialog, $dazzleS3, $dazzlePopup, $dazzleUser) {
        console.log('dashboardController');
        $scope.dashboardInited = false;
        $scope.isAdmin = false;
        $scope.isDesigner = false;
        $scope.isUser = false;
        $scope.init = function () {
            if (!angular.isUndefined(QueryString.token)) {
                $dazzleUser.userLogin(QueryString.token).then(function () {
                    document.location.href = "index.html";
                }, function () {
                    $scope.logout();
                });
            } else if ($dazzleUser.getUser()) {
                $dazzleUser.userLogin($dazzleUser.getUser().token).then(function () {
                    $scope.$apply(function () {
                        $scope.user = $dazzleUser.getUser();
                        $scope.setUserType();
                        $scope.dashboardInited = true;
                    });
                }, function () {
                    $scope.logout();
                });
            } else {
                $scope.logout();
            }
        }
        $scope.logout = function () {
            store.clearAll();
            document.location.href = "http://dazzle.website/";
        }
        $scope.setUserType = function () {
            if ($scope.user) {
                $scope.isUser = true;
                if ($scope.user.type) {
                    if ($scope.user.type === 'admin') {
                        $scope.isAdmin = true;
                        $scope.isDesigner = true;
                    } else if ($scope.user.type === 'designer') {
                        $scope.isDesigner = true;
                    }
                } else {
                    $scope.user.type = 'user';
                }
            }
        }
        $scope.toggleLeftMenu = buildDelayedToggler('left');
        $scope.recharge = function () {
            $dazzlePopup.recharge();
        }

        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function () {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }

        function buildDelayedToggler(navID) {
            return debounce(function () {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        console.log('toggleLeftMenu')
                    });
            }, 200);
        }

        $scope.grabWebsite = function () {
            var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/grabWebsitePopup/popup.html" + "?id=" + new Date().getTime();
            var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/grabWebsitePopup/popup.js" + "?id=" + new Date().getTime();
            $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                $mdDialog.show({
                    templateUrl: templateUrl,
                    controller: grabWebsitePopupController
                });
            });
        }
    });

    // function to act as a class
    function dateRenderer() {
        this.container = document.createElement('div');
    }

    // gets called once before the renderer is used
    dateRenderer.prototype.init = function (params) {
        if (params.value) {
            this.container.innerHTML = moment(new Date(params.value)).format('DD/MM/YYYY HH:mm:ss');
        } else {
            this.container.innerHTML = "";
        }
    };

    // gets called once when grid ready to insert the element
    dateRenderer.prototype.getGui = function () {
        return this.container;
    };

    // gets called whenever the user gets the cell to refresh
    dateRenderer.prototype.refresh = function (params) {
        this.container.innerHTML = "";
        this.init(params);
    };

    // gets called when the cell is removed from the grid
    dateRenderer.prototype.destroy = function () {

    };

    function dateComparator(date1, date2) {
        var date1Number = new Date(date1).getTime();
        var date2Number = new Date(date2).getTime();

        if (date1Number === null && date2Number === null) {
            return 0;
        }
        if (date1Number === null) {
            return -1;
        }
        if (date2Number === null) {
            return 1;
        }

        return date1Number - date2Number;
    }



    app.controller('batchDownloadPopupController', function($scope, $http, $filter, $mdDialog, $mdBottomSheet, $interval, allID, type) {
        $scope.loading = true;
        $scope.ok = false;
        $scope.err = false;
        var id = new Date().getTime();
        var url = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/batchdownload";
        var params = {
            "target": allID,
            "id": id,
            "type": type
        }
        $http.post(url, params).then(function(result) {
            $scope.loading = false;
            console.log(result);
            if (result.data.indexOf("successful") != -1) {
                $scope.ok = true;
                console.log("vvvv whyyyy");
                console.log(result.data.replace("successful ", ""));
                $scope.successCount = parseInt(result.data.replace("successful ", ""));
                $scope.failCount = allID.length - $scope.successCount;
                $scope.downloadURL = "https://dashboard.dazzle.website/tempZip/dazzle-photo-" + id + ".zip";
            } else {
                $scope.err = true;
            }
        });
        $scope.cancel = function() {
            $mdDialog.hide();
        }
        $scope.download = function() {
            $mdDialog.hide();
        }
    });

    app.controller('boughtImageController', function($scope, $http, $filter, $mdDialog, $mdBottomSheet, $mdToast) {
        $scope.eachShowNum = 500;
        console.log("vvvv vvvv 8");
        //for upload user defind data
        $scope.userType = '相片';
        //$scope.types = ("相片 插畫 3D模型 字型 LOGO 網站樣辦").split(' ').map(function(type) { //use later
        $scope.types = ("相片 插畫").split(' ').map(function(type) {
            return { abbrev: type };
        });

        $scope.init = function(type) {
            //$scope.$apply(function(){
            $scope.type = type;
            $scope.allNewArray = [];
            $scope.deleting = false;
            $scope.loading = true;
            $scope.end = false;
            $scope.tags = [];
            $scope.selected = [];
            $scope.selecting = false;
            $scope.deletedURL = [];
            $scope.selectedTags = [];
            $scope.LastEvaluatedKey = null;
            $scope.websitesAngularGridOptions = {
                gridWidth: 200,
                gutterSize: 4,
                infiniteScrollDelay: 1000,
                infiniteScrollDistance: 95,
                scrollContainer: '#sidecontent'
            }
            $scope.inited = false;
            $scope.websites = [];
            //});
            switch ($scope.type) {
                case "相片":
                    console.log("vvvv 相片");
                    $scope.px = 'images/' + $scope.user.uid + '/medium-web/';
                    $scope.nowType = ".jpg";
                    break;
                case "插畫":
                    console.log("vvvv 插畫");
                    $scope.px = 'illustration/' + $scope.user.uid + '/png/';
                    $scope.nowType = ".png";
                    break;
            }
            console.log('myPhotosController');
            console.log($scope.user.uid);
            console.log(AWS.config);

            var getBoughtUrl = "https://d8fz9pfue5.execute-api.ap-northeast-1.amazonaws.com/prod/getboughtimage";
            var gbParams = {
                "buyerId": $scope.user.uid,
                "type": type
            }
            $http.post(getBoughtUrl, gbParams).then(function(result) {
                console.log("vvvv newGet");
                console.log(result);
                var ay = [];
                if (!result.data.errorMessage) {
                    console.log(result.data.Responses["dazzle-gallery"]);
                    var dg = result.data.Responses["dazzle-gallery"];
                    for (i = 0; i < dg.length; i++) {
                        switch ($scope.type) {
                            case "相片":
                                var dg1 = dg[i].mid_url.replace("https://designerrrr-output.s3-ap-northeast-1.amazonaws.com/", "");
                                var dgg = dg1.replace("medium", "medium-web");
                                break;
                            case "插畫":
                                var dg1 = dg[i].png_url.replace("https://designerrrr-output.s3-ap-northeast-1.amazonaws.com/", "");
                                var dgg = dg1;
                                break;
                        }
                        ay = ay.concat({ Key: dgg });
                    }
                }
                var dataa = {};
                dataa.Contents = ay;
                console.log(dataa);
                $scope.data = dataa;
                $scope.getWebsites($scope.eachShowNum, 0).then(function(anArray) {
                    $scope.$apply(function() {
                        $scope.inited = true;
                        $scope.loading = false;
                        $scope.websites = $scope.websites.concat(anArray);
                        $scope.LastEvaluatedKey = $scope.eachShowNum;
                        console.log("vvvv $scope.websites");
                        console.log($scope.websites);
                    });
                });
            });
        }

        $scope.loadMore = function() {
            console.log("loadMore");
            if (!$scope.end && !$scope.loading) {
                $scope.loading = true;
                $scope.getWebsites($scope.eachShowNum, $scope.LastEvaluatedKey).then(function(anArray) {
                    $scope.loading = false;
                    if (anArray.length > 0) {
                        $scope.websites = $scope.websites.concat(anArray);
                        $scope.LastEvaluatedKey = $scope.LastEvaluatedKey + $scope.eachShowNum;
                    } else {
                        $scope.end = true;
                    }
                });
            }
        }
        $scope.getWebsites = function(limit, key) {
            return new Promise(function(resolve, reject) {
                console.log("getWebsites");
                var data = $scope.data;
                console.log(data);
                var anArray = [];
                var counter = 0;
                var s3 = new AWS.S3();
                if ($scope.LastEvaluatedKey < data.Contents.length && data.Contents.length - $scope.LastEvaluatedKey < $scope.eachShowNum) { //show photo when unshow photo less than 50
                    console.log("if");
                    for (i = (0 + key); i < data.Contents.length; i++) {
                        var checkID = data.Contents[i].Key.substring(data.Contents[i].Key.lastIndexOf("/") + 1).replace($scope.nowType, "");
                        console.log("vvvv checkID");
                        console.log(checkID);
                        var notLoad = false;
                        for (j = 0; j < $scope.deletedURL.length; j++) {
                            if ($scope.deletedURL[j] == checkID) {
                                notLoad = true;
                            }
                        }
                        if (notLoad) {
                            console.log("dead img found");
                        } else {
                            console.log("dead img else");
                            var params = {
                                Bucket: "designerrrr-output",
                                Key: data.Contents[i].Key
                            };
                            var url = s3.getSignedUrl('getObject', params);
                            anArray[counter] = url;
                            counter++;
                        }
                    }
                    if ($scope.data.Contents.length <= $scope.eachShowNum) {
                        console.log("endFirst");
                        $scope.end = true;
                    }
                    console.log(anArray);
                    resolve(anArray);
                } else if ($scope.LastEvaluatedKey < data.Contents.length) {
                    console.log("else if");
                    for (i = (0 + key); i < (limit + key); i++) {
                        console.log("vvvv for");
                        console.log(data.Contents[i]);
                        console.log(data.Contents[i].Key);
                        var checkID = data.Contents[i].Key.substring(data.Contents[i].Key.lastIndexOf("/") + 1).replace($scope.nowType, "");
                        console.log("vvvv checkID");
                        console.log(checkID);
                        var notLoad = false;
                        for (j = 0; j < $scope.deletedURL.length; j++) {
                            if ($scope.deletedURL[j] == checkID) {
                                notLoad = true;
                            }
                        }
                        if (notLoad) {
                            console.log("dead img found");
                        } else {
                            console.log("dead img else");
                            var params = {
                                Bucket: "designerrrr-output",
                                Key: data.Contents[i].Key
                            };
                            var url = s3.getSignedUrl('getObject', params);
                            anArray[counter] = url;
                            counter++;
                        }
                    }
                    console.log(anArray);
                    resolve(anArray);
                } else {
                    if ($scope.websites.length == 0) {
                        console.log("vvvv first 0");
                        $scope.inited = true;
                        $scope.loading = false;
                        $scope.LastEvaluatedKey = 0;
                    }
                    $scope.end = true;
                    console.log("reject");
                    reject("end");
                }
            });
        }
        $scope.getImage = function(key) {
            var s3 = new AWS.S3();
            var params = {
                Bucket: "designerrrr-output",
                Key: key
            };
            var url = s3.getSignedUrl('getObject', params);
            console.log(url);
            return url;
        }
        //For toast popup use
        var last = {
            bottom: true,
            top: false,
            left: false,
            right: true
        };
        $scope.toastPosition = angular.extend({}, last);
        $scope.getToastPosition = function() {
            sanitizePosition();
            return Object.keys($scope.toastPosition).filter(function(pos) {
                return $scope.toastPosition[pos];
            }).join(' ');
        };

        function sanitizePosition() {
            var current = $scope.toastPosition;
            if (current.bottom && last.top) current.top = false;
            if (current.top && last.bottom) current.bottom = false;
            if (current.right && last.left) current.left = false;
            if (current.left && last.right) current.right = false;
            last = angular.extend({}, current);
        }
        // /For toast popup use
        $scope.showPhoto = function(website, index) {
            //尋日做到show photo,要改show photo.js showPhoto.html d type 同 url2017 7 26
            console.log(index);
            //console.log($scope.websites[index]);
            $mdDialog.show({
                controller: "showPhotoController",
                templateUrl: 'templates/showPhoto.html',
                escapeToClose: false,
                clickOutsideToClose: false,
                locals: {
                    website: website,
                    rootScope: $scope,
                    bought: true,
                    sold:false
                }
            }).then(function(objj) {
                console.log("vvvv showPhoto then");
                console.log(objj);
                /*
                if (objj.tORf) {
                    var confirm = $mdDialog.confirm().title('刪除圖片').textContent('你真的要刪除此圖片嗎?').ariaLabel('Lucky day').ok('刪除').cancel('取消');
                    $mdDialog.show(confirm).then(function() {
                        $scope.selected = [];
                        $scope.deleting = true;
                        var delID = $scope.websites[index].substring(0, $scope.websites[index].indexOf($scope.nowType + "?AWSAccessKeyId")).replace($scope.nowType + "?AWSAccessKeyId", "");
                        console.log(delID);
                        delID = delID.substring(delID.lastIndexOf("/") + 1);
                        console.log(delID);
                        $scope.deletedURL.push(delID);
                        console.log("vvvv dellll");
                        console.log($scope.deletedURL);
                        //This part is for a special case that user delete the photo just upload in same page
                        for (i = 0; i < $scope.allNewArray.length; i++) {
                            console.log($scope.allNewArray[i]);
                            console.log($scope.websites[index]);
                            if ($scope.allNewArray[i] === $scope.websites[index]) {
                                console.log("same!");
                                $scope.allNewArray.splice(i, 1);
                            }
                        }
                        //This part is for arrange the pictures after delete.
                        $scope.websites.splice(index, 1);
                        setTimeout(function() {
                            var temp = $scope.websites.length;
                            console.log("vvvv thennnn7");
                            $scope.temp = temp;
                            $scope.websites = $scope.websites.concat(["https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png"]);
                        }, 1500);
                        setTimeout(function() {
                            console.log("vvvv 2000 thennnn7");
                            $scope.websites.splice($scope.temp, 1);
                            $scope.deleting = false;
                        }, 4000);
                        // /This part is for arrange the pictures after delete.
                        var url = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
                        var params = {
                            "operation": "delete",
                            "accessKeyId": "sdasda",
                            "secretAccessKey": "asdsa",
                            "sessionToken": "vhndi757Bydd",
                            "TableName": "dazzle-gallery",
                            "Key": {
                                "gid": objj.id
                            }
                        }
                        $http.post(url, params).then(function(result) {
                            console.log("deleted");
                            console.log(result);
                            var pinTo = $scope.getToastPosition();
                            $scope.getTags().then(function(result) {
                                $scope.tags = result.data;
                            });
                            $mdToast.show($mdToast.simple().textContent('已刪除').position(pinTo).hideDelay(3000));
                        });
                        var s3 = new AWS.S3();
                        switch ($scope.type) {
                            case "相片":
                                console.log("vvvv 相片 3");
                                var diffObj = [{
                                    Key: "images/" + $scope.user.uid + "/large/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/large-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/medium/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/medium-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/small/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/small-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/thumbnail/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/thumbnail-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/original/" + objj.id + objj.type
                                }];
                                break;
                            case "插畫":
                                console.log("vvvv 插畫 3");
                                var diffObj = [{
                                    Key: "illustration/" + $scope.user.uid + "/eps/" + objj.id + ".eps"
                                }, {
                                    Key: "illustration/" + $scope.user.uid + "/svg/" + objj.id + ".svg"
                                }, {
                                    Key: "illustration/" + $scope.user.uid + "/png/" + objj.id + ".png"
                                }];
                                break;
                        }

                        var paramsDel = {
                            Bucket: "designerrrr-output",
                            Delete: {
                                Objects: diffObj,
                                Quiet: false
                            }
                        };
                        s3.deleteObjects(paramsDel, function(err, data) {
                            if (err) {
                                console.log("s3 fail");
                                console.log(err);
                            } else {
                                console.log("delete from s3 successful");
                                console.log(data);
                                console.log($scope.websites);
                                //$scope.init();
                                /*for(i=0;i<$scope.websites.length;i++){
                                    if($scope.websites[i].indexOf(objj.id)!=-1){
                                        console.log("splice ok");
                                        $scope.websites.splice(i,1);
                                    }
                                }
                                console.log($scope.websites);*/
                /*}
                        });
                    }, function() {});
                }*/
            });
        }
        $scope.toggle = function(item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            } else {
                list.push(item);
            }
        };
        $scope.toggleAll = function(item) {
            if ($scope.selected.length === $scope.websites.length) {
                $scope.selected = [];
            } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
                $scope.selected = $scope.websites.slice(0);
            }
        }
        $scope.exists = function(item, list) {
            return list.indexOf(item) > -1;
        };
        $scope.select = function() {
            $scope.selecting = true;
        }
        $scope.selectCancel = function() {
            $scope.selected = [];
            $scope.selecting = false;
        }
        $scope.downloadAll = function() {
            if ($scope.selected.length != 0) {
                var allID = [];
                console.log($scope.selected);
                for (i = 0; i < $scope.selected.length; i++) {
                    allID[i] = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId")).substring($scope.selected[i].lastIndexOf("/") + 1).replace($scope.nowType, "");
                }
                console.log(allID);
                $mdDialog.show({
                    controller: "batchDownloadPopupController",
                    templateUrl: 'templates/batchDownloadPopup.html',
                    escapeToClose: false,
                    clickOutsideToClose: false,
                    locals: {
                        allID: allID,
                        type: $scope.type
                    }
                }).then(function() {});
            } else {
                var pinTo = $scope.getToastPosition();
                $mdToast.show($mdToast.simple().textContent('請選擇項目').position(pinTo).hideDelay(3000));
            }
        }
        /*
        $scope.deleteAll = function(website) {
            var allID = [];
            console.log($scope.selected);
            for (i = 0; i < $scope.selected.length; i++) {
                allID[i] = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId")).substring($scope.selected[i].lastIndexOf("/") + 1).replace($scope.nowType, "");
            }
            console.log(allID);
            var confirm = $mdDialog.confirm().title('刪除圖片').textContent('你真的要刪除' + $scope.selected.length + '張圖片嗎?').ariaLabel('Lucky day').ok('刪除').cancel('取消');
            $mdDialog.show(confirm).then(function() {
                $scope.deleteAllPhoto();
                $scope.deleteAllData();
            });
        }
        $scope.upload = function() {
            console.log("vvvv upload");
            console.log($scope.user);
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'templates/upload.html',
                controller: 'uploadController',
                clickOutsideToClose: false,
                disableParentScroll: false,
                locals: {
                    bucket: "designerrrr-output",
                    key: $scope.px,
                    rootScope: $scope
                }
            }).then(function(uploadedFiles) {
                $scope.getTags().then(function(result) {
                    $scope.tags = result.data;
                });
                console.log("vvvv then");
                console.log(uploadedFiles);
                var newItemArray = [];
                console.log("vvvv md dialog");
                if (uploadedFiles.length != 0) {
                    for (i = 0; i < uploadedFiles.length; i++) {
                        newItemArray[i] = $scope.getImage(uploadedFiles[i].path);
                    }
                    console.log(newItemArray);
                    if ($scope.allNewArray.length == 0) {
                        $scope.allNewArray = newItemArray;
                    } else {
                        $scope.allNewArray = newItemArray.concat($scope.allNewArray);
                    }
                    $scope.websites = newItemArray.concat($scope.websites);
                }
                //$scope.websites.concat(uploadedFiles);
            }).catch(function(error) {
                // User clicked outside or hit escape 
            });
        };
        $scope.changeTagsAll = function() {
            console.log("AAAA");
            //console.log($scope.websites[index]);
            $mdDialog.show({
                controller: "changeTagController",
                templateUrl: 'templates/changeTag.html',
                escapeToClose: false,
                clickOutsideToClose: false,
                locals: {
                    rootScope: $scope
                }
            }).then(function(tagNeedToBeAdded) {
                console.log($scope.selected);
                $scope.saveAllTagtoPhoto(tagNeedToBeAdded);
            });
        }
        $scope.saveAllTagtoPhoto = function(SelectedTag) {
            console.log("AAAAA");
            for (i = 0; i < $scope.selected.length; i++) {
                var thisPhotoId = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId"));
                thisPhotoId = thisPhotoId.substring(thisPhotoId.lastIndexOf("/") + 1);
                thisPhotoId = thisPhotoId.substring(0, thisPhotoId.lastIndexOf("."));
                console.log(thisPhotoId);
                var url = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
                var params = {
                    "operation": "get",
                    "accessKeyId": "sdasda",
                    "secretAccessKey": "asdsa",
                    "sessionToken": "vhndi757Bydd",
                    "TableName": "dazzle-gallery",
                    "Key": {
                        "gid": thisPhotoId
                    }
                }
                $http.post(url, params).then(function(result) {
                    console.log("db successful");
                    console.log(result);
                    $scope.checking = false;
                    $scope.tags = result.data.Item.tags;
                    console.log($scope.tags);
                    for (i = 0; i < SelectedTag.length; i++) {
                        $scope.tags.push(SelectedTag[i]);
                    }
                    console.log($scope.tags);
                    $scope.tags = $scope.tags.filter(function(elem, pos) {
                        return $scope.tags.indexOf(elem) == pos;
                    })
                    console.log($scope.tags);
                    result.data.Item.tags = $scope.tags;
                    $scope.save(result.data.Item);
                })
            }
        }
        $scope.save = function(Item) {
            var urlS = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
            var paramsS = {
                "operation": "batchWrite",
                "accessKeyId": "sdasda",
                "secretAccessKey": "asdsa",
                "sessionToken": "vhndi757Bydd",
                "RequestItems": {
                    "dazzle-gallery": [{
                        PutRequest: {
                            Item: Item
                        }
                    }]
                }
            };
            console.log(paramsS);
            $http.post(urlS, paramsS).then(function(result) {
                console.log("vvvv save 2");
                console.log(result);
                var pinTo = $scope.getToastPosition();
                $mdToast.show($mdToast.simple().textContent('已儲存').position(pinTo).hideDelay(3000));
                $scope.getTags().then(function(result) {
                    console.log("vvvv getT");
                    $scope.rootScope.tags = result.data;
                });
            });
        }*/
        $scope.selectType = function(type) {
            console.log("vvvv select");
            console.log(type);
            $scope.init(type);
        }
    });

    app.filter('toDDMMYY', function () {
        return function (input) {
            return moment(new Date(input)).format('DD/MM/YYYY HH:mm:ss');
        }
    });
    app.controller('buyRecordController', function ($scope, $http, $dazzleUser) {
        console.log('buyRecordController');
        $scope.inited = false;
        $scope.init = function () {
            $scope.gridOptions = {
                rowHeight: 45,
                animateRows: true,
                enableColResize: true,
                angularCompileRows: true,
                enableSorting: true,
                defaultColDef: {
                    editable: false,
                    filter: 'text'
                },
                columnDefs: [{
                    headerName: "交易ID",
                    field: "id",
                }, {
                    headerName: "購買金額",
                    field: "price",
                    filter: 'number'
                }, {
                    headerName: "購買時間",
                    field: "time",
                    cellRenderer: dateRenderer,
                    comparator: dateComparator,
                    filter: 'date',
                    filterParams: {
                        comparator: function (filterLocalDateAtMidnight, cellValue) {
                            var cellDate = new Date(cellValue).setHours(12, 0, 0, 0);
                            if (cellDate < filterLocalDateAtMidnight) {
                                return -1;
                            } else if (cellDate > filterLocalDateAtMidnight) {
                                return 1;
                            } else {
                                return 0;
                            }
                        }
                    }
                }, {
                    headerName: "購買類別",
                    field: "type"
                }, {
                    headerName: "項目ID",
                    field: "itemId"
                }],
                onGridReady: function () {
                    $scope.getBuyRecord().then(function (record) {
                        $scope.gridOptions.api.setRowData(record);
                        $scope.gridOptions.api.setSortModel([
                            {colId: 'time', sort: 'desc'}
                        ]);
                        $scope.gridOptions.api.refreshView();
                        $scope.inited = true;
                    });
                }
            };
        }
        $scope.getBuyRecord = function () {
            return new Promise(function (resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/transaction",
                    "data": {
                        "action": "getBuyRecordById",
                        "buyerId": $scope.user.uid
                    }
                }).then(function (result) {
                    if (result.data.code > 0) {
                        resolve(result.data.data);
                    } else {
                        resolve([]);
                    }
                })
            })
        }
    });
    app.directive('passwordVerify', function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, elem, attrs, ngModel) {
                if (!ngModel) return;
                scope.$watch(attrs.ngModel, function () {
                    validate();
                });
                attrs.$observe('passwordVerify', function (val) {
                    validate();
                });
                var validate = function () {
                    var val1 = ngModel.$viewValue;
                    var val2 = attrs.passwordVerify;
                    ngModel.$setValidity('passwordVerify', val1 === val2);
                };
            }
        }
    });
    app.controller('changePasswordController', function ($scope, $http, $dazzlePopup) {
        console.log('changePasswordController');
        $scope.submitForm = function (newPassword) {
            $http({
                "method": "post",
                "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/updateuser",
                "data": {
                    "uid": $scope.user.uid,
                    "user": $scope.user,
                    "action": "update",
                    "field": "password",
                    "value": newPassword
                }
            }).then(function (result) {
                if (result.data.code > 0) {
                    $dazzlePopup.alert('成功', '用戶密碼更新成功!').then(function () {
                        location.reload();
                    });
                } else {
                    $dazzlePopup.alert('失敗', result.data.text);
                }
            });
            $dazzlePopup.loading();
        }
    });
    app.controller('changeTagController', function ($scope, $http, $q, $mdDialog,$mdToast, rootScope) {
        $scope.checking = true;
        $scope.rootScope = rootScope; 
         $scope.init = function () {
            $scope.tags=[];
           
        }
         var last = {
          bottom: true,
          top: false,
          left: false,
          right: true
        };
        $scope.toastPosition = angular.extend({},last);
        $scope.getToastPosition = function() {
            sanitizePosition();

            return Object.keys($scope.toastPosition)
              .filter(function(pos) { return $scope.toastPosition[pos]; })
              .join(' ');
        };
         function sanitizePosition() {
            var current = $scope.toastPosition;

            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;

            last = angular.extend({},current);
        }

      $scope.cancel = function () {
        console.log("AAAA;;;A");
            $mdDialog.cancel();
        }
         $scope.tagClicked = function (tag) {
            console.log("vvvv tc1");
           
        }
        $scope.tagsChanged = function () {
            console.log("vvvv tc2");

        }
      $scope.save = function () {  
               $mdDialog.hide($scope.tags);
              
         
        }

      });
           var app = angular.module("demoApp");
        app.controller('deleteLoadPopupController', function($scope, $http, $filter, $mdDialog, $mdBottomSheet, $interval) {
    });
    app.controller('deleteTagController', function ($scope, $http, $q, $mdDialog,$mdToast, rootScope) {
        $scope.checking = true;
        $scope.rootScope = rootScope; 
         $scope.init = function () {
            $scope.tags=[];
           
        }
         var last = {
          bottom: true,
          top: false,
          left: false,
          right: true
        };
        $scope.toastPosition = angular.extend({},last);
        $scope.getToastPosition = function() {
            sanitizePosition();

            return Object.keys($scope.toastPosition)
              .filter(function(pos) { return $scope.toastPosition[pos]; })
              .join(' ');
        };
         function sanitizePosition() {
            var current = $scope.toastPosition;

            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;

            last = angular.extend({},current);
        }

      $scope.cancel = function () {
        console.log("AAAA;;;A");
            $mdDialog.cancel();
        }
         $scope.tagClicked = function (tag) {
            console.log("vvvv tc1");
           
        }
        $scope.tagsChanged = function () {
            console.log("vvvv tc2");

        }
      $scope.save = function () {  
               $mdDialog.hide($scope.tags);
              
         
        }

      });
       app.controller('detailController', function ($scope, $http, $dazzlePopup, $dazzleS3) {
        console.log('detailController');
        $scope.save = function () {
            console.log($scope.user);
            $http({
                "method": "post",
                "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/updateuser",
                "data": {
                    "uid": $scope.user.uid,
                    "user": $scope.user,
                    "action": "put"
                }
            }).then(function (result) {
                if (result.data.code > 0) {
                    $dazzlePopup.alert('成功', '用戶資料更新成功!').then(function () {
                        location.reload();
                    });
                } else {
                    $dazzlePopup.alert('失敗', result.data.text);
                }
            });
            $dazzlePopup.loading();
        }
        $scope.uploadIcon = function (file) {
            $scope.$apply(function () {
                $scope.user.userIcon = "https://dazzle-template.s3.amazonaws.com/cdn6.0/images/loading.gif";
            });
            $dazzleS3.saveImage($scope.user.uid, file).then(function (result) {
                setTimeout(function () {
                    $scope.user.userIcon = "https://designerrrr-output.s3-ap-northeast-1.amazonaws.com/images/" + $scope.user.uid + "/original/" + result.newFilename;
                    console.log("image url after upload: ", $scope.user.userIcon);
                    $scope.save();
                }, 1000);
            });
        }
    });
    app.controller('imgLoadPopupController', function($scope, $http, $filter, $mdDialog, $mdBottomSheet, $interval) {
        console.log("imgController");

        $scope.close = function(){
            console.log("vvvv whyyyy");
            $mdDialog.hide();
        }
    });
    app.controller('listWebsiteController', function ($scope, $http, $ocLazyLoad) {
        console.log('listWebsiteController');
    });

    app.controller('mainController', function ($scope) {
        console.log('mainController');
        document.location.href = "newindex.html#!/myWebsite";
    });
    Date.prototype.yyyymmdd = function() {
      var mm = this.getMonth() + 1; // getMonth() is zero-based
      var dd = this.getDate();

      return [this.getFullYear()+"年",
              mm+"月",
              dd+"日"
             ].join('');
    };

    String.prototype.trunc = String.prototype.trunc ||
          function(n){
              return (this.length > n) ? this.substr(0, n-1) + '...' : this;
          };

    app.controller('myDocController', function ($scope, $http, $filter, $mdDialog, $mdBottomSheet,$mdToast) {
        $scope.eachShowNum = 20;
        $scope.fileIcon = function(typee){
            var type = typee.toLowerCase();
            var theType;
            switch(type){
                case ".js":
                    theType = "http://dazzle-template.s3.amazonaws.com/cdn6.0/images/jsIcon.png";//js
                    break;
                case ".png": case ".jpg": case ".jpeg": case ".gif":
                    theType = "http://dazzle-template.s3.amazonaws.com/cdn6.0/images/imageIcon.png";//image
                    break;
                case ".csv":case ".xls": case ".xlsx":
                    theType = "http://dazzle-template.s3.amazonaws.com/cdn6.0/images/excelIcon.png";//excel
                    break;
                case ".zip": case".rar":
                    theType = "http://dazzle-template.s3.amazonaws.com/cdn6.0/images/zipIcon.png";//zip
                    break;
                case ".html":
                    theType = "http://dazzle-template.s3.amazonaws.com/cdn6.0/images/htmlIcon.png";//html
                    break;
                default:
                    theType = "http://dazzle-template.s3.amazonaws.com/cdn6.0/images/fileIcon.png";//other files
                    break;
            }
            return theType;
        }
        $scope.formatBytes = function(bytes) {
            if(bytes < 1024) return bytes + " Bytes";
            else if(bytes < 1048576) return(bytes / 1024).toFixed(2) + " KB";
            else if(bytes < 1073741824) return(bytes / 1048576).toFixed(2) + " MB";
            else return(bytes / 1073741824).toFixed(2) + " GB";
        };
        $scope.init = function () {
            console.log('myPhotosController');
            console.log($scope.user.uid);
            console.log(AWS.config);
            var s3 = new AWS.S3();
            var params = {
              Bucket: "dazzle-user-"+$scope.user.uid, /* required */
              Prefix: 'files/'
            };
            s3.listObjects(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else{
                    console.log("listObj");
                    console.log(data); 
                    data.Contents = data.Contents.reverse();
                    $scope.data = data;

                    //$scope.data.Contents.shift();
                    $scope.inited = false;
                    $scope.loading = true;
                    $scope.end = false;
                    $scope.tags = [];
                    $scope.websites = [];
                    $scope.LastEvaluatedKey = null;
                    $scope.websitesAngularGridOptions = {
                        gridWidth: 400,
                        gutterSize: 4,
                        infiniteScrollDelay: 1000,
                        infiniteScrollDistance: 95,
                        scrollContainer: '#sidecontent'
                    }
                    $scope.getWebsites($scope.eachShowNum,0).then(function (anArray) {
                        $scope.inited = true;
                        $scope.loading = false;
                        $scope.websites = $scope.websites.concat(anArray);
                        $scope.LastEvaluatedKey = $scope.eachShowNum;
                        console.log("vvvv $scope.websites");
                        console.log($scope.websites);
                    });
                }
            });
        }

        $scope.loadMore = function () {
            console.log("loadMore");
            if (!$scope.end && !$scope.loading) {
                $scope.loading = true;
                $scope.getWebsites($scope.eachShowNum, $scope.LastEvaluatedKey).then(function (anArray) {
                    $scope.loading = false;
                    if (anArray.length > 0 ) {
                        $scope.websites = $scope.websites.concat(anArray);
                        $scope.LastEvaluatedKey = $scope.LastEvaluatedKey+$scope.eachShowNum;
                    } else {
                        $scope.end = true;
                    }
                });
            }
        }
        $scope.getWebsites = function (limit, key) {
            return new Promise(function (resolve, reject) {
                console.log("getWebsites");
                var data = $scope.data;
                console.log(data);
                var anArray = [];
                var counter = 0;
                var s3 = new AWS.S3();
                if($scope.LastEvaluatedKey < data.Contents.length&&data.Contents.length - $scope.LastEvaluatedKey<$scope.eachShowNum){
                    console.log("if");
                    for(i=(0+key);i<data.Contents.length;i++){
                        var oobj = {};
                        oobj["name"] = data.Contents[i].Key.replace("files/","");
                        oobj["nameS"] = data.Contents[i].Key.replace("files/","").trunc(35);
                        oobj["size"] = $scope.formatBytes(data.Contents[i].Size);
                        oobj["date"] = data.Contents[i].LastModified.yyyymmdd();
                        oobj["icon"] = $scope.fileIcon(data.Contents[i].Key.substring(data.Contents[i].Key.lastIndexOf(".")));
                        anArray[counter]=oobj;
                        counter++;
                    }
                    if($scope.data.Contents.length<=$scope.eachShowNum){
                        console.log("endFirst");
                        $scope.end  = true;
                    }
                    $scope.endFirst = true;
                    console.log(anArray);
                    resolve(anArray);
                }else if ($scope.LastEvaluatedKey < data.Contents.length) {
                    console.log("else if");
                    for(i=(0+key);i<(limit+key);i++){
                        console.log("vvvv for");
                        console.log(data.Contents[i]);
                        console.log(data.Contents[i].Key);
                        var oobj = {};
                        oobj["name"] = data.Contents[i].Key.replace("files/","");
                        oobj["nameS"] = data.Contents[i].Key.replace("files/","").trunc(35);
                        oobj["size"] = $scope.formatBytes(data.Contents[i].Size);
                        oobj["date"] = data.Contents[i].LastModified.yyyymmdd();
                        oobj["icon"] = $scope.fileIcon(data.Contents[i].Key.substring(data.Contents[i].Key.lastIndexOf(".")));
                        anArray[counter]=oobj;
                        counter++;
                    }
                    console.log(anArray);
                    resolve(anArray);
                } else {
                    if($scope.websites.length==0){
                        console.log("vvvv first 0");
                        $scope.inited = true;
                        $scope.loading = false;
                        $scope.LastEvaluatedKey = 0;
                    }
                    $scope.end = true;
                    console.log("reject");
                    reject("end");
                }
            });
        }
        $scope.getImage = function (key) {
            var s3 = new AWS.S3();
            var params = {Bucket: "designerrrr-output", Key: key};
            var url = s3.getSignedUrl('getObject', params);
            console.log(url);
            return url;
        }


        //For toast popup use
        var last = {
          bottom: true,
          top: false,
          left: false,
          right: true
        };
        $scope.toastPosition = angular.extend({},last);
        $scope.getToastPosition = function() {
            sanitizePosition();

            return Object.keys($scope.toastPosition)
              .filter(function(pos) { return $scope.toastPosition[pos]; })
              .join(' ');
        };
        function sanitizePosition() {
            var current = $scope.toastPosition;

            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;

            last = angular.extend({},current);
        }
        // /For toast popup use

        
        $scope.showPhoto = function (website,index) {
            console.log(index);
            //console.log($scope.websites[index]);
            
            $mdDialog.show({
                controller: "showFileController",
                templateUrl: 'templates/showFile.html',
                escapeToClose: false,
                clickOutsideToClose: false,
                locals: {
                    website: website,
                    rootScope: $scope
                }
            }).then(function(objj) {
                console.log("vvvv showPhoto then");
                console.log(objj);
                if(objj.tORf){
                    var confirm = $mdDialog.confirm()
                      .title('刪除檔案')
                      .textContent('你真的要刪除此檔案嗎?')
                      .ariaLabel('Lucky day')
                      .ok('刪除')
                      .cancel('取消');

                    $mdDialog.show(confirm).then(function() {

                        //This part is for arrange the pictures after delete.
                        $scope.websites.splice(index,1);
                        setTimeout(function(){
                            var temp = $scope.websites.length;
                            console.log("vvvv thennnn7");
                            $scope.temp = temp;
                            $scope.websites = $scope.websites.concat(["https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png"]);
                        },1500);
                        setTimeout(function(){
                            console.log("vvvv 2000 thennnn7");
                            $scope.websites.splice($scope.temp,1);
                        },4000);
                        // /This part is for arrange the pictures after delete.

                        var url = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
                        var params = {
                            "operation": "delete",
                            "accessKeyId": "sdasda",
                            "secretAccessKey": "asdsa",
                            "sessionToken": "vhndi757Bydd",
                            "TableName": "dazzle-gallery", 
                            "Key": {
                                "gid": objj.id
                            }
                        }
                        $http.post(url, params).then(function (result) {
                            console.log("deleted");
                            console.log(result);
                            var pinTo = $scope.getToastPosition();
                            $mdToast.show(
                              $mdToast.simple()
                                .textContent('已刪除')
                                .position(pinTo )
                                .hideDelay(3000)
                            );
                        });
                        var s3 = new AWS.S3();
                         var paramsDel = {
                          Bucket: "designerrrr-output", 
                          Delete: {
                           Objects: [
                              {
                             Key: "images/"+ $scope.user.uid+"/large/"+objj.id+".jpg"
                              }, 
                              {
                             Key: "images/"+ $scope.user.uid+"/large-web/"+objj.id+".jpg"
                              },
                              {
                             Key: "images/"+ $scope.user.uid+"/medium/"+objj.id+".jpg"
                              }, 
                              {
                             Key: "images/"+ $scope.user.uid+"/medium-web/"+objj.id+".jpg"
                              },      
                              {
                             Key: "images/"+ $scope.user.uid+"/small/"+objj.id+".jpg"
                              },  
                              {
                             Key: "images/"+ $scope.user.uid+"/small-web/"+objj.id+".jpg"
                              },  
                              {
                             Key: "images/"+ $scope.user.uid+"/thumbnail/"+objj.id+".jpg"
                              },                 
                              {
                             Key: "images/"+ $scope.user.uid+"/thumbnail-web/"+objj.id+".jpg"
                              },
                              {
                             Key: "images/"+ $scope.user.uid+"/original/"+objj.id+objj.type
                              }                      
                           ], 
                           Quiet: false
                          }
                         };
                         s3.deleteObjects(paramsDel, function(err, data) {
                            if(err){
                                console.log("s3 fail");
                                console.log(err);
                            }else{
                                console.log("delete from s3 successful");
                                console.log(data);
                                console.log($scope.websites);
                                //$scope.init();
                                
                                /*for(i=0;i<$scope.websites.length;i++){
                                    if($scope.websites[i].indexOf(objj.id)!=-1){
                                        console.log("splice ok");
                                        $scope.websites.splice(i,1);
                                    }
                                }
                                console.log($scope.websites);*/
                            }
                        });
                    }, function() {
                    });
                }
            });
        }
        $scope.upload = function() {
            console.log("vvvv upload");
            console.log($scope.user);
            
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'templates/uploadDoc.html',
                controller: 'uploadDocController',
                clickOutsideToClose: false,
                disableParentScroll: false,
                locals: {
                    bucket: "designerrrr-output",
                    key: 'images/'+$scope.user.uid+'/medium-web/',
                    rootScope:$scope
                }
            }).then(function(uploadedFiles) {
                console.log("vvvv then");
                console.log(uploadedFiles);
                var newItemArray = [];
                console.log("vvvv md dialog");
                if(uploadedFiles.length!=0){ 
                    var countt = 0;
                    for(i=0;i<uploadedFiles.length;i++){
                        var found = $scope.websites.some(function (el) {
                          return el.name === uploadedFiles[i].upload.body.name;
                        });
                        if (!found) {
                            console.log("not found!");
                            var objo = {};
                            objo["name"]=uploadedFiles[i].upload.body.name;
                            objo["nameS"]=uploadedFiles[i].upload.body.name.trunc(35);
                            objo["size"]=$scope.formatBytes(uploadedFiles[i].upload.body.size);
                            objo["date"]=moment(uploadedFiles[i].upload.body.LastModifiedDate).format('L');
                            objo["icon"]=$scope.fileIcon(uploadedFiles[i].upload.body.name.substring(uploadedFiles[i].upload.body.name.lastIndexOf(".")));
                            newItemArray[countt] = objo;
                            countt++;
                        }else{
                            console.log("found!");
                        }
                    }
                    console.log(newItemArray);
                    $scope.websites = newItemArray.concat($scope.websites);
                }
                //$scope.websites.concat(uploadedFiles);
            }).catch(function(error) {
              // User clicked outside or hit escape
            });
        };
    });
    app.controller('myPhotosController', function($scope, $http, $filter, $mdDialog, $mdBottomSheet, $mdToast) {
        console.log("vvvv vvvv 9");
        var QueryString = function() {
            // This function is anonymous, is executed immediately and 
            // the return value is assigned to QueryString!
            var query_string = {};
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                // If first entry with this name
                if (typeof query_string[pair[0]] === "undefined") {
                    query_string[pair[0]] = decodeURIComponent(pair[1]);
                    // If second entry with this name
                } else if (typeof query_string[pair[0]] === "string") {
                    var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                    query_string[pair[0]] = arr;
                    // If third or later entry with this name
                } else {
                    query_string[pair[0]].push(decodeURIComponent(pair[1]));
                }
            }

            return query_string;
        }();
        console.log(QueryString);
        console.log("vvvv qs type whyyyy2");
        $scope.eachShowNum = 500;


        $scope.init = function() {
            //$scope.$apply(function(){
            $scope.type = QueryString.type;
            $scope.allNewArray = [];
            $scope.deleting = false;
            $scope.loading = true;
            $scope.end = false;
            $scope.tags = [];
            $scope.selected = [];
            $scope.selecting = false;
            $scope.deletedURL = [];
            $scope.selectedTags = [];
            $scope.LastEvaluatedKey = null;
            $scope.websitesAngularGridOptions = {
                gridWidth: 200,
                gutterSize: 4,
                infiniteScrollDelay: 1000,
                infiniteScrollDistance: 95,
                scrollContainer: '#sidecontent'
            }
            $scope.inited = false;
            $scope.websites = [];
            //});
            switch ($scope.type) {
                case "相片":
                    console.log("vvvv 相片");
                    $scope.px = 'images/' + $scope.user.uid + '/medium-web/';
                    $scope.nowType = ".jpg";
                    break;
                case "插畫":
                    console.log("vvvv 插畫");
                    $scope.px = 'illustration/' + $scope.user.uid + '/png/';
                    $scope.nowType = ".png";
                    break;
            }
            /*
            console.log('myPhotosController');
            console.log($scope.user.uid);
            console.log(AWS.config);
            var s3 = new AWS.S3();
            var params = {
                Bucket: "designerrrr-output",
                // required 
                Prefix: $scope.px
            };
            s3.listObjects(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else {
                    console.log("listObj");
                    console.log(data);
                    data.Contents = data.Contents.reverse();
                    $scope.data = data;
                    $scope.getTags().then(function(result) {
                        $scope.tags = result.data;
                    });
                    $scope.getWebsites($scope.eachShowNum, 0).then(function(anArray) {
                        $scope.$apply(function() {
                            $scope.inited = true;
                            $scope.loading = false;
                            $scope.websites = $scope.websites.concat(anArray);
                            $scope.LastEvaluatedKey = $scope.eachShowNum;
                            console.log("vvvv $scope.websites");
                            console.log($scope.websites);
                        });
                    });
                }
            });*/



            $scope.getItemsById().then(function(result) {
                console.log("vvvv new db");
                console.log(result);
                $scope.getTags().then(function(result) {
                    $scope.tags = result.data;
                });
                $scope.$apply(function() {
                    $scope.inited = true;
                    $scope.loading = false;
                    var tempArray = [];
                    var s3 = new AWS.S3();
                    for (i = 0; i < result.length; i++) {
                        var theID = result[i]._source.gid;
                        console.log("vvvv newDB");
                        console.log(theID);
                        switch ($scope.type) {
                            case "相片":
                                console.log("vvvv 相片 2");
                                var theLink = "images/" + $scope.user.uid + "/medium-web/" + theID + ".jpg"
                                break;
                            case "插畫":
                                console.log("vvvv 插畫 2");
                                var theLink = "illustration/" + $scope.user.uid + "/png/" + theID + ".png"
                                break;
                        }
                        console.log(theLink);
                        var params = {
                            Bucket: "designerrrr-output",
                            Key: theLink
                        };
                        var url = s3.getSignedUrl('getObject', params);
                        tempArray.push(url);
                    }
                    $scope.websites = $scope.websites.concat(tempArray);
                    console.log("vvvv $scope.websites");
                    console.log($scope.websites);
                    $scope.newNowPosition = 500;
                });
            });


        }
        $scope.getItemsById = function() {
            return new Promise(function(resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://9g1gx9kfdc.execute-api.ap-northeast-1.amazonaws.com/dazzlegallery/getid",
                    "data": {
                        "action": "byowner",
                        "owner_id": $scope.user.uid,
                        "type": $scope.type
                    }
                }).then(function(result) {
                    console.log('Get ID', result);
                    var anArray = [];
                    if (result.data.data.length > 0) {
                        resolve(result.data.data);
                    } else
                        resolve([]);
                });
            });
        }
        $scope.tagClicked = function(tag) {
            console.log("vvvv tc1");
            $scope.selectedTags = [];
            $scope.selectedTags.push(tag);
            $scope.tagsChanged();
        }
        $scope.tagsChanged = function() {
            console.log("vvvv tc2");
            $scope.loading = true;
            $scope.end = false;
            $scope.LastEvaluatedKey = null;
            $scope.websites = [];
            if ($scope.selectedTags.length <= 0) {
                $scope.getWebsites($scope.eachShowNum, 0).then(function(anArray) {
                    $scope.$apply(function() {
                        $scope.loading = false;
                        anArray = $scope.allNewArray.concat(anArray);
                        $scope.websites = $scope.websites.concat(anArray);
                        $scope.LastEvaluatedKey = $scope.eachShowNum;
                    });
                });
            } else {
                var uniArray = [];
                var done = [];
                for (var i = 0; i < $scope.selectedTags.length; i++) {
                    $scope.getWebsitesByTag($scope.selectedTags[i]).then(function(anArray) {
                        $scope.$apply(function() {
                            uniArray = uniArray.concat(anArray);
                            done.push({});
                            if (done.length == $scope.selectedTags.length) {
                                uniArray = uniArray.filter(function(elem, pos) {
                                    return uniArray.indexOf(elem) == pos;
                                });
                                $scope.websites = $scope.websites.concat(uniArray);
                                console.log($scope.websites);
                            }
                        });
                    });
                }
                $scope.loading = false;
                $scope.end = true;
            }
        }
        $scope.queryTags = function(query) {
            console.log(query);
            return $filter('filter')(angular.lowercase($scope.tags), angular.lowercase(query));
        }
        $scope.getTags = function() {
            return new Promise(function(resolve, reject) {
                var data = {};
                data.userName = $scope.user.uid;
                data.type = $scope.type;
                console.log("vvvv whyyyyyy 323232");
                console.log($scope.user.uid);
                $http({
                    "method": "post",
                    "url": "https://9g1gx9kfdc.execute-api.ap-northeast-1.amazonaws.com/dazzlegallery/gettags",
                    "data": data
                }).then(function(result) {
                    console.log("vvvv getTag");
                    console.log(result);
                    if (result.data.code > 0) {
                        resolve(result.data);
                    } else {
                        reject(result.data.text);
                    }
                })
            })
        }
        $scope.getWebsitesByTag = function(tag) {
            return new Promise(function(resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://9g1gx9kfdc.execute-api.ap-northeast-1.amazonaws.com/dazzlegallery/getid",
                    "data": {
                        "tag": tag,
                        "action": "bytag",
                        "owner_id": $scope.user.uid,
                        "type": $scope.type
                    }
                }).then(function(result) {
                    console.log(result);
                    if (result.data.code > 0) {
                        var s3 = new AWS.S3();
                        var anArray = [];
                        for (i = 0; i < result.data.data.length; i++) {
                            var theID = result.data.data[i].gid;
                            switch ($scope.type) {
                                case "相片":
                                    console.log("vvvv 相片 2");
                                    var theLink = "images/" + $scope.user.uid + "/medium-web/" + theID + ".jpg"
                                    break;
                                case "插畫":
                                    console.log("vvvv 插畫 2");
                                    var theLink = "illustration/" + $scope.user.uid + "/png/" + theID + ".png"
                                    break;
                            }
                            var params = {
                                Bucket: "designerrrr-output",
                                Key: theLink
                            };
                            var url = s3.getSignedUrl('getObject', params);
                            anArray[i] = url;
                        }
                        console.log(anArray);
                        resolve(anArray);
                    } else {
                        resolve([]);
                    }
                });
            });
        }
        $scope.loadMore = function() {
            console.log("loadMore");
            if (!$scope.end && !$scope.loading) {
                $scope.loading = true;
                $scope.getWebsites($scope.eachShowNum, $scope.LastEvaluatedKey).then(function(anArray) {
                    $scope.loading = false;
                    if (anArray.length > 0) {
                        $scope.websites = $scope.websites.concat(anArray);
                        $scope.LastEvaluatedKey = $scope.LastEvaluatedKey + $scope.eachShowNum;
                    } else {
                        $scope.end = true;
                    }
                });
            }
        }
        $scope.getWebsites = function(limit, key) {
            return new Promise(function(resolve, reject) {
                console.log("getWebsites");
                var data = $scope.data;
                console.log(data);
                var anArray = [];
                var counter = 0;
                var s3 = new AWS.S3();
                if ($scope.LastEvaluatedKey < data.Contents.length && data.Contents.length - $scope.LastEvaluatedKey < $scope.eachShowNum) { //show photo when unshow photo less than 50
                    console.log("if");
                    for (i = (0 + key); i < data.Contents.length; i++) {
                        var checkID = data.Contents[i].Key.substring(data.Contents[i].Key.lastIndexOf("/") + 1).replace($scope.nowType, "");
                        var notLoad = false;
                        for (j = 0; j < $scope.deletedURL.length; j++) {
                            if ($scope.deletedURL[j] == checkID) {
                                notLoad = true;
                            }
                        }
                        if (notLoad) {
                            //found a invalid url
                        } else {
                            var params = {
                                Bucket: "designerrrr-output",
                                Key: data.Contents[i].Key
                            };
                            var url = s3.getSignedUrl('getObject', params);
                            anArray[counter] = url;
                            counter++;
                        }
                    }
                    if ($scope.data.Contents.length <= $scope.eachShowNum) {
                        console.log("endFirst");
                        $scope.end = true;
                    }
                    console.log(anArray);
                    resolve(anArray);
                } else if ($scope.LastEvaluatedKey < data.Contents.length) {
                    console.log("else if");
                    for (i = (0 + key); i < (limit + key); i++) {
                        console.log("vvvv for");
                        console.log(data.Contents[i]);
                        console.log(data.Contents[i].Key);
                        var checkID = data.Contents[i].Key.substring(data.Contents[i].Key.lastIndexOf("/") + 1).replace($scope.nowType, "");
                        console.log("vvvv checkID");
                        console.log(checkID);
                        var notLoad = false;
                        for (j = 0; j < $scope.deletedURL.length; j++) {
                            if ($scope.deletedURL[j] == checkID) {
                                notLoad = true;
                            }
                        }
                        if (notLoad) {
                            console.log("dead img found");
                        } else {
                            console.log("dead img else");
                            var params = {
                                Bucket: "designerrrr-output",
                                Key: data.Contents[i].Key
                            };
                            var url = s3.getSignedUrl('getObject', params);
                            anArray[counter] = url;
                            counter++;
                        }
                    }
                    console.log(anArray);
                    resolve(anArray);
                } else {
                    if ($scope.websites.length == 0) {
                        console.log("vvvv first 0");
                        $scope.inited = true;
                        $scope.loading = false;
                        $scope.LastEvaluatedKey = 0;
                    }
                    $scope.end = true;
                    console.log("reject");
                    reject("end");
                }
            });
        }
        $scope.getImage = function(key) {
            var s3 = new AWS.S3();
            var params = {
                Bucket: "designerrrr-output",
                Key: key
            };
            var url = s3.getSignedUrl('getObject', params);
            console.log(url);
            return url;
        }
        //For toast popup use
        var last = {
            bottom: true,
            top: false,
            left: false,
            right: true
        };
        $scope.toastPosition = angular.extend({}, last);
        $scope.getToastPosition = function() {
            sanitizePosition();
            return Object.keys($scope.toastPosition).filter(function(pos) {
                return $scope.toastPosition[pos];
            }).join(' ');
        };

        function sanitizePosition() {
            var current = $scope.toastPosition;
            if (current.bottom && last.top) current.top = false;
            if (current.top && last.bottom) current.bottom = false;
            if (current.right && last.left) current.left = false;
            if (current.left && last.right) current.right = false;
            last = angular.extend({}, current);
        }
        // /For toast popup use
        $scope.showPhoto = function(website, index) {
            //尋日做到show photo,要改show photo.js showPhoto.html d type 同 url2017 7 26
            console.log(index);
            //console.log($scope.websites[index]);
            $mdDialog.show({
                controller: "showPhotoController",
                templateUrl: 'templates/showPhoto.html',
                escapeToClose: false,
                clickOutsideToClose: false,
                locals: {
                    website: website,
                    rootScope: $scope,
                    bought: false,
                    sold: false
                }
            }).then(function(objj) {
                console.log("vvvv showPhoto then");
                console.log(objj);
                if (objj.tORf) {
                    var confirm = $mdDialog.confirm().title('刪除圖片').textContent('你真的要刪除此圖片嗎?').ariaLabel('Lucky day').ok('刪除').cancel('取消');
                    $mdDialog.show(confirm).then(function() {
                        $scope.selected = [];
                        $scope.deleting = true;
                        var delID = $scope.websites[index].substring(0, $scope.websites[index].indexOf($scope.nowType + "?AWSAccessKeyId")).replace($scope.nowType + "?AWSAccessKeyId", "");
                        console.log(delID);
                        delID = delID.substring(delID.lastIndexOf("/") + 1);
                        console.log(delID);
                        $scope.deletedURL.push(delID);
                        console.log("vvvv dellll");
                        console.log(delID);
                        console.log(objj.id);
                        console.log($scope.deletedURL);
                        //This part is for a special case that user delete the photo just upload in same page
                        for (i = 0; i < $scope.allNewArray.length; i++) {
                            console.log($scope.allNewArray[i]);
                            console.log($scope.websites[index]);
                            if ($scope.allNewArray[i] === $scope.websites[index]) {
                                console.log("same!");
                                $scope.allNewArray.splice(i, 1);
                            }
                        }
                        //This part is for arrange the pictures after delete.
                        $scope.websites.splice(index, 1);
                        setTimeout(function() {
                            var temp = $scope.websites.length;
                            console.log("vvvv thennnn7");
                            $scope.temp = temp;
                            $scope.websites = $scope.websites.concat(["https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png"]);
                        }, 1500);
                        setTimeout(function() {
                            console.log("vvvv 2000 thennnn7");
                            $scope.websites.splice($scope.temp, 1);
                            $scope.deleting = false;
                        }, 4000);
                        // /This part is for arrange the pictures after delete.
                        var url = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/hohopost-user-newdb";
                        var params = {
                            "operation": "delete",
                            "index": "gallery",
                            "type":"table",
                            "id": objj.id
                        }
                        $http.post(url, params).then(function(result) {
                            console.log("deleted");
                            console.log(result);
                            var pinTo = $scope.getToastPosition();
                            $scope.getTags().then(function(result) {
                                $scope.tags = result.data;
                            });
                            $mdToast.show($mdToast.simple().textContent('已刪除').position(pinTo).hideDelay(3000));
                        });
                        var s3 = new AWS.S3();
                        switch ($scope.type) {
                            case "相片":
                                console.log("vvvv 相片 3");
                                var diffObj = [{
                                    Key: "images/" + $scope.user.uid + "/large/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/large-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/medium/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/medium-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/small/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/small-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/thumbnail/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/thumbnail-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/original/" + objj.id + objj.type
                                }];
                                break;
                            case "插畫":
                                console.log("vvvv 插畫 3");
                                var diffObj = [{
                                    Key: "illustration/" + $scope.user.uid + "/eps/" + objj.id + ".eps"
                                }, {
                                    Key: "illustration/" + $scope.user.uid + "/svg/" + objj.id + ".svg"
                                }, {
                                    Key: "illustration/" + $scope.user.uid + "/png/" + objj.id + ".png"
                                }];
                                break;
                        }

                        var paramsDel = {
                            Bucket: "designerrrr-output",
                            Delete: {
                                Objects: diffObj,
                                Quiet: false
                            }
                        };
                        s3.deleteObjects(paramsDel, function(err, data) {
                            if (err) {
                                console.log("s3 fail");
                                console.log(err);
                            } else {
                                console.log("delete from s3 successful");
                                console.log(data);
                                console.log($scope.websites);
                                //$scope.init();
                                /*for(i=0;i<$scope.websites.length;i++){
                                    if($scope.websites[i].indexOf(objj.id)!=-1){
                                        console.log("splice ok");
                                        $scope.websites.splice(i,1);
                                    }
                                }
                                console.log($scope.websites);*/
                            }
                        });
                    }, function() {});
                }
            });
        }
        $scope.toggle = function(item, list) {
            console.log(item);
            var idx = list.indexOf(item);
            console.log(idx);
            if (idx > -1) {
                list.splice(idx, 1);
            } else {
                list.push(item);
            }
        };
        $scope.toggleAll = function(item) {
            if ($scope.selected.length === $scope.websites.length) {
                $scope.selected = [];
            } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
                $scope.selected = $scope.websites.slice(0);
            }
        }
        $scope.exists = function(item, list) {
            return list.indexOf(item) > -1;
        };
        $scope.select = function() {
            $scope.selecting = true;
        }
        $scope.selectCancel = function() {
            $scope.selected = [];
            $scope.selecting = false;
        }
        $scope.deleteAll = function(website) {
            if ($scope.selected.length != 0) {
                if ($scope.selected.length > 1000) {
                    var pinTo = $scope.getToastPosition();
                    $mdToast.show($mdToast.simple().textContent('不可刪除多於1000項').position(pinTo).hideDelay(3000));
                    return;
                }
                var allID = [];
                console.log($scope.selected);
                $scope.deleteAllCount = 0;
                $scope.deleteAllLength = angular.copy($scope.selected.length);
                for (i = 0; i < $scope.selected.length; i++) {
                    allID[i] = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId")).substring($scope.selected[i].lastIndexOf("/") + 1).replace($scope.nowType, "");
                }
                console.log(allID);
                var confirm = $mdDialog.confirm().title('刪除圖片').textContent('你真的要刪除' + $scope.selected.length + '張圖片嗎?').ariaLabel('Lucky day').ok('刪除').cancel('取消');
                $mdDialog.show(confirm).then(function() {
                    $mdDialog.show({
                        controller: 'deleteLoadPopupController',
                        templateUrl: 'templates/deleteLoadPopup.html',
                        clickOutsideToClose: false,
                        fullscreen: false, // Only for -xs, -sm breakpoints.
                        locals: {}
                    })
                    switch ($scope.type) {
                        case "相片":
                            var url = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/batchgettype";
                            var params = {
                                "allID": allID
                            }
                            $http.post(url, params).then(function(result) {
                                console.log("vvvv batch type");
                                console.log(result);
                                var obj = result.data;

                                function todo(i) {
                                    if (i == allID.length) {
                                        $mdDialog.hide();
                                        console.log("loop fin");
                                        $scope.selectCancel();
                                        return;
                                    }
                                    console.log("vvvv delete start");
                                    console.log($scope.websites.indexOf($scope.selected[i]));
                                    console.log(obj[allID[i]]);
                                    $scope.executeDelete(allID[i], $scope.websites.indexOf($scope.selected[i]), obj[allID[i]]).then(function(result) {
                                        console.log("loop" + i);
                                        console.log(result);
                                        i++;
                                        todo(i);
                                    });
                                }
                                todo(0);
                            });
                            break;
                        case "插畫":
                            console.log("vvvv delete start");
                            console.log($scope.websites.indexOf($scope.selected[i]));

                            function todo(i) {
                                if (i == allID.length) {
                                    $mdDialog.hide();
                                    console.log("loop fin");
                                    $scope.selectCancel();
                                    return;
                                }
                                $scope.executeDelete(allID[i], $scope.websites.indexOf($scope.selected[i]), null).then(function(result) {
                                    console.log("loop" + i);
                                    console.log(result);
                                    i++;
                                    todo(i);
                                });
                            }
                            todo(0);
                            break;
                    }
                });
            } else {
                var pinTo = $scope.getToastPosition();
                $mdToast.show($mdToast.simple().textContent('請選擇項目').position(pinTo).hideDelay(3000));
            }
        }
        $scope.executeDelete = function(delID, index, ttype) {
            return new Promise(function(resolve, reject) {
                console.log(delID);
                $scope.deleteAllCount++;
                $scope.deleting = true;
                $scope.deletedURL.push(delID);
                console.log("vvvv dellll");
                console.log($scope.deletedURL);
                //This part is for a special case that user delete the photo just upload in same page
                for (i = 0; i < $scope.allNewArray.length; i++) {
                    console.log($scope.allNewArray[i]);
                    console.log($scope.websites[index]);
                    if ($scope.allNewArray[i] === $scope.websites[index]) {
                        console.log("same!");
                        $scope.allNewArray.splice(i, 1);
                    }
                }
                var url = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/hohopost-user-newdb";
                var params = {
                    "operation": "delete",
                    "index": "gallery",
                    "type":"table",
                    "id": delID
                }
                $http.post(url, params).then(function(result) {
                    console.log("deleted");
                    console.log(result);
                    var pinTo = $scope.getToastPosition();
                    $scope.getTags().then(function(result) {
                        $scope.tags = result.data;
                    });
                });
                var s3 = new AWS.S3();
                switch ($scope.type) {
                    case "相片":
                        console.log("vvvv 相片 3");
                        var diffObj = [{
                            Key: "images/" + $scope.user.uid + "/large/" + delID + ".jpg"
                        }, {
                            Key: "images/" + $scope.user.uid + "/large-web/" + delID + ".jpg"
                        }, {
                            Key: "images/" + $scope.user.uid + "/medium/" + delID + ".jpg"
                        }, {
                            Key: "images/" + $scope.user.uid + "/medium-web/" + delID + ".jpg"
                        }, {
                            Key: "images/" + $scope.user.uid + "/small/" + delID + ".jpg"
                        }, {
                            Key: "images/" + $scope.user.uid + "/small-web/" + delID + ".jpg"
                        }, {
                            Key: "images/" + $scope.user.uid + "/thumbnail/" + delID + ".jpg"
                        }, {
                            Key: "images/" + $scope.user.uid + "/thumbnail-web/" + delID + ".jpg"
                        }, {
                            Key: "images/" + $scope.user.uid + "/original/" + delID + ttype
                        }];
                        break;
                    case "插畫":
                        console.log("vvvv 插畫 3");
                        var diffObj = [{
                            Key: "illustration/" + $scope.user.uid + "/eps/" + delID + ".eps"
                        }, {
                            Key: "illustration/" + $scope.user.uid + "/svg/" + delID + ".svg"
                        }, {
                            Key: "illustration/" + $scope.user.uid + "/png/" + delID + ".png"
                        }];
                        break;
                }

                var paramsDel = {
                    Bucket: "designerrrr-output",
                    Delete: {
                        Objects: diffObj,
                        Quiet: false
                    }
                };
                s3.deleteObjects(paramsDel, function(err, data) {
                    if (err) {
                        console.log("s3 fail");
                        console.log(err);
                        resolve("err");
                    } else {
                        console.log("delete from s3 successful");
                        console.log(data);
                        console.log($scope.websites);
                        //This part is for arrange the pictures after delete.
                        $scope.websites.splice(index, 1);
                        if ($scope.deleteAllCount == $scope.deleteAllLength) {
                            setTimeout(function() {
                                var temp = $scope.websites.length;
                                console.log("vvvv thennnn7");
                                $scope.temp = temp;
                                $scope.websites = $scope.websites.concat(["https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png"]);
                            }, 1500);
                            setTimeout(function() {
                                console.log("vvvv 2000 thennnn7");
                                $scope.websites.splice($scope.temp, 1);
                                $scope.deleting = false;
                            }, 4000);
                            var pinTo = $scope.getToastPosition();
                            $mdToast.show($mdToast.simple().textContent('已刪除').position(pinTo).hideDelay(3000));
                        }
                        // /This part is for arrange the pictures after delete.
                        resolve("ok");
                        //$scope.init();
                        /*for(i=0;i<$scope.websites.length;i++){
                            if($scope.websites[i].indexOf(objj.id)!=-1){
                                console.log("splice ok");
                                $scope.websites.splice(i,1);
                            }
                        }
                        console.log($scope.websites);*/
                    }
                });
            });
        }
        $scope.downloadAll = function() {
            if ($scope.selected.length != 0) {
                var allID = [];
                console.log($scope.selected);
                for (i = 0; i < $scope.selected.length; i++) {
                    allID[i] = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId")).substring($scope.selected[i].lastIndexOf("/") + 1).replace($scope.nowType, "");
                }
                console.log(allID);
                $mdDialog.show({
                    controller: "batchDownloadPopupController",
                    templateUrl: 'templates/batchDownloadPopup.html',
                    escapeToClose: false,
                    clickOutsideToClose: false,
                    locals: {
                        allID: allID,
                        type: $scope.type
                    }
                }).then(function() {});
            } else {
                var pinTo = $scope.getToastPosition();
                $mdToast.show($mdToast.simple().textContent('請選擇項目').position(pinTo).hideDelay(3000));
            }
        }
        $scope.upload = function() {
            console.log("vvvv upload");
            console.log($scope.user);
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'templates/upload.html',
                controller: 'uploadController',
                clickOutsideToClose: false,
                disableParentScroll: false,
                locals: {
                    bucket: "designerrrr-output",
                    key: $scope.px,
                    rootScope: $scope
                }
            }).then(function() {
                /*
                $scope.getTags().then(function(result) {
                    $scope.tags = result.data;
                });
                console.log("vvvv then");
                console.log(uploadedFiles);
                var newItemArray = [];
                console.log("vvvv md dialog");
                if (uploadedFiles.length != 0) {
                    for (i = 0; i < uploadedFiles.length; i++) {
                        newItemArray[i] = $scope.getImage(uploadedFiles[i].path);
                    }
                    console.log(newItemArray);
                    if ($scope.allNewArray.length == 0) {
                        $scope.allNewArray = newItemArray;
                    } else {
                        $scope.allNewArray = newItemArray.concat($scope.allNewArray);
                    }
                    $scope.websites = newItemArray.concat($scope.websites);
                }*/
                //$scope.websites.concat(uploadedFiles);
            }).catch(function(error) {
                // User clicked outside or hit escape 
            });
        };
        $scope.uploadWatermark = function() {
            console.log("vvvv uploadWatermark");
            console.log($scope.user);
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'templates/uploadWatermark.html',
                controller: 'uploadWatermarkController',
                clickOutsideToClose: false,
                disableParentScroll: false,
                locals: {
                    bucket: "designerrrr",
                    key: $scope.px,
                    rootScope: $scope
                }
            }).then(function(uploadedFiles) {
                if (uploadedFiles == "ok") {
                    console.log("okkkkkkkkWater");
                    var pinTo = $scope.getToastPosition();
                    $mdToast.show($mdToast.simple().textContent('已儲存自訂水印，請於上傳時開啟自訂水印模式').position(pinTo).hideDelay(5000));
                }
                //$scope.websites.concat(uploadedFiles);
            }).catch(function(error) {
                // User clicked outside or hit escape 
            });
        };
        $scope.deleteTagsAll = function() {
            if ($scope.selected.length != 0) {
                console.log("vvvv avatar");
                //console.log($scope.websites[index]);
                $mdDialog.show({
                    controller: "deleteTagController",
                    templateUrl: 'templates/deleteTag.html',
                    escapeToClose: false,
                    clickOutsideToClose: false,
                    locals: {
                        rootScope: $scope
                    }
                }).then(function(tagNeedToBeDeleted) {
                    console.log(tagNeedToBeDeleted);
                    console.log($scope.selected);
                    $scope.deleteAllTagtoPhoto(tagNeedToBeDeleted);
                });
            } else {
                var pinTo = $scope.getToastPosition();
                $mdToast.show($mdToast.simple().textContent('請選擇項目').position(pinTo).hideDelay(3000));
            }
        }
        $scope.changeTagsAll = function() {
            if ($scope.selected.length != 0) {
                console.log("AAAA");
                //console.log($scope.websites[index]);
                $mdDialog.show({
                    controller: "changeTagController",
                    templateUrl: 'templates/changeTag.html',
                    escapeToClose: false,
                    clickOutsideToClose: false,
                    locals: {
                        rootScope: $scope
                    }
                }).then(function(tagNeedToBeAdded) {
                    console.log($scope.selected);
                    $scope.saveAllTagtoPhoto(tagNeedToBeAdded);
                });
            } else {
                var pinTo = $scope.getToastPosition();
                $mdToast.show($mdToast.simple().textContent('請選擇項目').position(pinTo).hideDelay(3000));
            }
        }
        $scope.saveAllTagtoPhoto = function(SelectedTag) {
            console.log("AAAAA");
            if (SelectedTag.length != 0) {
                console.log("vvvv have tag");
                $scope.saveAllTagCount = 0;
                $scope.saveAllTagLength = angular.copy($scope.selected.length);
                for (i = 0; i < $scope.selected.length; i++) {
                    var thisPhotoId = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId"));
                    thisPhotoId = thisPhotoId.substring(thisPhotoId.lastIndexOf("/") + 1);
                    thisPhotoId = thisPhotoId.substring(0, thisPhotoId.lastIndexOf("."));
                    console.log(thisPhotoId);
                    var url = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/hohopost-user-newdb";
                    var params = {
                        "operation": "get",
                        "index": "gallery",
                        "type":"table",
                        "id": thisPhotoId
                    }
                    $http.post(url, params).then(function(result) {
                        console.log("db successful");
                        console.log(result);
                        $scope.checking = false;
                        $scope.tags = result._source.tags;
                        console.log($scope.tags);
                        for (i = 0; i < SelectedTag.length; i++) {
                            $scope.tags.push(SelectedTag[i]);
                        }
                        console.log($scope.tags);
                        $scope.tags = $scope.tags.filter(function(elem, pos) {
                            return $scope.tags.indexOf(elem) == pos;
                        })
                        console.log($scope.tags);
                        result._source.tags = $scope.tags;
                        $scope.save(result._source);
                    })
                }
            }
        }
        $scope.deleteAllTagtoPhoto = function(SelectedTag) {
            console.log("vvvv delete");
            if (SelectedTag.length != 0) {
                console.log("vvvv have tag");
                $scope.saveAllTagCount = 0;
                $scope.saveAllTagLength = angular.copy($scope.selected.length);
                for (i = 0; i < $scope.selected.length; i++) {
                    var thisPhotoId = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId"));
                    thisPhotoId = thisPhotoId.substring(thisPhotoId.lastIndexOf("/") + 1);
                    thisPhotoId = thisPhotoId.substring(0, thisPhotoId.lastIndexOf("."));
                    console.log(thisPhotoId);
                    var url = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/hohopost-user-newdb";
                    var params = {
                        "operation": "get",
                        "index": "gallery",
                        "type":"table",
                        "id": thisPhotoId
                    }
                    $http.post(url, params).then(function(result) {
                        console.log("db successful");
                        console.log(result);
                        $scope.checking = false;
                        $scope.tags = result._source.tags;
                        console.log($scope.tags);
                        for (i = 0; i < SelectedTag.length; i++) {
                            if ($scope.tags.indexOf(SelectedTag[i]) != -1) {
                                console.log("vvvv delete if");
                                console.log($scope.tags.indexOf(SelectedTag[i]));
                                $scope.tags.splice($scope.tags.indexOf(SelectedTag[i]), 1);
                            }
                        }
                        console.log($scope.tags);
                        $scope.tags = $scope.tags.filter(function(elem, pos) {
                            return $scope.tags.indexOf(elem) == pos;
                        })
                        console.log($scope.tags);
                        result._source.tags = $scope.tags;
                        $scope.save(result._source);
                    })
                }
            }
        }
        $scope.save = function(Item) {
            console.log(Item);
            /*
            var urlS = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/hohopost-user-newdb";
            var paramsS = {
                "operation": "batchWrite",
                "accessKeyId": "sdasda",
                "secretAccessKey": "asdsa",
                "sessionToken": "vhndi757Bydd",
                "RequestItems": {
                    "dazzle-gallery": [{
                        PutRequest: {
                            Item: Item
                        }
                    }]
                }
            };
            console.log(paramsS);
            $http.post(urlS, paramsS).then(function(result) {
                console.log("vvvv save 2");
                console.log(result);
                var pinTo = $scope.getToastPosition();
                $scope.saveAllTagCount++;
                if ($scope.saveAllTagCount == $scope.saveAllTagLength) {
                    $mdToast.show($mdToast.simple().textContent('已儲存').position(pinTo).hideDelay(3000));
                }
                $scope.getTags().then(function(result) {
                    console.log("vvvv getT");
                    $scope.tags = result.data;
                });
            });*/
        }
    });

    app.controller('myPhotosController', function($scope, $http, $filter, $mdDialog, $mdBottomSheet, $mdToast) {
        console.log("vvvv vvvv 8");
        var QueryString = function() {
            // This function is anonymous, is executed immediately and 
            // the return value is assigned to QueryString!
            var query_string = {};
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                // If first entry with this name
                if (typeof query_string[pair[0]] === "undefined") {
                    query_string[pair[0]] = decodeURIComponent(pair[1]);
                    // If second entry with this name
                } else if (typeof query_string[pair[0]] === "string") {
                    var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                    query_string[pair[0]] = arr;
                    // If third or later entry with this name
                } else {
                    query_string[pair[0]].push(decodeURIComponent(pair[1]));
                }
            }

            return query_string;
        }();
        console.log(QueryString);
        console.log("vvvv qs type whyyyy2");
        $scope.eachShowNum = 500;


        $scope.init = function() {
            //$scope.$apply(function(){
            $scope.type = QueryString.type;
            $scope.allNewArray = [];
            $scope.deleting = false;
            $scope.loading = true;
            $scope.end = false;
            $scope.tags = [];
            $scope.selected = [];
            $scope.selecting = false;
            $scope.deletedURL = [];
            $scope.selectedTags = [];
            $scope.LastEvaluatedKey = null;
            $scope.websitesAngularGridOptions = {
                gridWidth: 200,
                gutterSize: 4,
                infiniteScrollDelay: 1000,
                infiniteScrollDistance: 95,
                scrollContainer: '#sidecontent'
            }
            $scope.inited = false;
            $scope.websites = [];
            //});
            switch ($scope.type) {
                case "相片":
                    console.log("vvvv 相片");
                    $scope.px = 'images/' + $scope.user.uid + '/medium-web/';
                    $scope.nowType = ".jpg";
                    break;
                case "插畫":
                    console.log("vvvv 插畫");
                    $scope.px = 'illustration/' + $scope.user.uid + '/png/';
                    $scope.nowType = ".png";
                    break;
            }
            console.log('myPhotosController');
            console.log($scope.user.uid);
            console.log(AWS.config);
            var s3 = new AWS.S3();
            var params = {
                Bucket: "designerrrr-output",
                /* required */
                Prefix: $scope.px
            };
            s3.listObjects(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else {
                    console.log("listObj");
                    console.log(data);
                    data.Contents = data.Contents.reverse();
                    $scope.data = data;
                    $scope.getTags().then(function(result) {
                        $scope.tags = result.data;
                    });
                    $scope.getWebsites($scope.eachShowNum, 0).then(function(anArray) {
                        $scope.$apply(function() {
                            $scope.inited = true;
                            $scope.loading = false;
                            $scope.websites = $scope.websites.concat(anArray);
                            $scope.LastEvaluatedKey = $scope.eachShowNum;
                            console.log("vvvv $scope.websites");
                            console.log($scope.websites);
                        });
                    });
                }
            });
        }
        $scope.tagClicked = function(tag) {
            console.log("vvvv tc1");
            $scope.selectedTags = [];
            $scope.selectedTags.push(tag);
            $scope.tagsChanged();
        }
        $scope.tagsChanged = function() {
            console.log("vvvv tc2");
            $scope.loading = true;
            $scope.end = false;
            $scope.LastEvaluatedKey = null;
            $scope.websites = [];
            if ($scope.selectedTags.length <= 0) {
                $scope.getWebsites($scope.eachShowNum, 0).then(function(anArray) {
                    $scope.$apply(function() {
                        $scope.loading = false;
                        anArray = $scope.allNewArray.concat(anArray);
                        $scope.websites = $scope.websites.concat(anArray);
                        $scope.LastEvaluatedKey = $scope.eachShowNum;
                    });
                });
            } else {
                var uniArray = [];
                var done = [];
                for (var i = 0; i < $scope.selectedTags.length; i++) {
                    $scope.getWebsitesByTag($scope.selectedTags[i]).then(function(anArray) {
                        $scope.$apply(function() {
                            uniArray = uniArray.concat(anArray);
                            done.push({});
                            if (done.length == $scope.selectedTags.length) {
                                uniArray = uniArray.filter(function(elem, pos) {
                                    return uniArray.indexOf(elem) == pos;
                                });
                                $scope.websites = $scope.websites.concat(uniArray);
                                console.log($scope.websites);
                            }
                        });
                    });
                }
                $scope.loading = false;
                $scope.end = true;
            }
        }
        $scope.queryTags = function(query) {
            console.log(query);
            return $filter('filter')(angular.lowercase($scope.tags), angular.lowercase(query));
        }
        $scope.getTags = function() {
            return new Promise(function(resolve, reject) {
                var data = {};
                data.userName = $scope.user.uid;
                data.type = $scope.type;
                console.log("vvvv whyyyyyy 323232");
                console.log($scope.user.uid);
                $http({
                    "method": "post",
                    "url": "https://9g1gx9kfdc.execute-api.ap-northeast-1.amazonaws.com/dazzlegallery/gettags",
                    "data": data
                }).then(function(result) {
                    console.log("vvvv getTag");
                    console.log(result);
                    if (result.data.code > 0) {
                        resolve(result.data);
                    } else {
                        reject(result.data.text);
                    }
                })
            })
        }
        $scope.getWebsitesByTag = function(tag) {
            return new Promise(function(resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://9g1gx9kfdc.execute-api.ap-northeast-1.amazonaws.com/dazzlegallery/getid",
                    "data": {
                        "tag": tag,
                        "action": "bytag",
                        "owner_id": $scope.user.uid,
                        "type": $scope.type
                    }
                }).then(function(result) {
                    console.log(result);
                    if (result.data.code > 0) {
                        var s3 = new AWS.S3();
                        var anArray = [];
                        for (i = 0; i < result.data.data.length; i++) {
                            var theID = result.data.data[i].gid;
                            switch ($scope.type) {
                                case "相片":
                                    console.log("vvvv 相片 2");
                                    var theLink = "images/" + $scope.user.uid + "/medium-web/" + theID + ".jpg"
                                    break;
                                case "插畫":
                                    console.log("vvvv 插畫 2");
                                    var theLink = "illustration/" + $scope.user.uid + "/png/" + theID + ".png"
                                    break;
                            }
                            var params = {
                                Bucket: "designerrrr-output",
                                Key: theLink
                            };
                            var url = s3.getSignedUrl('getObject', params);
                            anArray[i] = url;
                        }
                        console.log(anArray);
                        resolve(anArray);
                    } else {
                        resolve([]);
                    }
                });
            });
        }
        $scope.loadMore = function() {
            console.log("loadMore");
            if (!$scope.end && !$scope.loading) {
                $scope.loading = true;
                $scope.getWebsites($scope.eachShowNum, $scope.LastEvaluatedKey).then(function(anArray) {
                    $scope.loading = false;
                    if (anArray.length > 0) {
                        $scope.websites = $scope.websites.concat(anArray);
                        $scope.LastEvaluatedKey = $scope.LastEvaluatedKey + $scope.eachShowNum;
                    } else {
                        $scope.end = true;
                    }
                });
            }
        }
        $scope.getWebsites = function(limit, key) {
            return new Promise(function(resolve, reject) {
                console.log("getWebsites");
                var data = $scope.data;
                console.log(data);
                var anArray = [];
                var counter = 0;
                var s3 = new AWS.S3();
                if ($scope.LastEvaluatedKey < data.Contents.length && data.Contents.length - $scope.LastEvaluatedKey < $scope.eachShowNum) { //show photo when unshow photo less than 50
                    console.log("if");
                    for (i = (0 + key); i < data.Contents.length; i++) {
                        var checkID = data.Contents[i].Key.substring(data.Contents[i].Key.lastIndexOf("/") + 1).replace($scope.nowType, "");
                        var notLoad = false;
                        for (j = 0; j < $scope.deletedURL.length; j++) {
                            if ($scope.deletedURL[j] == checkID) {
                                notLoad = true;
                            }
                        }
                        if (notLoad) {
                            //found a invalid url
                        } else {
                            var params = {
                                Bucket: "designerrrr-output",
                                Key: data.Contents[i].Key
                            };
                            var url = s3.getSignedUrl('getObject', params);
                            anArray[counter] = url;
                            counter++;
                        }
                    }
                    if ($scope.data.Contents.length <= $scope.eachShowNum) {
                        console.log("endFirst");
                        $scope.end = true;
                    }
                    console.log(anArray);
                    resolve(anArray);
                } else if ($scope.LastEvaluatedKey < data.Contents.length) {
                    console.log("else if");
                    for (i = (0 + key); i < (limit + key); i++) {
                        console.log("vvvv for");
                        console.log(data.Contents[i]);
                        console.log(data.Contents[i].Key);
                        var checkID = data.Contents[i].Key.substring(data.Contents[i].Key.lastIndexOf("/") + 1).replace($scope.nowType, "");
                        console.log("vvvv checkID");
                        console.log(checkID);
                        var notLoad = false;
                        for (j = 0; j < $scope.deletedURL.length; j++) {
                            if ($scope.deletedURL[j] == checkID) {
                                notLoad = true;
                            }
                        }
                        if (notLoad) {
                            console.log("dead img found");
                        } else {
                            console.log("dead img else");
                            var params = {
                                Bucket: "designerrrr-output",
                                Key: data.Contents[i].Key
                            };
                            var url = s3.getSignedUrl('getObject', params);
                            anArray[counter] = url;
                            counter++;
                        }
                    }
                    console.log(anArray);
                    resolve(anArray);
                } else {
                    if ($scope.websites.length == 0) {
                        console.log("vvvv first 0");
                        $scope.inited = true;
                        $scope.loading = false;
                        $scope.LastEvaluatedKey = 0;
                    }
                    $scope.end = true;
                    console.log("reject");
                    reject("end");
                }
            });
        }
        $scope.getImage = function(key) {
            var s3 = new AWS.S3();
            var params = {
                Bucket: "designerrrr-output",
                Key: key
            };
            var url = s3.getSignedUrl('getObject', params);
            console.log(url);
            return url;
        }
        //For toast popup use
        var last = {
            bottom: true,
            top: false,
            left: false,
            right: true
        };
        $scope.toastPosition = angular.extend({}, last);
        $scope.getToastPosition = function() {
            sanitizePosition();
            return Object.keys($scope.toastPosition).filter(function(pos) {
                return $scope.toastPosition[pos];
            }).join(' ');
        };

        function sanitizePosition() {
            var current = $scope.toastPosition;
            if (current.bottom && last.top) current.top = false;
            if (current.top && last.bottom) current.bottom = false;
            if (current.right && last.left) current.left = false;
            if (current.left && last.right) current.right = false;
            last = angular.extend({}, current);
        }
        // /For toast popup use
        $scope.showPhoto = function(website, index) {
            //尋日做到show photo,要改show photo.js showPhoto.html d type 同 url2017 7 26
            console.log(index);
            //console.log($scope.websites[index]);
            $mdDialog.show({
                controller: "showPhotoController",
                templateUrl: 'templates/showPhoto.html',
                escapeToClose: false,
                clickOutsideToClose: false,
                locals: {
                    website: website,
                    rootScope: $scope,
                    bought: false,
                    sold: false
                }
            }).then(function(objj) {
                console.log("vvvv showPhoto then");
                console.log(objj);
                if (objj.tORf) {
                    var confirm = $mdDialog.confirm().title('刪除圖片').textContent('你真的要刪除此圖片嗎?').ariaLabel('Lucky day').ok('刪除').cancel('取消');
                    $mdDialog.show(confirm).then(function() {
                        $scope.selected = [];
                        $scope.deleting = true;
                        var delID = $scope.websites[index].substring(0, $scope.websites[index].indexOf($scope.nowType + "?AWSAccessKeyId")).replace($scope.nowType + "?AWSAccessKeyId", "");
                        console.log(delID);
                        delID = delID.substring(delID.lastIndexOf("/") + 1);
                        console.log(delID);
                        $scope.deletedURL.push(delID);
                        console.log("vvvv dellll");
                        console.log($scope.deletedURL);
                        //This part is for a special case that user delete the photo just upload in same page
                        for (i = 0; i < $scope.allNewArray.length; i++) {
                            console.log($scope.allNewArray[i]);
                            console.log($scope.websites[index]);
                            if ($scope.allNewArray[i] === $scope.websites[index]) {
                                console.log("same!");
                                $scope.allNewArray.splice(i, 1);
                            }
                        }
                        //This part is for arrange the pictures after delete.
                        $scope.websites.splice(index, 1);
                        setTimeout(function() {
                            var temp = $scope.websites.length;
                            console.log("vvvv thennnn7");
                            $scope.temp = temp;
                            $scope.websites = $scope.websites.concat(["https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png"]);
                        }, 1500);
                        setTimeout(function() {
                            console.log("vvvv 2000 thennnn7");
                            $scope.websites.splice($scope.temp, 1);
                            $scope.deleting = false;
                        }, 4000);
                        // /This part is for arrange the pictures after delete.
                        var url = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
                        var params = {
                            "operation": "delete",
                            "accessKeyId": "sdasda",
                            "secretAccessKey": "asdsa",
                            "sessionToken": "vhndi757Bydd",
                            "TableName": "dazzle-gallery",
                            "Key": {
                                "gid": objj.id
                            }
                        }
                        $http.post(url, params).then(function(result) {
                            console.log("deleted");
                            console.log(result);
                            var pinTo = $scope.getToastPosition();
                            $scope.getTags().then(function(result) {
                                $scope.tags = result.data;
                            });
                            $mdToast.show($mdToast.simple().textContent('已刪除').position(pinTo).hideDelay(3000));
                        });
                        var s3 = new AWS.S3();
                        switch ($scope.type) {
                            case "相片":
                                console.log("vvvv 相片 3");
                                var diffObj = [{
                                    Key: "images/" + $scope.user.uid + "/large/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/large-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/medium/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/medium-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/small/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/small-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/thumbnail/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/thumbnail-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/original/" + objj.id + objj.type
                                }];
                                break;
                            case "插畫":
                                console.log("vvvv 插畫 3");
                                var diffObj = [{
                                    Key: "illustration/" + $scope.user.uid + "/eps/" + objj.id + ".eps"
                                }, {
                                    Key: "illustration/" + $scope.user.uid + "/svg/" + objj.id + ".svg"
                                }, {
                                    Key: "illustration/" + $scope.user.uid + "/png/" + objj.id + ".png"
                                }];
                                break;
                        }

                        var paramsDel = {
                            Bucket: "designerrrr-output",
                            Delete: {
                                Objects: diffObj,
                                Quiet: false
                            }
                        };
                        s3.deleteObjects(paramsDel, function(err, data) {
                            if (err) {
                                console.log("s3 fail");
                                console.log(err);
                            } else {
                                console.log("delete from s3 successful");
                                console.log(data);
                                console.log($scope.websites);
                                //$scope.init();
                                /*for(i=0;i<$scope.websites.length;i++){
                                    if($scope.websites[i].indexOf(objj.id)!=-1){
                                        console.log("splice ok");
                                        $scope.websites.splice(i,1);
                                    }
                                }
                                console.log($scope.websites);*/
                            }
                        });
                    }, function() {});
                }
            });
        }
        $scope.toggle = function(item, list) {
            console.log(item);
            var idx = list.indexOf(item);
            console.log(idx);
            if (idx > -1) {
                list.splice(idx, 1);
            } else {
                list.push(item);
            }
        };
        $scope.toggleAll = function(item) {
            if ($scope.selected.length === $scope.websites.length) {
                $scope.selected = [];
            } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
                $scope.selected = $scope.websites.slice(0);
            }
        }
        $scope.exists = function(item, list) {
            return list.indexOf(item) > -1;
        };
        $scope.select = function() {
            $scope.selecting = true;
        }
        $scope.selectCancel = function() {
            $scope.selected = [];
            $scope.selecting = false;
        }
        $scope.deleteAll = function(website) {
            if ($scope.selected.length != 0) {
                var allID = [];
                console.log($scope.selected);
                for (i = 0; i < $scope.selected.length; i++) {
                    allID[i] = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId")).substring($scope.selected[i].lastIndexOf("/") + 1).replace($scope.nowType, "");
                }
                console.log(allID);
                var confirm = $mdDialog.confirm().title('刪除圖片').textContent('你真的要刪除' + $scope.selected.length + '張圖片嗎?').ariaLabel('Lucky day').ok('刪除').cancel('取消');
                $mdDialog.show(confirm).then(function() {
                    $scope.deleteAllPhoto();
                    $scope.deleteAllData();
                });
            }
        }
        $scope.downloadAll = function() {
            if ($scope.selected.length != 0) {
                var allID = [];
                console.log($scope.selected);
                for (i = 0; i < $scope.selected.length; i++) {
                    allID[i] = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId")).substring($scope.selected[i].lastIndexOf("/") + 1).replace($scope.nowType, "");
                }
                console.log(allID);
                $mdDialog.show({
                    controller: "batchDownloadPopupController",
                    templateUrl: 'templates/batchDownloadPopup.html',
                    escapeToClose: false,
                    clickOutsideToClose: false,
                    locals: {
                        allID: allID,
                        type: $scope.type
                    }
                }).then(function() {});
            }
        }
        $scope.upload = function() {
            console.log("vvvv upload");
            console.log($scope.user);
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'templates/upload.html',
                controller: 'uploadController',
                clickOutsideToClose: false,
                disableParentScroll: false,
                locals: {
                    bucket: "designerrrr-output",
                    key: $scope.px,
                    rootScope: $scope
                }
            }).then(function() {
                /*
                $scope.getTags().then(function(result) {
                    $scope.tags = result.data;
                });
                console.log("vvvv then");
                console.log(uploadedFiles);
                var newItemArray = [];
                console.log("vvvv md dialog");
                if (uploadedFiles.length != 0) {
                    for (i = 0; i < uploadedFiles.length; i++) {
                        newItemArray[i] = $scope.getImage(uploadedFiles[i].path);
                    }
                    console.log(newItemArray);
                    if ($scope.allNewArray.length == 0) {
                        $scope.allNewArray = newItemArray;
                    } else {
                        $scope.allNewArray = newItemArray.concat($scope.allNewArray);
                    }
                    $scope.websites = newItemArray.concat($scope.websites);
                }*/
                //$scope.websites.concat(uploadedFiles);
            }).catch(function(error) {
                // User clicked outside or hit escape 
            });
        };
        $scope.uploadWatermark = function() {
            console.log("vvvv uploadWatermark");
            console.log($scope.user);
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'templates/uploadWatermark.html',
                controller: 'uploadWatermarkController',
                clickOutsideToClose: false,
                disableParentScroll: false,
                locals: {
                    bucket: "designerrrr",
                    key: $scope.px,
                    rootScope: $scope
                }
            }).then(function(uploadedFiles) {
                if (uploadedFiles == "ok") {
                    console.log("okkkkkkkkWater");
                    var pinTo = $scope.getToastPosition();
                    $mdToast.show($mdToast.simple().textContent('已儲存自訂水印，請於上傳時開啟自訂水印模式').position(pinTo).hideDelay(5000));
                }
                //$scope.websites.concat(uploadedFiles);
            }).catch(function(error) {
                // User clicked outside or hit escape 
            });
        };
        $scope.changeTagsAll = function() {
            if ($scope.selected.length != 0) {
                console.log("AAAA");
                //console.log($scope.websites[index]);
                $mdDialog.show({
                    controller: "changeTagController",
                    templateUrl: 'templates/changeTag.html',
                    escapeToClose: false,
                    clickOutsideToClose: false,
                    locals: {
                        rootScope: $scope
                    }
                }).then(function(tagNeedToBeAdded) {
                    console.log($scope.selected);
                    $scope.saveAllTagtoPhoto(tagNeedToBeAdded);
                });
            }
        }
        $scope.saveAllTagtoPhoto = function(SelectedTag) {
            console.log("AAAAA");
            if (SelectedTag.length != 0) {
                console.log("vvvv have tag");
                $scope.saveAllTagCount = 0;
                $scope.saveAllTagLength = angular.copy($scope.selected.length);
                for (i = 0; i < $scope.selected.length; i++) {
                    var thisPhotoId = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId"));
                    thisPhotoId = thisPhotoId.substring(thisPhotoId.lastIndexOf("/") + 1);
                    thisPhotoId = thisPhotoId.substring(0, thisPhotoId.lastIndexOf("."));
                    console.log(thisPhotoId);
                    var url = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
                    var params = {
                        "operation": "get",
                        "accessKeyId": "sdasda",
                        "secretAccessKey": "asdsa",
                        "sessionToken": "vhndi757Bydd",
                        "TableName": "dazzle-gallery",
                        "Key": {
                            "gid": thisPhotoId
                        }
                    }
                    $http.post(url, params).then(function(result) {
                        console.log("db successful");
                        console.log(result);
                        $scope.checking = false;
                        $scope.tags = result.data.Item.tags;
                        console.log($scope.tags);
                        for (i = 0; i < SelectedTag.length; i++) {
                            $scope.tags.push(SelectedTag[i]);
                        }
                        console.log($scope.tags);
                        $scope.tags = $scope.tags.filter(function(elem, pos) {
                            return $scope.tags.indexOf(elem) == pos;
                        })
                        console.log($scope.tags);
                        result.data.Item.tags = $scope.tags;
                        $scope.save(result.data.Item);
                    })
                }
            }
        }
        $scope.save = function(Item) {
            var urlS = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
            var paramsS = {
                "operation": "batchWrite",
                "accessKeyId": "sdasda",
                "secretAccessKey": "asdsa",
                "sessionToken": "vhndi757Bydd",
                "RequestItems": {
                    "dazzle-gallery": [{
                        PutRequest: {
                            Item: Item
                        }
                    }]
                }
            };
            console.log(paramsS);
            $http.post(urlS, paramsS).then(function(result) {
                console.log("vvvv save 2");
                console.log(result);
                var pinTo = $scope.getToastPosition();
                $scope.saveAllTagCount++;
                if ($scope.saveAllTagCount == $scope.saveAllTagLength) {
                    $mdToast.show($mdToast.simple().textContent('已儲存').position(pinTo).hideDelay(3000));
                }
                $scope.getTags().then(function(result) {
                    console.log("vvvv getT");
                    $scope.tags = result.data;
                });
            });
        }
    });

    app.controller('myVideosController', function($scope, $http, $filter, $mdDialog, $mdBottomSheet, $mdToast) {
        console.log("vvvv vvvv 9");
        var QueryString = function() {
            // This function is anonymous, is executed immediately and 
            // the return value is assigned to QueryString!
            var query_string = {};
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                // If first entry with this name
                if (typeof query_string[pair[0]] === "undefined") {
                    query_string[pair[0]] = decodeURIComponent(pair[1]);
                    // If second entry with this name
                } else if (typeof query_string[pair[0]] === "string") {
                    var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                    query_string[pair[0]] = arr;
                    // If third or later entry with this name
                } else {
                    query_string[pair[0]].push(decodeURIComponent(pair[1]));
                }
            }

            return query_string;
        }();
        console.log(QueryString);
        console.log("vvvv qs type whyyyy2");
        $scope.eachShowNum = 500;


        $scope.init = function() {
            //$scope.$apply(function(){
            $scope.type = "Video";
            $scope.allNewArray = [];
            $scope.deleting = false;
            $scope.loading = true;
            $scope.end = false;
            $scope.tags = [];
            $scope.selected = [];
            $scope.selecting = false;
            $scope.deletedURL = [];
            $scope.selectedTags = [];
            $scope.LastEvaluatedKey = null;
            $scope.websitesAngularGridOptions = {
                gridWidth: 200,
                gutterSize: 4,
                infiniteScrollDelay: 1000,
                infiniteScrollDistance: 95,
                scrollContainer: '#sidecontent'
            }
            $scope.inited = false;
            $scope.websites = [];
            //});\
            console.log('myPhotosController');
            console.log($scope.user.uid);
            console.log(AWS.config);
            var s3 = new AWS.S3();
            var params = {
                Bucket: "designerrrr-output",
                /* required */
                Prefix: $scope.px
            };
            s3.listObjects(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else {
                    console.log("listObj");
                    console.log(data);
                    data.Contents = data.Contents.reverse();
                    $scope.data = data;
                    $scope.getTags().then(function(result) {
                        $scope.tags = result.data;
                    });
                    $scope.getWebsites($scope.eachShowNum, 0).then(function(anArray) {
                        $scope.$apply(function() {
                            $scope.inited = true;
                            $scope.loading = false;
                            $scope.websites = $scope.websites.concat(anArray);
                            $scope.LastEvaluatedKey = $scope.eachShowNum;
                            console.log("vvvv $scope.websites");
                            console.log($scope.websites);
                        });
                    });
                }
            });
        }
        $scope.tagClicked = function(tag) {
            console.log("vvvv tc1");
            $scope.selectedTags = [];
            $scope.selectedTags.push(tag);
            $scope.tagsChanged();
        }
        $scope.tagsChanged = function() {
            console.log("vvvv tc2");
            $scope.loading = true;
            $scope.end = false;
            $scope.LastEvaluatedKey = null;
            $scope.websites = [];
            if ($scope.selectedTags.length <= 0) {
                $scope.getWebsites($scope.eachShowNum, 0).then(function(anArray) {
                    $scope.$apply(function() {
                        $scope.loading = false;
                        anArray = $scope.allNewArray.concat(anArray);
                        $scope.websites = $scope.websites.concat(anArray);
                        $scope.LastEvaluatedKey = $scope.eachShowNum;
                    });
                });
            } else {
                var uniArray = [];
                var done = [];
                for (var i = 0; i < $scope.selectedTags.length; i++) {
                    $scope.getWebsitesByTag($scope.selectedTags[i]).then(function(anArray) {
                        $scope.$apply(function() {
                            uniArray = uniArray.concat(anArray);
                            done.push({});
                            if (done.length == $scope.selectedTags.length) {
                                uniArray = uniArray.filter(function(elem, pos) {
                                    return uniArray.indexOf(elem) == pos;
                                });
                                $scope.websites = $scope.websites.concat(uniArray);
                                console.log($scope.websites);
                            }
                        });
                    });
                }
                $scope.loading = false;
                $scope.end = true;
            }
        }
        $scope.queryTags = function(query) {
            console.log(query);
            return $filter('filter')(angular.lowercase($scope.tags), angular.lowercase(query));
        }
        $scope.getTags = function() {
            return new Promise(function(resolve, reject) {
                var data = {};
                data.userName = $scope.user.uid;
                data.type = $scope.type;
                console.log("vvvv whyyyyyy 323232");
                console.log($scope.user.uid);
                $http({
                    "method": "post",
                    "url": "https://9g1gx9kfdc.execute-api.ap-northeast-1.amazonaws.com/dazzlegallery/gettags",
                    "data": data
                }).then(function(result) {
                    console.log("vvvv getTag");
                    console.log(result);
                    if (result.data.code > 0) {
                        resolve(result.data);
                    } else {
                        reject(result.data.text);
                    }
                })
            })
        }
        $scope.getWebsitesByTag = function(tag) {
            return new Promise(function(resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://9g1gx9kfdc.execute-api.ap-northeast-1.amazonaws.com/dazzlegallery/getid",
                    "data": {
                        "tag": tag,
                        "action": "bytag",
                        "owner_id": $scope.user.uid,
                        "type": $scope.type
                    }
                }).then(function(result) {
                    console.log(result);
                    if (result.data.code > 0) {
                        var s3 = new AWS.S3();
                        var anArray = [];
                        for (i = 0; i < result.data.data.length; i++) {
                            var theID = result.data.data[i].gid;
                            switch ($scope.type) {
                                case "相片":
                                    console.log("vvvv 相片 2");
                                    var theLink = "images/" + $scope.user.uid + "/medium-web/" + theID + ".jpg"
                                    break;
                                case "插畫":
                                    console.log("vvvv 插畫 2");
                                    var theLink = "illustration/" + $scope.user.uid + "/png/" + theID + ".png"
                                    break;
                            }
                            var params = {
                                Bucket: "designerrrr-output",
                                Key: theLink
                            };
                            var url = s3.getSignedUrl('getObject', params);
                            anArray[i] = url;
                        }
                        console.log(anArray);
                        resolve(anArray);
                    } else {
                        resolve([]);
                    }
                });
            });
        }
        $scope.loadMore = function() {
            console.log("loadMore");
            if (!$scope.end && !$scope.loading) {
                $scope.loading = true;
                $scope.getWebsites($scope.eachShowNum, $scope.LastEvaluatedKey).then(function(anArray) {
                    $scope.loading = false;
                    if (anArray.length > 0) {
                        $scope.websites = $scope.websites.concat(anArray);
                        $scope.LastEvaluatedKey = $scope.LastEvaluatedKey + $scope.eachShowNum;
                    } else {
                        $scope.end = true;
                    }
                });
            }
        }
        $scope.getWebsites = function(limit, key) {
            return new Promise(function(resolve, reject) {
                console.log("getWebsites");
                var data = $scope.data;
                console.log(data);
                var anArray = [];
                var counter = 0;
                var s3 = new AWS.S3();
                if ($scope.LastEvaluatedKey < data.Contents.length && data.Contents.length - $scope.LastEvaluatedKey < $scope.eachShowNum) { //show photo when unshow photo less than 50
                    console.log("if");
                    for (i = (0 + key); i < data.Contents.length; i++) {
                        var checkID = data.Contents[i].Key.substring(data.Contents[i].Key.lastIndexOf("/") + 1).replace($scope.nowType, "");
                        var notLoad = false;
                        for (j = 0; j < $scope.deletedURL.length; j++) {
                            if ($scope.deletedURL[j] == checkID) {
                                notLoad = true;
                            }
                        }
                        if (notLoad) {
                            //found a invalid url
                        } else {
                            var params = {
                                Bucket: "designerrrr-output",
                                Key: data.Contents[i].Key
                            };
                            var url = s3.getSignedUrl('getObject', params);
                            anArray[counter] = url;
                            counter++;
                        }
                    }
                    if ($scope.data.Contents.length <= $scope.eachShowNum) {
                        console.log("endFirst");
                        $scope.end = true;
                    }
                    console.log(anArray);
                    resolve(anArray);
                } else if ($scope.LastEvaluatedKey < data.Contents.length) {
                    console.log("else if");
                    for (i = (0 + key); i < (limit + key); i++) {
                        console.log("vvvv for");
                        console.log(data.Contents[i]);
                        console.log(data.Contents[i].Key);
                        var checkID = data.Contents[i].Key.substring(data.Contents[i].Key.lastIndexOf("/") + 1).replace($scope.nowType, "");
                        console.log("vvvv checkID");
                        console.log(checkID);
                        var notLoad = false;
                        for (j = 0; j < $scope.deletedURL.length; j++) {
                            if ($scope.deletedURL[j] == checkID) {
                                notLoad = true;
                            }
                        }
                        if (notLoad) {
                            console.log("dead img found");
                        } else {
                            console.log("dead img else");
                            var params = {
                                Bucket: "designerrrr-output",
                                Key: data.Contents[i].Key
                            };
                            var url = s3.getSignedUrl('getObject', params);
                            anArray[counter] = url;
                            counter++;
                        }
                    }
                    console.log(anArray);
                    resolve(anArray);
                } else {
                    if ($scope.websites.length == 0) {
                        console.log("vvvv first 0");
                        $scope.inited = true;
                        $scope.loading = false;
                        $scope.LastEvaluatedKey = 0;
                    }
                    $scope.end = true;
                    console.log("reject");
                    reject("end");
                }
            });
        }
        $scope.getImage = function(key) {
            var s3 = new AWS.S3();
            var params = {
                Bucket: "designerrrr-output",
                Key: key
            };
            var url = s3.getSignedUrl('getObject', params);
            console.log(url);
            return url;
        }
        //For toast popup use
        var last = {
            bottom: true,
            top: false,
            left: false,
            right: true
        };
        $scope.toastPosition = angular.extend({}, last);
        $scope.getToastPosition = function() {
            sanitizePosition();
            return Object.keys($scope.toastPosition).filter(function(pos) {
                return $scope.toastPosition[pos];
            }).join(' ');
        };

        function sanitizePosition() {
            var current = $scope.toastPosition;
            if (current.bottom && last.top) current.top = false;
            if (current.top && last.bottom) current.bottom = false;
            if (current.right && last.left) current.left = false;
            if (current.left && last.right) current.right = false;
            last = angular.extend({}, current);
        }
        // /For toast popup use
        $scope.showPhoto = function(website, index) {
            //尋日做到show photo,要改show photo.js showPhoto.html d type 同 url2017 7 26
            console.log(index);
            //console.log($scope.websites[index]);
            $mdDialog.show({
                controller: "showPhotoController",
                templateUrl: 'templates/showPhoto.html',
                escapeToClose: false,
                clickOutsideToClose: false,
                locals: {
                    website: website,
                    rootScope: $scope,
                    bought: false,
                    sold:false
                }
            }).then(function(objj) {
                console.log("vvvv showPhoto then");
                console.log(objj);
                if (objj.tORf) {
                    var confirm = $mdDialog.confirm().title('刪除圖片').textContent('你真的要刪除此圖片嗎?').ariaLabel('Lucky day').ok('刪除').cancel('取消');
                    $mdDialog.show(confirm).then(function() {
                        $scope.selected = [];
                        $scope.deleting = true;
                        var delID = $scope.websites[index].substring(0, $scope.websites[index].indexOf($scope.nowType + "?AWSAccessKeyId")).replace($scope.nowType + "?AWSAccessKeyId", "");
                        console.log(delID);
                        delID = delID.substring(delID.lastIndexOf("/") + 1);
                        console.log(delID);
                        $scope.deletedURL.push(delID);
                        console.log("vvvv dellll");
                        console.log($scope.deletedURL);
                        //This part is for a special case that user delete the photo just upload in same page
                        for (i = 0; i < $scope.allNewArray.length; i++) {
                            console.log($scope.allNewArray[i]);
                            console.log($scope.websites[index]);
                            if ($scope.allNewArray[i] === $scope.websites[index]) {
                                console.log("same!");
                                $scope.allNewArray.splice(i, 1);
                            }
                        }
                        //This part is for arrange the pictures after delete.
                        $scope.websites.splice(index, 1);
                        setTimeout(function() {
                            var temp = $scope.websites.length;
                            console.log("vvvv thennnn7");
                            $scope.temp = temp;
                            $scope.websites = $scope.websites.concat(["https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png"]);
                        }, 1500);
                        setTimeout(function() {
                            console.log("vvvv 2000 thennnn7");
                            $scope.websites.splice($scope.temp, 1);
                            $scope.deleting = false;
                        }, 4000);
                        // /This part is for arrange the pictures after delete.
                        var url = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
                        var params = {
                            "operation": "delete",
                            "accessKeyId": "sdasda",
                            "secretAccessKey": "asdsa",
                            "sessionToken": "vhndi757Bydd",
                            "TableName": "dazzle-gallery",
                            "Key": {
                                "gid": objj.id
                            }
                        }
                        $http.post(url, params).then(function(result) {
                            console.log("deleted");
                            console.log(result);
                            var pinTo = $scope.getToastPosition();
                            $scope.getTags().then(function(result) {
                                $scope.tags = result.data;
                            });
                            $mdToast.show($mdToast.simple().textContent('已刪除').position(pinTo).hideDelay(3000));
                        });
                        var s3 = new AWS.S3();
                        switch ($scope.type) {
                            case "相片":
                                console.log("vvvv 相片 3");
                                var diffObj = [{
                                    Key: "images/" + $scope.user.uid + "/large/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/large-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/medium/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/medium-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/small/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/small-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/thumbnail/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/thumbnail-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/original/" + objj.id + objj.type
                                }];
                                break;
                            case "插畫":
                                console.log("vvvv 插畫 3");
                                var diffObj = [{
                                    Key: "illustration/" + $scope.user.uid + "/eps/" + objj.id + ".eps"
                                }, {
                                    Key: "illustration/" + $scope.user.uid + "/svg/" + objj.id + ".svg"
                                }, {
                                    Key: "illustration/" + $scope.user.uid + "/png/" + objj.id + ".png"
                                }];
                                break;
                        }

                        var paramsDel = {
                            Bucket: "designerrrr-output",
                            Delete: {
                                Objects: diffObj,
                                Quiet: false
                            }
                        };
                        s3.deleteObjects(paramsDel, function(err, data) {
                            if (err) {
                                console.log("s3 fail");
                                console.log(err);
                            } else {
                                console.log("delete from s3 successful");
                                console.log(data);
                                console.log($scope.websites);
                                //$scope.init();
                                /*for(i=0;i<$scope.websites.length;i++){
                                    if($scope.websites[i].indexOf(objj.id)!=-1){
                                        console.log("splice ok");
                                        $scope.websites.splice(i,1);
                                    }
                                }
                                console.log($scope.websites);*/
                            }
                        });
                    }, function() {});
                }
            });
        }
        $scope.toggle = function(item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            } else {
                list.push(item);
            }
        };
        $scope.toggleAll = function(item) {
            if ($scope.selected.length === $scope.websites.length) {
                $scope.selected = [];
            } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
                $scope.selected = $scope.websites.slice(0);
            }
        }
        $scope.exists = function(item, list) {
            return list.indexOf(item) > -1;
        };
        $scope.select = function() {
            $scope.selecting = true;
        }
        $scope.selectCancel = function() {
            $scope.selected = [];
            $scope.selecting = false;
        }
        $scope.deleteAll = function(website) {
            var allID = [];
            console.log($scope.selected);
            for (i = 0; i < $scope.selected.length; i++) {
                allID[i] = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId")).substring($scope.selected[i].lastIndexOf("/") + 1).replace($scope.nowType, "");
            }
            console.log(allID);
            var confirm = $mdDialog.confirm().title('刪除圖片').textContent('你真的要刪除' + $scope.selected.length + '張圖片嗎?').ariaLabel('Lucky day').ok('刪除').cancel('取消');
            $mdDialog.show(confirm).then(function() {
                $scope.deleteAllPhoto();
                $scope.deleteAllData();
            });
        }
        $scope.upload = function() {
            console.log("vvvv upload");
            console.log($scope.user);
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'templates/uploadVideo.html',
                controller: 'uploadController',
                clickOutsideToClose: false,
                disableParentScroll: false,
                locals: {
                    bucket: "designerrrr-output",
                    key: $scope.px,
                    rootScope: $scope
                }
            }).then(function() {
                /*
                $scope.getTags().then(function(result) {
                    $scope.tags = result.data;
                });
                console.log("vvvv then");
                console.log(uploadedFiles);
                var newItemArray = [];
                console.log("vvvv md dialog");
                if (uploadedFiles.length != 0) {
                    for (i = 0; i < uploadedFiles.length; i++) {
                        newItemArray[i] = $scope.getImage(uploadedFiles[i].path);
                    }
                    console.log(newItemArray);
                    if ($scope.allNewArray.length == 0) {
                        $scope.allNewArray = newItemArray;
                    } else {
                        $scope.allNewArray = newItemArray.concat($scope.allNewArray);
                    }
                    $scope.websites = newItemArray.concat($scope.websites);
                }*/
                //$scope.websites.concat(uploadedFiles);
            }).catch(function(error) {
                // User clicked outside or hit escape 
            });
        };
        $scope.uploadWatermark = function() {
            console.log("vvvv uploadWatermark");
            console.log($scope.user);
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'templates/uploadWatermark.html',
                controller: 'uploadWatermarkController',
                clickOutsideToClose: false,
                disableParentScroll: false,
                locals: {
                    bucket: "designerrrr",
                    key: $scope.px,
                    rootScope: $scope
                }
            }).then(function(uploadedFiles) {
                if (uploadedFiles == "ok") {
                    console.log("okkkkkkkkWater");
                    var pinTo = $scope.getToastPosition();
                    $mdToast.show($mdToast.simple().textContent('已儲存自訂水印，請於上傳時開啟自訂水印模式').position(pinTo).hideDelay(5000));
                }
                //$scope.websites.concat(uploadedFiles);
            }).catch(function(error) {
                // User clicked outside or hit escape 
            });
        };
        $scope.changeTagsAll = function() {
            console.log("AAAA");
            //console.log($scope.websites[index]);
            $mdDialog.show({
                controller: "changeTagController",
                templateUrl: 'templates/changeTag.html',
                escapeToClose: false,
                clickOutsideToClose: false,
                locals: {
                    rootScope: $scope
                }
            }).then(function(tagNeedToBeAdded) {
                console.log($scope.selected);
                $scope.saveAllTagtoPhoto(tagNeedToBeAdded);
            });
        }
        $scope.saveAllTagtoPhoto = function(SelectedTag) {
            console.log("AAAAA");
            for (i = 0; i < $scope.selected.length; i++) {
                var thisPhotoId = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId"));
                thisPhotoId = thisPhotoId.substring(thisPhotoId.lastIndexOf("/") + 1);
                thisPhotoId = thisPhotoId.substring(0, thisPhotoId.lastIndexOf("."));
                console.log(thisPhotoId);
                var url = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
                var params = {
                    "operation": "get",
                    "accessKeyId": "sdasda",
                    "secretAccessKey": "asdsa",
                    "sessionToken": "vhndi757Bydd",
                    "TableName": "dazzle-gallery",
                    "Key": {
                        "gid": thisPhotoId
                    }
                }
                $http.post(url, params).then(function(result) {
                    console.log("db successful");
                    console.log(result);
                    $scope.checking = false;
                    $scope.tags = result.data.Item.tags;
                    console.log($scope.tags);
                    for (i = 0; i < SelectedTag.length; i++) {
                        $scope.tags.push(SelectedTag[i]);
                    }
                    console.log($scope.tags);
                    $scope.tags = $scope.tags.filter(function(elem, pos) {
                        return $scope.tags.indexOf(elem) == pos;
                    })
                    console.log($scope.tags);
                    result.data.Item.tags = $scope.tags;
                    $scope.save(result.data.Item);
                })
            }
        }
        $scope.save = function(Item) {
            var urlS = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
            var paramsS = {
                "operation": "batchWrite",
                "accessKeyId": "sdasda",
                "secretAccessKey": "asdsa",
                "sessionToken": "vhndi757Bydd",
                "RequestItems": {
                    "dazzle-gallery": [{
                        PutRequest: {
                            Item: Item
                        }
                    }]
                }
            };
            console.log(paramsS);
            $http.post(urlS, paramsS).then(function(result) {
                console.log("vvvv save 2");
                console.log(result);
                var pinTo = $scope.getToastPosition();
                $mdToast.show($mdToast.simple().textContent('已儲存').position(pinTo).hideDelay(3000));
                $scope.getTags().then(function(result) {
                    console.log("vvvv getT");
                    $scope.rootScope.tags = result.data;
                });
            });
        }
    });

    app.controller('myWebsiteController', function ($scope, $http, $mdDialog, $ocLazyLoad, $dazzleS3, $dazzlePopup, $dazzleFn) {
        console.log('myWebsiteController');
        $scope.init = function () {
            $scope.websites = [];
            if (angular.isArray($scope.user.webdomain)) {
                for (var i = 0; i < $scope.user.webdomain.length; i++) {
                    $scope.websites.push({
                        "websiteId": $scope.user.webdomain[i],
                        "websiteJson": {
                            "website": $scope.user.webdomain[i]
                        }
                    });
                }
            } else {
                $scope.websites.push({
                    "websiteId": $scope.user.webdomain,
                    "websiteJson": {
                        "website": $scope.user.webdomain
                    }
                });
            }
        }

        $scope.initWebsite = function (website) {
            $scope.initWebsiteJson(website);
            $scope.initWebsiteTable(website);
        }

        $scope.initWebsiteJson = function (website) {
            $dazzleS3.getJson('dazzle-user-' + $scope.user.uid, 'website/' + website.websiteId + '/json/website.json').then(function (json) {
                $scope.$apply(function () {
                    website.websiteJson = json;
                });
            });
        }

        $scope.initWebsiteTable = function (website) {
            website.websiteTable = [];
            $dazzleFn.getUserTables($scope.user.uid, website.websiteId).then(function (tables) {
                $scope.$apply(function () {
                    website.websiteTable = website.websiteTable.concat(tables);
                });
            });
        }

        $scope.builder = function (website) {
            window.open(
                "http://builder.dazzle.website/index.html?token:===:" + $scope.user.token + "&&&websiteId:===:" + website.websiteId + "&&&editPage:===:" + "index",
                '_blank'
            );
        }

        $scope.websiteSetting = function (website) {
            $dazzlePopup.websiteSetting(website.websiteId);
        }

        $scope.data = function (website, table) {
            $dazzlePopup.dataManagement(website.websiteId, table);
        }

        $scope.sell = function (website) {
            $dazzlePopup.sellWebsite(website.websiteId);
        }

        $scope.remove = function (website, index) {
            var confirm = $mdDialog.confirm()
                .title('移除網站?')
                .textContent('你是否要移除網站?')
                .ariaLabel('removeWebsite')
                .ok('是')
                .cancel('否');

            $mdDialog.show(confirm).then(function () {
                $dazzlePopup.loading();
                $http({
                    "method": "post",
                    "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/removewebsite",
                    "data": {
                        "uid": $scope.user.uid,
                        "webdomain": website.websiteId
                    }
                }).then(function (result) {
                    $dazzlePopup.alert('移除網站', result.data.text).then(function () {
                        location.reload();
                    });
                })
            });
        }
    });


    app.controller('paypalCallbackController', function ($scope, $http, $location) {
        console.log('paypalCallbackController');
        $scope.init = function () {
            $scope.result = {
                "src": "https://dazzle-template.s3.amazonaws.com/cdn6.0/images/loadingTo.gif",
                "title": "正在驗証",
                "text": "多謝，正在驗証你的付款。"
            };
            $scope.url = "https://www.paypal.com/cgi-bin/webscr";
            $scope.at = "51khhw6HcqTbT6hp7hO1gdDWQR7o5SLqCP6wlQzwDJa_O9D-_Uk_ucdgjRC";
            $scope.cmd = "_notify-synch";
            $scope.tx = $location.search().tx;
            if ($scope.tx) {
                $scope.check($scope.tx).then(function (text) {
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.result = {
                                "src": "https://dazzle-template.s3.amazonaws.com/cdn6.0/images/loadingToSuccess-once.gif",
                                "title": "充值成功",
                                "text": "多謝，你的付款" + text
                            };
                        });
                        setTimeout(function () {
                            document.location.href = "index.html#!/rechargeRecord";
                        }, 1500);
                    }, 500);
                }, function (err) {
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.result = {
                                "src": "https://dazzle-template.s3.amazonaws.com/cdn6.0/images/loadingToFail-once.gif",
                                "title": "正在驗証",
                                "text": "錯誤，驗証你的付款失敗。"
                            };
                        })
                        setTimeout(function () {
                            document.location.href = "index.html#!/myWebsite";
                        }, 1500);
                    }, 500);
                });
            } else {
                document.location.href = "index.html#!/myWebsite";
            }
        }
        $scope.check = function (tx) {
            return new Promise(function (resolve, reject) {
                $http({
                    method: "POST",
                    url: "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/paypal/receive-pdt",
                    data: {
                        tx: tx
                    }
                }).then(function (result) {
                    if (result.data.code > 0) {
                        resolve(result.data.text);
                    } else {
                        reject();
                    }
                }, function (err) {
                    reject(err);
                });
            });
        }
    });

    app.controller('rechargeRecordController', function ($scope, $http, $dazzleUser) {
        console.log('rechargeRecordController');
        $scope.inited = false;
        $dazzleUser.userLogin({
            "uid": $dazzleUser.getUser().uid,
            "AccessKeyId": $dazzleUser.getUser().key.AccessKeyId,
            "SecretAccessKey": $dazzleUser.getUser().key.SecretAccessKey,
            "SessionToken": $dazzleUser.getUser().key.SessionToken,
            "type": "token"
        }).then(function () {
            $scope.$apply(function () {
                $scope.$parent.user = $dazzleUser.getUser();
            });
        }, function () {
            $scope.logout();
        });
        $scope.init = function () {
            $scope.gridOptions = {
                rowHeight: 45,
                animateRows: true,
                enableColResize: true,
                angularCompileRows: true,
                enableSorting: true,
                defaultColDef: {
                    editable: false,
                    filter: 'text'
                },
                columnDefs: [{
                    headerName: "充值ID",
                    field: "txn_id",
                }, {
                    headerName: "充值金額",
                    field: "mc_gross",
                    filter: 'number'
                }, {
                    headerName: "充值時間",
                    field: "payment_date",
                    cellRenderer: dateRenderer,
                    comparator: dateComparator,
                    filter: 'date',
                    filterParams: {
                        comparator: function (filterLocalDateAtMidnight, cellValue) {
                            var cellDate = new Date(cellValue).setHours(12, 0, 0, 0);
                            if (cellDate < filterLocalDateAtMidnight) {
                                return -1;
                            } else if (cellDate > filterLocalDateAtMidnight) {
                                return 1;
                            } else {
                                return 0;
                            }
                        }
                    }
                }, {
                    headerName: "充值狀態",
                    field: "payment_status"
                }],
                onGridReady: function () {
                    $scope.getRechargeRecord().then(function (record) {
                        $scope.gridOptions.api.setRowData(record);
                        $scope.gridOptions.api.setSortModel([
                            {colId: 'payment_date', sort: 'desc'}
                        ]);
                        $scope.gridOptions.api.refreshView();
                        $scope.inited = true;
                    });
                }
            };
        }
        $scope.getRechargeRecord = function () {
            return new Promise(function (resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/paypal/get-record",
                    "data": {
                        "action": "listRecordByUid",
                        "uid": $scope.user.uid
                    }
                }).then(function (result) {
                    if (result.data.code > 0) {
                        resolve(result.data.data);
                    } else {
                        resolve([]);
                    }
                })
            })
        }
    });

    app.controller('sellRecordController', function ($scope, $http, $dazzleUser) {
        console.log('sellRecordController');
        $scope.inited = false;
        $scope.init = function () {
            $scope.gridOptions = {
                rowHeight: 45,
                animateRows: true,
                enableColResize: true,
                angularCompileRows: true,
                enableSorting: true,
                defaultColDef: {
                    editable: false,
                    filter: 'text'
                },
                columnDefs: [{
                    headerName: "交易ID",
                    field: "id",
                }, {
                    headerName: "銷售金額",
                    field: "price",
                    filter: 'number'
                }, {
                    headerName: "銷售時間",
                    field: "time",
                    cellRenderer: dateRenderer,
                    comparator: dateComparator,
                    filter: 'date',
                    filterParams: {
                        comparator: function (filterLocalDateAtMidnight, cellValue) {
                            var cellDate = new Date(cellValue).setHours(12, 0, 0, 0);
                            if (cellDate < filterLocalDateAtMidnight) {
                                return -1;
                            } else if (cellDate > filterLocalDateAtMidnight) {
                                return 1;
                            } else {
                                return 0;
                            }
                        }
                    }
                }, {
                    headerName: "銷售類別",
                    field: "type"
                }, {
                    headerName: "項目ID",
                    field: "itemId"
                }],
                onGridReady: function () {
                    $scope.getBuyRecord().then(function (record) {
                        $scope.gridOptions.api.setRowData(record);
                        $scope.gridOptions.api.setSortModel([
                            {colId: 'time', sort: 'desc'}
                        ]);
                        $scope.gridOptions.api.refreshView();
                        $scope.inited = true;
                    });
                }
            };
        }
        $scope.getBuyRecord = function () {
            return new Promise(function (resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/transaction",
                    "data": {
                        "action": "getSellRecordById",
                        "sellerId": $scope.user.uid
                    }
                }).then(function (result) {
                    if (result.data.code > 0) {
                        resolve(result.data.data);
                    } else {
                        resolve([]);
                    }
                })
            })
        }
    });
    app.controller('showFileController', function ($scope, $http, $q, $mdDialog,$mdToast, rootScope, website) {
        $scope.checking = true;
        console.log('showFileController');
        $scope.rootScope = rootScope;
        $scope.website = website;
        console.log($scope.website);
        console.log("vvvv user");
        console.log($scope.rootScope.user);

        //load download link from s3
        var s3 = new AWS.S3();
        var params = {Bucket: "dazzle-user-"+$scope.rootScope.user.uid, Key: 'files/'+$scope.website.name};
        var url = s3.getSignedUrl('getObject', params);
        $scope.downloadURL = url;

        $scope.init = function () {
     
                $scope.checking = false;
        }


        $scope.delete = function (ev) {
            console.log("vvvv delete ret");
            console.log($scope.websiteID);
            var obj = {};
            obj.tORf = true;
            obj.id = $scope.websiteID;
            obj.type = $scope.originalType;
            $mdDialog.hide(obj);
        }


        //For toast popup use
        var last = {
          bottom: true,
          top: false,
          left: false,
          right: true
        };
        $scope.toastPosition = angular.extend({},last);
        $scope.getToastPosition = function() {
            sanitizePosition();

            return Object.keys($scope.toastPosition)
              .filter(function(pos) { return $scope.toastPosition[pos]; })
              .join(' ');
        };
        function sanitizePosition() {
            var current = $scope.toastPosition;

            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;

            last = angular.extend({},current);
        }
        // /For toast popup use
        $scope.cancel = function () {
            $mdDialog.cancel();
        }
    });
    app.controller('showPhotoController', function($scope, $http, $q, $mdDialog, $mdToast, rootScope, website, bought, sold) {
        console.log("vvvv vvvv 7");
        $scope.soldLoad = true;
        $scope.sold = sold;
        $scope.bought = bought;
        $scope.checking = true;
        console.log('showPhotoController');
        $scope.rootScope = rootScope;
        console.log($scope.rootScope.deleting)
        $scope.website = website;
        console.log($scope.website);
        $scope.websiteID = $scope.website.substring(0, $scope.website.indexOf("?AWSAccessKeyId"));
        $scope.websiteID = $scope.websiteID.substring($scope.websiteID.lastIndexOf("/") + 1);
        $scope.websiteID = $scope.websiteID.substring(0, $scope.websiteID.lastIndexOf("."));
        console.log($scope.websiteID);
        console.log("vvvv user");
        console.log($scope.rootScope.user);

        /////for showing bought user use
        $scope.getUserImage = function(uid) {
            return new Promise(function(resolve, reject) {
                var url = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/gallerydirective";
                var params = {
                    "operation": "getUserImage",
                    "uid": uid
                }
                $http.post(url, params).then(function(result) {
                    console.log("vvvv getUserImage");
                    console.log(result);
                    resolve(result.data);
                });
            });
        }
        if (sold) {
            $scope.iconArray = [];
            var soldURL = "https://9g1gx9kfdc.execute-api.ap-northeast-1.amazonaws.com/dazzlegallery/getsolddetails";
            var soldParams = {
                "itemId": $scope.websiteID
            };
            $http.post(soldURL, soldParams).then(function(result) {
                console.log('vvvv sold result', result);
                var imagePath = "https://designerrrr-output.s3-ap-northeast-1.amazonaws.com/images/61920585/original/id1501736641437.jpg";
                $scope.messages = [];

                function todo(i) {
                    if (i == result.data.length) {
                        console.log("vvvv todo end");
                        console.log($scope.iconArray);
                        for (j = 0; j < result.data.length; j++) {
                            $scope.messages = $scope.messages.concat({
                                face: $scope.iconArray[j].userIcon,
                                buyerId: $scope.iconArray[j].userName,
                                time: result.data[j].time,
                                price: result.data[j].price,
                                id: result.data[j].id
                            });
                        }
                        console.log("vvvv whyyyy message");
                        console.log($scope.messages);
                        $scope.soldLoad = false;
                        return;
                    }
                    $scope.getUserImage(result.data[i].buyerId).then(function(url) {
                        console.log("vvvv todo i");
                        console.log(i);
                        console.log(url);
                        $scope.iconArray = $scope.iconArray.concat(url);
                        i++;
                        todo(i);
                    });
                }
                todo(0);
            });
        }
        /////

        $scope.addCount = function() {
            var urlC = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/hohopost-user-newdb";
            var paramsC = {
                "operation": "update",
                "index":"gallery",
                "type": "table",
                "id": $scope.websiteID,
                "doc": {
                    clickRate: $scope.clickRate + 1
                }
            };
            $http.post(urlC, paramsC).then(function(result) {
                console.log('Added count', result);
            });
        }

        $scope.init = function() {
            var url = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/hohopost-user-newdb";
            var params = {
                "operation": "get",
                "index": "gallery",
                "type":"table",
                "id": $scope.websiteID
            }
            $http.post(url, params).then(function(result) {
                console.log("db successful");
                console.log(result);
                $scope.checking = false;
                switch ($scope.rootScope.type) {
                    case "相片":
                        var theKey = result.data._source.large_url;
                        theKey = theKey.replace("https://designerrrr-output.s3-ap-northeast-1.amazonaws.com/", "");
                        theKey = theKey.replace("large", "large-web");
                        theKey = theKey.substring(0, theKey.lastIndexOf("."));
                        theKey += ".jpg";
                        break;
                    case "插畫":
                        var theKey = result.data._source.png_url;
                        theKey = theKey.replace("https://designerrrr-output.s3-ap-northeast-1.amazonaws.com/", "");
                        //theKey = theKey.replace("png", "png-web");
                        theKey = theKey.substring(0, theKey.lastIndexOf("."));
                        theKey += ".png";
                        break;
                }
                $scope.imgURL = $scope.getImage(theKey);
                $scope.type = result.data._source.category;
                $scope.original = result.data._source.original_name;
                $scope.status = result.data._source.status;
                $scope.clickRate = result.data._source.clickRate;
                $scope.downloadRate = result.data._source.downloaded;
                $scope.rating = result.data._source.rating;
                $scope.readOnly = true;
                $scope.desc = result.data._source.remark;
                $scope.tags = result.data._source.tags;
                $scope.owner_id = result.data._source.owner_id;
                $scope.price = result.data._source.price;
                $scope.showPrice = "$" + result.data._source.price;
                if ($scope.tags) {
                    $scope.tags = $scope.tags.filter(function(elem, pos) {
                        return $scope.tags.indexOf(elem) == pos;
                    })
                } else {
                    $scope.tags = [];
                }

                $scope.originalType = result.data._source.original_name.substring(result.data._source.original_name.lastIndexOf("."));

                //load for download link
                var s3 = new AWS.S3();
                switch ($scope.rootScope.type) {
                    case "相片":
                        var paramsAA = { Bucket: "designerrrr-output", Key: 'images/' + $scope.owner_id + '/original/' + $scope.websiteID + $scope.originalType };
                        var paramsAA2 = { Bucket: "designerrrr-output", Key: 'images/' + $scope.owner_id + '/large/' + $scope.websiteID + ".jpg" };
                        break;
                    case "插畫":
                        var paramsAA = { Bucket: "designerrrr-output", Key: 'illustration/' + $scope.owner_id + '/png/' + $scope.websiteID + ".png" };
                        var paramsAA2 = { Bucket: "designerrrr-output", Key: 'illustration/' + $scope.owner_id + '/eps/' + $scope.websiteID + ".eps" };
                        var paramsAA3 = { Bucket: "designerrrr-output", Key: 'illustration/' + $scope.owner_id + '/svg/' + $scope.websiteID + ".svg" };
                        break;
                }
                var urlAA = s3.getSignedUrl('getObject', paramsAA);
                $scope.downloadURL = urlAA;
                switch ($scope.rootScope.type) {
                    case "相片":
                        var urlAA2 = s3.getSignedUrl('getObject', paramsAA2);
                        $scope.downloadURL2 = urlAA2;
                        break;
                    case "插畫":
                        var urlAA2 = s3.getSignedUrl('getObject', paramsAA2);
                        $scope.downloadURL2 = urlAA2;
                        var urlAA3 = s3.getSignedUrl('getObject', paramsAA3);
                        $scope.downloadURL3 = urlAA3;
                        break;
                }

                /*Not use by the popup, but necessary to get all the item for doing batch operation*/
                $scope.descc = result.data._source.desc;
                $scope.galleryType = result.data._source.galleryType;
                $scope.status = result.data._source.status;
                $scope.JSONcheck = result.data._source.JSONcheck;
                $scope.newVersion = result.data._source.newVersion;
                switch ($scope.rootScope.type) {
                    case "相片":
                        $scope.original_url = result.data._source.original_url;
                        $scope.large_url = result.data._source.large_url;
                        $scope.mid_url = result.data._source.mid_url;
                        $scope.small_url = result.data._source.small_url;
                        break;
                    case "插畫":
                        $scope.png_url = result.data._source.png_url;
                        $scope.svg_url = result.data._source.svg_url;
                        $scope.eps_url = result.data._source.eps_url;
                        break;
                }
                /**/

                console.log($scope.tags);
                $scope.addCount();
            });
        }

        $scope.getImage = function(key) {
            console.log(key);
            var s3 = new AWS.S3();
            var params = { Bucket: "designerrrr-output", Key: key };
            var url = s3.getSignedUrl('getObject', params);
            console.log(url);
            return url;
        }
        $scope.delete = function(ev) {
            console.log("vvvv delete ret");
            console.log($scope.websiteID);
            var obj = {};
            obj.tORf = true;
            obj.id = $scope.websiteID;
            obj.type = $scope.originalType;
            $mdDialog.hide(obj);
        }


        //For toast popup use
        var last = {
            bottom: true,
            top: false,
            left: false,
            right: true
        };
        $scope.toastPosition = angular.extend({}, last);
        $scope.getToastPosition = function() {
            sanitizePosition();

            return Object.keys($scope.toastPosition)
                .filter(function(pos) { return $scope.toastPosition[pos]; })
                .join(' ');
        };

        function sanitizePosition() {
            var current = $scope.toastPosition;

            if (current.bottom && last.top) current.top = false;
            if (current.top && last.bottom) current.bottom = false;
            if (current.right && last.left) current.left = false;
            if (current.left && last.right) current.right = false;

            last = angular.extend({}, current);
        }
        // /For toast popup use


        $scope.save = function() {
            var urlS = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/hohopost-user-newdb";
            var savePitem = {
                galleryType: $scope.galleryType,
                clickRate: $scope.clickRate + 1,
                desc: $scope.descc,
                downloaded: $scope.downloadRate,
                owner_id: $scope.owner_id,
                price: $scope.price,
                rating: $scope.rating,
                remark: $scope.desc,
                status: $scope.status,
                category: $scope.type,
                original_name: $scope.original,
                tags: $scope.tags,
                JSONcheck: $scope.JSONcheck,
                newVersion: $scope.newVersion
            };
            switch ($scope.rootScope.type) {
                case "相片":
                    savePitem["original_url"] = $scope.original_url;
                    savePitem["large_url"] = $scope.large_url;
                    savePitem["mid_url"] = $scope.mid_url;
                    savePitem["small_url"] = $scope.small_url;
                    break;
                case "插畫":
                    savePitem["png_url"] = $scope.png_url;
                    savePitem["svg_url"] = $scope.svg_url;
                    savePitem["eps_url"] = $scope.eps_url;
                    break;
            }
            var paramsS = {
                "operation":"update",
                "index": "dazzle",
                "type":"gallery",
                "id": $scope.websiteID,
                "doc": savePitem,
            };
            console.log(paramsS);
            $http.post(urlS, paramsS).then(function(result) {
                console.log("vvvv save 2");
                console.log(result);
                var pinTo = $scope.getToastPosition();
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('已儲存')
                    .position(pinTo)
                    .hideDelay(3000)
                );
                $scope.rootScope.getTags().then(function(result) {
                    console.log("vvvv getT");
                    $scope.rootScope.tags = result.data;
                });
            });

        }
        $scope.updateDownload = function() {
            console.log("updateDownload");
            var urlC = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/hohopost-user-newdb";
            var paramsC = {
                "operation": "update",
                "index": "gallery",
                "type":"table",
                "id": $scope.websiteID,
                "doc": {
                    downloaded: $scope.downloadRate + 1
                }
            };
            $http.post(urlC, paramsC).then(function(result) {
                console.log('Added downloadRate', result);
            });
        }
        $scope.cancel = function() {
            $mdDialog.cancel();
        }
        $scope.vvvv = function() {
            var urlC = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";

            function todo(key) {
                var paramsV = {
                    "operation": "list",
                    "accessKeyId": "sdasda",
                    "secretAccessKey": "asdsa",
                    "sessionToken": "vhndi757Bydd",
                    "TableName": "dazzle-gallery",
                    "Limit": 1
                };
                if (key) {
                    console.log("vvvv whyyyy2");
                    paramsV.ExclusiveStartKey = key;
                }
                $http.post(urlC, paramsV).then(function(result) {
                    if (!result.data.LastEvaluatedKey) {
                        console.log("vvvv FINNNNN");
                    }
                    console.log('vvvv vvvv', result);
                    if (result.data.Items.length > 0) {
                        var paramsC = {
                            "operation": "update",
                            "accessKeyId": "sdasda",
                            "secretAccessKey": "asdsa",
                            "sessionToken": "vhndi757Bydd",
                            "TableName": "dazzle-gallery",
                            "Key": {
                                "gid": result.data.Items[0].gid
                            },
                            "UpdateExpression": "set #status = :status",
                            "ExpressionAttributeNames": {
                                "#status": "status"
                            },
                            "ExpressionAttributeValues": {
                                ":status": "未出售"
                            }
                        };
                        $http.post(urlC, paramsC).then(function(result2) {
                            console.log('vvvv', result2);
                            if (result.data.LastEvaluatedKey) {
                                console.log("vvvv whyyyy1");
                                todo(result.data.LastEvaluatedKey);
                            }
                        });
                    } else {
                        console.log("0 length");
                        if (result.data.LastEvaluatedKey) {
                            todo(result.data.LastEvaluatedKey);
                        }
                    }
                });
            }
            todo();
        }
        $scope.vvvv2 = function() {
            var urlC = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
            var arrayyy = [];

            function todo(key) {
                var paramsV = {
                    "operation": "list",
                    "accessKeyId": "sdasda",
                    "secretAccessKey": "asdsa",
                    "sessionToken": "vhndi757Bydd",
                    "TableName": "dazzle-gallery"
                };
                if (key) {
                    console.log("vvvv whyyyy2");
                    paramsV.ExclusiveStartKey = key;
                }
                $http.post(urlC, paramsV).then(function(result) {
                    console.log(result);
                    if (!result.data.LastEvaluatedKey) {
                        console.log("vvvv FINNNNN");
                        arrayyy.concat(result.data.Item);
                        console.log(arrayyy);
                    } else {
                        arrayyy.concat(result.data.Item);
                        todo(result.data.LastEvaluatedKey);
                    }
                });
            }
            todo();
        }
        $scope.vvvv3 = function() {
            var urlD = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/again";
            var paramsD = {
                "vvvv": "vvvvabcd",
            };
            $http.post(urlD, paramsD).then(function(result) {
                console.log(result);
            });
        }
        $scope.vvvv4 = function() {
            var urlvvvv = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
            var bigURL = [];

            function todo2(i) {
                console.log("times");
                console.log(i);
                if (i == bigURL.length) {
                    console.log("enDDDDDD!!!!");
                    return;
                }
                if (!bigURL[i].tags) {
                    console.log("tagssssssss");
                    var urltt = "https://d8fz9pfue5.execute-api.ap-northeast-1.amazonaws.com/prod/updatetag";
                    if (bigURL[i].mid_url) {
                        console.log("midddddd urllllll");
                        var url = bigURL[i].mid_url.replace("medium", "medium-web");
                        console.log(url);
                        console.log(bigURL[i].gid);
                        var paramstt = {
                            "url": url,
                            "gid": bigURL[i].gid
                        };
                        $http.post(urltt, paramstt).then(function(result2) {
                            console.log("updateeee");
                            console.log(result2);
                            i++;
                            todo2(i);
                        });
                    } else {
                        i++;
                        todo2(i);
                    }
                } else {
                    i++;
                    todo2(i);
                }
            }

            function todo(key) {
                var paramsvvvv = {
                    "operation": "list",
                    "accessKeyId": "sdasda",
                    "secretAccessKey": "asdsa",
                    "sessionToken": "vhndi757Bydd",
                    "TableName": "dazzle-gallery"
                };
                if (key) {
                    console.log("keyyyyy");
                    paramsvvvv.ExclusiveStartKey = key;
                }
                $http.post(urlvvvv, paramsvvvv).then(function(result) {
                    console.log(result.data.Items);
                    bigURL = bigURL.concat(result.data.Items);
                    if (result.data.LastEvaluatedKey) {
                        todo(result.data.LastEvaluatedKey);
                    } else {
                        console.log(bigURL);
                        todo2(0);
                    }
                });
            }
            todo();
        }
        $scope.vvvv5 = function() {
            var urlvvvv = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
            $scope.i = 0;

            function todo(key) {
                $scope.i++;
                console.log("times");
                console.log($scope.i);
                var paramsvvvv = {
                    "operation": "list",
                    "accessKeyId": "sdasda",
                    "secretAccessKey": "asdsa",
                    "sessionToken": "vhndi757Bydd",
                    "TableName": "dazzle-gallery",
                    "Limit": 1
                };
                if (key) {
                    console.log("keyyyyy");
                    paramsvvvv.ExclusiveStartKey = key;
                }
                $http.post(urlvvvv, paramsvvvv).then(function(result) {
                    console.log(result);
                    if (!result.data.Items[0].tags) {
                        console.log("tagssssssss");
                        var urltt = "https://d8fz9pfue5.execute-api.ap-northeast-1.amazonaws.com/prod/updatetag";
                        if (result.data.Items[0].mid_url) {
                            console.log("midddddd urllllll");
                            var url = result.data.Items[0].mid_url.replace("medium", "medium-web");
                            console.log(url);
                            console.log(result.data.Items[0].gid);
                            var paramstt = {
                                "url": url,
                                "gid": result.data.Items[0].gid
                            };
                            $http.post(urltt, paramstt).then(function(result2) {
                                console.log("updateeee");
                                console.log(result2);
                                if (result.data.LastEvaluatedKey) {
                                    todo(result.data.LastEvaluatedKey);
                                }
                            });
                        } else if (result.data.LastEvaluatedKey) {
                            todo(result.data.LastEvaluatedKey);
                        }
                    } else if (result.data.LastEvaluatedKey) {
                        todo(result.data.LastEvaluatedKey);
                    }
                });
            }
            todo();
        }
        $scope.vvvv6 = function() {
            var urlvvvv = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
            var paramsvvvv = {
                "operation": "list",
                "accessKeyId": "sdasda",
                "secretAccessKey": "asdsa",
                "sessionToken": "vhndi757Bydd",
                "TableName": "dazzle-transaction"
            };
            $http.post(urlvvvv, paramsvvvv).then(function(result) {
                console.log(result);

                for(i=0;i<result.data.Items.length;i++){
                    if (i == result.data.Items.length) {
                        return;
                    }
                    console.log(result.data.Items[i]);
                    var u2u2 = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/hohopost-user-newdb";
                    var paramsvvvv2 = {
                        "operation": "create",
                        "type": "dazzle-transaction-test",
                        "id": result.data.Items[i].id,
                        "body": result.data.Items[i]
                    };
                    $http.post(u2u2, paramsvvvv2).then(function(result2) {
                        console.log("elasticccc 66666");
                        console.log(result2.data);
                    });
                }
            });
        }
        $scope.vvvv7 = function() {
            var u2u2 = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/hohopost-user-newdb";
            var paramsvvvv2 = {
                "operation": "listAll",
                "type": "dazzle-transaction",
                "size":1000,
                "from":0
            };
            $http.post(u2u2, paramsvvvv2).then(function(result) {
                console.log("elasticccc 77777");
                console.log(result.data);
            });
        }

    });
    app.controller('soldImageController', function($scope, $http, $filter, $mdDialog, $mdBottomSheet, $mdToast) {
        $scope.eachShowNum = 500;
        console.log("vvvv vvvv 8");
        //for upload user defind data
        $scope.userType = '相片';
        //$scope.types = ("相片 插畫 3D模型 字型 LOGO 網站樣辦").split(' ').map(function(type) { //use later
        $scope.types = ("相片 插畫").split(' ').map(function(type) {
            return { abbrev: type };
        });

        $scope.init = function(type) {
            //$scope.$apply(function(){
            $scope.type = type;
            $scope.allNewArray = [];
            $scope.deleting = false;
            $scope.loading = true;
            $scope.end = false;
            $scope.tags = [];
            $scope.selected = [];
            $scope.selecting = false;
            $scope.deletedURL = [];
            $scope.selectedTags = [];
            $scope.LastEvaluatedKey = null;
            $scope.websitesAngularGridOptions = {
                gridWidth: 200,
                gutterSize: 4,
                infiniteScrollDelay: 1000,
                infiniteScrollDistance: 95,
                scrollContainer: '#sidecontent'
            }
            $scope.inited = false;
            $scope.websites = [];
            //});
            switch ($scope.type) {
                case "相片":
                    console.log("vvvv 相片");
                    $scope.px = 'images/' + $scope.user.uid + '/medium-web/';
                    $scope.nowType = ".jpg";
                    break;
                case "插畫":
                    console.log("vvvv 插畫");
                    $scope.px = 'illustration/' + $scope.user.uid + '/png/';
                    $scope.nowType = ".png";
                    break;
            }
            console.log('myPhotosController');
            console.log($scope.user.uid);
            console.log(AWS.config);

            var getBoughtUrl = "https://d8fz9pfue5.execute-api.ap-northeast-1.amazonaws.com/prod/getboughtimage";
            var gbParams = {
                "sellerId": $scope.user.uid,
                "type": type,
                "sell": true
            }
            console.log(gbParams);
            $http.post(getBoughtUrl, gbParams).then(function(result) {
                console.log("vvvv newGet");
                console.log(result);
                var ay = [];
                if (!result.data.errorMessage) {
                    console.log(result.data.Responses["dazzle-gallery"]);
                    var dg = result.data.Responses["dazzle-gallery"];
                    for (i = 0; i < dg.length; i++) {
                        switch ($scope.type) {
                            case "相片":
                                var dg1 = dg[i].mid_url.replace("https://designerrrr-output.s3-ap-northeast-1.amazonaws.com/", "");
                                var dgg = dg1.replace("medium", "medium-web");
                                break;
                            case "插畫":
                                var dg1 = dg[i].png_url.replace("https://designerrrr-output.s3-ap-northeast-1.amazonaws.com/", "");
                                var dgg = dg1;
                                break;
                        }
                        ay = ay.concat({ Key: dgg });
                    }
                }
                var dataa = {};
                dataa.Contents = ay;
                console.log(dataa);
                $scope.data = dataa;
                $scope.getWebsites($scope.eachShowNum, 0).then(function(anArray) {
                    $scope.$apply(function() {
                        $scope.inited = true;
                        $scope.loading = false;
                        $scope.websites = $scope.websites.concat(anArray);
                        $scope.LastEvaluatedKey = $scope.eachShowNum;
                        console.log("vvvv $scope.websites");
                        console.log($scope.websites);
                    });
                });
            });
        }
        /*
        $scope.tagClicked = function(tag) {
            console.log("vvvv tc1");
            $scope.selectedTags = [];
            $scope.selectedTags.push(tag);
            $scope.tagsChanged();
        }
        $scope.tagsChanged = function() {
            console.log("vvvv tc2");
            $scope.loading = true;
            $scope.end = false;
            $scope.LastEvaluatedKey = null;
            $scope.websites = [];
            if ($scope.selectedTags.length <= 0) {
                $scope.getWebsites($scope.eachShowNum, 0).then(function(anArray) {
                    $scope.$apply(function() {
                        $scope.loading = false;
                        anArray = $scope.allNewArray.concat(anArray);
                        $scope.websites = $scope.websites.concat(anArray);
                        $scope.LastEvaluatedKey = $scope.eachShowNum;
                    });
                });
            } else {
                var uniArray = [];
                var done = [];
                for (var i = 0; i < $scope.selectedTags.length; i++) {
                    $scope.getWebsitesByTag($scope.selectedTags[i]).then(function(anArray) {
                        $scope.$apply(function() {
                            uniArray = uniArray.concat(anArray);
                            done.push({});
                            if (done.length == $scope.selectedTags.length) {
                                uniArray = uniArray.filter(function(elem, pos) {
                                    return uniArray.indexOf(elem) == pos;
                                });
                                $scope.websites = $scope.websites.concat(uniArray);
                                console.log($scope.websites);
                            }
                        });
                    });
                }
                $scope.loading = false;
                $scope.end = true;
            }
        }
        $scope.queryTags = function(query) {
            console.log(query);
            return $filter('filter')(angular.lowercase($scope.tags), angular.lowercase(query));
        }
        $scope.getTags = function() {
            return new Promise(function(resolve, reject) {
                var data = {};
                data.userName = $scope.user.uid;
                data.type = $scope.type;
                console.log("vvvv whyyyyyy 323232");
                console.log($scope.user.uid);
                $http({
                    "method": "post",
                    "url": "https://9g1gx9kfdc.execute-api.ap-northeast-1.amazonaws.com/dazzlegallery/gettags",
                    "data": data
                }).then(function(result) {
                    console.log("vvvv getTag");
                    console.log(result);
                    if (result.data.code > 0) {
                        resolve(result.data);
                    } else {
                        reject(result.data.text);
                    }
                })
            })
        }
        $scope.getWebsitesByTag = function(tag) {
            return new Promise(function(resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://9g1gx9kfdc.execute-api.ap-northeast-1.amazonaws.com/dazzlegallery/getid",
                    "data": {
                        "tag": tag,
                        "action": "bytag",
                        "owner_id": $scope.user.uid,
                        "type": $scope.type
                    }
                }).then(function(result) {
                    console.log(result);
                    if (result.data.code > 0) {
                        var s3 = new AWS.S3();
                        var anArray = [];
                        for (i = 0; i < result.data.data.length; i++) {
                            var theID = result.data.data[i].gid;
                            switch ($scope.type) {
                                case "相片":
                                    console.log("vvvv 相片 2");
                                    var theLink = "images/" + $scope.user.uid + "/medium-web/" + theID + ".jpg"
                                    break;
                                case "插畫":
                                    console.log("vvvv 插畫 2");
                                    var theLink = "illustration/" + $scope.user.uid + "/png/" + theID + ".png"
                                    break;
                            }
                            var params = {
                                Bucket: "designerrrr-output",
                                Key: theLink
                            };
                            var url = s3.getSignedUrl('getObject', params);
                            anArray[i] = url;
                        }
                        console.log(anArray);
                        resolve(anArray);
                    } else {
                        resolve([]);
                    }
                });
            });
        }*/
        $scope.loadMore = function() {
            console.log("loadMore");
            if (!$scope.end && !$scope.loading) {
                $scope.loading = true;
                $scope.getWebsites($scope.eachShowNum, $scope.LastEvaluatedKey).then(function(anArray) {
                    $scope.loading = false;
                    if (anArray.length > 0) {
                        $scope.websites = $scope.websites.concat(anArray);
                        $scope.LastEvaluatedKey = $scope.LastEvaluatedKey + $scope.eachShowNum;
                    } else {
                        $scope.end = true;
                    }
                });
            }
        }
        $scope.getWebsites = function(limit, key) {
            return new Promise(function(resolve, reject) {
                console.log("getWebsites");
                var data = $scope.data;
                console.log(data);
                var anArray = [];
                var counter = 0;
                var s3 = new AWS.S3();
                if ($scope.LastEvaluatedKey < data.Contents.length && data.Contents.length - $scope.LastEvaluatedKey < $scope.eachShowNum) { //show photo when unshow photo less than 50
                    console.log("if");
                    for (i = (0 + key); i < data.Contents.length; i++) {
                        var checkID = data.Contents[i].Key.substring(data.Contents[i].Key.lastIndexOf("/") + 1).replace($scope.nowType, "");
                        console.log("vvvv checkID");
                        console.log(checkID);
                        var notLoad = false;
                        for (j = 0; j < $scope.deletedURL.length; j++) {
                            if ($scope.deletedURL[j] == checkID) {
                                notLoad = true;
                            }
                        }
                        if (notLoad) {
                            console.log("dead img found");
                        } else {
                            console.log("dead img else");
                            var params = {
                                Bucket: "designerrrr-output",
                                Key: data.Contents[i].Key
                            };
                            var url = s3.getSignedUrl('getObject', params);
                            anArray[counter] = url;
                            counter++;
                        }
                    }
                    if ($scope.data.Contents.length <= $scope.eachShowNum) {
                        console.log("endFirst");
                        $scope.end = true;
                    }
                    console.log(anArray);
                    resolve(anArray);
                } else if ($scope.LastEvaluatedKey < data.Contents.length) {
                    console.log("else if");
                    for (i = (0 + key); i < (limit + key); i++) {
                        console.log("vvvv for");
                        console.log(data.Contents[i]);
                        console.log(data.Contents[i].Key);
                        var checkID = data.Contents[i].Key.substring(data.Contents[i].Key.lastIndexOf("/") + 1).replace($scope.nowType, "");
                        console.log("vvvv checkID");
                        console.log(checkID);
                        var notLoad = false;
                        for (j = 0; j < $scope.deletedURL.length; j++) {
                            if ($scope.deletedURL[j] == checkID) {
                                notLoad = true;
                            }
                        }
                        if (notLoad) {
                            console.log("dead img found");
                        } else {
                            console.log("dead img else");
                            var params = {
                                Bucket: "designerrrr-output",
                                Key: data.Contents[i].Key
                            };
                            var url = s3.getSignedUrl('getObject', params);
                            anArray[counter] = url;
                            counter++;
                        }
                    }
                    console.log(anArray);
                    resolve(anArray);
                } else {
                    if ($scope.websites.length == 0) {
                        console.log("vvvv first 0");
                        $scope.inited = true;
                        $scope.loading = false;
                        $scope.LastEvaluatedKey = 0;
                    }
                    $scope.end = true;
                    console.log("reject");
                    reject("end");
                }
            });
        }
        $scope.getImage = function(key) {
            var s3 = new AWS.S3();
            var params = {
                Bucket: "designerrrr-output",
                Key: key
            };
            var url = s3.getSignedUrl('getObject', params);
            console.log(url);
            return url;
        }
        //For toast popup use
        var last = {
            bottom: true,
            top: false,
            left: false,
            right: true
        };
        $scope.toastPosition = angular.extend({}, last);
        $scope.getToastPosition = function() {
            sanitizePosition();
            return Object.keys($scope.toastPosition).filter(function(pos) {
                return $scope.toastPosition[pos];
            }).join(' ');
        };

        function sanitizePosition() {
            var current = $scope.toastPosition;
            if (current.bottom && last.top) current.top = false;
            if (current.top && last.bottom) current.bottom = false;
            if (current.right && last.left) current.left = false;
            if (current.left && last.right) current.right = false;
            last = angular.extend({}, current);
        }
        // /For toast popup use
        $scope.showPhoto = function(website, index) {
            //尋日做到show photo,要改show photo.js showPhoto.html d type 同 url2017 7 26
            console.log(index);
            //console.log($scope.websites[index]);
            $mdDialog.show({
                controller: "showPhotoController",
                templateUrl: 'templates/showPhoto.html',
                escapeToClose: false,
                clickOutsideToClose: false,
                locals: {
                    website: website,
                    rootScope: $scope,
                    bought: true,
                    sold:true
                }
            }).then(function(objj) {
                console.log("vvvv showPhoto then");
                console.log(objj);
                /*
                if (objj.tORf) {
                    var confirm = $mdDialog.confirm().title('刪除圖片').textContent('你真的要刪除此圖片嗎?').ariaLabel('Lucky day').ok('刪除').cancel('取消');
                    $mdDialog.show(confirm).then(function() {
                        $scope.selected = [];
                        $scope.deleting = true;
                        var delID = $scope.websites[index].substring(0, $scope.websites[index].indexOf($scope.nowType + "?AWSAccessKeyId")).replace($scope.nowType + "?AWSAccessKeyId", "");
                        console.log(delID);
                        delID = delID.substring(delID.lastIndexOf("/") + 1);
                        console.log(delID);
                        $scope.deletedURL.push(delID);
                        console.log("vvvv dellll");
                        console.log($scope.deletedURL);
                        //This part is for a special case that user delete the photo just upload in same page
                        for (i = 0; i < $scope.allNewArray.length; i++) {
                            console.log($scope.allNewArray[i]);
                            console.log($scope.websites[index]);
                            if ($scope.allNewArray[i] === $scope.websites[index]) {
                                console.log("same!");
                                $scope.allNewArray.splice(i, 1);
                            }
                        }
                        //This part is for arrange the pictures after delete.
                        $scope.websites.splice(index, 1);
                        setTimeout(function() {
                            var temp = $scope.websites.length;
                            console.log("vvvv thennnn7");
                            $scope.temp = temp;
                            $scope.websites = $scope.websites.concat(["https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png"]);
                        }, 1500);
                        setTimeout(function() {
                            console.log("vvvv 2000 thennnn7");
                            $scope.websites.splice($scope.temp, 1);
                            $scope.deleting = false;
                        }, 4000);
                        // /This part is for arrange the pictures after delete.
                        var url = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
                        var params = {
                            "operation": "delete",
                            "accessKeyId": "sdasda",
                            "secretAccessKey": "asdsa",
                            "sessionToken": "vhndi757Bydd",
                            "TableName": "dazzle-gallery",
                            "Key": {
                                "gid": objj.id
                            }
                        }
                        $http.post(url, params).then(function(result) {
                            console.log("deleted");
                            console.log(result);
                            var pinTo = $scope.getToastPosition();
                            $scope.getTags().then(function(result) {
                                $scope.tags = result.data;
                            });
                            $mdToast.show($mdToast.simple().textContent('已刪除').position(pinTo).hideDelay(3000));
                        });
                        var s3 = new AWS.S3();
                        switch ($scope.type) {
                            case "相片":
                                console.log("vvvv 相片 3");
                                var diffObj = [{
                                    Key: "images/" + $scope.user.uid + "/large/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/large-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/medium/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/medium-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/small/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/small-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/thumbnail/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/thumbnail-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/original/" + objj.id + objj.type
                                }];
                                break;
                            case "插畫":
                                console.log("vvvv 插畫 3");
                                var diffObj = [{
                                    Key: "illustration/" + $scope.user.uid + "/eps/" + objj.id + ".eps"
                                }, {
                                    Key: "illustration/" + $scope.user.uid + "/svg/" + objj.id + ".svg"
                                }, {
                                    Key: "illustration/" + $scope.user.uid + "/png/" + objj.id + ".png"
                                }];
                                break;
                        }

                        var paramsDel = {
                            Bucket: "designerrrr-output",
                            Delete: {
                                Objects: diffObj,
                                Quiet: false
                            }
                        };
                        s3.deleteObjects(paramsDel, function(err, data) {
                            if (err) {
                                console.log("s3 fail");
                                console.log(err);
                            } else {
                                console.log("delete from s3 successful");
                                console.log(data);
                                console.log($scope.websites);
                                //$scope.init();
                                /*for(i=0;i<$scope.websites.length;i++){
                                    if($scope.websites[i].indexOf(objj.id)!=-1){
                                        console.log("splice ok");
                                        $scope.websites.splice(i,1);
                                    }
                                }
                                console.log($scope.websites);*/
                /*}
                        });
                    }, function() {});
                }*/
            });
        }
        $scope.toggle = function(item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            } else {
                list.push(item);
            }
        };
        $scope.toggleAll = function(item) {
            if ($scope.selected.length === $scope.websites.length) {
                $scope.selected = [];
            } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
                $scope.selected = $scope.websites.slice(0);
            }
        }
        $scope.exists = function(item, list) {
            return list.indexOf(item) > -1;
        };
        $scope.select = function() {
            $scope.selecting = true;
        }
        $scope.selectCancel = function() {
            $scope.selected = [];
            $scope.selecting = false;
        }
        $scope.downloadAll = function() {
            if ($scope.selected.length != 0) {
                var allID = [];
                console.log($scope.selected);
                for (i = 0; i < $scope.selected.length; i++) {
                    allID[i] = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId")).substring($scope.selected[i].lastIndexOf("/") + 1).replace($scope.nowType, "");
                }
                console.log(allID);
                $mdDialog.show({
                    controller: "batchDownloadPopupController",
                    templateUrl: 'templates/batchDownloadPopup.html',
                    escapeToClose: false,
                    clickOutsideToClose: false,
                    locals: {
                        allID: allID,
                        type: $scope.type
                    }
                }).then(function() {});
            } else {
                var pinTo = $scope.getToastPosition();
                $mdToast.show($mdToast.simple().textContent('請選擇項目').position(pinTo).hideDelay(3000));
            }
        }
        /*
        $scope.deleteAll = function(website) {
            var allID = [];
            console.log($scope.selected);
            for (i = 0; i < $scope.selected.length; i++) {
                allID[i] = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId")).substring($scope.selected[i].lastIndexOf("/") + 1).replace($scope.nowType, "");
            }
            console.log(allID);
            var confirm = $mdDialog.confirm().title('刪除圖片').textContent('你真的要刪除' + $scope.selected.length + '張圖片嗎?').ariaLabel('Lucky day').ok('刪除').cancel('取消');
            $mdDialog.show(confirm).then(function() {
                $scope.deleteAllPhoto();
                $scope.deleteAllData();
            });
        }
        $scope.upload = function() {
            console.log("vvvv upload");
            console.log($scope.user);
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'templates/upload.html',
                controller: 'uploadController',
                clickOutsideToClose: false,
                disableParentScroll: false,
                locals: {
                    bucket: "designerrrr-output",
                    key: $scope.px,
                    rootScope: $scope
                }
            }).then(function(uploadedFiles) {
                $scope.getTags().then(function(result) {
                    $scope.tags = result.data;
                });
                console.log("vvvv then");
                console.log(uploadedFiles);
                var newItemArray = [];
                console.log("vvvv md dialog");
                if (uploadedFiles.length != 0) {
                    for (i = 0; i < uploadedFiles.length; i++) {
                        newItemArray[i] = $scope.getImage(uploadedFiles[i].path);
                    }
                    console.log(newItemArray);
                    if ($scope.allNewArray.length == 0) {
                        $scope.allNewArray = newItemArray;
                    } else {
                        $scope.allNewArray = newItemArray.concat($scope.allNewArray);
                    }
                    $scope.websites = newItemArray.concat($scope.websites);
                }
                //$scope.websites.concat(uploadedFiles);
            }).catch(function(error) {
                // User clicked outside or hit escape 
            });
        };
        $scope.changeTagsAll = function() {
            console.log("AAAA");
            //console.log($scope.websites[index]);
            $mdDialog.show({
                controller: "changeTagController",
                templateUrl: 'templates/changeTag.html',
                escapeToClose: false,
                clickOutsideToClose: false,
                locals: {
                    rootScope: $scope
                }
            }).then(function(tagNeedToBeAdded) {
                console.log($scope.selected);
                $scope.saveAllTagtoPhoto(tagNeedToBeAdded);
            });
        }
        $scope.saveAllTagtoPhoto = function(SelectedTag) {
            console.log("AAAAA");
            for (i = 0; i < $scope.selected.length; i++) {
                var thisPhotoId = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId"));
                thisPhotoId = thisPhotoId.substring(thisPhotoId.lastIndexOf("/") + 1);
                thisPhotoId = thisPhotoId.substring(0, thisPhotoId.lastIndexOf("."));
                console.log(thisPhotoId);
                var url = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
                var params = {
                    "operation": "get",
                    "accessKeyId": "sdasda",
                    "secretAccessKey": "asdsa",
                    "sessionToken": "vhndi757Bydd",
                    "TableName": "dazzle-gallery",
                    "Key": {
                        "gid": thisPhotoId
                    }
                }
                $http.post(url, params).then(function(result) {
                    console.log("db successful");
                    console.log(result);
                    $scope.checking = false;
                    $scope.tags = result.data.Item.tags;
                    console.log($scope.tags);
                    for (i = 0; i < SelectedTag.length; i++) {
                        $scope.tags.push(SelectedTag[i]);
                    }
                    console.log($scope.tags);
                    $scope.tags = $scope.tags.filter(function(elem, pos) {
                        return $scope.tags.indexOf(elem) == pos;
                    })
                    console.log($scope.tags);
                    result.data.Item.tags = $scope.tags;
                    $scope.save(result.data.Item);
                })
            }
        }
        $scope.save = function(Item) {
            var urlS = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
            var paramsS = {
                "operation": "batchWrite",
                "accessKeyId": "sdasda",
                "secretAccessKey": "asdsa",
                "sessionToken": "vhndi757Bydd",
                "RequestItems": {
                    "dazzle-gallery": [{
                        PutRequest: {
                            Item: Item
                        }
                    }]
                }
            };
            console.log(paramsS);
            $http.post(urlS, paramsS).then(function(result) {
                console.log("vvvv save 2");
                console.log(result);
                var pinTo = $scope.getToastPosition();
                $mdToast.show($mdToast.simple().textContent('已儲存').position(pinTo).hideDelay(3000));
                $scope.getTags().then(function(result) {
                    console.log("vvvv getT");
                    $scope.rootScope.tags = result.data;
                });
            });
        }*/
        $scope.selectType = function(type) {
            console.log("vvvv select");
            console.log(type);
            $scope.init(type);
        }
    });
    app.controller('uploadController', function($scope, $http, $dazzleS3, $mdBottomSheet, $mdDialog,$dazzleUser, bucket, key, rootScope) {
        console.log("vvvv vvvv 4");
        $scope.privateORpublic = false;
        $scope.bucket = bucket;
        $scope.key = key;
        $scope.uploading = false;
        $scope.rootScope = rootScope;
        $scope.uploadedFiles = [];
        console.log($scope.bucket);
        console.log($scope.key);
        $scope.idArray = [];
        $dazzleS3.getFile("designerrrr", "cusWatermark/" + $scope.rootScope.user.uid + "/image.png").then(function(data) {
            console.log("okkkk check cus");
            $scope.cusWatermarkURL = "https://designerrrr.s3-ap-northeast-1.amazonaws.com/cusWatermark/" + $scope.rootScope.user.uid + "/image.png";
        },function (err) {
            console.log("okkkk check cus nooooo");
            $scope.cusWatermarkURL = "https://designerrrr.s3-ap-northeast-1.amazonaws.com/new-logo.png";
            $scope.notSet = true;
        });
        
        //for upload user defind data
        $scope.userType = '相片';
        //$scope.types = ("相片 插畫 3D模型 字型 LOGO 網站樣辦").split(' ').map(function(type) { //use later
        $scope.types = ("相片 插畫 影片").split(' ').map(function(type) {
            return { abbrev: type };
        });
        console.log("vvvv check user or not");
        console.log($dazzleUser.getUser());
        if($dazzleUser.getUser().type=='user'){
            $scope.allBoxes = ["版權未明", "私人", "非賣品", "免費下載"];
        }else{
            $scope.allBoxes = ["可出售", "版權未明", "私人", "非賣品", "免費下載"];
        }
        $scope.selecteDboxes = ["私人"];
        $scope.toggle = function(item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            } else {
                list.push(item);
            }
            if(list.indexOf("可出售")!=-1){
                console.log("vvvv 可出售");
                $scope.privateORpublic = true;
            }else{
                console.log("else");
                console.log($scope.selecteDboxes);
                $scope.privateORpublic = false;
                $scope.authorize = "-";
                $scope.dollar = 0.0;
            }
        };
        $scope.exists = function(item, list) {
            return list.indexOf(item) > -1;
        };

        $scope.cusWatermark = false;
        $scope.cusWatermarkShow = function(tf) {
            if (tf) { return "使用自訂水印" } else { return "使用預設水印" }
        }
        $scope.descNew = "-";
        $scope.tagsNew = [];
        $scope.authorize = "-";
        $scope.dollar = 0.0;

        $scope.upload = function() {
            $scope.uploading = true;
            $scope.uploaded = 0;
            for (var i = 0; i < $scope.files.length; i++) {
                console.log($scope.files[i]);
                $scope.uploadThis($scope.files[i]);
            }
        }
        $scope.uploadAgain = function() {
            $scope.uploading = false;
            $scope.uploaded = 0;
            $scope.files = [];
        }
        $scope.uploadThis = function(file) {
            var fid = "id" + new Date().getTime();
            var s3 = new AWS.S3();
            $scope.idArray.push(fid);
            var realFileType = file.lfFileType.substring(file.lfFileType.indexOf("/") + 1);
            if (realFileType == "jpeg") {
                realFileType = "jpg";
            }
            var arrayTOstring = $scope.tagsNew.join(';;');
            switch ($scope.userType) {
                case "相片":
                    var diffType = "images/";
                    break;
                case "插畫":
                    var diffType = "illustration/";
                    break;
            }
            var cusMark = "notCus";
            if ($scope.cusWatermark) {
                cusMark = "cus";
            }
            var params = {
                Bucket: "designerrrr",
                Key: diffType + $scope.rootScope.user.uid + "/" + fid + "." + realFileType,
                ContentType: file.lfFileType,
                Body: file.lfFile,
                Metadata: {
                    "newVersion": "new",
                    "gid": fid.toString(),
                    "owner_id": $scope.rootScope.user.uid,
                    "original_name": encodeURIComponent(file.lfFileName),
                    "galleryType": "photo",
                    "category": encodeURIComponent($scope.userType),
                    "status": encodeURIComponent($scope.selecteDboxes),
                    "tags": encodeURIComponent(arrayTOstring),
                    "remark": encodeURIComponent($scope.descNew),
                    "authorize": encodeURIComponent($scope.authorize),
                    "price": $scope.dollar.toString(),
                    "cusWatermark": cusMark
                }
            };
            console.log(params);
            file.upload = s3.upload(params);

            file.upload.on('httpUploadProgress', function(evt) {
                file.uploadProgress = parseInt((evt.loaded * 100) / evt.total);
            });

            file.upload.send(function(err, data) {
                console.log(err);
                console.log(data);
                console.log(file);
                $scope.uploadedFiles.push(file);
                $scope.$apply(function() {
                    $scope.uploaded++;
                    if ($scope.uploaded == $scope.files.length) {
                        console.log("finish");
                        console.log($scope.files);
                        $mdDialog.show({
                            controller: 'imgLoadPopupController',
                            templateUrl: 'templates/imgLoadPopup.html',
                            clickOutsideToClose: false,
                            fullscreen: false, // Only for -xs, -sm breakpoints.
                            locals: {
                            }
                        })
                    }
                });
            });

        }
        $scope.remove = function(index) {
            $scope.files[index].upload.abort();
            $scope.files.splice(index, 1);
            $scope.uploaded--;
            if ($scope.files.length <= 0) {
                $scope.uploading = false;
                $scope.uploaded = 0;
            }
        }
        $scope.close = function() {
            console.log("vvvv close");
            /*
            var uploadedFiles = [];
            for (var i = 0; i < $scope.uploadedFiles.length; i++) {
                var realFileType = $scope.uploadedFiles[i].lfFileType.substring($scope.uploadedFiles[i].lfFileType.indexOf("/") + 1);
                if (realFileType == "jpeg") {
                    realFileType = "jpg";
                }
                /* use later 2017/6/19
                uploadedFiles.push({
                    "bucket": $scope.bucket,
                    "key": $scope.key,
                    "filename": $scope.uploadedFiles[i].lfFileName,
                    "path": $scope.key + $scope.uploadedFiles[i].lfFileName,
                    "type": $scope.uploadedFiles[i].lfFileType,
                })*//*
                if ($scope.rootScope.type == $scope.userType) {
                    switch ($scope.rootScope.type) {
                        case "相片":
                            var diffKey = "images/" + $scope.rootScope.user.uid + "/medium-web/";
                            var diffPath = "images/" + $scope.rootScope.user.uid + "/medium-web/" + $scope.idArray[i] + ".jpg";
                            uploadedFiles.push({
                                "bucket": "designerrrr-output",
                                "key": diffKey,
                                "filename": $scope.idArray[i] + "." + realFileType,
                                "path": diffPath,
                                "type": $scope.uploadedFiles[i].lfFileType
                            });
                            break;
                        case "插畫":
                            break;
                    }
                }
                console.log(uploadedFiles);
            }*/
            $mdBottomSheet.hide();
        }
    });
    app.controller('uploadDocController', function($scope, $mdBottomSheet, $mdDialog,bucket, key, rootScope) {
        $scope.bucket = bucket;
        $scope.key = key;
        $scope.uploading = false;
        $scope.rootScope = rootScope;
        $scope.uploadedFiles = [];
        console.log($scope.bucket);
        console.log($scope.key);
        $scope.idArray = [];
        $scope.upload = function () {
            $scope.uploading = true;
            $scope.uploaded = 0;
            for (var i = 0; i < $scope.files.length; i++) {
                console.log($scope.files[i]);
                $scope.uploadThis($scope.files[i]);
            }
        }
        $scope.uploadAgain = function () {
            $scope.uploading = false;
            $scope.uploaded = 0;
            $scope.files = [];
        }
        $scope.uploadThis = function (file) {
            var s3 = new AWS.S3();
            var params = {
                Bucket: "dazzle-user-"+$scope.rootScope.user.uid,
                Key: "files/"+file.lfFileName,
                ContentType: file.lfFileType,
                Body: file.lfFile
            };
            file.upload = s3.upload(params);

            file.upload.on('httpUploadProgress', function (evt) {
                file.uploadProgress = parseInt((evt.loaded * 100) / evt.total);
            });

            file.upload.send(function (err, data) {
                console.log(file);
                $scope.uploadedFiles.push(file);
                $scope.$apply(function () {
                    $scope.uploaded++;
                    if($scope.uploaded==$scope.files.length){
                        console.log("finish");
                        console.log($scope.files);
                    }
                });
            });

        }
        $scope.remove = function (index) {
            $scope.files[index].upload.abort();
            $scope.files.splice(index, 1);
            $scope.uploaded--;
            if ($scope.files.length <= 0) {
                $scope.uploading = false;
                $scope.uploaded = 0;
            }
        }
        $scope.close = function () {
            console.log("vvvv close");
            console.log($scope.uploadedFiles);
            $mdBottomSheet.hide($scope.uploadedFiles);
        }
    });
    app.controller('uploadWatermarkController', function($scope, $mdBottomSheet, $mdDialog, $mdToast, bucket, key, rootScope) {
        console.log("vvvv vvvv 4");
        $scope.bucket = bucket;
        $scope.key = key;
        $scope.uploading = false;
        $scope.rootScope = rootScope;
        $scope.uploadedFiles = [];
        console.log($scope.bucket);
        console.log($scope.key);


        //For toast popup use
        var last = {
            bottom: true,
            top: false,
            left: true,
            right: false
        };
        $scope.toastPosition = angular.extend({}, last);
        $scope.getToastPosition = function() {
            sanitizePosition();
            return Object.keys($scope.toastPosition).filter(function(pos) {
                return $scope.toastPosition[pos];
            }).join(' ');
        };

        function sanitizePosition() {
            var current = $scope.toastPosition;
            if (current.bottom && last.top) current.top = false;
            if (current.top && last.bottom) current.bottom = false;
            if (current.right && last.left) current.left = false;
            if (current.left && last.right) current.right = false;
            last = angular.extend({}, current);
        }
        // /For toast popup use

        $scope.upload = function() {

            console.log($scope.files);
            if ($scope.files.length > 1) {
                var pinTo = $scope.getToastPosition();
                $mdToast.show($mdToast.simple().textContent('只可上載一個檔案').position(pinTo).hideDelay(3000));
                console.log("vvvv <1");
            } else {
                var image = new Image();
                image.onload = function() {
                    console.log(this.width, this.height);
                    if (this.width == 1000 && this.height == 300) {
                        $scope.uploading = true;
                        $scope.uploaded = 0;
                        for (var i = 0; i < $scope.files.length; i++) {
                            console.log($scope.files[i]);
                            $scope.uploadThis($scope.files[i]);
                        }
                    } else {
                        var pinTo = $scope.getToastPosition();
                        $mdToast.show($mdToast.simple().textContent('尺寸必須為1000x300').position(pinTo).hideDelay(3000));
                    }
                }
                image.src = $scope.files[0].lfDataUrl;
            }
        }

        $scope.uploadThis = function(file) {
            var s3 = new AWS.S3();
            var params = {
                Bucket: "designerrrr",
                Key: "cusWatermark/" + $scope.rootScope.user.uid + "/image.png",
                ContentType: file.lfFileType,
                Body: file.lfFile
            };
            console.log(params);
            file.upload = s3.upload(params);

            file.upload.on('httpUploadProgress', function(evt) {
                file.uploadProgress = parseInt((evt.loaded * 100) / evt.total);
            });

            file.upload.send(function(err, data) {
                console.log(err);
                console.log(data);
                console.log(file);
                $scope.uploadedFiles.push(file);
                $scope.$apply(function() {
                    $scope.uploaded++;
                    if ($scope.uploaded == $scope.files.length) {
                        console.log("finish");
                        console.log($scope.files);
                        $mdBottomSheet.hide("ok");
                    }
                });
            });

        }
        $scope.remove = function(index) {
            $scope.files[index].upload.abort();
            $scope.files.splice(index, 1);
            $scope.uploaded--;
            if ($scope.files.length <= 0) {
                $scope.uploading = false;
                $scope.uploaded = 0;
            }
        }
        $scope.close = function() {
            console.log("vvvv close");
            var uploadedFiles = [];
            $mdBottomSheet.hide();
        }
    });
});