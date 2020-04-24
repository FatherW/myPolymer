

customElements.define('fb-news-content',
  class extends HTMLElement {
    constructor() {
      super();
      let menu = [
        {
        'label':'新增消息',
        'event':'add-item'
        },
        {
          'label':'更改消息',
          'event':'update-item'
          },    
        {
          'label':'刪除消息',
          'event':'remove-item'
        }
      ];
      
      let that = this;
      let path = "https://d25k6mzsu7mq5l.cloudfront.net/template7.0/hkfb/_block/fb-news/html";
      $.get(path, function(html){            
          console.log('HTML',html);

        const template= document.createElement('template');
        template.innerHTML = html;
        const templateContent = template.content;
        // this.appendChild(
        that.attachShadow({mode: 'open'}).appendChild(
          templateContent.cloneNode(true)
        );
      });

      // Init Menu
      //document.dispatchEvent(new CustomEvent('init-menu', { detail: {'component':'fb-news-item','element':that,'menu':menu} }));
      
      document.dispatchEvent(new CustomEvent('get-data', { 'detail': {
          'table':'news',
          'element':this
      } }));
      this.addEventListener('put-data',e=>{
        let _data = e.detail['data'] || [];
  //          console.log('Detail',e.detail);
        let html= '';
        this.innerHTML = '';
        _data.forEach(function(d){
            let item= d['title'];
            let id = d['ID'];
            html = '<fb-news-item><div slot="ID" data-id="'+id+'"></div><a slot="title" href="'+item+'">'+item+'</a></fb-news-item>'+html;
            const template = document.createElement('fb-news-item');
            const a  = document.createElement('a');
            a.setAttribute('slot','title');
            a.setAttribute('href',item);
            a.innerHTML = item;
            const div = document.createElement('div');
            div.setAttribute('slot','ID');
            div.setAttribute('data-id',id);
            div.setAttribute('data-table','news');
            template.appendChild(a);
            template.appendChild(div);
            that.appendChild(template);
        });

      });

    }

  }
);

//const slottedSpan = document.querySelector('my-paragraph span');

//console.log(slottedSpan.assignedSlot);
//console.log(slottedSpan.slot);