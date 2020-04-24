
// loadStyle("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/smart.default.css");
loadScript("https://d25k6mzsu7mq5l.cloudfront.net/cdn7.2/js/dazzle.common.js");
// loadModule("https://www.htmlelements.com/demos/source/modules/smart.accordion.js");

customElements.define('jitpo-header2',
class extends HTMLElement {
  constructor() {
    super();
       const id = this.getAttribute('id') || '_default';
      //  this.uid = window['uid'];
      //  this.tid = window['tid'];
       const user = store.get('user') || null;
        const position = this.getAttribute('position') || 'left';
      let that = this;
      this.submenu = false;
      this.removeAttribute('hidden');
      getContent('template/jitpo/DZ-PAGE-BLOCK/_master/_header/html').then(html=>{
          this.innerHTML = html;
          let submenu = document.querySelector('#submenu');
          let button = this.querySelector('#submenu-button');
          button.addEventListener('click',e=>{                    
            console.log('Click',e.target);
            // console.log('Hidden',sidebar.hidden);          
            // sidebar.hidden = !sidebar.hidden;            
            that.submenu = !that.submenu;
            console.log('submenu',submenu,that.submenu);
            if (that.submenu)
                submenu.style.display='none';
            else
              submenu.style.display="block";
          });
      });


    // this.innerHTML =
    // `
    //       <dz-page-block id="_header" master></dz-page-block>
    // `;
      


     


  

}

    connectedCallback(){
   
      // window.addEventListener('resize', e=>{
      //   const width = event.target.innerWidth;
      //   if (width>640) {
      //     this.querySelector('#_sidebar').;
      //   }
      // });

    }

});
