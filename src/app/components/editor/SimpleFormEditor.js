import React from 'react';
import _ from 'lodash';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import FieldEditor,{renderInputField} from './FieldEditor';

class SimpleFormEditor extends React.Component {
  constructor(props){
    super(props);
    var st ={current:this.props.values, values:{id:this.props.values.id}};
    _.map(this.props.modelSchema.fields, (fl) => {
      st.values[fl.name]= {name:fl.name, value:(this.props.values[fl.name])?this.props.values[fl.name]:null, error:null, touched: true};
    });
    this.state = st;
  }

  handleOnChange = (ev, fl_name)=>{
    let d = Object.assign({},this.state.values);
    if(ev && ev.target){
      d[fl_name].value = ev.target.value;
    }
    else{
      d[fl_name].value = ev;
    }
    this.setState({values:d});
  };
  handleOnFocus=(ev)=>{

  };

  validate(){

  }

  commitForm=()=>{
    this.validate();
    var d ={id:this.state.values.id};
    _.map(this.state.values,(fl)=>{
      if(fl.name)
        d[fl.name] = fl.value;
    });
    this.props.onCommitForm(d);
  };
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
              return (<div><FieldEditor floatingLabelFixed={true}
                fieldSchema={fl} name={fl_state.name}
                value={fl_state.value}
                onChange={(val)=>{this.handleOnChange(val,fl.name)}}
                errorText={fl_state.touched && fl_state.error}
                onFocus={this.handleOnFocus} /><br/></div>)

            }
          })
        }
          <FlatButton label="Save" onClick={this.commitForm}/>
          <FlatButton label="Cancel" onClick={this.cancelForm} />
          <label>{JSON.stringify(this.state.values)}</label>
      </div>
    );
  }
}
export default SimpleFormEditor;
