

customElements.define('dz-page-tab',
class extends HTMLElement {
  constructor() {
    super();
       const template = document.querySelector('meta[tid]').getAttribute('tid');
       const uid = document.querySelector('meta[uid]').getAttribute('uid');
       const id = this.getAttribute('id') || '_default';
       const user = store.get('user');
      let that = this;
      let path,fullpath;
      let thisPage = decodeURIComponent(window.location.pathname).substring(window.location.pathname.indexOf('/') + 1) || 'index.html';
      let editMode = store.get('editMode') || 'normal';
      
      if (editMode ==="admin")
          thisPage = store.get('thisPage');
      // path = "http://"+uid+'.dazzle.website/template/'+template+'/DZ-PAGE-BLOCK/';

      path = 'template/'+template+'/DZ-PAGE-BLOCK/';
      
    console.log('Path',path);
    //  let path = "https://d25k6mzsu7mq5l.cloudfront.net/template7.0/";

  
        fullpath = path+"_master/"+thisPage+'/html';
      if (!UrlExists(fullpath))
          fullpath = path+"_master/about-us/html";

      console.log('Component Path',fullpath,thisPage,editMode);
      this.fullpath = fullpath;

      fullpath = fullpath +"?id="+new Date().getTime();
      console.log('Full Path',fullpath);

       fetch(fullpath)
       .then(function(response) {
           // When the page is loaded convert it to text
           return response.text()
       })
       .then(function(html) {
         var doc;
         if (!html)
            html = "<p>請填上相關文字</p>";
         that.innerHTML = html;
 
      });



    }

    connectedCallback(){
      // console.log('This tempid',this.template,this.id);
      const template = document.querySelector('meta[tid]').getAttribute('tid');
 //     const template = this.template;
      const that = this;
      let master = this.hasAttribute('master') || false;
      let thisPage = decodeURIComponent(window.location.pathname).substring(window.location.pathname.indexOf('/') + 1) || 'index.html';
      let content;

      // console.log('HTML',this,this.innerHTML);
      let key = this.fullpath;
      // let path = 'template/'+template+'/DZ-PAGE-BLOCK/';
      // if (master){
      //     key = path+"_master/"+this.id+'/html';
      // } else {
      //     key = path + thisPage+'/html';
      // }
      console.log('Key',key);
      document.addEventListener("save",function(e){
            const json = {
                'key': key,
                'content':that.innerHTML
            };
            console.log('Save File',json);
            document.dispatchEvent(new CustomEvent('save-file', { detail: json }));

      });
     }

});

function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

function loadScript(url){
//  let com = document.createElement(id);
  // let url ="https://d25k6mzsu7mq5l.cloudfront.net/component/"+id+".js";
  //let url="https://d25k6mzsu7mq5l.cloudfront.net/component/"+id+".js?id="+new Date().getTime();
  
    let fileref=document.createElement('script');
    
    fileref.setAttribute("type","text/javascript");
    fileref.setAttribute("src", url);
    // fileref.setAttribute('defer','');
    // fileref.setAttribute('id','wc-'+id);
    document.getElementsByTagName("head")[0].appendChild(fileref);
    // this.loadedComponent.push(id);

  
}

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
