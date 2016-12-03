import React, {Component} from 'react';
import ModuleBoard from './plan/ModuleBoard';
import ObjectSmallView from './widget/ObjectSmallView';

class Home extends Component{

    handleClick(){

    }
    render(){

      return(
        <div>
        <label>HOME</label>
        <button onClick={this.handleClick} >Click Me</button>
        <br/>
        <ObjectSmallView id={1} title={'D R Boss'} title1={'xy_gh@gm.com'} />
        </div>
      )
    }
}

export default Home;
