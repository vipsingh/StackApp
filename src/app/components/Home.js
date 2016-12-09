import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import ModuleBoard from './plan/ModuleBoard';

class Home extends Component{
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }
  constructor(props){
    super(props);
    this.state ={str: ''};
  }
    handleClick = ()=>{
      var f =  function(d, x){
        return d+x;
      }
      debugger;
      this.setState({str: f.toString()});

    }
    render(){

      return(
        <div>
        <label>HOME</label>
        <button onClick={this.handleClick} >Click Me</button>
        <br/>
        <div>{this.state.str}</div>

        <ModuleBoard />
        </div>
      )
    }
}

export default Home;
