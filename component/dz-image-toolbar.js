
// loadScript("https://dazzle-template.s3.amazonaws.com/cdn6.0/js/src-noconflict/ace.js");
// loadScript("https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.10.3/beautifier.min.js");
// loadScript("https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.10.3/beautify-css.min.js");
// loadScript("https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.10.3/beautify-html.min.js");


customElements.define('dz-image-toolbar',
class extends HTMLElement {
  constructor() {
    super();
      let that = this;
      this.component = 'dz-image-toolbar';
      this.detail = window['curDetail'];
      loadPopupTemplate(this.component,this).then(result=>{
         this.querySelector('#dz-edit').addEventListener('click',e=>{
            console.log('My key',that.key);
            loadPopup('dz-photo-editor',{'key':that.key});
         });     
      });
  }

  changeImage(url){
    this.app.data.image = url;
  }
  show(){
    this.style.display = 'block';
  }
  hide(){
    this.style.display = 'none';
  }

});

function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}
