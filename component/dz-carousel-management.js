
// loadScript("http://code.jquery.com/jquery-1.10.2.js");

customElements.define('dz-carousel-management',
class extends HTMLElement {
  constructor() {
    super();
    loadModule("https://www.htmlelements.com/demos/source/modules/smart.card.js");
    loadModule("https://www.htmlelements.com/demos/source/modules/smart.button.js");
    loadModule("https://www.htmlelements.com/demos/source/modules/smart.element.js");
    loadModule("https://www.htmlelements.com/demos/source/modules/smart.sortable.js");
//    loadScript("https://d25k6mzsu7mq5l.cloudfront.net/component/dz-carousel-management.js");


       this.template = document.querySelector('meta[tid]').getAttribute('tid');
       const uid = document.querySelector('meta[uid]').getAttribute('uid');
       this.id = this.getAttribute('id') || '_default';
       this.tid = this.getAttribute('data-id') || '_default';
       this.curTarget = window['curTarget'];
       this.slides = this.curTarget['slides'];
       console.log('Window Management',this.slides,this.curTarget,this.tid);

      const user = store.get('user') || null;
      this.fileManager = new AwsPackage(user);

      let that = this;
      let path,fullpath;
    //   path = "//"+uid+'.dazzle.website/template/'+template+'/DZ-CAROUSEL-MANAGEMENT/';
        path = "https://d25k6mzsu7mq5l.cloudfront.net/file7.0/DZ-CAROUSEL-MANAGEMENT/template?id="+new Date().getTime();
      
       fetch(path)
       .then(function(response) {
           // When the page is loaded convert it to text
           return response.text()
       })
       .then(function(html) {
         var doc;
         that.innerHTML = html;
         console.log('Update Source');
        
        that.querySelector('#dz-save').addEventListener('click',e=>{
          let json = [];
          // that.querySelectorAll('smart-card').forEach(item=>{
          //     let url = item.querySelector('.card-image img').getAttribute('src') || '#';            
          //     json.push({
          //         "image": url
          //     });
          // });
          that.curTarget['slides'] = that.slides;
          console.log('Save Slide',that.curTarget,that.slides);
          


          // const params = {
          //     'key': 'template/'+that.template+'/DZ-CAROUSEL/'+that.curTarget.id+'/slide.json',
          //     'content':JSON.stringify(json)
          // };

          // console.log('Save File',params);
          that.fileManager.saveUserData('DZ-CAROUSEL/'+that.curTarget.id+'/slide.json',JSON.stringify(that.slides));
          that.fileManager.saveFile('template/'+that.template+'/DZ-CAROUSEL/'+that.curTarget.id+'/slide.json',JSON.stringify(that.slides)).then(res=>{
            console.log('Saved');
              that.curTarget.refresh();
          });

          // document.dispatchEvent(new CustomEvent('save-file', { detail: params }));

          //  document.dispatchEvent(new CustomEvent('img-stock', { detail: {'curTarget': that } }));
        });

        that.querySelector('#dz-add-photo').addEventListener('click',e=>{
          console.log('Add Photo');
          window['dzEmitter'] = that;
          // window['curTarget'] = that;
          console.log(window['curTarget']);
          document.dispatchEvent(new CustomEvent('custom-popup', { detail: {'component':'dz-file-management','size':'big'} }));
          //  document.dispatchEvent(new CustomEvent('img-stock', { detail: {'curTarget': that } }));
        });
        

        that.querySelector('#dz-delete-photo').addEventListener('click',e=>{
            that.querySelectorAll('smart-card[selected]').forEach(item=>{
                item.remove();
            });
            that.slides = [];
            that.querySelectorAll('smart-card img').forEach(item=>{
                that.slides.push({
                    "image": item.getAttribute('src')
                });
            });
            that.updateSource();            
        });      
        
        
         that.updateSource();
      });

      // that.addEventListener('gallery-image-selected',e=>{
      //   console.log('Gallery Image Selected');
      //     console.log(e);
      //     let detail = e['detail'];
      //     let selected = detail['selected'];
      //     window['curTarget']['slides'].push({
      //         "image":selected
      //     });
      //     that.updateSource();
      // });

     
      console.log('Current Carousel Target',that.curTarget,window['curTarget']);
      window['curTarget'].addEventListener('select-link',e=>{
        console.log('Gallery Image Selected');

          console.log(e);
          let detail = e['detail'];
          let selected = detail['value'];
          that.slides.push({
              "image":selected
          });
          that.updateSource();
      });


    }

    updateSource(){
        
//        const cards = document.querySelector('smart-cards');
        const content = this.querySelector('content');
        content.innerHTML = '';
        let sortTable = document.createElement('smart-sortable');
        sortTable.setAttribute('items','smart-card');
        sortTable.setAttribute('mode','horizontal');
        let cards = document.createElement('smart-cards');
            

//         <smart-sortable items="smart-card"  mode="horizontal">
//     <smart-cards>
//     </smart-cards>
// </smart-sortable>
        let dataSource = this.slides || [];

        for (let i = 0; i < dataSource.length; i++) {
            let card = document.createElement('smart-card');
            card.setAttribute('class','expandable-card');
            card.setAttribute('item-template','customTemplate');
            card.dataSource = dataSource[i];
            card.contentHandler = contentHandler;
            
            cards.appendChild(card);
        }

        sortTable.appendChild(cards);
        content.appendChild(sortTable);
        
    
    

        function contentHandler(card) {
            // card.querySelector('.changePhoto').addEventListener('click',e=>{
            //   document.dispatchEvent(new CustomEvent('img-stock', { detail: {'curTarget': that } }));
            //   document.addEventListener('gallery-image-selected',e=>{
            //       console.log(e);
            //       let detail = e['detail'];
            //       let selected = detail['selected'];
            //       card.querySelector('.card-image img').setAttribute('src',selected);
            //   });
            // });

            card.addEventListener('click',e=>{
              if (card.hasAttribute('selected'))
                card.removeAttribute('selected');
              else
                card.setAttribute('selected','');
            });

            // const toggleBtn = card.getElementsByTagName('smart-toggle-button')[0],
            //     moreBtn = card.querySelector('.more'),
            //     content = card.querySelector('.card-content');
    
            // moreBtn.addEventListener('click', function () {
            //     content.classList.remove('hidden');
            //     toggleBtn.checked = true;
            // });
    
            // toggleBtn.addEventListener('click', function () {
            //     content.classList.toggle('hidden');
            // });
        }
    }
    connectedCallback(){
      // console.log('This tempid',this.template,this.id);
      const template = document.querySelector('meta[tid]').getAttribute('tid');
 //     const template = this.template;
      const that = this;
      let master = this.hasAttribute('master') || false;
      let thisPage = decodeURIComponent(window.location.pathname).substring(window.location.pathname.indexOf('/') + 1) || 'index.html';
      let content;



    
      // console.log('HTML',this,this.innerHTML);
      document.addEventListener("save",function(e){
            // const json = {
            //     'key': key,
            //     'content':that.innerHTML
            // };
            // console.log('Save File',json);
            // document.dispatchEvent(new CustomEvent('save-file', { detail: json }));

      });
     }

});

function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

function loadScript(url){
//  let com = document.createElement(id);
  // let url ="https://d25k6mzsu7mq5l.cloudfront.net/component/"+id+".js";
  //let url="https://d25k6mzsu7mq5l.cloudfront.net/component/"+id+".js?id="+new Date().getTime();
  
    let fileref=document.createElement('script');
    
    fileref.setAttribute("type","text/javascript");
    fileref.setAttribute("src", url);
    // fileref.setAttribute('defer','');
    // fileref.setAttribute('id','wc-'+id);
    document.getElementsByTagName("head")[0].appendChild(fileref);
    // this.loadedComponent.push(id);

  
}
function loadModule(url){
  
  let fileref=document.createElement('script');
  
  fileref.setAttribute("type","module");
  fileref.setAttribute("src", url);
  // fileref.setAttribute('defer','');
  // fileref.setAttribute('id','wc-'+id);
  document.getElementsByTagName("head")[0].appendChild(fileref);
  // this.loadedComponent.push(id);


}