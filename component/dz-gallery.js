
customElements.define('dz-gallery',
  class extends HTMLElement {
    constructor() {
      super();

      const template = document.getElementById('gallery');
      const templateContent = template.content;
      const ele = document.getElementById('dz-gallery');
      // const shadowRoot = this.attachShadow({mode: 'open'});
      
      const style = document.createElement('style');
  /*    style.textContent = `
        div { padding: 10px; border: 1px solid gray; width: 200px; margin: 10px; }
        h2 { margin: 0 0 10px; }
        ul { margin: 0; }
        p { margin: 10px 0; }
        ::slotted(*) { color: gray; font-family: sans-serif; }
      `;
*/
		style.textContent = `
			@import "http://yot.dazzle.website/assets/css/main.css";
		
		`;

//      shadowRoot.appendChild(style);
//      shadowRoot.appendChild(templateContent.cloneNode(true));
        this.appendChild(style);
        this.appendChild(templateContent.cloneNode(true));

  }
});