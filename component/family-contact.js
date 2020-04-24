// loadScript("https://unpkg.com/ag-grid-community/dist/ag-grid-community.min.js");
// loadScript("https://d25k6mzsu7mq5l.cloudfront.net/backend7.0/fieldRenderer.js");
loadStyle("https://www.htmlelements.com/demos/source/styles/smart.default.css");
loadScript("https://www.htmlelements.com/demos/source/webcomponents-lite.js");
loadModule("https://www.htmlelements.com/demos/source/modules/smart.radiobutton.js");
loadModule("https://www.htmlelements.com/demos/source/modules/smart.textbox.js");


customElements.define('family-contact',
class extends HTMLElement {
  constructor() {
    super();
       const template = document.querySelector('meta[tid]').getAttribute('tid');
       const id = this.getAttribute('id') || '_default';
       const user = store.get('user');
      let that = this;
      let path,fullpath;
      let app;
      
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
            // that.app = new Smart.App(
            //   {
            //     data: {
            //       name: "",
            //       phone: "",
            //       email:"",
            //       topic: "",
            //       content: ''					
            //     }
            //   }
            // )		
            // that.querySelector('#edit-submit').addEventListener('click',e=>{
            //     let message = '';
            //     message += "姓名:"+that.app.data['name']+"\n";
            //     message += "電話:"+that.app.data['phone']+"\n";
            //     message += "電郵:"+that.app.data['email']+"\n";
            //     message += "主題:"+that.app.data['topic']+"\n";
            //     message += "內容:"+that.app.data['content']+"\n";
            //     console.log(that.app.data,message);
            //     that.sentEmail('henry@01power.net','收到以下信息：'+that.app.data['topic'], message);


            // });
            if (editMode ==="admin"){
                 let button = document.createElement('button');
                 button.innerHTML = '查詢管理';
                 button.setAttribute('id','db-management');
                 button.addEventListener('click',e=>{
                      document.querySelector('#contactdb').dispatchEvent(new CustomEvent('data-management', { detail: {} }));
                 });
                 that.appendChild(button);
            }
            // that.answer = {};
            // that.eventListen();
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



sentEmail(to,subject, content){
  let mailUrl = "https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail/";
  let data = 
        {
          "from": "support@01power.net",
          "to": to,
          "subject": subject,
          "html": content
        };

   this.postData(mailUrl,data).then(result=>{
      console.log(result);
      alert('謝謝你的查詢。我們會儘快回覆');
   });     
}

postData(url, data) {
  // Default options are marked with *
  
  return new Promise(function (resolve, reject) {
    fetch(url, {
      body: JSON.stringify(data), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })
    .then(response => {
      resolve(response.json());
    }) // parses response to JSON
  });
  
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

            document.dispatchEvent(new CustomEvent('save-data', { detail: {'table':'test','id':new Date().getTime(),'data':data} }));
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
function loadModule(url){
  
  let fileref=document.createElement('script');
  
  fileref.setAttribute("type","module");
  fileref.setAttribute("src", url);
  // fileref.setAttribute('defer','');
  // fileref.setAttribute('id','wc-'+id);
  document.getElementsByTagName("head")[0].appendChild(fileref);
  // this.loadedComponent.push(id);


}
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
window.onload = function() {
const app = new Smart.App(
  {
    id: "contact-form",
    template: {
      "#dz-name": {
        properties: {
          value: "",
          placeholder: "姓名"
        },
        bind: {
          value: "name"
        }
      },
      "#dz-email": {
        properties: {
          value: "",
          placeholder: "電郵"
        },
        bind: {
          value: "email"
        }
      },
      "#dz-phone": {
        properties: {
          value: "",
          placeholder: "電話"
        },
        bind: {
          value: "phone"
        }
      },
      "#dz-topic": {
        properties: {
          value: "",
          placeholder: "主題"
        },
        bind: {
          value: "topic"
        }
      },

      '#enquiry': {
          listeners: {
          click: 'submit'
          }
      }

    },	
    data: {
      name: "",
      email: "",
      phone: '',
      topic: "",
      content: "",
      submit: function(event){
          console.log('我是中國人');

          let mailUrl = "https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail/";
          let message = '';
          message += "姓名:"+app.data['name']+"<br>\n";
          message += "電話:"+app.data['phone']+"<br>\n";
          message += "電郵:"+app.data['email']+"<br>\n";
          message += "主題:"+app.data['topic']+"<br>\n";
          message += "內容:"+app.data['content']+"<br>\n";
          let data = 
                {
                  "from": "support@01power.net",
                  "to": "fsp@nlpra.org.hk",
                  "subject": '收到查詢：'+app.data['topic'],
                  "html": message
                };
   
          postData(mailUrl,data).then(result=>{
              console.log(result);
              alert('謝謝你的查詢。我們會儘快回覆');
          });     
      },
    }
  }
)
}

function postData(url, data) {
  // Default options are marked with *
  
  return new Promise(function (resolve, reject) {
    fetch(url, {
      body: JSON.stringify(data), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })
    .then(response => {
      resolve(response.json());
    }) // parses response to JSON
  });
  
}