// loadModule("https://www.htmlelements.com/demos/source/modules/smart.datetimepicker.js");
loadModule("https://www.htmlelements.com/demos/source/modules/smart.tabs.js");
loadModule("https://www.htmlelements.com/demos/source/modules/smart.button.js");
loadScript("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/js/aws-sdk-2.83.0.min.js");

customElements.define('dz-data-settings-popup',
class extends HTMLElement {
  constructor() {
    super();
       const id = this.getAttribute('id') || '_default';
      const user = store.get('user');
      window['user'] = user;
      this.user = user;
       const editMode = store.get('editMode') || 'normal';
       let dataset = window['curTarget'];
       this.curTarget = dataset;
       let allow_menu = [];
       let dataWrapper = window['curTarget'];
       console.log('Fields',window,dataWrapper.field);

       let that = this;
       document.dispatchEvent(new CustomEvent('allow-menu', { detail: {'component':that.tagName,'menu':allow_menu} }));

        this.selectedRows =[];
       let path = "https://d25k6mzsu7mq5l.cloudfront.net/file7.0/DZ-DATA-SETTINGS-POPUP/template?id="+new Date().getTime();
        console.log('Current target',window['curTarget']);
       fetch(path)
       .then(function(response) {
           // When the page is loaded convert it to text
           return response.text()
       })
       .then(function(html) {
            that.innerHTML = html;

            const tabs =document.querySelector('smart-tabs');

            window['tabs'] = tabs;
            console.log(window);
            //tabs.className = 'auto-height';
            // let dataSource=[];
            // dataWrapper.field.forEach(item=>{
            //     let label = item['field'];
            //     dataSource.push({
            //         'label': label,
            //         'content': item['type']
            //     });
            // });
            // tabs.dataSource = dataSource;

// <smart-tab-item label="Item One">Content One</smart-tab-item>
            tabs.innerHTML = '';
             let dataSource=[];
            dataWrapper.field.forEach(item=>{
                let label = item['field'];
                // dataSource.push({
                //     'label': label,
                //     'content': item['type']
                // });

                tabs.insert(0, { label: label, content: item['type'] });

                // let sItem = document.createElement('smart-tab-item');
                // sItem.setAttribute('label',label);
                // sItem.innerHTML =item['type'];
                // tabs.appendChild(sItem);    
              });
            tabs.dataSource = dataSource;
            that.querySelector('#dz-add-schema').addEventListener('click',e=>{
                  console.log('Add Schema');
                  // let sItem = document.createElement('smart-tab-item');
                  // sItem.setAttribute('label','New Field');
                  // sItem.innerHTML ="請輸入類型";
                  // tabs.appendChild(sItem);    
                  // tabs.dataSource.push({ label: 'New Field', content: '請選擇欄目類型' });
                  var field = prompt("輸入欄位名稱");
                  if (!field){
                    alert('欄位名稱不能為空');
                    return;
                  }
                  tabs.insert(0, { 'label': field, 'content': '請選擇欄目類型' });
                  console.log(tabs.dataSource);                
            });
        });
    }

    select(Key){
      console.log(window['curTarget']);
      window['curTarget'].dispatchEvent(new CustomEvent('select-link', { detail: {'value':Key} }));
      this.dispatchEvent(new CustomEvent('close',{}));
    }
    loadFiles(){

    }
 
    connectedCallback(){
   
    }
});

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

  function listFile(prefix){
    // const bucket = this.user.myUser['userBucket'];
    const user = window['user'];
    const key = user['key'];
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
                Bucket: user['userBucket'],
                Prefix: prefix
            };
            s3.listObjects(params, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.Contents.sort(compare));
                }
            });

            function compare(a,b){
              return b.LastModified -a.LastModified;
            }
    });
}
window.onload = function () {
  const tabs = document.querySelector('smart-tabs');
  
  tabs.className = 'demoTabs';

  tabs.dataSource = [
      {
          label: 'Group 1',
          content: 'Content 1',
          selected:true
      },
      {
          label: 'Item 2',
          content: 'Content 2'
      },
      {
          label: 'Item 3',
          content: 'Content 3',
      }
  ]
}