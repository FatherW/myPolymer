
      loadStyle("https://d25k6mzsu7mq5l.cloudfront.net/smart/smart.default.css");
      loadScript("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/js/webcomponents-lite.js");
      loadModule("https://d25k6mzsu7mq5l.cloudfront.net/smart/smart.element.js");
      loadScript("https://unpkg.com/ag-grid-community/dist/ag-grid-community.min.js");
      loadScript("https://d25k6mzsu7mq5l.cloudfront.net/backend7.0/fieldRenderer.js");
      loadScript("https://d25k6mzsu7mq5l.cloudfront.net/component/dz-data-item.js");
//      loadScript("https://d25k6mzsu7mq5l.cloudfront.net/component/dz-grid.js?id="+new Date().getTime());


customElements.define('dz-data-wrapper2',
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
      this.query_path = 'http://'+uid+'.dazzle.website/template/'+template+'/DZ-DATA-WRAPPER2/'+id+'/settings.json?id='+new Date().getTime();
      
      // this.query_path = 'template/'+template+'/DZ-DATA-WRAPPER2/'+id+'/settings.json?id='+new Date().getTime();
      
//      this.field_path = '/template/'+template+'/DZ-DATA-WRAPPER2/'+id+'/field.json';
  
      


      // this.parise();

      // this.getContent(this.field_path).then(result=>{
      //   console.log('Field Url',result,id);
      //   this.field = result;
      //   // if (result)
      //   // this.field = result.json();
      //   // else
      //   //   this.field = [];
      // });



      let allow_menu = [];
     

      document.dispatchEvent(new CustomEvent('allow-menu', { detail: {'component':that.tagName,'menu':allow_menu} }));

        
      
      // Remove Data

      // Add Data 
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
      this.key = 'ID';

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
      console.log('Columns',this.columns);
    }
    newBuildHtml(data){
      console.log('New Data',this,data);
      // let html= '';
      let html;
      let that = this;
      let editMode = store.get('editMode') || 'normal';
      if (!data.length) {
        this.innerHTML ='暫無資料';
        return;
      }
      // if (editMode==='admin') 
      //   this.innerHTML = '<dz-data-button></dz-data-button>';
      let tid = this.getAttribute('tid') || '_default';
      let elm;
      console.log('Data',data);
      // let html = document.createElement('dz-data-item');
      let dz_item = document.createElement('dz-data-item');
      this.innerHTML = '';
      data.forEach(item=>{
          html = dz_item.cloneNode(true);
          html.setAttribute('tid',tid);
          html.data = item;
          html.field = that.field;
          // html.setAttribute('data',  item);
          that.field.forEach(f=>{
            let key = f['key'] || false;
            
              switch(f['type']){
                case 'key':
                  elm= document.createElement('div');
                  elm.innerHTML = item[f['field']];
                  elm.setAttribute('data-id',item[f['field']]);
                break;

                case 'keyword':
                    elm= document.createElement('div');
                    elm.innerHTML = item[f['field']];
                break;

                case 'link':
                  elm= document.createElement('a');
                  elm.setAttribute('href',item[f['field']]+'.html');
                  elm.innerHTML = item[f['field']];
                break;

                case 'date':
                  elm = document.createElement('span');
                  elm.innerHTML = timeConverter(item[f['field']]);
                break;

                case 'file':
                  elm = document.createElement('a');
                  elm.href = item[f['field']];
                  elm.innerHTML = '下載';
                break;
                default:
                  elm= document.createElement('div');
                  elm.innerHTML = item[f['field']];
                break;
              }
              elm.setAttribute('slot',f['field']);
              console.log('Elm',f['field'],elm);
              html.appendChild(elm);              
          });
          // console.log('Build HTML',that,html);
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
      delete data._id;
      let params = {
        "action": "addData",
        "index": window['uid'],
        "type": table,
        "id":id,
        "body": data
        // "sort":[{"發佈日期":"desc"}]
      } 
      console.log('Update Data',params);

      this.postData(this.dbUrl, params)
      .then(data => {
        console.log('Data',data);
        if (data.code>0){
          alert('成功更新資料');
          that.refresh();
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
    postData(url, data) {
      // Default options are marked with *
      
      return new Promise(function (resolve, reject) {
        fetch(url, {
          body: JSON.stringify(data), // must match 'Content-Type' header
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, same-origin, *omit
          headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
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
      return fetch(url)
      .then(response=> 
        response.text())
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
        // this.innerHTML = '檢索資料中......';

        this.getContent(this.query_path).then(result=>{
          console.log('Query Settings',this.query_path,result);
         let settings = JSON.parse(result);
          this.table = this.getAttribute('table') || '_default';
          this.query = settings['query'];
          this.field = settings['field'];
          this.from = settings['from'] || 0;
          this.size = settings['size'] || null;
          console.log('Settings Url',result,this.query,this.field);
          this.constructColumns();
          this.refresh();   
        },err=>{
          console.log('Cannot get content');
        });
        // console.log('Get File');
        // getFile(this.query_path).then(result=>{
        //   console.log('Query Settings',this.query_path,result);
        //  let settings = JSON.parse(result);
        //   this.table = this.getAttribute('table') || '_default';
        //   this.query = settings['query'];
        //   this.field = settings['field'];
        //   this.from = settings['from'] || 0;
        //   this.size = settings['size'] || null;
        //   console.log('Settings Url',result,this.query,this.field);
        //   this.constructColumns();
        //   this.refresh();   
        // },err=>{
        //   console.log('Cannot get content');
        // });


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

  function getFile(key){
    // const bucket = this.user.myUser['userBucket'];
    console.log(window,window['AWS']);
    const user = window['user'];
    const bucket = user['uid']+'.dazzle.website';
        let AWS = window['AWS'];
        AWS.config = new AWS.Config();
        AWS.config.accessKeyId = key['AccessKeyId'];
        AWS.config.secretAccessKey = key['SecretAccessKey'];
        AWS.config.sessionToken = key['SessionToken'];
        AWS.config.region = 'ap-northeast-1';   

        console.log(AWS);

    return new Promise(function (resolve, reject) {
        
            var s3 = new AWS.S3();
            var params = {
                Bucket: bucket,
                Key: key
            };
            s3.getObject(params, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.toString());
                }
            });
    });
}
