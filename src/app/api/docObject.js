import Promise from 'bluebird';
import _ from 'lodash';

var model_schema_1 = {"name":"Customer", "field_identifier":"name", "fields":{
  "name":{"type":"string","name":"name","text":"Name","read_only":false,"hidden":false,"required":true,"unique":false,"validations":{"required":true}},
  "creditlimit":{"type":"decimal","name":"creditlimit","text":"Credit Limit","read_only":false,"hidden":false,"required":false,"unique":false,"validations":{}},
  "creditlimit1":{"type":"decimal","name":"creditlimit1","text":"Credit Limit1","read_only":false,"hidden":false,"required":false,"unique":false,"validations":{}},
  "creditlimit2":{"type":"boolean","name":"creditlimit2","text":"Credit Limit2","read_only":false,"hidden":false,"required":false,"unique":false,"validations":{}},
  "creditlimit3":{"type":"link","name":"creditlimit3","text":"Credit Limit3","read_only":false,"hidden":false,"required":true,"unique":false,"validations":{},
                  "list_values":[{"id":1, "text": "value 11"}, {"id":2, "text": "value 1312"}, {"id":3, "text": "value 1232", "desc": "desc dh2"}]},
  "contacts":{"type":"one_to_many","name":"contacts","text":"Contacts","isObjectListType":true, "read_only":false,"hidden":false,"required":false,"unique":false,"validations":{},
            "fields":{
              "city":{"type":"string","name":"city","text":"City","read_only":false,"hidden":false,"required":true,"unique":false,"validations":{"required":true}},
              "state":{"type":"string","name":"state","text":"State","read_only":false,"hidden":false,"required":false,"unique":false,"validations":{}},
              "state2":{"type":"string","name":"state2","text":"State2","read_only":false,"hidden":false,"required":false,"unique":false,"validations":{}},
              "state3":{"type":"string","name":"state3","text":"State3","read_only":false,"hidden":false,"required":false,"unique":false,"validations":{}},
              "state4":{"type":"string","name":"state4","text":"State4","read_only":false,"hidden":false,"required":false,"unique":false,"validations":{}},
              "state5":{"type":"string","name":"state5","text":"State5","read_only":false,"hidden":false,"required":false,"unique":false,"validations":{}},
              "state6":{"type":"string","name":"state6","text":"State6","read_only":false,"hidden":false,"required":false,"unique":false,"validations":{}},
              "state7":{"type":"string","name":"state7","text":"State7","read_only":false,"hidden":false,"required":false,"unique":false,"validations":{}}
            }
          },
  "creditlimit4":{"type":"decimal","name":"creditlimit4","text":"Credit Limit4","read_only":false,"disabled":"$model.creditlimit2 == true", "hidden":false,"required":false,"unique":false,"validations":{}},
  "creditlimit5":{"type":"decimal","name":"creditlimit5","text":"Credit Limit5","read_only":false,"hidden":false,"required":false,"unique":false,"validations":{}},
  "setting":{"type":"one_to_one","name":"setting","text":"setting", "read_only":false,"hidden":false,"required":false,"unique":false,"validations":{},
            "fields":{"ref1":{"type":"string","name":"ref1","text":"ref1","read_only":false,"disabled":"$this && $this.ref2 == 'x'","hidden":false,"required":true,"unique":false,"validations":{"required":true}},
                      "ref2":{"type":"string","name":"ref2","text":"ref2","read_only":false,"hidden":false,"required":false,"unique":false,"validations":{}}}
          }
        }
      };
var model_schema_2 = {"name":"Supplier","identifier_field":"name", "fields":{
        "name":{"type":"string","name":"name","text":"Name","read_only":false,"hidden":false,"required":true,"unique":false,"validations":{"required":true}},
        "group":{"type":"string","name":"group","text":"Group","read_only":false,"hidden":false,"required":false,"unique":false,"validations":{}},
        "startOn":{"type":"date","name":"startOn","text":"Start On","read_only":false,"hidden":false,"required":false,"unique":false,"validations":{}}
              }
            };
function getSchema(object_name) {
  return new Promise((resolve, reject)=>{
    setTimeout(function() {
      if(object_name == 'Customer')
        resolve(model_schema_1 );
      else {
        resolve(model_schema_2 );
      }
    }, 500)
  });
}

function getListData(object_name, params){
  var columns = [
  {
    key: 'id',
    name: 'ID',
    width: 80
  },
  {
    key: 'task',
    name: 'Title',
    sortable : true
  }
  ];
  function createRows(numberOfRows){
    var _rows = [];
    for (var i = 1; i < numberOfRows; i++) {
      _rows.push({
        id: i,
        name: 'Task ' + i,
        creditlimit: 10 * i
      });
    }
    return _rows;
  }
  return new Promise((resolve, reject)=>{
   setTimeout(function() {
     var rows = createRows(100);
     if(params.pageIndex)
      rows = rows.slice((10 * (params.pageIndex-1)), (10 * (params.pageIndex-1)) + 10);
    resolve({data: rows, totalCount: 100});
   }, 500)
  });
}

export default {
  getSchema: getSchema,
  getListData: getListData
}
