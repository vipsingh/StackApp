import React, {PropTypes} from 'react';
import { Field, FieldArray, reduxForm, formValueSelector, change,arrayPush } from 'redux-form';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FieldEditor, {renderInputField, renderStaticField} from './FieldEditor';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import SimpleFormEditor from './SimpleFormEditor';
import _ from 'lodash';

const stylee ={
  headerColIndex:{width:100},
  wrapperStyle:{border:'1px solid rgb(224, 224, 224)'},
  rowAction: {width:24, height: 24, padding: 3}
}

class ListEditor extends React.Component {
  static contextTypes = {
    $formName: React.PropTypes.string,
    muiTheme: PropTypes.object.isRequired
  };
  constructor(props){
    super(props);
    this.addRow = this.addRow.bind(this);
    this.editRow = this.editRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.tmpCnt = -100000;
    this.par_field_name=props.fieldSchema.name;
    this.state={current:null,currentMember:'', open: false};
  }

  componentWillMount(){
  }

  handleClose = () => {
    this.setState({open: false});
  };
  handleCommitRow=(val)=>{
    if(this.state.currentMember == '#new'){
      this.props.dispatch(arrayPush(this.context.$formName, this.par_field_name, val));
    }
    else{
      _.each(_.keys(val), (pp)=>{
          //if(this.props.beforeFieldChange(`${this.state.currentMember}.${pp}`, val[pp])){
            this.props.dispatch(change(this.context.$formName, `${this.state.currentMember}.${pp}`, val[pp]));
            //this.props.afterFieldChange(`${this.state.currentMember}.${pp}`, val[pp]);
          //}
      });
    }
    this.setState({open: false});
  }
  handleCancelEditRow=()=>{
    this.setState({open: false});
  }

  addRow(fields){
    var m ={};
    _.map(this.props.fieldSchema.fields, (fl)=>{
      m[fl.name] = null;
    });
    m.id = ++this.tmpCnt;
    this.setState({current: m, currentMember:'#new', open: true});
  }

  editRow(member, index, fields){
    var v = this.props.formValues[this.par_field_name][index];
    this.setState({current: v, currentMember:member, open: true});
  }
  removeRow(fields, index){
    fields.remove(index);
  }

  render(){
    return (<div><FieldArray name={this.props.fieldSchema.name}
        formValues={this.props.formValues}
        component={renderMembers}
        fl_schema={this.props.fieldSchema.fields}
        addRow={this.addRow}
        editRow={this.editRow}
        removeRow={this.removeRow}
        context={this.context}/>
        <Dialog
                title="Edit"
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                autoScrollBodyContent={true}
              >
                <SimpleFormEditor
                  modelSchema={this.props.fieldSchema}
                  values={this.state.current}
                  onCommitForm={this.handleCommitRow}
                  onCancelForm={this.handleCancelEditRow} />
        </Dialog>
        </div>);
  }
}

const renderMembers = ({ fields, fl_schema, formValues, addRow, editRow, removeRow, context }) => (
  <div>
    <Table selectable={false} wrapperStyle={stylee.wrapperStyle}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={context.muiTheme.tableHeader}>
        <TableRow>
          {_.map(fl_schema, (fl) => {
            if(!fl.hidden){
              return (<TableHeaderColumn>{fl.text}</TableHeaderColumn>);
            }
          })}
          <TableHeaderColumn style={stylee.headerColIndex}>#</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false} stripedRows ={true} showRowHover={true}>
      {
        fields.map((member, index) => (
          <TableRow>
              {_.map(fl_schema, (fl) => {
                  if(!fl.hidden){
                    return (
                      <TableRowColumn>
                        <Field fieldSchema={fl} formValues={formValues} floatingLabelText='' name={`${member}.${fl.name}`} component={renderStaticField} />
                      </TableRowColumn>);
                  }
              })}
              <TableRowColumn style={stylee.headerColIndex}>
                <IconButton iconClassName="fa fa-remove" onClick={() => removeRow(fields,index)} style={stylee.rowAction} />
                <IconButton iconClassName="fa fa-edit" onClick={() => editRow(member, index, fields)} style={stylee.rowAction}  />
              </TableRowColumn>
          </TableRow>
        ))
      }
      </TableBody>
    </Table>
    <div>
      <div style={{float: 'right'}}>
        <FlatButton label="Add Row" onTouchTap={() => addRow(fields)} icon={<FontIcon className="fa fa-plus" />} ></FlatButton>
      </div>
    </div>

  </div>
);

// class ListRow extends React.Component{
//   // shouldComponentUpdate(nextProps,nextState){
//   //   debugger;
//   //   var x = this.props.fields.city.value;
//   //   var y = nextProps.fields.city.value;
//   //   return !this.areEqualShallow(this.props.fields, nextProps.fields);
//   // }
//   areEqualShallow(a, b) {
//     for(var key in a) {
//         if(a[key] && a[key].value && a[key].value !== b[key].value) {
//             return false;
//         }
//     }
//     return true;
//   }
//   render(){
//     return(
//       <TableRow key={this.props.fields.id.value}>
//           {_.map(this.props.modelSchema.fields, (fl) => {
//               return (<TableRowColumn><InputEditor fieldMeta={fl} floatingLabelText=''  {...this.props.fields[fl.name]}/></TableRowColumn>);
//           })}
//       </TableRow>
//     );
//   }
// }

export default ListEditor;
