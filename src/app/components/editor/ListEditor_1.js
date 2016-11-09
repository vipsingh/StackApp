/*List With Inline Editor*/
import React from 'react';
import { Field, FieldArray, reduxForm, formValueSelector, change,arrayPush } from 'redux-form';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import _ from 'lodash';

import FieldEditor, {renderInputField, renderStaticField} from './FieldEditor';

const stylee ={
  headerColIndex:{width:100},
  wrapperStyle:{border:'1px solid rgb(224, 224, 224)'}
}
export default class ListEditor_1 extends React.Component {
  constructor(props){
    super(props);
    this.tmpCnt = -100000;
    this.modelSchema = {"type":"one_to_many","name":"contacts","text":"Contacts","isObjectListType":true, "read_only":false,"hidden":false,"required":false,"unique":false,"validations":{},
              "fields":{
                "city":{"type":"string","name":"city","text":"City","read_only":false,"hidden":false,"required":true,"unique":false,"validations":{"required":true}},
                "state":{"type":"string","name":"state","text":"State","read_only":false,"hidden":false,"required":false,"unique":false,"validations":{}},
                "state2":{"type":"decimal","name":"state2","text":"State2","read_only":false,"hidden":false,"required":false,"unique":false,"validations":{}}
              }
            };
    var _data = [{id:1, city:'bhokal 1', state: 'deb 1', state2: 670},
    {id:2, city:'bhokal 2', state: 'deb 2', state2: 500},
    {id:3, city:'bhokal 3', state: 'deb 3', state2: 1200}, ];

    this.state={data: _data, currentId: null, currentValue: null, currentMember:''};
  }

  handleCancelEditRow=()=>{
    //this.setState({open: false});
  }
  editToggleRow = (id)=>{
    if(this.state.currentId === id){
      this.commitRow(id);
    }
    else {
      let currentValue = Object.assign({},_.find(this.state.data, {id:id}));
      _.map(_.keys(currentValue), (key) => {
        currentValue[key]= {name:key, value:currentValue[key], error:null, touched: true};
      });
      currentValue.id = id;
      this.setState({currentId:id,currentValue:currentValue });
    }
  }
  commitRow = (id)=>{
    let dt = this.state.data.slice(0);
    var arr = dt.map(function(d) {
      if(d.id === id){
        debugger;
        var d_val ={id:id};
        _.map(this.state.currentValue,(fl)=>{
          if(fl.name)
            d_val[fl.name] = fl.value;
        });
        return Object.assign({}, d, d_val);
      }
      return d;
    }.bind(this));
    this.setState({data: arr, currentId:null, currentValue: null});
  }

  onFieldChange=(val, field)=>{
    let d = Object.assign({},this.state.currentValue);
    // if(ev && ev.target){
    //   d[fl_name].value = ev.target.value;
    // }
    // else{
    //   d[fl_name].value = ev;
    // }
    d[field].value = val;
    this.setState({currentValue: d});
  };

  render(){
    let fl_schema = this.modelSchema.fields;
    return(
      <div>
        <Table selectable={false} wrapperStyle={stylee.wrapperStyle}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              {_.map(fl_schema, (fl) => {
                if(!fl.hidden){
                  return (<TableHeaderColumn>{fl.text}</TableHeaderColumn>);
                }
              })}
              <TableHeaderColumn style={stylee.headerColIndex}>#</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              this.state.data.map((d) => (
                <TableRow>
                    {_.map(fl_schema, (fl) => {
                      if(!fl.hidden){
                          return (
                            <TableRowColumn>
                              {
                                this.renderField(fl, d, this.state.currentId === d.id)
                              }
                            </TableRowColumn>);
                        }
                    })}
                    <TableRowColumn style={stylee.headerColIndex}>
                      <IconButton iconClassName={(this.state.currentId === d.id)?"fa fa-save":"fa fa-edit"} onClick={() => this.editToggleRow(d.id)} />
                    </TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    );
  }

  renderField(field, row, edit){
    if(edit){
      var fl_state = this.state.currentValue[field.name];
      return (<FieldEditor floatingLabelText={null}
          fieldSchema={field} name={fl_state.name} value={fl_state.value}
          errorText={fl_state.touched && fl_state.error}
          onChange={(ev)=>{this.onFieldChange(ev.target.value, field.name)}} />)
    }
    else{
      return (<div>{row[field.name]}</div>)
    }
  }
}
