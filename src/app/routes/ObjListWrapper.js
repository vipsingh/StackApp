import React, {Component} from 'react';
import FullListLayout from '../components/plan/FullListLayout';

class ObjListWrapper extends Component{
  constructor(props){
    super(props);
    this.state={
      loaded: true,
    };
  }
  componentWillReceiveProps(nextProps) {
      var that = this;
      //fetch schema and data
      if(this.props.params.name != nextProps.params.name){
        that.setState({loaded:false});
        setTimeout(function(){
          that.setState({loaded:true});
        });
      }
  }

  render(){
    if(this.state.loaded){
      let objParam = {name:this.props.params.name, query: this.props.location.query}
      return(
        <FullListLayout routeParam={objParam}></FullListLayout>
      )
    }
    else{
      return (<label>routing</label>)
    }
  }
}



export default ObjListWrapper;
