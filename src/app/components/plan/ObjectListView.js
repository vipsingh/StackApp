import React, {Component,PropTypes} from 'react';
import ReactDataGrid from 'react-data-grid';
import { browserHistory } from 'react-router';
import _ from 'lodash';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';

import api_object from '../../api/object';
import DataPager from '../widget/DataPager';
import ObjectFilterBox from '../widget/ObjectFilterBox';
import {cellFormatter} from '../helpers/ObjectList';

class ObjectListView extends Component{
  static contextTypes = {
    router: PropTypes.func.isRequired
  }
  constructor(props){
    super(props);
    this.state={schemaLoaded: false, loading: true,
      originalRows : [], rows : [], selectedIndexes: [], totalCount: 0,
      currentPage: 1, pageSize: 10
    };
    this.columns =[];
    this.modelSchema=null;
    this.rowGetter = this.rowGetter.bind(this);
    this.handleGridSort = this.handleGridSort.bind(this);
    this.currentSortInfo = {field:'', dir:'ASC'};
    this.filterInfo = null;
  }
  loadSchema = ()=>{
    var that= this;
    return api_object.getSchema(this.props.objParam).then((schema)=>{
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
      if(this.modelSchema.field_identifier == fl.name){
        d.formatter = <cellFormatter.identifier objectName={this.modelSchema.name}/>;
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
    api_object.getListData(this.props.objParam,{pageIndex: index, sortinfo:this.currentSortInfo}).then((data)=>{
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

  handleFilterChanged(filterInfo){

  }

  raiseNew = ()=>{
    //create new object
    this.context.router.push("/object/form/"+this.modelSchema.name);
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
        <div>
          <DocToolBar title={this.props.objParam}
          onRefreshCommand={()=>{this.loadData(1)}}
          onNewCommand={this.raiseNew}
          />
          <Paper>
            <div className='row'>
              <div className='col-sm-12'>
                <ObjectFilterBox modelSchema={this.modelSchema} />
              </div>
            </div>
          </Paper>
          <ReactDataGrid
            columns={this.columns}
            rowKey='id'
            rowGetter={this.rowGetter}
            rowsCount={this.state.rows.length}
            onGridSort={this.handleGridSort}
            rowSelection={rowSelection}
            >
          </ReactDataGrid>
          <Paper>
            <div className='row'>
              <div className='col-sm-4'></div>
              <div className='col-sm-8'>
                <DataPager currentPage={this.state.currentPage} rowsCount={this.state.totalCount} pageSize={this.state.pageSize}
                onRequestPage={this.handleRequestPage}/>
              </div>
            </div>
          </Paper>
        </div>
        );
    }
  }
}
export default ObjectListView;

const DocToolBar = (props) =>
    <Toolbar>
      <ToolbarTitle text={props.title} />
      <ToolbarGroup>
        <ToolbarSeparator />
        <RaisedButton primary={true} onTouchTap={props.onRefreshCommand}
          icon={<FontIcon className="fa fa-refresh" />} />
        <RaisedButton primary={true} onTouchTap={props.onNewCommand}
          icon={<FontIcon className="fa fa-plus" />} />
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
