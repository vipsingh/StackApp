import React from 'react';
import { Field, FieldArray, reduxForm, formValueSelector, change,arrayPush } from 'redux-form';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import _ from 'lodash';

const stylee ={
  headerColIndex:{width:100},
  wrapperStyle:{border:'1px solid rgb(224, 224, 224)'}
}
export default class ListEditor_1 extends React.Component {
  constructor(props){
    super(props);
    this.tmpCnt = -100000;
    this.cols = ['id', 'name', 'city'];
    var _data = [{id:1, name:'bhokal 1', city: 'deb 1'}, {id:2, name:'bhokal 2', city: 'deb 2'}, {id:3, name:'bhokal 3', city: 'deb 3'}];
    this.state={data: _data, currentId: null, currentMember:''};
  }

  handleCancelEditRow=()=>{
    //this.setState({open: false});
  }
  editToggleRow = (id)=>{
    if(this.state.currentId === id)
      this.setState({currentId:null});
    else {
      this.setState({currentId:id});
    }
  }

  onFieldChange=(val, field, id)=>{
    let dt = this.state.data.slice(0);
    var arr = dt.map(function(d) {
      if(d.id === id){
        return Object.assign({}, d, {[field]: val});
      }
      return d;
    }.bind(this));
    this.setState({data:arr});
  };

  render(){
    return(
      <div>
        <Table selectable={false} wrapperStyle={stylee.wrapperStyle}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              {_.map(this.cols, (fl) => {
                  return (<TableHeaderColumn>{fl}</TableHeaderColumn>);
              })}
              <TableHeaderColumn style={stylee.headerColIndex}>#</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              this.state.data.map((d) => (
                <TableRow onClick={() => this.editToggleRow(d.id)}>
                    {_.map(this.cols, (fl) => {
                          return (
                            <TableRowColumn>
                              {
                                this.renderField(fl, d, this.state.currentId === d.id)
                              }
                            </TableRowColumn>);

                    })}
                    <TableRowColumn style={stylee.headerColIndex}>
                      <IconButton iconClassName={(this.state.currentId === d.id)?"fa fa-save":"fa fa-edit"} onClick={() => this.editToggleRow(d.id)} />
                    </TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    );
  }

  renderField(field, row, edit){
    if(edit){
      return (<TextField name={field} value={row[field]} onChange={(ev)=>{this.onFieldChange(ev.target.value, field, row.id)}} />)
    }
    else{
      return (<div>{row[field]}</div>)
    }
  }
}
