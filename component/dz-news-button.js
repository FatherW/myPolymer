
  
  customElements.define('dz-news-button',
    class extends HTMLElement {
      constructor() {
        super();
        let that = this;
        let dbUrl = "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController";

//        document.dispatchEvent(new CustomEvent('isAdmin', { detail: {} }));

        let button = document.createElement('button');
        button.setAttribute('id','dz-add-news');
        button.innerHTML = '新增資料';
        this.appendChild(button);


       
     
      }

      searchData(index,table,query){
        let params = {
          "action": "searchData",
          "index": index,
          "type": table,
          "body": {
              "query":query
          }
          // "sort":[{"發佈日期":"desc"}]
      }

        this.postData(dbUrl, params)
        .then(data => console.log('Data',data)) // JSON from `response.json()` call
        .catch(error => console.error(error))
  
        // Init Menu

      }
      postData(url, data) {
        // Default options are marked with *
        return fetch(url, {
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
        .then(response => response.json()) // parses response to JSON
      }
  
      connectedCallback(){

        console.log('Parent',this.parentElement);
          document.querySelector('#dz-add-news').addEventListener('click',e=>{
            var title = prompt("請輸入新聞主題", "");
            

          });

        document.addEventListener('isAdmin',e=>{
            let button = document.createElement('button');
            button.setAttribute('id','dz-add-news');
            button.innerHTML = '新增消息';
            that.appendChild(button);

        });
  
        
      }
  
    }
  );
  