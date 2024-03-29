       var dazzle = angular.module("dazzle");
       dazzle.service("$dazzleFn", function ($http,$dazzleS3,$dazzleData,$dazzlePopup,$templateRequest,$dazzleUser,$dazzleInit,$mdDialog,$compile,$rootScope) {
 
            
 
           var that = this;
            this.alasql = function () {
                return alasql;
            }
			
			that.updateInputByType = function(scp,type) {
				var html;
				switch (type) {
					case 'image':
					
					var content = '<img style="max-width: 100%; height: auto; position: relative;" class="ng-scope" ng-src="model.data">';
						html = '<panel>'+$dazzleUser.dazzleInfo['toolbar']+'<div class="dz-panel-content">'+content+'</div></panel>';

					break;
					
					case 'text':
						content = '<input type="text" ng-model="model.data" placeholder="輸入資料" ng-keypress="myFunct($event)"/>';
						html = '<panel context-menu="menuOptions"><span class="dz-panel-content">'+content+'</div></panel>';
					
					break;
					
					case 'html':
							
						content = scp.model.data;	
						if (!content)
						    content = '請寫上一些東西';
						html = '<panel context-menu="menuOptions">'+$dazzleUser.dazzleInfo['toolbar']+'<dz-text class="dz-panel-content" style="min-height:50px;">'+content+'</dz-text></panel>';
					
					break;
				}		
				
				return html;
				
			}
            
            
             this.saveAtom = function () {
                var userBucket = $dazzleUser.getDazzleInfo('userBucket');
                var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                var websiteId = $dazzleUser.dazzleInfo['websiteId'];
                var thisPage = $dazzleUser.getDazzleInfo('thisPage');
				var isData = $dazzleUser.dazzleInfo['isData'];
				var atom = $dazzleuser.dazzleInfo['atom'];
                var thisLang = $dazzleUser.getDazzleInfo('thisLang');

                console.log('My Dazzle Page',thisPage);

                for (key in atom){
                    var item = atom[key];
                    that.saveElasticAtom(key, item,false);
                }
            }
            
             this.loadAtom = function () {
                var userBucket = $dazzleUser.getDazzleInfo('userBucket');
                var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                var websiteId = $dazzleUser.dazzleInfo['websiteId'];
                var thisPage = $dazzleUser.getDazzleInfo('thisPage');
				var isData = $dazzleUser.dazzleInfo['isData'];
				var atom ={};
                var thisLang = $dazzleUser.getDazzleInfo('thisLang');

                console.log('My Dazzle Page',thisPage);


                return new Promise(function (resolve, reject) {
                    var query = {
                        "action":"searchData",
                        "index":$dazzleUser.getUser().uid,
                        "type":"_atom",
                        "body":{
                            "query":{
                                 "bool": {
                                      "filter": [
                                        { "match": { "websiteid": websiteId  }},
                                        { "match": { "pageName": thisPage }}
                                      ]
                                    }
                            }
                        }
                    }
                    
                    console.log('load Atom',query);
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": query

                    }).then(function (result) {
                        console.log('Load Atom Result',result);
                        if (result.data.code < 0) {
                            resolve([]);
                            
                        } else {
                            if (!Array.isArray(result.data.resolve))
                                result.data.resolve = [result.data.resolve];
                            console.log(result.data.resolve);
                            resolve(result.data.resolve);
                        }
                    });                


                });
            }
            
             this.useTemplate = function (obj) {
                return new Promise(function (rs, rj) {
                    // if (scp.model.isDb)
                    //     that.saveDataValue(scp.model.db,scp.model.data);
                    that.updateHtml(obj);
                    rs();
                });
            }

            this.updateHtml = function(obj){
                console.log('Load Obj',obj);
                var atom = $dazzleUser.dazzleInfo['atom'];
                switch(obj.type){
                    case 'dzImage':
                        if(!obj.data)
                            obj.data = "http://st.motortrend.com/uploads/sites/5/2015/11/noimage.png?interpolation=lanczos-none&fit=around|300:200";
                            
                        $('#'+obj.id).attr('src',obj.data);
                        break;
                    
                    default:

                    break;
                }

                atom[obj.id] = obj;

                $dazzleUser.setDazzleInfo('atom',atom);

                that.saveElasticAtom(obj.id, obj,false);

                console.log('Update Html',atom);
//                that.saveElasticAtom(obj.id,obj,false);

            }
            
            this.saveDataValue = function(db,value){
                return new Promise(function (rs, rj) {
            
                    var query = {
                        "action":"saveField",
                        "index":db.index,
                        "type":db.table,
                        "field":db.field,
                        "id":db.id,
                        "value":value
                    }
                    console.log('Save Data',query);
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": query

                    }).then(function (result) {
                        // console.log(field,result);
                        if (result.data.code < 0) {
                            rj();
                            
                        } else {
                            rs();
                        }
                    });                
                });                

            };
            this.getDataValue = function(db){

            
                return new Promise(function (rs, rj) {
            
                    var query = {
                        "action":"getField",
                        "index":db.index,
                        "type":db.table,
                        "field":db.field,
                        "id":db.id
                    }
                    console.log('Get Data Value',query);

                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": query

                    }).then(function (result) {
                        console.log('Get Data Value',query,result);
                        if (result.data.code < 0) {
                            rs(null);
                            
                        } else {
                            rs(result.data.resolve);
                        }
                    });                
                });                
            }
            this.removePanel = function(){

                var html,ele;
                
                ele = angular.element('panel');
                html = ele.find('.dz-panel-content').html();
                ele2 = angular.element(html);
                ele.replaceWith(ele2);
                
            }
            this.editorCustomInit = function (scp, element, attr) {
                return new Promise(function (resolve, reject) {
                    

                    scp.id = element.attr('id') || "ele" + new Date().getTime();

                    element.attr('id', scp.id);
                    element.attr('custom', scp.type);

                    var thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');
                    var masterJson = $dazzleUser.getDazzleInfo('masterJson');

                    console.log(thisPageJson);

                    that.loadElasticAtom(scp.id,false).then(function(item){
                        var obj = JSON.parse(item.object);
                        scp.model = obj;
                        that.useTemplate(scp).then(function(){
                            resolve();
                        });

                    },function(err){

                        obj = {
                            "id": scp.id,
                            "type": scp.type,
                            "html": "Hello World" + " - " + scp.id + "[" + scp.type + "]",
                            "isDb":false
                        };
                        if ($.trim(element.html())) {
                            //this new atom have content
                            obj.html = element.html();
                            scp.model = obj;
                            that.saveElasticAtom(scp.id, obj,false);
                            resolve();
                        } else {
                            //this atom no content, get template
                            scp.model = obj;
                            resolve();
                        }

                    });





                        
                });
            };
            
            this.getElasticAtom = function (id,atom,isMaster) {
                return new Promise(function (resolve, reject) {
                   console.log('Get Elastic Atom');
                   
                    var atom = $dazzleUser.getDazzleInfo('atom');
                    var key;                    
                    if(isMaster)
                        key = $dazzleUser.dazzleInfo['websiteId']+"-master-"+id;
                    else
                        key = $dazzleUser.dazzleInfo['websiteId']+"-"+$dazzleUser.dazzleInfo['thisPage']+"-"+id;
                    
                    var object ={};
                    var params = {
                            "action": "getData",
                            "index": $dazzleUser.getUser().uid,
                            "type": "_atom",
                            "id": key
                        };
                        console.log('Get Elastic Atom',params);
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data":params
                    }).then(function (result) {
                        console.log('Get Elastic Atom',result);
                        if (result.data.code < 0) {
                            reject();
                        } else {
                            resolve(result.data.resolve);
                        }
                    });
                });
            };


           this.loadElasticAtom = function (id, isMaster) {
               return new Promise(function (resolve, reject) {

                   if (isMaster)
                       key = $dazzleUser.dazzleInfo['websiteId']+"-master-"+id;
                   else
                       key = $dazzleUser.dazzleInfo['websiteId']+"-"+$dazzleUser.dazzleInfo['thisPage']+"-"+id;


//                   var object =JSON.stringify(atom);
//                    var dbIndex = atom.isDb ? atom.db.index : '';
//                    var dbField = atom.isDb? atom.db.field : '';
//                    var dbTable = atom.isDb? atom.db.table : '';
//                    var dbId = atom.isDb? atom.db.id : '';

                   // if (atom.isDb)
                   //     $dazzleData.saveElasticFieldRecord(dbIndex,dbTable,dbField,dbId,atom['data']);

                   $http({
                       "method": "post",
                       "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                       "data": {
                           "action": "getData",
                           "index": $dazzleUser.getUser().uid,
                           "type": "_atom",
                           "id": key
                       }
                   }).then(function (result) {
                       if (result.data.code < 0) {
                            reject();
                       } else {
                          var item = result.data.resolve;
                          var obj = JSON.parse(item.object);
                          if (obj.isDb)
                                that.getDataValue(obj.db).then(function(value){
                                    obj.data = value;
                                    resolve(obj);
                                });
                          else
                           resolve(obj);
                       }
                   });
               });
           };
            
            this.saveElasticAtom = function (id, atom,isMaster) {
                return new Promise(function (resolve, reject) {

                    if (isMaster)
                        key = $dazzleUser.dazzleInfo['websiteId']+"-master-"+id;
                    else 
                        key = $dazzleUser.dazzleInfo['websiteId']+"-"+$dazzleUser.dazzleInfo['thisPage']+"-"+id;
                        
                        
                    var object =JSON.stringify(atom);
                    var dbIndex = atom.isDb ? atom.db.index : '';
                    var dbField = atom.isDb? atom.db.field : '';
                    var dbTable = atom.isDb? atom.db.table : '';
                    var dbId = atom.isDb? atom.db.id : '';
                    
                    // if (atom.isDb) 
                    //     $dazzleData.saveElasticFieldRecord(dbIndex,dbTable,dbField,dbId,atom['data']);
                    
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "addData",
                            "index": $dazzleUser.getUser().uid,
                            "type": "_atom",
                            "id": key,
                            "body": {
                                    "id":key,
                                    "objectid":id,
                                    "isMaster": isMaster,
                                    "language": '',
                                    "object":object,
                                    "pageName":$dazzleUser.dazzleInfo['thisPage'],
                                    "websiteid":$dazzleUser.dazzleInfo['websiteId'],
                                    "isDb":atom.isDb,
                                    "dbIndex":dbIndex,
                                    "dbTable":dbTable,
                                    "dbField":dbField,
                                    "dbId":dbId                                    
                            }
                        }
                    }).then(function (result) {
                        if (result.data.code < 0) {
                            reject(result.data.text);
                        } else {
                            resolve(result.data.text);
                        }
                    });
                });
            };
            
            this.createElasticAtom = function (id, atom,isMaster) {
               
                return new Promise(function (resolve, reject) {
                    var isMaster;
                    var key;                    
                    
                    if(isMaster)
                        key = $dazzleUser.dazzleInfo['websiteId']+"-master-"+id;
                    
                    else 
                        key = $dazzleUser.dazzleInfo['websiteId']+"-"+$dazzleUser.dazzleInfo['thisPage']+"-"+id;
                    
                    
                    var object =JSON.stringify(atom);
                    var dbIndex = atom.isDb ? atom.index : '';
                    var dbField = atom.isDb? atom.field : '';
                    var dbTable = atom.isDb? atom.table : '';
                    var dbId = atom.isDb? atom.did : '';
                    
                    // if (atom.isDb) 
                    //     $dazzleData.saveElasticFieldRecord(dbIndex,dbTable,dbField,dbId,atom['data']);
                    
                    
                    var params ={
                            "action": "createData",
                            "index": $dazzleUser.getUser().uid,
                            "type": "_atom",
                            "id": key,
                            "body": {
                                "id":key,
                                "objectid":id,
                                "isMaster": isMaster,
                                "language": '',
                                "object":object,
                                "pageName":$dazzleUser.dazzleInfo['thisPage'],
                                "websiteid":$dazzleUser.dazzleInfo['websiteId'],
                                "isDb":atom.isDb,
                                "dbIndex":dbIndex,
                                "dbTable":dbTable,
                                "dbField":dbField,
                                "dbId":dbId
                            }
                        };
                     console.log('Create Elastic Atom',params);
                     
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": params
                    }).then(function (result) {
                        
                        console.log('Result',result);
                        if (result.data.code < 0) {
                            reject(result.data.text);
                        } else {
                            resolve(result.data.text);
                        }
                    });
                });
            };


            this.updateRootPage = function(){
                return new Promise(function(resolve,reject){
                    console.log($dazzleUser.dazzleInfo);
                    console.log('This Page',$dazzleUser.dazzleInfo['thisPage']);
                    var thisPage = $dazzleUser.dazzleInfo['singlePage'];

                //  that.mountDbToAtom().then(function(){
                        $dazzleS3.getFile($dazzleUser.dazzleInfo['userBucket'],$dazzleUser.dazzleInfo['websiteKey']+'page/'+thisPage+'/page.html').then(function(html){
                            var page = angular.element("<div>"+html+"</div>");

                                var atom = $dazzleUser.dazzleInfo['atom'];
                                console.log('Update Atom',atom);
                                for (key in atom) {
                                    console.log('Key',key);
                                    var item = atom[key];
                                    if (item.hasOwnProperty('db')){
                                        console.log('DB key',key,atom[key].html);
                                        page.find('#'+key).html(atom[key].html.replace(/(\sng-\w+-\w+="(.|\n)*?"|\sng-\w+="(.|\n)*?"|\sng-(\w+-\w+)|\sng-(\w+))/g, "")
                                            .replace(/<!--(.*?)-->/gm, ""));
                                    }
                                }
                                var newHtml = page.html();
                                console.log('New HTML',newHtml);
                                $dazzleS3.saveFile($dazzleUser.dazzleInfo['userBucket'],$dazzleUser.dazzleInfo['websiteKey']+'page/'+thisPage+'/page.html',newHtml).then(function(){
                                    console.log('Saved Html');
                                    resolve();
                                });


                        });
                 //   });

                });
            }
            
            this.mountFieldToAtom = function(table,field,value) {
                var key = this.findDbMatchAtom(table,field);
                console.log('Mount To Atom',table,field,key,value);

                if (key !=null) {
                    $dazzleData.getFieldSchemaByFieldName(table,field).then(function(schema) {
                            myModel = $dazzleUser.dazzleInfo['atom'][key];
                            console.log('My Schema',schema);
                            console.log('Mount', myModel, $dazzleUser.dazzleInfo['atom']);
                            console.log('My Directive', schema['directive'], value);
                            that.createInitValueByType(schema['directive'], value).then(function (newValue) {
                                console.log('New Value',key,value);
                                $dazzleUser.dazzleInfo['atom'][key].value = newValue;
                                that.updateAtomHtmlByTemplate(key).then(function(){
                                    $dazzleInit.saveAtom();                                 
                                });
                            });
                    });

                }               
            }
            

            this.saveDirectiveIntoAtom = function(key,table,field){
                return new Promise(function(resolve,reject) {
                    $dazzleData.loadSchemaDirectiveByTableAndField(table, field).then(function (directive) {
                        console.log('Directive',directive);
                        $dazzleUser.dazzleInfo['atom'][key].db.directive = directive.directive;
                        resolve();
                    });
                });
            }
            
            this.mountDbToAtom = function() {
                return new Promise(function(resolve,reject) {
                    var atom = $dazzleUser.dazzleInfo['atom'];
                    console.log('Mount DB To Atom',atom);
                    var thisTable = $dazzleUser.dazzleInfo['thisTable'];
                    for (key in atom) {
                        var item = atom[key];
                        console.log('Item', item);
                        if (item.hasOwnProperty('db')) {
                            //                        console.log('DB key',key,item,table,field);
                            if (thisTable == item.db.table) {
                                that.updateAtomHtmlByTemplate(key);
                            }
                        }
                    }
                    resolve();
                });
            }
            
            this.updateAtomHtmlByTemplate = function(id) {
                return new Promise(function(resolve,reject){

                    myModel = $dazzleUser.dazzleInfo['atom'][id];
                    
                    if (!angular.isUndefined(myModel.template)) {
                        var htmlCode = myModel.template.htmlCode;
                        

                        var scope = $rootScope;


                          scope.model = myModel;
                            scope.model.data =[];
//                        console.log('My Model',myModel);
                        scope.$apply(function() {
                            var angHtml = $compile('<div>'+htmlCode+'</div>')(scope);
                            var comHtml = angular.element(angHtml);
                            console.log('Compile HTML',angHtml);
                             setTimeout(function() {
                                myModel['html'] = angHtml.html().replace(/(\sng-\w+-\w+="(.|\n)*?"|\sng-\w+="(.|\n)*?"|\sng-(\w+-\w+)|\sng-(\w+))/g, "")
                                .replace(/<!--(.*?)-->/gm, "");         
                                console.log('Compile HTML',angHtml.html().replace(/(\sng-\w+-\w+="(.|\n)*?"|\sng-\w+="(.|\n)*?"|\sng-(\w+-\w+)|\sng-(\w+))/g, "")
                                .replace(/<!--(.*?)-->/gm, ""));
                                $dazzleUser.dazzleInfo['atom'][id] = myModel;   
                                console.log('My Atom',$dazzleUser.dazzleInfo['atom']);
                                resolve();
                            }, 500);  
                        });
                        
                    } else {
                            myModel['html'] = myModel.value;
                            $dazzleUser.dazzleInfo['atom'][id] = myModel;   
                            console.log('No Template',id,myModel,$dazzleUser.dazzleInfo['atom']);
                            resolve();
                    }
                    
                });
            }

            this.findDbMatchAtom = function(table,field){
                var atom = $dazzleUser.getDazzleInfo('atom');
                console.log('Find DB Match Atom',atom);
                for (key in atom){
                    var item = atom[key];
                    console.log('Item',item);
                    if (item.hasOwnProperty('db')){
                        console.log('DB key',key,table,field,item.db.table,item.db.field);

                        if (item.db.table == table && item.db.field == field) {
                            console.log('Return Key',key);
                            return key;
                        }
                    }
                }
                return null;
            }

            this.getFileUrl = function (size, id) {

                if (!id) {
                    return null;
                }
                

                if (id.indexOf(".jpg")>=0) {
                    id=id.replace(".jpg","");
                }

                return "//designerrrr-output.s3.amazonaws.com/images/"+$dazzleUser.getUser().uid+"/"+size+"/"+id+".jpg";
            }

            this.createInitValueByType = function(directive,value){
                return new Promise(function(resolve,reject){
                    if (angular.isUndefined(directive))
                        resolve(value);

                    switch(directive){
                        case 'number':

                            output  = value || 0;
                            resolve(String(value));
                            break;

                        case 'image':

                            output =  value || "http://dazzle.website/image/lgo.png";
                            resolve(output);
                            break;

                        case 'referForm':

                            $dazzleData.loadFormByName(value).then(function(json){
                                var schema = json.schema;
                                $dazzleS3.getFile('dazzle-template','file6.0/form-template.html').then(function(html){
                                    var scope = $rootScope;
                                    scope.model = json;
                                    scope.userBucket = $dazzleUser.dazzleInfo['userBucket'];
                                    scope.websiteKey = $dazzleUser.dazzleInfo['websiteKey'];
                                    scope.$apply(function() {
                                        var angHtml = $compile('<div>'+html+'</div>')(scope);
                                        var comHtml = angular.element(angHtml);
                                        console.log('Compile HTML',angHtml);
                                        setTimeout(function() {
                                            var newHtml = angHtml.html().replace(/(\sng-\w+-\w+="(.|\n)*?"|\sng-\w+="(.|\n)*?"|\sng-(\w+-\w+)|\sng-(\w+))/g, "")
                                                .replace(/<!--(.*?)-->/gm, "");
                                            console.log('refer Form HTML',newHtml);
                                            resolve(newHtml);
                                            //                                                              $dazzleUser.dazzleInfo['atom'][id] = myModel;
                                            //                          resolve();
                                        }, 500);
                                    });
                                });
                            });

                            break;

                        case 'refer':
                            console.log('We Have Refer',value);
                            var arr=[];
                            if (!Array.isArray(value))
                                arr.push(value);
                            else
                                arr = value;

                            // console.log(schema.cellEditorParams['table']);
                            // $dazzleData.loadDataSetByTableName(schema.cellEditorParams['table'],arr).then(function(result){
                            //     console.log('Refer Result',result);
                            //     var output = {
                            //         ids: value,
                            //         data: result
                            //     }
                            //
                            //     resolve(output);
                            // },function(err){
                            //     resolve([]);
                            // });

                            resolve([]);
                            break;

                        case 'video':
                            resolve("https://www.youtube.com/embed/" + that.getYouTubeID(value));
                            break;

                        default:
                            resolve(value);
                            break;
                    }

                });
            }
            this.dataInitByType = function(db){
                return new Promise(function(resolve,reject){
                    if (!angular.isUndefined(db)){
                        //var db
                        $dazzleData.getAtomData(db).then(function(value){
                            console.log('Init Value');
                           $dazzleData.getFieldSchemaByFieldName(db.table,db.field).then(function(schema){
                                console.log('We Have Schema',schema);
                                if (angular.isUndefined(schema.directive)) {
                                    alert('未設定模版');
                                    resolve(value);
                                }
                                if (angular.isUndefined(value) || !value) {
                                        resolve("對應Table: "+db.table+". 對應Field: "+db.field);
                                }
                                else
                                    that.createInitValueByType(schema.directive,value).then(function(output){
                                       resolve(output);
                                    });

                           });
                        },function(err){
//                        console.log('Init Error');
                            $dazzleData.getFieldSchemaByFieldName(db.table,db.field).then(function(schema){
                                console.log('We Have Schema',schema);

                                that.createInitValueByType(schema.directive,null).then(function(output){
                                    resolve(output);
                                });
                            });

                            reject();
                        });
                    } else {
                        reject();
                    }
                });
            }

            this.getYouTubeID = function (url) {
                var ID = '';
                url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
                if (url[2] !== undefined) {
                    ID = url[2].split(/[^0-9a-z_\-]/i);
                    ID = ID[0];
                } else {
                    ID = url;
                }
                return ID;
            }

            this.dataPopupByType = function(db,value){
                return new Promise(function(resolve,reject){
                    $dazzleData.getTypeByFieldName(db.table,db.field).then(function(type){

                        switch(type) {
                            case 'text':
                            case 'number':
                            case 'email':
                            case 'password':
                                var confirm = $mdDialog.prompt()
                                    .title('你要變更資料嗎?')
                                    .textContent('輸入你的資料')
                                    .placeholder(db.field)
                                    .initialValue(value)
                                    .required(true)
                                    .ok('變更')
                                    .cancel('取消');

                                $mdDialog.show(confirm).then(function(result) {
                                    resolve(result);

                                });

                                break;
                            case 'video':
                                var confirm = $mdDialog.prompt()
                                    .title('你要變更資料嗎?')
                                    .textContent('輸入你的資料')
                                    .placeholder(db.field)
                                    .initialValue(value)
                                    .required(true)
                                    .ok('變更')
                                    .cancel('取消');

                                $mdDialog.show(confirm).then(function(result) {
                                    resolve("https://www.youtube.com/embed/" + that.getYouTubeID(result));
                                });
                                break;
                            case 'html':

                                console.log('HTML',value);
                                // $dazzleUser.setDazzleInfo('html',value);
                                // $dazzlePopup.html(value).then(function(output){
                                //     resolve(output);
                                // });


                                var params2 = {
                                    html: value,
                                    big: true,
                                    name: 'htmlPopup',
                                    directive:'<html-popup></html-popup>'
                                };
                                $dazzlePopup.callPopup(params2).then(function(output){
                                    resolve(output);
                                });
                                break;







                            case 'textarea':
                            case 'code':
                                $dazzlePopup.code(value,'html').then(function(output){
                                    resolve(output);
                                });

                                break;

                            case 'tag':
                                $dazzlePopup.tag(value).then(function (tags) {
                                    resolve(tags);
                                });
                                break;

                            case 'select':
                                $dazzleData.getOptionByFieldName(db.table,db.field).then(function(result){
                                    console.log('Options',result);
                                    var params = {
                                        select: value,
                                        options: result,
                                        directive:"<select-popup></select-popup>"
                                    };

                                    $dazzlePopup.callPopup(params).then(function(output){
                                        //var image = output['image'];
                                        resolve(output);
                                    });
                                });
                                break;

                            case 'refer':
                                $dazzlePopup.dataSelectById($dazzleUser.getDazzleInfo('websiteId'),db.referTable, value).then(function () {
                                    resolve(true);

                                });
                                break;
                            case 'page':

                                break;

                            case 'multiselect':

                                break;

                            case 'image':
                                var params = {
                                    directive:"<user-gallery-popup></user-gallery-popup>"
                                };

                                $dazzlePopup.callPopup(params).then(function(output){
                                    //var image = output['image'];
                                    var image = output;
                                    $dazzleInit.copyFile($dazzleUser.getDazzleInfo('userBucket') + '/' + encodeURI(image.key), $dazzleUser.getDazzleInfo('exportBucket'), image.key).then(function () {
                                        var src = 'http://' + $dazzleUser.getDazzleInfo('exportBucket') + '/' + image.key;
                                        resolve(src);
                                    });
                                });
                                break;

                            case 'gallery':
                                var params = {
                                    'images':value,
                                    directive:"<gallery-popup></gallery-popup>"
                                }
                                $dazzlePopup.callPopup(params).then(function (images) {
                                    resolve(images);
                                });
                                break;

                            case 'formview':
                                break;

                            case 'file':

                                $dazzlePopup.uploadFile($dazzleUser.user.uid).then(function(uploaded){
                                    resolve(uploaded);
                                });
                                break;


                            case 'datetime':
                            case 'date':
                            case 'time':
                                $mdDialog.show({
                                    templateUrl: 'https://d27btag9kamoke.cloudfront.net/cdn6.0/models/recoveryPopup/popup.html' + '?id=' + new Date().getTime(),
                                    controller: 'recoveryPopupController',
                                    clickOutsideToClose: true,
                                    locals: {
                                        rootScope: $dazzleUser.getRootScope()
                                    }
                                }).then(function (date) {
                                    resolve(date);
                                });
                                break;

                            case 'button':
                                break;
                            case 'checkbox':
                                break;
                        }

                    });
                });
            }

            this.getUserForms = function (userId, websiteId) {
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
                                        var isTable = filename.endsWith('-form');
                                        if (isTable) {
                                            var tableName = filename.replace('-form', "");
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

            this.saveWebsite6Record = function(dazzleInfo,websiteInfo){

            }
       });