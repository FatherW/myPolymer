

customElements.define('dz-css',
class extends HTMLElement {
  constructor() {
    super();
      let that = this;

      this.css = '';
      this.getContent('template/dnamatch/index.html/css').then(css=>{
        let elm = document.createRange().createContextualFragment(css);
        elm.querySelectorAll('link').forEach(e=>{
              let href = e.getAttribute('href');
              console.log('HREF',href);
              that.getContent(href).then(html=>{
                    that.css += html;
                    // that.style +=html;
              });
        });
        // console.log(that.style);
        // console.log('Style',window['_style']);
      });
  

  }
  getContent(url){
    console.log('Query Url',url);
    return new Promise(function (resolve, reject) {
 
      fetch(url)
      .then(function(response) {
          // When the page is loaded convert it to text
          resolve(response.text());
      });
    });

  }
  connectedcallback(){
    window['_style'] = that.css;
    console.log('Window',window['_style']);
  }
});
