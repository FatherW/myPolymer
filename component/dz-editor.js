
loadScript("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/js/medium-editor-5.23.1.min.js");
loadStyle("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/medium-editor-5.23.1.min.css");

customElements.define('dz-editor',
class extends HTMLElement {
  constructor() {
    super();
    let that = this;
    let editor;
    this.loadEditor();
  }


  connectedCallback(){
     let that = this;

     let menu =   [
      {
      'label':'儲存',
      'event':'save-editor',
      'elm': this
      },
      {
        'label':'編輯源碼',
        'event':'code-editor',
        'elm':this
      },
      {
        'label':'離開',
        'event':'exit-editor',
        'elm':this
      }
    ];
  
    
      


      this.addEventListener('contextmenu',e=>{
        console.log('Context Menu');
        let editMode = store.get('editMode') || 'normal';
        if(editMode==='admin')
          document.dispatchEvent(new CustomEvent('dz-contextmenu', { detail: {'event':e,'element':that,'menu':menu} }));
        e.preventDefault();
        e.stopPropagation();
      });

      this.addEventListener('dblclick',e=>{
          that.removeEditor();
      });
      
      this.addEventListener('save-editor',e=>{
          that.removeEditor();
      });

      this.addEventListener('code-editor',e=>{

      });
      this.addEventListener('exit-editor',e=>{
          that.removeEditor();
      });

  }
  loadEditor() {
    //    console.log('Load Editor',this.inUse);
        const editMode = store.get('editMode') || 'normal';
      
        if (editMode!=='admin')
          return;
    
        console.log('Load　Editor');
        let SaveButton = MediumEditor.Extension.extend({
          name: 'saveButton',
          init: function () {
              this.button = this.document.createElement('button');
              this.button.classList.add('medium-editor-action');
              this.button.innerHTML = '<i class="fa fa-save"></i>';
              this.on(this.button, 'click', this.handleClick.bind(this));
          },
          getButton: function () {
              return this.button;
          },
          handleClick: function (event) {
          }
      });
    
        let AnchorButton = MediumEditor.Extension.extend({
          name: 'anchorButton',
          init: function () {
              this.button = this.document.createElement('button');
              this.button.classList.add('medium-editor-action');
              this.button.innerHTML = '<i class="fa fa-anchor"></i>';
              // this.button.addEventListener('click',(e)=>{
              //   console.log(e,this);
              // });
             this.on(this.button, 'click', this.handleClick.bind(this));
          },
          getButton: function () {
              return this.button;
          },
          handleClick: function (event) {
            console.log('Anchor Selected',event);
            let text;
            let selObj = window.getSelection(); 
            console.log(selObj);
            text = selObj.toString();
            let newAnchor = document.createElement('a');
            let selectedText = selObj.getRangeAt(0);
            newAnchor.href=text.trim();
            console.log(selectedText);
            selectedText.surroundContents(newAnchor);
       
      
      
              // console.log(event);
          }
      
        } );
    
      let youtubeButton = MediumEditor.Extension.extend({
          name: 'youtubeButton',
          init: function () {
              this.button = this.document.createElement('button');
              this.button.classList.add('medium-editor-action');
              this.button.innerHTML = '<i class="fab fa-youtube"></i>';
              this.on(this.button, 'click', this.handleClick.bind(this));
          },
          getButton: function () {
              return this.button;
          },
          handleClick: function (event) {
             console.log('Youtube Selected');
    
    
          }
      });
      let ImageElementButton = MediumEditor.Extension.extend({
          name: 'imageElementButton',
          init: function () {
              this.button = this.document.createElement('button');
              this.button.classList.add('medium-editor-action');
              this.button.innerHTML = '<i class="fa fa-picture-o"></i>';
              this.on(this.button, 'click', this.handleClick.bind(this));
          },
          getButton: function () {
              return this.button;
          },
          handleClick: function (event) {
              let html = "<img src='http://dazzle.website/image/lgo.png' />";
              // const img: HTMLImageElement= this.renderer.createElement('img');
           
              let selObj = window.getSelection(); 
              console.log(selObj);
              let selectedText = selObj.getRangeAt(0);
              // selectedText.collapse (false);
              let img = document.createElement("img");
    //          newNode.appendChild(document.createTextNode("hello"));
              img.src = 'http://dazzle.website/image/lgo.png' ;   
              selectedText.insertNode(img);
    
          }
      });
    
          
          //target.wrap("<m-editor></m-editor>");      
          // console.log('Load',target);
    
          this.editor = new MediumEditor(this,
            {   autoLink: false,
              buttonLabels: 'fontawesome',
              placeholder: false,
              imageDragging: false,
              anchorPreview: false,
              static: true,
               paste: {
                  /* This example includes the default options for paste,
                     if nothing is passed this is what it used */
                  forcePlainText: false,
                  cleanPastedHTML: true,
                  cleanReplacements: [],
                  cleanAttrs: ['class', 'style', 'dir'],
                  cleanTags: ['meta'],
                  unwrapTags: []
              },
              toolbar: {
                  buttons: ['saveButton','youtubeButton', 'anchorButton', 'imageElementButton',  'fontsize', 'bold', 'italic', 'underline', 'orderedList', 'unorderList', 'justifyLeft', 'justifyRight', 'justifyCenter', 'justifyFull', 'removeFormat', 'h1', 'h2', 'h3', 'p'],
                  static: true,
                  sticky: true,
                  updateOnEmptySelection: true
              },
    
              extensions: {
                  'saveButton': new SaveButton(),
                  'youtubeButton': new youtubeButton(),
                  'imageElementButton': new ImageElementButton(),
                  'anchorButton': new AnchorButton(),
              },
               keyboardCommands: {
                      /* This example includes the default options for keyboardCommands,
                         if nothing is passed this is what it used */
                      commands: [
                        {
                          command: 'saveButton',
                          key: 'S',
                          meta: true,
                          shift: false,
                          alt: false
                        },
                        {
                              command: 'bold',
                              key: 'B',
                              meta: true,
                              shift: false,
                              alt: false
                          },
                          {
                              command: 'italic',
                              key: 'I',
                              meta: true,
                              shift: false,
                              alt: false
                          },
                          
                          {
                              command: 'fieldButton',
                              key: 'F',
                              meta: true,
                              shift: false,
                              alt: false
                          },
                          {
                              command: 'anchorButton',
                              key: 'A',
                              meta: true,
                              shift: false,
                              alt: false
                          },
                          {
                          command: 'imageElementButton',
                              key: 'I',
                              meta: true,
                              shift: true,
                              alt: false
                          },
    
                          {
                              command: 'underline',
                              key: 'U',
                              meta: true,
                              shift: false,
                              alt: false
                          }
                      ],
              }
        });  
       
      }

      removeEditor(){
          this.editor.destroy();
          this.outerHTML = this.innerHTML;
      }
}
);


//const slottedSpan = document.querySelector('my-paragraph span');

//console.log(slottedSpan.assignedSlot);
//console.log(slottedSpan.slot);


function loadScript(url){
  const fileref=document.createElement('script');    
  fileref.setAttribute("type","text/javascript");
  fileref.setAttribute("src", url);
  document.getElementsByTagName("head")[0].appendChild(fileref);
}

function loadStyle(url){
  const ref = document.createElement('link');
  ref.setAttribute('href',url);
  ref.setAttribute('rel','stylesheet');
  document.getElementsByTagName("head")[0].appendChild(ref);

}
