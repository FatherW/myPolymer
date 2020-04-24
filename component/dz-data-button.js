let dbUrl = "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController";
  
  customElements.define('dz-data-button',
  class extends HTMLElement {
    constructor() {
      super();
      let that = this;
     console.log('Data Button');

//        document.dispatchEvent(new CustomEvent('isAdmin', { detail: {} }));
      this.innerHTML = `<style>
      dz-data-button {
          position: absolute;
          top: 0px;
          right: 0px;
      }
    </style>
      `

      let button = document.createElement('button');
      button.setAttribute('id','dz-add-data');
      button.innerHTML = '新增資料';
      this.appendChild(button);
      button.addEventListener('click',e=>{
        that.parentElement.dispatchEvent(new CustomEvent('add-data', { detail: {} }));
      });

      console.log('dz data button',button);
      let button1 = document.createElement('button');
      button1 = document.createElement('button');
      button1.setAttribute('id','dz-data-query');
      button1.innerHTML = '查詢設定';
      this.appendChild(button1);
      console.log('dz data button',button1);


      let button2 = document.createElement('button');

      button2 = document.createElement('button');
      button2.setAttribute('id','dz-data-setting');
      button2.innerHTML = '資料格式';
      this.appendChild(button2);
      console.log('dz data button',button2);


      let button3 = document.createElement('button');

      button3 = document.createElement('button');
      button3.setAttribute('id','dz-data-source');
      button3.innerHTML = '資料來源';
      this.appendChild(button3);

      console.log('dz data button',button3);


     
   
    }


    connectedCallback(){
      let that = this;
      

      
    }

  }
);
