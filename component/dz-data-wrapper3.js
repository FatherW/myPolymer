
      loadStyle("https://d25k6mzsu7mq5l.cloudfront.net/smart/smart.default.css");
      loadScript("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/js/webcomponents-lite.js");
      loadModule("https://d25k6mzsu7mq5l.cloudfront.net/smart/smart.element.js");
      loadScript("https://unpkg.com/ag-grid-community/dist/ag-grid-community.min.js");
      loadScript("https://d25k6mzsu7mq5l.cloudfront.net/backend7.0/fieldRenderer.js");
      loadScript("https://d25k6mzsu7mq5l.cloudfront.net/component/dz-data-item2.js");
      
//      loadScript("https://d25k6mzsu7mq5l.cloudfront.net/component/dz-grid.js?id="+new Date().getTime());

// const dbUrl = "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController";
customElements.define('dz-data-wrapper3',
  class extends HTMLElement {
    constructor() {
      super();

      let that = this;
      let table = this.getAttribute('table') || '_default';
      this.table = table;
      this.dbUrl = "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController";
      const template = document.querySelector('meta[tid]').getAttribute('tid');
      window['tid'] =template;
      const uid= document.querySelector('meta[uid]').getAttribute('uid');
      window['uid'] =uid;
      let id= this.getAttribute('id') || '_default';
      this.id = id;
      this.query_path = 'https://d25k6mzsu7mq5l.cloudfront.net/user-data/'+window['uid']+'/DZ-DATA-WRAPPER3/'+id+'/settings.json?id='+new Date().getTime();
//      this.field_path = '/template/'+template+'/DZ-DATA-WRAPPER2/'+id+'/field.json';
        this.innerHTML = '檢索資料中......';
        this.query = {};
        this.field =  [];
        this.from =  0;
        this.size =  null;
        this.columns = [];

      
// getAllData(this.table).then(result=>{
//     console.log('All Data',that.table,result);
//           let settings = JSON.parse(result);
//           this.query = {
//             "query":{"match_all":{}}
//           };
//           this.field = settings['field'] || [];
//           this.from = settings['from'] || 0;
//           this.size = settings['size'] || null;
//           this.columns = [];
//           console.log('Settings Url',result,this.query,this.field);
//           this.constructColumns();
//           this.refresh();   

//   });





      let allow_menu = [];
     

      document.dispatchEvent(new CustomEvent('allow-menu', { detail: {'component':that.tagName,'menu':allow_menu} }));

        
      
      // Remove Data

      // Add Data 
      this.addEventListener('data-settings',e=>{
        window['curTarget']= that;
        document.dispatchEvent(new CustomEvent('custom-popup', { detail: {'component':'dz-data-settings-popup'} }));
        // document.querySelector('mat-dialog-container').innerHTML ='<dz-grid>Currently, no Grid. </dz-grid>';
      });
      this.addEventListener('data-management',e=>{
        window['curTarget']= that;
        document.dispatchEvent(new CustomEvent('custom-popup', { detail: {'component':'dz-grid'} }));
        // document.querySelector('mat-dialog-container').innerHTML ='<dz-grid>Currently, no Grid. </dz-grid>';
      });
      this.addEventListener('data-refresh',e=>{
//        that.addData();
          that.refresh();
      });

      // Update Data
      this.addEventListener('update-data',e=>{
        that.refresh();
      });
      this.addEventListener('remove-data',e=>{
        //   let id = e['detail']['data-id'];
        //   let table = that.getAttribute('table') || "_default";
          console.log('Remove Data',e);
        //   // let table = table;
        //  that.removeData(table,id);
      });
      // Init Menu
     
   
    }
   
    constructColumns(){
      let fields = this.field;
      let default_col = {
        'sortable':true,
        'filter':true
      }
      this.columns = [];
      this.key = '_id';
      fields.forEach(item=>{
        let label = item['label'] || item['field'];
        default_col = {
          
          'field':item['field'],
          'headerName':label,
          'sortable':true,
          'filter':true
        }
        switch(item['type']){
          case 'key':
            this.key = item['field'];
            default_col['hide'] = true;
          break;          
          
          case 'date':
            default_col['cellRenderer'] = window['DateRenderer'];
            default_col['cellEditor'] = window['DateEditor'];
          break;

          case 'file':
            default_col['cellRenderer'] = window['FileRenderer'];
          break;
        }

        this.columns.push(default_col);


      });
    }
    newBuildHtml(data){
      console.log('New Data',data);
      // let html= '';
      let html;
      let that = this;
      let editMode = store.get('editMode') || 'normal';
      if(!data.length){
        this.innerHTML = "沒有資料";
        return;
      }

      this.innerHTML ='';
      // if (editMode==='admin') 
      //   this.innerHTML = '<dz-data-button></dz-data-button>';
      let tid = this.getAttribute('tid') || '_default';
      let elm;
      console.log('Data',data);
      // let html = document.createElement('dz-data-item');
      let dz_item = document.createElement('dz-data-item2');

      data.forEach(item=>{
          html = dz_item.cloneNode(true);
          html.setAttribute('tid',tid);
          html.data = item;
          html.field = that.field;
          
         that.appendChild(html);
      });


    }


    refreshData(){
      let that = this;
      let table = this.getAttribute('table') || '_default';
      let user=store.get('user');
      let uid = user['uid'];
      let params = {
          "action": "searchData",
          "index": uid,
          "type": this.table,
          "body": this.query,
          "from":this.from,
          "size":this.size
      }
      console.log('Refresh',params);
      return new Promise(function (resolve, reject) {
        that.postData(that.dbUrl, params)
        .then(data => {
             that.data = data.resolve;
            resolve(that.data);  
        }) // JSON from `response.json()` call
        .catch(error => reject(error))
      });
    }

    refresh(){
      let table = this.getAttribute('table') || '_default';
//      let user=store.get('user');
      let uid = window['uid'];
      let params = {
          "action": "searchData",
          "index": uid,
          "type": this.table,
          "body": this.query,
          "from":this.from,
          "size":this.size
      }
      console.log('Refresh',params);
        this.postData(this.dbUrl, params)
        .then(data => {
            console.log('Refresh Data',data,this.table,params);
            this.setAttribute('data', data.resolve);
            this.data = data.resolve;
            // this.buildHtml(data.resolve);
            this.newBuildHtml(data.resolve);
        }) // JSON from `response.json()` call
        .catch(error => console.error(error))
    }
    updateData(id,data){
      let that = this;
      let index = uid;
      let table = this.getAttribute('table') || "_default";
      delete data['_id'];
      
      let params = {
        "action": "addData",
        "index": window['uid'],
        "type": table,
        "id":id,
        "body": data
        // "sort":[{"發佈日期":"desc"}]
      } 

      this.postData(this.dbUrl, params)
      .then(data => {
        console.log('Data',data);
        if (data.code>0){
          console.log('成功更新');
          // alert('成功更新資料');
          // that.refresh();
        }
      }) // JSON from `response.json()` call
      .catch(error => console.error(error))

    }

    addData(){
      let user=store.get('user');
      let uid = user['uid'];
      var title = prompt("請輸入資料標題", "");
      if (!title)
        return;
      let that = this;
      let index = uid;
      let table = this.getAttribute('table') || "_default";
      let id = new Date().getTime();
      let data ={
        "nid": id,
        "標題": title,
        "日期": parseInt(new Date().getTime()/1000)
      }
      let params = {
        "action": "addData",
        "index": index,
        "type": table,
        "id":id,
        "body": data
        // "sort":[{"發佈日期":"desc"}]
      } 

      this.postData(this.dbUrl, params)
      .then(data => {
        console.log('Data',data);
        if (data.code>0){
          alert('成功新增資料');
          that.refresh();
        }
      }) // JSON from `response.json()` call
      .catch(error => console.error(error))

    }
    removeDataByTitle(table){
      let user=store.get('user');
      let uid = user['uid'];
      var title = prompt("請輸入欲刪除資料標題", "");
      if (!title)
        return;

    }

    removeData(id){
      let user=store.get('user');
      let uid = user['uid'];
        let that = this;
          let params = {
            "action": "deleteData",
            "index": window['uid'],
            "type": this.table,
            "id":id
        }
        console.log(params);
          this.postData(this.dbUrl, params)
          .then(data => {
              console.log('Data',data);
              alert('成功刪除');
              that.refresh();
          }) // JSON from `response.json()` call
          .catch(error => console.error(error))


    }

    bulkUpdateData (data) {
      let that = this;
      let params = [];
      data.forEach(item=>{
          item['_id'] = new Date().getTime();
          that.updateData(item['_id'],item);
      });
  }

    postData(url, data) {
      // Default options are marked with *
      
      return new Promise(function (resolve, reject) {
        fetch(url, {
          body: JSON.stringify(data), // must match 'Content-Type' header
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, same-origin, *omit
          headers: {
            // 'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
          },
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // *client, no-referrer
        })
        .then(response => {
          resolve(response.json());
        }) // parses response to JSON
      });
      
    }

    getContent(url){
      console.log('Query Url',url);
      return new Promise(function (resolve, reject) {
        fetch(url)
        .then(response=> 
          resolve(response.text())
          ).catch(error => {
            console.error('Error:', error);
            reject();
          })
      });
    }

    connectedCallback(){

        let that = this;
        
        let menu =   [
          {
          'label':'重載資料',
          'event':'data-refresh',
          'elm':this
          },
          {
            'label':'查詢設定',
            'event':'data-settings',
            'elm':this
          },
          {
            'label':'顯示編輯',
            'event':'data-display',
            'elm':this
          },
          {
            'label':'資料管理',
            'event':'data-management',
            'elm':this
          }
        ];
        this.menu = menu;

        this.getContent(this.query_path).then(result=>{
          console.log('Query Settings',this.query_path,result);
  //        console.log('Setings',result);
          let settings = JSON.parse(result);
          this.table = this.getAttribute('table') || '_default';
          this.query = settings['query'];
          this.field = settings['field'] || [];
          this.from = settings['from'] || 0;
          this.size = settings['size'] || null;
          this.columns = [];
          console.log('Settings Url',result,this.query,this.field);
          this.constructColumns();
          this.refresh();   
  
          // if (result)
          //   this.query = result.json();
          // else 
          //   this.query = {"match_all":{}}
        },err=>{
          console.log('Cannot get content');
        });
    }

  }
);

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + '/' + month + '/' + year;
  return time;
}


function loadModule(url){
  
  let fileref=document.createElement('script');
  
  fileref.setAttribute("type","module");
  fileref.setAttribute("src", url);
  // fileref.setAttribute('defer','');
  // fileref.setAttribute('id','wc-'+id);
  document.getElementsByTagName("head")[0].appendChild(fileref);
  // this.loadedComponent.push(id);


}
function loadScript(url){
  
    let fileref=document.createElement('script');
    
    fileref.setAttribute("type","text/javascript");
    fileref.setAttribute("src", url);
    // fileref.setAttribute('defer','');
    // fileref.setAttribute('id','wc-'+id);
    document.getElementsByTagName("head")[0].appendChild(fileref);
    // this.loadedComponent.push(id);

  
}

function loadStyle(url){
    const ref = document.createElement('link');
    ref.setAttribute('href',url);
    ref.setAttribute('rel','stylesheet');
    document.getElementsByTagName("head")[0].appendChild(ref);

  }


// function postData(url, data) {
//   // Default options are marked with *
  
//   return new Promise(function (resolve, reject) {
//     fetch(url, {
//       body: JSON.stringify(data), // must match 'Content-Type' header
//       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: 'same-origin', // include, same-origin, *omit
//       headers: {
//         'user-agent': 'Mozilla/4.0 MDN Example',
//         'content-type': 'application/json'
//       },
//       method: 'POST', // *GET, POST, PUT, DELETE, etc.
//       mode: 'cors', // no-cors, cors, *same-origin
//       redirect: 'follow', // manual, *follow, error
//       referrer: 'no-referrer', // *client, no-referrer
//     })
//     .then(response => {
//       resolve(response.json());
//     }) // parses response to JSON
//   });
  
// }

//   function matchData(table,json){
//     let that = this;
//     let params = {
//         "action": "searchData",
//         "index": window['uid'],
//         "type": table,
//         "body": {
//             "query":{
//                 "match":json
//             }
//         },
//         "sort":[{"updated":"desc"}]
//     }
//     return new Promise(function (resolve, reject) {
//         postData(that.dbUrl,params).then((result)=> {
//                if (result.code < 0) {
//                     reject();
//                 } else {
//                     resolve(result.resolve);
//                 }
//             });

//         });
//    }

//    function saveData(table,id,data) {
//       let that = this;
//     let json = {
//         "action": "addData",
//         "index": window['uid'],
//         "type": table,
//         "id": id,
//         "body": data
//     }
//     console.log(JSON.stringify(json));
//         return new Promise(function (resolve, reject) {
        
            
      
//         postData(that.dbUrl,json).then((result)=> {
//             console.log(result);
//                if (result.code < 0) {
//                     resolve({});
//                 } else {
//                     resolve(result.resolve);
//                 }
//             });

//         });

//     }
//     function getAllData(table){
//         let that = this;
//         let json = {
//             "action": "searchData",
//             "index": window['uid'],
//             "type": table,
//             "body":{
//                 "query":{
//                     "match_all":{}
//                 }
//             }
//         }
//         console.log('Get all',json);
//         return new Promise(function (resolve, reject) {
        
//             postData(that.dbUrl,json).then((result)=> {
//                     if (result.code < 0) {
//                         resolve({});
//                     } else {
//                         resolve(result.resolve);
//                     }
//                 });
    
//             });

//     }
//     function removeData(table,id){
//         let that = this;
//         let json = {
//             "action": "deleteData",
//             "index": window['uid'],
//             "type": table,
//             "id": id
//         }
//         console.log(JSON.stringify(json));
//         return new Promise(function (resolve, reject) {
        
//             postData(that.dbUrl,json).toPromise().then((result)=> {
//                 console.log(result);
//                     if (result.code < 0) {
//                         resolve({});
//                     } else {
//                         console.log(result.resolve);
//                         resolve(result.resolve);
//                     }
//                 });
    
//             });

//     }
//     function loadData(table,id){
//         let that = this;
//         let json = {
//             "action": "getData",
//             "index": window['uid'],
//             "type": table,
//             "id": id
//         }
//         console.log(json);
//         return new Promise(function (resolve, reject) {
        
//             postData(that.dbUrl,json).then((result)=> {
//                     if (result.code < 0) {
//                         resolve({});
//                     } else {
//                         console.log(result.resolve);
//                         resolve(result.resolve);
//                     }
//                 });
    
//             });

//     }

//     function bulkUpdateData (params) {
//         console.log('Params',params);
//         let that = this;
//         let json ={
//                 'action':'bulkData',
//                 'body':params
//         }
//         console.log(JSON.stringify(json));
//         return new Promise(function (resolve, reject) {
//             postData(dbUrl,json).toPromise().then((result)=>{
//                 console.log(result);
//                     if(result.code>0){
//                         resolve();
//                     }else {
//                         console.log('Error',result.text + ":" + result.err.code);
//                         reject();
//                     }
//             });
//         });
//     }

    function getContent(url){
      console.log('Query Url',url);
      return new Promise(function (resolve, reject) {
        fetch(url)
        .then(response=> 
          resolve(response.text())
          ).catch(error => {
            console.error('Error:', error);
            reject();
          })
      });

    }
