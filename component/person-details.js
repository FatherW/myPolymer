customElements.define('person-details',
  class extends HTMLElement {
    constructor() {
      super();

      const template = document.getElementById('response-website');
      const templateContent = template.content;
      // const shadowRoot = this.attachShadow({mode: 'open'});++
      const styleContent = template.getElementsByTagName('style')[0].innerHTML;
      console.log('Style Content',styleContent);  
      const style = document.createElement('style');
  /*    style.textContent = `
    @import "https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i%7CRajdhani:400,600,700";
    @import "https://d25k6mzsu7mq5l.cloudfront.net/template7.0/assets/css/loader/loaders.css";

    @import "https://d25k6mzsu7mq5l.cloudfront.net/template7.0/responsive-website/assets/css/font-awesome/font-awesome.css";
    @import "https://d25k6mzsu7mq5l.cloudfront.net/template7.0/responsive-website/assets/css/bootstrap.css";
    @import "https://d25k6mzsu7mq5l.cloudfront.net/template7.0/responsive-website/assets/css/aos/aos.css";
    @import "https://d25k6mzsu7mq5l.cloudfront.net/template7.0/responsive-website/assets/css/swiper/swiper.css";
    @import "https://d25k6mzsu7mq5l.cloudfront.net/template7.0/responsive-website/assets/css/lightgallery.min.css";
    @import "https://d25k6mzsu7mq5l.cloudfront.net/template7.0/responsive-website/assets/css/style.css";
    @import "https://d25k6mzsu7mq5l.cloudfront.net/template7.0/responsive-website/assets/css/responsive.css";
      `;
*/
    		style.textContent = styleContent;

//      shadowRoot.appendChild(style);
//      shadowRoot.appendChild(templateContent.cloneNode(true));
        this.appendChild(style);
        this.appendChild(templateContent.cloneNode(true));

  }
});