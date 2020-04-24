var app = angular.module('demoApp');
app.directive('innoApply', function ($compile, $templateRequest, $http, $location,$mdDialog,$dazzleUser,$dazzleS3,$dazzlePopup,
    atomInfo,userInfo,dbFactory) {
    var dzLink = {
      restrict: 'E',
        priority: 1000,
        scope: true,
//        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/dzContactUs/element.html?id=" + new Date().getTime(),
        // css: {
        //   href: "//d27btag9kamoke.cloudfront.net/builder6.0/sarahBlog/element.css?id=" + new Date().getTime(),
        //   /* Preload: this will trigger an HTTP request on app load.
        //   * Once the stylesheet is added, it will be loaded from the browser cache */
        //   preload: true
        // },
                

     compile : function(elements, attributes){
            return{
                pre : function($scope,$element,attribute) {
                    $scope.isAdmin = function(){
                        var editMode = store.get('editMode') || 'normal';
                        if (editMode == 'admin')
                            return true;
                        else
                            return false;
                    }
                 
                    
                     $element.find('.dropzone').bind('click', function($event){
                        var ele = angular.element($event.target);
                        console.log('Clicked');
                        $scope.uploadToDomain('attachment','attach');
                        
                     });

                
                },
                post : function($scope, $element, attribute){
                        var id = $element.attr('id') || new Date().getTime();
                        $scope.id= id;
                        $element.attr('id',id);
                        atomInfo.initAtom(id);
                        $scope.hostname = location.hostname;
                        $scope.model = {
                            'company':'',
                            'name':'',
                            'email':'',
                            'phone':'',
                            'website':'',
                            'description':'',
                            'scale':'公司規模',
                            'investment':'期望融資'
                        }
                        $scope.scales = [
                            '1-5人',
                            '6-10人',
                            '10-20人',
                            '20人以上'
                        ];
                        $scope.investments = [
                            '10-50萬',
                            '50-100萬',
                            '100-200萬',
                            '200萬以上'
                        ];
                        $scope.data = atomInfo.atom[id]['data'] || [];
                        $scope.mail = atomInfo.atom[id]['mail'] || 'support@01power.net';
                        $scope.msg = atomInfo.atom[id]['msg'] || "你有[[name]]來的查詢：[[comment]]\n回覆電郵為:[[email]]";
                        atomInfo.atom[id]['data'] = $scope.data;
                        atomInfo.atom[id]['mail'] = $scope.mail;
                        atomInfo.atom[id]['msg'] = $scope.msg;
        
                        // $scope.userGallery = atomInfo.atom[id]['blog'] || [
                            
                        //     {'src':'https://cdn-wp.nkdev.info/snow/demo-one-page-agency/wp-content/uploads/sites/3/2017/01/post-1-800x600.jpg',
                        //       'tag':'design',
                        //       'title':'Why you should always first',
                        //       'text':" Fifth. Wherein. Own blessed. Subdue you're fruitful over. Every in beginning gathering isn't likeness be..."
                        //     },
                        //     {'src':'https://cdn-wp.nkdev.info/snow/demo-one-page-agency/wp-content/uploads/sites/3/2017/01/post-1-800x600.jpg',
                        //       'tag':'design',
                        //       'title':'Why you should always first',
                        //       'text':" Fifth. Wherein. Own blessed. Subdue you're fruitful over. Every in beginning gathering isn't likeness be..."
                        //     },
                        //     {'src':'https://cdn-wp.nkdev.info/snow/demo-one-page-agency/wp-content/uploads/sites/3/2017/01/post-1-800x600.jpg',
                        //       'tag':'design',
                        //       'title':'Why you should always first',
                        //       'text':" Fifth. Wherein. Own blessed. Subdue you're fruitful over. Every in beginning gathering isn't likeness be..."
                        //     }
        
                        // ];
                        // atomInfo.atom[id]['blog'] = $scope.userGallery;
                        
                        console.log('User Info',store.get('editMode'));
                        
                        var editMode = store.get('editMode');
                        if (editMode=='admin'){
                            console.log('Edit Admin Mode');
                            $element.find('#dzContextMenu').attr('context-menu','menuOptions');
                            $compile($element.find("#dzContextMenu"))($scope);
                        }
                        
                        var toolbar = '';
                    //       var toolbar = `
                    //   <div class="dz-toolbar" ng-if="isAdmin()">
                    //           <md-toolbar class="md-accent dazzle">
                    //                         <tb-div class="md-toolbar-tools-dazzle">
                    //                             <dz-i class="fa fa-x fa-arrows-alt" aria-hidden="true" ng-click="hideToggle()"></dz-i>
                    //                             <dz-i class="fa fa-x fa-cog" ng-click="changeEmail()" aria-hidden="true"></dz-i>
                    //                             <dz-i class="fa fa-x fa-bank" aria-hidden="true" ng-click="changeMsgFormat()"></dz-i>
                    //                             <dz-i class="fa fa-x fa-database" aria-hidden="true" ng-click="editData()"></dz-i>                            
                    //                             <dz-i class="fa fa-close" ng-click="remove()"></dz-i>
                    //                         </tb-div>
                    //                       </md-toolbar>
                        
                    //     </div>     
                    //     `;
                    
                        $element.find('#toolbar').remove();
                        if ($scope.isAdmin()) {
    //                        if ($element.find('#toolbar').length <= 0)
                                $element.append('<div id="toolbar">'+toolbar+'</div>');
      //                      else
        //                        $element.find('#toolbar').html(toolbar);                        
                            
                            $compile($element.find('#toolbar'))($scope);
                            
                        } 
                        // if (editMode=="normal"){
                        //     $element.find('[context-menu]').attr('context-menu','');
                        // }            
                     
                }
            };
        },    
        controller: function ($scope, $element, $attrs) {
              
                AWS.config = new AWS.Config();
    AWS.config.accessKeyId = "AKIAIOCIHTJ47YSHEE7Q";
    AWS.config.secretAccessKey = "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";
    AWS.config.region = "ap-northeast-1";
    $scope.formdata={};
    $scope.submitMyForm = function() {

        console.log($scope.formdata);
        console.log($scope.hostname);
        if($scope.myForm.$valid){
        //https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/saveformdatatojson
        var createData=new Date();
        $scope.formdata.formid=createData.getTime();
    	var nd=new Date((createData.getTime()/1000+(3600*8))*1000);
        $scope.formdata['日期時間']=nd.toGMTString();
        $scope.formdata['日期']=createData.getTime();
        $http(
        		{
                    method: 'POST',
                    url: 'https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/saveformdatatojson',
                    data: {'formdata':$scope.formdata,'formname':$scope.formname,'bucketname':$scope.hostname,'websiteKey':$scope.websiteKey}
                })
                .then(function(succeed) {
                	console.log(succeed);
                    if (succeed.data.code > 0) {
                    	emailToUser();
                        emailToAdmin();
                    } else {
                        alert('提交失敗，請重新再試');
                    }
                },
                function(error) {
                    alert('提交失敗，請重新再試');
                }
        );
        
    	}//end if
    }
    
    $scope.uploadToDomain=function(dataName,filename,acceptType='all'){
    	var x = document.createElement("INPUT");
    	x.setAttribute("type", "file");
    	if(acceptType=='imageOnly'){
    		x.setAttribute("accept","image/*");
    	}
    	x.click();
    	x.addEventListener('change', function () {
        	var file = this.files[0];
        	console.log(file);
        	if (file) {
                var bucket = new AWS.S3();
                var params = { Bucket: $location.host(), Key: 'files/'+new Date().getTime()+"_"+file.name, ContentType: file.type, Body: file };
                bucket.upload(params, function(err, data) {
                    $scope.$apply(function(){
        //             	var thisLink=document.getElementById(filename);
        //             	thisLink.href=data.Location;
        //             	thisLink.text=file.name;
        //             	if(acceptType=='imageOnly'){
    				// 		var thisImageLink=document.getElementById('img_'+filename);
    				// 		thisImageLink.src=data.Location;
    				// 	}
                    	$scope.model[dataName]=data.Location;
                    	alert('上載成功');
                    });
                });
            };
    	});
    
    }
    $scope.save = function(){
        var id = new Date().getTime();
        var json = {
            "ID":id,
            "email":$scope.model.email,
            "phone":$scope.model.phone,
            "name":$scope.model.name,
            "company":$scope.model.company,
            "website":$scope.model.website,
            "description":$scope.model['description'],
            "updated":new Date().getTime()
        };
        dbFactory.saveData(location.hostname,"contact-us",id,json).then(function(){
           console.log('Data Saved'); 
        });
        
    }
    function emailToAdmin() {

            api = "https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail";


            var jsonToAdmin = {};
            jsonToAdmin['from'] = 'support@01power.net';
            jsonToAdmin['to'] = $scope.mail;
            jsonToAdmin['subject'] = location.hostname+"來的查詢："+$scope.model.title;
            jsonToAdmin['id'] = $scope.id;
            jsonToAdmin['bucket'] = location.hostname;
            jsonToAdmin['model'] = $scope.model;
            var msg = $scope.msg;
            msg=msg.replace("[[name]]",$scope.model.name);
            msg=msg.replace("[[email]]",$scope.model.email);
            msg=msg.replace("[[comment]]",$scope.model.comment);
            
            jsonToAdmin['html'] = msg;

            console.log('Form',JSON.stringify(jsonToAdmin));
            $.ajax({
                type: "POST",
                url: api,
                data: JSON.stringify(jsonToAdmin),
                //async: false,
                contentType: "text/json; charset=utf-8",
                dataType: "json",
                success: function(msg) {
                    alert("提交成功");
                },
                error: function(msg) {
                    alert("提交失敗");
                }
            });
        }
    
    function emailToUser() {
            console.log($scope.receiveemail);
            if(angular.isUndefined($scope.formdata['電郵'])){
            		//alert("提交成功");
            		emailToAdmin();
                    //location.reload();
                    return false;
            }
            api = "https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail";
            var jsonToAdmin = {};
            jsonToAdmin['from'] = 'support@01power.net';
           jsonToAdmin['to'] = $scope.formdata['電郵'];
            jsonToAdmin['subject'] = $scope.formname+'表格';
            jsonToAdmin['html'] = '您的'+$scope.formname+'表格成功提交<br><br>參考編號為:'+$scope.formdata.formid+"<br><br>"+JSON.stringify($scope.formdata);
            console.log($scope.formdata);
            $.ajax({
                type: "POST",
                url: api,
                data: JSON.stringify(jsonToAdmin),
                //async: false,
                contentType: "text/json; charset=utf-8",
                dataType: "json",
                success: function(msg) {
                    //alert("提交成功");
                    //location.reload();
                    emailToAdmin();
                },
                error: function(msg) {
                    //alert("提交成功");
                    //location.reload();
                    emailToAdmin();
                }
            });
        }
        
        
            $scope.send = function() {
                emailToAdmin();
                 $scope.save(); 
               // addData();
            }
            $scope.reset = function(){
                $scope.model = {};
            }    
            $scope.changeEmail = function(){
                 var person = prompt("請輸入要發送的電郵地址", $scope.mail);
                
                if (person != null) {
                    $scope.mail = person;
                    atomInfo.atom[$scope.id]['mail'] = $scope.mail;
                }

            }
            $scope.editData = function(){
              
                         var params = {
                            name: 'dzDataPopup2',
                            directive: '<dz-data-popup2></dz-data-popup2>',
                            width:'90%',
                            table: 'contact-us'
                        }
                        $dazzlePopup.callPopup(params).then(function(result){

                        });     
            }
            $scope.changeMsgFormat = function(){
                     var confirm = $mdDialog.prompt()
                      .title('請更改訊息樣辦，[[xx]]為訊息變量，請問胡亂更改')
                      .placeholder('訊息樣辦')
                      .initialValue($scope.msg)
                      .required(true)
                      .ok('更改')
                      .cancel('取消');
                
                    $mdDialog.show(confirm).then(function(result) {
                        $scope.msg = result;
                        atomInfo.atom[$scope.id]['msg'] = $scope.msg;
                    
                    }, function() {

                    });

            }
            $scope.conMenu = function($event){
               // return 
               $scope.conMenu = function($event) {
                
                var menu = [];
                console.log('Con Overlay',$dazzleUser.dazzleInfo['overlayEle']);
                // var ele = angular.element($event.target);
                var ele = $dazzleUser.dazzleInfo['overlayEle'];
              
                var tagName = ele[0].tagName;
                switch(tagName){
                    case 'INPUT':
                    case 'TEXTAREA':
                        menu.push( ["編輯欄位", function () {
                             $scope.editField($event);
                        }]);

                        break;
    
                    case 'LABEL':
                        menu.push( ["更換標籤", function () {
                            //  $scope.editField($event);
                        }]);

                        break;
                        
                }
                
                return menu;
            }    
                
            }
            $scope.menuOptions = [
                ["更改發送電郵", function () {
                     $scope.changeEmail();
                }],
                ["更改發送訊息樣辦", function () {
                


                }],
                
                ["已收資料", function () {
                    
                            $scope.editData();
                    }]
            ];
            
            $scope.myDate = function(timestamp){
                return new Date().getTime();
            }
           // atomInfo.atom[$scope.id]['contextMenu'] = $scope.menuOptions;
            
           

        }
    };
    return dzLink;
});