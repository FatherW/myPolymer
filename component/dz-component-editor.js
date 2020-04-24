
loadScript("https://dazzle-template.s3.amazonaws.com/cdn6.0/js/src-noconflict/ace.js");
loadScript("https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.10.3/beautifier.min.js");
loadScript("https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.10.3/beautify-css.min.js");
loadScript("https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.10.3/beautify-html.min.js");


customElements.define('dz-component-editor',
class extends HTMLElement {
  constructor() {
    super();
      let that = this;
      this.detail = window['curDetail'];
      let innerhtml = window['curTarget'].innerHTML;
            console.log('Inner HTML',innerhtml);
        let html = `
        <style>
                #editor { 
                  position: relative;
                  width:100%;
                  min-height:800px;
                  height:100%;
                  font-family:12px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace !important;
              }
              * {
                  font-family: inherit;
              }
              

              .ace_text-layer {
                transform:translate(0px,0px) !important;
                top:0px !important;
              }
              
              
              .ace_gutter-layer{
                transform:translate(0px,0px) !important;
                top:0px !important;
              }
          </style>
        `;
        // <div id="editor" class="editor"></div>
       
            this.innerHTML = html;
            let button = document.createElement('button');
            button.innerHTML = "儲存";
            let button1 = document.createElement('button');
            button1.innerHTML = "關閉";


            this.appendChild(button);
            this.appendChild(button1);

            let ed = document.createElement('div');
            ed.setAttribute('id','editor');
            ed.setAttribute('class','editor');
            this.appendChild(ed);
            // window['ace'] = ace;
            console.log(window);  
            // var beautify = require('js-beautify').js
            // console.log(beautify(innerhtml, { indent_size: 2, space_in_empty_paren: true }));
            // let html_beautify = window['html_beautify'];
            let ace = window['ace'];
            let editor = ace.edit(ed);
            editor.setTheme("ace/theme/twilight");
            editor.session.setMode("ace/mode/javascript");
            editor.setValue(innerhtml);
            editor.resize();

            button.addEventListener('click',e=>{
                let html = editor.getValue();
                console.log('Save',html);
                window['curTarget'].innerHTML = html;
                document.dispatchEvent('save',{});
            });
            button1.addEventListener('click',e=>{
              that.dispatchEvent('close-window',{});              
            });
        
            // elm = document.createRange().createContextualFragment(body_js);
            // document.getElementsByTagName('body')[0].appendChild(elm);
            

  }

});

function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}
