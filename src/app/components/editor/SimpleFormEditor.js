import React from 'react';
import _ from 'lodash';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import FieldEditor,{renderInputField} from './FieldEditor';
import api_object from '../../api/object';

class SimpleFormEditor extends React.Component {
  constructor(props){
    super(props);
    var st ={current:this.props.values, values:{id:this.props.values.id}};
    _.map(this.props.modelSchema.fields, (fl) => {
      st.values[fl.name]= {name:fl.name, value:(this.props.values[fl.name])?this.props.values[fl.name]:null, error:null, touched: true};
    });
    this.state = st;
    this.dep_fields = [];
    _.each(this.props.modelSchema.fields, function(fld) {
      if(fld.dep && fld.dep.on){
        this.dep_fields.push({field: fld.dep.on, dest_field: fld.name, expr: fld.dep.expr, link_object: this.props.modelSchema.fields[fld.dep.on].link_object})
      }
    }.bind(this));
  }

  handleOnChange = (ev, fl_name)=>{
    let d = Object.assign({},this.state.values);
    if(ev && ev.target){
      d[fl_name].value = ev.target.value;
    }
    else{
      d[fl_name].value = ev;
    }
    this.evalComputed(d);
    this.setState({values:d});
    this.afterChange(fl_name, d[fl_name].value);

  };

  evalComputed(values){
    let that = this;
    _.map(this.props.modelSchema.fields, (fl) => {
      if(fl.computed){
        values[fl.name].value = evalInContext(fl.computed, {}, that.getJson(values));
      }
    });
  }

  afterChange =(field, newVal)=>{
    let that = this;
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
            let st_vals = Object.assign({},that.state.values);
            st_vals[d_r.dest_field].value = o_d[d_r.expr];
            that.evalComputed(st_vals);
            that.setState({values:st_vals});
          }
        });
      }.bind(this)).catch((err)=>{console.log(err);});
    }
    //*****************************
  };

  handleOnFocus=(ev)=>{

  };

  validate(){

  }

  commitForm=()=>{
    this.validate();
    this.props.onCommitForm(this.getJson(this.state.values));
  };
  getJson(state){
    var d ={id:state.id};
    _.map(state,(fl)=>{
      if(fl.name)
        d[fl.name] = fl.value;
    });
    return d;
  }
  cancelForm=()=>{
    this.props.onCancelForm();
  };

  render(){
    return(
      <div>
        {
          _.map(this.props.modelSchema.fields, (fl) => {
            var fl_state = this.state.values[fl.name];
            if(!fl.hidden){
              let d_disable = fl.read_only;
              if(fl.computed){
                d_disable = true;
              }
              return (<div className='row'>
                  <div className='col-xs-4'>
                    <div style={{textAlign: 'right', paddingTop: 12, lineHeight:'24px', fontWeight: 500}}>{fl.text}</div>
                  </div>
                  <div className='col-xs-7'>
                    <FieldEditor floatingLabelFixed={true}
                    fieldSchema={fl} name={fl_state.name}
                    disabled ={d_disable}
                    value={fl_state.value}
                    onChange={(val)=>{this.handleOnChange(val,fl.name)}}
                    errorText={fl_state.touched && fl_state.error}
                    onFocus={this.handleOnFocus} />
                  </div>
                </div>)

            }
          })
        }
          <FlatButton label="Save" onClick={this.commitForm}/>
          <FlatButton label="Cancel" onClick={this.cancelForm} />

      </div>
    );
  }
}
export default SimpleFormEditor;
function evalInContext(evalStr, $root, $this) {
    return eval(evalStr);
}
//<label>{JSON.stringify(this.state.values)}</label>
