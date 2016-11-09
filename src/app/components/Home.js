import React, {Component} from 'react';
import ListEditor_1 from './editor/ListEditor_1';

class Home extends Component{

    handleClick(){

    }
    render(){

      return(
        <div>
        <label>HOME</label>
        <button onClick={this.handleClick} >sdadasd</button>
        <ListEditor_1 />
        </div>
      )
    }
}

export default Home;
