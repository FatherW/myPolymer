
// loadStyle("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/smart.default.css");
// loadScript("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/js/webcomponents-lite.js");
// loadModule("https://www.htmlelements.com/demos/source/modules/smart.accordion.js");

customElements.define('dz-accordion',
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
    
    
    <button class="accordion">認識優勢模式</button>
    <div class="panel">
        <ul _ngcontent-ofb-c5=""><li _ngcontent-ofb-c5=""><a _ngcontent-ofb-c5="" href="優勢評估表">優勢評估表</a></li><li _ngcontent-ofb-c5=""><a _ngcontent-ofb-c5="" href="復元目標">復元目標</a></li><li _ngcontent-ofb-c5=""><a _ngcontent-ofb-c5="" href="個人良藥">個人良藥</a></li><li _ngcontent-ofb-c5=""><a _ngcontent-ofb-c5="" href="天然資源">天然資源</a></li><li _ngcontent-ofb-c5=""><a _ngcontent-ofb-c5="" href="article">相關文章</a></li></ul>
    </div>
    
    <button class="accordion">優勢眾籌</button>
    <div class="panel">
    <ul _ngcontent-ofb-c5=""><li _ngcontent-ofb-c5=""><a _ngcontent-ofb-c5="" href="個人良藥眾籌">個人良藥眾籌</a></li><li _ngcontent-ofb-c5=""><a _ngcontent-ofb-c5="" href="天然資源眾籌">天然資源眾籌</a></li></ul>
    </div>
    
        
    `;
      
      


     


  

}

    connectedCallback(){
        let that = this;
        var acc = document.getElementsByClassName("accordion");
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
