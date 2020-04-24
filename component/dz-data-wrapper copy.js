

customElements.define('dz-data-wrapper',
  class extends HTMLElement {
    constructor() {
      super();
      loadStyle("https://www.htmlelements.com/demos/source/styles/smart.default.css");
      loadScript("https://www.htmlelements.com/demos/source/webcomponents-lite.js");
      loadModule("https://www.htmlelements.com/demos/source/modules/smart.element.js");

      let that = this;
      let table = this.getAttribute('table') || '_default';
      let dbUrl = "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController";
      const template = document.querySelector('meta[tid]').getAttribute('tid');
      let id= this.getAttribute('id') || '_default';
      let user = store.get('user');
      let uid = user['uid'];
      this.query_path = "//"+ uid+'.dazzle.website/template/'+template+'/DZ-DATA-WRAPPER/'+id+'/settings.json';
      this.field_path = "//"+ uid+'.dazzle.website/template/'+template+'/DZ-DATA-WRAPPER/'+id+'/field.json';
      console.log('Query',this.query_path,this.field_path);
      
      this.getContent(this.query_path).then(result=>{
        console.log('Setings',result);
        let settings = JSON.parse(result);
        this.query = settings['query'];
        this.field = settings['field'];
        console.log('Settings Url',result,this.query,this.field);

        // if (result)
        //   this.query = result.json();
        // else 
        //   this.query = {"match_all":{}}
      });

      // this.getContent(this.field_path).then(result=>{
      //   console.log('Field Url',result,id);
      //   this.field = result;
      //   // if (result)
      //   // this.field = result.json();
      //   // else
      //   //   this.field = [];
      // });


      this.refresh();   

      let allow_menu = ["DZ-DATA-ITEM"];
     

      document.dispatchEvent(new CustomEvent('allow-menu', { detail: {'component':that.tagName,'menu':allow_menu} }));

        
      
      // Remove Data

      // Add Data 
      this.addEventListener('add-data',e=>{
        that.addData();
      });

      // Update Data
      this.addEventListener('update-data',e=>{
        that.refresh();
      });
      this.addEventListener('remove-data',e=>{
          let id = e['detail']['data-id'];
          let table = that.getAttribute('table') || "_default";
          console.log('Remove Data',e);
          // let table = table;
         that.removeData(table,id);
      });
      // Init Menu
     
   
    }
   
  
    newBuildHtml(data){
      let html= '';
      let that = this;
      let editMode = store.get('editMode') || 'normal';
      this.innerHTML ='';
      if (editMode==='admin') 
        this.innerHTML = '<dz-data-button></dz-data-button>';
      let tid = this.getAttribute('tid') || '_default';
      let elm;
      data.forEach(item=>{
          let html = document.createElement('dz-data-item');
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
                  elm.setAttribute('href',item[f['field']]);
                  elm.innerHTML = item[f['field']];
                break;

                case 'date':
                  elm = document.createElement('span');
                  elm.innerHTML = timeConverter(item[f['field']]);
                break;
              }
              html.appendChild(elm);              
          });
          console.log('Build HTML',that,html);
         that.appendChild(html);
      });


    }
    buildHtml(data){
      let html= '';
      let that = this;
      let editMode = store.get('editMode') || 'normal';
      this.innerHTML ='';
      if (editMode==='admin') 
        this.innerHTML = '<dz-data-button></dz-data-button>';
      let tid = this.getAttribute('tid') || '_default';
      data.forEach(function(d){
          let date= timeConverter(d['日期']);
          let title = d['標題'];
          let nid = d['nid'];
          let content = d['內文'];
          let html = document.createElement('dz-data-item');
          html.setAttribute('tid',tid);
          let div = document.createElement('div');
          div.setAttribute('slot','nid');
          div.setAttribute('data-id',nid);
          html.appendChild(div);
          
          let a = document.createElement('a');
          a.setAttribute('slot','標題');
          a.setAttribute('href',nid+'.html');
          a.innerHTML = title;
          html.appendChild(a);

      
          div = document.createElement('div');
          div.setAttribute('slot','日期');
          div.innerHTML = date;
          html.appendChild(div);
          html.setAttribute('data-id',nid);

          that.appendChild(html);


//          html = '<fb-news-item><div slot="ID" data-id="'+id+'"></div><a slot="title" href="'+item+'">'+item+'</a></fb-news-item>'+html;
    
      });
    }
    refresh(){
      let table = this.getAttribute('table') || '_default';
      let user=store.get('user');
      let uid = user['uid'];
      let params = {
          "action": "searchData",
          "index": uid,
          "type": table,
          "body": {
              "query":this.query,
              "sort":[
                {
                  "日期":"desc"
                }
              ]
          }
      }
      console.log('Refresh',params);
        this.postData(dbUrl, params)
        .then(data => {
            console.log('Data',data,this);
            this.setAttribute('data', data.resolve);
            this.buildHtml(data.resolve);
            // this.newBuildHtml(data.resolve);
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

      this.postData(dbUrl, params)
      .then(data => {
        console.log('Data',data);
        if (data.code>0){
          alert('成功新增資料');
          that.refresh();
        }
      }) // JSON from `response.json()` call
      .catch(error => console.error(error))

    }
    removeData(table,id){
      let user=store.get('user');
      let uid = user['uid'];
        let that = this;
          let params = {
            "action": "deleteData",
            "index": uid,
            "type": table,
            "id":id
        }
        console.log(params);
          this.postData(dbUrl, params)
          .then(data => {
              console.log('Data',data);
              alert('成功刪除');
              that.refresh();
          }) // JSON from `response.json()` call
          .catch(error => console.error(error))


    }
    postData(url, data) {
      // Default options are marked with *
      return fetch(url, {
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
      .then(response => response.json()) // parses response to JSON
    }

    getContent(url){
      console.log('Query Url',url);
      return fetch(url)
      .then(response=> response.text())
    }

    connectedCallback(){

        let that = this;
        

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