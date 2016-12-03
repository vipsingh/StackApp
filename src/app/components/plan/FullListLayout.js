import React, {Component,PropTypes} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import ObjectListView from './ObjectListView';

let btn_style ={
  position: 'fixed',
  bottom: 30,
  right: 30
}
export default class FullListLayout extends Component{
  static contextTypes = {
    router: PropTypes.func.isRequired
  }
  raiseNew = ()=>{
    //create new object
    this.context.router.push("/object/form/"+this.props.routeParam.name);
  }

  render(){
    return(<div>
      <ObjectListView {...this.props}/>
      <FloatingActionButton style={btn_style} onTouchTap={this.raiseNew}>
        <ContentAdd />
      </FloatingActionButton>
    </div>)
  }
}
