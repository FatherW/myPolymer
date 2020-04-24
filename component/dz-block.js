

customElements.define('dz-block',
class extends HTMLElement {
  constructor() {
    super();
       const template = document.querySelector('meta[tid]').getAttribute('tid');
       const id = this.getAttribute('id') || '_default';
       const user = store.get('user');
      let that = this;
      let path,fullpath;
      path = "http://"+user['userBucket']+'/template/'+template+'/DZ-PAGE-BLOCK/';
    console.log('Path',path);
    //  let path = "https://d25k6mzsu7mq5l.cloudfront.net/template7.0/";
      let thisPage = decodeURIComponent(window.location.pathname).substring(window.location.pathname.indexOf('/') + 1) || 'index.html';
  
      let master = this.hasAttribute('master');
      if (master){
        fullpath = path+"_master/"+id+'/html';
      }
      else {
        fullpath = path+thisPage+'/html';    
      }
      if (!UrlExists(fullpath))
          fullpath = path+"_default/html";

      // console.log('Component Path',fullpath);

      fullpath = fullpath +"?id="+new Date().getTime();
      console.log('Full Path',fullpath);
        $.get(fullpath, function(html){          
            // console.log('Component HTML',fullpath,html);  
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
      let key;
      let path = 'template/'+template+'/DZ-PAGE-BLOCK/';
      if (master){
          key = path+"_master/"+this.id+'/html';
      } else {
          key = path + thisPage+'/html';
      }
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
