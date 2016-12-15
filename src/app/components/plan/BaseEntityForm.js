import React, {Component} from 'react';
import { Field } from 'redux-form';
import Promise from 'bluebird';
import classNames from 'classnames';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import ListEditor from "../editor/ListEditor";
import ObjectEditor from "../editor/ObjectEditor";
import FieldEditor,{FormFieldEditor} from '../editor/FieldEditor';
import Panel from "../mui/Panel";

import api_object from '../../api/object';

class BaseEntityForm extends Component{
  constructor(props){
    super(props);
    this.OnFieldChangeSubscribers =[];
    this.dep_fields = [];
    _.each(this.props.modelSchema.fields, function(fld) {
      if(fld.dep && fld.dep.on){
        this.dep_fields.push({field: fld.dep.on, dest_field: fld.name, expr: fld.dep.expr, link_object: this.props.modelSchema.fields[fld.dep.on].link_object})
      }
    }.bind(this));
  }
  //events ***
  beforeChange =(field, newVal)=>{
    return true;//handle promise return
  }
  afterChange =(field, newVal)=>{
    //OnField Change subscribe***********************
    let arr = _.filter(this.OnFieldChangeSubscribers, {field: field});
    if(arr){
      Promise.reduce(arr, function(arres, fc) {
        return fc.method.call(this, newVal).then(function(d){
          arres.push(d);
          return arres;
        });
      }.bind(this), []).then(function(arres){
      });
    }
    //*****************************************************
    //dependent field logic********
    let arr1 = _.filter(this.dep_fields, {field: field});
    if(arr1 && arr1.length>0){
      let f_arr = _.reduce(arr1, function(f_r, d) {
        f_r.push(d.expr);
        return f_r;
      },[]);
      api_object.getSingle(arr1[0].link_object, newVal || 0, {fields: f_arr.join(',')}).then(function(o_d) {
        let that = this;
        _.each(arr1, function(d_r) {
          if(d_r.dest_field){
            that.props.autofill(d_r.dest_field, o_d[d_r.expr]);
          }
        });
      }.bind(this)).catch((err)=>{console.log(err);});
    }
    //*****************************
  }
  //**********

  renderField(fl){
    var customProps={
      fieldSchema: fl,
      formValues: this.props.formValues,
      dispatch: this.props.dispatch,
      beforeFieldChange: this.beforeChange,
      afterFieldChange: this.afterChange
    };
    if(fl.type == 'one_to_many'){
      return (<Panel title={fl.text}>
          <ListEditor {...customProps} ></ListEditor>
        </Panel>);
    }
    else if(fl.type == 'one_to_one'){
      return (<Panel title={fl.text}>
          <ObjectEditor {...customProps}></ObjectEditor>
        </Panel>);
    }
    else{
      return (<FormFieldEditor {...customProps} />);
    }
  }

  create2ColsSchema(schema){
    var rows = [], start_new_r = true, col_r = [];
    _.each(_.keys(schema), (sprop, idx)=>{
      if(schema[sprop].hidden)
        return;
      if(schema[sprop].type == 'one_to_many' || schema[sprop].type == 'one_to_one'){
        if(col_r.length == 1){
          rows.push(col_r);
          col_r = []
        }
        col_r.push(schema[sprop]);
        rows.push(col_r);
        col_r = [];
      }
      else{
        if(col_r.length == 1)
          start_new_r = true;
        else
          start_new_r = false;
        col_r.push(schema[sprop]);
        if(start_new_r){
          rows.push(col_r);
          col_r=[];
        }
        else if(_.keys(schema).length -1 == idx){
          rows.push(col_r);
        }
      }
    });
    return rows;
  }

  renderForm(schema){
    var rows = this.create2ColsSchema(schema.fields);
    return(
      <div>
      {
        _.map(rows, (fl) => {
          if(fl.length == 2){
            return (
              <div className='row'>
                <div className='col-sm-6 col-xs-12'>{this.renderField(fl[0])}</div>
                <div className='col-sm-6 col-xs-12'>{this.renderField(fl[1])}</div>
              </div>
            )
          }
          else if(fl.length == 1){
            if(fl[0].type == 'one_to_many' || fl[0].type == 'one_to_one'){
              return (
                <div className='row'>
                  <div className='col-xs-12'>{this.renderField(fl[0])}</div>
                </div>
              )
            }
            else{
              return (
                <div className='row'>
                  <div className='col-xs-6'>{this.renderField(fl[0])}</div>
                </div>
              )
            }
          }
        })
      }
      </div>
    )
  }

  render() {
    var {modelSchema} = this.props;
    return(
      <div>
        {this.renderForm(modelSchema)}
      </div>
    )
  }
}
export default BaseEntityForm;

/*Events******
**Form Specific
  OnLoad => after loading schema & data
  OnValidate => perform custom validation
  OnSave => after saving record
  BeforeSave => before saving record
**Field Specific
  OnFieldChange => After field value change (for listObject this will called on addRow, removeRow)
  BeforeFieldChange => before field value change("")

*/
