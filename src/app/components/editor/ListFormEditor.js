import React from 'react';
import _ from 'lodash';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import SimpleFormEditor from './SimpleFormEditor';

const stylee ={
  headerColIndex:{width:100},
  wrapperStyle:{border:'1px solid rgb(224, 224, 224)'}
}
class ListFormEditor extends React.Component {
  constructor(props){
    super(props);
    this.modelSchema={"fields":{"ref1":{"type":"string","name":"ref1","text":"ref1","read_only":false,"hidden":false,"required":true,"unique":false,"validations":{"required":true}},
                  "ref2":{"type":"decimal","name":"ref2","text":"ref2","read_only":false,"hidden":false,"required":false,"unique":false,"validations":{}}
                  }
                };
    this.tmpCnt = -100000;
    this.state={values:[{id:1, ref1:"asda", ref2:1},{id:2, ref1:"qeqw", ref2:2}], current:null, open: false};
  }
  addRow=()=>{
    let d = this.state.values.slice(0);
    var m ={id:++this.tmpCnt};
    _.map(this.props.modelSchema.fields, (fl)=>{
      m[fl.name] = null;
    });
    d.push(m)
    this.setState({values:d});
  }
  editRow=(val)=>{
    this.setState({current:val, open: true});
  }
  handleOpen = (d) => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  handleCommitRow=(val)=>{
    debugger;
    let d = this.state.values.slice(0);
    var p_row = _.find(d,{id:val.id});
    _.extend(p_row, val);
    this.setState({values:d, current:null, open: false});
  }
  handleCancelEditRow=()=>{
    this.setState({open: false});
  }
  render(){
    return(<div>
      <Table selectable={false} wrapperStyle={stylee.wrapperStyle}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            {_.map(this.modelSchema.fields, (fl) => {
                return (<TableHeaderColumn>{fl.text}</TableHeaderColumn>);
            })}
            <TableHeaderColumn style={stylee.headerColIndex}>#</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {_.map(this.state.values, (val) => {
              return (
                <TableRow>
                  {_.map(this.modelSchema.fields, (fl) => {
                      return (<TableRowColumn>{val[fl.name]}</TableRowColumn>);
                  })}
                  <TableRowColumn style={stylee.headerColIndex}>
                    <FlatButton label="Edit" onTouchTap={() => this.editRow(val)}></FlatButton>
                  </TableRowColumn>
                </TableRow>
              );
          })}
        </TableBody>
      </Table>
      <FlatButton label="Add Row" onTouchTap={() => this.addRow()}></FlatButton>
      <Dialog
              title="Edit"
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              <SimpleFormEditor
                modelSchema={this.modelSchema}
                values={this.state.current}
                onCommitForm={this.handleCommitRow}
                onCancelForm={this.handleCancelEditRow} />
      </Dialog>
      </div>
    );
  }
}

export default ListFormEditor;
