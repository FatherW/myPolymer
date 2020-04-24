

customElements.define('dz-hotkey',
class extends HTMLElement {
  constructor() {
    super();
   

    


  }
   
    connectedCallback(){
   
     }

});


console.log('Hotkey');
let clm;


document.addEventListener('keypress',e=>{
    let page = document.querySelector('dz-page');
    if (e.ctrlKey){
      switch(e.key){
          case 'c':
            console.log('Copy');
            window['dz-clip'] = window['curTarget'];
            break;
          
          case 'u':
            console.log('Paste Up');

            let elm = window['curTarget'];
            clm = window['dz-clip'].cloneNode(true);
            elm.parentElement.insertBefore(clm,elm);
            break;

          case 'v':
            console.log('Paste Down',window['dz-clip']);

            clm = window['dz-clip'].cloneNode(true);
            insertAfter(clm,window['curTarget']);
            break;

          case 'e':
            document.dispatchEvent(new CustomEvent('custom-popup', { detail: {'component':'code-editor','size':'big'} }));
          break;

          case 't':
            document.dispatchEvent(new CustomEvent('custom-popup', { detail: {'component':'code-editor','size':'big'} }));
          break;
      }
    }
});

document.addEventListener('keydown',e=>{
  let page = document.querySelector('dz-page');

  console.log(e,window['curTarget'],page);

  switch(e.code){
    case 'Backspace':
    case 'Delete':
        window['curTarget'].remove();
    break;
  }
});



function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
