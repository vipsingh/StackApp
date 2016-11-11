import React, {Component} from 'react';
import ListEditor_1 from './editor/ListEditor_1';
import TreeGridView from './widget/TreeGridView';

class Home extends Component{

    handleClick(){

    }
    render(){

      return(
        <div>
        <label>HOME</label>
        <button onClick={this.handleClick} >sdadasd</button>
        <TreeGridView />
        </div>
      )
    }
}

export default Home;
