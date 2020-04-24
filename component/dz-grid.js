loadModule("https://www.htmlelements.com/demos/source/modules/smart.datetimepicker.js");



customElements.define('dz-grid',
class extends HTMLElement {
  constructor() {
    super();
    // loadStyle("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/css/smart.default.css");
    // loadScript("https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/js/webcomponents-lite.js");
    // loadModule("https://d25k6mzsu7mq5l.cloudfront.net/smart/smart.datetimepicker.js");

       const template = document.querySelector('meta[tid]').getAttribute('tid');
       const uid = document.querySelector('meta[uid]').getAttribute('uid');
       const id = this.getAttribute('id') || '_default';
       const user = store.get('user');
       const editMode = store.get('editMode') || 'normal';
       let dataset = window['curTarget'];
       this.curTarget = dataset;
       this.key = this.curTarget['key']
       let allow_menu = [];
       window['myGrid'] = this;
       console.log(window);
       let that = this;
       this.updateRows =[];
       document.dispatchEvent(new CustomEvent('allow-menu', { detail: {'component':that.tagName,'menu':allow_menu} }));

        this.selectedRows =[];
       let path = "https://d25k6mzsu7mq5l.cloudfront.net/file7.0/DZ-GRID/template?id="+new Date().getTime();
       this.constructColumns();

       fetch(path)
       .then(function(response) {
           // When the page is loaded convert it to text
           return response.text()
       })
       .then(function(html) {
            that.innerHTML = html;
            that.renew();
            that.querySelector('#dz-import-data').addEventListener('click',e=>{
                that.importJson();
            });

            that.querySelector('#dz-save-data').addEventListener('click',e=>{
                that.save();
            });
            that.querySelector('#dz-reload-data').addEventListener('click',e=>{
                    that.refresh();
            });
            that.querySelector('#dz-add-data').addEventListener('click',e=>{
                    // that.curTarget.addData();
                let newObject = {};
                let id = new Date().getTime();
                newObject["_id"] = id; 
                that.updateRows.push(id);                  
                that.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});

                //    that.refresh();
            });
            that.querySelector('#dz-delete-data').addEventListener('click',e=>{
                    that.delete();
            });
        });
    }
    add(){
        let newObject = {};
        newObject['_id'] = new Date().getTime();                   
        newObject[that.curTarget['key']] =        newObject['_id'] ;
          
        that.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});

    }

    update(data){
        this.gridOptions.api.updateRowData({update:[data]});
        this.gridOptions.api.refreshInMemoryRowModel();
        this.gridOptions.api.getModel().rowsToDisplay[0].edited = true;
        this.updateRows.push(data);       
    }
    save(){
        let that = this;
        this.updateRows.forEach(item=>{
            console.log('Update Item',item);
            that.curTarget.updateData(item['_id'],item);        
        });
        this.updateRows=[];
        this.refresh();
        alert('成功儲存');
    }
    delete(){
        let that = this;
        var nodes = this.gridOptions.api.getSelectedNodes();
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].deleted = true;
        }

        console.log('Delete',that.selectedRows,that.key);
        that.selectedRows.forEach(item=>{
            that.curTarget.removeData(item['_id']);
        });
        this.gridOptions.api.onFilterChanged();


        that.refresh();
    }
    refresh(){
        let that = this;
        that.curTarget.refreshData().then(data=>{
            console.log('Data',data);
           that.gridOptions.api.setRowData(data);
           that.gridOptions.api.refreshView();
       });
    }
    importJson() {
        let that = this;
        getContent('https://www.hkfspa.org/json/member.json').then(result=>{
            console.log(result);
            var json = JSON.parse(result);
            that.gridOptions.api.updateRowData({add: json, addIndex: 0});
            that.curTarget.bulkUpdateData(json);
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
    renew(){

      let that = this;
       
       var rowData = this.curTarget['data'] ||[];
       var columnDefs = this.columns|| [];
       console.log('Column',columnDefs);
       var key = this.curTarget['key'] || 'ID';
       console.log('Key',window['curTarget'],columnDefs,rowData);
       var gridOptions = {
         defaultColDef: {editable: true},
         columnDefs: columnDefs,
         rowData: rowData,
         singleClickEdit: false,
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
        let fields = window['curTarget'].field;
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
