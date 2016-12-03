import React, {Component,PropTypes} from 'react';
import ReactDataGrid from 'react-data-grid';
import { browserHistory } from 'react-router';
import _ from 'lodash';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';

import api_object from '../../api/object';
import OIcon from '../widget/ObjectIcon';
import DataPager from '../widget/DataPager';
import ObjectFilterBox from '../widget/ObjectFilterBox';
import {cellFormatter} from '../helpers/ObjectList';

class ObjectListView extends Component{
  static contextTypes = {
    router: PropTypes.func.isRequired,
    muiTheme: PropTypes.object.isRequired
  }
  constructor(props){
    super(props);
    this.state={schemaLoaded: false, loading: true,
      originalRows : [], rows : [], selectedIndexes: [], totalCount: 0,
      currentPage: 1, pageSize: 25
    };
    this.columns =[];
    this.modelSchema=null;
    this.rowGetter = this.rowGetter.bind(this);
    this.handleGridSort = this.handleGridSort.bind(this);
    this.currentSortInfo = {field:'', dir:'ASC'};
    this.currentSearch = "";
    this.filterInfo = {};
  }
  loadSchema = ()=>{
    var that= this;
    return api_object.getSchema(this.props.routeParam.name).then((schema)=>{
      that.modelSchema = schema;
      that.buildColumns();
      that.setState({schemaLoaded:true});
      setTimeout(()=>{
          that.loadData(1);
      });

    });
  };

  buildColumns(){
    let cols =[{key:'id', name: 'Id', sortable: true, width: 80}];
    _.map(this.modelSchema.fields, function(fl){
      if(fl.type == 'one_to_one' || fl.type == 'one_to_many')
        return;
      if(fl.hidden)
        return;
      let d = {key:fl.name, name: fl.text, sortable: true, resizable : true};
      d.getRowMetaData=function (rowData, col) {
        return {data: rowData, col: col};
      }
      if(cellFormatter[fl.type])
        d.formatter = cellFormatter[fl.type];
      if(this.modelSchema.field_title == fl.name){
        d.formatter = <cellFormatter.title objectName={this.modelSchema.name}/>;
      }
      if(fl.type == 'select')
        d.list_values = fl.list_values;
      cols.push(d);
    }.bind(this));
    this.columns = cols;
  }

  loadData = (index)=>{
    var that = this;
    that.setState({loading: true});
    api_object.getListData(this.props.routeParam.name,{
        pageIndex: index,
        sortinfo:this.currentSortInfo,
        search: this.currentSearch,
        filters: this.filterInfo}).then((data)=>{
      var originalRows = data.data;
      var rows = originalRows.slice(0);
      that.setState({loading: false,
        originalRows : originalRows, rows : rows, totalCount: data.totalCount, currentPage: index
      });
    });
  };
  componentWillMount() {
    var that = this;
    this.loadSchema();
  }

  handleRequestPage = (index)=>{
    this.loadData(index);
  };

  rowGetter(rowIdx){
    return this.state.rows[rowIdx];
  }
  handleGridSort(sortColumn, sortDirection){
    this.currentSortInfo.field = sortColumn;
    this.currentSortInfo.dir = sortDirection;
    this.loadData(1);
  }

  handleFilterChanged = (filterInfo)=>{
    this.filterInfo = filterInfo;
    this.loadData(1);
  }

  handleOnSearch=(value)=>{
    this.currentSearch = value;
    this.loadData(1);
  }

  onRowsSelected = (rows)=> {
    this.setState({selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx))});
  }
  onRowsDeselected = (rows)=> {
    var rowIndexes = rows.map(r => r.rowIdx);
    this.setState({selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1 )});
  }

  render(){
    if(!this.state.schemaLoaded){
      return (<label>loading..</label>)
    }
    else{
      let rowSelection;
      if(this.props.rowSelect){
        rowSelection={
          showCheckbox: true,
          enableShiftSelect: true,
          onRowsSelected: this.onRowsSelected,
          onRowsDeselected: this.onRowsDeselected,
          selectBy: {
            indexes: this.state.selectedIndexes
          }
        };
      }
      return(
        <Paper>
          <DocToolBar name={this.modelSchema.name} title={this.modelSchema.text}
          onRefreshCommand={()=>{this.loadData(1)}}
          onNewCommand={this.raiseNew} style={{color: this.context.muiTheme.toolbar.color}}
          />

          <div className='row'>
              <div className='col-xs-12'>
                <ObjectFilterBox modelSchema={this.modelSchema} onSearch={this.handleOnSearch} onFilterChanged={this.handleFilterChanged} />
              </div>
          </div>
          {
            function(){
              if(this.props.simpleList){
                return this.renderSimpleList();
              }
              else{
                return (
                  <ReactDataGrid
                    columns={this.columns}
                    rowKey='id'
                    rowGetter={this.rowGetter}
                    rowsCount={this.state.rows.length}
                    onGridSort={this.handleGridSort}
                    rowSelection={rowSelection}
                    >
                  </ReactDataGrid>
                )
              }
            }.bind(this)()
          }
          <Paper>
            <div className='row'>
              <div className='col-sm-4'></div>
              <div className='col-sm-8'>
                <DataPager currentPage={this.state.currentPage} rowsCount={this.state.totalCount} pageSize={this.state.pageSize}
                onRequestPage={this.handleRequestPage}/>
              </div>
            </div>
          </Paper>
        </Paper>
        );
    }
  }

  renderSimpleList(){
    return(
      <Table selectable={false}>
        <TableBody displayRowCheckbox={false} stripedRows ={true} showRowHover={true}>
        {
          this.state.rows.map((dt)=>{
            let l_letter = dt.name.substr(0,1).toUpperCase();
            return(<TableRow>
              <TableRowColumn>
                <div style={{display:'flex', boxSizing: 'border-box', position: 'relative', whiteSpace: 'nowrap', padding: 5}}>
                  <Avatar>{l_letter}</Avatar>
                  <div>
                    {dt.name}
                  </div>
                </div>
              </TableRowColumn>
            </TableRow>)
          }, this)
        }
        </TableBody>
      </Table>
      );
  }
}
export default ObjectListView;

const DocToolBar = (props) =>
    <Toolbar>
      <ToolbarGroup firstChild={true}>
        <FlatButton style={{color:props.style.color}}
          label={props.title}
          icon={<OIcon name={props.name} />}
        />
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarSeparator />
        <RaisedButton primary={true} onTouchTap={props.onRefreshCommand}
          icon={<FontIcon className="fa fa-refresh" />} />
        <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Download" />
            <MenuItem primaryText="Print" />
        </IconMenu>
      </ToolbarGroup>
</Toolbar>;
