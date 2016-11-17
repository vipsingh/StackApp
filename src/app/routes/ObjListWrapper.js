import React, {Component} from 'react';
import ObjectListView from '../components/plan/ObjectListView';

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
        <ObjectListView routeParam={objParam}></ObjectListView>
      )
    }
    else{
      return (<label>routing</label>)
    }
  }
}



export default ObjListWrapper;
