// loadModule("https://www.htmlelements.com/demos/source/modules/smart.datetimepicker.js");
// loadModule("https://www.htmlelements.com/demos/source/modules/smart.accordion.js");
loadModule("https://www.htmlelements.com/demos/source/modules/smart.button.js");
loadScript("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/js/aws-sdk-2.83.0.min.js");

customElements.define('dz-image-management',
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
       document.dispatchEvent(new CustomEvent('allow-menu', { detail: {'component':that.tagName,'menu':allow_menu} }));

        this.selectedRows =[];


       let path = "https://d25k6mzsu7mq5l.cloudfront.net/file7.0/DZ-IMAGE-MANAGEMENT/template?id="+new Date().getTime();
      
       fetch(path)
       .then(function(response) {
           // When the page is loaded convert it to text
           return response.text()
       })
       .then(function(html) {
            that.innerHTML = html;
            console.log('User',store.get('user'));
            listFile('files/').then(res=>{
                console.log('Result',res);
                let h3 = document.createElement('h3');
                let elm;
                res.forEach(item=>{
                  elm = h3.cloneNode(true);
                  elm.innerHTML = item['Key'];
                  elm.addEventListener('click',e=>{
                    console.log('Click',item['Key']);
                      that.select(item['Key']);
                  });
                  that.querySelector('#fileList').appendChild(elm);              
                });

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

    isImage(str){
      console.log(str);
    if (str.indexOf('.jpg')>-1)
      return true;
    if (str.indexOf('.jpeg')>-1)
      return true;
    if (str.indexOf('.png')>-1)
      return true;
    if (str.indexOf('.svg')>-1)
      return true;
      console.log(str);

      return false;
    }

   onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
   
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  
  uploadAll(){
    const  fileReader = new FileReader();
    let data;
    console.log('Upload All');
      for(let i=0;i<this.files.length;i++) {
          console.log(this.files[i]);
          console.log(this.files[i]);   
          
          // data = fileReader.readAsBinaryString(this.files[i]);
          this.aws.saveMyImage(this.files[i],this.user.myUser['uid']).then((json)=>{
              console.log(json);
          });

      }
  }


    pre_select(item){
      this.myImage = item;
      // this.user.curElement.src = "https://d1xlk80q2h0qiy.cloudfront.net/images/"+this.user.myUser['uid']+"/large-web/"+item['gid']+".jpg";
      let emitter = window['dzEmitter'] || document;
  //    this.user.curElement.src = this.myImageUrl(item);
      this.event.menuTarget.src = this.myImageUrl(item);
      let json = {
        'selected':this.myImageUrl(item)
      }
      this.event.eventEmitter('gallery-image-selected',json,emitter);
      this.close();
  
     }
  
     myImageUrl(item){
       return "//"+this.user.myUser['uid']+'.dazzle.website/'+item;
     }
    load(){
         
  
      let params = {};
  
     
  
                this.aws.listFile('files/').then((result)=>{
                  console.log('Result',result);
                  // result.forEach();
                  result.forEach(item=>{
                      if (this.isImage(item.Key))
                        this.images.push(item.Key);
                  });
  
                });
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
