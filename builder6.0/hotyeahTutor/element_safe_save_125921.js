var app = angular.module('demoApp');
app.directive('hotyeahTutor', function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleInit,$dazzlePopup,$dazzleData,$dazzleUser,$dazzleFn) {
    var name = 'hotyeahTutor';
    var link = {
        restrict: 'EA',
        scope: true,
        templateUrl: "http://d27btag9kamoke.cloudfront.net/builder6.0/hotyeahTutor/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            
            $dazzleInit.editorCustomInit(scope, element, attrs).then(function () {
                 if(angular.isUndefined(scope.model.tutors)){
                     scope.model.tutors=[];
                     var obj = {
                         introduction: "請右click 編輯資料",
                         name: "右click編輯",
                         src:"http://www.hot-yeah.com/image/profile-icon.png"
                     };
                     scope.model.tutors.push(obj);
                 }


                element.attr('contenteditable','true');
                 element.html('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                 scope.$apply(function () {
                      $compile(element.contents())(scope);
                      $compile($('.lister-item-delete'))($scope);
                      $compile($('dz-text'))($scope);
                      $compile($('dz-image'))($scope);
                 });


                    

            });
            
            
            //   $dazzleInit.editorCustomInit(scope, element, attrs).then(function () {

    
            //       element.html('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
            //         $compile(element.contents())(scope);



            //  });
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
                                    
//             var thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');

//             $scope.addFirstTutor = function() {
//                 $scope.addTutor();
//             }
            $scope.addTutor = function(index) {
                //  var obj = {
                //         introduction: "請右click 編輯資料",
                //         name: "右click編輯",
                //         src:"http://www.hot-yeah.com/image/profile-icon.png"
                //     };
                //     $scope.model.tutors.splice(index, 0, obj);
//                    $scope.model.tutors.push(obj);
                var html = $('#tutor-template').html();
                console.log('HTML',html);
                
                $('.lister-list').first().prepend(html);
                //$scope.model.html = $element.children('[bind-html-compile]').html();
                //$scope.model.html = 'hello, world';
                //console.log('Tutor HTML',$scope.model.html);
                //$compile($element.contents())($scope);
                //$dazzleInit.useTemplate($scope);
                 
                 $compile($('.lister-item-delete'))($scope);
                 $compile($('dz-image'))($scope);
                 $compile($('dz-text'))($scope);
                 
                 $dazzleInit.saveAtom();
            }

            $scope.deleteTutor = function() {
                var e = window.event;
                //var ele = angular.element(e.srcElement);
                //console.log(ele);
                e.currentTarget.closest('.lister-item.mode-detail').remove();
                //ele.closest('.lister-item.mode-detail').remove();
//                $event.currentTarget.parent().remove();
                //var html = $(this).closest('div').html();
                //console.log('HTML',html);
               //$('.lister-item .mode-detail').remove();
               // $scope.useTemplate();
            }
            
            $scope.saveData = function() {
                 $('.lister-item-delete').remove();
                 $("#tutor-template").empty();
                 var newList = $('.listner-list').html();
                console.log('newlist',newList());
                /*    
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzleEditorMiscFunction",
                    "data": {

                        "action": "updateByGid",
                        "gid": $scope.myGid,
                        "tags": $scope.myTags

                    }
                }).then(function (result) {
                    if (result.data.code > 0) {

                    }
                    console.log('Delete',result);
                });
                */
            }
            
//             $scope.removeTutor = function(index){
//                 $scope.model.tutors.splice(index, 1);
//                 $scope.useTemplate();
//             }
//             $scope.imgOptions = [
//                   ["編輯導師頭像", function ($itemScope,$event) {

//                         var curEle = angular.element($event.currentTarget);
//                         var index;
//                         index = parseInt(curEle.attr('item-row'));
                        
//                         var params = {
//                             directive:"<user-gallery-popup></user-gallery-popup>"
//                         };

//                         $dazzlePopup.callPopup(params).then(function(output){
//                             //var image = output['image'];
//                             var image = output;
//                             $dazzleInit.copyFile($dazzleUser.getDazzleInfo('userBucket') + '/' + encodeURI(image.key), $dazzleUser.getDazzleInfo('exportBucket'), image.key).then(function () {
//                                     var src = 'http://' + $dazzleUser.getDazzleInfo('exportBucket') + '/' + image.key;
//                                     $scope.model.tutors[index].src = src;
//                                     $scope.useTemplate();
//                             });
//                         });
//                 }]      
                
//                 ];
//             $scope.textOptions=[
//                 ["編輯導師名稱", function ($itemScope,$event) {
                    
//                     var curEle = angular.element($event.currentTarget);
//                     var index;
//                     index = parseInt(curEle.attr('item-row'));
                
//                     var confirm = $mdDialog.prompt()
//                         .title('你要變更導師名稱嗎?')
//                         .textContent('輸入你的資料')
//                         .initialValue($scope.model.tutors[index].name)
//                         .required(true)
//                         .ok('變更')
//                         .cancel('取消');

//                     $mdDialog.show(confirm).then(function(result) {
// //                        $element.text(result);
//                         $scope.model.tutors[index].name = result;
//                         $scope.useTemplate();
//                     });
//                 }]
//             ];
//             $scope.introOptions=[
//                 ["編輯導師介紹", function ($itemScope,$event) {
//                     var curEle = angular.element($event.currentTarget);
//                     var index;
//                     index = parseInt(curEle.attr('item-row'));
                    
//                      var confirm = $mdDialog.prompt()
//                         .title('你要變更導師介紹嗎?')
//                         .textContent('輸入你的資料')
//                         .initialValue($scope.model.tutors[index].introduction)
//                         .required(true)
//                         .ok('變更')
//                         .cancel('取消');

//                     $mdDialog.show(confirm).then(function(result) {
// //                        $element.text(result);
//                         $scope.model.tutors[index].introduction = result;
//                         $scope.useTemplate();
//                     });
//                 }]
//             ];


//             $scope.menuOptions = [
//                 ["新增導師", function ($itemScope,$event) {
//                     $scope.addTutor();
//                 }],
//                 ["刪除導師", function ($itemScope,$event) {
//                     var curEle = angular.element($event.currentTarget);
//                     var index;
//                     index = parseInt(curEle.attr('item-row'));
//                     $scope.model.tutors.splice(index,1);
//                     $scope.useTemplate();
//                     console.log(curEle.attr('item-row'));
//                 }]
//             ];
            
//             if (!angular.isUndefined(thisPageJson.myID))
//                 $scope.menuOptions.push(["更換模版", function () {
//                     $mdDialog.show({
//                         controller: 'templatePopupController',
//                         templateUrl: 'https://d27btag9kamoke.cloudfront.net/cdn6.0/models/templatePopup/popup.html' + "?id=" + new Date().getTime(),
//                         locals: {
//                             rootScope: $scope
//                         }
//                     }).then(function (template) {
//                         $scope.useTemplate();
//                     });
//                 }]);
                
                
                
            $scope.menuOptions = [
                    ["新增導師", function($itemScope,$event){
                        $scope.addTutor();
                    }]
                ]
                
            $scope.beforeAtomSaved = function () {

            }

            
        }
    };
    return link;
});