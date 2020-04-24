

customElements.define('dz-page-2',
class extends HTMLElement {
  constructor() {
    super();
      const id = this.getAttribute('template') || 'default';
      const thisPage = decodeURIComponent(window.location.pathname).substring(window.location.pathname.indexOf('/') + 1) || 'index.html';
      let that = this;
      // let h1 = document.createElement('h1');
      // h1.innerHTML = "henry";
      // document.getElementsByTagName('body')[0].appendChild(h1);
     // let title = "最新消息";
     // this.title = title;
      let path = "https://d25k6mzsu7mq5l.cloudfront.net/template7.0/"+id+"/DZ-PAGE-2/"+thisPage;
      $.get(path+"/head_js?id="+new Date().getTime(), function(head_js){
      $.get(path+"/css?id="+new Date().getTime(), function(css){
        $.get(path+"/html?id="+new Date().getTime(), function(html){
            
         $.get(path+"/body_js?id="+new Date().getTime(), function(body_js){
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

  //  }
});