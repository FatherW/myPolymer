

customElements.define('fb-news-item',
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
      document.dispatchEvent(new CustomEvent('init-menu', { detail: {'component':'fb-news-item','element':that,'menu':menu} }));
      this.addEventListener('add-item',e=>{
        const dom = e['detail']['element'];
        console.log(dom,dom.querySelector('[slot=ID]'));
        const table = dom.querySelector('[slot=ID]').getAttribute('data-table') || null;
        const dataId = dom.querySelector('[slot=ID]').getAttribute('data-id') || null;
        console.log('Detail',table,dataId);
        let title = prompt("請輸入資料標題 (注意: 重覆標題, 資料會遭覆寫", "標題");
        if (title) {
            let json = {
              'ID':title,
              'title':title,
              'updated': new Date().getTime(),
              'link':title
            }
            document.dispatchEvent(new CustomEvent('save-data', { 'detail': {
              'table':'news', 'id':json['ID'],'data':json
            }}));
        }
          // console.log('Add Item1');
      }); 


      this.addEventListener('remove-item',e=>{
        const dom = e['detail']['element'];
        console.log(dom,dom.querySelector('[slot=ID]'));
        const table = dom.querySelector('[slot=ID]').getAttribute('data-table') || null;
        const dataId = dom.querySelector('[slot=ID]').getAttribute('data-id') || null;
        console.log('Detail',table,dataId);
        let isRemove = confirm("你是否確認資料要刪除?");
        if (isRemove){
              document.dispatchEvent(new CustomEvent('remove-data', { 'detail': {
                'table':'news', 'id':dataId
               }}));
        }
     
      });



      this.addEventListener('update-item',e=>{
        const dom = e['detail']['element'];
        let table,dataId,msg;
        let record = {};
        msg = "<h3>請輸入以下資料:</h3>";
        console.log(dom,dom.querySelectorAll('[slot]'));
        dom.querySelectorAll('[slot]').forEach(item=>{
            let slot = item.getAttribute('slot') || null;
            switch(slot){
                case 'ID':
                    table = item.getAttribute('data-table') || null;
                    dataId = item.getAttribute('data-id') || null;
                    record['ID'] = dataId;
                    break;
                case 'updated':
                    record['updated'] = new Date().getTime();  
                break;


                default:
                  let value = prompt('請輸入'+slot);
                  record[slot] = value;
                break;

            }

        });
       document.dispatchEvent(new CustomEvent('save-data', { 'detail': {
              'table':'news', 'id':dataId,'data':record
       }}));

      });

    }

  }
);

//const slottedSpan = document.querySelector('my-paragraph span');

//console.log(slottedSpan.assignedSlot);
//console.log(slottedSpan.slot);