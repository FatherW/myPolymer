
// loadStyle("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/smart.default.css");
// loadScript("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/js/webcomponents-lite.js");
// loadModule("https://www.htmlelements.com/demos/source/modules/smart.accordion.js");

customElements.define('jitpo-natural-accordion',
class extends HTMLElement {
  constructor() {
    super();
       const id = this.getAttribute('id') || '_default';
      //  this.uid = window['uid'];
      //  this.tid = window['tid'];
       const user = store.get('user') || null;
        const position = this.getAttribute('position') || 'left';
      let that = this;
    this.innerHTML =
    `
    <style>
    .accordion {
      background-color: white;
      color: #444;
      cursor: pointer;
      padding: 18px;
      width: 100%;
      border: none;
      text-align: left;
      outline: none;
      font-size: 15px;
      transition: 0.4s;
    }
    
    .active, .accordion:hover {
      background-color: white; 
    }
    
    .panel {
      padding: 0 18px;
      display: none;
      background-color: white;
      overflow: hidden;
    }
    </style>
    </head>
    <body>
    
    
    <button class="accordion">家居、生活環境方面</button>
    <div class="panel">
        <dz-page-block id="na1" master></dz-page-block>
    </div>
    
    <button class="accordion">經濟、資產方面</button>
    <div class="panel">
        <dz-page-block id="na2" master></dz-page-block>
    </div>
    <button class="accordion">教育、職業、技能方面</button>
    <div class="panel">
        <dz-page-block id="na3" master></dz-page-block>
    </div>
    <button class="accordion">人際關係、溝通相關技巧</button>
    <div class="panel">
        <dz-page-block id="na4" master></dz-page-block>
    </div>

    <button class="accordion">身心健康方面</button>
    <div class="panel">
          <dz-page-block id="na5" master></dz-page-block>
    </div>
    <button class="accordion">休閒、娛樂方面</button>
    <div class="panel">
          <dz-page-block id="na6" master></dz-page-block>
    </div>
    `;
      
      


     


  

}

    connectedCallback(){
        let that = this;
        var acc = this.getElementsByClassName("accordion");
        var i;
        
        for (i = 0; i < acc.length; i++) {
          acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
              panel.style.display = "none";
            } else {
              panel.style.display = "block";
            }
          });
        }
    }

});
