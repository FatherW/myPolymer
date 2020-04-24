
loadStyle("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/smart.default.css");
loadScript("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/js/webcomponents-lite.js");
loadModule("https://d25k6mzsu7mq5l.cloudfront.net/smart/smart.tabs.js");
customElements.define('dz-tabs',
class extends HTMLElement {
  constructor() {
    super();
       const template = document.querySelector('meta[tid]').getAttribute('tid');
       const id = this.getAttribute('id') || '_default';
       const user = store.get('user');
       const uid = document.querySelector('meta[uid]').getAttribute('uid');
        const position = this.getAttribute('position') || 'left';
        const autoHeight = this.getAttribute('auto-height') || false;
      let that = this;
      let path,fullpath;
      path = "https://d25k6mzsu7mq5l.cloudfront.net/user-data/"+uid+'/DZ-TABS/';

      fullpath = path + id +'/tab.json?id='+new Date().getTime();

console.log('FULL Path',fullpath);
    this.innerHTML ='';
      
      fetch(fullpath)
      .then(function(response) {
          // When the page is loaded convert it to text
          return response.text()
      })
      .then(function(result) {
        console.log('TAB',result);
          let json = JSON.parse(result);
          that.json = json;
          console.log(json);
          let smartTabs = document.createElement('smart-tabs');
          smartTabs.setAttribute('tab-position',position);           
          if (autoHeight)
             smartTabs.setAttribute('class','auto-height');   
          json.forEach(item=>{
              let tab = document.createElement('smart-tab-item');
              tab.setAttribute('label',item);
              // let dzPageBlock = document.createElement('dz-page-block');
              // dzPageBlock.setAttribute('master','');
              // dzPageBlock.setAttribute('id',item);
              // tab.appendChild(dzPageBlock);

              that.fetchContent(tab,item);


              smartTabs.appendChild(tab);
          });
          that.appendChild(smartTabs);
//        that.innerHTML = html;

     });


     


  

}
    fetchContent(elm,tabId){
      const template = document.querySelector('meta[tid]').getAttribute('tid');
      const id = this.getAttribute('id') || '_default';
      const user = store.get('user');
      const uid = document.querySelector('meta[uid]').getAttribute('uid');
      
      let path,fullpath;
      // path = "http://"+user['userBucket']+'/template/'+template+'/DZ-TABS/';
      path = "https://d25k6mzsu7mq5l.cloudfront.net/user-data/"+uid+'/DZ-TABS/';

      fullpath = path + id +'/'+tabId+'?id='+new Date().getTime();;
      fetch(fullpath)
      .then(function(response) {
          // When the page is loaded convert it to text
          return response.text()
      })
      .then(function(result) {
        // console.log('Full Tab Path',fullpath,result);

        elm.innerHTML = result;    
        elm.querySelector('.smart-container').style.width = "12.5%";
      });

    }

    saveTab(tabId){
      const template = document.querySelector('meta[tid]').getAttribute('tid');
      const id = this.getAttribute('id') || '_default';
      const user = store.get('user');
      const uid = document.querySelector('meta[uid]').getAttribute('uid');
      
      let path,fullpath;
      let key = 'DZ-TABS/'+id+'/'+tabId;
      
      let innerHTML = this.querySelector('smart-tab-item[label='+tabId+'] .smart-container').innerHTML;
      
      console.log('Save Tab',key);
      this.fileManager = new AwsPackage(user);
      this.fileManager.saveUserData(key,innerHTML);
      // const json = {
      //   'key': key,
      //   'content':innerHTML
      // };
      // console.log('Save File',json);
      //   document.dispatchEvent(new CustomEvent('save-file', { detail: json }));

    }
    connectedCallback(){
        let that = this;
        document.addEventListener('save',e=>{
            that.json.forEach(item =>{
 
                that.saveTab(item);
            });

        });
     }

});
