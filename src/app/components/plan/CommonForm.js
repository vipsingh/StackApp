import React, {Component} from 'react';
import { Field } from 'redux-form';
import classNames from 'classnames';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import ListEditor from "../editor/ListEditor";
import ObjectEditor from "../editor/ObjectEditor";
import FieldEditor,{FormFieldEditor} from '../editor/FieldEditor';


class CommonForm extends Component{
  constructor(props){
    super(props);
  }
  renderField(fl){
    var customProps={
      fieldSchema: fl,
      formValues: this.props.formValues,
      dispatch: this.props.dispatch
    };
    if(fl.type == 'one_to_many'){
      return (<div>
          <Subheader>{fl.text}</Subheader>
          <ListEditor {...customProps} ></ListEditor>
        </div>);
    }
    else if(fl.type == 'one_to_one'){
      return (<div>
          <Subheader>{fl.text}</Subheader>
          <ObjectEditor {...customProps}></ObjectEditor>
        </div>);
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
            return (
              <div className='row'>
                <div className='col-xs-12'>{this.renderField(fl[0])}</div>
              </div>
            )
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
export default CommonForm;

//**Object Specific Form
// export class PartnerForm extends CommonForm{
//   renderForm(schema){
//     let fields = schema.fields;
//     return(
//       <div>
//         <div className='row'>
//           <div className='col-sm-6 col-xs-12'>{this.renderField(fields.name)}</div>
//           <div className='col-sm-6 col-xs-12'>{this.renderField(fields.active)}</div>
//         </div>
//       </div>
//     )
//   }
// }
