import React from 'react';
import _ from 'lodash';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
const stylee ={
  headerColIndex:{width:100},
  wrapperStyle:{border:'1px solid rgb(224, 224, 224)'}
}
export default class TreeGridView extends React.Component {
  constructor(props){
    super(props);
    this.tmpCnt = -100000;
    this.cols = ['id', 'name', 'city'];
    // var _data = [
    //   {id:1, name:'bhokal 1', city: 'deb 1', children:[{id:11, name:'c 2', city: 'deb 22'},{id:12, name:'c 21', city: 'deb 21'}]},
    //   {id:2, name:'bhokal 2', city: 'deb 2'},
    //   {id:3, name:'bhokal 3', city: 'deb 3', children:[{id:11, name:'c 2', city: 'deb 22'},{id:12, name:'c 21', city: 'deb 21'}]}
    // ];
    var _data = [
      {id:1, name:'bhokal 1', city: 'deb 1', parent: 0, level:'1', nested: 0, expanded : true},
      {id:2, name:'bhokal 2', city: 'deb 2', parent: 1, level:'1.1', nested: 1, expanded : true},
      {id:3, name:'bhokal 3', city: 'deb 3', parent: 1, level:'1.2', nested: 1, expanded : true},
      {id:4, name:'bhokal 4', city: 'deb 4', parent: 0, level:'2', nested: 0, expanded : true},
      {id:5, name:'bhokal 5', city: 'deb 5', parent: 4, level:'2.1', nested: 1, expanded : true}
    ];
    this.state={data: _data, currentId: null, currentMember:''};
  }

  render(){
    return (
      <div>
        <Table selectable={false} wrapperStyle={stylee.wrapperStyle}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              {_.map(this.cols, (fl) => {
                  return (<TableHeaderColumn>{fl}</TableHeaderColumn>);
              })}

            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              this.state.data.map(this.renderTreeRow)
            }
          </TableBody>
        </Table>
      </div>
    );
  }

  renderTreeRow = (row)=>{
    return (
      <TableRow>
          {_.map(this.cols, (fl) => {
              if(fl === 'name'){
                return(<TableRowColumn>
                  <div style={{marginLeft: row.nested * 10}}>
                    <IconButton iconClassName={"fa fa-minus"} />{row[fl]}
                  </div>
                </TableRowColumn>)
              }
                return (
                  <TableRowColumn>
                    <div>{row[fl]}</div>
                  </TableRowColumn>);
          })}
      </TableRow>
    )
  }
}
