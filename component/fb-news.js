let menu = [
  {
  'label':'新增消息',
  'event':'add-news'
  },
  {
    'label':'資料管理',
    'event':'news-management'
    }
];

customElements.define('fb-news',
  class extends HTMLElement {
    constructor() {
      super();
      let that = this;
      let path = "https://d25k6mzsu7mq5l.cloudfront.net/template7.0/hkfb/_block/fb-news/html";


      // Init Menu
     
   
    }

    connectedCallback(){

        let that = this;

        document.dispatchEvent(new CustomEvent('init-menu', { detail: {'component':'fb-news','element':that,'menu':menu} }));
       
      document.dispatchEvent(new CustomEvent('get-datas', { 'detail': {
          'table':'news',
          'element':that
      } }));
      this.addEventListener('put-datas',e=>{
         let _data = e.detail['data'] || [];
//          console.log('Detail',e.detail);
        let html= '';
        that.innerHTML = '';
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

       document.addEventListener('data-refresh',e=>{
          alert('資料已更新, 現在更新頁面');

          let table = e.detail['table'] || null;
          if (table ==="news")
            document.dispatchEvent(new CustomEvent('get-datas', { 'detail': {
                'table':'news',
                'element':that
            } }));
       });
    }

  }
);
