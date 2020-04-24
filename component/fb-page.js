

customElements.define('fb-page',
  class extends HTMLElement {
    constructor() {
      super();
        const id = "hkfb";
        let that = this;
        // let h1 = document.createElement('h1');
        // h1.innerHTML = "henry";
        // document.getElementsByTagName('body')[0].appendChild(h1);
        let title = "最新消息";
        this.title = title;
        let path = "https://d25k6mzsu7mq5l.cloudfront.net/template7.0/";
        $.get(path+id+"/head_js", function(head_js){
        $.get(path+id+"/css", function(css){
          $.get(path+id+"/html", function(html){
              
           $.get(path+id+"/body_js", function(body_js){
                  let elm = document.createRange().createContextualFragment(head_js);
                  document.getElementsByTagName('head')[0].appendChild(elm);

                  let template = document.createElement('template');
                  let style = document.createElement('style');
                  style.innerHTML = css;

                  template.setAttribute('id',id);
                  template.innerHTML = html;
                  template.appendChild(style);
                  document.getElementsByTagName('body')[0].appendChild(template);
    //              const temid = this.getAttribute('template');
    //              const template = document.getElementById('hkfb');
                  const templateContent = template.content;
                  // const shadowRoot = this.attachShadow({mode: 'open'});++

                    const styleContent = template.getElementsByTagName('style')[0].innerHTML;
                    console.log('Style Content',styleContent);  
                    // const style = document.createElement('style');
                    style.textContent = styleContent;
                    that.appendChild(style);
                    that.appendChild(templateContent.cloneNode(true));
                    elm = document.createRange().createContextualFragment(body_js);
                    document.getElementsByTagName('body')[0].appendChild(elm);
                });
              });              
          });
      });

    }
    // connectedCallback(){
    //   console.log('This tempid',this.temid);
    //   const temid = this.temid;
    //   const that = this;
    //   document.addEventListener("renew",function(e){
    //     console.log('Renew');
    //     // const temid = this.getAttribute('template');
    //     const template = document.getElementById(temid);
    //         const templateContent = template.content;
    //         const styleContent = template.getElementsByTagName('style')[0].innerHTML;
    //         console.log('Style Content',styleContent);  
    //         const style = document.createElement('style');
    //         style.textContent = styleContent;
    //           that.appendChild(style);
    //           that.appendChild(templateContent.cloneNode(true));
    //   });
    //  }
});