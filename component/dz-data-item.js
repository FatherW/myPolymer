

customElements.define('dz-data-item',
class extends HTMLElement {
  constructor() {
    super();
    let that = this;
    let id = this.getAttribute('data-id') || null;
    // let menu =   [
    //   {
    //   'label':'更新資料',
    //   'event':'data-update',
    //   'elm': this.parentElement
    //   },
    //   {
    //     'label':'刪除資料',
    //     'event':'remove-data',
    //     'elm': this.parentElement,
    //     'data': {
    //         'data-id':id
    //     }
    //   }
    // ];
    // console.log('Context',menu);
    // this.menu = menu;
    let allow_menu = [];
    this.title = "henry";
    // document.dispatchEvent(new CustomEvent('init-menu', { detail: {'component':that.tagName,'menu':menu} }));
    document.dispatchEvent(new CustomEvent('allow-menu', { detail: {'component':that.tagName,'menu':allow_menu} }));

    
  }


  connectedCallback(){
      let that = this;
      let shadow =that.attachShadow({mode: 'open'});
      let id = this.getAttribute('data-id') || null;
      let menu =   [
        {
        'label':'更新資料',
        'event':'data-update',
        'elm':this
        },
        {
          'label':'刪除資料',
          'event':'remove-data',
          'elm':this.parentElement,
          'data':{
            'data-id':id
          }
        }
      ];
      this.menu = menu;
      console.log('Context',menu);
       let tid = this.getAttribute('tid') || '_default';
       const template = document.querySelector('meta[tid]').getAttribute('tid');
       const uid = document.querySelector('meta[uid]').getAttribute('uid');

       console.log('tid',tid,this,this.getAttribute('tid'));
       let path,fullpath;
      let fields = this.parentElement.field;
      console.log('Fields',this.data,this.field);
       path = "http://"+uid+".dazzle.website/template/"+template+'/DZ-DATA-ITEM/'+tid+'/template?id='+new Date().getTime();
       console.log('Data Path',path);
      
       fetch(path)
       .then(function(response) {
           // When the page is loaded convert it to text
           return response.text()
       })
       .then(function(html) {
         var doc;
 
           console.log('OK to get content');
           const template= document.createElement('template');
           template.innerHTML = html;

           const templateContent = template.content;
           templateContent.querySelectorAll('[dz-data-image]').forEach(item=>{
                  let field = item.getAttribute('dz-data-image') ||'';
                  item.setAttribute('src',that.data[field]);
            });

           templateContent.querySelectorAll('[dz-data-link]').forEach(item=>{
                let field = item.getAttribute('dz-data-link') ||'';
                item.setAttribute('href',that.data[field]+'.html');
           });
           templateContent.querySelectorAll('[dz-data-text]').forEach(item=>{
                let field = item.getAttribute('dz-data-text') ||'';
                item.innerHTML= that.data[field];
            });
       
          //  templateContent.appendChild(dataButton);

           shadow.appendChild(
             templateContent.cloneNode(true)
           );
           
       })
       .catch(function(err) {  
           console.log('Failed to fetch page: ', err);  
       });

     
     


      this.addEventListener('contextmenu',e=>{
        console.log('Context Menu');
        let editMode = store.get('editMode') || 'normal';
        if(editMode==='admin')
          document.dispatchEvent(new CustomEvent('dz-contextmenu', { detail: {'event':e,'element':that,'menu':menu} }));
        e.preventDefault();
        e.stopPropagation();
      });

      
      this.addEventListener('data-update',e=>{
        let id = that.getAttribute('data-id') || null;
        let table = that.parentElement.getAttribute('table') || null;
        if (id!=null){
          that.parentElement.dispatchEvent(new CustomEvent('update-data', { detail: {'table':table,'data-id':id, 'body':{} } }));
          console.log('Update Data',id);       
        }

      });

      this.addEventListener('data-remove',e=>{
        
        let id = that.getAttribute('data-id') || null;

        let table = that.parentElement.getAttribute('table') || null;

        console.log('Data Remove',id,table);
        if (id!=null){
          that.parentElement.dispatchEvent(new CustomEvent('remove-data', { detail: {'table':table,'data-id':id} }));
          // remove-data
          console.log('Remove Data',id,table);

        }
   
      });


  }

}
);


//const slottedSpan = document.querySelector('my-paragraph span');

//console.log(slottedSpan.assignedSlot);
//console.log(slottedSpan.slot);