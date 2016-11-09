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
