// loadModule("https://www.htmlelements.com/demos/source/modules/smart.datetimepicker.js");
loadModule("https://www.htmlelements.com/demos/source/modules/smart.cardview.js");
loadModule("https://www.htmlelements.com/demos/source/modules/smart.button.js");
loadModule("https://www.htmlelements.com/demos/source/modules/smart.tabs.js");
loadModule("https://www.htmlelements.com/demos/source/modules/smart.dropdownbutton.js");
loadModule("https://www.htmlelements.com/demos/source/modules/smart.listmenu.js");

// loadScript("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/js/aws-sdk-2.83.0.min.js");

// initPopupTemplate('dz-schema-management');
initPopupTemplate('dz-schema-management');
initPopupTemplate('dz-schema-dropdown-list');

customElements.define('dz-schema-management',
class extends HTMLElement {
  constructor() {
    super();
        let component = 'dz-schema-management';
        console.log('dz-schema-management');
        let templateContent = document.getElementById(component+'-tpl').content;
        console.log(templateContent);
        let content = document.getElementById('dz-schema-dropdown-list-tpl').content;
        var div = document.createElement('div');
        div.appendChild(content.cloneNode(true) );
        this.dropdownContent = div.innerHTML;
        // console.log('Content',dropdown);
        this.appendChild(templateContent.cloneNode(true));
        this.detail = window['curDetail'] ;
        this.myData = this.detail['myData'] || [];
        this.schema = this.myData['schema'] || [];
        console.log('Detail',this.myData);
        // const shadowRoot = this.attachShadow({mode: 'open'})
        // .appendChild(templateContent.cloneNode(true));



        const tabs = this.querySelector('smart-tabs');
        // tabs.className = 'demoTabs';
        let dataSource = this.schemaToDataSource(this.schema);
        tabs.dataSource = dataSource;
        let add = this.querySelector('#dz-add');
        add.addEventListener('click',e=>{
            console.log('Button Click');
            let name = prompt("新欄目名稱？");
            tabs.insert(0, { label: name, content: 'abcde' });
         });



        // tabs.dataSource = [
        //     {
        //         label: 'Item 2',
        //         content: 'Content 2',
        //         selected:true
        //     },
        //     {
        //         label: 'Item 3',
        //         content: 'Content 3'
        //     }
        // ];

    }
    schemaToDataSource(schema){
        let source = [];
        schema.field.forEach(item=>{
            source.push({
                label: item['label'] || item['field'] || 'No Name',
                content: this.dropdownContent,
                type: item['type']
            });
        });
        return source;

    }
    connectedCallback(){
   
    }
});
