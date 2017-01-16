import _ from 'lodash';

export const validateForm = function (schema, formValues) {
  var errors = {};
  errors = validateObject(schema, formValues);
  return errors;
}

var validateObject= function(schema, formValues) {
  const errors = {}
    _.each(_.keys(schema.fields), (fl)=>{
      if(schema.fields[fl].type == 'one_to_one'){
        errors[fl] = validateObject(schema.fields[fl], (formValues && formValues[fl])?formValues[fl]:null);
      }
      else if(schema.fields[fl].type == 'one_to_many'){
        if(formValues[fl] && formValues[fl].length){
          const membersArrayErrors = [];
          formValues[fl].forEach((member, memberIndex) => {
            let memberErrors = {};
            memberErrors = validateObject(schema.fields[fl], member);
            membersArrayErrors[memberIndex] = memberErrors;
            return memberErrors;
          });
          if(membersArrayErrors.length) {
            errors[fl] = membersArrayErrors;
          }
        }
      }
      else if(schema.fields[fl].required && (!formValues || !formValues[fl])){
        errors[fl] = 'Required';
      }
    });

  return errors;
}

export const validators = {
  required: value => value ? undefined : 'Required',
  number: value => value && isNaN(Number(value)) ? 'Must be a number' : undefined,
  gt: (arg) =>{ return (value) =>{ return (value <= arg ? 'Should be greater then ' + arg: undefined); };}
};

export const getFieldValidations = function(schema){
  let valid_arr = [];
  if(schema.required)
    valid_arr.push(validators.required);
  if(schema.validations){
    Object.keys(schema.validations).forEach((v)=>{
      if(schema.validations[v] === true || schema.validations[v] === false)
        valid_arr.push(validators[v]);
      else
        valid_arr.push(validators[v](schema.validations[v]));
    });
  }
  return valid_arr;
};