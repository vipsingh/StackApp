import React, {Component} from 'react';
import _ from 'lodash';
import { Field } from 'redux-form';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import {DecimalFieldEditor, IntFieldEditor, DateFieldEditor, SelectFieldEditor, BoolFieldEditor, LinkFieldEditor} from './input';
import api_object from '../../api/object';
import {getFieldValidations} from '../../utils/validator';

class FieldEditor extends Component{
  constructor(props){
    super(props);
  }
  onTextFieldChange=(ev, val)=>{
    this.props.onChange(val);
  };
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.value !== this.props.value || nextProps.errorText !== this.props.errorText || nextProps.disabled !== this.props.disabled;
  }
  render(){
    const fieldSchema = this.props.fieldSchema;
    if(fieldSchema.type == 'decimal' || fieldSchema.type == 'monetary'){
      return(<DecimalFieldEditor fullWidth={true}  {...this.props} />);
    }
    else if(fieldSchema.type == 'int'){
      return(<IntFieldEditor fullWidth={true} {...this.props} />);
    }
    else if(fieldSchema.type == 'date'){
      return(<DateFieldEditor fullWidth={true} {...this.props} />);
    }
    else if(fieldSchema.type == 'select'){
      return (<SelectFieldEditor fullWidth={true} {...this.props}/>);
    }
    else if(fieldSchema.type == 'link'){
      return (<LinkFieldEditor fullWidth={true} {...this.props}/>);
    }
    else if(fieldSchema.type == 'boolean'){
      return (<BoolFieldEditor disabled={fieldSchema.read_only} {...this.props}/>);
    }
    else{
      return(<TextField fullWidth={true} {...this.props} onChange={this.onTextFieldChange} />);
    }
  }

}

//**Object Form Related
function evalInContext(evalStr, $root, $this) {
    return eval(evalStr);
}
export const renderInputField = ({ input, label, meta: { touched, error }, ...custom }) => {
  if(custom.fieldSchema.hidden){
    return (<div></div>);
  }
  let d_disable= custom.fieldSchema.read_only;
  if(custom.fieldSchema.disabled)
    d_disable = evalInContext(custom.fieldSchema.disabled, custom.formValues, (custom.parFieldName)?custom.formValues[custom.parFieldName]:custom.formValues);
  if(custom.fieldSchema.computed){
    custom.value = evalInContext(custom.fieldSchema.computed, custom.formValues, (custom.parFieldName)?custom.formValues[custom.parFieldName]:custom.formValues);
    d_disable = true;
  }
  return (
    <div className='row'>
      <div className='col-sm-4'>
        <div style={{textAlign: 'right', paddingTop: 12, lineHeight:'24px', fontWeight: 500}}>{custom.fieldSchema.text}</div>
      </div>
      <div className='col-sm-7'>
        <FieldEditor floatingLabelFixed={true}
          errorText={touched && error}
          disabled ={d_disable}
          {...input}
          onChange={function(val){
            if(custom.beforeFieldChange(input.name, val)){
              input.onChange(val);
              custom.afterFieldChange(input.name, val);
            }
          }.bind(this)}
          {...custom}
        />
      </div>
    </div>
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
    return (<Field {...props} name={name} component={renderInputField} validate={getFieldValidations(props.fieldSchema)} />)
  }
}
//******************

const v_required = value => value ? undefined : 'Required'

export default FieldEditor;
