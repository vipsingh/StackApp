import React, {Component} from 'react';
import _ from 'lodash';
import { Field } from 'redux-form';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import {DateFieldEditor, SelectFieldEditor, BoolFieldEditor, LinkFieldEditor} from './input';
import api_object from '../../api/object';

class FieldEditor extends Component{
  constructor(props){
    super(props);
  }
  onTextFieldChange=(ev, val)=>{
    this.props.onChange(val);
  };
  // onFieldChange=(val)=>{
  //   this.props.onChange(val);
  // };
  render(){
    const fieldSchema = this.props.fieldSchema;
    if(fieldSchema.type == 'decimal' || fieldSchema.type == 'monetary'){
      return(<TextField type='number' floatingLabelText={fieldSchema.text}  {...this.props} onChange={this.onTextFieldChange} />);
    }
    else if(fieldSchema.type == 'int'){
      return(<TextField type='number' floatingLabelText={fieldSchema.text}  {...this.props} onChange={this.onTextFieldChange} />);
    }
    else if(fieldSchema.type == 'date'){
      return(<DateFieldEditor floatingLabelText={fieldSchema.text} {...this.props} />);
    }
    else if(fieldSchema.type == 'select'){
      return (<SelectFieldEditor floatingLabelText={fieldSchema.text} {...this.props}/>);
    }
    else if(fieldSchema.type == 'link'){
      return (<LinkFieldEditor floatingLabelText={fieldSchema.text} {...this.props}/>);
    }
    else if(fieldSchema.type == 'boolean'){
      return (<BoolFieldEditor disabled={fieldSchema.read_only} {...this.props}/>);
    }
    else{
      return(<TextField floatingLabelText={fieldSchema.text} {...this.props} onChange={this.onTextFieldChange} />);
    }
  }
}

//**Object Form Related
function evalInContext(evalStr, $model, $this) {
    return eval(evalStr);
}
export const renderInputField = ({ input, label, meta: { touched, error }, ...custom }) => {
  if(custom.fieldSchema.hidden){
    return (<div></div>);
  }
  let d_disable= custom.fieldSchema.read_only;
  if(custom.fieldSchema.disabled)
    d_disable = evalInContext(custom.fieldSchema.disabled, custom.formValues, (custom.parFieldName)?custom.formValues[custom.parFieldName]:custom.formValues);
  return (
  <FieldEditor floatingLabelFixed={true}
    errorText={touched && error}
    disabled ={d_disable}
    {...input}
    {...custom}
  />
  )
}

export const renderStaticField = ({ input, label, meta: { touched, error }, ...custom }) => {
  const fieldSchema = custom.fieldSchema;
  var val = input.value;
  if(fieldSchema.hidden){
    return (<div></div>);
  }
  if(fieldSchema.type == 'date'){
    val = moment(val).format('DD-MMM-YYYY');
  }
  else if(fieldSchema.type == 'select'){
    let d = _.find(fieldSchema.list_values, {value: val });
    val = (d)?d.text:'';
  }
  else if(fieldSchema.type == 'boolean'){
    return (<div style={{textAlign:'center'}}><Checkbox disabled={true} checked={val}/></div>);
  }

  return (
      <label>{val}</label>
  )

}

export class FormFieldEditor extends Component{
  render(){
    let props = this.props;
    let name = props.name || props.fieldSchema.name;
    return (<Field {...props} name={name} component={renderInputField} />)
  }
}
//******************

export default FieldEditor;
