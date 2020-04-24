
// loadStyle("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/smart.default.css");
// loadScript("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/js/webcomponents-lite.js");
// loadModule("https://www.htmlelements.com/demos/source/modules/smart.accordion.js");

customElements.define('jitpo-personal-accordion',
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
    
    
    <button class="accordion">一些我做了會令我感覺良好的事</button>
    <div class="panel">
        <dz-page-block id="pa1" master></dz-page-block>
    </div>
    
    <button class="accordion">一些我做了會令我的人生更有意義的事</button>
    <div class="panel">
        <dz-page-block id="pa2" master></dz-page-block>
    </div>
    <button class="accordion">一些我做了會令我引以自豪的事</button>
    <div class="panel">
        <dz-page-block id="pa3" master></dz-page-block>
    </div>
    <button class="accordion">一些我平日享受做的事</button>
    <div class="panel">
        <dz-page-block id="pa4" master></dz-page-block>
    </div>

    <button class="accordion">當我感覺不快時能夠令我重新感覺良好的事</button>
    <div class="panel">
          <dz-page-block id="pa5" master></dz-page-block>
    </div>
    <button class="accordion">在我生命中最重要的事</button>
    <div class="panel">
          <dz-page-block id="pa6" master></dz-page-block>
    </div>
    <button class="accordion">我的家人, 他們是我最安全的後盾 </button>
    <div class="panel">
        <dz-page-block id="pa7" master></dz-page-block>
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
