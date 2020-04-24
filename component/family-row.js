

customElements.define('family-row',
class extends HTMLElement {
  constructor() {
    super();
    console.log('Family Row');
    document.addEventListener('copy-row-up',e=>{
        let elm = window['curTarget'];
        let clm = elm.cloneNode(true);
        console.log('Before',elm,clm);
        elm.parentElement.insertBefore(clm,elm);
    });

    document.addEventListener('copy-row-down',e=>{
      let elm = window['curTarget'];
      let clm = elm.cloneNode(true);
      console.log('After',elm,clm);
      
      insertAfter(clm,elm);
    });

  }
   
    connectedCallback(){
   
     }

});

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
