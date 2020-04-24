// loadModule("https://www.htmlelements.com/demos/source/modules/smart.datetimepicker.js");
loadModule("https://www.htmlelements.com/demos/source/modules/smart.cardview.js");
loadModule("https://www.htmlelements.com/demos/source/modules/smart.button.js");
loadModule("https://www.htmlelements.com/demos/source/modules/smart.tabs.js");
loadScript("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/js/aws-sdk-2.83.0.min.js");

customElements.define('dz-image-editor',
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

       let that = this;
       this.generateData();

       document.dispatchEvent(new CustomEvent('allow-menu', { detail: {'component':that.tagName,'menu':allow_menu} }));

        this.selectedRows =[];
       let path = "https://d25k6mzsu7mq5l.cloudfront.net/file7.0/DZ-IMAGE-EDITOR/template?id="+new Date().getTime();
      
       fetch(path)
       .then(function(response) {
           // When the page is loaded convert it to text
           return response.text()
       })
       .then(function(html) {
            that.innerHTML = html;


        });
    }

    generateData() {
      const sampleData = [];
      const maxAttachments = 1;
      let ext;
    
        listFile('files/').then(result=>{
          console.log('Result',result);
          result.forEach(res=>{
            let src = "http://"+window['uid']+'.dazzle.website/'+res['Key'];
            if (res['Key'].indexOf('.')>-1)
              ext = res['Key'].substr(res['Key'].lastIndexOf('.') + 1);
            let row = {};
            row.fileName = res['Key'];
            row.fileSize = res['Size'];
            row.fileType= ext;
            row.LastModified = res['LastModified'];
            row.attachments = src;
            sampleData.push(row);
          });
        });
        this.myFiles = sampleData;
//      return sampleData;
    }

    
    fileType(Key){
      let ext="file"; 
      if (Key.indexOf('.')>-1)
        ext = Key.substr(Key.lastIndexOf('.') + 1);

        switch(ext){
          case 'jpg':
          case 'jpeg':
          case 'png':
          case 'gif':
            return 'image';
          break;

          default:
            return 'file';
          break;
        }

      return 'file';
    }
    select(Key){
      console.log(window['curTarget']);
      window['curTarget'].dispatchEvent(new CustomEvent('select-link', { detail: {'value':Key} }));
      this.dispatchEvent(new CustomEvent('close',{}));
      this.dispatchEvent(new CustomEvent('close-window',{}));
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
    const user = window['user'] || store.get('user') || null;
    console.log(user);
    const key = user['key'] || null;
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
function generateData() {
  const sampleData = [];
  const maxAttachments = 1;
  let ext;

    listFile('files/').then(result=>{
      console.log('Result',result);
      result.forEach(res=>{
        let src = "http://"+window['uid']+'.dazzle.website/'+res['Key'];
        if (res['Key'].indexOf('.')>-1)
          ext = res['Key'].substr(res['Key'].lastIndexOf('.') + 1);
        let row = {};
        row.fileName = res['Key'];
        row.fileSize = res['Size'];
        row.fileType= ext;
        row.LastModified = res['LastModified'];
        row.attachments = [src];
        sampleData.push(row);
      });
    });

  return sampleData;
}



