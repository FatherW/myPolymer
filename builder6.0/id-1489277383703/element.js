var app = angular.module('demoApp');
app.directive('editorNewsList', function ($ocLazyLoad) {
    var path = "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/id-1489277383703";
    var editorNewsList = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: path + '/html/id-1489277383703.html' + '?id=' + new Date().getTime(),
        controller: function ($scope, $element, $attrs,$uibModal) {

            var bucket = $scope.userBucket;
            var website = $scope.website;
            //element init
            $scope.id = $element[0].id || "ele" + new Date().getTime();
            $element[0].id = $scope.id;
            // if (angular.isUndefined($scope.atom[$scope.id])) {
            //     $scope.atom[$scope.id] = {
            //         "id": $scope.id,
            //         "src": $scope.src,
            //         "link": "#",
            //         "html": "<div>hello world</div>"
            //     };
            //     $scope.atom[$scope.id].list = [
            //         {
            //             "id":"1",
            //             "link":"hello.htm",
            //             "title":"Speech by SLW at Supportive Supervision Scheme Graduation Ceremony (English only)"
            //         },
            //         {
            //             "id":"2",
            //             "link":"hello.htm",
            //             "title":"Graduation Ceremony of Supportive Supervision Scheme cum Workshop"
            //         }

            //     ];

            // }

            $scope.schema = [{
                "id": "date",
                "label": "日期",
                "width": "10%",
                "type": "datetime2",
                "show": true
            }, {
                "id": "title",
                "label": "標題",
                "width": "10%",
                "type": "text",
                "show": true
            }, {
                "id": "content",
                "label": "內文",
                "width": "10%",
                "type": "text",
                "show": true
            }];
            $scope.table = {
                "id": "news",
                "label": "最新消息",
                "type": "S3"
            };
            //init start
            $scope.createTable = function () {
                $scope.getJson(bucket, 'website/' + website.website + '/json/tableCollection.json').then(function (tableCollection) {
                    for (var i = 0; i < tableCollection.length; i++) {
                        if (tableCollection[i].id == 'news') {
                            return;
                        }
                        if (i + 1 == tableCollection.length) {
                            tableCollection.push($scope.table);
                            $scope.saveJson(bucket, 'website/' + website.website + '/json/tableCollection.json', tableCollection);
                            return;
                        }
                    }
                }, function () {
                    console.log('No Table');
                    $scope.saveJson(bucket, 'website/' + website.website + '/json/tableCollection.json', [$scope.table]);
                });
            };
            $scope.createSchema = function () {
                $scope.getJson(bucket, 'website/' + website.website + '/content/news-schema.json').then(function (schema) {
                    $scope.$apply(function () {
                        $scope.schema = schema;
                    });
                }, function () {
                    $scope.saveJson(bucket, 'website/' + website.website + '/content/news-schema.json', JSON.parse(angular.toJson($scope.schema)));
                });
            };
            $scope.createData = function () {
                $scope.getJson(bucket, 'website/' + website.website + '/content/news-data.json').then(function (news) {
                    $scope.$apply(function () {
                        $scope.news = news;
                    });
                }, function () {
                    $scope.saveJson(bucket, 'website/' + website.website + '/content/news-data.json', [
                        {
                            "date": "2017-02-15",
                            "title": "title",
                            "content": "content"
                        }
                    ]);
                });
            }
            if (angular.isUndefined($scope.atom[$element[0].id])) {
                $scope.atom[$element[0].id] = {
                    "id": $element[0].id,
                    "html": "",
                    "table": JSON.parse(angular.toJson($scope.table))
                }

                console.log( $scope.atom[$element[0].id]);
                $scope.createTable();
                $scope.createSchema();
                $scope.createData();
            } else {

                console.log('Create Data');
                console.log($scope.atom[$element[0].id]);
                $scope.createData();
            }





            $scope.model = $scope.atom[$scope.id];
            $scope.imgMenuOptions = [
                ["數據管理", function () {

                        var modalInstance = $uibModal.open({
                            animation: true,
                            keyboard: false,
                            templateUrl: 'views/contentPopup.html?id=' + new Date().getTime(),
                            controller: 'contentPopupController',
                            size: 'lg',
                            windowClass: 'app-modal-window',
                            resolve: {
                                table: function () {
                                    return $scope.table;
                                },
                                website: function() {
                                    return $scope.website;
                                }
                            }
                        });
                        modalInstance.result.then(function () {
                            $scope.compile();
        //                    $scope.updateHtml();
                        });
                }]
            ];
            $element[0].addEventListener("DOMSubtreeModified", function () {
                console.log('DOM changed');
            });
            //element init
        }
    }
    return editorNewsList;
});


app.controller('contentPopupController', function ($scope, $uibModalInstance, $sce, table,website) {
    $scope.table = table;
    $scope.init = function () {
        $scope.currentProject = "http://dazzle.website/gab/data.html?openTable=?true" + "&?website=?" + website.website + "&?table=?" + table.id;
        $scope.currentProjectUrl = $sce.trustAsResourceUrl($scope.currentProject);
    }
    $scope.cancel = function () {
        $uibModalInstance.close();
    }
});
