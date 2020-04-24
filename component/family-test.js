loadScript("https://unpkg.com/ag-grid-community/dist/ag-grid-community.min.js");
loadScript("https://d25k6mzsu7mq5l.cloudfront.net/backend7.0/fieldRenderer.js");
loadScript("https://d25k6mzsu7mq5l.cloudfront.net/cdn7.2/js/data.common.js");
// loadScript("https://d25k6mzsu7mq5l.cloudfront.net/component/dz-whole-grid.js");

customElements.define('family-test',
class extends HTMLElement {
  constructor() {
    super();
       const template = document.querySelector('meta[tid]').getAttribute('tid');
       const id = this.getAttribute('id') || '_default';
       const user = store.get('user');
      let that = this;
      this.myData = new DataPackage("test");

      let path,fullpath;

      path = "http://"+user['userBucket']+'/template/'+template+'/DZ-PAGE-BLOCK/';
    console.log('Path',path);
    //  let path = "https://d25k6mzsu7mq5l.cloudfront.net/template7.0/";
      let thisPage = decodeURIComponent(window.location.pathname).substring(window.location.pathname.indexOf('/') + 1) || 'index.html';
      let editMode = store.get('editMode') || 'normal';

      fullpath = path+"_master/"+id+'/html';

      console.log('Component Path',fullpath);

      fullpath = fullpath +"?id="+new Date().getTime();
      console.log('Full Path',fullpath);
        $.get(fullpath, function(html){          
            // console.log('Component HTML',fullpath,html);  
            that.innerHTML = html;
            if (editMode ==="admin"){
                 let button = document.createElement('button');
                 button.innerHTML = '答案管理';
                 button.setAttribute('id','db-management');
                 button.addEventListener('click',e=>{
                      document.dispatchEvent(new CustomEvent('custom-popup', { detail: {'component':'dz-whole-grid','size':'big'} }));
                 });
                 that.appendChild(button);
            }
            that.answer = {};
            that.eventListen();
      });


      // document.addEventListener('grab',function(e){
      //   let url = location.href;
      //   url = "http://template.dazzle.website/html5up-dimension/";

      //   $.get(url,function(html){
      //     console.log('HTML',html);
      //     let elm = document.createRange().createContextualFragment(html);
      //     let head = elm.querySelector('head').innerHTML;
      //     console.log('Head',head);
      //   });

      // });

  

}
    eventListen(){
      const button = document.querySelectorAll('smart-button');
      const eventLog = document.querySelector('#log');
      const submitButton = document.getElementById('submit-button');  
      let that = this;
        button.forEach(item=>{
          item.addEventListener('click', function(event) {
            let target = event.target.parentElement;
            if (hasClass(target,'yes')){
              console.log('Yes');
              target.parentElement.setAttribute('answer','yes');
              target.parentElement.querySelectorAll('smart-button')[0].classList.remove('chosen');
              target.parentElement.querySelectorAll('smart-button')[1].classList.remove('chosen');

              target.classList.add('chosen');

            }
            else  {
              console.log('No');
              target.parentElement.setAttribute('answer','no');
              target.parentElement.querySelectorAll('smart-button')[0].classList.remove('chosen');
              target.parentElement.querySelectorAll('smart-button')[1].classList.remove('chosen');
              target.classList.add('chosen');
            }
          });
        });

        submitButton.addEventListener('click',function(event){
            console.log('Click');
            const question = [...document.getElementsByClassName('q_rehabilitationTest')];
            console.log(question);
            let data ={};
            data['ID'] = new Date().getTime();

            let i=1;
            question.forEach(item=>{
                const ans = item.getAttribute('answer') ||null;
                console.log('Answer',item.getAttribute('answer'));
                data['question'+i] = item.getAttribute('answer');
//                that.answer[i] = ans; 
                i++;
            });
            data['updated'] = new Date().getTime()/1000;
            //console.log(that.answer);

//            document.dispatchEvent(new CustomEvent('save-data', { detail: {'table':'test','id':new Date().getTime(),'data':data} }));
            that.myData.saveData(new Date().getTime(),data);
            // location.href = "謝謝你的答案";
            store.set('answer',data);
           alert('你的答案已經提交，謝謝你的回答');
           that.loadCorrectAnswer();
          //  location.reload();
        });



    }

    loadCorrectAnswer(){
      let that = this;
      const question = [...document.getElementsByClassName('q_rehabilitationTest')];
      question.forEach(item=>{
        console.log('Item',item);
        const correctAns = item.getAttribute('correct') ||null;
        item.querySelector('smart-button.'+correctAns).classList.add('correct'); 
        let correctItem = item.querySelector('smart-button.correct');
        let selectItem = item.querySelector('smart-button.chosen');
        if (correctItem === selectItem)
          item.querySelector('.correct_box').classList.add('yes');
        else
        item.querySelector('.correct_box').classList.add('no');

        that.querySelector('.label').classList.remove('hide');
        
      });


    }
    connectedCallback(){
      // console.log('This tempid',this.template,this.id);
      const template = document.querySelector('meta[tid]').getAttribute('tid');
 //     const template = this.template;
      const that = this;
      let master = this.hasAttribute('master') || false;
      let thisPage = decodeURIComponent(window.location.pathname).substring(window.location.pathname.indexOf('/') + 1) || 'index.html';
      let content;

      // console.log('HTML',this,this.innerHTML);
      let key;
      let path = 'template/'+template+'/DZ-PAGE-BLOCK/';
      if (master){
          key = path+"_master/"+this.id+'/html';
      } else {
          key = path + thisPage+'/html';
      }
      document.addEventListener("save",function(e){
            const json = {
                'key': key,
                'content':that.innerHTML
            };
            console.log('Save File',json);
            document.dispatchEvent(new CustomEvent('save-file', { detail: json }));

      });
     }

});

function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}
function hasClass(element, className) {
  return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}