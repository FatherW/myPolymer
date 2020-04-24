

customElements.define('dz-tab',
class extends HTMLElement {
  constructor() {
    super();
       const template = document.querySelector('meta[tid]').getAttribute('tid');
       const id = this.getAttribute('id') || '_default';
       const user = store.get('user');
       const uid = document.querySelector('meta[uid]').getAttribute('uid');
       const label = this.getAttribute('label') || null; 
      let that = this;
      let path,fullpath;
      path = "http://"+user['userBucket']+'/template/'+template+'/DZ-TAB/';
//      fullpath = path + id +'/tab.json';

        let tabItem = document.createElement('smart-tab-item');
        let dzPageBlock = document.createElement('dz-page-block');
        dzPageBlock.setAttribute('master','');
        dzPageBlock.setAttribute('id',label);

        tabItem.setAttribute('label',label);
        tabItem.appendChild(dzPageBlock);

        this.appendChild(tabItem);

}

    connectedCallback(){

     }

});

