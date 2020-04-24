// loadScript("https://unpkg.com/ag-grid-community/dist/ag-grid-community.min.js");
// loadScript("https://d25k6mzsu7mq5l.cloudfront.net/backend7.0/fieldRenderer.js");
// loadStyle("https://d25k6mzsu7mq5l.cloudfront.net/smart/smart.default.css");
// loadScript("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/js/webcomponents-lite.js");
// loadModule("https://d25k6mzsu7mq5l.cloudfront.net/smart/smart.element.js");
// loadModule("https://d25k6mzsu7mq5l.cloudfront.net/smart/smart.radiobutton.js");
// loadModule("https://d25k6mzsu7mq5l.cloudfront.net/smart/smart.textbox.js");
// loadModule("https://d25k6mzsu7mq5l.cloudfront.net/smart/smart.dropdownlist.js");

// loadScript("https://d25k6mzsu7mq5l.cloudfront.net/cdn7.2/js/dazzle.common.js");
// loadScript("https://d25k6mzsu7mq5l.cloudfront.net/cdn7.2/js/data.common.js");

window['tid'] ="hkfspa";
window['uid']="hkfspa";

customElements.define('hkfspa-form',
class extends HTMLElement {
  constructor() {
    super();
      

this.receiveemail = 'hkfspa@hkfspa.org';
this.formdata = {}; //init default form object
this.formdata['驗證'] = "";
this.formdata['折扣碼'] = "";
this.formdata['價錢'] =0;
this.coursesData = {};
this.totalCoursePrice = 0; //set default show price to 0
this.originalPrice = 0; //set default original price to 0
this.authCode = stringGen(5); //set 5 random code
this.selectedCourseObj = {}; //tmp selected course object 
this.selectedCourse = {}; //tmp selected course object title and content for display
this.checkedOnlineSubmit = false; // init online submit disabled to false
this.checkedPaySubmit = false; // init paypal submit disabled to false
this.authStatus = 'has-normal';
this.couponStatus = 'has-normal';
this.actionToSubmit='online';
this.courseDb = new DataPackage('course');

var tmpAllCoruseObj; //tmp all course object



      let thisPage = decodeURIComponent(window.location.pathname).substring(window.location.pathname.indexOf('/') + 1) || 'index.html';
      let editMode = store.get('editMode') || 'normal';

     





  

}

  getTemplate(){
    console.log('Get Template');
    const template = document.querySelector('meta[tid]').getAttribute('tid');
    const id = this.getAttribute('id') || '_default';
    const user = store.get('user');
    let that = this;
    let path,fullpath;
    let app;
    

    path = "https://www.hkfspa.org/template/"+template+'/DZ-PAGE-BLOCK/';
    console.log('Path',path,this.authCode);
    //  let path = "https://d25k6mzsu7mq5l.cloudfront.net/template7.0/";
      let thisPage = decodeURIComponent(window.location.pathname).substring(window.location.pathname.indexOf('/') + 1) || 'index.html';
      let editMode = store.get('editMode') || 'normal';

      fullpath = path+"_master/"+id+'/html';

      console.log('Component Path',fullpath);

      fullpath = fullpath +"?id="+new Date().getTime();
      console.log('Full Path',fullpath);
      return new Promise(function (resolve, reject) {
        getContent(fullpath).then(html=>{
            resolve(html);
        });
      });

  }
    initDataModel(){
      let that = this;
      const app = new Smart.App(
        {
          selector:'#enrollForm',
          data: {
            name: "",
            phone:"",
            email:"",
            company:"",
            price:that.formdata['價錢'],
            auth:"",
            coupon:"",
            course: that.courses,
            changeCourse: function(event) {
              // alert("Submitting: " + this.message);
              let target = event.target;
              that.formdata['價錢']=that.coursesData[this.course[0]]['課程費用'];
              this.price = that.formdata['價錢'];
              console.log('Change Course',that.formdata,that.coursesData[this.course[0]]);
            },
            submit: function(event) {
              console.log('Submit',event);
              that.submit(this,"online");
              // alert("Submitting: " + this.message);
            },
            submitAndPay: function(event) {
              console.log('Submit And Pay',event);
              that.submit(this,"paypal");

              // alert("Submitting: " + this.message);
            }
          }
        }
      )				

      this.querySelector('#dropDownList').dataSource = this.courses;
      console.log(this.querySelector('#dropDownList'));
      let name = this.querySelector('#name');
      name.addEventListener('change', function (event) {
          console.log(event.detail.newValue);
          // document.getElementById('log').innerHTML += '<br>' + '<b>' + event.type + '</b>' + ' event fired with details: ' +
          //     'newValue: <b>' + event.detail.newValue + '</b>' + ', oldValue: <b>' + event.detail.oldValue + '</b>';
      });

      name.addEventListener('change',e=>{
          this.name = name.value; 
          console.log(this.name);
      });

      let email = this.querySelector('#email');
      email.addEventListener('change',e=>{
          this.email = email.value; 
          console.log(this.email);
      });


    }
           

      initCourse() {
          console.log('Init Course');
          let courses = new DataPackage("course");
          return new Promise(function (resolve, reject) {
              let course = new DataPackage('course');
              course.getAllData().then(function(data){
              //get course data
                this.courses = data;
                resolve(); 
              },function(err){
                console.log('Err',err);
                this.courses =[];
                resolve();
              });                  
          });
      }




// $http.get('/content/coupon-data.json').then(function(response) {
//     this.couponData = response.data;
// });

changePayMethod(actionToSubmit){
    this.actionToSubmit=actionToSubmit;
    this.submitThisForm();
}

submit(data,mode){
   //if all required elements are valid
   let order = new DataPackage('order');
    let name = document.querySelector('#name').value;
    let phone = document.querySelector('#phone').value;
    let company = document.querySelector('#company').value;
    let email = document.querySelector('#email').value;
    let auth = document.querySelector('#auth').value;
    if (auth !== this.authCode){
      alert('驗證碼不正確請重新輸入！');
      return false;
    }

    var createData = new Date();
    this.formdata.formid = createData.getTime(); // set form id
    var nd = new Date((createData.getTime() / 1000 + (3600 * 8)) * 1000);
    this.formdata['報名學生'] = name;
    this.formdata['聯絡電話'] = phone;
    this.formdata['公司'] = company;
    this.formdata['電郵'] = email;
//    this.formdata['價錢'] = data.price;
    this.formdata['日期時間'] = nd.toGMTString(); // set datetime
    //this.formdata['價錢'] = data.price;
    
    //check payment method
    if (mode === 'paypal') {
        this.formdata['付款狀態'] = '未付款';
        this.checkedPaySubmit = true;
    } else {
        this.formdata['付款狀態'] = '網上提交';
        this.checkedOnlineSubmit = true;
    }
    
    //if coupon wrong, clear it
    if (this.couponStatus != 'has-success') {
        this.formdata['折扣碼'] = "";
    }
    this.formdata['訂單編號'] = this.formdata.formid;
    this.formdata['交易編號'] = '';
    this.formdata['課程／講座名稱'] = data.course[0];
    var customMsg=JSON.stringify({
        "invoice_id":this.formdata.formid,
        "user_id":location.hostname,
        "websiteKey":'hkfspa.dazzle.website',
        "table_name":"訂單",
        "user_email":data.email
    });
    let options = {
        "cmd": "_xclick",
        "business": "hkfspa@hkfspa.org",
        "item_name": this.formdata['課程／講座名稱'],
        "item_number": 1,
        "notify_url": "https://d8fz9pfue5.execute-api.ap-northeast-1.amazonaws.com/prod/paypal-ipn",
        "return": "http://www.hkfspa.org/payment-done.html?orderNum="+this.formdata.formid,
        "cancel_return": "http://www.hkfspa.org/enroll.html",
        "lc": "zh_HK",
        'charset':'utf-8',
        "invoice": this.formdata.formid,
        "custom": customMsg,
        "amount": this.formdata['價錢'],
        //"amount": 1,
        "currency_code": "HKD",
        "button_subtype": "services",
        "no_note": 0,
        "rm": 1
    };

    var key = new Date().getTime();
    this.formdata['ID'] = key;
    this.formdata['報名日期'] = new Date().getTime();

   
    this.emailToUser("hkfspa@hkfspa.org"); 
    this.emailToUser(this.formdata['電郵']);

    if (mode === 'paypal') {
        //emailToUser();
         location.href = getPayPalLink(options);
    } else {
        // emailToUser();
        console.log(this.formdata);
        order.saveData(this.formdata.formid,this.formdata).then(function(){
          alert('成功發送');          
        },function(){
          alert('失敗發送，請聯絡管理員');
        });
    }
            
} //end if


submitThisForm(actionToSubmit) {
    //if all required elements are valid
    
    if (this.myForm.$valid) {
        if (this.formdata['驗證'] != this.authCode) {
            alert('驗證碼不正確請重新輸入！');
            return false;
        }

        var createData = new Date();
        this.formdata.formid = createData.getTime(); // set form id
        var nd = new Date((createData.getTime() / 1000 + (3600 * 8)) * 1000);
        this.formdata['日期時間'] = nd.toGMTString(); // set datetime
        this.formdata['價錢'] = this.totalCoursePrice;
        
        //check payment method
        if (actionToSubmit == 'paypal') {
            this.formdata['付款狀態'] = '未付款';
            this.checkedPaySubmit = true;
        } else {
            this.formdata['付款狀態'] = '網上提交';
            this.checkedOnlineSubmit = true;
        }
        
        //if coupon wrong, clear it
        if (this.couponStatus != 'has-success') {
            this.formdata['折扣碼'] = "";
        }
        this.formdata['訂單編號'] = this.formdata.formid;
        this.formdata['交易編號'] = '';
        this.formdata['課程／講座名稱'] = this.courseName;
        var customMsg=JSON.stringify({
            "invoice_id":this.formdata.formid,
            "user_id":this.hostname,
            "websiteKey":this.websiteKey,
            "table_name":this.formname,
            "user_email":this.formdata['電郵']
        });
        let options = {
            "cmd": "_xclick",
            "business": "hkfspa@hkfspa.org",
            "item_name": this.courseName,
            "item_number": this.formdata['課程／講座'],
            "notify_url": "https://d8fz9pfue5.execute-api.ap-northeast-1.amazonaws.com/prod/paypal-ipn",
            "return": "http://www.hkfspa.org/payment-done.html?orderNum="+this.formdata.formid,
            "cancel_return": "http://www.hkfspa.org/enroll.html",
            "lc": "zh_HK",
            'charset':'utf-8',
            "invoice": this.formdata.formid,
            "custom": customMsg,
            "amount": this.totalCoursePrice,
            //"amount": 1,
            "currency_code": "HKD",
            "button_subtype": "services",
            "no_note": 0,
            "rm": 1
        };

        var key = new Date().getTime();
        this.formdata['ID'] = key;
        this.formdata['報名日期'] = new Date().getTime();

       


        if (actionToSubmit == 'paypal') {
            //emailToUser();
             location.href = getPayPalLink(options);
        } else {
            emailToUser();
             dbFactory.saveData("hkfspa.dazzle.website","enroll",key,this.formdata).then(function(){
                $dazzlePopup.toast('成功儲存資料');

            },function(){
                $dazzlePopup.toast('不成功儲存資料');
            });
        }
                
    } //end if
}

changeCourse() {
            console.log(this.coursesData);
              let name = document.querySelector('#course-list').value;
              this.formdata['價錢']=this.coursesData[name]['課程費用'];
              document.querySelector('#course-price').innerHTML = this.formdata['價錢'];
              this.price = this.formdata['價錢'];
            
    // console.log('Change Course');
    // this.formdata['折扣碼'] = ""; //clear coupon code
    // this.couponStatus = 'has-normall';
    
    // if (angular.isUndefined(selectedCode)) {
    //     //if no selectedCode, init data
    //     this.selectedCourseObj = {};
    //     this.courseName = "";
    //     this.originalPrice = 0;
    //     this.totalCoursePrice = 0;
    //     //this.selectedCourse['title'] = "";
    //     //this.selectedCourse['content'] = "";
    //     return false;
    // }

    // let price =0;
    // this.courseDb.matchData({"Course Name":name}).then(result=>{
    //   that.formdata['價錢']=result['課程費用'];
    // });

    // var thisCourse = tmpAllCoruseObj.filter(x => x['Course Code'] === selectedCode);
    // if(thisCourse.length==1){
    //     //if course selected
    //     this.formdata['課程／講座']=selectedCode;
    //     this.selectedCourseObj = thisCourse[0];
    //     this.courseName = thisCourse[0]['Course Name'];
    //     this.originalPrice = parseFloat(this.selectedCourseObj['課程費用']);
    //     this.totalCoursePrice = parseFloat(this.selectedCourseObj['課程費用']);
    //     if (angular.isUndefined(this.selectedCourseObj['Coupon'])){
    //         this.selectedCourseObj['Coupon']=[];
    //     }
    // }

    // console.log('Change Course',this.originalPrice,this.totalCoursePrice);
}

checkCoupon (thisData) {
    this.totalCoursePrice = angular.copy(this.originalPrice);
    
    //check coupon code for payment
    if (this.selectedCourseObj['Coupon'].length==0 && this.formdata['折扣碼'] == "") {
        this.formdata['折扣碼']="";
        this.couponStatus = 'has-normall';
        return false;
    }
    if (this.selectedCourseObj['Coupon'].length==0 && this.formdata['折扣碼'] != "") {
        this.couponStatus = 'has-error';
        return false;
    }
    
    if (this.selectedCourseObj['Coupon'].length > 0 && this.formdata['折扣碼'] != "") {
        var matchCourseCouponObj = this.selectedCourseObj['Coupon'].filter(function(value) { return value == this.formdata['折扣碼']; }); //if input code match course's coupon code
        var matchCouponDataObj = this.couponData.filter(x => x['Coupon Code'] === this.formdata['折扣碼']); //if input code match coupon poor
        if (matchCourseCouponObj.length > 0 && matchCouponDataObj.length > 0) {
            //if coupon code match course and coupon poor
            if (matchCouponDataObj[0]['Valid'] == '是') {
                //if coupon is valid
                if (new Date().getTime() < new Date(matchCouponDataObj[0]['Expiry Date']).getTime()) {
                    if (matchCouponDataObj[0]['Coupon Type'] == "Discount Amount") {
                        //if coupon is discount by amount
                        this.totalCoursePrice = this.originalPrice - parseFloat(matchCouponDataObj[0]['Discount Amount']);
                    } else {
                        this.totalCoursePrice = parseFloat(this.originalPrice * (100 - parseFloat(matchCouponDataObj[0]['Discount(%)'])) / 100).toFixed(2);
                    }
                    this.couponStatus = 'has-success';
                    return;
                } else {
                    //coupon expiry
                    //this.couponStatus = 'has-error';
                }
            } else {
                //if coupon is invalid
                //this.couponStatus = 'has-error';
            }
        } else {
            //if input code not match all
            //this.couponStatus = 'has-error';
        }
        this.couponStatus = 'has-error';
    } else {
        this.couponStatus = 'has-normall';
    }
}

checkAuth (thisData) {
    if (angular.isUndefined(this.formdata['驗證'])) {
        this.authStatus = 'has-normall';
    } else if (this.formdata['驗證'] == this.authCode) {
        this.authStatus = 'has-success';
    } else {
        this.authStatus = 'has-error';
    }
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


 emailToUser(email) {
  let api = "https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail";
  var jsonToAdmin = {};
  jsonToAdmin['from'] = 'support@01power.net';
  jsonToAdmin['to'] = email;
  jsonToAdmin['subject'] = '香港金融業協會課程網上報名';
  jsonToAdmin['html'] = '有新的課程網上報名表格提交<br><br>參考編號為:' + this.formdata.formid;
  jsonToAdmin['html'] += '<br>課程名稱:' + this.formdata['課程／講座名稱'];
  $.ajax({
      type: "POST",
      url: api,
      data: JSON.stringify(jsonToAdmin),
      contentType: "text/json; charset=utf-8",
      dataType: "json",
      success: function(msg) {
          alert("提交成功");
          location.reload();
      },
      error: function(msg) {
          alert("提交成功");
          location.reload();
      }
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
      let courses = new DataPackage('course');
      // console.log('HTML',this,this.innerHTML);
      let editMode = store.get('editMode') || 'normal';
      let option = document.createElement('option');
      let item;
      this.courseDb.getAllData().then(data=>{
        this.courses=[];
        data.forEach(item=>{
            this.courses.push(item['Course Name']);
            this.coursesData[item['Course Name']] = item;
        });
        console.log('Course Data',this.coursesData);

        console.log('This Courses',this.courses);
        this.getTemplate().then(html=>{          
              // console.log('Component HTML',fullpath,html);  
              that.innerHTML = html;
              data.forEach(item=>{
                  let elm = option.cloneNode(true);
                  elm.setAttribute('value',item['Course Name']);
                  elm.innerHTML = item['Course Name'];
                  document.querySelector('#course-list').append(elm);
              });

              document.querySelector('#course-list').addEventListener('change',e=>{
                  that.changeCourse();
              });

              var c = document.getElementById("myCanvas");
              var ctx = c.getContext("2d");
              ctx.font = "14px Arial";
              ctx.shadowBlur = 30;
              ctx.shadowColor = "rgb(90, 90, 0)";
              ctx.strokeStyle = "#ff0099";
              ctx.fillText(that.authCode, 8, 20);
              if (editMode ==="admin"){
                  let button = document.createElement('button');
                  button.innerHTML = '查詢管理';
                  button.setAttribute('id','db-management');
                  button.setAttribute('style','position:absolute; top:0px; right:0px;');
                  button.addEventListener('click',e=>{
                        document.querySelector('#contactdb').dispatchEvent(new CustomEvent('data-management', { detail: {} }));
                  });
                  that.appendChild(button);
              }
              that.initDataModel();              

        });
      });

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
window.onload= function() {
const app = new Smart.App(
  {
    id: "contact-form",
    template: {
      "#dz-ename": {
        properties: {
          value: "",
          placeholder: "英文姓名"
        },
        bind: {
          value: "ename"
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
      "#dz-company": {
        properties: {
          value: "",
          placeholder: "公司名稱"
        },
        bind: {
          value: "company"
        }
      },
      "#dz-mobile": {
        properties: {
          value: "",
          placeholder: "手提電話"
        },
        bind: {
          value: "mobile"
        }
      },
      "#dz-course": {
        properties: {
          value: "",
          placeholder: "課程/講座"
        },
        bind: {
          value: "course"
        }
      },
      "#dz-discount": {
        properties: {
          value: "",
          placeholder: "折扣代碼"
        },
        bind: {
          value: "discount"
        }
      },
      "#dz-authcode": {
        properties: {
          value: "",
          placeholder: "驗證碼"
        },
        bind: {
          value: "authcode"
        }
      },
      '#enquiry': {
          listeners: {
          click: 'submit'
          }
      },
      '#pay': {
        listeners: {
        click: 'pay'
        }
      }

    },	
    data: {
      name: "",
      email: "",
      phone: '',
      topic: "",
      content: "",
      pay: function(event){

      },
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



function emailToAdmin() {
  console.log(this.receiveemail);
  if (!this.receiveemail) {
      alert("提交成功");
      location.reload();
      return false;
  }
  api = "https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail";
  var jsonToAdmin = {};
  jsonToAdmin['from'] = 'support@01power.net';
  jsonToAdmin['to'] = this.receiveemail;
  jsonToAdmin['subject'] = '香港金融業協會課程網上報名';
  jsonToAdmin['html'] = '有新的課程網上報名表格提交<br><br>參考編號為:' + this.formdata.formid;
  jsonToAdmin['html'] += '<br>課程名稱:' + this.formdata['課程／講座名稱'];
  $.ajax({
      type: "POST",
      url: api,
      data: JSON.stringify(jsonToAdmin),
      contentType: "text/json; charset=utf-8",
      dataType: "json",
      success: function(msg) {
          alert("提交成功");
          location.reload();
      },
      error: function(msg) {
          alert("提交成功");
          location.reload();
      }
  });
}


function emailToUser() {
  console.log($scope.receiveemail);
  if (angular.isUndefined($scope.formdata['電郵'])) {
      //alert("提交成功");
      emailToAdmin();
      //location.reload();
      return false;
  }
  api = "https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail";
  var jsonToAdmin = {};
  jsonToAdmin['from'] = 'support@01power.net';
  jsonToAdmin['to'] = $scope.formdata['電郵'];
  jsonToAdmin['subject'] = '香港金融業協會課程網上報名';
  jsonToAdmin['html'] = '您好！您的香港金融業協會課程網上報名表格成功提交<br><br>參考編號為:' + $scope.formdata.formid;
  jsonToAdmin['html'] += '<br>課程名稱:' + $scope.formdata['課程／講座名稱'];
  jsonToAdmin['html'] += '<br>課程編號:' + $scope.formdata['課程／講座'];
  jsonToAdmin['html'] += '<br><br>香港金融業協會';
  $.ajax({
      type: "POST",
      url: api,
      data: JSON.stringify(jsonToAdmin),
      //async: false,
      contentType: "text/json; charset=utf-8",
      dataType: "json",
      success: function(msg) {
          //alert("提交成功");
          //location.reload();
          emailToAdmin();
      },
      error: function(msg) {
          //alert("提交成功");
          //location.reload();
          emailToAdmin();
      }
  });
}
function stringGen(len) {
  let text = "";
  let charset = "abcdefghijkmnopqrstuvwxyz123456789ABCDEFGHJKLMNPQRSTUVWXYZ123456789";
  for (var i = 0; i < len; i++) {
      text += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return text;
}

function getPayPalLink(options) {

  let myQuery = 'https://www.paypal.com/cgi-bin/webscr?';
  var count = 0;
  for (let entry in options) {
      myQuery += ((count++ > 0) ? "&" : "") + entry + '=' + encodeURIComponent(options[entry]);
  }
  return myQuery;
}

function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : sParameterName[1];
      }
  }
  return false;
};