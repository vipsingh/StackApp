import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import ModuleBoard from './plan/ModuleBoard';
import TreeGridView from './widget/TreeGridView';

class Home extends Component{
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }
  constructor(props){
    super(props);
    this.state ={str: ''};
  }
    handleClick = ()=>{

    }
    render(){

      return(
        <div>
        <label>HOME</label>
        <button onClick={this.handleClick} >Click Me</button>
        <br/>
        <TreeGridView />
        </div>
      )
    }
}

export default Home;
