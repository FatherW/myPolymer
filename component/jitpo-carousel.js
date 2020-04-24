
// loadScript("http://code.jquery.com/jquery-1.10.2.js");
loadStyle("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/smart.default.css");
loadScript("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/js/webcomponents-lite.js");
loadModule("https://d25k6mzsu7mq5l.cloudfront.net/smart/smart.carousel.js");


loadStyle("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/owl.carousel.min.css");
loadStyle("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/owl.theme.default.min.css");

loadScript("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/js/jquery-2.2.4.min.js");
loadScript("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/js/owl.carousel.min.js");



customElements.define('jitpo-carousel',
class extends HTMLElement {
  constructor() {
    super();
       const template = document.querySelector('meta[tid]').getAttribute('tid');
       this.template = template;
       const uid = document.querySelector('meta[uid]').getAttribute('uid');
       this.uid = uid;
       this.editMode = store.get('editMode') || 'normal';
       const id = this.getAttribute('id') || '_default';
       this.id = id;
      const user = store.get('user');
//       this.user = user;
      //  const userBucket = window['uid']+'.dazzle.website';
        // this.userBucket = user['userBucket'] || window['uid']+'dazzle.website';
        this.userBucket = 'jitpo.dazzle.website';

        console.log('User Carousel',user,this.userBucket);
       const editMode = store.get('editMode') || 'normal';
       let allow_menu = [];

       let that = this;
       document.dispatchEvent(new CustomEvent('allow-menu', { detail: {'component':that.tagName,'menu':allow_menu} }));

       

        // let html = `
        //   <style>
        //   button#dz-carousel-management {
        //       position: absolute;
        //       top: 0px;
        //       right: 0px;
        //       padding: 10px;
        //   }
          
        //       smart-carousel,
        //     smart-carousel .smart-arrow:after {
        //         color: white;
        //     }

        //         smart-carousel .smart-indicator {
        //             border-color: white;
        //         }
        //     @media screen and (max-width: 700px) {
        //       smart-carousel {
        //         width: 100%;
        //       }
        //     }
        //     smart-carousel h2{
        //       background-color:none;
        //     }
        //     smart-carousel{

        //       width:100%;
        //       height:400px;
        //     }
        //     .smart-carousel-item-label {
        //       display:none;
        //     }
        //     </style>
        //     <smart-carousel auto-play slide-show interval="4000" loop style="height:400px; width:100%;"></smart-carousel>
        // `;

      let html = `
      <div class="owl-carousel">
        <div> Your Content 1 </div>
        <div> Your Content 2</div>
        <div> Your Content 3</div>
        <div> Your Content 4</div>
        <div> Your Content 5</div>
        <div> Your Content 6</div>
        <div> Your Content 7</div>
      </div>
      `;


            
        this.innerHTML = html;
      
    }

    refresh(){
      let that = this;
      let id = this.getAttribute('id') || '_default';
      let fullpath = "https://d25k6mzsu7mq5l.cloudfront.net/user-data/"+this.template+"/DZ-CAROUSEL/"+id+"/slide.json?id="+new Date().getTime();
      // let fullpath = "template/"+this.template+"/DZ-CAROUSEL/"+id+"/slide.json?id="+new Date().getTime();
        console.log('Full Path',fullpath);
        fetch(fullpath)
          .then(function(response) {
              // When the page is loaded convert it to text
              return response.text()
          })
          .then(function(res) {
            console.log('carousel',res);
              
              let json = JSON.parse(res);
              that.slides = json;
              let carousel = document.querySelector('smart-carousel');
              console.log(carousel,that.slides);
              // carousel.dataSource = generateDataSource(this.slides);
              carousel.dataSource = that.slides;
                
        });
    }
    connectedCallback(){
      let that = this;
      
        console.log('On Load',this);
   
        let menu =   [
          {
            'label':'重載',
            'event':'carousel-refresh',
            'elm':this
          },
          {
            'label':'圖片管理',
            'event':'carousel-management',
            'elm':this
          }
  
        ];
        this.menu = menu;

    

      const editMode = store.get('editMode') || 'normal';
      // if (editMode ==="admin")
        // this.refresh();


      this.addEventListener("carousel-management",function(e){
        // let management = document.createElement('dz-carousel-management');
        // management.setAttribute('data-id',this.id);
        window.curTarget = that;
        console.log('Window',window);
        document.dispatchEvent(new CustomEvent('custom-popup', { detail: {'component':'dz-carousel-management'} ,size:'big' }));
        // document.querySelector('mat-dialog-container').innerHTML ='<dz-carousel-management></dz-carousel-management>';
        // document.querySelector('mat-dialog-container').appendChild(management);
      });
      this.addEventListener("carousel-refresh",function(e){
        that.refresh();
      });

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

function generateDataSource(items) {

  const basePath = 'images/';

  dataSource = [];

  for (let i = 0; i < items; i++) {
      const item = {
          image: `images/slide-${i + 1}.jpg`,
          label: '',
          content: ''
      };

      dataSource.push(item);
  }

  return dataSource;
}
function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
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
function loadScript(url){
  
    let fileref=document.createElement('script');
    
    fileref.setAttribute("type","text/javascript");
    fileref.setAttribute("src", url);
    // fileref.setAttribute('defer','');
    // fileref.setAttribute('id','wc-'+id);
    document.getElementsByTagName("head")[0].appendChild(fileref);
    // this.loadedComponent.push(id);

  
}

function loadStyle(url){
    const ref = document.createElement('link');
    ref.setAttribute('href',url);
    ref.setAttribute('rel','stylesheet');
    document.getElementsByTagName("head")[0].appendChild(ref);

  }
  function generateDataSource(items) {
      const headlines = ['Lorem ipsum dolor sit amet',
          'Pellentesque facilisis',
          'Mauris tempus elit et metus sollicitudin',
          'Cras dictum mauris et erat',
          'Duis in libero eu tortor'],
          contentParagraphs = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia, purus ac bibendum volutpat, justo orci finibus nulla, sed laoreet velit mauris eget est. Donec venenatis elit sit amet dui tempor, quis ornare augue viverra. In varius ut erat at cursus. Phasellus mollis odio sit amet neque imperdiet pharetra. Nam ut diam elementum, tempus lectus eget, pulvinar ligula. Morbi sit amet gravida justo. Integer ex orci, vulputate laoreet ornare sit amet, vehicula vel erat. Suspendisse molestie lacus sed fringilla pulvinar.`,
          `Nullam eget fermentum tellus. Nullam hendrerit ante eget pharetra ornare. Pellentesque posuere arcu elit, ut sagittis sapien lobortis quis. Duis ac aliquet lorem, vel ornare mauris. Aliquam lobortis blandit neque. Duis eros tellus, congue a faucibus non, pulvinar vitae magna. Morbi eu mauris velit. Sed in fringilla leo. Nullam ut odio ante. In gravida tortor sed tempor sagittis. Integer blandit, ligula eu blandit suscipit, nunc risus condimentum lectus, quis viverra orci tortor at est. Sed augue lacus, efficitur non purus quis, porta maximus metus.`,
          `Maecenas placerat vitae nunc sed egestas. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam erat volutpat. Aliquam bibendum elit tempus sodales vestibulum. Maecenas a dapibus leo. Ut porta elit purus, eu lobortis nisl vehicula at. Aliquam vel ipsum ut metus ullamcorper porttitor. Nulla et facilisis orci, sed varius velit. In molestie in elit suscipit tincidunt.`,
          `Cras euismod iaculis tellus et laoreet. Proin eleifend porttitor mattis. Maecenas in dolor dignissim, mollis lacus consequat, tempus nunc. Morbi lacus ante, convallis eget rutrum eu, consectetur nec augue. Nullam vel sodales nulla. Donec in rhoncus odio, non cursus enim. Donec at mauris sit amet justo sagittis eleifend. Vivamus vel ligula id purus venenatis lobortis. Integer laoreet fermentum urna in lacinia. Maecenas sed urna eu ligula porta elementum non sit amet tortor. Praesent tincidunt laoreet quam ac congue. Sed eu ex ac lectus suscipit aliquet. Vivamus interdum ullamcorper sapien ut aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce faucibus posuere dolor in sollicitudin. Sed scelerisque fermentum urna, at ultricies lacus rutrum sed.`,
          `Aliquam scelerisque elit pharetra, finibus turpis quis, dictum ex. Morbi venenatis sodales commodo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In vitae tortor magna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin in diam lacinia, ultricies dui in, cursus lectus. Cras risus lorem, rhoncus ac neque quis, auctor gravida leo. In hac habitasse platea dictumst. Nunc nulla felis, porttitor et tempor consectetur, pretium in nisl. Vivamus sollicitudin dolor gravida risus cursus viverra.`],
          dataSource = [];

      for (let i = 0; i < items; i++) {
          const item = {
              image: `http://hkdeaf.dazzle.website/images/slide-${i + 1}.jpg`,
              label: '',
              content: ''
          };

          dataSource.push(item);
      }
      console.log('Data Source',dataSource);
      return dataSource;
  }


