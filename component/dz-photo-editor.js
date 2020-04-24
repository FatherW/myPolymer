
// loadScript("https://dazzle-template.s3.amazonaws.com/cdn6.0/js/src-noconflict/ace.js");
// loadScript("https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.10.3/beautifier.min.js");
// loadScript("https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.10.3/beautify-css.min.js");
// loadScript("https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.10.3/beautify-html.min.js");


// import { LitElement, html, css } from 'lit-element';

// class parentElement extends LitElement {

//   createRenderRoot() {
//     return this;
//   }

//   render() {
//     return html`
//     <p>
//       You can style me because I'm in the open (light DOM).
//     </p>
//     `;
//   }
// }

// customElements.define('dz-photo-editor', parentElement);



customElements.define('dz-photo-editor',
class extends HTMLElement {
  constructor() {
    super();
      let that = this;
      this.component = 'dz-photo-editor';
      this.detail = window['curDetail'];
      console.log('My Detail',this.detail);
      loadPopupTemplate(this.component,this).then(result=>{
        that.querySelector('#myImage').setAttribute('src',that.detail['key']);
          // that.app = new Smart.App({
          //     selector: "#photo-detail",
          //     data: {
          //         image: that.detail['key']					
          //     }
          // });

//          app.data.image = "http://hkfspa.dazzle.website/files/1907002.jpg";

          this.querySelector('#dz-grab').addEventListener('click',e=>{
              
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
