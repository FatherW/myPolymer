customElements.define('dz-panel',
class extends HTMLElement {
  myName;
  constructor() {
     super();
      let that =this;
//    const shadowRoot = this.attachShadow({mode: 'open'});
 
    this.addEventListener('click',e=>{
        console.log('Click');
        e.preventDefault();
        e.stopPropagation();
    });


    this.addEventListener('contextmenu',e =>{
      console.log('Context Menu');
      document.dispatchEvent(new CustomEvent('show-menu', { 'detail': {'menu':null} }));
      e.preventDefault();
    });

 

    function updateDisplay(e) {
      span.style.display = 'inline-block';
      form.style.display = 'none';
      span.textContent = input.value;
      input.style.width = span.clientWidth + 'px';
      // this.myName = input.value;
      // console.log(input.value,this.myName);
      // console.log('Update',e);

    }
  }



  showName(e){
    console.log('My Name is:',e);
  }
  static get observedAttributes() {
      return ['name'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case 'name':
          console.log(`Value changed from ${oldValue} to ${newValue}`);
          this.myName = newValue;
          break;
      }
    }
}
);