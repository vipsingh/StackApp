import React, {Component} from 'react';
import DocForm from '../components/plan/DocForm';

class ObjFormWrapper extends Component{
  constructor(props){
    super(props);
    this.state={
      loaded: true,
    };
  }
  componentWillReceiveProps(nextProps) {
      var that = this;
      //fetch schema and data
      if(this.props.params.name != nextProps.params.name || this.props.location.query.id != nextProps.location.query.id){
        that.setState({loaded:false});
        setTimeout(function(){
          that.setState({loaded:true});
        });
      }
  }

  render(){
    if(this.state.loaded){
      debugger;
      let objParam = {name:this.props.params.name, id:this.props.location.query.id,  query: this.props.location.query}
      return(
        <DocForm objParam={objParam}></DocForm>
      )
    }
    else{
      return (<label>routing</label>)
    }
  }
}

export default ObjFormWrapper;
