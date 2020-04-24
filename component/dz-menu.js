
customElements.define('dz-menu',
  class extends HTMLElement {
    constructor() {
      super();
      const temid = this.getAttribute('template');
      const template = document.getElementById(temid);
      const templateContent = template.content;
      const ele = document.getElementById('dz-menu');
      // const shadowRoot = this.attachShadow({mode: 'open'});
      
      const style = document.createElement('style');

//      shadowRoot.appendChild(style);
//      shadowRoot.appendChild(templateContent.cloneNode(true));
       this.appendChild(style);
        this.appendChild(templateContent.cloneNode(true));

  }
});