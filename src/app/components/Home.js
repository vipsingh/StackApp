import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import ModuleBoard from './plan/ModuleBoard';
import FlatButton from 'material-ui/FlatButton';
import Promise from 'bluebird';


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
        <FlatButton label='Home' onClick={this.handleClick} />
        
        <br/>
        </div>
      )
    }
}

export default Home;
