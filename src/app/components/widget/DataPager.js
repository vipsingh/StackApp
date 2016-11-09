import React from 'react';
import IconButton from 'material-ui/IconButton';

class DataPager extends React.Component {
  processPage=(direction)=>{
    var totalPages = Math.ceil(this.props.rowsCount/this.props.pageSize);
    if(direction == 'F')
      this.props.onRequestPage(1);
    else if(direction == 'P')
      this.props.onRequestPage((this.props.currentPage > 1)? this.props.currentPage - 1: 1);
    else if(direction == 'N')
      this.props.onRequestPage((this.props.currentPage < totalPages)?this.props.currentPage + 1: totalPages);
    else if(direction == 'L')
      this.props.onRequestPage(totalPages);
  };
  render(){
    return (
        <table className='pull-right'>
          <tr>
          <td><IconButton disabled={this.props.currentPage === 1} onTouchTap={()=>{this.processPage('F')}} iconClassName="fa fa-backward" tooltip="First" /></td>
          <td><IconButton disabled={this.props.currentPage === 1} onTouchTap={()=>{this.processPage('P')}} iconClassName="fa fa-chevron-left" tooltip="Previous" /></td>
          <td>Page <input style={{maxWidth:60, textAlign:'right'}} type='text' value={this.props.currentPage}/> / {Math.ceil(this.props.rowsCount/this.props.pageSize)}</td>
          <td></td>
          <td><IconButton disabled={this.props.currentPage === Math.ceil(this.props.rowsCount/this.props.pageSize)} onTouchTap={()=>{this.processPage('N')}} iconClassName="fa fa-chevron-right" tooltip="Next" /></td>
          <td><IconButton disabled={this.props.currentPage === Math.ceil(this.props.rowsCount/this.props.pageSize)} onTouchTap={()=>{this.processPage('L')}} iconClassName="fa fa-forward" tooltip="Last" /></td>
          </tr>
        </table>);
  }
}

export default DataPager;
