

loadCss("https://d27btag9kamoke.cloudfront.net/cdn6.0/css/builder-index.css");
loadCss("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
loadCss("https://use.fontawesome.com/releases/v5.8.2/css/all.css");
loadCss("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/medium-editor-5.23.1.min.css");
loadCss("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/jquery-ui-1.12.1.min.css");
loadCss("https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css");
loadCss("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/angular-jk-rating-stars-1.0.7.min.css");
loadCss("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/angular-multirange-slider-1.1.1.css");
loadCss("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/angular-ui-tree-2.22.5.min.css");
//    loadCss("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/bootstrap-3.3.7.min.css");
loadCss("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/slick-1.6.0.min.css");
loadCss("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/slick-1.6.0-theme.min.css");
loadCss("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/angular-material-fileinput-1.5.2.min.css");
loadCss("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/angular-material-timepicker-1.0.7.css");
// loadCss("https://d27btag9kamoke.cloudfront.net/cdn6.0/css/angular-material-less-1.1.4.css");
loadCss("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/angular-material-1.1.4.min.css");
loadCss("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/isteven-multi-select.css");
loadCss("https://mattlewis92.github.io/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css");


loadJs("https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.10.0/beautifier.min.js");
loadJs("https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.10.0/beautify-css.min.js");
loadJs("https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.10.0/beautify-html.min.js");
loadJs("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/js/alasql-0.4.0.min.js");
loadJs("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.15.1/xlsx.min.js");

var alasql = window['alasql'];

//loadCss("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css");

// <link rel="stylesheet/less" type="text/css" href="styles.less" />
//     <script src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.9.0/less.min.js" ></script>




console.log('Dazzle Factory Begin 6.5.2 Updated');
var wholeJson = {
  "structure":{"head":{},"body":{}},
  "title":"",
  "meta":[],
  "link":[],
  "style":[],
  "script":[],
  "body-link":[],
  "body-style":[],
  "body-script":[],
  "atom":{},
  "hash":{}
};

var hash = [];
(function(old) {
    $.fn.attr = function() {
        if(arguments.length === 0) {
            if(this.length === 0) {
                return null;
            }

            var obj = {};
            $.each(this[0].attributes, function() {
                if(this.specified) {
                    obj[this.name] = this.value;
                }
            });
            return obj;
        }

        return old.apply(this, arguments);
    };
})($.fn.attr);

function saveWebsiteJson (text){
      var html;
      var tagname;
      var ele;
      var json=[];
      var hash = [];
      var myId,myClass;
      var $ = cheerio.load(text, {decodeEntities: false});
//     if (!$('#dz-control').length)
//        $('head').append('<meta charset="UTF-8"><script id="dz-control" src="https://dazzle-template.s3.amazonaws.com/cdn6.4/js/dazzle-client.bundle.6.5.3.min.js"></script>');
      
     
      $('head').find('*').each(function(){
          tagname = $(this).get(0).name;
          ele = $(this).get(0);
          getInfo($(this));
           myId = '';
            myClass = '';
            for (var k in ele.attribs){
                if (k =='id')
                    myId = ele.attribs[k];
                if (k=='class')
                    myClass = ele.attribs[k];
            }
			
            if (!myId) {
                if (myClass)
                    myId = myClass.replace(/ /g,"_");
                else
                    myId = tagname+"_";
                    
                while(hash.indexOf(myId)>=0) {
                    myId = myId+"_";
                }
                hash.push(myId);
            }
            $(this).attr('id',myId);
            console.log('ID',myId);
            wholeJson['atom'][myId] = {
                "id":myId,
                "class":myClass,
                "tagName":tagname,
                "attrs":ele.attribs,
                // "attrs":getAllAttributes($(this)),
                "content":$(this).html()
            };
      });

      json = [];
      $('body').find('*').each(function(){
        tagname = $(this).get(0).tagName || '';
        ele = $(this).get(0);
        myId = '';
        myClass = '';
        for (var k in ele.attribs){
            if (k =='id')
                myId = ele.attribs[k];
            if (k=='class')
                myClass = ele.attribs[k];
        }
        if (!myId) {
            if (myClass)
                myId = myClass.replace(/ /g,"_");
            else
                myId = tagname+"_";
                
            while(hash.indexOf(myId)>=0) {
                myId = myId+"_";
            }
            hash.push(myId);

        }
        //console.log('My ID',myId);
        $(this).attr('id',myId);
        // if (!id)
        //     console.log('Class',ele.attribs['class']);
         if (tagname=='style') {
            var json = ele.attribs;
            json['content'] = $(this).html();
            wholeJson['body-style'].push(json);
        }
        if (tagname=='script') {
            var json = ele.attribs;
            json['content'] = $(this).html();
            wholeJson['body-script'].push(json);
        }
        
        wholeJson['atom'][myId] = {
            "id":myId,
            "class":myClass,
            "tagName":tagname,
            "attrs":ele.attribs,
            "content":$(this).html()
        };
      });
      buildStructure($('head'),wholeJson['structure']['head']);
      buildStructure($('body'),wholeJson['structure']['body']);
      wholeJson['structure']['head-attrs'] = $('head').get(0).attribs;
      wholeJson['structure']['body-attrs'] = $('body').get(0).attribs;
      
//      wholeJson['body'] = json;
      
      return wholeJson;
}

(function(old) {
  $.fn.attr = function() {
    if(arguments.length === 0) {
      if(this.length === 0) {
        return null;
      }

      var obj = {};
      $.each(this[0].attributes, function() {
        if(this.specified) {
          obj[this.name] = this.value;
        }
      });
      return obj;
    }

    return old.apply(this, arguments);
  };
})($.fn.attr);

function getInfo(ele){
	console.log('Get Info',ele.get(0));
    var tagname = ele.get(0).name;
    var content;
    var key = {};
	var value;
	var myId,myClass,attrs,content;
  //  var json = myEle.attribs;
//    json = ele.attr();
//	json = ele.get(0).attribs || {};
	//json['content']='';
	myId = '';
	myClass='';
	//content = ele.html() || '';
	content = '';
	attrs = ele.get(0).attribs || {};
	
		
		



		for (var k in attrs){
			if (k =='id')
				myId = attrs[k] || null;
			if (k=='class')
				myClass = attrs[k] || null;
		}
		if (!myId) {
			if (myClass)
				myId = myClass.replace(/ /g,"_");
			else {
				var length = Object.keys(wholeJson['atom']).length;
				myId = tagname+length.toString();
			}
			
//			while(hash.indexOf(myId)>=0) {
//				myId = myId+"_";
//			}
//			hash.push(myId);
		}
		
		ele.attr('id',myId);
		
		wholeJson['atom'][myId] = {
			"id":myId,
			"class":myClass,
			"tagName":tagname,
			"attrs":attrs,
			"content":content
			// "attrs":getAllAttributes($(this)),
		};
		return myId;
}

function buildStructure(ele,structure){
    var id;
    ele.children('*').each(function(){
       id = $(this).attr('id');
       structure[id]={
        //   "id":id,
        //   "tagname":$(this).get(0).tagName,
        //   "attrs":$(this).get(0).attribs,
        //   "content":$(this).html()
       };    
       buildStructure($(this),structure[id]); 
    });
}


function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}
function loadJs(url) {
        var link = document.createElement("script");
        link.type = "application/javascript";
        link.src = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }


function textRenderer() {}


$.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

var app = angular.module("demoApp");




app.config(function($mdIconProvider) {
    $mdIconProvider.fontSet('md', 'material-icons');
});
app.config(['$provide', function($provide) {

    $provide.factory('dzMenu',function($http,$compile,$dazzleUser,$dazzlePopup,$dazzleS3,$ocLazyLoad,$mdDialog,$mdToast,$rootScope,
        dzS3,userInfo,atomInfo,dbFactory,pageInfo,dzFn){
		var dzMenu = {};
		

		    dzMenu.callFunction = function(tagName,name){
                var ele = $dazzleUser.dazzleInfo['panelEle'];
                console.log('Call',ele);
                
                var id = pageInfo.addID(ele);
                var newID;
		        switch(name){
		            
		            case 'remove': 
		                    ele.remove();
		                break;
		            case 'edit':
	                    if($dazzleUser.dazzleInfo['isEdit'])
                            dzMenu.quickRemovePanel();
                        else
                            dzMenu.quickAddPanel();
                        break;
		            
		            case 'copy-up':
		            //    var id = ele.attr('id') || new Date().getTime();
		                ele.attr('id',id);
                        var cloneEle = $('#'+id).clone();
                        
                        //cloneEle.attr('id',new Date().getTime());
                        
                        var ele2 = angular.element(cloneEle);
                        pageInfo.addID(ele2);
                        ele2.insertBefore(ele);
                        $compile(ele2)($rootScope);

		                break;
		                
		            case 'copy-down':
  		                    // var id = ele.attr('id') || new Date().getTime();
    		                ele.attr('id',id);
                            var cloneEle = $('#'+id).clone();
                            // cloneEle.attr('id',new Date().getTime());
                            
                            var ele2 = angular.element(cloneEle);
                            pageInfo.addID(ele2);
                            ele2.insertAfter(ele);
                            $compile(ele2)($rootScope);
		                break;
		                
		            case 'background':
		                   
		                    var params = {
                                name: "dzImageGalleryPopup",
                                directive:"<dz-image-gallery-popup></dz-image-gallery-popup>"
                            };
        
                            $dazzlePopup.callPopup(params).then(function(output){
                                var url = dzFn.getFileUrl('large-web',output.gid);
                                // var id = ele.attr('id');
                                ele.css('background-image','url('+url+')');
                            });
		                break;
		            case 'img-edit':
                        
                              var params = {
                                name: "dzImageGalleryPopup",
                                directive:"<dz-image-gallery-popup></dz-image-gallery-popup>"
                            };
        
                            $dazzlePopup.callPopup(params).then(function(output){
                                var url = dzFn.getFileUrl('large-web',output.gid);
                                // var id = ele.attr('id');
                                // console.log('Atom',id,atomInfo.atom[id],url);
                                ele.attr('src',url);
//                                atomInfo.atom[id]['src'] =url;
                            });
		            break;
		            
		            case 'text':
                          var confirm = $mdDialog.prompt()
                              .title('更改連結文字')
                              .placeholder('諭輸入內容')
                              .initialValue(ele.text())
                              .required(true)
                              .ok('OK')
                              .cancel('取消');
                        
                            $mdDialog.show(confirm).then(function(result) {
                                ele.text(result);
                            }, function() {
        
                            });		                
		                
	                break;
		            case 'link':
		                var params = {
                            name:"dzLinkPopup",
                            element: ele,
                            oldLink: ele.attr('href'),
                            directive:"<dz-link-popup></dz-link-popup>"
                        };
                        $dazzlePopup.callPopup(params).then(function(output) {
                            if (tagName =='A')
                                ele.attr('href', output['link']);
                            else
                                ele.wrap('<a href="'+output['link']+'"></a>');
                        });     
		                
	                break;
		        }
		        
		        
		    }
		
		
		    dzMenu.quickRemovePanel = function(){
		        console.log('Remove Panel');
                var ele = $dazzleUser.dazzleInfo['panelEle'];
                 var tagName = ele[0].tagName;
		        switch(tagName){
                case 'A':


                    break;

                case 'IMG':

                    break;

                    
                default:
                    if ($dazzleUser.dazzleInfo['isEdit']){
                        console.log('Edit Ele',ele);
                        $('.dz-border').removeClass('dz-border');
                        $('dazzle-toolbar').remove();
                        ele.unwrap();
                        $dazzleUser.dazzleInfo['isEdit'] =false;
                    }
             
                    break;


            }
                
                

		    }
		    dzMenu.quickAddPanel = function(ele=null){
		        if (ele==null)
		            ele = $dazzleUser.dazzleInfo['panelEle'];
		        console.log(ele);
		        var id = pageInfo.addID(ele);
		        console.log('Quick Add Panel',ele);
		        var tagName = ele[0].tagName;
		        switch(tagName){
                case 'A':


                    break;

                case 'IMG':

                    break;

                    
                default:
                
                    if (!ele.children().length){
                        
                        
                    }
                    
                    if (!$dazzleUser.dazzleInfo['isEdit']){
                        console.log('Create Panel');
                        $dazzleUser.dazzleInfo['isEdit'] = true;
                        $('dz-panel').remove();
                        ele.addClass("dz-border");
                        ele.wrap("<dz-text></dz-text>");
                        $compile($('dz-text'))($rootScope);
                        
                    }
                        // $dazzleUser.dazzleInfo['bodyCode'] = ele.html();
                        // $dazzleUser.dazzleInfo['panelId'] = ele.attr('id');
                        // $dazzleUser.dazzleInfo['isEdit'] =true;
                        // ele.wrap('<panel><dz-text></dz-text></panel>');
                        // $('panel').append("<dazzle-toolbar></dazzle-toolbar");
                        // // $('panel').find('img').attr('dz-image','');
                        // $('.medium-editor-toolbar').css('visibility','visible');
                        // $dazzleUser.dazzleInfo['addPanel'] = false;
                    break;


            }
		    }
		
            dzMenu.aItems =  ["更換連結", function ($itemScope,$event) {
                        var ele = angular.element($event.currentTarget);
                        var params = {
                            name:"dzLinkPopup",
                            element: ele,
                            oldLink: ele.attr('href'),
                            directive:"<dz-link-popup></dz-link-popup>"
                        };
                        $dazzlePopup.callPopup(params).then(function(output) {
                     //       console.log('Link',ele);
                            ele.attr('href', output['link']);
        
                        });     
                    }];
            
            dzMenu.imgItems = 	["更換圖片", function ($itemScope,$event) {
                   
                   var ele = angular.element($event.currentTarget);
                 console.log('My Element',ele);
                      var params = {
                        name: "dzImageGalleryPopup",
                        directive:"<dz-image-gallery-popup></dz-image-gallery-popup>"
                    };

                    $dazzlePopup.callPopup(params).then(function(output){
                        var url = dzFn.getFileUrl('large-web',output.gid);
                        var id = ele.attr('id');
                        console.log('Atom',id,atomInfo.atom[id],url);
                        ele.attr('src',url);
                        if(atomInfo.checkIsData(id)) {
                            var field = ele.attr('data-field') || null;
                            atomInfo.atom[id]['data'][field] = url;
                        }
                        atomInfo.saveAtom(id,atomInfo.atom[id]);
                    });
                }];
            
            dzMenu.richItems = 
               ["更新HTML", function ($itemScope,$event) {
//                            var ele = angular.element($event.currentTarget);
                            var ele = $dazzleUser.dazzleInfo['editElement'];
                            $dazzleUser.dazzleInfo['overlayEle'] = ele;
                            dzFn.addPanel(ele);
                }];
            dzMenu.conItems = 
                  ["更新文字", function ($itemScope,$event) {
                                  var ele = angular.element($event.currentTarget);
                                  
                                  
                                  var confirm = $mdDialog.prompt()
                                      .title('更改連結文字')
                                      .placeholder('諭輸入內容')
                                      .initialValue(ele.text())
                                      .required(true)
                                      .ok('OK')
                                      .cancel('取消');
                                
                                    $mdDialog.show(confirm).then(function(result) {
                                        var id = ele.attr('id');
                                        ele.text(result);
                                        console.log('Atom',id,atomInfo.atom[id]);
                                        atomInfo.atom[id]['html'] = result;
                                        if(atomInfo.checkIsData(id)) {
                                            var field = ele.attr('data-field') || null;
                                            atomInfo.atom[id]['data'][field] =result;
                                        }
                                        atomInfo.saveAtom(id,atomInfo.atom[id]);
                                    }, function() {
                
                                    });
                                

                            }];
							
		 dzMenu.conMenu = function($event){
            var menu = [];
		    var ele = angular.element($event.currentTarget);

            // var ele = angular.element($event.target);
//            var ele = $dazzleUser.dazzleInfo['overlayEle'];

            var tagName = ele[0].tagName;
            switch(tagName){
                case 'A':
                    console.log('tag name',tagName);
                    break;

                case 'IMG':
                    menu.push(atomInfo.imgItems);
                    break;

                case 'P':
                case 'SPAN':
                case 'DIV':
                    menu.push(atomInfo.richItems);
                    menu.push(atomInfo.conItems);
                    return menu;
                    break;


            }
        }
        return dzMenu;
			
	});
    $provide.factory('dzFn',function($http,$compile,$dazzleUser,$dazzlePopup,$dazzleS3,$dazzleInit,$ocLazyLoad,$mdDialog,$mdToast,
        dzS3,userInfo,atomInfo,dbFactory){
        var dzFn={};
        dzFn.info = {
            'version':[]
        };
		/*
            ele.find( "*:not(:has(*))" ).attr('context-menu','conMenu($event)');
            ele.find('a').attr('context-menu','aOptions');
            ele.find('img').attr('dz-image','');
            ele.find('img').attr('context-menu','menuOptions');
            ele.find('li').attr('context-menu','liOptions');
            $compile(ele.contents())(scope);
			*/
		    dzFn.findEditElement = function() {
                        var depth = 0;
	        		    var oEle;
	        		    var ele = $dazzleUser.dazzleInfo['editElement'];
                        oEle = ele;
                        if ($dazzleUser.dazzleInfo['myDepth']){
                            ele.parents().each(function(){
                                depth++;
                                if (depth==$dazzleUser.dazzleInfo['myDepth']) {
                                    oEle = $(this);
                                }
                                console.log('parent',$(this)); 
                            });		
                        }
			    return oEle;
			}
			
			dzFn.editElement = function(){
                        var ele = $dazzleUser.dazzleInfo['editElement'];
                        var tagName = $dazzleUser.dazzleInfo['editTagName'];
                switch(tagName){
                    case 'IMG':
                        var params = {
                            name: "dzImageGalleryPopup",
                            directive:"<dz-image-gallery-popup></dz-image-gallery-popup>"
                        };
    
                        $dazzlePopup.callPopup(params).then(function(output){
                            var url = dzFn.getFileUrl('large-web',output.gid);
                            var id = ele.attr('id');
                            ele.attr('src',url);
                            atomInfo.atom[id]['src'] = url;
                            atomInfo.atom[id]['html'] =ele.html();
                            atomInfo.saveAtom(id,atomInfo.atom[id]);
                        });

                    break;
                    
                    
                    default:
                         $dazzleUser.dazzleInfo['overlayEle'] = ele;
                         dzFn.addPanel(ele);
                    break;
                }        
                        // console.log('Context Menu',tagName,ele);
                        // var depth = 0;
                        // $('.dz-border').removeClass('dz-border');
                        // $dazzleUser.dazzleInfo['editElement'] = ele;
                        // ele.parents().each(function(){
                        //     if (depth==$dazzleUser.dazzleInfo['myDepth']) {
                        //         $(this).addClass('dz-border');
                        //         $dazzleUser.dazzleInfo['editElement'] = $(this);
                        //     }
                        //     depth++;

                        //     console.log('parent',$(this)); 
                        // });			    
                        
                        
			}
			dzFn.dzOptions = function(){
			    var menu =[];
			     //var ele = angular.element($event.currentTarget);
    			     var ele = angular.element($event.currentTarget);
                        console.log('Context Menu',ele,$event);

                // var ele = $dazzleUser.dazzleInfo['editElement'];

                        var tagName = ele[0].tagName;
                        
                        var depth = 0;
                        $('.dz-border').removeClass('dz-border');
                        $dazzleUser.dazzleInfo['editElement'] = ele;
                        ele.parents().each(function(){
                            if (depth==$dazzleUser.dazzleInfo['myDepth']) {
                                $(this).addClass('dz-border');
                                $dazzleUser.dazzleInfo['editElement'] = $(this);
                            }
                            depth++;

                            console.log('parent',$(this)); 
                        });
                console.log('Ele',ele);                                       
  		        var tagName = ele[0].tagName;
  		        
  		        var imgMenu = 	["更換圖片", function ($itemScope,$event) {
                     dzFn.getEditElement($event);
                     var ele = $dazzleUser.dazzleInfo['editElement'];
                      var params = {
                        name: "dzImageGalleryPopup",
                        directive:"<dz-image-gallery-popup></dz-image-gallery-popup>"
                    };

                    $dazzlePopup.callPopup(params).then(function(output){
                        var url = dzFn.getFileUrl('large-web',output.gid);
                        var id = ele.attr('id');
                        ele.attr('src',url);
                        atomInfo.atom[id]['src'] = url;
                        atomInfo.atom[id]['html'] =ele.html();
                        atomInfo.saveAtom(id,atomInfo.atom[id]);
                    });
                }];
			    var richMenu =              
                       ["更新HTML", function ($itemScope,$event) {
                                   dzFn.getEditElement($event);
                                   var ele = $dazzleUser.dazzleInfo['editElement'];

                                    $dazzleUser.dazzleInfo['overlayEle'] = ele;
                                    dzFn.addPanel(ele);
                        }];
                        
                switch(tagName){
                    case 'IMG':
                        menu.push(imgMenu);
                    break;
                    
                    
                    default:
                        menu.push(richMenu);                    
                    break;
                }        

                return menu;

			    
			    
			}
			
		dzFn.loadAdminPanel = function (name) {
            return new Promise(function (resolve, reject) {
                var jss = [];
                var directiveUrl = "https://d27btag9kamoke.cloudfront.net/builder6.0/"+name+"/element.js" + "?id=" + new Date().getTime();
                jss.push(directiveUrl);
                
 //               var templateUrl = "https://d27btag9kamoke.cloudfront.net/cdn6.0/models/modelPopup/dzPopupModel.html" + "?id=" + new Date().getTime();
//                var controllerUrl = "https://d27btag9kamoke.cloudfront.net/cdn6.0/models/modelPopup/dzPopup.js" + "?id=" + new Date().getTime();
 //               jss.push(controllerUrl);

                $ocLazyLoad.load(jss, {cache: false}).then(function () {
					resolve();
                },function(){
					reject();				
				});
            });
        }

		dzFn.removePage = function(page){
            return new Promise(function (resolve, reject) {
                // dzS3.removeFolder = function(bucket,prefix)
                dzS3.removeFolder(userInfo.exportBucket,'json/'+page);
                dzS3.removeFolder(userInfo.exportBucket,'admin/'+userInfo.uid+'/page/'+page);
                dzS3.removeFolder(userInfo.exportBucket,page);
                resolve();
            });
        }
			
        dzFn.conMenu = function($event){
            var menu = [];
            console.log('Con Overlay',$dazzleUser.dazzleInfo['overlayEle']);
            // var ele = angular.element($event.target);
            var ele = $dazzleUser.dazzleInfo['overlayEle'];

            var tagName = ele[0].tagName;
            switch(tagName){
                case 'A':
                    console.log('tag name',tagName);
                    break;

                case 'IMG':
                    menu.push(atomInfo.imgItems);
                    break;

                case 'P':
                case 'SPAN':
                    menu.push(atomInfo.richItems);
                    menu.push(atomInfo.conItems);
                    return menu;
                    break;


            }
        }

        dzFn.callPopup = function (params) {
            return new Promise(function (resolve, reject) {
                that.setDazzleInfo('params', params);
                var jss = [];
                if (!angular.isUndefined(params.name) && params.name){
                    var directiveUrl = "https://d27btag9kamoke.cloudfront.net/builder6.0/"+params.name+"/element.js" + "?id=" + new Date().getTime();
                    jss.push(directiveUrl);
                }

                var templateUrl = "https://d27btag9kamoke.cloudfront.net/cdn6.0/models/modelPopup/dzPopupModel.html" + "?id=" + new Date().getTime();
                var controllerUrl = "https://d27btag9kamoke.cloudfront.net/cdn6.0/models/modelPopup/dzPopup.js" + "?id=" + new Date().getTime();
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
        dzFn.buyDomain = function(domain){
            return new Promise(function (resolve, reject) {

                var action={
                    "action": "buy",
                    "domain":domain
                }

                $http({
                    "method": "post",
                    "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/buydomain",
                    "data": action
                }).then(function (result) {
                    console.log('Load Data',result);
                    if (result.data.code >0) {
                        resolve(result.data.resolve);
                    } else
                        reject();
                });

            });   
            
        }

        dzFn.getDNS = function(domain){
            return new Promise(function (resolve, reject) {

                var action={
                    "action": "getDNS",
                    "domain":domain
                }

                $http({
                    "method": "post",
                    "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/check",
                    "data": action
                }).then(function (result) {
                    console.log('Load Data',result);
                    if (result.data.code >0) {
                        resolve(result.data.resolve);
                    } else
                        reject();
                });

            });           
        }
        dzFn.callLambda = function(name,event){
            return new Promise(function (resolve, reject) {
                AWS.config.update({
                    region: 'ap-northeast-1'
                });
                var lambda = new AWS.Lambda();

                var params = {
                    FunctionName: name,
                    Payload: JSON.stringify(event)
                };
                lambda.invoke(params, function (err, data) {
                    console.log('Data',err,data);
                    resolve(data);
                    // var data = JSON.parse(data.Payload);
                    // if (data.code > 0) {
                    //     resolve(data);
                    // } else {
                    //     reject(data);
                    // }
                });
            });
        }
        dzFn.getFileUrl = function (size, id) {
            // return '';
            //   return $dazzleFn.getFileUrl(size,id);
            if (!id) {
                return null;
            }


            if (id.indexOf(".jpg")>=0) {
                id=id.replace(".jpg","");
            }

            return "//designerrrr-output.s3.amazonaws.com/images/"+userInfo.exportBucket+"/"+size+"/"+id+".jpg";

        }
        
        dzFn.loadPopupByType = function(type,input){

            console.log('Input',input);
            return new Promise(function (resolve, reject) {
                var subUser = store.set('subUser') || {login:'all'};
                console.log('sub User',subUser);
                switch(type){
                    default:
                    case 'text':

                            var confirm = $mdDialog.prompt()
                                .title('你要變更資料嗎?')
                                .textContent('輸入你的資料')
                                .placeholder()
                                .initialValue(input)
                                .required(true)
                                .ok('變更')
                                .cancel('取消');

                            $mdDialog.show(confirm).then(function(result) {
                                resolve(result);
                            });
                    break;
                    
                    case 'map':
                        
                        break;

                    case 'images':
                        var url;
                        var array =[];
                        var params = {
                            'name':'dzImageGalleryPopup',
                            'directive':'<dz-image-gallery-popup></dz-image-gallery-popup>',
                            'images':input,
                            'owner':"owner:"+subUser.login
                        };
                        $dazzlePopup.callPopup(params).then(function(result){

                            if (Array.isArray(result)){
                                angular.forEach(result,function(item,index){
                                    url = dzFn.getFileUrl('large-web',item.gid);
                                    array.push(url);
                                });

                            } else{
                                url = dzFn.getFileUrl('large-web',result.gid);
                                array.push(url);
                            }

                            resolve(array);
                        });

                        break;

                    case 'image':

                        var params = {
                            'name':'dzImageGalleryPopup',
                            'directive':'<dz-image-gallery-popup></dz-image-gallery-popup>',
                            'images':input,
                            'owner':"owner:"+subUser.login
                        };
                        $dazzlePopup.callPopup(params).then(function(result){
                            var url = dzFn.getFileUrl('large-web',result.gid);

                            resolve(url);
                        });
                        break;
                        
                    case 'gallery':
                        var params = {
                            'name':'dzGalleryPopup',
                            'directive':'<dz-gallery-popup></dz-gallery-popup>',
                            'images':input
                        };
                        $dazzlePopup.callPopup(params).then(function(result){
                            resolve(result);
                        });
                        break;
                        
                    case 'tags':
                        var params = {
                            'name':'dzTagsPopup',
                            'directive':'<dz-tags-popup></dz-tags-popup>',
                            'tags':input
                        };
                        $dazzlePopup.callPopup(params).then(function(result){
                            resolve(result);
                        });

                        break;
                    

                        
                    case 'html':
                        var params = {
                          'name':'dzEditorPopup',
                          'directive':'<dz-editor-popup></dz-editor-popup>',
                          'body':input
                        };

                        $dazzlePopup.callPopup(params).then(function(result){
                            resolve(result);
                         });                        
                        
                        break;
                    
                }
            });
            
        }
        dzFn.loadJssCsss = function (urls) {
                    if (Array.isArray(urls)) {
                        for (var i = 0; i < urls.length; i++) {
                            $ocLazyLoad.load(urls[i] + '?id=' + new Date().getTime());
                        }
                    } else {
                        $ocLazyLoad.load(urls + '?id=' + new Date().getTime());
                    }
                }
        dzFn.getContextMenu = function(ele){
            var id;
            var contextMenu = [];
            console.log('Check Ele',ele);
            for (k in atomInfo.atom){
                if (ele.find('#'+k).length){
                    console.log('Check ID',ele,k,atomInfo.atom[k]);
                    
                    if (atomInfo.atom[k].hasOwnProperty('contextMenu')){
                        console.log('Check Context',ele,k);
                        contextMenu.push(atomInfo.atom[k]['contextMenu']);
                    }
                }

            }


            // ele.find('*').map(function(){
            //     var thisEle = angular.element(this);
            //     console.log('This ElE',thisEle);
            //     var id = thisEle.attr('id') || null;
            //     console.log('ID',id);
            //     if (!angular.isUndefined(atomInfo.atom[id]))
            //         if(!angular.isUndefined(atomInfo.atom[id]['contextMenu']))
            //             contextMenu.push(atomInfo.atom[id]['contextMenu']);
            //
            // });


            return contextMenu;

        }
        dzFn.checkParentAtom = function(ele){
            ele.parents()
                .map(function() {
                    var thisEle = angular.element(this);
                    var id = thisEle.attr('id');
                    if (atomInfo.atom.hasOwnProperty(id))
                        return thisEle;
                });

            return ele;            
        }

        dzFn.checkParent = function(ele,attr){
            var isHref=false;
            ele.parents()
                .map(function() {
                    var thisEle = angular.element(this);
                    isHref = thisEle.attr(attr);
                    if (!angular.isUndefined(isHref))
                        return thisEle;
                });

            return ele;
        }

        dzFn.checkParent = function(ele,attr){
            var isHref=false;
            ele.parents()
                .map(function() {
                    var thisEle = angular.element(this);
                    isHref = thisEle.attr(attr);
                    if (!angular.isUndefined(isHref))
                        return thisEle;
                });

            return ele;
        }

        dzFn.getAtom = function(id){
            var thisPage = userInfo.thisPage;
            return new Promise(function (resolve, reject) {
                console.log('my Path',userInfo.exportBucket,'json/'+thisPage+'/'+id+'.json');
                $.getJSON( 'json/'+thisPage+'/'+id+'.json', function( data ) {
                    console.log('Atom',data);
                    resolve(data);
                },function(){
                    reject();
                });



            });
        }
         dzFn.checkUidAvailability= function(uid) {
            return new Promise(function (resolve, reject) {

                var action={
                    "action": "checkUidAvailability",
                    "uid":uid
                }

                $http({
                    "method": "post",
                    "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/check",
                    "data": action
                }).then(function (result) {
                    console.log('Load Data',result);
                    if (result.data.code ==21) {
                        resolve(true);
                    } else if (result.data.code==22){
                        resolve(false);
                    } else
                        reject();
                });

            });
        }
        dzFn.checkDomainAvailability= function(domain) {
            return new Promise(function (resolve, reject) {

                var action={
                    "action": "checkDomainAvailability",
                    "domain":domain
                }

                $http({
                    "method": "post",
                    "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/check",
                    "data": action
                }).then(function (result) {
                    console.log('Load Data',result);
                    if (result.data.code ==21) {
                        resolve(true);
                    } else if (result.data.code==22){
                        resolve(false);
                    } else
                        reject();
                });

            });
        }
        // dzFn.checkDomainAvailability = function(domain){
        //     return new Promise(function (resolve, reject) {
        //         var route53domains = new AWS.Route53Domains();
        //         var params = {
        //             DomainName: domain
        //         };
        //         route53domains.checkDomainAvailability(params, function (err, data) {
        //             if (err) {
        //                 console.log(err, err.stack);
        //                 reject();
        //             } // an error occurred
        //             else {
        //                 console.log(data);
        //                 resolve(data);
        //             }           // successful response
        //         });
        //     });
        // }

        dzFn.getMyPage = function(bucket){
            return new Promise(function (resolve, reject) {
                var action={
                    "action": "searchData",
                    "index": "dazzle",
                    "type": "webpage",
                    "body":{
                        "query":{
                            "match":{
                                "bucket":bucket
                            }
                        }
                    }
                }

                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": action
                }).then(function (result) {
                    console.log('Load Data',result);
                    if (result.data.code < 0) {
                        resolve([]);
                    } else {
                        resolve(result.data.resolve);
                    }
                });
            });
        }

        dzFn.loadPage = function () {
            console.log('%c------------------------------------------ Load Page---------------', "color: blue; font-size:30px;");
            console.log('Compiling');


            $('#dz-init-overlay').show();
            setTimeout(function () {
                //$scope.$apply(function () {
                $compile($('body').contents())($scope);
                // },function(err){
                //     console.log(err);
                // });
                $('#dz-init-overlay').hide();
            }, 1000);
        }
        dzFn.reload = function() {
            var token = $dazzleUser.getUser().token;
            if (angular.isUndefined(token) || !token)
                token = store.get('token');
            console.log('%c------------------------------------------', "color: blue; font-size:30px;");
            console.log($dazzleUser.getUser());
            console.log('Token',$dazzleUser.getUser().token);

            if (token) {
                $dazzleUser.userLogin(token).then(function () {

                    dzFn.user = $dazzleUser.getUser();

                    $dazzleInit.loadUserInfo().then(function(){
                        $dazzleInit.loadDirectiveInfo().then(function(){
                            $scope.loadPage();
                        });
                    });
                }, function () {
                    console.log('Cannot Get Token');
                });
            } else {
                console.log('No Token');
                $mdToast.toast("無法重新載入");
            }
        }

        dzFn.removeOverlay = function() {

        }

        dzFn.removePanel = function() {
//            return new Promise(function (resolve, reject) {
                var panel = $('panel');
                var html = panel.find('dz-text').html();
                var panelId = $dazzleUser.dazzleInfo['panelId'];
                $('.medium-editor-toolbar').remove();

            panel.find('md-toolbar').remove();
                ele2 = angular.element(html);
                panel.replaceWith(ele2);
                $dazzleUser.dazzleInfo['isEdit'] = false;
                $dazzleUser.dazzleInfo['isCheck'] = false;
                atomInfo.atom[panelId].html = html;
                console.log('Remove Panel Atom',atomInfo.atom);
            //resolve();
//            });
        }

        dzFn.needOverlay = function(ele) {
 //           console.log('Check Depth',ele);

            var type = 'normal';
            // $('dz-overlay').remove();
            var count = 0;
            var contextMenu = [];
            var depthThershold = $dazzleUser.dazzleInfo['overlayDepth'] || 0;

            var depth = dzFn.eleDepth(ele);
            //console.log('Depth Thershold',depthThershold,depth,$dazzleUser.dazzleInfo['isCheck'], $dazzleUser.dazzleInfo['isEdit']);

            //console.log('Depth Return True 1');
            if (depth<depthThershold)
                return false;
            //console.log('Depth Return True 2');
            if ($dazzleUser.dazzleInfo['isCheck'] || $dazzleUser.dazzleInfo['isEdit'])
                return false;

//            console.log('Depth Return True 3');

//            console.log('Depth: ',eleDepth(ele));
//            console.log('Body Depth',eleDepth($('body')));

             
             for (k in atomInfo.atom){
                if (ele.find('#'+k).length){
                    count++;
                    
                    if (atomInfo.atom[k].hasOwnProperty('contextMenu')){
                        console.log('Check Context',ele,k);
                        contextMenu.push(atomInfo.atom[k]['contextMenu']);
                    }
                }
             }
             $dazzleUser.dazzleInfo['contextMenu'] = contextMenu;
             console.log('Context Menu',$dazzleUser.dazzleInfo['contextMenu'] );
             if (count==1)
                type='atom';

            return type;


        }

        dzFn.eleDepth = function(ele){
            var depth = ele.parents().length;
            if (angular.isUndefined(depth))
                return 0;
            else
                return ele.parents().length;
        }
        dzFn.newAddAtomOverlay = function(target){
            var height,width,top,left,master,isMaster;

           // $('dz-atom-overlay').remove();
            $('dz-overlay').remove();

            height = target[0].offsetHeight;
            width = target[0].offsetWidth;
            top = target.offset().top;
            left = target.offset().left;
            master = target.attr('dz-master');
            if (!angular.isUndefined(master))
                isMaster = true;
            else
                isMaster = false;

            var overlaySize = {
                height: height,
                width: width,
                top: top,
                left: left,
                master: isMaster
            };
            console.log('Add New Overlay',height,width,top,left);

            $dazzleUser.dazzleInfo['overlaySize'] = overlaySize;
           // $('dz-container').append('<dz-atom-overlay context-menu="menuOptions"></dz-atom-overlay>');
                
        }
        dzFn.newAddOverlay = function(target){
            var height,width,top,left,master,isMaster;

           // $('dz-atom-overlay').remove();
            $('dz-overlay').remove();

            height = target[0].offsetHeight;
            width = target[0].offsetWidth;
            top = target.offset().top;
            left = target.offset().left;
            master = target.attr('dz-master');
            if (!angular.isUndefined(master))
                isMaster = true;
            else
                isMaster = false;

            var overlaySize = {
                height: height,
                width: width,
                top: top,
                left: left,
                master: isMaster
            };
            console.log('Add New Overlay',height,width,top,left);

            $dazzleUser.dazzleInfo['overlaySize'] = overlaySize;
            $('dz-container').append('<dz-overlay context-menu="menuOptions"></dz-overlay>');

        }
        dzFn.atomExport = function(page=null) {
            if(!page)
                page=decodeURIComponent(location.pathname).substring(location.pathname.lastIndexOf('/') + 1) || 'index.html';
            console.log('Atom Export',{
                "action":"atomExport",
                "bucket":userInfo.exportBucket,
                "page":page,
                "atom":atomInfo.atom
            });
            return new Promise(function (resolve, reject) {

                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzleEditorMiscFunction",
                    "data": {
                        "action":"atomExport",
                        "bucket":userInfo.exportBucket,
                        "page":page,
                        "atom":atomInfo.atom
                    }
                }).then(function (result) {
                    console.log('Backend',result);
                    if (result.data.code > 0) {
                        alert('成功更新');
                    } else
                        reject();
                });
            });
        }

        dzFn.addNewDataPage = function(template,data,atom) {
            return new Promise(function (resolve, reject) {
                var isAdd =false;
                var title = prompt("請輸入新資料標題。注意：重覆標題會導致資料被覆寫！");
                $.get(title+'.html')
                    .done(function() {
                        if (!confirm('匯出會覆蓋舊頁，有否問題？'))
                            reject();
                        else
                            isAdd = true;
                    }).fail(function() {
                        isAdd = true;
                    });

                if (!isAdd)
                    reject();

                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzleEditorMiscFunction",
                    "data": {
                        "action":"addNewDataPage",
                        "bucket":userInfo.exportBucket,
                        "uid":userInfo.uid,
                        "title":title,
                        "page":title+'html',
                        "template":template,
                        "data":data,
                        "table":table
                    }
                }).then(function (result) {
                    if (result.data.code > 0) {
                        if (confirm('新頁已開，是否跳至新頁？'))
                            location.href = pageName ;
                        else
                            resolve();

                    } else
                        alert('新增新頁失敗');
                        reject();
                });


                // dzS3.saveJson(userInfo.exportBucket,'json/'+pageName+'/data.json',data).then(function(){
                //     console.log('Template',template,pageName);
                //     if (confirm('匯出會覆蓋舊頁，有否問題？')) {
                //         $dazzlePopup.toast('已複製樣辦至新頁');

                //         dzS3.copyFile(userInfo.exportBucket + '/' + template, userInfo.exportBucket, pageName ).then(function () {
                //             if (confirm('新頁已開，是否跳至新頁？'))
                //                 location.href = pageName ;
                //             else
                //                 resolve();
                //         });
                //     } else
                //         reject();
                // },function(){
                //     reject();
                // });

            });


        }


        

        dzFn.addNewPage = function(pageName,key,template,data,table=null) {
            var isAdd = false;

            return new Promise(function (resolve, reject) {
                $.get(key)
                        .done(function() {
                            if (!confirm('匯出會覆蓋舊頁，有否問題？'))
                                reject();
                            else
                                isAdd = true;
                        }).fail(function() {
                            isAdd = true;
                        });

                if (!isAdd)
                    reject();


                if(table)
                    dbFactory.saveData(location.hostname,table,key,data).then(function(){
                        $dazzlePopup.toast('成功儲存資料');

                    },function(){
                        $dazzlePopup.toast('不成功儲存資料');
                    });

                
                   

                dzS3.saveJson(userInfo.exportBucket,'json/'+pageName+'/data.json',data).then(function(){
                    console.log('Template',template,pageName);
                    if (template){
                        dzS3.getJson(userInfo.exportBucket,'json/'+template+'/atom.json').then(function(json){
                            //json['dz-content-id'] = key;
                            json['dz-page-content'] = {
                                "index":location.hostname,
                                "table":table,
                                "key":key,
                                "data": data
                            };
                            dzS3.saveJson(userInfo.exportBucket,'json/'+pageName+'/atom.json',json);
                        });
//                        dzS3.copyFile(userInfo.exportBucket + '/json/' + template+'/atom.json', userInfo.exportBucket, 'json/'+pageName+'/atom.json');
                        dzS3.copyFile(userInfo.exportBucket + '/' + template, userInfo.exportBucket, pageName ).then(function () {
                            if (confirm('新頁已開，是否跳至新頁？'))
                                location.href = pageName ;
                            else
                                resolve();
                        });
                    }


                },function(){
                    alert('不能開啟新頁');
                    reject();
                });

            });


        }

        dzFn.addDataPanel = function()  {
            var target = $dazzleUser.dazzleInfo['overlayEle'];
            console.log('Overlay',target);
            $dazzleUser.dazzleInfo['editEle'] = $dazzleUser.dazzleInfo['overlayEle'];
            console.log('EditEle',$dazzleUser.dazzleInfo['editEle'] );

            $dazzleUser.dazzleInfo['isEdit'] = true;
            // Update Menu Options

            target.wrap('<panel><dz-data-template></dz-data-template></panel>');
            $dazzleUser.dazzleInfo['bodyCode'] = target.html();
            $('panel').append("<dazzle-data-toolbar></dazzle-data-toolbar");
            // $compile($('panel').contents())($scope);
            $('dz-overlay').remove();
            $dazzleUser.dazzleInfo['addDataPanel'] = false;
        }

        dzFn.isMaster = function(id){
            console.log('DZ Master',$('[dz-master]').find('#1542088878923'));


            if ($('[dz-master]').find('#'+id).length)
                return true;
            else
                return false;
        }
        dzFn.updateMaster = function(id){
            for (key in atomInfo.atom){
                if (dzFn.isMaster(key))
                    atomInfo.atom[key].master = true;
            }
        }
        dzFn.checkAtom = function(ele,json={}){
            console.log(ele);
            // var class = attr('class');
            var id = ele.attr('id')|| new Date().getTime();
            var newAtom = json;
            if (!id) {
                id= new Date().getTime();
                ele.attr('id',id);
            }
            if (angular.isUndefined(atomInfo.atom[id])) {
                newAtom['id'] = id;
                newAtom['html'] = ele.html();
            } else {
                newAtom = atomInfo.atom[id];
            }

            for (key in json){
                newAtom[key] = json[key];
            }
            newAtom['master'] = dzFn.isMaster(id);
            atomInfo.atom[id] = newAtom;
            console.log('Check Atom',atomInfo.atom[id],id);
            return id;
        }

        dzFn.addPanel = function(target=null) {

                if (!target)
                    target = $dazzleUser.dazzleInfo['overlayEle'];

                console.log('Overlay',target);
                // var id = target.attr('id') || null;

                

                // dzFn.checkAtom(target);

//                target.attr('id',id);

                $dazzleUser.dazzleInfo['editEle'] = $dazzleUser.dazzleInfo['overlayEle'];
                console.log('EditEle',$dazzleUser.dazzleInfo['editEle'] );
                $dazzleUser.dazzleInfo['isEdit'] = true;
                dzFn.info['version'].push($('dz-container').html());
                // Update Menu Otpions
                console.log('Overwrap',target);
                // target = angular.element(target);
                target.wrap('<panel><dz-text></dz-text></panel>');
                $dazzleUser.dazzleInfo['bodyCode'] = target.html();
                $dazzleUser.dazzleInfo['panelId'] = target.attr('id');
                $('panel').append("<dazzle-toolbar></dazzle-toolbar");
                // $('panel').find('img').attr('dz-image','');
                $('dz-overlay').remove();
                $('.medium-editor-toolbar').css('visibility','visible');
                $dazzleUser.dazzleInfo['addPanel'] = false;


        }
        dzFn.loadMyDirectives = function () {
            var url = "//dazzle-template.s3.amazonaws.com/builder6.0/";
            var js,css;
            return new Promise(function (resolve, reject) {

                var count=0,length=0;

                $http({
                    "method": "post",
                    "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/getdirective",
                    "data": {
                        "type": "getDirectiveByOwners",
                        "owner": ['client-core',userInfo.uid]
                    }
                }).then(function (result) {
                    console.log('Custom Result',result);
                    if (result.data.code > 0) {
                //        $dazzleUser.setDazzleInfo('customDirectivesJson',result.data.data);
                        userInfo.myDirective = result.data.data;
                        $dazzleS3.saveJson(userInfo.exportBucket,'json/directive.json',result.data.data);
                        console.log('Save JSOn',userInfo.user);
                    } else {
                        reject();
                    }
                }, function () {
                   reject();
                });



            });
        }

        dzFn.pageImport = function(url,page) {
            return new Promise(function (resolve, reject) {


                var msg;

                msg = {
                    "url": url,
                    "indexUrl": page,
                    "bucket":userInfo.exportBucket,
                    "pageNo": 1
                };
                console.log(JSON.stringify(msg));

                dzFn.sendSystemMessage('initPage', msg).then(function (result) {
                    resolve();
                },function(err){
                    reject();
                });
            });
        }
        dzFn.pageExport = function(page) {
            return new Promise(function (resolve, reject) {

                var i, length, key;
                var msg;

                msg = {
                    "uid": userInfo.uid,
                    "action":"pageExport",
                    "bucket":userInfo.exportBucket,
                    "page":page
                };
                console.log(JSON.stringify(msg));

                dzFn.sendSystemMessage('createAdmin', msg).then(function (result) {
                   // dzFn.toast(page+"成功匯出");
                   // var html = store.get('html');
                   // const htm = cheerio.load(html);

                    resolve();
                },function(err){
                    reject();
                });
            });
        }
        dzFn.buildDataPage = function(id,page,data){

            console.log('buildDataPage',id,page,data);
            return new Promise(function (resolve, reject) {


                Promise.all([dzS3.getThisPage(page,'body.content'),dzS3.getThisPage(page,'pageInfo.json')]).then(function(result) {
                    var body = result[0];
                    var json = result[1];
                    var newBody;

                    var html = store.get('html');
                    const htm = cheerio.load(html, {decodeEntities: false});
                    htm('body').html(body);
                    htm('body').find('dz-content-id').html(id);
//                    htm('body').wrapInner( "<dz-load-data data-id='"+id+"'></dz-load-data>");
                    newBody = htm('body').html();
                   // console.log('Body',newBody);
                    Promise.all([ $dazzleS3.saveFile(userInfo.exportBucket,'admin/'+userInfo.uid+'/page/'+page+'/body.content',newBody),$dazzleS3.saveJson(userInfo.exportBucket,'content/'+id+'-data.json',data),dzFn.pageExport(page)]).then(function(){
                        resolve();
                    },function(err){
                        reject();
                    });

                });
            });

            //
            // // Head Compile
            // htm('title').html(pageInfo.model.title + " | " + pageInfo.model.masterTitle);
            // htm('meta').html(pageInfo.model.meta +" , " + pageInfo.model.masterMeta);
            //
            //
            // htm('head').find('script').remove();
            // angular.forEach(pageInfo.model.pageJs,function(item,index){
            //     var ele = cheerio.load('<script></script>');
            //     for (key in item){
            //         if (key !='html')
            //             ele('script').attr(key,item[key]);
            //         else
            //             ele('script').html(key['html']);
            //     }
            //     var text = ele.html();
            //     console.log(text);
            //     htm('head').append(text);
            // });
            //
            // htm('head').find('link').remove();
            // angular.forEach(pageInfo.model.pageCss,function(item,index){
            //     var ele;
            //     if (!angular.isUndefined(item['html']))
            //         ele = cheerio.load('<style></style>');
            //     else
            //         ele =cheerio.load('<link>');
            //     for (key in item){
            //         if (key !='html')
            //             ele('link').attr(key,item[key]);
            //         else
            //             ele('style').html(key['html']);
            //     }
            //     var text = ele.html();
            //     console.log(text);
            //     htm('head').append(text);
            //
            // });
            // pageInfo.model.head = htm('head').html();
            //
            // // Body Compile
            //
            // htm('body').html(pageInfo.model.body);
            // htm('body').find('.cfp-hotkeys-container').remove();
            // htm('dz-overlay').remove();
            // // Need to update
            //
            // pageInfo.model.fullHtml = htm.html();
            // console.log('Full Html',pageInfo.model.fullHtml);


        }


        dzFn.loadBackend = function() {
            var url = "//dazzle-template.s3.amazonaws.com/backend6.0/";
            var count =0,length;
            var js1,js2;
            return new Promise(function (resolve, reject) {
                console.log('JSON',)
                $http({
                    "method": "post",
                    "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/getdirective",
                    "data": {
                        "type": "getBackendByOwners",
                        "owner":["dazzleadmin",userInfo.uid]
                    }
                }).then(function (result) {
                    console.log('Backend',result);
                    if (result.data.code > 0) {
                        directiveIdArray = result.data.data;
                        console.log('Update',directiveIdArray);
                        length = result.data.data.length;
                        resolve();
                        if (!length)
                            resolve();
                        for (var i=0;i<length;i++){
                            var id = directiveIdArray[i].id;

                            js1 = url + id +"/"+id+"Editor.js";
                            js2 = url + id +"/"+id+"Renderer.js";
                            console.log('Backend',id,js1,js2);

                            $ocLazyLoad.load([js1, js2], {cache: false}).then(function () {
                                console.log('Success Load Directive',js1,js2);
                                count++;
                                if (count>=length)
                                    resolve();
                            }, function () {
                                console.log('Fail Load Directive',js1,js2);
                                count++;
                                if (count>=length)
                                    resolve();
                            });

                        }
                    } else
                        reject();
                });

            });
        }
        dzFn.updateDirective = function(){
            console.log('Update Directive');
            var isCore = false, isUser = false;
            return new Promise(function (resolve, reject) {

                $http({
                    "method": "post",
                    "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/getdirective",
                    "data": {
                        "type": "getDirectiveByOwners",
                        "owner":["client-core",userInfo.uid]
                    }
                }).then(function (result) {
                    console.log('Update',result);
                    if (result.data.code > 0) {
                        directiveIdArray = result.data.data;
                        console.log('Update',directiveIdArray);
                        $dazzleS3.saveJson(userInfo.exportBucket, 'json/directive.json', directiveIdArray).then(function(){
                            resolve();
                        },function(err){
                            reject();
                        });
                    } else
                        reject();
                });

            });

        }
        dzFn.sendSystemMessage = function(topic,msg) {
            return new Promise(function (resolve, reject) {

                var u = $dazzleUser.getUser();
                // console.log('Send User',u);
                // AWS.config.credentials = new AWS.Credentials(u.key.accessKeyId, u.key.secretAccessKey, u.key.sessionToken);

                var params = {
                    Message: JSON.stringify(msg),
                    TopicArn: 'arn:aws:sns:ap-northeast-1:448984897563:' + topic
                };

                // Create promise and SNS service object


                // console.log('AWS',AWS);
//                $dazzleUser.setUser(u);
                AWS.config = new AWS.Config();
                AWS.config.accessKeyId = u.key.AccessKeyId;
                AWS.config.secretAccessKey = u.key.SecretAccessKey;
                AWS.config.sessionToken = u.key.SessionToken;
                AWS.config.region = 'ap-northeast-1';

                var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31', region: 'ap-northeast-1'}).publish(params).promise();

                // Handle promise's fulfilled/rejected states
                publishTextPromise.then(
                    function (data) {
                        // console.log(`Message ${params.Message} send sent to the topic ${params.TopicArn}`);
                        // console.log("MessageID is " + data.MessageId);
                        resolve();
                    }).catch(
                    function (err) {
                        console.error(err, err.stack);
                        reject();
                    });
            });
        }


        dzFn.callPopup = function (params) {
            return new Promise(function (resolve, reject) {
                $dazzleUser.setDazzleInfo('params', params);
                var jss = [];
                if (!angular.isUndefined(params.name) && params.name){
                    var directiveUrl = "https://d27btag9kamoke.cloudfront.net/builder6.0/"+params.name+"/element.js" + "?id=" + new Date().getTime();
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

        dzFn.toast = function (text) {
            $mdToast.show(
                $mdToast.simple()
                    .position('top right')
                    .textContent(text)
                    .hideDelay(1500)
            );
        }

        return dzFn;

    });
    $provide.factory('dzS3',function(userInfo,$dazzleS3,$dazzleUser){
        var dzS3 ={};



        dzS3.getAllHtml = function() {
            var allHtml = [];
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();


                var params = {
                    Bucket: userInfo.exportBucket
                };

                var allKeys = [];
                listAllKeys();
                var allHtml = [];



                function listAllKeys() {
                    s3.listObjectsV2(params, function (err, data) {
                        if (err) {
                            console.log(err, err.stack); // an error occurred
                        } else {
                            var contents = data.Contents;

                            contents.forEach(function (content) {
                                allKeys.push(content.Key);
                            });

                            if (data.IsTruncated) {
                                params.ContinuationToken = data.NextContinuationToken;
                                console.log("get further list...");
                                listAllKeys();
                            } else {
                                console.log('All HTML',allKeys);

                                allKeys.forEach(function (str) {

                                    // var str = content.Key;
                                    // str = str.toString();
                                    var paths = str.split("/");

                                    if (paths[0].indexOf(".html")>0)
                                        allHtml.push(str);

                                });
                                console.log('All HTML',allHtml);
                                resolve(allHtml);
                            }

                        }
                    });
                }

                //
                // var out = false;
                // var startAfter ='';
                //
                //     var params = {
                //         Bucket: userInfo.exportBucket
                //     };
                //     s3.listObjects(params, function (err, data) {
                //         if (err) return callback(err);
                //
                //         console.log('Data', data);
                //         var count = 0;
                //         data.Contents.forEach(function (content) {
                //
                //             var str = content.Key;
                //             var paths = str.split("/");
                //
                //             if (paths[0].indexOf(".html")>0)
                //                 allHtml.push(str);
                //
                //         });
                //         console.log('All HTML',allHtml);
                //
                //     });
                //
                // resolve(allHtml);
            });
        }
        dzS3.copyPage = function(src,dest){
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: userInfo.exportBucket,
                    Prefix: userInfo.websiteKey
                };
                s3.listObjects(params, function (err, data) {
                    if (err) return callback(err);

                    console.log('Data',data);
                    var count = 0;
                    data.Contents.forEach(function (content) {

                        var str = content.Key;
                        str = str.replace(userInfo.thisPage,dest);

                        dzS3.getFile(userInfo.exportBucket,content.Key).then(function(data2){
                            dzS3.saveFile(userInfo.exportBucket,str,data2).then(function(data3){
                                count++;
                                console.log(count);
                                console.log(data.Contents.length);
                                if (count == data.Contents.length)
                                    resolve(data3);
                            },function(){
                                reject();
                            });
                        },function(){
                            reject();
                        });

                    });
                });
            });
        }
        dzS3.copyFolder = function(bucket,src, dest){
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Prefix: src
                };
                s3.listObjects(params, function (err, data) {
                    if (err) return callback(err);

                    console.log('Data',data);
                    var count = 0;
                    data.Contents.forEach(function (content) {

                        var str = content.Key;
                        str = str.replace(src,dest);

                        dzS3.getFile(bucket,content.Key).then(function(data2){
                            console.log('Data2',data2);
                            dzS3.saveFile(bucket,str,data2).then(function(data3){
                                count++;
                                console.log('Count',count);
                                console.log(data.Contents.length);
                                if (count == data.Contents.length)
                                    resolve(data3);
                            },function(){
                                reject();
                            });
                        },function(){
                            reject();
                        });

                    });


                });
            });
        }
        dzS3.removeFolder = function(bucket,prefix){
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Prefix: prefix
                };
                console.log('Params',params);
                s3.listObjects(params, function (err, data) {
                    if (err)
                        reject(err);

                    if (data.Contents.length == 0)
                        reject();

                    params = {Bucket: bucket};
                    params.Delete = {Objects: []};

                    data.Contents.forEach(function (content) {
                        params.Delete.Objects.push({Key: content.Key});
                    });

                    s3.deleteObjects(params, function (err, data) {
                        if (err)
                            reject(err);
                        else
                            resolve();
                    });
                });
            });
        }

        dzS3.removeFile = function (bucket, key) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Key: key
                };
                s3.deleteObject(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        }
        dzS3.getJson = function (bucket, key) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Key: key,
                    ResponseExpires: new Date()
                };
                s3.getObject(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                       console.log('Get JSON',key,data.Body.toString());
                        resolve(JSON.parse(data.Body.toString()));
                    }
                });
            });
        }

        dzS3.getFile = function (bucket, key) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Key: key,
                    ResponseExpires: new Date()
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
        dzS3.saveJson = function (bucket, key, json) {
            return new Promise(function (resolve, reject) {
                var content = JSON.stringify(json,null,4);
                dzS3.saveFile(bucket, key,content).then(function (result) {
                    resolve(result);
                }, function (err) {
                    reject(err);
                });
            });
        }

        dzS3.saveFile = function (bucket, key, string) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var u = $dazzleUser.getUser();
                AWS.config = new AWS.Config();
                AWS.config.accessKeyId = u.key.AccessKeyId;
                AWS.config.secretAccessKey = u.key.SecretAccessKey;
                AWS.config.sessionToken = u.key.SessionToken;
                AWS.config.region = 'ap-northeast-1';

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


        dzS3.saveMyImage = function (uid, file,subowner=0) {
            return new Promise(function (resolve, reject) {

                AWS.config = new AWS.Config();
                AWS.config.accessKeyId = "AKIAIBDDGSXRVIVLGN5Q";
                AWS.config.secretAccessKey = "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";
//                AWS.config.sessionToken = awsJson.SessionToken;
                AWS.config.region = 'ap-northeast-1';

                var s3 = new AWS.S3();

                var oldFilename = encodeURIComponent(file.name);
                var fileExtansion = oldFilename.split('.').pop();
                var newId = 'id' + new Date().getTime()
                var newFilename =  newId + '.jpg';
                var params = {
                    Bucket: "designerrrr",
                    Key: "images/" + uid + "/" + newFilename,
                    ContentType: file.type,
                    Body: file,
                    Metadata: {
                        "newVersion": "new",
                        "gid": newId,
                        "owner_id": uid,
                        "original_name": oldFilename,
                        "galleryType": "photo",
                        "subowner": subowner
                    }

                };
                console.log('Sub-owner',subowner);
                // if (subowner !='')
                //         params.Metadata['subowner'] = subowner;

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

        dzS3.saveImage = function (uid, file) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var oldFilename = encodeURIComponent(file.name);
                var fileExtansion = oldFilename.split('.').pop();
                var newId = 'id' + new Date().getTime()
                var newFilename =  newId + '.jpg';
                var params = {
                    Bucket: "designerrrr",
                    Key: "images/" + uid + "/" + newFilename,
                    ContentType: file.type,
                    Body: file,
                    Metadata: {
                        "newVersion": "new",
                        "gid": newId,
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

        dzS3.listObject = function (bucket, key) {
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

        dzS3.copyFile = function (copySource, bucket, key) {
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

        dzS3.checkFile = function (bucket, key) {
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

        dzS3.getFileUrl = function (bucket, key, expires) {
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

        dzS3.getData = function(file){

            var ext = file.substr(file.lastIndexOf('.') + 1);
            console.log('Path',userInfo.exportBucket, userInfo.dataKey + file);
            return new Promise(function (resolve, reject) {
                if (ext === 'json'){
//                    $dazzleS3.getJson(userInfo.exportBucket, userInfo.dataKey + file).then(function (result) {
                    dzS3.getJson(userInfo.exportBucket, userInfo.dataKey + file).then(function (result){
                        console.log('Hello');
                        resolve(result);
                    }, function (err) {
                        console.log('Error');
                        reject(err);
                    });
                } else {
                    $dazzleS3.getFile(userInfo.exportBucket, userInfo.dataKey + file).then(function (result) {
                        resolve(result);
                    }, function (err) {
                        reject(err);
                    });
                }

            });
        }
        dzS3.saveData = function(file,content){

            var ext = file.substr(file.lastIndexOf('.') + 1);

            return new Promise(function (resolve, reject) {
                if (ext === 'json'){
                    $dazzleS3.saveJson(userInfo.exportBucket, userInfo.dataKey + file,content).then(function () {
                        resolve();
                    }, function (err) {
                        reject(err);
                    });
                } else {
                    $dazzleS3.saveFile(userInfo.exportBucket, userInfo.dataKey + file,content).then(function () {
                        resolve();
                    }, function (err) {
                        reject(err);
                    });
                }

            });
        }

        dzS3.getThisPage = function(page,file){
            var key = 'admin/'+userInfo.uid+'/page/'+page+'/'+file;
            var ext = file.substr(file.lastIndexOf('.') + 1);
            return new Promise(function (resolve, reject) {

                if (ext==='json'){
                    $dazzleS3.getJson(userInfo.exportBucket,key).then(function(result){
                        resolve(result);
                    },function(err){
                        reject(err);
                    });
                } else {
                    $dazzleS3.getFile(userInfo.exportBucket,key).then(function(result){
                        resolve(result);
                    },function(err){
                        reject(err);
                    });
                }
            });
        }
        dzS3.getPage = function (file) {
            var ext = file.substr(file.lastIndexOf('.') + 1);
            return new Promise(function (resolve, reject) {

                if (ext==='json'){
                    $dazzleS3.getJson(userInfo.exportBucket,userInfo.pageKey+file).then(function(result){
                        resolve(result);
                    },function(err){
                        reject(err);
                    });
                } else {
                    $dazzleS3.getFile(userInfo.exportBucket,userInfo.pageKey+file).then(function(result){
                        resolve(result);
                    },function(err){
                        reject(err);
                    });
                }


            });
        }
        dzS3.getMasterJson = function(){
            return new Promise(function (resolve, reject) {
                dzS3.getJson(userInfo.exportBucket, userInfo.masterKey + 'master.json').then(function (result) {
                    resolve(result);
                }, function (err) {
                    reject(err);
                });
            });
        }
        dzS3.getMaster = function (file) {
            var ext = file.substr(file.lastIndexOf('.') + 1);
            console.log('Get Master',userInfo.exportBucket,userInfo.masterKey+file);
            return new Promise(function (resolve, reject) {
                if (ext==='json'){
                    dzS3.getJson(userInfo.exportBucket,userInfo.masterKey+file).then(function(result){
                        resolve(result);
                    },function(err){
                        reject(err);
                    });
                } else {
                    dzS3.getFile(userInfo.exportBucket,userInfo.masterKey+file).then(function(result){
                        resolve(result);
                    },function(err){
                        reject(err);
                    });
                }

            });
        }
        dzS3.getUser = function (file) {
            var ext = file.substr(file.lastIndexOf('.') + 1);
            return new Promise(function (resolve, reject) {
                if (ext==='json'){
                    $dazzleS3.getJson(userInfo.exportBucket,userInfo.userKey+file).then(function(result){
                        resolve(result);
                    },function(err){
                        reject(err);
                    });
                } else {
                    $dazzleS3.getFile(userInfo.exportBucket,userInfo.userKey+file).then(function(result){
                        resolve(result);
                    },function(err){
                        reject(err);
                    });
                }

            });
        }
        dzS3.getWebsite = function (file) {
            var ext = file.substr(file.lastIndexOf('.') + 1);

            return new Promise(function (resolve, reject) {
                if (ext==='json'){
                    $dazzleS3.getJson(userInfo.exportBucket,userInfo.websiteKey+file).then(function(result){
                        resolve(result);
                    },function(err){
                        reject(err);
                    });
                }else {
                    $dazzleS3.getFile(userInfo.exportBucket,userInfo.websiteKey+file).then(function(result){
                        resolve(result);
                    },function(err){
                        reject(err);
                    });
                }

            });
        }

        dzS3.saveUser = function(file,content){
            var ext = file.substr(file.lastIndexOf('.') + 1);

            return new Promise(function (resolve, reject) {
                if (ext=='json'){
                    console.log('Save User',userInfo.exportBucket, userInfo.userKey + file);
                    $dazzleS3.saveJson(userInfo.exportBucket, userInfo.userKey + file,content).then(function (result) {
                        resolve(result);
                    }, function (err) {
                        reject(err);
                    });
                } else {
                    $dazzleS3.saveFile(userInfo.exportBucket, userInfo.userKey + file,content).then(function (result) {
                        resolve(result);
                    }, function (err) {
                        reject(err);
                    });
                }

            });
        }
        dzS3.saveData = function(file,content){
            var ext = file.substr(file.lastIndexOf('.') + 1);

            return new Promise(function (resolve, reject) {
                if (ext=='json'){
                    $dazzleS3.saveJson(userInfo.exportBucket, userInfo.dataKey + file,content).then(function (result) {
                        resolve(result);
                    }, function (err) {
                        reject(err);
                    });
                } else {
                    $dazzleS3.saveFile(userInfo.exportBucket, userInfo.dataKey + file,content).then(function (result) {
                        resolve(result);
                    }, function (err) {
                        reject(err);
                    });
                }

            });
        }
        dzS3.saveMaster = function(file,content){
            var ext = file.substr(file.lastIndexOf('.') + 1);

            return new Promise(function (resolve, reject) {
                if (ext=='json') {
                    $dazzleS3.saveJson(userInfo.exportBucket, userInfo.masterKey + file,content).then(function (result) {
                        resolve(result);
                    }, function (err) {
                        reject(err);
                    });
                } else {
                    $dazzleS3.saveFile(userInfo.exportBucket, userInfo.masterKey + file,content).then(function (result) {
                        resolve(result);
                    }, function (err) {
                        reject(err);
                    });
                }

            });
        }
        dzS3.saveThisPage = function(page,file,content){
            var key = 'admin/'+userInfo.uid+'/page/'+page+'/'+file;
            var ext = file.substr(file.lastIndexOf('.') + 1);
            return new Promise(function (resolve, reject) {

                if (ext=='json') {
                    $dazzleS3.saveJson(userInfo.exportBucket, key,content).then(function (result) {
                        resolve(result);
                    }, function (err) {
                        reject(err);
                    });
                } else {
                    $dazzleS3.saveFile(userInfo.exportBucket, key,content).then(function (result) {
                        resolve(result);
                    }, function (err) {
                        reject(err);
                    });
                }
            });
        }
        dzS3.savePage = function(file,content){
            var ext = file.substr(file.lastIndexOf('.') + 1);
            console.log('page Key',userInfo.exportBucket, userInfo.pageKey + file);
            return new Promise(function (resolve, reject) {
                if (ext=='json') {
                    $dazzleS3.saveJson(userInfo.exportBucket, userInfo.pageKey + file,content).then(function (result) {
                        resolve(result);
                    }, function (err) {
                        reject(err);
                    });
                } else {
                    $dazzleS3.saveFile(userInfo.exportBucket, userInfo.pageKey + file,content).then(function (result) {
                        resolve(result);
                    }, function (err) {
                        console.log('Save Page',err);
                        reject(err);
                    });
                }

            });
        }
        dzS3.saveWebsite = function(file,content){
            var ext = file.substr(file.lastIndexOf('.') + 1);

            return new Promise(function (resolve, reject) {
                if (ext==='json'){
                    $dazzleS3.saveJson(userInfo.exportBucket, userInfo.websiteKey + file,content).then(function (result) {
                        resolve(result);
                    }, function (err) {
                        reject(err);
                    });
                } else {
                    $dazzleS3.saveFile(userInfo.exportBucket, userInfo.websiteKey + file,content).then(function (result) {
                        resolve(result);
                    }, function (err) {
                        reject(err);
                    });
                }

            });
        }
        dzS3.loadMasterAtomById = function (id) {
            return new Promise(function (resolve, reject) {
                $dazzleS3.saveJson(userInfo.exportBucket, 'json/master/'+id+'-atom.json',content).then(function (result) {
                    resolve(result);
                }, function (err) {
                    reject(err);
                });

            });
        }
        dzS3.getAtomById = function (id) {
            return new Promise(function (resolve, reject) {
                $dazzleS3.getJson(userInfo.exportBucket, 'json/'+userInfo.thisPage+'/'+id+'-atom.json').then(function (result) {
                    if (!angular.isUndefined(result.master) && result.master)
                        $dazzleS3.getJson(userInfo.exportBucket, 'json/master/'+id+'-atom.json').then(function (result) {
                            resolve(result);
                        }, function (err) {
                            reject(err);
                        });
                    else
                        resolve(result);
                }, function (err) {
                    reject(err);
                });

            });
        }
        dzS3.saveAtomById = function (id,content) {
            return new Promise(function (resolve, reject) {
                console.log('Save Atom',id,content);
                if (!angular.isUndefined(content.master) && content.master){
                    $dazzleS3.saveJson(userInfo.exportBucket, 'json/master/'+id+'-atom.json',content).then(function (result) {
                        resolve(result);
                    }, function (err) {
                        reject(err);
                    });
                } else {
                    $dazzleS3.saveJson(userInfo.exportBucket, 'json/'+userInfo.thisPage+'/'+id+'-atom.json',content).then(function (result) {
                        resolve(result);
                    }, function (err) {
                        reject(err);
                    });
                }

            });
        }
        dzS3.getAtom = function () {
            return new Promise(function (resolve, reject) {
                $dazzleS3.getJson(userInfo.exportBucket, 'json/'+userInfo.thisPage+'/atom.json').then(function (result) {
                    resolve(result);
                }, function (err) {
                    reject(err);
                });
            });
        }
        dzS3.saveAtom = function (content) {
            console.log('Save Atom Content',content,userInfo);
            return new Promise(function (resolve, reject) {
                    $dazzleS3.saveJson(userInfo.exportBucket, 'json/'+userInfo.thisPage+'/atom.json',content).then(function (result) {
                        resolve(result);
                    }, function (err) {
                        reject(err);
                    });
            });
        }

        return dzS3;
    });
    $provide.factory('panelInfo',function($dazzleUser,$dazzleElastic,pageInfo){
        var panelInfo = {};

        panelInfo.panelType = {
            'image':{
                'active':false
            },
            'text':{
                'active':false
            },
            'html':{
                'active':false
            },
            'link':{
                'active':false
            },
            'data':{
                'active':false,
                'data':[]
            }
        };

        panelInfo.html = "";
        panelInfo.template = "";
        return panelInfo;
    });
    $provide.factory('dzPopup', function($dazzleUser,$dazzlePopup){
        var dzPopup = {};

        dzPopup.gallery = function(){
            return new Promise(function(resolve,reject) {
                var params = {
                    name: "dzUserGalleryPopup",
                    directive: "<dz-user-gallery-popup></dz-user-gallery-popup>"
                };

                $dazzlePopup.callPopup(params).then(function (output) {
                    resolve(output);
                });
            });
        }

        dzPopup.menu = function(params={}){


        }


        return dzPopup;

    });


    $provide.factory('websiteInfo', function($dazzleUser){
        var websiteInfo = {};

        websiteInfo.table = [];
        websiteInfo.schema = [];
        websiteInfo.expiryDate = null;
        websiteInfo.masterJs =['js/master.js'];
        websiteInfo.masterCss = ['css/master.css'];
        websiteInfo.master = {};
        return websiteInfo;

    });
    $provide.factory('atomInfo',function($dazzleS3,$dazzleElastic,$compile,userInfo,dbFactory) {
        var atomInfo ={};
        var thisPage = decodeURIComponent(location.pathname).substring(location.pathname.lastIndexOf('/') + 1) || 'index.html';

        atomInfo.atom = {};

        $.getJSON( "json/"+thisPage+"/atom.json", function( json ) {
            console.log('Atom Info',atomInfo);
            atomInfo.atom = json;
            console.log('My Atom Json',json);
            return atomInfo;
        });

        
      

		
        atomInfo.compileAtom = function(ele,scope){
			   
                var menu = [];
                console.log('Con Overlay',$dazzleUser.dazzleInfo['overlayEle']);
                // var ele = angular.element($event.target);
                var ele = $dazzleUser.dazzleInfo['overlayEle'];
                
                var tagName = ele[0].tagName;
                switch(tagName){
                    case 'A':
                        console.log('tag name',tagName);
                        break;
    
                    case 'IMG':
                        menu.push($scope.imgItems);
                        break;
                        
                    case 'H1':
                    case 'H2':
                    case 'H3':
                    case 'H4':
                    case 'H5':
                    case 'H6':
                    case 'P':
                    case 'SPAN':
                        menu.push($scope.richItems);
                        menu.push($scope.conItems);
                        return menu;
                        break;

                    
                }
			
		}

        atomInfo.initAtom = function(id) {
            if (!id)
                id = new Date().getTime();

            if (angular.isUndefined(atomInfo.atom[id]))
                atomInfo.atom[id] = {
                    'id':id,
                   'html':$('#'+id).html()
                };
            console.log('Init Atom',id,atomInfo.atom[id]);
            return atomInfo.atom[id];
//            atomInfo.atom[id] = json;
        }



        atomInfo.init = function() {

        }

        atomInfo.getMaster = function(id){
            return atomInfo.master[id];
        }

        atomInfo.checkIsData = function(id){
            if (angular.isUndefined(atomInfo.atom[id]))
                return false;

            if (!angular.isUndefined(atomInfo.atom[id].isData) && atomInfo.atom[id].isData)
                return true;
            else
                return false;
        }

        atomInfo.saveAtom = function (id,json=null){
            if (!json)
                atomInfo.atom[id] = json;
            console.log('Atom',atomInfo.atom[id]);
            if (angular.isUndefined(atomInfo.atom[id]))
                return false;

            if (!angular.isUndefined(atomInfo.atom[id].isData) && atomInfo.atom[id].isData){
                var table = $('#'+id).attr('data-table') || null;
                var dataId = $('#'+id).attr('data-id') || null;
                var field = $('#'+id).attr('data-field') || null;
                var data = atomInfo.atom[id]['data'] || null;
                console.log(table,dataId,field,data);
                if(table && dataId && field && data)
                    dbFactory.saveField(table,dataId,data);
            }
        }
        atomInfo.getAtom = function(id){
            return atomInfo.atom[id];
        }


        return atomInfo;
    });

    $provide.factory('pageInfo',function($dazzleUser,$dazzlePopup,$dazzleS3,$http,userInfo,dataInfo,atomInfo,dbFactory,dzS3,dzFn) {
        var pageInfo = {};

        pageInfo.allHtml = [];
        pageInfo.model ={};
        pageInfo.model.title = '標題';
        pageInfo.model.meta = '';
        pageInfo.model.pageJs = [];
        pageInfo.model.pageCss = [];
        pageInfo.model.masterJs = [];
        pageInfo.model.masterCss = [];
        pageInfo.model.head = '';
        pageInfo.model.body = '';
        pageInfo.model.fullHtml = '';
        pageInfo.model.directives = [];
        pageInfo.model.masterBlock = {};
        pageInfo.model.dataBlock ={};
        pageInfo.model.dataInfo ={};
        pageInfo.thisPage = decodeURIComponent(location.pathname).substring(location.pathname.lastIndexOf('/') + 1) || 'index.html';




        pageInfo.addID = function(ele){
            var html;
            var length='';
            var count;
            console.log('ADD ID',ele);

            var id = ele.attr('id'); 
           if(typeof ele.attr('id') === "undefined") {
                  var cls = ele.attr('class');
                  console.log('Class',cls);
                  var cls_arr = [];
                  if(typeof ele.attr('class') !== "undefined" && cls!='') {
                        cls_arr = cls.split(" ");                        

                        var str=cls_arr.join("_");
                            console.log('String',str);
//                            str = str.replace(/\./g,"_");
                            str = "_"+str;
                            console.log('ID',str);
                            if (angular.isUndefined(pageInfo.model.atom[str])) {
                                ele.attr('id',str);
                                pageInfo.model.atom[str] ={
                                    "id":str,
                                    "html":ele.html(),
                                    "tagName":ele[0].tagName,
                                    "class":cls,
                                    "attrs": $('#'+str).attr()
                                }                                    
                            } else {
                                 if (!angular.isUndefined(pageInfo.model.atom)){

                                      count=Object.keys(pageInfo.model.atom).length;
                                      length = count.toString();                     
                                 }
                                   
                                str = str+ length;
                                ele.attr('id',str);
                                pageInfo.model.atom[str] ={
                                    "id":str,
                                    "html":ele.html(),
                                    "tagName":ele[0].tagName,
                                    "class":cls,
                                    "attrs": $('#'+str).attr()
                                } 
                                
                            }

                          
                        
                  } else {
                      console.log(ele[0]);
                      var str = ele[0].tagName || 'DIV';
                      str = str.toLowerCase();
                      if (angular.isUndefined(pageInfo.model.atom[str])) {
                          ele.attr('id',str);
                      } else {
                         if (!angular.isUndefined(pageInfo.model.atom)){

                              count=Object.keys(pageInfo.model.atom).length;
                              length = count.toString();                     
                         }
                                   
                        str = str+ length;
                          ele.attr('id',str);
                      } 
                      pageInfo.model.atom[str] ={
                            "id":str,
                            "html":ele.html(),
                            "tagName":ele[0].tagName.toLowerCase(),
                            "class":cls,
                            "attrs": $('#'+str).attr()
                        } 
                  }
                        
              } else {
                ele.attr('id',id); 
                return id;   
              }

          
        }
        pageInfo.loadData = function(id){
            return new Promise(function(resolve,reject){
                dbFactory.loadDataByID(pageInfo.model.dataInfo[id]).then(function(data){
                    resolve(data);
                },function(){
                    resolve([]);
                });

            });
        }
        pageInfo.saveDataInfoById = function(id,json) {
            pageInfo.model.dataInfo[id] = json;
        }

        pageInfo.saveDataInfo = function(){
            return new Promise(function(resolve,reject){
                dzS3.saveWebsite('json/data-info.json',dataInfo.model.dataInfo).then(function(){
//                $dazzleS3.saveJson(userInfo.userBucket,userInfo.websiteKey+'/json/data-info.json',dataInfo.model.dataInfo).then(function(){
                    $dazzlePopup.toast('Success Save Data Info');
                    resolve();
                },function(err){
                    reject();
                });

            });
        }
        pageInfo.addNewPage = function(pageName,template=null) {

            if (confirm('匯出會覆蓋舊頁，有否問題？')){
                if (!template){
                    $dazzlePopup.toast('已複製此頁至新頁');
                    dzS3.copyFile(userInfo.exportBucket+'/'+pageInfo.thisPage,userInfo.exportBucket,pageName+'.html').then(function(){
                        if (confirm('新頁已開，是否跳至新頁？'))
                            location.href = pageName+'.html';
                    });
                }
                else {
                    $dazzlePopup.toast('已複製樣辦至新頁');
                    dzS3.copyFile(userInfo.exportBucket+'/'+template,userInfo.exportBucket,pageName+'.html').then(function(){
                        if (confirm('新頁已開，是否跳至新頁？'))
                            location.href = pageName+'.html';
                    });
                }
            }



        }


        pageInfo.loadDataInfo = function() {
            return new Promise(function(resolve,reject){
                $dazzleS3.getJson(userInfo.userBucket,userInfo.websiteKey+'/json/data-info.json').then(function(json){
                    pageInfo.model.dataInfo = json;
                    console.log('Success Load Data Info');
                    resolve();
                },function(err){
                    pageInfo.model.dataInfo ={};
                    reject();
                });
            });
        }

        pageInfo.getMaster = function(id) {
            return pageInfo.model.masterBlock[id];
        }

        pageInfo.mergeAtomWithMaster = function() {
            var master = pageInfo.masterBlock;
            var atom = atomInfo.atom;
            console.log('Pre Atom',atomInfo.atom);

            for (key in master){
                if (angular.isUndefined(atomInfo.atom[key]))
                    atomInfo.atom[key] = {
                        "id":key,
                        "html": master[key],
                        "master":true
                    };
                else {
                    atomInfo.atom[key].html = master[key];
                    atomInfo.atom[key].master = true;
                    $('#'+key).html(master[key]);
                    $('#'+key).attr('dz-master','');
                }
            }
            console.log('Post Atom',atomInfo.atom);
        }


        pageInfo.mountMasterAtom = function(){
            var atom = pageInfo.masterBlock;
            console.log('Mount Master Atom',atom);
            for (key in atom){
                $('#'+key).html(atom[key]);
            }
        }
        pageInfo.mountAtom = function (){
            var atom = atomInfo.atom;
            console.log('Mount Atom',atom);
            for (key in atom){
                $('#'+key).html(atom[key].html);
            }
            pageInfo.mountMasterAtom();
        }

        pageInfo.buildBody = function(){
            return new Promise(function(resolve,reject) {
                //Load Body
                console.log('Load Body');
                $('dz-container').html(pageInfo.body);
                pageInfo.mountAtom();
                $('dz-container').find( "*:not(:has(*))" ).attr('context-menu','conMenuOptions');
                $('dz-container').find('a').attr('context-menu','aOptions');
                $('dz-container').find('img').attr('context-menu','imgMenuOptions');
//                       $('dz-container').find('li').attr('context-menu','liOptions');
                //$compile(element.contents())(scope);
                var bodyScript = pageInfo.model.bodyScript || null;
                // $(bodyScript).insertAfter($('dz-container'));

            });
        }

        pageInfo.loadMaster = function() {
            var htm = pageInfo.htmEle;
            var id;
            return new Promise(function(resolve,reject) {
                dzS3.getJson(userInfo.exportBucket,'json/master.json',pageInfo.masterBlock).then(function(json){
                    console.log('Success Load Master',json);
                    $dazzleUser.dazzleInfo['masterBlock'] = json;
                    pageInfo.masterBlock = json;
                    resolve();
                },function(){
                    console.log('UnSuccessful Load Master');
                    pageInfo.masterBlock = {};
                    reject();
                });


                // dzS3.getMaster('master.json').then(function (json) {
                //     console.log('Success Load Master',json);
                //     $dazzleUser.dazzleInfo['masterBlock'] = json;
                //     pageInfo.masterBlock = json;
                //     resolve();
                // },function(err){
                //     console.log('UnSuccessful Load Master');
                //     pageInfo.masterBlock = {};
                //     resolve({});
                // });
            });

        }


        pageInfo.loadAtom = function(){
            return new Promise(function(resolve,reject) {

                dzS3.getAtom().then(function (json) {
                    atomInfo.atom = json;
                    resolve();
                },function(err){
                    atomInfo.atom = {};
                    resolve();
                });
            });
        }


        pageInfo.getAllHtml = function() {
            return new Promise(function(resolve,reject){
                dzS3.getAllHtml().then(function(result){
                    console.log('All Page',result);
                    userInfo.allHtml = result;
                    pageInfo.allHtml = result;
                    resolve();
                },function(err){
                    resolve();
                });
            },function(err){
                resolve([]);
            });
        }

        pageInfo.init = function(){
            var template;
            return new Promise(function (resolve, reject) {
                console.log('page info init',userInfo,userInfo.exportBucket,'json/user.json');

                // pageInfo.loadBody().then(function(){
                //     $dazzlePopup.toast('成功載入資料');
                //     resolve();
                // });

//                $dazzleS3.saveJson(userInfo.exportBucket,'json/user.json',userInfo.user);
	
                Promise.all([pageInfo.loadStructure(),pageInfo.loadBody(),pageInfo.loadMaster(),pageInfo.loadAtom(),pageInfo.getAllHtml()]).then(function(result) {
                    console.log('Page Info Init',atomInfo.atom);
                    console.log('All Page',userInfo.allHtml);

                    pageInfo.mergeAtomWithMaster();
                    console.log('Page Info Init',atomInfo.atom);
                    // Update display html
                    $dazzlePopup.toast('成功載入資料');
                    resolve();
                });

            });

        }
        pageInfo.addDataInfo = function(id,json){
            //	dataInfo[id]=json;
        }
        pageInfo.getDataInfo= function(id){
            //	return dataInfo[id];
        }

        pageInfo.putData = function(id,data) {
            //	dataInfo[id]['data'] = data;
        }
        pageInfo.getData = function(id) {
            //	return dataInfo[id]['data'];
        }
        pageInfo.loadData = function(id) {
            //angular.forEach(
            return new Promise(function(resolve,reject){

                var table = dataInfo[id].table;
                var schema = dataInfo[id].schema;
                var sort = dataInfo[id].sort || 'id';
                var order = dataInfo[id].order || 'desc';
                var count = dataInfo[id].count || 1000;
                var filter = dataInfo[id].filter || null;
                var start = dataInfo[id].start || 0;

                dbFactory.getData(table,sort,order,start,count,filter).then(function(data){
                    dataInfo[id]['data']=data;
                    resolve(data);
                });

            });
        }
        pageInfo.loadSchema =  function() {
            angular.forEach(pageInfo.model.tableInfo,function(item,index){

                $dazzleS3.getJson(userInfo.userBucket,userInfo.exportBucket+'/content/'+item.table+'-schema.json').then(function(json){
                    item.schema =json;
                },function(err){
                    item.schema = {};
                    // $dazzleS3.getJson(userInfo.userBucket,userInfo.exportBucket+'/content/'+item.table+'-schema.json').then(function(json){
                    //     item.schema = json;
                    // });
                });
            });
        }


        pageInfo.loadBody = function () {
            return new Promise(function (resolve, reject) {
                dzS3.getPage('body.content').then(function (html) {
                    pageInfo.body = html;
					pageInfo.model.body = html;
					
                    resolve(html);
                },function(err){
                    resolve('');
                });
            });

        }
        pageInfo.exportMaster = function() {

        }

        pageInfo.saveMaster = function() {
            console.log('Save Master',pageInfo.masterBlock);
            var id;


            // for (key in atomInfo.atom) {
            //     // if (atomInfo.atom[key])
            //     pageInfo.masterBlock[key] = $('#'+key).html();
            //
            //
            //     dzS3.saveMaster(key+'.master',pageInfo.masterBlock[key]);
            // }
//            pageInfo.masterBlock ={};
            $('[dz-master]').each(function(id){
                id = $(this).attr('id');
                if (angular.isUndefined(pageInfo.model.atom[id])){
                    pageInfo.model.atom[id] = {
                        'id': id,
                        "isMaster":true,
                        'html': $(this).html()
                    }
                } else
                    pageInfo.model.atom[id]['isMaster'] = true;
                pageInfo.masterBlock[id] = $('#'+id).html();
                $('#'+id).attr('dz-master','');
            });
            console.log('Save Model Master',pageInfo.model);

            console.log('Save Master',pageInfo.masterBlock);
			pageInfo.model.master = pageInfo.masterBlock;

            return new Promise(function(resolve,reject) {
                dzS3.saveJson(userInfo.exportBucket,'json/master.json',pageInfo.masterBlock).then(function(){
                   resolve();
                },function(){
                    console.log('Save Master Fail');
                    reject();
                });

                // dzS3.saveMaster('master.json',pageInfo.masterBlock).then(function () {
                //     dzS3.saveJson(userInfo.exportBucket,'admin/master.json',pageInfo.masterBlock).then(function(){
                //         console.log('Save Master Success',);
                //         resolve();
                //     },function(err){
                //         console.log('Save Master Error');
                //         resolve();
                //     });
                //
                // },function(err){
                //     console.log('Save Master Error');
                //     resolve();
                // });
            });
        }

        pageInfo.saveData = function() {

        }

        pageInfo.loadMasterTemplate = function(){
            return new Promise(function (resolve, reject) {
                dzS3.getMaster('master.html').then(function (html) {
                    $dazzleUser.dazzleInfo['masterHTML'] = html;
                    resolve();
                },function(){
                    resolve();
                });

            });
        }

        pageInfo.loadInfo = function() {
            return new Promise(function (resolve, reject) {
                dzS3.getPage('pageInfo.json').then(function(json){
//                    var json = JSON.parse(result);
                    //$dazzleS3.getJson('pageInfo.json').then(function(json){
                    console.log('Success Load Info',userInfo,json);
                    pageInfo.model = json.model;
                    pageInfo.model.body = pageInfo.body;
                    resolve();
                },function(err){
                    console.log('Load Info');
                    var html = store.get('html');
                    pageInfo.htmEle = cheerio.load(html);
                    const htm = cheerio.load(html);
                    pageInfo.model.title =htm('title').text();
                    pageInfo.model.meta =  htm('meta').text();
                    htm('head').find("script").each(function(index){
                        var attr = htm(this).attr();
                        attr.html = htm(this).html();
                        pageInfo.model.pageJs.push(attr);
                    });

                    htm('head').find("style").each(function(index){
                        var attr = htm(this).attr();
                        attr.html = htm(this).html();
                        pageInfo.model.pageCss.push(attr);
                    });

                    htm('head').find("link").each(function(index){
                        var attr = htm(this).attr();
                        pageInfo.model.pageCss.push(attr);
                    });

                    // htm('head').find('script').remove();
                    // htm('head').find('style').remove();
                    // htm('head').find('link').remove();

                    // Body Script
                    var text = '';

                  //  console.log('Body',htm('body').html());
                    pageInfo.model.bodySrc =[];
                    htm('body').find("script").each(function(index){
                       // if (htm(this).attr('src'))
                       //     $.getScript(htm(this).attr('src'));
                        text = text+htm.html(htm(this));
                        htm(this).remove();
                    });

                    htm('body').find("style").each(function(index){
                        text = text+htm.html(htm(this));
                        htm(this).remove();
                    });

                    htm('body').find("link").each(function(index){
                        text = text+htm.html(htm(this));
                        htm(this).remove();
                    });

                    pageInfo.model.bodyScript = text;
                    console.log('Body Script',text);
                    pageInfo.model.head = htm('head').html();
                    pageInfo.model.body = htm('body').html();
                    pageInfo.body = htm('body').html();
                    pageInfo.model.fullHtml = htm('html').html();

                    console.log(pageInfo);
                    console.log('載入失敗',err);
                    reject();
                });
            });

        }
        pageInfo.saveData = function() {

        }

        pageInfo.buildHtml = function(){
            console.log('Build Html',pageInfo.model);
            pageInfo.model.masterTitle = '';
            pageInfo.model.masterMeta = '';
            var html = store.get('html');
            const htm = cheerio.load(html, {decodeEntities: false});


            // Head Compile
            htm('title').html(pageInfo.model.title + " | " + pageInfo.model.masterTitle);
            htm('meta').html(pageInfo.model.meta +" , " + pageInfo.model.masterMeta);


            htm('head').find('script').remove();
            angular.forEach(pageInfo.model.pageJs,function(item,index){
                var ele = cheerio.load('<script></script>');
                for (key in item){
                    if (key !='html')
                        ele('script').attr(key,item[key]);
                    else
                        ele('script').html(key['html']);
                }
                var text = ele.html();
                console.log(text);
                htm('head').append(text);
            });

            htm('head').find('link').remove();
            angular.forEach(pageInfo.model.pageCss,function(item,index){
                var ele;
                if (!angular.isUndefined(item['html']))
                    ele = cheerio.load('<style></style>');
                else
                    ele =cheerio.load('<link>');
                for (key in item){
                    if (key !='html')
                        ele('link').attr(key,item[key]);
                    else
                        ele('style').html(key['html']);
                }
                var text = ele.html();
                console.log(text);
                htm('head').append(text);

            });
            pageInfo.model.head = htm('head').html();

            // Body Compile

            htm('body').html(pageInfo.model.body);
            htm('body').find('.cfp-hotkeys-container').remove();
            htm('dz-overlay').remove();
            // Need to update

            pageInfo.model.fullHtml = htm.html();
            console.log('Full Html',pageInfo.model.fullHtml);


        }
        pageInfo.savePageInDB = function(){
            return new Promise(function (resolve, reject) {

                var json = {
                    "action":"addData",
                    "index": "dazzle",
                    "type": "webpage",
                    "id": userInfo.exportBucket+"-"+pageInfo.thisPage,
                    "body":{
                        "bucket": location.hostname,
                        "用家": [
                            "dazzleadmin",userInfo.uid
                        ],
                        "id": userInfo.exportBucket+"-"+pageInfo.thisPage,
                        "pagePath": pageInfo.thisPage,
                        "updated": new Date().getTime()
                    }
                };

                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": json
                }).then(function (result) {
                    console.log(result);
                    if (result.data.code < 0) {
                        $dazzlePopup.toast('儲存資料失敗');
                        reject();
                    } else {
                        $dazzlePopup.toast('儲存資料成功');
                        resolve();
                    }
                });
            });
        }


        pageInfo.saveInfo = function() {
            var json={};
            pageInfo.model.body = $(document).find('dz-container').html();
       //     pageInfo.savePageInDB();
            return new Promise(function (resolve, reject) {
                dzS3.savePage('pageInfo.json',pageInfo).then(function(){
                    resolve();
                },function(err){
                    console.log('儲存失敗',err);
                    resolve();
                });
            });

        }
        pageInfo.saveUser = function() {
            var user = userInfo.user;
            console.log('Save User',user);
            return new Promise(function (resolve, reject) {
                dzS3.saveUser('user.json',user).then(function(){
                    resolve();
                },function(err){
                    console.log('儲存失敗',err);
                    resolve();
                });
            });
        }

        pageInfo.saveAtom = function() {
            console.log('Save Atom',atomInfo.atom);
            var atom = atomInfo.atom;
            return new Promise(function(resolve,reject){
                for (var key in atom){
                    console.log('Key',key);
                  atomInfo.atom[key]['html']=$('#'+key).html();
                  if (!angular.isUndefined(pageInfo.model.atom[key]))
    					pageInfo.model.atom[key]['html'] = $('#'+key).html();
                  else
                      pageInfo.model.atom[key] = {
                        "id":key,
                        "html":$('#'+key).html(),
                        "attrs":$('#'+key).attr(),
                        "tagName":$('#'+key).prop("tagName") || null
                      }
                }
                console.log('Save Atom Key',atomInfo.atom);

                dzS3.saveAtom(atomInfo.atom).then(function(){
                    for (key in atomInfo.atom){
                        dzS3.saveAtomById(key,atomInfo.atom[key]);
                    }
                   resolve();
                },function(err){
                    console.log('Save Atom Fail');
                    reject();
                });
            });
        }

        pageInfo.saveJson = function (){
        
            return new Promise(function(resolve,reject){
                resolve();
                // Promise.all([dzFn.updateDirective()]).then(function () {
                //     resolve();
                // },function(err) {
                //     console.log('Save JSON fail');
                //     resolve();
                // });
            });
        }
		pageInfo.loadStructure = function(){

			console.log('Load Info');
            return new Promise(function (resolve, reject) {
                
                
				// dzS3.getJson(userInfo.exportBucket,'json/'+pageInfo.thisPage+'/website.json').then(function(result){
				// 	pageInfo.model = result;
				// 	resolve();
				// },function(err){
						 var html;
						  var tagname;
						  var ele;
						  var json=[];
						  var myId,myClass;
						  var attrs;
						  var content;
						  wholeJson = {
							  "structure":{"head":{},"body":{}},
							  "title":"",
							  "meta":[],
							  "link":[],
							  "style":[],
							  "script":[],
							  "body-link":[],
							  "body-style":[],
							  "body-script":[],
							  "atom":{}
						  };
						var html = store.get('html');
					//	console.log('Dollar',html);
	//                    var _$ = angular.element($(html));
						var _$ = cheerio.load(html, {decodeEntities: false});

						_$('body').html(pageInfo.model.body);
						
						  _$('head').find('*').each(function(){
							  tagname = $(this).get(0).name;

								console.log('Tag Name',tagname);
								
								//ele = $(this).get(0);
							  var myId = getInfo($(this));
							  
							  _$(this).attr('id',myId);

							  
							  var content =  _$ ('#'+myId).html() || '';
							  wholeJson['atom'][myId]['content'] = content;
							  
								  switch(tagname){
									case 'title':
										wholeJson['title'] = content;
										break;
									case 'meta':
										wholeJson['meta'].push($(this).get(0).attribs || {});
										break;
									case 'link':
										wholeJson['link'].push(wholeJson['atom'][myId]);
										break;
									case 'script':
	//									json['content'] = content;
									  
										if (content.indexOf("google-analytics")>-1)
											wholeJson['atom'][myId]['remark'] = "Google Analytics";
										if (content.indexOf("facebook")>-1)
											wholeJson['atom'][myId]['remark'] = "Facebook";
											
										wholeJson['script'].push(wholeJson['atom'][myId]);
										break;
									case 'style':
										wholeJson['style'].push(wholeJson['atom'][myId]);
										break;
								} 
								
							  
							  
						  });
							console.log('Whole JSON',_$('head').html());
						  _$('body').find('*').each(function(){
								tagname = $(this).get(0).name;
							
								var myId = getInfo($(this));
								_$(this).attr('id',myId);

								console.log('Body',tagname,myId,$(this),_$('#'+myId).html());
		
								wholeJson['atom'][myId]['content'] = _$('#'+myId).html() || '';
								console.log('Body2',tagname,myId);
		
								  switch(tagname){
									case 'link':
										wholeJson['body-link'].push(wholeJson['atom'][myId]);
										break;
									case 'script':										
										wholeJson['body-script'].push(wholeJson['atom'][myId]);
										break;
									case 'style':
										wholeJson['body-style'].push(wholeJson['atom'][myId]);
										break;
								  } 
							
						  
						  
						  });
	//					  buildStructure(_$('head'),wholeJson['structure']['head']);
	//					  buildStructure(_$('body'),wholeJson['structure']['body']);
						console.log('Whole JSON 2',wholeJson);

						  wholeJson['structure']['head-attrs'] = _$('head').get(0).attribs;
						  wholeJson['structure']['body-attrs'] = _$('body').get(0).attribs;
							wholeJson['structure']['head'] = _$('head').html();
							wholeJson['structure']['body'] = _$('body').html();
		
						console.log('Whole JSON 3',wholeJson);
						pageInfo.model = wholeJson;
						resolve();
				// });
				
				// resolve();

			});
		}

		pageInfo.buildPage = function(page){
            return new Promise(function(resolve,reject){
                console.log('My Model',pageInfo.model);
//                pageInfo.model = angular.toJson(pageInfo.model);
//                console.log('My Model',pageInfo.model);
                pageInfo.model = JSON.parse(angular.toJson(pageInfo.model));

                // Basic skeleton
                var __$ = cheerio.load("<html></html>", {decodeEntities: false});
                __$('html').append('<head></head>');
                __$('html').append('<body></body>');
                for(k in pageInfo.model['structure']['head-attrs']){
                    __$('head').attr(k,pageInfo.model['structure']['head-attrs'][k]);
                }

                for(k in pageInfo.model['structure']['body-attrs']){
                    __$('body').attr(k,pageInfo.model['structure']['body-attrs'][k]);
                }


                // Title
                __$('head').append("<title>"+pageInfo.model.title+"</title>");
                // Meta

                angular.forEach(pageInfo.model.meta,function(item,index){
                    var id = item['id'];
                    __$('head').append('<meta id="'+id+'"></meta>');
                    for(k in item){
                        __$('#'+id).attr(k,item[k]);
                    }
                });
                // Link
                angular.forEach(pageInfo.model.link,function(item,index){
                    var id = item['id'];
                    __$('head').append('<link id="'+id+'" />');
                    for(k in item['attrs']){
                        __$('#'+id).attr(k,item['attrs'][k]);
                    }
                });
                //Script
                angular.forEach(pageInfo.model.script,function(item,index){
                    var id = item['id'];
                    var content = item['content'];
                    __$('head').append('<script id="'+id+'">'+content+'</script>');
                    for(k in item['attrs']){
                        __$('#'+id).attr(k,item['attrs'][k]);
                    }
                });
                //Style
                angular.forEach(pageInfo.model.style,function(item,index){
                    var id = item['id'];
                    var content = item['content'];
                    __$('head').append('<style id="'+id+'">'+content+'</style>');
                    for(k in item['attrs']){
                        __$('#'+id).attr(k,item['attrs'][k]);
                    }
                });

                // Body
                __$('body').html(pageInfo.model.body);
                var html = __$.html();
                console.log('Old HTML',html);
                var options ={
                  "indent_size": "1",
                  "indent_char": "\t",
                  "max_preserve_newlines": "-1",
                  "preserve_newlines": false,
                  "keep_array_indentation": false,
                  "break_chained_methods": false,
                  "indent_scripts": "normal",
                  "brace_style": "collapse",
                  "space_before_conditional": false,
                  "unescape_strings": false,
                  "jslint_happy": false,
                  "end_with_newline": false,
                  "wrap_line_length": "110",
                  "indent_inner_html": false,
                  "comma_first": false,
                  "e4x": false,
                  "indent_empty_lines": false
                }
                //html = beautify(html, options);
                console.log('New HTML',html);
                dzS3.saveFile(userInfo.exportBucket,page,html).then(function () {
                    console.log('成功生成');
                    resolve();
                },function(err){
                    console.log('儲存失敗',err);
                    resolve();
                });

            });
        }
		pageInfo.saveStructure = function(){
            return new Promise(function (resolve, reject) {
         
					dzS3.saveJson(userInfo.exportBucket,'json/'+pageInfo.thisPage+'/website.json',pageInfo.model).then(function () {
						console.log('成功儲存 website.json');
						resolve();
					},function(err){
					    
						console.log('Save Structure Fail',err);
						resolve();
					});

			});
		}

        pageInfo.save = function() {

            return new Promise(function (resolve, reject) {
                console.log('User Info',userInfo.user);
                Promise.all([pageInfo.saveMaster(),pageInfo.saveAtom(), pageInfo.saveBody(),pageInfo.saveStructure(),pageInfo.saveJson()]).then(function () {
                   // pageInfo.buildPage().then(function(){
                        $dazzlePopup.toast('成功儲存');
                        resolve();
                   // });
                },function(err) {
                    console.log('Error',err);
                    $dazzlePopup.toast('儲存失敗');
                    resolve();
                });
            });
        }
        pageInfo.saveBodyScript = function () {
                var bodyscript = pageInfo.model.bodyScript || ''; 
//		    console.log('Save Body',pageInfo.model.body);
            return new Promise(function (resolve, reject) {
                dzS3.savePage('bodyScript.content',bodyscript).then(function () {
                    resolve();
                },function(err){
                    console.log('Save Body Script Fail',err);
                    resolve();
                });
            });

        }
        pageInfo.saveBody = function () {
            //pageInfo.model.body = $(document).find('dz-container').html();
            var script='';
            $('.cfp-hotkeys-container').remove();
            $('dz-overlay').remove();
            //$('dz-atom-overlay').remove();
            $('body').find('*').removeClass('ng-scope');
            $('body').find('*').removeClass('dz-border');
            $('dazzle-toolbar').remove();
            $("dz-container").find('*').removeAttr("context-menu");
            $('body').find('script').each(function(){
                script = script + $(this)[0].outerHTML;
                //$('head').append(script);
                $(this).remove();
            });
 //           pageInfo.model.head = pageInfo.model.head + script;

            var body =  $(document).find('dz-container').html();
			pageInfo.model.body = body;
//		    console.log('Save Body',pageInfo.model.body);
            return new Promise(function (resolve, reject) {

                dzS3.savePage('body.content',body).then(function () {
                    resolve();
                },function(err){
                    console.log('Save Body Fail',err);
                    resolve();
                });
            });

        }


        pageInfo.export = function() {
            pageInfo.save().then(function(){
                // pageInfo.pageExport(pageInfo.thisPage).then(function(){
                //     $dazzlePopup.toast(pageInfo.thisPage + '成功匯出');
                // });
                pageInfo.buildPage(pageInfo.thisPage).then(function(){
                    $dazzlePopup.toast(pageInfo.thisPage + '成功匯出');
                });
            });

        }


        pageInfo.siteExport = function(page) {
            return new Promise(function (resolve, reject) {

                pageInfo.save().then(function() {
                    dzS3.getAllHtml().then(function(result){
                        // console.log('All HTML',result);
                        angular.forEach(result,function(item,index){
                            dzFn.pageExport(item);
                        });


                    });

                    //
                    // console.log($dazzleUser.dazzleInfo['masterHTML']);
                    //
                    // Promise.all([
                    //     dzS3.saveFile(userInfo.exportBucket, 'admin/master.html', $dazzleUser.dazzleInfo['masterHTML']),
                    //     dzS3.saveJson(userInfo.exportBucket, 'admin/master.json', pageInfo.masterBlock)
                    // ]).then(function () {
                    //     dzFn.getMyPage(userInfo.exportBucket).then(function(result){
                    //        console.log('My Pages',result);
                    //     });
                    //
                    //     // var i, length, key;
                    //     // var msg;
                    //     //
                    //     // msg = {
                    //     //     "uid": userInfo.uid,
                    //     //     "action": "updateAllPage",
                    //     //     "bucket": userInfo.exportBucket
                    //     // };
                    //     // console.log(JSON.stringify(msg));
                    //     //
                    //     // dzFn.sendSystemMessage('createAdmin', msg).then(function (result) {
                    //     //     $dazzlePopup.toast(userInfo.exportBucket + '成功匯出');
                    //     //     resolve();
                    //     // }, function (err) {
                    //     //     reject();
                    //     // });
                    //
                    //
                    // });
                });

            });
        }
        // pageInfo.siteExport = function() {
        //     return new Promise(function (resolve, reject) {
        //         dbFactory.getAllPage().then(function (pages) {
        //             var length = pages.length;
        //             var i = 0;
        //             angular.forEach(pages, function (item, index) {
        //                 pageInfo.pageExport(item['pagePath']).then(function () {
        //                     console.log('Export: ', item['pagePath']);
        //                     i++;
        //                     if (i == length) {
        //
        //                         $dazzlePopup.toast(userInfo.exportBucket + '成功匯出');
        //                         resolve();
        //                     }
        //
        //                 });
        //             });
        //         });
        //     });
        // }

        pageInfo.pageExport = function(page) {
            return new Promise(function (resolve, reject) {



                dzFn.pageExport(page).then(function(){
                   resolve();
                },function(err){
                    reject();
                });
            });
        }

        return pageInfo;
    });

    $provide.factory('userInfo',function($dazzleUser){
        var userInfo = {};


                $.getJSON("json/user.json").done(function (json) {
                        console.log('User Info',json);
                        store.set('user',json);
                        var user = store.get('user') || null;
                        console.log('User Info',user);
                        $dazzleUser.setUser(user);
                        userInfo.user = user;
                        userInfo.admin = store.get('user');
                        userInfo.client = store.get('client-user');
                        userInfo.uid = user['uid'] || null;
                        userInfo.credit =0;
                        userInfo.expiryDate = null;
                        userInfo.role = 'user';
                        userInfo.userBucket = 'dazzle-user-'+user['uid'];
                        userInfo.exportBucket = user['exportBucket'] || location.hostname;
                        var thisPage = decodeURIComponent(location.pathname).substring(location.pathname.lastIndexOf('/') + 1) || 'index.html';
                        userInfo.thisPage = thisPage;
                        userInfo.pageKey = 'admin/'+userInfo.uid+'/page/'+thisPage+'/';
                        //userInfo.pageKey = userInfo.uid+'/page/'+thisPage+'/';

                        userInfo.masterKey = 'admin/'+userInfo.uid+'/page/_master/';
                        userInfo.dataKey = 'admin/'+userInfo.uid+'/content/';
                        userInfo.websiteKey = 'admin/'+userInfo.uid+'/';
                        userInfo.userKey = 'admin/'+userInfo.uid+'/';

                        return userInfo;                         
                }).fail(function () { 

                       var user = store.get('user');
                        console.log('Dazzle User',$dazzleUser);
                        console.log('User Info',user);
                        $dazzleUser.setUser(user);
                        userInfo.user = user;
                        userInfo.admin = store.get('user');
                        userInfo.client = store.get('client-user');
                        userInfo.uid = user['uid'] || null;
                        userInfo.credit =0;
                        userInfo.expiryDate = null;
                        userInfo.role = 'user';
                        userInfo.userBucket = 'dazzle-user-'+user['uid'];
                        userInfo.exportBucket = user['exportBucket'] || location.hostname;
                        var thisPage = decodeURIComponent(location.pathname).substring(location.pathname.lastIndexOf('/') + 1) || 'index.html';
                        userInfo.thisPage = thisPage;
                        userInfo.pageKey = 'admin/'+userInfo.uid+'/page/'+thisPage+'/';
                        //userInfo.pageKey = userInfo.uid+'/page/'+thisPage+'/';

                        userInfo.masterKey = 'admin/'+userInfo.uid+'/page/_master/';
                        userInfo.dataKey = 'admin/'+userInfo.uid+'/content/';
                        userInfo.websiteKey = 'admin/'+userInfo.uid+'/';
                        userInfo.userKey = 'admin/'+userInfo.uid+'/';

                        return userInfo;                       
                
                });

//         $.getJSON( "json/user.json", function( json ) {
//             console.log('User Info',json);
//             store.set('user',json);
//             var user = store.get('user') || null;
//             console.log('User Info',user);
//             $dazzleUser.setUser(user);
//             userInfo.user = user;
//             userInfo.admin = store.get('user');
//             userInfo.client = store.get('client-user');
//             userInfo.uid = user['uid'] || null;
//             userInfo.credit =0;
//             userInfo.expiryDate = null;
//             userInfo.role = 'user';
//             userInfo.userBucket = 'dazzle-user-'+user['uid'];
//             userInfo.exportBucket = user['exportBucket'] || location.hostname;
//             var thisPage = decodeURIComponent(location.pathname).substring(location.pathname.lastIndexOf('/') + 1) || 'index.html';
//             userInfo.thisPage = thisPage;
//             userInfo.pageKey = 'admin/'+userInfo.uid+'/page/'+thisPage+'/';
//             //userInfo.pageKey = userInfo.uid+'/page/'+thisPage+'/';

//             userInfo.masterKey = 'admin/'+userInfo.uid+'/page/_master/';
//             userInfo.dataKey = 'admin/'+userInfo.uid+'/content/';
//             userInfo.websiteKey = 'admin/'+userInfo.uid+'/';
//             userInfo.userKey = 'admin/'+userInfo.uid+'/';

//             return userInfo;
//         }).fail(function() {
//             var user = store.get('user');
//             console.log('Dazzle User',$dazzleUser);
//             console.log('User Info',user);
//             $dazzleUser.setUser(user);
//             userInfo.user = user;
//             userInfo.admin = store.get('user');
//             userInfo.client = store.get('client-user');
//             userInfo.uid = user['uid'] || null;
//             userInfo.credit =0;
//             userInfo.expiryDate = null;
//             userInfo.role = 'user';
//             userInfo.userBucket = 'dazzle-user-'+user['uid'];
//             userInfo.exportBucket = user['exportBucket'] || location.hostname;
//             var thisPage = decodeURIComponent(location.pathname).substring(location.pathname.lastIndexOf('/') + 1) || 'index.html';
//             userInfo.thisPage = thisPage;
//             userInfo.pageKey = 'admin/'+userInfo.uid+'/page/'+thisPage+'/';
//             //userInfo.pageKey = userInfo.uid+'/page/'+thisPage+'/';

//             userInfo.masterKey = 'admin/'+userInfo.uid+'/page/_master/';
//             userInfo.dataKey = 'admin/'+userInfo.uid+'/content/';
//             userInfo.websiteKey = 'admin/'+userInfo.uid+'/';
//             userInfo.userKey = 'admin/'+userInfo.uid+'/';

//             return userInfo;
// //            console.log( "Cannot find User",user );
//         });

        return userInfo;
    });
    $provide.factory('dataInfo',function(dbFactory){
        var dataInfo ={};

        dataInfo.data = {};
        return dataInfo;
    });

    $provide.factory('dbElastic',function($dazzleUser,$dazzleElastic,$ocLazyLoad,$http,$window,$compile,$mdDialog,$mdToast,$mdBottomSheet, $mdDateLocale,
                                          $dazzleS3,$dazzlePopup,$dazzleInit,moment,userInfo,dzS3){
       var dbElastic = {};


        dbElastic.$http = $http;
        dbElastic.$window = $window;
        dbElastic.$compile = $compile;
        dbElastic.$mdDialog = $mdDialog;
        dbElastic.$mdToast = $mdToast;
        dbElastic.$mdBottomSheet = $mdBottomSheet;
        dbElastic.$ocLazyLoad = $ocLazyLoad;
        dbElastic.$mdDateLocale = $mdDateLocale;
        dbElastic.$dazzleS3 = $dazzleS3;
        dbElastic.$dazzlePopup = $dazzlePopup;
        dbElastic.$dazzleUser = $dazzleUser;
        dbElastic.$dazzleInit = $dazzleInit;
        dbElastic.moment = moment;
        dbElastic.alasql = alasql;
        dbElastic.table = $dazzleUser.dazzleInfo['thisTable'];
        dbElastic.tableJson={};
	dbElastic.columnDefs = [];
	dbElastic.rowData = [];

        var website = $dazzleUser.dazzleInfo['website'];
        var dataKey='';

        dbElastic.user = $dazzleUser.getUser();

        console.log(dbElastic.user);

        var columnDefs = [];

        var rowData = [];
        var user = store.get('user');


        dbElastic.checkUserIndexExists= function(index,type) {

            return new Promise(function (resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://d8u48dml7g5f6.cloudfront.net",
                    "data": {
                        "action": "checkIndex",
                        "index": index+"."+ type
                    }
                }).then(function (result) {

                    console.log('dzUser',result);
                    if (result.data.resolve < 0) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                });

            });
        }

        dbElastic.createUserIndex =function(index,type) {
            return new Promise(function (resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": {
                        "action": "createIndex",
                        "index":index+"."+user
                    }
                }).then(function (result) {
                    console.log('dzUser',result);
                    if (result.data.resolve < 0) {
                        reject();
                    } else {
                        resolve();
                    }
                });

            });

        }
        dbElastic.initSettings = function(websiteId,tableName){
            return new Promise(function (resolve, reject) {
                dbElastic.loadTable(websiteId,tableName).then(function (table) {
                    console.log('Load Table',table);
                    dbElastic.tableName = tableName;
                    dbElastic.tableJson = table;
                    $dazzleUser.dazzleInfo['tableJson']=table;
                    if (angular.isArray(dbElastic.tableJson.buttons)) {
                        for (var i = 0; i < dbElastic.tableJson.buttons.length; i++) {
                            dbElastic.loadButton(dbElastic.tableJson.buttons[i]);
                        }
                    }

                    dbElastic.loadSchema(websiteId,tableName).then(function (json) {
                        dbElastic.schemaJson = json;
                        $dazzleUser.dazzleInfo['schemaJson']=json;
                        console.log('Schema Json', dbElastic.schemaJson);
                        resolve();
                    });
                });
            });
        }

        dbElastic.dzGetTable = function(){
            return new Promise(function (resolve, reject) {
                $dazzleS3.getJson(user['exportBucket'],'admin/'+user['uid']+'/content/table.json').then(function(json){
                    resolve(json);
                });
            });
        }


        dbElastic.dzInitGrid = function(tableName) {
                    return new Promise(function (resolve, reject) {
                        var websiteId = location.hostname;
                        dbElastic.gridOptions = {
                            rowSelection: 'multiple',
                            rowHeight: 45,
                            animateRows: true,
                            floatingFilter: true,
                            angularCompileRows: true,
                            angularCompileFilters: true,
                            angularCompileHeaders: true,
                            enableColResize: true,
                            enableFilter: true,
                            enableSorting: true,
                            rowMultiSelectWithClick: true,
                            isExternalFilterPresent: function () {
                                return true;
                            },
                            doesExternalFilterPass: function (node) {
                                if (node.deleted) {
                                    return false;
                                } else {
                                    return true;
                                }
                            },
                            defaultColDef: {
                                headerCheckboxSelection: dbElastic.isFirstColumn,
                                checkboxSelection: dbElastic.isFirstColumn,
                                editable: true,
                                cellEditor: "text",
                                filter: 'text'
                            },
                            onSelectionChanged: function () {

                                var selectedRows = dbElastic.gridOptions.api.getSelectedRows();
                                $dazzleUser.dazzleInfo['selectedRows'] = selectedRows;
                                console.log(selectedRows);

                            },
                            columnDefs: columnDefs,
                            rowData: rowData,
                            onGridReady: function () {
                                console.log('Load Grid Ready');
                                dbElastic.dzLoadTable(websiteId, tableName).then(function (table) {
                                    console.log('Load Table', table);
                                    dbElastic.tableName = tableName;
                                    dbElastic.tableJson = table;
                                    $dazzleUser.dazzleInfo['tableJson'] = table;
                                    if (angular.isArray(dbElastic.tableJson.buttons)) {
                                        for (var i = 0; i < dbElastic.tableJson.buttons.length; i++) {
                                            dbElastic.loadButton(dbElastic.tableJson.buttons[i]);
                                        }
                                    }
                                    dbElastic.dzLoadSchema(websiteId, tableName).then(function (json) {
                                        dbElastic.schemaJson = json;
                                        console.log('Schema Json', dbElastic.schemaJson);
                                        // dbElastic.loadNewCell(json).then(function(){

                                        // })
                                        dbElastic.loadCell(json).then(function () {
                                            dbElastic.gridOptions.api.setColumnDefs(json);
                                            dbElastic.gridOptions.api.refreshView();
                                            dbElastic.dzLoadData().then(function (json) {
                                                dbElastic.gridOptions.api.setRowData(json);
                                                dbElastic.gridOptions.api.refreshView();
                                                console.log('Table:', dbElastic.tableJson);
                                                console.log('Schema:', dbElastic.schemaJson);
                                                console.log('Data:', json);
                                                dbElastic.refresh();
                                                $dazzleUser.dazzleInfo['myGrid'] = dbElastic.gridOptions;
                                                resolve();
                                            });
                                        });
                                    });
                                });
        //                          setTimeout(function () {
        //                              dbElastic.gridOptions.api.resetRowHeights();
        //                          }, 500);
                            },
                            onCellEditingStarted: function (event) {
                                event.$dbElastic.oldValue = event.value;
                            },
                            onCellEditingStopped: function (event) {
                                if (!angular.isUndefined(event.colDef.key) && event.colDef.key) {
                                    dbElastic.gridOptions.api.forEachNode(function (rowNode, index) {
                                        if (rowNode.data[event.colDef.field] == event.value && rowNode.rowIndex !== event.rowIndex) {
                                            event.$dbElastic.rowNode.setDataValue(event.colDef.field, event.$dbElastic.oldValue);
                                            $dazzlePopup.toast('ERROR: Key already exists');
                                            return;
                                        }
                                    });
                                }
                                if (!angular.isUndefined(event.colDef.required) && event.colDef.required) {
                                    if (!event.value) {
                                        event.$dbElastic.rowNode.setDataValue(event.colDef.field, event.$dbElastic.oldValue);
                                        $dazzlePopup.toast('ERROR: This is required');
                                    }
                                }
                            },
                            onCellFocused: function (event) {
                                if (event.rowIndex !== null) {
                                    dbElastic.gridOptions.api.getModel().rowsToDisplay[event.rowIndex].edited = true;
                                }
                            }
                        };
                    });
                }

        dbElastic.initGrid = function(websiteId,tableName) {
            dbElastic.gridOptions = {
                owSelection: 'multiple',
                rowHeight: 45,
                animateRows: true,
                floatingFilter: true,
                angularCompileRows: true,
                angularCompileFilters: true,
                angularCompileHeaders: true,
                enableColResize: true,
                enableFilter: true,
                enableSorting: true,
                rowSelection: 'multiple',
                rowMultiSelectWithClick: true,
                isExternalFilterPresent: function () {
                    return true;
                },
                doesExternalFilterPass: function (node) {
                    if (node.deleted) {
                        return false;
                    } else {
                        return true;
                    }
                },
                defaultColDef: {
                    headerCheckboxSelection: dbElastic.isFirstColumn,
                    checkboxSelection: dbElastic.isFirstColumn,
                    editable: true,
                    cellEditor: "text",
                    filter: 'text'
                },
                onSelectionChanged: function() {

                    var selectedRows = dbElastic.gridOptions.api.getSelectedRows();
                    $dazzleUser.dazzleInfo['selectedRows'] = selectedRows;
                    console.log(selectedRows);

                },
                columnDefs: columnDefs,
                rowData: rowData,
                onGridReady: function () {
                    dbElastic.loadTable(websiteId,tableName).then(function (table) {
                        console.log('Load Table',table);
                        dbElastic.tableName = tableName;
                        dbElastic.tableJson = table;
                        $dazzleUser.dazzleInfo['tableJson']= table;
                        if (angular.isArray(dbElastic.tableJson.buttons)) {
                            for (var i = 0; i < dbElastic.tableJson.buttons.length; i++) {
                                dbElastic.loadButton(dbElastic.tableJson.buttons[i]);
                            }
                        }
                        dbElastic.loadSchema(websiteId,tableName).then(function (json) {
                            dbElastic.schemaJson = json;
                            console.log('Schema Json',dbElastic.schemaJson );
                            // dbElastic.loadNewCell(json).then(function(){

                            // })
                            dbElastic.loadCell(json).then(function () {
                                dbElastic.gridOptions.api.setColumnDefs(json);
                                dbElastic.gridOptions.api.refreshView();
                                dbElastic.loadData().then(function (json) {
                                    dbElastic.gridOptions.api.setRowData(json);
                                    dbElastic.gridOptions.api.refreshView();
                                    console.log('Table:', dbElastic.tableJson);
                                    console.log('Schema:', dbElastic.schemaJson);
                                    console.log('Data:', json);
                                    dbElastic.refresh();
                                    $dazzleUser.dazzleInfo['myGrid']  = dbElastic.gridOptions;
                                });
                            });
                        });
                    });
//                          setTimeout(function () {
//                              dbElastic.gridOptions.api.resetRowHeights();
//                          }, 500);
                },
                onCellEditingStarted: function (event) {
                    event.$dbElastic.oldValue = event.value;
                },
                onCellEditingStopped: function (event) {
                    if (!angular.isUndefined(event.colDef.key) && event.colDef.key) {
                        dbElastic.gridOptions.api.forEachNode(function (rowNode, index) {
                            if (rowNode.data[event.colDef.field] == event.value && rowNode.rowIndex !== event.rowIndex) {
                                event.$dbElastic.rowNode.setDataValue(event.colDef.field, event.$dbElastic.oldValue);
                                $dazzlePopup.toast('ERROR: Key already exists');
                                return;
                            }
                        });
                    }
                    if (!angular.isUndefined(event.colDef.required) && event.colDef.required) {
                        if (!event.value) {
                            event.$dbElastic.rowNode.setDataValue(event.colDef.field, event.$dbElastic.oldValue);
                            $dazzlePopup.toast('ERROR: This is required');
                        }
                    }
                },
                onCellFocused: function (event) {
                    if (event.rowIndex !== null) {
                        dbElastic.gridOptions.api.getModel().rowsToDisplay[event.rowIndex].edited = true;
                    }
                }
            };
        }




        dbElastic.getWebsiteJson = function () {
            $dazzleS3.getJson("dazzle-user-" + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + '/json/website.json').then(function (json) {
                dbElastic.websiteJson = json;
            });
        }

        dbElastic.dbManage = function (table) {
            //    $dazzlePopup.dataManagement(website.websiteId, table);
            document.location.href = "index.html#!/myDbManage/"+$dazzleUser.dazzleInfo['websiteId']+"/"+table;
        }

        dbElastic.listElastic = function (table) {
            //    $dazzlePopup.dataManagement(website.websiteId, table);
            document.location.href = "index.html#!/listElastic/"+table;
        }

        dbElastic.home = function (table) {
            //    $dazzlePopup.dataManagement(website.websiteId, table);
            document.location.href = "index.html#!/myWebsite";
        }



        dbElastic.loadButton = function (b) {
            var myScope;
            myScope= $dazzleUser.dazzleInfo['myScope'];
//                mydbElastic.= $dazzleUser.getRootdbElastic.);
            console.log('BUtton',b);
            $ocLazyLoad.load({files: b.js, cache: false}).then(function () {
                console.log('Button HTML',b.html);
                var button = angular.element(b.html);
                angular.element('#customButtons').append(button);
                $compile(button)(myScope);
            });
        }

        dbElastic.editSchema = function () {

            var params = {
                name: 'dzEditSchemaPopup',
                directive:'<dz-edit-Schema-popup></dz-edit-Schema-popup>',
                websiteId: $dazzleUser.dazzleInfo['websiteId'],
                table: $dazzleUser.dazzleInfo['table'],
                schema:[],
                big:true
            };

            $dazzlePopup.callPopup(params).then(function(newSchema){
                console.log(newSchema);
            });

        }

        dbElastic.addTable = function() {
            var params = {
                name: "createTablePopup",
                directive:"<create-table-popup></create-table-popup>",
                big:true
            };

            $dazzlePopup.callPopup(params).then(function(output) {

            });


        }

        dbElastic.removeTable = function () {
            var confirm = $mdDialog.confirm().title('刪除資料表').textContent('你真的要刪除此資料表嗎? (注意: 所有資料將會被刪除)').ariaLabel('Lucky day').ok('刪除').cancel('取消');
            $mdDialog.show(confirm).then(function () {
                $dazzleS3.removeFile($dazzleUser.dazzleInfo['userBucket'],$dazzleUser.dazzleInfo['websiteKey']+'content/'+$dazzleUser.dazzleInfo['thisTable']+'-table.json').then(function(){
                    $dazzleS3.removeFile($dazzleUser.dazzleInfo['userBucket'],$dazzleUser.dazzleInfo['websiteKey']+'content/'+$dazzleUser.dazzleInfo['thisTable']+'-schema.json').then(function(){
                        $dazzleS3.removeFile($dazzleUser.dazzleInfo['userBucket'],$dazzleUser.dazzleInfo['websiteKey']+'content/'+$dazzleUser.dazzleInfo['thisTable']+'-data.json').then(function(){
                            alert('已刪除資料表');
                            document.location.href = "index.html#!/myWebsite";
                        });
                    });
                });
            });
        }

        dbElastic.dzLoadTable = function (websiteId,tableName) {

            var item;
            var json,schema=[],schemaTemplate=[];
            var user = $dazzleUser.getUser();
            console.log('Load Table ',userInfo.exportBucket,'admin/'+user['uid']+'/content/'+tableName+'-table.json');
            return new Promise(function (resolve, reject) {
                $dazzleS3.getJson(userInfo.exportBucket,'admin/'+user['uid']+'/content/'+tableName+'-table.json').then(function(json){
                    console.log('Load Table DZ',json);
                    angular.forEach(json['button'],function(item,index){
                        dbElastic.newLoadButton(item);
                    });
                    resolve(json);
                },function(err){
                    resolve([]);
                });
            });

        }

        dbElastic.loadTable = function (websiteId,tableName) {
            var table,tableJson,char;
            return new Promise(function (resolve, reject) {

                if (websiteId =="_master") {

                    var defaulttable = {
                        "data": {
                            "type": "dynamodb",
                            "table":tableName,
                            "index":$dazzleUser.getUser().uid,
                            "key":"id"
                        },
                        "buttons": []
                    }
                    resolve(defaulttable);
                } else {

                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "getData",
                            "index": $dazzleUser.getUser().uid,
                            "type": "_table",
                            "id":tableName
                        }
                    }).then(function (result) {
                        console.log(result);
                        if (result.data.code < 0) {
                            $dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
                            resolve([]);
                        } else {
                            tableJson = {
                                "data": {
                                    "type": "dynamodb",
                                    "index":$dazzleUser.getUser().uid,
                                    "table":tableName,
                                    "key":result.data.resolve['key']
                                },
                                "buttons": []
                            }


                            console.log('Load Button',result);
                            angular.forEach(result.data.resolve['button'],function(item,index){
                                dbElastic.newLoadButton(item);



                            });

                            resolve(tableJson);
                        }
                    });
                }
            });
        }

        dbElastic.newLoadButton = function(item) {

            var str='';
            var js;
            // var mydbElastic.= $dazzleUser.dazzleInfo['mydbElastic.];
            var myScope= $rootScope.$new();
            for(i=0;i<item.length;i++) {
                char = item[i];
                if (char==char.toUpperCase()) {
                    str = str+"-"+char.toLowerCase();
                    console.log(i);
                } else
                    str = str+char;
            }
            console.log('Button',str);

            js = "https://d27btag9kamoke.cloudfront.net/builder6.0/"+item+"/element.js";

            $ocLazyLoad.load([js], {cache: false}).then(function () {
                console.log('Button JS',js);
                var button = angular.element("<"+str+"></"+str+">");
                angular.element('#customButtons').append(button);
                $compile(button)(myScope);
            });
        }

        dbElastic.initTable = function () {
            return new Promise(function (resolve, reject) {
                $dazzlePopup.toast('正在初始化s3 Table:' + tableName);
                var table = {
                    "data": {
                        "type": "s3"
                    },
                    "buttons": []
                }
                $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" +$dazzleUser.dazzleInfo['websiteId'] + "/content/" + tableName + "-table.json", table);
                resolve(table);
            });
        }

        dbElastic.checkDynamoTable = function (table) {
            return new Promise(function (resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/check",
                    "data": {
                        "action": "checkDynamoTable",
                        "table": table
                    }
                }).then(function (result) {
                    if (result.data.code == 14) {
                        resolve(result.data.data);
                    } else {
                        reject(result.data.text);
                    }
                })
            });
        }
        dbElastic.dzLoadSchema = function (websiteId,tableName) {
            var item;
            var json,schema=[],schemaTemplate=[];
            var user = $dazzleUser.getUser();
            console.log(user['exportBucket'],'admin/'+user['uid']+'/content/'+tableName+'-schema.json');

            return new Promise(function (resolve, reject) {
                $dazzleS3.getJson(user['exportBucket'],'admin/'+user['uid']+'/content/'+tableName+'-schema.json').then(function(json){
                    resolve(json);
                },function(err){
                    resolve([]);
                });
            });
        };

        dbElastic.loadSchema = function (websiteId,tableName) {
            var item;
            var json,schema=[],schemaTemplate=[];

            return new Promise(function (resolve, reject) {

                if (websiteId=="_master") {
                    var filename;
                    switch (tableName) {
                        case '_table': filename = '_table-schema.tpl.json'; break;
                        case '_schema': filename = '_schema-schema.tpl.json'; break;
                        case '_page': filename = '_page-schema.tpl.json'; break;
                        case '_atom': filename = '_atom-schema.tpl.json'; break;
                    }

                    $dazzleS3.getJson('dazzle-template','file6.0/'+filename).then(function (json) {
                        console.log('My Schema',json);
                        resolve(json);
                    }, function () {
                        resolve([]);
                    });
                }else {

                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "searchData",
                            "index": $dazzleUser.getUser().uid,
                            "type": "_schema",
                            "body":{
                                "query":{
                                    "bool":{
                                        must:[
                                            {"match":{"websiteId":websiteId}},
                                            {"match":{"tableId":tableName}}
                                        ]
                                    }
                                },
                                "sort":[
                                    {
                                        "order": {"order" : "asc"}
                                    }
                                ]
                            }
                        }
                    }).then(function (result) {
                        console.log('Schema',result);
                        if (result.data.code < 0) {
                            $dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
                            resolve([]);
                        } else {
                            json = result.data.resolve;
                            schema=[];
                            angular.forEach(json,function(item,index){
                                var key,cell;
                                if (item['order']=="0")
                                    key = true;
                                else
                                    key = false;

                                cell = {
                                    "editable": true,
                                    "cellEditor": item['directive']+"Editor",
                                    "cellRenderer": item['directive']+"Renderer",
                                    "filter": item['directive']+"Filter",
                                    "directive": item['directive'],
                                    "directiveName": item['directive'],
                                    "headerName": item['fieldName'],
                                    "field": item['fieldName'],
                                    "key": key,
                                    "default": "",
                                    "defaultByTimestamp": false,
                                    "width": 200
                                };
                                schema.push(cell);

                            });
                            resolve(schema);
                        }
                    });
                }
            });
        };

        dbElastic.dzLoadData = function () {


            return new Promise(function (resolve, reject) {
             
                    console.log('Load DynamoDB Data');
                    console.log('Load Data',$dazzleUser.getUser().uid,dbElastic.tableName,dbElastic.tableJson);
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "searchData",
                            "index": location.hostname,
                            "type": dbElastic.tableName,
                            "body": {"query": {"match_all": {}}}
                        }
                    }).then(function (result) {
                        console.log(result);
                        if (result.data.code < 0) {
                            $dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
                            resolve([]);
                        } else {
                            dbElastic.dataLength = result.data.resolve.length;
                            resolve(result.data.resolve);
                        }
                    });
            });
        }
        dbElastic.loadData = function () {
            return new Promise(function (resolve, reject) {
                console.log('Load DynamoDB Data');
                console.log('Load Data',$dazzleUser.getUser().uid,dbElastic.tableName,dbElastic.tableJson);
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": {
                        "action": "searchData",
                        "index": $dazzleUser.getUser().uid,
                        "type": dbElastic.tableName,
                        "body": {"query": {"match_all": {}}}
                    }
                }).then(function (result) {
                    console.log(result);
                    if (result.data.code < 0) {
                        $dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
                        resolve([]);
                    } else {
                        dbElastic.dataLength = result.data.resolve.length;
                        resolve(result.data.resolve);
                    }
                });

            });
        };

        dbElastic.loadNewCell = function(schema){
            return new Promise(function(resolve,reject){

            });
        }
        dbElastic.loadCell = function (schema) {
            return new Promise(function (resolve, reject) {
                for (var i = 0; i < schema.length; i++) {
                    if (schema[i].key)
                        dataKey = schema[i].field;

                    if (!angular.isUndefined(schema[i].jsId)) {
                        dbElastic.setCellJs(schema[i]);
                    }
                    if (!angular.isUndefined(schema[i].cellEditor)) {
                        dbElastic.setCellEditor(schema[i]);
                    }
                    if (!angular.isUndefined(schema[i].cellRenderer)) {
                        dbElastic.setCellRenderer(schema[i]);
                    }
                    if (!angular.isUndefined(schema[i].cellFilter)) {
                        dbElastic.setCellFilter(schema[i]);
                    }
                    if (!angular.isUndefined(schema[i].cellFilterer)) {
                        dbElastic.setCellFilterer(schema[i]);
                    }
                }
                setTimeout(function () {
                    resolve();
                }, 1000);
            });
        }

        dbElastic.setCellJs = function (schema) {
            $ocLazyLoad.load("https://d27btag9kamoke.cloudfront.net/backend6.0/" + schema.directive + "/js/" + schema.jsId + '.js', {cache: false});
        }

        dbElastic.setCellFilterer = function (schema) {
            $ocLazyLoad.load("https://d27btag9kamoke.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellFilterer + ".js", {cache: false}).then(function () {
                schema.filter = window[schema.cellFilterer];
            });
        }

        dbElastic.setCellFilter = function (schema) {
            $ocLazyLoad.load("https://d27btag9kamoke.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellFilter + ".js", {cache: false}).then(function () {
                schema.filterParams = window[schema.cellFilter];
            });
        }

        dbElastic.setCellEditor = function (schema) {
            $ocLazyLoad.load("https://d27btag9kamoke.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellEditor + ".js", {cache: false}).then(function () {
                dbElastic.gridOptions.api.cellEditorFactory.addCellEditor(schema.cellEditor, window[schema.cellEditor]);
            });
        }

        dbElastic.setCellRenderer = function (schema) {
            $ocLazyLoad.load("https://d27btag9kamoke.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellRenderer + ".js", {cache: false}).then(function () {
                dbElastic.gridOptions.api.cellRendererFactory.addCellRenderer(schema.cellRenderer, window[schema.cellRenderer]);
            });
        }


        dbElastic.referAdd = function (object) {
            console.log('Open Data Select');
            $dazzlePopup.dataSelect(dbElastic.website, dbElastic.table).then(function (data) {

            });

        }

        dbElastic.addFilter = function (filter) {
            this.filter = filter;
            this.gridOptions.api.onFilterChanged();
        }

        dbElastic.add = function (object) {
            if (dbElastic.modelType == "refer") {
                $dazzlePopup.dataSelect(dbElastic.website, dbElastic.table);
            } else {
                var date = new Date().getTime().toString();
                var newObject = {};
                if (object) {
                    newObject = object;
                }
                if (dbElastic.tableJson.data.type === 'dynamodb') {
                    newObject[dbElastic.tableJson.data.key] = date;
                }
                for (var i = 0; i < dbElastic.schemaJson.length; i++) {
                    if (dbElastic.schemaJson[i].defaultByTimestamp) {
                        newObject[dbElastic.schemaJson[i].field] = dbElastic.schemaJson[i].default + date;
                    } else if (dbElastic.schemaJson[i].default) {
                        newObject[dbElastic.schemaJson[i].field] = dbElastic.schemaJson[i].default;
                    }
                }
                dbElastic.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});
                dbElastic.dataLength++;
                dbElastic.gridOptions.api.refreshInMemoryRowModel();
                dbElastic.gridOptions.api.getModel().rowsToDisplay[0].edited = true;
            }
        }

        dbElastic.addRecord = function (object) {
            var date = new Date().getTime().toString();

            var newObject = {};
            if (object) {
                newObject = object;
            }

            for (var i = 0; i < dbElastic.schemaJson.length; i++) {
                if (dbElastic.schemaJson[i].defaultByTimestamp) {
                    newObject[dbElastic.schemaJson[i].field] = date;
                }
                // else if ($dbElastic.schemaJson[i].default) {
                //     newObject[$dbElastic.schemaJson[i].field] = $dbElastic.schemaJson[i].default;
                // }

            }
            dbElastic.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});
            dbElastic.dataLength++;
            dbElastic.gridOptions.api.refreshInMemoryRowModel();
            dbElastic.gridOptions.api.getModel().rowsToDisplay[0].edited = true;
        }

        dbElastic.remove = function () {
            var nodes = dbElastic.gridOptions.api.getSelectedNodes();
            for (var i = 0; i < nodes.length; i++) {
                nodes[i].deleted = true;
            }
            dbElastic.gridOptions.api.onFilterChanged();
        }

        dbElastic.refresh = function () {
            //                $dbElastic.loadSchema().then(function (json) {
            //                   $dbElastic.schemaJson = json;
            console.log('Start refresh',dbElastic.schemaJson);
            dbElastic.loadCell(dbElastic.schemaJson).then(function () {
                console.log('Load Cell',dbElastic.schemaJson);
                dbElastic.gridOptions.api.setColumnDefs(dbElastic.schemaJson);
                dbElastic.loadData().then(function (json) {
                    dbElastic.gridOptions.api.setRowData(json);
                    dbElastic.gridOptions.api.refreshView();
                    console.log('Finish Refresh');
                });
            });

            //               });
        }

        dbElastic.isFirstColumn = function (params) {
            var displayedColumns = params.columnApi.getAllDisplayedColumns();
            var scopeIsFirstColumn = displayedColumns[0] === params.column;
            return scopeIsFirstColumn;
        }

        dbElastic.cancel = function () {
            $mdDialog.hide(dbElastic.lastUpdated);
        }

        dbElastic.save = function () {
            return new Promise(function (resolve, reject) {
                dbElastic.saveSchema();
                dbElastic.getData().then(function (result) {
                    dbElastic.saveData(result).then(function () {
                        $dazzlePopup.toast('儲存成功');
                        resolve(result);
                    });
                });
            });
        }

        dbElastic.saveSchema = function () {
            var newShcema = [];
            var oldSchema = dbElastic.gridOptions.columnApi.getAllGridColumns();
            for (var i = 0; i < oldSchema.length; i++) {
                oldSchema[i].colDef.width = oldSchema[i].actualWidth;
                for (var obj in oldSchema[i].colDef) {
                    if (obj !== 'headerCheckboxSelection' && obj !== 'checkboxSelection' && Object.prototype.toString.call(oldSchema[i].colDef[obj]) == '[object Function]') {
                        delete oldSchema[i].colDef[obj];
                    }
                }
                newShcema.push(oldSchema[i].colDef);
            }
            $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + website + "/content/" + dbElastic.table + "-schema.json", JSON.parse(angular.toJson(newShcema)));
            dbElastic.schemaJson = newShcema;
        }

        dbElastic.saveData = function (data) {
            return new Promise(function (resolve, reject) {
                console.log("Data:",data);
                console.log("TableJson:",dbElastic.tableJson);
                // if (dbElastic.tableJson.data.type === 's3') {
                //     //console.log('save to s3');
                //     dbElastic.gridOptions.api.removeItems(data.deleted);
                //     $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + "/content/" + $dbElastic.table + "-data.json", JSON.parse(angular.toJson(data.rows))).then(function () {
                //         resolve();
                //     });
                // } else if (dbElastic.tableJson.data.type === 'dynamodb') {
                    var params = [];
                    for (var i = 0; i < data.deleted.length; i++) {
                        var dataObject = JSON.parse(angular.toJson(data.deleted[i].data));
                        params.push({
                            "delete": {
                                _index: dbElastic.tableJson.data.index+'.'+dbElastic.tableJson.data.table.toLowerCase() || 'dazzle',
                                _type: '_doc',
                                _id: dataObject[dbElastic.tableJson.data.key]
                            }
                        });
                    }
                    console.log("Params:",params);
                    if (!data.edited.length){
                        dbElastic.bulkUpdateData(params).then(function(){
                            resolve();
                        },function(err){
                            reject();
                        });
                    }
                    var count = 0;
                    for (var i = 0; i < data.edited.length; i++) {

                        console.log(dbElastic.tableJson);


                        var dataObject = JSON.parse(angular.toJson(data.edited[i].data));
                        dbElastic.clean(dataObject);

                        dbElastic.checkExist(dbElastic.tableJson.data,dataObject).then(function(result){
                            params.push({
                                "update": {
                                    _index: dbElastic.tableJson.data.index+'.'+dbElastic.tableJson.data.table.toLowerCase() || 'dazzle',
                                    _type: '_doc',
                                    _id: result[dbElastic.tableJson.data.key]
                                }
                            });
                            params.push({
                                "doc": result
                            });
                            count++;
                            if(count == data.edited.length){
                                dbElastic.bulkUpdateData(params).then(function(){
                                    resolve();
                                },function(err){
                                    reject();
                                });
                            }
                        },function(err){
                            params.push({
                                "create": {
                                    _index: dbElastic.tableJson.data.index+'.'+dbElastic.tableJson.data.table.toLowerCase() || 'dazzle',
                                    _type: '_doc',
                                    _id: err[dbElastic.tableJson.data.key]
                                }
                            });
                            params.push(err);
                            count++;
                            if(count == data.edited.length){

                                console.log('Edit',params);
                                dbElastic.bulkUpdateData(params).then(function(){
                                    resolve();
                                },function(err){
                                    reject();
                                });
                            }
                        });
                    }

                // }
            })
        }

        dbElastic.loadElasticRecordById = function(index,table,id) {
            return new Promise(function (resolve, reject) {
                console.log('Load Elastic Data',id,table,index);
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": {
                        "action": "getData",
                        "index": index,
                        "type": table,
                        "id":id
                    }
                }).then(function (result) {
                    console.log('Load Elastic Record',result);
                    if (result.data.code < 0) {
                        //$dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
                        reject();
                    } else {
                        resolve(result.data.resolve);
                    }
                });
            });
        }

        dbElastic.checkExist = function (tableJson,data) {
            return new Promise(function (resolve, reject) {
                dbElastic.loadElasticRecordById(tableJson.index,tableJson.table,data[tableJson.key]).then(function(record){
                    resolve(data);
                },function(err){
                    reject(data);
                });
            });
        }

        dbElastic.bulkUpdateData = function (params) {
            console.log('Params',params);
            return new Promise(function (resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": {
                        "action": "bulkData",
                        "body": params
                    }
                }).then(function (result) {
                    console.log(result);
                    dbElastic.created = [];
                    if (result.data.code > 0) {
                        resolve();
                    } else {
                        console.log('Error',result.data.text + ":" + result.data.err.code);
                        $dazzlePopup.toast(result.data.text + ":" + result.data.err.code);
                        reject();
                    }
                });
            });
        }

        dbElastic.getData = function () {
            return new Promise(function (resolve, reject) {
                var nodes = [];
                var rows = [];
                var edited = [];
                var deleted = [];
                dbElastic.gridOptions.api.forEachNode(function (node) {
                    nodes.push(node);
                    if (node.deleted == true) {
                        deleted.push(node);
                    } else {
                        if (node.edited == true) {
                            edited.push(node);
                        }
                        rows.push(node.data);
                    }
                });

                resolve({
                    "nodes": nodes,
                    "rows": rows,
                    "edited": edited,
                    "deleted": deleted
                });
            })
        }




        dbElastic.import = function () {
            if (!dbElastic.fileChooser) {
                dbElastic.fileChooser = document.createElement('input');
                dbElastic.fileChooser.setAttribute("type", "file");
                dbElastic.fileChooser.style.display = "none";
                dbElastic.fileChooser.addEventListener('change', function (event) {
                    var file = dbElastic.files[0];
                    alasql('SELECT * FROM FILE(?,{headers:true})', [event], function (data) {
                        dbElastic.gridOptions.api.setRowData(data);
                        dbElastic.gridOptions.api.refreshView();
                        dbElastic.gridOptions.api.forEachNode(function (node) {
                            node.edited = true;
                        });
                    });
                });
            }
            dbElastic.fileChooser.click();
        }


        dbElastic.export = function () {
            // var rowData = [];
            // dbElastic.gridOptions.api.forEachNode(function (node) {
            //     rowData.push(node.data);
            // });
            // dbElastic.alasql('SELECT * INTO XLSX("' + dbElastic.table + '.xlsx",{headers:true}) FROM ?', [rowData]);



            var params = {
                skipHeader: false,
                columnGroups: false,
                skipFooters: true,
                skipGroups: true,
                skipPinnedTop: true,
                skipPinnedBottom:true,
                allColumns: true,
                onlySelected: false,
                fileName: 'export.xls',
                sheetName: 'export'
            };


            dbElastic.gridOptions.api.exportDataAsExcel(params);

        }

        dbElastic.isObject = function (item) {
            return (typeof item === "object" && !Array.isArray(item) && item !== null);
        }

        dbElastic.clean = function (obj) {
            for (var propName in obj) {
                if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
                    delete obj[propName];
                }
            }
        }



       return dbElastic;

    });

    $provide.factory('dbFactory',function($dazzleUser,$dazzleElastic,$dazzlePopup,$ocLazyLoad,$http,userInfo,dzS3){

        var dbFactory = {};
        var json ={};
        var thisPage = decodeURIComponent(location.pathname).substring(location.pathname.lastIndexOf('/') + 1) || 'index.html';

        dbFactory.columnDefs =[];
        dbFactory.rowData =[];

        dbFactory.data = {};
        dbFactory.dataset = {};
        dbFactory.schema = {};

        // $.getJson('/content/table.json',function(json){
         //    dbFactory.tableList = json;
        // },function(err){
         //    dbFactory.tableList = [];
		// });
        //
        $.getJSON( "/json/"+thisPage+"/data.json", function( json ) {
            dbFactory.data = json;
        },function(){
            dbFactory.data = {};
        });


        dbFactory.initData = function(){

        }
        dbFactory.compileDataHtml = function(id,djson) {



        }
        dbFactory.refresh = function () {
            console.log('Start refresh',dbFactory.schemaJson);
            dbFactory.loadCell(dbFactory.schemaJson).then(function () {
                console.log('Load Cell',dbFactory.schemaJson);
                dbFactory.gridOptions.api.setColumnDefs(dbFactory.schemaJson);
                dbFactory.loadData().then(function (json) {
                    dbFactory.gridOptions.api.setRowData(json);
                    dbFactory.gridOptions.api.refreshView();
                    console.log('Finish Refresh');
                });
            });

            //               });
        }
// New One
        var columnDefs = [
            {headerName: "Make", field: "make"},
            {headerName: "Model", field: "model"},
            {headerName: "Price", field: "price"}
        ];

        var rowData = [
            {make: "Toyota", model: "Celica", price: 35000},
            {make: "Ford", model: "Mondeo", price: 32000},
            {make: "Porsche", model: "Boxter", price: 72000}
        ];
        dbFactory.gridOptions = {
            rowSelection: 'multiple',
            rowHeight: 45,
            animateRows: true,
            floatingFilter: true,
            angularCompileRows: true,
            angularCompileFilters: true,
            angularCompileHeaders: true,
            enableColResize: true,
            enableFilter: true,
            enableSorting: true,
            rowMultiSelectWithClick: true,
            isExternalFilterPresent: function () {
                return true;
            },
            doesExternalFilterPass: function (node) {
                if (node.deleted) {
                    return false;
                } else {
                    return true;
                }
            },
            defaultColDef: {
                headerCheckboxSelection: true,
                checkboxSelection: false,
                editable: true,
                cellEditor: "text",
                filter: 'text'
            },
            onSelectionChanged: function() {

                var selectedRows = dbFactory.gridOptions.api.getSelectedRows();
                $dazzleUser.dazzleInfo['selectedRows'] = selectedRows;
                console.log(selectedRows);

            },

            columnDefs:columnDefs,
            rowData: rowData,
            components: {

            },
            onCellEditingStarted: function (event) {
                event.$scope.oldValue = event.value;
            },
            onCellEditingStopped: function (event) {
                if (!angular.isUndefined(event.colDef.key) && event.colDef.key) {
                    dbFactory.gridOptions.api.forEachNode(function (rowNode, index) {
                        if (rowNode.data[event.colDef.field] == event.value && rowNode.rowIndex !== event.rowIndex) {
                            event.$scope.rowNode.setDataValue(event.colDef.field, event.$scope.oldValue);
                            $dazzlePopup.toast('ERROR: Key already exists');
                            return;
                        }
                    });
                }
                if (!angular.isUndefined(event.colDef.required) && event.colDef.required) {
                    if (!event.value) {
                        event.$scope.rowNode.setDataValue(event.colDef.field, event.$scope.oldValue);
                        $dazzlePopup.toast('ERROR: This is required');
                    }
                }
            },
            onCellFocused: function (event) {
                if (event.rowIndex !== null) {
                    dbFactory.gridOptions.api.getModel().rowsToDisplay[event.rowIndex].edited = true;
                }
            }
        };


        // Original One

        // dbFactory.gridOptions =  {
        //     rowSelection: 'multiple',
        //     rowHeight: 45,
        //     animateRows: true,
        //     floatingFilter: true,
        //     angularCompileRows: true,
        //     angularCompileFilters: true,
        //     angularCompileHeaders: true,
        //     enableColResize: true,
        //     enableFilter: true,
        //     enableSorting: true,
        //     rowSelection: 'multiple',
        //     rowMultiSelectWithClick: true,
        //     isExternalFilterPresent: function () {
        //         return true;
        //     },
        //     doesExternalFilterPass: function (node) {
        //         if (node.deleted) {
        //             return false;
        //         } else {
        //             return true;
        //         }
        //     },
        //     defaultColDef: {
        //         headerCheckboxSelection: true,
        //         checkboxSelection: true,
        //         editable: true,
        //         cellEditor: "text",
        //         filter: 'text'
        //     },
        //     onSelectionChanged: function() {
        //
        //         var selectedRows = that.gridOptions.api.getSelectedRows();
        //         $dazzleUser.dazzleInfo['selectedRows'] = selectedRows;
        //         console.log(selectedRows);
        //
        //     },
        //     columnDefs: dbFactory.columnDefs,
        //     rowData: dbFactory.rowData,
        //     onGridReady: function () {
        //
        //
        //             dbFactory.schemaJson = dbFactory.columnDefs;
        //             json = dbFactory.columnDefs;
        //             $dazzleElastic.loadCell(dbFactory.schemaJson).then(function(){
        //
        //                     dbFactory.gridOptions.api.setColumnDefs(json);
        //                     dbFactory.gridOptions.api.refreshView();
        //                         dbFactory.gridOptions.api.setRowData(dbFactory.rowData);
        //                         dbFactory.gridOptions.api.refreshView();
        //                         // console.log('Table:', that.tableJson);
        //                         console.log('Schema:', dbFactory.schemaJson);
        //                         console.log('Data:', dbFactory.rowData);
        //                         //  that.refresh();
        //                         $dazzleUser.dazzleInfo['myGrid']  = that.gridOptions;
        //
        //             });
        //         // that.loadTable(websiteId,tableName).then(function (table) {
        //         //     console.log('Load Table',table);
        //         //     that.tableName = tableName;
        //         //     that.tableJson = table;
        //         //     $dazzleUser.dazzleInfo['tableJson']= table;
        //         //     if (angular.isArray(that.tableJson.buttons)) {
        //         //         for (var i = 0; i < that.tableJson.buttons.length; i++) {
        //         //             that.loadButton(that.tableJson.buttons[i]);
        //         //         }
        //         //     }
        //         //     that.loadSchema(websiteId,tableName).then(function (json) {
        //         //         that.schemaJson = json;
        //         //         console.log('Schema Json',that.schemaJson );
        //         //         // that.loadNewCell(json).then(function(){
        //         //
        //         //         // })
        //         //         that.loadCell(json).then(function () {
        //         //             that.gridOptions.api.setColumnDefs(json);
        //         //             that.gridOptions.api.refreshView();
        //         //             that.loadData().then(function (json) {
        //         //                 that.gridOptions.api.setRowData(json);
        //         //                 that.gridOptions.api.refreshView();
        //         //                 console.log('Table:', that.tableJson);
        //         //                 console.log('Schema:', that.schemaJson);
        //         //                 console.log('Data:', json);
        //         //                 that.refresh();
        //         //                 $dazzleUser.dazzleInfo['myGrid']  = that.gridOptions;
        //         //             });
        //         //         });
        //         //     });
        //         // });
        //
        //
        //
        //     },
        //     onCellEditingStarted: function (event) {
        //         event.$scope.oldValue = event.value;
        //     },
        //     onCellEditingStopped: function (event) {
        //         if (!angular.isUndefined(event.colDef.key) && event.colDef.key) {
        //             dbFactory.gridOptions.api.forEachNode(function (rowNode, index) {
        //                 if (rowNode.data[event.colDef.field] == event.value && rowNode.rowIndex !== event.rowIndex) {
        //                     event.$scope.rowNode.setDataValue(event.colDef.field, event.$scope.oldValue);
        //                     $dazzlePopup.toast('ERROR: Key already exists');
        //                     return;
        //                 }
        //             });
        //         }
        //         if (!angular.isUndefined(event.colDef.required) && event.colDef.required) {
        //             if (!event.value) {
        //                 event.$scope.rowNode.setDataValue(event.colDef.field, event.$scope.oldValue);
        //                 $dazzlePopup.toast('ERROR: This is required');
        //             }
        //         }
        //     },
        //     onCellFocused: function (event) {
        //         if (event.rowIndex !== null) {
        //             dbFactory.gridOptions.api.getModel().rowsToDisplay[event.rowIndex].edited = true;
        //         }
        //     }
        // };


        dbFactory.loadCell = function(schema){
            console.log('Window',window);
            return new Promise(function(resolve,reject){
                for (var i=0;i<schema.length;i++) {
                    // if (schema[i].key)
                    //         dataKey.schema[i].field;
                    if(!angular.isUndefined(schema[i].cellEditor))
                        dbFactory.gridOptions.components[schema[i].cellEditor] = window[schema[i].cellEditor];
                    if(!angular.isUndefined(schema[i].cellRenderer))
                        dbFactory.gridOptions.components[schema[i].cellRenderer] = window[schema[i].cellRenderer];
                }
                console.log('Load Cell',dbFactory.gridOptions);
                resolve();

            });
        }

        // dbFactory.loadCell = function (schema) {
        //     return new Promise(function (resolve, reject) {
        //         for (var i = 0; i < schema.length; i++) {
        //             if (schema[i].key)
        //                 dataKey = schema[i].field;
        //
        //             if (!angular.isUndefined(schema[i].jsId)) {
        //                 dbFactory.setCellJs(schema[i]);
        //             }
        //             if (!angular.isUndefined(schema[i].cellEditor)) {
        //                 dbFactory.setCellEditor(schema[i]);
        //             }
        //             if (!angular.isUndefined(schema[i].cellRenderer)) {
        //                 dbFactory.setCellRenderer(schema[i]);
        //             }
        //             if (!angular.isUndefined(schema[i].cellFilter)) {
        //                 dbFactory.setCellFilter(schema[i]);
        //             }
        //             if (!angular.isUndefined(schema[i].cellFilterer)) {
        //                 dbFactory.setCellFilterer(schema[i]);
        //             }
        //         }
        //         setTimeout(function () {
        //             resolve();
        //         }, 1000);
        //     });
        // }

        dbFactory.setCellJs = function (schema) {
            $ocLazyLoad.load("//dazzle-template.s3.amazonaws.com/backend6.0/" + schema.directive + "/js/" + schema.jsId + '.js', {cache: false});
        }

        dbFactory.setCellFilterer = function (schema) {
            $ocLazyLoad.load("//dazzle-template.s3.amazonaws.com/backend6.0/" + schema.directive + "/" + schema.cellFilterer + ".js", {cache: false}).then(function () {
                schema.filter = window[schema.cellFilterer];
            });
        }

        dbFactory.setCellFilter = function (schema) {
            $ocLazyLoad.load("//dazzle-template.s3.amazonaws.com/backend6.0/" + schema.directive + "/" + schema.cellFilter + ".js", {cache: false}).then(function () {
                schema.filterParams = window[schema.cellFilter];
            });
        }

        dbFactory.setCellEditor = function (schema) {
            $ocLazyLoad.load("//dazzle-template.s3.amazonaws.com/backend6.0/" + schema.directive + "/" + schema.cellEditor + ".js", {cache: false}).then(function () {
//                dbFactory.gridOptions.api.cellEditorFactory.addCellEditor(schema.cellEditor, window[schema.cellEditor]);
            });
        }

        dbFactory.setCellRenderer = function (schema) {
            $ocLazyLoad.load("//dazzle-template.s3.amazonaws.com/backend6.0/" + schema.directive + "/" + schema.cellRenderer + ".js", {cache: false}).then(function () {
//                dbFactory.gridOptions.api.cellRendererFactory.addCellRenderer(schema.cellRenderer, window[schema.cellRenderer]);
            });
        }




        dbFactory.findDataParent = function(ele) {
            var linkEle,json;
            json ={};
            ele.parents()
                .map(function() {
                    console.log('DZ DATA',this.tagName);
                    if (this.tagName =='DZ-DATA') {
                        linkEle = angular.element(this);
                        json = {
                            'id': linkEle.attr('id'),
                            'table':linkEle.attr('data-table')
                        }

                    }

                });
            return json;
        };

        dbFactory.checkIndex = function(table){


        }

        dbFactory.createIndex = function(table){

        }

        dbFactory.getMapping = function(table){

        }

        dbFactory.reMapping = function(table){

        }


        dbFactory.saveSchema = function(table){

        }

        dbFactory.saveAtom = function(id,json) {

            return new Promise(function (resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": {
                        "action": "addData",
                        "index": userInfo.exportBucket,
                        "type": "_atom",
                        "id":id,
                        "body": json
                    }
                }).then(function (result) {
                    if (result.data.code < 0) {
                        reject();
                    } else {
                        resolve();
                    }
                });

            });
        }
        dbFactory.testCloudFront = function() {
            return new Promise(function (resolve, reject) {

                $http({
                    "method": "post",
                    "url": "d8u48dml7g5f6.cloudfront.net",
                    "data": {
                        "action": "searchData",
                        "index": "www.skmgps.org",
                        "type": "activites",
                        "body": {"query": {"match_all": {}}}
                    }
                }).then(function (result) {
                    console.log(result);
                    if (result.data.code < 0) {
                        $dazzlePopup.toast('載入資料失敗');
                        resolve([]);
                    } else {
                        $dazzlePopup.toast('載入成功');
                        resolve(result.data.resolve);
                    }
                });
            });


        }

        dbFactory.checkTableExist = function(table){


        }
        dbFactory.generateDataHtml = function(html){
            html = html.replace(new RegExp("[[", 'g'), "{{");
            html = html.replace(new RegExp("]]", 'g'), "}}");
            var dbEle = cheerio.load(html);
            var allEle = dbEle('*');
            var text;
            var tagname,field;
            var outHtml;
            allEle.each(function(item){
                tagname = this.tagName;
                field = this.data('field');
                if (!angular.isUndefined(field))
                    return true;

                text = "{{data['"+field+"']}}";
                switch(tagname){
                    case 'IMG':
                        this.attr('ng-src',text);
                        break;
                    case 'A':
                        this.attr('ng-href',text);
                        break;
                }
            });

            dbEle.attr('ng-repeat',"item in data");
            outHtml = dbEle.html();
            return outHtml;
        }
        dbFactory.getAllPage = function() {

            return new Promise(function (resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": {
                        "action": "searchData",
                        "index": "dazzle",
                        "type": "webpage",
                        "body": {
                            "query":{
                                "match":{
                                    "bucket": userInfo.exportBucket
                                }
                            }
                        }
                    }
                }).then(function (result) {
                    if (result.data.code < 0) {
                        resolve([]);
                    } else {
                        resolve(result.data.resolve);
                    }
                });

            });
        }

        dbFactory.saveField= function(table,id,data) {

            return new Promise(function (resolve, reject) {

                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": {
                        "action": "addData",
                        "index": location.hostname,
                        "type": table,
                        "id": id,
                        "body": data
                    }
                }).then(function (result) {
                    console.log('dz Data',result);
                    if (result.data.code < 0) {
                        resolve({});
                    } else {
                        resolve(result.data.resolve);
                    }
                });

            });

        }

        dbFactory.saveDataByID = function(table,id,body) {

            return new Promise(function (resolve, reject) {

                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": {
                        "action": "addData",
                        "index": location.hostname,
                        "type": table,
                        "id": id,
                        "body":body
                    }
                }).then(function (result) {
                    console.log('dz Data',result);
                    if (result.data.code < 0) {
                        resolve({});
                    } else {
                        resolve(result.data.resolve);
                    }
                });

            });

        }

        dbFactory.loadDataByID = function(table,id) {

               return new Promise(function (resolve, reject) {

                   $http({
                       "method": "post",
                       "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                       "data": {
                           "action": "getData",
                           "index": location.hostname,
                           "type": table,
                           "id": id
                       }
                   }).then(function (result) {
                       console.log('dz Data',result);
                       if (result.data.code < 0) {
                          resolve({});
                       } else {
                            resolve(result.data.resolve);
                       }
                   });

            });

        }

        dbFactory.saveUser = function(user){
            var action={
                "action": "updateData",
                "index": "dazzle",
                "type": "user",
                "id": user['uid'],
                "body": user
            }


            return new Promise(function (resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": action
                }).then(function (result) {
                    console.log('Load Data JSON',JSON.stringify(action),filter);
                    console.log('Load Data',result);
                    if (result.data.code < 0) {
                        resolve([]);
                    } else {
                        resolve(result.data.resolve);
                    }
                });
            });

        }

        dbFactory.loadUser = function(uid) {
            var action={
                "action": "searchData",
                "index": "dazzle",
                "type": "user",
                "body":{
                    "query":{
                        "match":{
                            "uid":uid
                        }
                    }
                }
            }


            return new Promise(function (resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": action
                }).then(function (result) {
                    console.log('Load Data JSON',JSON.stringify(action),filter);
                    console.log('Load Data',result);
                    if (result.data.code < 0) {
                        resolve([]);
                    } else {
                        resolve(result.data.resolve);
                    }
                });
            });


        }

        dbFactory.loadData = function(table,count=null, sort=null, order=null, filter=null) {
            console.log('Load Data JSON',table,count,sort,order,filter);
            var action={
                "action": "searchData",
                "index": location.hostname,
                "type": table,
                "body":{}
            }
            var json = {

            };
            // if (!sort){
            //     json['sort']={"id":"desc"}
            // }
            // if (count){
            //     json['from']=0;
            //     json['size']=count;
            // }
            if (!filter){
                json['query']={"match_all":{}};
            } else {
                json['query']=filter;
            }

            if (order=="random"){
                json['random_score']= {};
            }
            action['body'] = json;
            if (count) {
                action['from'] = 0;
                action['size'] = parseInt(count);
            }
            if (sort) {
                if (!order)
                    order = "desc";
               action['body']['sort']={};
               action['body']['sort'][sort] =order;
            }


            return new Promise(function (resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": action
                }).then(function (result) {
					console.log('Load Data JSON',JSON.stringify(action),filter);
					console.log('Load Data',result);
                    if (result.data.code < 0) {
                        resolve([]);
                    } else {
                        resolve(result.data.resolve);
                    }
                });
            });


        }

        dbFactory.removeData = function(table,id){
            return new Promise(function (resolve, reject) {
                var json = {
                    "action": "deleteData",
                    "index": userInfo.exportBucket,
                    "type":table,
                    "id": id
                };
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": json
                }).then(function (result) {
                    console.log(result);
                    if (result.data.code > 0) {
                        $dazzlePopup.toast('成功刪除');
                        resolve();
                    } else {
                        reject();
                    }
                });

            });

        }
        dbFactory.getDataByJson = function(table){
            return new Promise(function (resolve, reject) {
                dzS3.getData(table+'-data.json').then(function(json){
                    dbFactory.rowData=json;
                    resolve(json);
                },function(err){
                    resolve();
                });
            });
        }
        dbFactory.getSchema = function(table){
            return new Promise(function (resolve, reject) {
                dzS3.getData(table+'-schema.json').then(function(json){
                    dbFactory.loadCell(json).then(function(){
                        dbFactory.columnDefs=json;
                        resolve(json);
                    });
                },function(err){
                    resolve();
                });
            });
        }

        dbFactory.addTable = function(tableName){
            var tableJson= {
                    "data": {
                        "type": "dynamodb",
                        "table":"",
                        "index":"",
                        "key":""
                    },
                    "buttons": [],
                    "templatePage": "",
                    "pageKey":""
                };
            dbFactory.addIndex(tableName).then(function(){
                dbFactory.tableList.push({
                   "id":tableName,
                   "label":tableName
                });
                dzS3.saveJson(userInfo.exportBucket,"admin/"+userInfo.exportBucket+"/content/table.json",dbFactory.tableList);
                dzS3.saveJson(userInfo.exportBucket,"admin/"+userInfo.exportBucket+"/content/"+tableName+"-schema.json",[]);
                dzS3.saveJson(userInfo.exportBucket,"admin/"+userInfo.exportBucket+"/content/"+tableName+"-data.json",[]);
                dzS3.saveJson(userInfo.exportBucket,"content/table.json",dbFactory.tableList);
                dzS3.saveJson(userInfo.exportBucket,"content/"+tableName+"-schema.json",[]);
                dzS3.saveJson(userInfo.exportBucket,"content/"+tableName+"-data.json",[]);

                tableJson['data']['table'] = tableName;
                tableJson['data']['index'] = userInfo.exportBucket;
                tableJson['data']['key'] = "ID";
                tableJson['pageKey'] = 'title';
                dzS3.saveJson(userInfo.exportBucket,"admin/"+userInfo.exportBucket+"/content/"+tableName+"-table.json",tableJson);
                dzS3.saveJson(userInfo.exportBucket,"content/"+tableName+"-table.json",tableJson);
                
               alert("成功加入"); 
            });
        }
        dbFactory.addIndex = function(table){
            return new Promise(function (resolve, reject) {
                var json = {
                    "action": "createIndex",
                    "index": userInfo.exportBucket+"."+table
                };
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": json
                }).then(function (result) {
                    console.log(result);
                    if (result.data.code < 0) {
                        $dazzlePopup.toast('載入資料失敗');
                        resolve([]);
                    } else {
                        resolve(result.data.resolve);
                    }
                });

            });



        }

        dbFactory.editSchema = function (table) {
            return new Promise(function (resolve, reject) {

                dzS3.getJson(userInfo.exportBucket,'content/'+table+'-schema.json').then(function(json){
                    var params = {
                        name: 'dzEditDzschemaPopup',
                        directive: '<dz-edit-dzschema-popup></dz-edit-dzschema-popup>',
                        table: table,
                        schema: json,
                        big: true
                    };

                    $dazzlePopup.callPopup(params).then(function (newSchema) {
                        dzS3.saveJson(userInfo.exportBucket,'admin/'+userInfo.exportBucket+'/content/'+table+'-schema.json',newSchema);
                        dzS3.saveJson(userInfo.exportBucket,'content/'+table+'-schema.json',newSchema);
                        resolve(newSchema);
                    });
                });

            });
        }
        dbFactory.saveTableList = function(tables){
            return new Promise(function (resolve, reject) {
                dzS3.saveData('table.json',tables).then(function(json){
                    resolve(json);
                },function(err){
                    resolve();
                });
            });
        }
        dbFactory.getTableList = function(){
            return new Promise(function (resolve, reject) {
                dzS3.getData('table.json').then(function(json){
                    resolve(json);
                },function(err){
                    resolve();
                });
            });
        }
        dbFactory.getTable = function(table){
            return new Promise(function (resolve, reject) {
                dzS3.getData(table+'-table.json').then(function(json){
                        resolve(json);
                },function(err){
                    resolve();
                });
            });
        }
        dbFactory.getAllData = function(table){
            return new Promise(function (resolve, reject) {
                var json = {
                    "action": "searchData",
                    "index": location.hostname,
                    "type": table,
                    "body": {"query": {"match_all": {}}}
                };
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": json
                }).then(function (result) {
                    console.log(result);
                    if (result.data.code < 0) {
                        $dazzlePopup.toast('載入資料失敗');
                        resolve([]);
                    } else {
                        resolve(result.data.resolve);
                    }
                });



            });
        }


        dbFactory.getMyData = function(index,table,sort ='id',order = 'desc',start =0,count = 50,filter=null){

            if (!table){
                alert('沒有此資料表');
                return;
            }

            console.log('Search JSON',index,table,sort,order,start,count,filter);

            var json = {
                "action": "searchData",
                "index": index,
                "type": table,
                "body": {"query": {}}
            };
            if (start !=null && count){
                json['body']['from'] = start;
                json['body']['size'] = count;
            }
            if (sort && order) {
                var ele = {};
                ele[sort] ={"order": order};
                json['body']['sort'].push(ele);
            }
            if (filter) {
                json['body']['query']['match'] = filter;
            } else
                json['body']['query']={"match_all": {}};
            console.log('Search JSON',json);



            return new Promise(function (resolve, reject) {

                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": json
                }).then(function (result) {
                    console.log(result);
                    if (result.data.code < 0) {
                        $dazzlePopup.toast('載入資料失敗');
                        resolve([]);
                    } else {
                        resolve(result.data.resolve);
                    }
                });

            });

        }

        dbFactory.formatAtomByType = function(atom,value) {

            var id = atom['id'];
            var type = atom['type'];
            switch(type){

                case 'youtube':
                    var embed = `
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/JFuxtn6A3QA" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        `;
                    $('#'+id).html(embed);
                    break;

                case 'timestamp':
                    var time =   parseInt(value)|| new Date().getTime();
                    if (time < 1000000000000)
                        var a = new Date(time*1000);
                    else
                        var a = new Date(time);
                    str = a.toISOString();
                    var timeStr =moment(str,"YYYY-MM-DD").format("YYYY-MM-DD");
                    $('#'+id).text(timeStr);
                    break;

                case 'album-thumbnail':

                    $('#'+id).attr('src',"//"+value[0]['bucket']+".s3.amazonaws.com/"+value[0]['path']);

                    break;

                case 'file':
                case 'image':
                    console.log('Format Image',id,value,$('#'+id));
                    if (value)
                        $('#'+id).attr('src',value);
                    else
                        $('#'+id).attr('src','//dazzle.website.s3.amazonaws.com/image/noImage.png');
                    break;

                case 'html':
                    if (!value)
                        value="沒有資料";
                    $('#'+id).html(value);
                    break;

                case 'gallery':
                    var text='';
                    angular.forEach(value,function(item,index){
                        text +='<img src="'+item+'">';
                    });

                    $('#'+id).html(text);
                    break;

                case 'date':
                    var time,text;
                    if(!value)
                        value= new Date().getTime();

                    if (value< 9999999999)
                        time = value*1000;
                    else
                        time= value;
                    var text = new Date(time).toLocaleDateString();
                    $('#'+id).text(text);
                    break;

                case 'tags':
                    $('#'+id).html(`
                        <md-chips ng-model="data['`+value + `']" readonly="true" md-removable="false">
                        </md-chips>
                    `);
                    $('#'+id).attr('ng-model',value);

                    break;
                case 'dlink':
                    $('#'+id).attr('href',value);
                    break;

                case 'link':
                    console.log('Link',$('#'+id));
                    $('#'+id).attr('href',value+".html");
                    break;

                case 'currency':

                    $('#'+id).text("$"+value);
                    break;
                case 'text':
                default:
                    if (!value)
                        value="沒有資料";
                    $('#'+id).text(value);
                    break;

            }
        }
        dbFactory.formatByType = function(type,value,$element) {

            switch(type){

                case 'youtube':
                    var embed = `
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/JFuxtn6A3QA" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        `;
                    $element.html(embed);
                    break;

                case 'timestamp':
                    var time =   parseInt(value)|| 1262304000;
                    if (time < 1000000000000)
                        var a = new Date(time*1000);
                    else
                        var a = new Date(time);
                    str = a.toISOString();
                    var timeStr =moment(str,"YYYY-MM-DD").format("YYYY-MM-DD");
                    $element.text(timeStr);
                    break;

                case 'album-thumbnail':

                    $element.attr('src',"//"+value[0]['bucket']+".s3.amazonaws.com/"+value[0]['path']);

                    break;

                case 'file':
                case 'image':
                    console.log('Format Image',value,$element);
                    if (value)
                        $element.attr('src',value);
                    else
                        $element.attr('src','//dazzle.website.s3.amazonaws.com/image/noImage.png');
                    break;

                case 'html':
                    if (!value)
                        value="沒有資料";
                    $element.html(value);
                    break;

                case 'gallery':
                    var text='';
                    angular.forEach(value,function(item,index){
                        text +='<img src="'+item+'">';
                    });

                    $element.html(text);
                    break;

                case 'date':
                    var time,text;
                    if (value< 9999999999)
                        time = value*1000;
                    else
                        time= value;
                    var text = new Date(time).toLocaleDateString();
                    $element.text(text);
                    break;

                case 'tags':
                    $element.html(`
                        <md-chips ng-model="data['`+value + `']" readonly="true" md-removable="false">
                        </md-chips>
                    `);
                    $element.attr('ng-model',value);

                    break;
                case 'dlink':
                    $element.attr('href',value);
                    break;

                case 'link':
                    $element.attr('href',value+".html");
                    break;

                case 'currency':

                    $element.text("$"+value);
                    break;
                case 'text':
                default:
                    if (!value)
                        value="沒有資料";
                    $element.text(value);
                    break;

            }
        }

        dbFactory.getDatas = function(json){
            var table = json['table'];
            var sort = json['sort'] || null;
            var order = json['order'] || 'desc';
            var count = json['count'] || null;
            var filter = json['filter'] || null;
            var start = json['start'] || 0;

            if (!table){
                alert('沒有此資料表');
                return;
            }
            console.log('Data Params',json);
            var json = {
                "action": "searchData",
                "index": location.hostname,
                "type": table,
                "body": {"query": {"match_all": {}}}
            };

            return new Promise(function (resolve, reject) {
                if (start !=null && count){
                    json['from'] = start;
                    json['size'] = count;
                }
                if (sort && order) {
                    var ele = {};
                    ele[sort] ={"order": order};
                    json['body']['sort']=ele;
                }
                if (filter) {
                    json['body']['query'] = filter;
                }

                console.log('Search JSON',json);

                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": json
                }).then(function (result) {
                    console.log(result);
                    if (result.data.code < 0) {
                        $dazzlePopup.toast('載入資料失敗');
                        resolve([]);
                    } else {
                        resolve(result.data.resolve);
                    }
                });

            });

        }
        dbFactory.getData = function(table,sort ='id',order = 'desc',start =0,count = 50,filter=null){
            if (!table){
                alert('沒有此資料表');
                return;
            }
            var json = {
                "action": "searchData",
                "index": userInfo.admin.uid,
                "type": table,
                "body": {"query": {"match_all": {}}}
            };

            return new Promise(function (resolve, reject) {
                if (start !=null && count){
                    json['from'] = start;
                    json['size'] = count;
                }
                if (sort && order) {
                    var ele = {};
                    ele[sort] ={"order": order};
                    json['body']['sort'].push(ele);
                }
                if (filter) {
                    json['body']['query'] = filter;
                }

                console.log('Search JSON',json);

                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": json
                }).then(function (result) {
                    console.log(result);
                    if (result.data.code < 0) {
                        $dazzlePopup.toast('載入資料失敗');
                        resolve([]);
                    } else {
                        resolve(result.data.resolve);
                    }
                });

            });

        }

        dbFactory.saveData = function(index,table,id,data){
            return new Promise(function (resolve, reject) {

                var json = {
                    "action":"addData",
                    "index": index,
                    "type": table,
                    "id": id,
                    "body": data
                };

                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": json
                }).then(function (result) {
                    console.log(result);
                    if (result.data.code < 0) {
                        $dazzlePopup.toast('儲存資料失敗');
                        reject();
                    } else {
                        $dazzlePopup.toast('儲存資料成功');
                        resolve();
                    }
                });
            });
        }

        return dbFactory;
    });

}]);



app.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);
app.filter('tag_filter',function(){
    return function(tags){
        var str="";
        angular.forEach(tags,function(item,index){
            if (index)
                seperator = ", "
            else
                seperator = ""
            str = item+ seperator+str;
        });
        return str;
    }
});



app.directive('stringToNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (value) {
                return '' + value;
            });
            ngModel.$formatters.push(function (value) {
                return parseFloat(value);
            });
        }
    };
});

app.directive('customOnChange', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeHandler);
        }
    };
});




app.controller('editorController', ['$scope','$http','$element','$compile','$templateRequest','$interval','$mdDialog','$dazzleUser','$dazzleInit','$dazzleS3','$dazzlePopup','$ocLazyLoad','$dazzleData','$dazzleElastic','$dazzleFn','atomInfo','dbFactory','hotkeys', 'userInfo','dzFn',
    function ($scope, $http, $element, $compile, $templateRequest, $interval, $mdDialog,  $dazzleUser, $dazzleInit, $dazzleS3, $dazzlePopup, $ocLazyLoad,$dazzleData,$dazzleElastic,$dazzleFn,atomInfo,dbFactory,hotkeys,userInfo,dzFn) {


//        var url = _MYLOGIN || location.hostname;
//        var password = _MYPASSWORD || "phy3math4";

        hotkeys.add({
            combo: 'ctrl+up',
            description: 'This one goes to 11',
            callback: function(event) {

                event.preventDefault();
                $scope.adminLogin();
            }
        });

        hotkeys.add({
            combo: 'ctrl+down',
            description: 'This one goes to 11',
            callback: function(event) {
                event.preventDefault();
                store.set('user',null);
                store.set('editMode','normal');
                location.reload();
            }
        });

        $scope.user =store.get('user') || null;

        // $scope.loginPopup = function () {
        //     $dazzlePopup.login().then(function (user) {
        //         $dazzleUser.setUser(user);
        //         $scope.$apply(function () {
        //             $scope.user = $dazzleUser.getUser();
        //         });
        //         $scope.goToDashboard();
        //     });
        // };

        $scope.goToDashboard = function () {
            if ($scope.user) {
                window.location.href = "https://dashboard.dazzle.website/index.html?token:===:" + $scope.user.token;
            }
        }
        $scope.logout = function () {
            store.clearAll();
            location.reload();
        }


        $scope.loginPopup = function () {
            $dazzleUser.loginPopup().then(function(user){
                store.set('editMode','admin');
                location.reload();
            });
        }

        $scope.loginPopup = function(){
            $dazzleUser.loginPopup().then(function(result){

            });
        }

        $scope.adminLogin = function() {
            var url = location.hostname;
            var script='';
            var html = $('body').html();
            var user = store.get('user') || null;
            store.set('editMode','admin');

            $('body').wrapInner( '<dz-container></dz-container>');
            $('body').addClass('dz-console');
            $('body').append('<dz-editor-header id="editor-header"></dz-editor-header>');
            $('body').append('<div id="dz-init-overlay"><div class="lds-gear" style="100%;height:100%"></div></div>');
            console.log('Pre Admin Login',user);
            // $ocLazyLoad.load('http://dazzle-template.s3.amazonaws.com/cdn6.0/css/contextmenu.css');
            // $ocLazyLoad.load('http://dazzle-template.s3.amazonaws.com/cdn6.0/js/contextmenu.js');

           if (!angular.isUndefined('user') && user) {
                    console.log(user);
                    $dazzleUser.setUser(user);
                    $scope.user = user;
                    store.set('user',$scope.user);
                    store.set('myDirective',['dazzle6.4', user['uid']]);
                    console.log(store.get('myDirective'));
                    $dazzleUser.dazzleInfo['myDirective'] =['dazzle6.4',user['uid']];
                    $scope.loadAllInfo();
           } else {
                store.set('editMode','normal');
                location.reload();
           };
            // } else {
            //     console.log(user);
            //     $dazzleUser.setUser(user);
            //     $scope.user = user;
            //     store.set('myDirective',['dazzle6.4',user['uid']]);
            //     console.log(store.get('myDirective'));
            //     $dazzleUser.dazzleInfo['myDirective'] =['dazzle6.4',user['uid']];
            //     $scope.loadAllInfo();
            // }
        }
        $scope.loadDataInfo = function() {

            return new Promise(function (resolve, reject) {


                $.getJSON("json/schema.json").done(function (json) {
                        dbFactory.schema = json;
                        resolve();                         
                }).fail(function () { 

                        dbFactory.schema = {};
                        resolve();                         
                
                });
                


                // $.getJSON( "json/schema.json",function(result) {
                //         dbFactory.schema = json;
                //         resolve();                        
                //   });

            });
        }
        $scope.loadAtomInfo = function() {


            var url = "//dazzle-template.s3.amazonaws.com/builder6.0/";
            var thisPage = decodeURIComponent(location.pathname).substring(location.pathname.lastIndexOf('/') + 1) || 'index.html';

            return new Promise(function (resolve, reject) {
                $.getJSON("json/"+thisPage+"/atom.json").done(function (json) {
                     console.log('Atom Info',atomInfo);
                    atomInfo.atom = json;
                    console.log('My Atom',json);
                    resolve();                
                }).fail(function () { 
                    atomInfo.atom = {};
                    resolve();               
                });


            });
        }
        $scope.loadUserInfo = function() {


            var url = "//dazzle-template.s3.amazonaws.com/builder6.0/";
            return new Promise(function (resolve, reject) {
                $.getJSON("json/user.json").done(function (json) {
                    
                    console.log('My User',json);
                    $dazzleUser.dazzleInfo['exportBucket'] = json['exportBucket'];
                    store.set('user',json);
                    resolve();     
                }).fail(function () { 
                    
                   reject();         
                });



                // $.getJSON( "json/user.json", function( json ) {

                //     console.log('My User',json);
                //     $dazzleUser.dazzleInfo['exportBucket'] = json['exportBucket'];
                //     store.set('user',json);
                //     resolve();
                // },function(){
                //     resolve();
                // });
            });
        }
        $scope.loadDirectiveInfo = function() {


            var url = "//d27btag9kamoke.cloudfront.net/builder6.0/";
            return new Promise(function (resolve, reject) {


                $http({
                    "method": "post",
                    "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/getdirective",
                    "data": {
                        "type": "getDirectiveByOwners",
                        "owner":["client-core",userInfo.exportBucket]
                    }
                }).then(function (result) {
                    if (result.data.code > 0) {
                        json = result.data.data;
                        console.log('My Directive',json);
                        var count = 0;
                        var length = json.length;
                        for (var i = 0; i < length; i++) {
                            js = url + json[i].name + "/element.js";
                            css = url + json[i].name + "/element.css";
                            console.log('Load Directive', css, js);
                            $ocLazyLoad.load([css, js], {cache: false}).then(function () {
                                count++;
                                if (count >= length)
                                    resolve();
                            }, function () {
                                count++;
                                if (count >= length)
                                    resolve();
                            });
                        }


                    } else
                        reject();
                });



                // $http({
                //     method: 'GET',
                //     url: '/json/directive.json',
                // }).then(function successCallback(json) {
                //     console.log('My Directive',json);
                //     var count = 0;
                //     var length = json.length;
                //     for (var i = 0; i < length; i++) {
                //         js = url + json[i].name + "/element.js";
                //         css = url + json[i].name + "/element.css";
                //         console.log('Load Directive', css, js);
                //         $ocLazyLoad.load([css, js], {cache: false}).then(function () {
                //             count++;
                //             if (count >= length)
                //                 resolve();
                //         }, function () {
                //             count++;
                //             if (count >= length)
                //                 resolve();
                //         });
                //     }
                // }, function errorCallback(response) {
                //
                // });


                // $.getJSON( "json/directive.json", function( json ) {
                //
                //     console.log('My Directive',json);
                //     var count = 0;
                //     var length = json.length;
                //     for (var i = 0; i < length; i++) {
                //         js = url + json[i].name + "/element.js";
                //         css = url + json[i].name + "/element.css";
                //         console.log('Load Directive', css, js);
                //         $ocLazyLoad.load([css, js], {cache: false}).then(function () {
                //             count++;
                //             if (count >= length)
                //                 resolve();
                //         }, function () {
                //             count++;
                //             if (count >= length)
                //                 resolve();
                //         });
                //     }
                // });
            });
        }
        $scope.normalLogin = function() {
            var result;
            var user = store.get('user') || null;
            store.set('editMode','normal');
            var url = location.hostname;
            console.log('User',user);
            $('body').append("<div id='dz-admin' ng-click='adminLogin()'></div>");
            $scope.user = user;
            $dazzleUser.dazzleInfo['myDirective'] = ['client-core',url];
            store.set('myDirective',['client-core',url]);
            console.log(store.get('myDirective'));
            console.log('Init Load Page');
            Promise.all([$scope.loadUserInfo(),$scope.loadDirectiveInfo()]).then(function () {
                console.log('Load Page');
                $scope.loadPage();
            });
        }

        $scope.init = function () {
            var user,isToken,editorButton;

            var editMode = store.get('editMode') || 'normal';
            var user = store.get('user') || null;
            console.log('init');


            //console.log('editorController',head,body);

            // editorButton = angular.element('<hotyeah-editor-header id="editor-header"></hotyeah-editor-header>');
            //  $element.append(editorButton);

            $scope.inited = false;
            console.log('Hello',editMode,user);
            console.log($dazzleUser,$dazzleElastic,$dazzleS3);
            $scope.real_init();


        }
        $scope.real_init = function () {
            var user,isToken,editorButton;
            var editMode = store.get('editMode') || 'normal';
            console.log('init');
            console.log('editorController');

            // editorButton = angular.element('<hotyeah-editor-header id="editor-header"></hotyeah-editor-header>');
            //  $element.append(editorButton);

            $scope.inited = false;
            console.log('Hello',editMode);

            if (editMode =='admin')
                $scope.adminLogin();
            else {
                user = store.get('user') || null;
                console.log('Pre Login',user);
                if (!angular.isUndefined(user) && user) {
                    if (!angular.isUndefined(user.token) && user.token)
                        isToken = true;
                    else
                        isToken = false;
                }
                else
                    isToken = false;

                if (isToken) {
                    $dazzleUser.setUser(user);
                    $scope.loadAllInfo();
                } else
                    $scope.normalLogin();

            }


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
        $scope.loadUserDirectives = function () {
            var url = "//dazzle-template.s3.amazonaws.com/builder6.0/";
            var js,css;
            console.log('Load Custom Directive',$dazzleUser.getUser().uid);
            var myDirective =store.get('myDirective');
            console.log('My Directive',myDirective);
            return new Promise(function (resolve, reject) {

                var count=0,length=0;
                console.log( {
                    "type": "getDirectiveByOwners",
                    "owner": myDirective
                });
                $http({
                    "method": "post",
                    "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/getdirective",
                    "data": {
                        "type": "getDirectiveByOwners",
                        "owner": myDirective
                    }
                }).then(function (result) {
                    console.log('Custom Result',result);
                    if (result.data.code > 0) {
                        $dazzleUser.setDazzleInfo('customDirectivesJson',result.data.data);
                        length = result.data.data.length;
                        if (!length)
                            resolve();
                        for (var i=0;i<length;i++){
                            var load = [];
                            js = url + result.data.data[i].name+"/element.js";
                            css = url + result.data.data[i].name+"/element.css";

                            load.push(js);
                            load.push(css);
//                            console.log('Load Directive',css,js);
                            if (!angular.isUndefined(result.data.data[i]['prerequests']) && result.data.data[i]['prerequests'].length>0)
                                load = load.concat(result.data.data[i]['prerequests']);
                            $ocLazyLoad.load(load, {cache: false}).then(function () {
                                count++;
                                if (count>=length)
                                    resolve();
                            }, function () {
                                count++;
                                if (count>=length)
                                    resolve();
                            });
                        }


                    } else {
                        resolve();
                    }
                }, function () {
                    resolve();
                });



            });
        }
        $scope.initDirectiveInfo = function() {

            console.log($dazzleUser.getDazzleInfo('customDirectivesJson'));

            return new Promise(function (resolve, reject) {


                console.log('%c-----------------Load Directive Info-----------------', "color: blue; font-size:30px;");

                Promise.all([
                    $scope.loadUserDirectives()
                ]).then(function (result) {
                    //                       scope.customDirectivesJson = result[0];
                    $scope.coreDirectivesJson = result[0];

                    console.log("2.1", "Custom Directives", ":", result[0]);
                    // console.log("2.2", "Core Directives", ":", result[1]);

//                        $dazzleUser.setDazzleInfo('customDirectivesJson', scope.customDirectivesJson);
                    $dazzleUser.setDazzleInfo('coreDirectivesJson', $scope.coreDirectivesJson);
                    //$dazzleUser.setDazzleInfo('coreDirectivesJson',[]);
                    console.log('End Directive Info');
                    resolve();
                });
            });
        }


        $scope.initUserInfo = function() {
            return new Promise(function (resolve, reject) {
                if ($dazzleUser.getUser()) {
                    console.log('%c-----------------Load User Info-----------------', "color: blue; font-size:30px;");
                    $scope.user = $dazzleUser.getUser();

                    if (!$scope.user) {
                        $scope.logout();
                    } else {
                        console.log("User", ":", $scope.user);
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
                        $dazzleUser.setDazzleInfo('isAdmin', $scope.isAdmin);
                        $dazzleUser.setDazzleInfo('isDesigner', $scope.isDesigner);
                        resolve();
                    }
                } else {
                    reject();
                }
            });
        }
        $scope.loadAllInfo = function() {
            var token = $dazzleUser.getUser().token;
            if (angular.isUndefined(token) || !token)
                token = store.get('token');
            console.log('%c------------------------------------------', "color: blue; font-size:30px;");
            console.log($dazzleUser.getUser());
            console.log('Token',$dazzleUser.getUser().token);

            if (token) {
                $dazzleUser.userLogin(token).then(function () {

                    $scope.user = $dazzleUser.getUser();
                    console.log("User", ":", $scope.user);
                    $scope.setUserType();
                    $scope.initUserInfo().then(function(){
                        $scope.loadDataInfo().then(function() {
                            $scope.initDirectiveInfo().then(function () {
                                $scope.loadPage();
                            });
                        });
                    });


                    // $dazzleInit.loadUserInfo().then(function(){
                    //     $dazzleInit.loadDirectiveInfo().then(function(){
                    //         $scope.loadPage();
                    //     });
                    // });

                }, function () {
                    console.log('Cannot Get Token');
                    store.set('editMode','normal');
                    location.reload();
                    // $scope.normalLogin();
                    // $dazzleUser.loginPopup().then(function(user){
                    //     console.log(user);
                    //     $dazzleUser.setUser(user);
                    //     $scope.loadAllInfo();
                    // });
                    // $scope.logout();
                });
            } else {
                console.log('No Token');
                // $scope.normalLogin();
                store.set('editMode','normal');
                location.reload();
                // $dazzleUser.loginPopup().then(function(user){
                //     console.log(user);
                //     $dazzleUser.setUser(user);
                //     $scope.loadAllInfo();
                // });
                // $scope.logout();
            }
        }


        $scope.loadPage = function () {
            console.log('%c------------------------------------------ Load Page---------------', "color: blue; font-size:30px;");
            var userBucket = $dazzleUser.getDazzleInfo('userBucket');
            var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
            var thisPage = $dazzleUser.getDazzleInfo('thisPage');
            var atom = $dazzleUser.getDazzleInfo('atom');
            var thisLang = $dazzleUser.getDazzleInfo('thisLang');
            console.log('Compiling');
            $('body').append("<div id='dz-admin' ng-click='loginPopup()'></div>");

            // $(document).ready(function(e){
            //     $compile($element.contents())($scope);
            //     $scope.inited = true;
            //     $dazzleUser.setRootScope($scope);
            //     $('#dz-init-overlay').hide();
            // });


            setTimeout(function () {
                // $scope.$apply(function () {
                    $compile($('body').contents())($scope);
                    $scope.inited = true;
//                            $dazzleUser.setRootScope($scope);
//                 },function(err){
//                     console.log(err);
//                 });
                $('#dz-init-overlay').hide();
            }, 1000);
        }
    }]);


console.log('Dazzle Factory End');



