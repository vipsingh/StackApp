import React, {Component} from 'react';
import { Field } from 'redux-form';

import ListEditor from "./ListEditor";
import FieldEditor,{renderInputField} from './FieldEditor';

class ObjectEditor extends Component{
  constructor(props){
    super(props);
    this.par_field_name=props.fieldSchema.name;
  }

  renderField(fl){
    var customProps={
      fieldSchema: fl,
      formValues: this.props.formValues,
      parFieldName:this.par_field_name
    };
    return (<Field {...customProps}  name={`${this.par_field_name}.${fl.name}`} component={renderInputField} />);
  }

  create2ColsSchema(schema){
    var rows = [], start_new_r = true, col_r = [];
    _.each(_.keys(schema), (sprop, idx)=>{
      if(schema[sprop].hidden)
        return;
      if(schema[sprop].isObjectListType){
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
    var rows = this.create2ColsSchema(schema);
    return(
      <div>
      {
        _.map(rows, (fl) => {
          if(fl.length == 2){
            return (
              <div className='row'>
                <div className='col-sm-6'>{this.renderField(fl[0])}</div>
                <div className='col-sm-6'>{this.renderField(fl[1])}</div>
              </div>
            )
          }
          else if(fl.length == 1){
            return (
              <div className='row'>
                <div className='col-sm-12'>{this.renderField(fl[0])}</div>
              </div>
            )
          }
        })
      }
      </div>
    )
  }

  render() {
    var {fieldSchema} = this.props;
    return(
      <div>
        {this.renderForm(fieldSchema.fields)}
      </div>
    )
  }
}
export default ObjectEditor;
