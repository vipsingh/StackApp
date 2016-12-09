import React, {Component} from 'react';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import AutoComplete from 'material-ui/AutoComplete';
import Select from 'react-select';

import api_object from '../../../api/object';

const chkStyles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginTop: 16,
    marginBottom: 16,
  },
};

export class DateFieldEditor extends Component{
  constructor(props){
    super(props);
  }
  valChange = (ev, val)=>{
    this.props.onChange(moment(val).format());
  }
  formatDate(strValue){
    if(strValue)
      return new Date(strValue)
    else
      return null;
  }
  render(){
    return(<DatePicker {...this.props} value={this.formatDate(this.props.value)} onChange={this.valChange} />)
  }
}

export class SelectFieldEditor extends Component{
  constructor(props){
    super(props);
    this.values = props.fieldSchema.list_values;
  }
  valChange = (event, index, value)=>{
    this.props.onChange(value);
  }
  render(){
    const fieldSchema = this.props.fieldSchema;
    return(
      <SelectField {...this.props} onChange={this.valChange}>
          {
            this.values.map((v)=>{
              return (<MenuItem value={v.value} primaryText={v.text} />)
            })
          }
        </SelectField>
    )
  }
}

export class BoolFieldEditor extends Component{
  constructor(props){
    super(props);
  }
  valChange = (event, isInputChecked)=>{
    this.props.onChange(isInputChecked);
  }
  render(){
    const fieldSchema = this.props.fieldSchema;
    return(<div style={chkStyles.block}>
      <Checkbox {...this.props}
      checked={!!this.props.value}
      onCheck={this.valChange}
      style={chkStyles.checkbox}
    /></div>
    )
  }
}

export class LinkFieldEditor extends Component{
  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  }
  constructor(props){
    super(props);
    this.isOpened = false;
    this.state={options:[], isLoading: false, complete: false};
  }
  valChange = (val)=>{
    if(val)
      this.props.onChange(val.value);
    else {
      this.props.onChange(null);
    }
  }
  onBlur =()=>{

  }
  getData = (input)=>{
    var that = this;
    this.setState({isLoading:true});
    api_object.getSimpleListData(this.props.fieldSchema.link_object,{query:input}).then((dt)=>{
        that.setState(
            {isLoading:false,
             options: _.map(dt.data, function(d){return {value:d.id, label: d.text}}),
             complete:dt.complete
            }
        );
    });

  };
  handleOnOpen=()=>{
    if(!this.isOpened)
      this.getData('');
    this.isOpened = true;
  };
  handleInputChange=(inputValue)=>{
    if(!this.state.complete)
      this.getData(inputValue);
  };
  componentWillMount(){
    if(this.props.value){
      this.getData('#'+this.props.value);
    }
  }
  render(){
    const fieldSchema = this.props.fieldSchema;
    let styl = {marginTop: 12};
    styl.width = this.props.fullWidth ? '100%' : 256;
    styl.height = this.props.floatingLabelText ? 72 : 48;
    return(
      <div style={styl}>
        <label style={{top: 38, zIndex: 1, cursor: 'text'}}>{this.props.floatingLabelText}</label>
        <Select {...this.props}
            isLoading={this.state.isLoading}
            options={this.state.options}
            onInputChange={this.handleInputChange}
            onOpen={this.handleOnOpen}
            onChange={this.valChange}
            onBlur={this.onBlur}
        />
       {this.props.errorText && <span style={{color: this.context.muiTheme.palette.dangerColor}}>{this.props.errorText}</span>}
      </div>
    )
  }
}
/***Field Editors
TextBox *
MultiLineTextBox
CheckBox *
DatePicker *
ComboBox *
MultiComboBox
Lookup *
MultiLookup
DateRange
DateTimePicker
TimePicker
Notes
Radio
SelectDialog
Switch
Slider
*/


//<div style={{position: 'relative'}}></div>
//*************************************************
// const dataSourceConfig = {
//   text: 'text',
//   value: 'id',
// };
// export class LinkFieldEditorX extends Component{
//   constructor(props){
//     super(props);
//     this.dataSource = [{text: 'Some Text', id: 1},
//       {text: 'Some Text2', id: 2},{text: 'Some Text3', id: 3},{text: 'Some Text4', id: 4},
//       {text: 'Some Text5', id: 5},{text: 'Some Text6', id: 6},{text: 'Some Text7', id: 7}];
//     this.state={searchText:'', value: null};
//   }
//   valChange = (chosenRequest, index)=>{
//     debugger;
//     if(index >= 0){
//       let d = this.dataSource[index];
//       this.props.onChange(d.id);
//       this.setState({value:d});
//     }
//     else{
//       this.setState({searchText:''});
//       this.setState({value:null});
//     }
//   }
//   onUpdateInput =(searchText, dataSource)=>{
//     if(this.state.value)
//       this.props.onChange(null);
//     this.setState({searchText:searchText, value:null});
//   };
//   onBlurInput =(ev)=>{
//     if(!this.state.value)
//       this.setState({searchText:''});
//   };
//   render(){
//     const fieldSchema = this.props.fieldSchema;
//     return(
//       <AutoComplete {...this.props}
//         filter={AutoComplete.caseInsensitiveFilter}
//         openOnFocus={true}
//         dataSource={this.dataSource}
//         dataSourceConfig={dataSourceConfig}
//         onNewRequest={this.valChange}
//         onUpdateInput={this.onUpdateInput}
//         searchText={this.state.searchText}
//         onChange={()=>{}}
//         onBlur={this.onBlurInput}
//       />
//     )
//   }
// }
