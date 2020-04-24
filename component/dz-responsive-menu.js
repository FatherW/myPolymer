
customElements.define('dz-responsive-menu',
  class extends HTMLElement {
    constructor() {
      super();

 //     const temid = this.getAttribute('template');
 //     const template = document.getElementById(temid);
      const template = document.createElement('template');
      template.innerHTML = `
 <nav>
      <div class="nav-fostrap">
        <ul>
          <li><a href="">首頁</a></li>
          <li><a href="javascript:void(0)">關於我們</a>
            <ul class="dropdown">
              <li><a href="平台理念">平台理念</a></li>
              <li><a href="顧問團隊">顧問團隊</a></li>
              <li><a href="服務對象">服務對象</a></li>
              <li><a href="聯絡方法">聯絡方法</a></li>
            </ul>
          </li>
          <li><a href="javascript:void(0)" >港澳資源</a>
            <ul class="dropdown">
              <li><a href="香港優勢">香港優勢</a></li>
              <li><a href="澳門優勢">澳門優勢</a></li>
              <li><a href="一帶一路">一帶一路</a></li>
              <li><a href="大灣區">大灣區</a></li>
            </ul>
          </li>
          <li><a href="javascript:void(0)" >客戶服務</a>
            <ul class="dropdown">
              <li><a href="業務拓展">業務拓展</a></li>
              <li><a href="市場研究">市場研究</a></li>
              <li><a href="戰略諮詢">戰略諮詢</a></li>
            </ul>
          </li>
          <li><a href="javascript:void(0)" >會員制度</a>
            <ul class="dropdown">
              <li><a href="鑽卡會員">鑽卡會員</a></li>
              <li><a href="金卡會員">金卡會員</a></li>
              <li><a href="銀卡會員">銀卡會員</a></li>
            </ul>

          </li>
          <li><a href="javascript:void(0)" >專注行業</a>
            <ul class="dropdown">
              <li><a href="大健康">大健康</a></li>
              <li><a href="物業管理">物業管理</a></li>
              <li><a href="智能產品">智能產品</a></li>
              <li><a href="環保可持續發展">環保可持續發展</a></li>
            </ul>
          </li>
          <li><a href="javascript:void(0)">附帶活動</a>
            <ul class="dropdown">
              <li><a href="移民">移民</a></li>
              <li><a href="投資">投資</a></li>
              <li><a href="升學">升學</a></li>
            </ul>
          
          </li>
        </ul>
      </div>
      <div class="nav-bg-fostrap">
        <div class="navbar-fostrap" id="dz-bar"> <span></span> <span></span> <span></span> </div>
        <a href="" class="title-mobile">China HKMO Ltd.</a>
      </div>
    </nav>

    <script>

    $(document).ready(function(){
    $('dz-responsive-menu::shadow .navbar-fostrap').click(function(){
      console.log('Click');
      $('dz-responsive-menu::shadow .nav-fostrap').toggleClass('visible');
      $('body').toggleClass('cover-bg');
    });
  });
  </script>
      `;
      const templateContent = template.content;
      const shadowRoot = this.attachShadow({mode: 'open'});
      const style = document.createElement('style');
      style.innerHTML = `

* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  background: #F0F0F0;
  font-size: 15px;
  color: #666;
  font-family: 'Roboto', sans-serif;
}
.content {
  height: 200px;
}
a { text-decoration: none; }


.container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.nav-fostrap {
  display: block;
  margin-bottom: 15px 0;
  background: #14214f;
  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  -moz-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  -ms-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  -o-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  border-radius: 3px;
}

.nav-fostrap ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: block;
}

.nav-fostrap li {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: inline-block;
  position: relative;
  font-size: 14px;
  color: #def1f0;
}

.nav-fostrap li a {
  padding: 15px 20px;
  font-size: 14px;
  color: #def1f0;
  display: inline-block;
  outline: 0;
  font-weight: 400;
}

.nav-fostrap li:hover ul.dropdown { display: block; }

.nav-fostrap li ul.dropdown {
  position: absolute;
  display: none;
  width: 200px;
  background: #2980B9;
  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  -moz-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  -ms-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  -o-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  padding-top: 0;
  z-index:3;
  top:36px;

}

.nav-fostrap li ul.dropdown li {
  display: block;
  list-style-type: none;
}

.nav-fostrap li ul.dropdown li a {
  padding: 15px 20px;
  font-size: 15px;
  color: #fff;
  display: block;
  font-weight: 400;
}

.nav-fostrap li ul.dropdown li:last-child a { border-bottom: none; }

.nav-fostrap li:hover a {
  background: #2980B9;
  color: #fff !important;
}

.nav-fostrap li:first-child:hover a { border-radius: 3px 0 0 3px; }

.nav-fostrap li ul.dropdown li:hover a { background: rgba(0,0,0, .1); }

.nav-fostrap li ul.dropdown li:first-child:hover a { border-radius: 0; }

.nav-fostrap li:hover .arrow-down { border-top: 5px solid #fff; }

.arrow-down {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #def1f0;
  position: relative;
  top: 15px;
  right: -5px;
  content: '';
}
.title-mobile {
  display: none;
}
 @media only screen and (max-width:900px) {

      .nav-fostrap {
        background: #fff;
        width: 200px;
        height: 100%;
        display: block;
        position: fixed;
        left: -200px;
        top: 0px;
        -webkit-transition: left 0.25s ease;
        -moz-transition: left 0.25s ease;
        -ms-transition: left 0.25s ease;
        -o-transition: left 0.25s ease;
        transition: left 0.25s ease;
        margin: 0;
        border: 0;
        border-radius: 0;
        overflow-y: auto;
        overflow-x: hidden;
        height: 100%;
      }
      .title-mobile {
        position: fixed;
        display: block;
          top: 10px;
          font-size: 20px;
          left: 100px;
          right: 100px;
          text-align: center;
          color: #FFF;
      }
      .nav-fostrap.visible {
        z-index:5;
        left: 0px;
        -webkit-transition: left 0.25s ease;
        -moz-transition: left 0.25s ease;
        -ms-transition: left 0.25s ease;
        -o-transition: left 0.25s ease;
        transition: left 0.25s ease;
      }

      .nav-bg-fostrap {
        position:fixed !important;
        display: inline-block;
        vertical-align: middle;
        width: 100%;
        height: 50px;
        margin: 0;
        position: absolute;
        top: 0px;
        left: 0px;
        background: #03A9F4;
        padding: 12px 0 0 10px;
        -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
        -moz-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
        -ms-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
        -o-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
      }

      .navbar-fostrap {
        display: inline-block;
        vertical-align: middle;
        height: 50px;
        cursor: pointer;
        margin: 0;
          position: absolute;
          top: 0;
          left: 0;
          padding: 12px;
      }

      .navbar-fostrap span {
        height: 2px;
        background: #fff;
        margin: 5px;
        display: block;
        width: 20px;
      }

      .navbar-fostrap span:nth-child(2) { width: 20px; }

      .navbar-fostrap span:nth-child(3) { width: 20px; }

      .nav-fostrap ul { padding-top: 50px; }

      .nav-fostrap li { display: block; }

      .nav-fostrap li a {
        display: block;
        color: #505050;
        font-weight: 600;
      }

      .nav-fostrap li:first-child:hover a { border-radius: 0; }

      .nav-fostrap li ul.dropdown { position: relative; top:0px;}

      .nav-fostrap li ul.dropdown li a {
        background: #2980B9 !important;
        border-bottom: none;
        color: #fff !important;
      }

      .nav-fostrap li:hover a {
        background: #03A9F4;
        color: #fff !important;
      }

      .nav-fostrap li ul.dropdown li:hover a {
        background: rgba(0,0,0,.1); !important;
        color: #fff !important;
      }

      .nav-fostrap li ul.dropdown li a { padding: 10px 10px 10px 30px; }

      .nav-fostrap li:hover .arrow-down { border-top: 5px solid #fff; }

      .arrow-down {
        border-top: 5px solid #505050;
        position: absolute;
        top: 20px;
        right: 10px;
      }

      .cover-bg {
        background: rgba(0,0,0,0.5);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
}
 @media only screen and (max-width:1199px) {

.container { width: 96%; }
}

.fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}
`;

     shadowRoot.appendChild(style);
     shadowRoot.appendChild(templateContent.cloneNode(true));
     this.handleClick = this.handleClick.bind(this);
     shadowRoot.getElementById('dz-bar').addEventListener('click',function(e){
        shadowRoot.getElementsByClassName('.nav-fostrap')[0].setAttribute('class','nav-fostrap visible');
     });
  

  }

  handleClick(e){
    // const shadowRoot = this.attachShadow({mode: 'open'});
    console.log('click');
    this.getElementsByClassName('.nav-fostrap')[0].setAttribute('class','nav-fostrap visible');
       // $(document).ready(function(){
       //    $('dz-responsive-menu::shadow .navbar-fostrap').click(function(){
       //      console.log('Click');
       //      $('dz-responsive-menu::shadow .nav-fostrap').toggleClass('visible');
       //      $('body').toggleClass('cover-bg');
       //    });
       //  });
  }
});