import React from 'react';
import _ from 'lodash';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import FieldEditor,{renderInputField} from './FieldEditor';
import api_object from '../../api/object';
import {getFieldValidations} from '../../utils/validator';

class SimpleFormEditor extends React.Component {
  constructor(props){
    super(props);
    var st ={current:this.props.values, values:{id:0}};
    this.state = st;
    this.dep_fields = [];
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.values){
      var vals = {id:0}
      _.map(nextProps.modelSchema.fields, (fl) => {
        vals[fl.name]= {name:fl.name, value:(nextProps.values[fl.name])?nextProps.values[fl.name]:null, error:null, touched: true};
      });
      this.setState({current: nextProps.values, values:vals});
      _.each(nextProps.modelSchema.fields, function(fld) {
        if(fld.dep && fld.dep.on){
          this.dep_fields.push({field: fld.dep.on, dest_field: fld.name, expr: fld.dep.expr, link_object: nextProps.modelSchema.fields[fld.dep.on].link_object})
        }
      }.bind(this));
    }
  }

  handleOnChange = (ev, fl_name)=>{
    let d = Object.assign({},this.state.values);
    if(ev && ev.target){
      d[fl_name].value = ev.target.value;
    }
    else{
      d[fl_name].value = ev;
    }
    d[fl_name].error = '';
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
    var err = {};
    debugger;
    _.map(this.props.modelSchema.fields, (fl) => {
      let v_d = getFieldValidations(fl);
      v_d.forEach(function(v_f){
        err[fl.name] = v_f(this.state.values[fl.name].value);
        if(!err[fl.name]) delete err[fl.name];
      }.bind(this));
    });
    if(_.keys(err).length > 0){
      let st = Object.assign({},this.state.values);
      _.each(_.keys(err),(k)=>{
        let d = Object.assign({}, st[k], {error: err[k]});
        st[k] = d;
      });
      this.setState({values: st});
    }
    return _.keys(err).length === 0;
  }

  commitForm=()=>{
    if(this.validate()){
      this.props.onCommitForm(this.getJson(this.state.values));
    }
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

  renderForm(){
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
      </div>
    );
  }

  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.onCancelForm}
      />,
      <FlatButton
        label="Save"
        primary={true}
        onTouchTap={this.commitForm}
      />,
    ];
    if(this.props.dialogOpen){
    return (
    <Dialog
            title="Edit"
            modal={false}
            actions={actions}
            open={this.props.dialogOpen}
            onRequestClose={this.props.onCancelForm}
            autoScrollBodyContent={true}
          >
          {this.renderForm()}
    </Dialog>)
    }
    else{
      return(<div></div>)
    }
  }
}
export default SimpleFormEditor;
function evalInContext(evalStr, $root, $this) {
    return eval(evalStr);
}
//<label>{JSON.stringify(this.state.values)}</label>
