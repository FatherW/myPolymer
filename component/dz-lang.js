

//

// var script = document.createElement("script");
// script.setAttribute('defer','');
// script.src = "https://unpkg.com/es-module-shims@latest/dist/es-module-shims.js";
// document.head.append(script);

// script = document.createElement("script");
// script.type="importmap-shim";
// script.innerHTML = `
// {
//   "imports": {
//     "lit-html": "https://unpkg.com/lit-html@latest/lit-html.js?module",
//     "lit-element": "https://unpkg.com/lit-element@latest/lit-element.js?module",
//     "lit-html/lit-html.js": "https://unpkg.com/lit-html@latest/lit-html.js?module",
//     "lit-html/lib/shady-render.js": "https://unpkg.com/lit-html@latest/lib/shady-render.js?module"
//   }
// }
// `;
// document.head.append(script);

// script = document.createElement("script");
// script.type="module-shim";
// script.innerHTML = 
// `
// // you can also set a external script src with type "module-shim"
// import { LitElement, html, css } from 'lit-element';

// class XComponent extends LitElement {

//   static get styles() {
//     return css\`
//       :host {
//           position:absolute;
//           right:50px;
//           top:50px;
//           background-color:#14214f;
//           color:white;
//           font-size:12px;
//           padding:5px;
//       }
//       span{
//           cursor:pointer;
//       }
//       span:hover{
//           color:orange;
//       }
//     \`;
//   }


//   render() {
//     return html\`
//       <div class="dz-lang"><span lang="zh">繁</span> | <span lang="cn">簡</span> | <span lang="en">EN</span></div>
//     \`;
//   }
//   handleClick(e) {
//     console.log(e);
//     console.log(this.prop);
//   }
// }

// customElements.define('dz-lang', XComponent);
// `;
// // Add script content

// document.head.appendChild(script);

let store =window['store'];

customElements.define('dz-lang',
  class extends HTMLElement {
    constructor() {
      super();
      let thisPage = decodeURIComponent(window.location.pathname).substring(window.location.pathname.indexOf('/') + 1) || 'index.html';
 //     const temid = this.getAttribute('template');
 //     const template = document.getElementById(temid);
       const tid= document.querySelector('meta[tid]').getAttribute('tid');
        const fullpath = 'template/'+tid+'/DZ-LANG/template';
//        const shadowRoot = this.attachShadow({mode: 'open'});

      let that=this;
      console.log('DZ Lang',fullpath,tid);
      $.get(fullpath, function(html){          
        // const html = e['detail']['template'];
        const template = document.createElement('template');
        template.innerHTML = html;
        const templateContent = template.content;
//        shadowRoot.appendChild(style);
        that.appendChild(templateContent.cloneNode(true));
 
      });

      this.addEventListener('click',e=>{
          console.log('Click',e);
          const lang = e.target.getAttribute('lang') || null;

          if (lang){
              store.set('thisLang',lang);
              location.reload();
          }

      });

      // document.querySelector('dz-lang').shadowRoot.querySelector('span').forEach(item=>{
      //   item.addEventListener('click',(e)=>{
      //     console.log(e);
      //     let lang = e.target.setAttribute('lang');
      //       location.href = lang+'/'+thisPage;
      //   });
      // });


      //      console.log('Lang',shadowRoot.querySelector('dz-lang::shadow span'));

      // document.querySelector('dz-lang').shadowRoot.querySelector('span')[0].addEventListener('click',(e)=>{
      //     console.log(e);
      //     let thisPage = decodeURIComponent(window.location.pathname).substring(window.location.pathname.indexOf('/') + 1) || 'index.html';
      //     let lang = e.target.setAttribute('lang');
      //       location.href = lang+'/'+thisPage;
      //   });
      


      // this.addEventListener('get-template',e=>{
      //     const html = e['detail']['template'];
      //     const template = document.createElement('template');
      //     template.innerHTML = html;
      //     const templateContent = template.content;
      //     const shadowRoot = this.attachShadow({mode: 'open'});
      //     shadowRoot.appendChild(style);
      //     shadowRoot.appendChild(templateContent.cloneNode(true));
         
      // });
      

    

  

  }


});