loadStyle("https://www.htmlelements.com/demos/source/styles/smart.default.css");
loadScript("https://www.htmlelements.com/demos/source/webcomponents-lite.js");
loadModule("https://d25k6mzsu7mq5l.cloudfront.net/smart/smart.element.js");
loadModule("https://d25k6mzsu7mq5l.cloudfront.net/smart/smart.datetimepicker.js");
loadModule("https://d25k6mzsu7mq5l.cloudfront.net/smart/smart.combobox.js");
loadScript("https://unpkg.com/ag-grid-community/dist/ag-grid-community.min.js");
loadScript("https://d25k6mzsu7mq5l.cloudfront.net/backend7.0/fieldRenderer.js");
//loadScript("https://d25k6mzsu7mq5l.cloudfront.net/component/dz-data-item2.js");
  
loadComponentScript('dz-schema-management');
    console.log('DZ WHOLE GRID');
    let hi = new DataPackage();
    let _info = new DataPackage("_info");
    _info.getAllData().then(result=>{
        console.log('Info',result);
    });
 

customElements.define('dz-whole-grid',
class extends HTMLElement {
  constructor() {
    super();
       const template = document.querySelector('meta[tid]').getAttribute('tid');
       const uid = document.querySelector('meta[uid]').getAttribute('uid');
       const id = this.getAttribute('id') || '_default';
       const user = store.get('user');
       const editMode = store.get('editMode') || 'normal';
//       let dataset = window['curTarget'];
  //     this.curTarget = dataset;
    //    this.curTable = window['curTable'];
       this.key = "_id";
       this.updateAll = false;
        let allow_menu = [];
       window['myGrid'] = this;
       this.tables = window['myTable'];
       console.log(window);
       let that = this;
       if (this.tables)
           this.myData = window['myTable'][0] || null;
        else
            this.myData = null;
       this.updateRows =[];
       document.dispatchEvent(new CustomEvent('allow-menu', { detail: {'component':that.tagName,'menu':allow_menu} }));

        this.selectedRows =[];
       let path = "https://d25k6mzsu7mq5l.cloudfront.net/file7.0/DZ-WHOLE-GRID/template?id="+new Date().getTime();
    //    this.constructColumns();
    //    this.columns = myData.constructColumns();
       fetch(path)
       .then(function(response) {
           // When the page is loaded convert it to text
           return response.text()
       })
       .then(function(html) {
            that.innerHTML = html;
            that.initGrid();
            that.updateTable();
            that.initButton();
            // that.querySelector('#dz-import-data').addEventListener('click',e=>{
            //     that.importJson();
            // });

            // that.querySelector('#dz-save-data').addEventListener('click',e=>{
            //     that.save();
            // });
            // that.querySelector('#dz-reload-data').addEventListener('click',e=>{
            //         that.refresh();
            // });
            // that.querySelector('#dz-add-data').addEventListener('click',e=>{
            //         // that.curTarget.addData();
            //     let newObject = {};
            //     let id = new Date().getTime();
            //     newObject["_id"] = id; 
            //     that.updateRows.push(id);                  
            //     that.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});

            //     //    that.refresh();
            // });
            // that.querySelector('#dz-delete-data').addEventListener('click',e=>{
            //         that.delete();
            // });
        });
    }
    initButton(){
        let that = this;
        let editMode = store.get('editMode') || 'normal';
        let toolbar = this.querySelector('#toolbar-button');
        let button = document.createElement('smart-button');
        button.setAttribute('class','raised');
        let newButton1,newButton2,newButton3,newButton4,newButton5,newButton6;

        newButton1 = button.cloneNode(true);
        newButton1.innerHTML = '儲存'
        newButton1.addEventListener('click',e=>{
            that.save();
        });
        toolbar.appendChild(newButton1);

        newButton2 = button.cloneNode(true);
        newButton2.innerHTML = '刷新'
        newButton2.addEventListener('click',e=>{
            that.refresh();
        });
        toolbar.appendChild(newButton2);

        newButton3 = button.cloneNode(true);
        newButton3.innerHTML = '新增'
        newButton3.addEventListener('click',e=>{
            let newObject = {};
            let id = new Date().getTime();
            newObject["_id"] = id; 
//            that.updateRows.push(id);                  
            that.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});
            that.gridOptions.api.refreshInMemoryRowModel();

            // that.refresh();
        });
        toolbar.appendChild(newButton3);

        newButton4 = button.cloneNode(true);
        newButton4.innerHTML = '刪除'
        newButton4.addEventListener('click',e=>{
            that.delete();
        });
        toolbar.appendChild(newButton4);


            newButton5 = button.cloneNode(true);
            newButton5.innerHTML = '開新資料表';
            newButton5.addEventListener('click',e=>{
                // that.delete();
                that.createTable();
            });
            toolbar.appendChild(newButton5);

            newButton5 = button.cloneNode(true);
            newButton5.innerHTML = '編輯資料格式';
            newButton5.addEventListener('click',e=>{
                document.dispatchEvent(new CustomEvent('custom-popup', { detail: {'component':'dz-schema-management', 'size':'big','myData':this.myData} }));

                // that.delete();
//                that.myData.saveSchema(that.myData.columns);
            });
            toolbar.appendChild(newButton5);

            newButton6 = button.cloneNode(true);
            newButton6.innerHTML = '匯入'
            newButton6.addEventListener('click',e=>{
                const user = store.get('user');
                let fileManager = new AwsPackage(user);
                fileManager.getFile('files/book.json').then(result=>{
                    console.log('Result',result);
                    that.updateAll = true;
                    that.gridOptions.api.setRowData(JSON.parse(result));
                    that.gridOptions.api.refreshView();
                });

            });
            toolbar.appendChild(newButton6);


    }
    createTable(){
        // let myTable = new DataPackage(); 
        let table = prompt("請輸入新增資料表名稱");
        let myTable = new DataPackage(table);
        let _info = new DataPackage("_info");
        myTable.createIndex(table);  
        _info.saveData(table,{
            "name":table,
            "schema":[]
        });
    }

    updateTable(){
        let select_item;
        let that =this;
        // let myData = window['myTable'][0];
        let selectBox = document.querySelector('smart-combo-box');
        console.log(selectBox);
        let dataSource =[];
        this.tables.forEach(item=>{
            dataSource.push({
                'label':item.table,
                'value':item            
            });
        });
        selectBox.dataSource=dataSource;
        selectBox.addEventListener('change', function (event) {
            console.log('E',event,selectBox.selectedValues[0]);
            that.myData = new DataPackage(selectBox.value);
            // this.initGrid();
            that.myData.getGridColumns().then(colDef=>{
                that.myData.getAllData().then(data=>{
                    that.gridOptions.api.setColumnDefs(colDef);
                    that.gridOptions.api.setRowData(data);
                    that.gridOptions.api.refreshView();
                });
            });
            // that.columns =myData.constructColumns();
            // that.renew();
        });
        if (this.tables.length){
            this.myData.getGridColumns().then(colDef=>{
                this.myData.getAllData().then(data=>{
                    let agGrid = window['agGrid'];
                    var gridDiv = document.querySelector('#myGrid');
                    new agGrid.Grid(gridDiv, that.gridOptions);
    
                    that.gridOptions.api.setColumnDefs(colDef);
                    that.gridOptions.api.setRowData(data);
                    that.gridOptions.api.refreshView();
                });
            });
    
        }

    

    }
    add(){


        // var date = new Date().getTime().toString();
        // var newObject = {};
        // if (object) {
        //     newObject = object;
        // }
        // if (dbElastic.tableJson.data.type === 'dynamodb') {
        //     newObject[dbElastic.tableJson.data.key] = date;
        // }
        // for (var i = 0; i < dbElastic.schemaJson.length; i++) {
        //     if (dbElastic.schemaJson[i].defaultByTimestamp) {
        //         newObject[dbElastic.schemaJson[i].field] = dbElastic.schemaJson[i].default + date;
        //     } else if (dbElastic.schemaJson[i].default) {
        //         newObject[dbElastic.schemaJson[i].field] = dbElastic.schemaJson[i].default;
        //     }
        // }
        // dbElastic.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});
        // dbElastic.dataLength++;
        // dbElastic.gridOptions.api.refreshInMemoryRowModel();
        // dbElastic.gridOptions.api.getModel().rowsToDisplay[0].edited = true;

        let that = this;
        let newObject = {};
        let id = new Date().getTime();    
        newObject['_id'] =   id;
        // this.myData.saveData(id,newObject).then(res=>{
        //     that.refresh();
        // });             
        this.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});        
        // this.gridOptions.api.refreshInMemoryRowModel();
        // this.gridOptions.api.getModel().rowsToDisplay[0].edited = true;
    }

    update(data){
        console.log('Grid Update');
        this.gridOptions.api.updateRowData({update:[data]});
        this.gridOptions.api.refreshInMemoryRowModel();
        this.gridOptions.api.getModel().rowsToDisplay[0].edited = true;
        this.updateRows.push(data);       
    }
    save(){
        let that = this;
        if (this.updateAll) {
            console.log('Update All');
            this.gridOptions.api.forEachNode( function(rowNode, index) {
                let item = rowNode.data;
                console.log('node ' + rowNode.data + ' is in the grid');
                that.myData.updateData(item['_id'],item);

            });
        } else {
            this.updateRows.forEach(item=>{
                console.log('Update Item',item);
                that.myData.updateData(item['_id'],item);        
            });
            this.updateRows=[];
            this.refresh();
            alert('成功儲存');
        }

    }
    delete(){
        let that = this;
        var nodes = this.gridOptions.api.getSelectedNodes();
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].deleted = true;
        }

        that.selectedRows.forEach(item=>{
            that.myData.removeData(item[this.key]);
        });
        this.gridOptions.api.onFilterChanged();


        that.refresh();
    }
    refresh(){
        console.log('Refresh');
        let that = this;
        this.myData.getGridColumns().then(colDef=>{
            that.myData.getAllData().then(data=>{
                that.gridOptions.api.setColumnDefs(colDef);
                that.gridOptions.api.setRowData(data);
                that.gridOptions.api.refreshView();
            });
        });
    }
    importJson() {
        let that = this;
        getContent('https://www.hkfspa.org/json/member.json').then(result=>{
            console.log(result);
            var json = JSON.parse(result);
            that.gridOptions.api.updateRowData({add: json, addIndex: 0});
            that.myData.bulkUpdateData(json);
            that.updateAll = true;
            // that.refresh();
        });

        // this.makeRequest('GET',
        //     'https://www.hkfspa.org/json/member.json',
        //     // success
        //     function (data) {
        //         console.log(data);
        //         var json = JSON.parse(data);
        //         that.gridOptions.api.updateRowData({add: json, addIndex: 0});
        //     //    that.populateGrid(workbook);
        //     },
        //     // error
        //     function (error) {
        //         throw error;
        //     }
        // );
    }  
    importExcel() {
        let that = this;
        this.makeRequest('GET',
            'https://www.ag-grid.com/example-excel-import/OlymicData.xlsx',
            // success
            function (data) {
                var workbook = convertDataToWorkbook(data);
    
               that.populateGrid(workbook);
            },
            // error
            function (error) {
                throw error;
            }
        );
    }  
    makeRequest(method, url, success, error) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", url, true);
        httpRequest.responseType = "arraybuffer";
    
        httpRequest.open(method, url);
        httpRequest.onload = function () {
            success(httpRequest.response);
        };
        httpRequest.onerror = function () {
            error(httpRequest.response);
        };
        httpRequest.send();
    }

    populateGrid(workbook) {
        // our data is in the first sheet
        var firstSheetName = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[firstSheetName];
    
        // we expect the following columns to be present
        var columns = {
            'A': '中文姓名',
            'B': '英文姓名',
            'C': '有效期',
            'D': '協會認可資格',
            'E': '類別'
        };
    
        var rowData = [];
    
        // start at the 2nd row - the first row are the headers
        var rowIndex = 2;
    
        // iterate over the worksheet pulling out the columns we're expecting
        while (worksheet['A' + rowIndex]) {
            var row = {};
            Object.keys(columns).forEach(function(column) {
                row[columns[column]] = worksheet[column + rowIndex].w;
            });
    
            rowData.push(row);
    
            rowIndex++;
        }
    
        // finally, set the imported rowData into the grid
        gridOptions.api.setRowData(rowData);
    }  
    initGrid(){

        let that = this;
         console.log('My Data',this.myData);
         var rowData = [];
         var columnDefs =  [];
         console.log('Column',columnDefs);
         var key = this.key || '_id';
         console.log('Key',columnDefs,rowData);
         var gridOptions = {
           defaultColDef: {editable: true},
           columnDefs: columnDefs,
           rowData: rowData,
           singleClickEdit: true,
           rowSelection: 'multiple',
           enableColResize: true,
  //         enableFilter: true,
           enableSorting: true,
           rowMultiSelectWithClick: true,
           onSelectionChanged: onSelectionChanged,
           onCellValueChanged: function(params) {
              var changedData = [params.data];
              var row = params.data;            
              console.log(changedData);
              that.update(params.data);
          },
           onGridReady: function(event) {
               event.api.sizeColumnsToFit();
           }
         };
         this.gridOptions = gridOptions;
        
         function onSelectionChanged() {
              that.selectedRows = gridOptions.api.getSelectedRows();
              console.log(this.selectedRows);
          }
   
         // setup the grid after the page has finished loading
         // this.addEventListener('DOMContentLoaded', function() {
          //  console.log(window);
          
      }

    renew(){

      let that = this;
       console.log('My Data',this.myData);
       var rowData = this.myData.data ||[];
       var columnDefs = this.columns|| [];
       console.log('Column',columnDefs);
       var key = this.key || '_id';
       console.log('Key',columnDefs,rowData);
       var gridOptions = {
         defaultColDef: {editable: true},
         columnDefs: columnDefs,
         rowData: rowData,
         singleClickEdit: true,
         rowSelection: 'multiple',
         onSelectionChanged: onSelectionChanged,
        //  components: {
        //      'dateRenderer': DateRenderer,
        //      'dateEditor':DateEditor,
        //      'fileRenderer':FileRenderer
        //  },
         onCellValueChanged: function(params) {
            var changedData = [params.data];
            var row = params.data;            
            console.log(changedData);
//            that.curTarget.updateData(row[key],row);
            that.update(params.data);
//            params.api.updateRowData({update: changedData});
        },
         onGridReady: function(event) {
             event.api.sizeColumnsToFit();
         }
       };
       this.gridOptions = gridOptions;
      
       function onSelectionChanged() {
            that.selectedRows = gridOptions.api.getSelectedRows();
            console.log(this.selectedRows);
        }
 
       // setup the grid after the page has finished loading
       // this.addEventListener('DOMContentLoaded', function() {
        //  console.log(window);
         let agGrid = window['agGrid'];
           var gridDiv = document.querySelector('#myGrid');
           new agGrid.Grid(gridDiv, gridOptions);
       // });


    }
    constructColumns(){
        console.log(this.myData);
        let fields = this.myData.schema.field;
        let default_col = {
          'sortable':true,
          'filter':true
        }
        this.columns = [];
        this.key = '_id';
        fields.forEach(item=>{
            console.log('Items',item);

          let label = item['label'] || item['field'];
          default_col = {
            
            'field':item['field'],
            'headerName':label,
            'sortable':true,
            'filter':true
          }
          switch(item['type']){
            case 'key':
              this.key = item['field'];
              default_col['hide'] = true;
            break;          
            
            case 'date':
              default_col['cellRenderer'] = window['DateRenderer'];
              default_col['cellEditor'] = window['DateEditor'];
            break;
  
            case 'file':
              default_col['cellRenderer'] = window['FileRenderer'];
            break;
            
            case 'image':
                default_col['cellRenderer'] = window['ImageRenderer'];
            break;
          }
  
          this.columns.push(default_col);
  
        });
      }
    connectedCallback(){
   
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
  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['1','2','3','4','5','6','7','8','9','10','11','12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + '/' + month + '/' + year;
    return time;
  }
