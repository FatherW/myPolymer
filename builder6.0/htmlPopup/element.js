var app = angular.module('demoApp');
var name = 'htmlPopup';
app.directive(name, function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleUser,$dazzleS3,$dazzlePopup) {
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "//d25k6mzsu7mq5l.cloudfront.net/builder6.0/htmlPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "//d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element,$mdDialog, $templateRequest, $http,$dazzleS3,$compile,$dazzleUser,$dazzleInit,$dazzleData) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');
                var userBucket = $dazzleUser.getDazzleInfo('userBucket');
                var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                var thisPage = params.thisPage;
                var html = params.html;
                    console.log('Params',params);
                   console.log('editHtmlPopupController');

                    $scope.init = function() {
                        // var html=$dazzleUser.getDazzleInfo('html');
                        $dazzleUser.setDazzleInfo('singlePage',thisPage);
                        console.log('Edit Source HTML',html);
                        $scope.html = html;
                        if (angular.isUndefined($scope.html))
                            $scope.html= 'Please type something.';
                        $scope.html = $scope.html.replace(/(\sng-\w+-\w+="(.|\n)*?"|\sng-\w+="(.|\n)*?"|\sng-(\w+-\w+)|\sng-(\w+))/g, "")
                            .replace(/<!--(.*?)-->/gm, "");
                        console.log('Edit HTML',$scope.html);

                        $element.find('#dazzle-editor').html($scope.html);


                        // $dazzleInit.loadDirectiveInfo().then(function(){
                        //     $dazzleInit.loadPageInfo().then(function(){
                        //         $dazzleInit.loadAtomInfo().then(function(){
                        //             console.log('Init Atom',$dazzleUser.getDazzleInfo('atom'));
                        //             $compile($element.find('#dazzle-editor').contents())($scope);
                        //
                        //         });
                        //     });
                        // });


                       if (angular.isUndefined($dazzleUser.getDazzleInfo('coreDirectivesJson')))
                            $dazzleInit.loadDirectiveInfo();

//                       if (angular.isUndefined($dazzleUser.getDazzleInfo('thisPageJson')))
 //                           $dazzleInit.loadPageInfo();

                       if (angular.isUndefined($dazzleUser.getDazzleInfo('atom')))
                            $dazzleInit.loadAtomInfo();

                        var source = params.source;
                        console.log('source',source);
                        
                       if (!angular.isUndefined(source) && source=='dashboard') {
                            console.log('thisPage',thisPage);						
							console.log('DB Atom',$dazzleUser.dazzleInfo['atom']);
							
//                            $dazzleInit.loadAtomInfo().then(function(result){
                               var atom = $dazzleUser.dazzleInfo['atom'];

                               $dazzleInit.loadDirective('editorTextElement');
								$dazzleInit.loadDirective('editor');
							   
							   for (key in atom){
                                    console.log(atom[key].type);
                                    $dazzleInit.loadDirective(atom[key].type);
                                }
                               
 							   setTimeout(function(){
                                      $compile($('.md-dialog-content').contents())($scope);
                                    // $compile($element.find('text'))($scope);
                                        $compile($element.find('editor-image-element'))($scope);
                                    
                                  }, 4000);
                                

                                
//                            });
                        

                       } else {
                           $scope.editorCustomInit = $dazzleInit.editorCustomInit;

                           setTimeout(function(){
                              $compile($('.md-dialog-content').contents())($scope);
                                $compile($element.find('editor-image-element'))($scope);
                           }, 2000);

                       }

                //        var rootScope = $dazzleUser.getRootScope();



                    }

                    $scope.aceOption = {
                        onLoad: function (_ace) {
                            //_ace.setTheme('ace/theme/twilight');
                                _ace.getSession().setMode("ace/mode/html");
                         }
                    };

                    $scope.save = function () {

                        console.log('thispage',$dazzleUser.getDazzleInfo('thisPage'));
                        console.log('Save Atom',$dazzleUser.getDazzleInfo('atom'));
						
                        //$dazzleInit.saveRootHtml().then(function () {
                        //    $dazzleInit.saveMasterAtom();
                        //    $dazzleInit.saveAtom();
                        //});


                        $('#dazzle-editor').find('[custom]').each(function(index){
                            var eleHtml = $(this).children('[bind-html-compile]').html();
                            console.log('Ele HTML',eleHtml);
                            $(this).html(eleHtml);
                        });
                        var html = $('#dazzle-editor').html();
                        html = html.replace(/(\sng-\w+-\w+="(.|\n)*?"|\sng-\w+="(.|\n)*?"|\sng-(\w+-\w+)|\sng-(\w+))/g, "")
                                    .replace(/<!--(.*?)-->/gm, "");
                        console.log('Save',html);

						
                       $mdDialog.hide(html);
                    }
                    $scope.cancel = function () {
                        // var html = $('#dazzle-editor').html();
                        // console.log('Save',html);
                        // $mdDialog.hide(html);
                        $scope.save();
                //        $mdDialog.hide(html);

                    }

                


        }
    };
    return link;
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

