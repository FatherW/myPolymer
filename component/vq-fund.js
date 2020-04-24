customElements.define('vq-fund',
  class extends HTMLElement {
    constructor() {
      super();

      const template = document.getElementById('vq-fund-index.html');
      const templateContent = template.content;
      // const shadowRoot = this.attachShadow({mode: 'open'});++
      const styleContent = template.getElementsByTagName('style')[0].innerHTML;
      console.log('Style Content',styleContent);  
      const style = document.createElement('style');
    		style.textContent = styleContent;
        this.appendChild(style);
        this.appendChild(templateContent.cloneNode(true));

  }
});