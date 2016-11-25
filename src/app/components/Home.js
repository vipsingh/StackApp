import React, {Component} from 'react';
import ModuleBoard from './plan/ModuleBoard';

class Home extends Component{

    handleClick(){

    }
    render(){

      return(
        <div>
        <label>HOME</label>
        <button onClick={this.handleClick} >Click Me</button>
        <br/>
        <ModuleBoard />
        </div>
      )
    }
}

export default Home;
