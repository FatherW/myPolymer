
// loadScript("http://code.jquery.com/jquery-1.10.2.js");

customElements.define('dz-youtube',
class extends HTMLElement {
  constructor() {
    super();
       const template = document.querySelector('meta[tid]').getAttribute('tid');
       const uid = document.querySelector('meta[uid]').getAttribute('uid');
       const id = this.getAttribute('id') || '_default';
       const user = store.get('user');
       const url = this.getAttribute('src') || 'https://www.youtube.com/embed/y4vb3LS4KPA';

        this.renewYoutube(url);

    }

    renewYoutube(url){
      let iframe = document.createElement('iframe');
      iframe.setAttribute('src',url);
      iframe.setAttribute('frameborder',0);
      iframe.setAttribute('allowfullscreen','');
      this.innerHTML = '';
      this.appendChild(iframe);
    }
    connectedCallback(){
      let that = this;
      const editMode = store.get('editMode') || 'normal';
      if (editMode==='admin'){
        let button = document.createElement('button');
        button.innerHTML = '更新';
        button.style.position = 'absolute';
        button.style.top = '0px';
        button.style.left = '0px';
        button.addEventListener('click',e=>{
            let url = prompt("請貼上你的youtube 連結");
            if (!url)
              return;
            that.setAttribute('src',url);
            that.renewYoutube(url);
        });
        this.appendChild(button);
      }
      document.addEventListener("save",function(e){
            // const json = {
            //     'key': key,
            //     'content':that.innerHTML
            // };
            // console.log('Save File',json);
            // document.dispatchEvent(new CustomEvent('save-file', { detail: json }));

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
