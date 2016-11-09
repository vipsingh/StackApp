import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import CommonForm from './CommonForm';
import DocFormHOC from "./DocFormHOC";
//import api_object from '../../api/docObject';
import api_object from '../../api/object';
import { startLoading, endLoading } from '../../reducers/indicator';

class DocForm extends Component{
  constructor(props){
    super(props);
    this.state={
      loaded: false,
    };
    this.model_schema = null;
    this.model_fields = null;
    this.initialValues = {};
  }
  componentWillMount() {
    var that = this;
    that.props.dispatch(startLoading());
    api_object.getSchema(this.props.objParam.name).then((sch)=>{
      that.model_schema = sch;
      that.loadData();
    }).finally(()=>{that.props.dispatch(endLoading());});
  }

  loadData(){
    var that = this;
    return api_object.getModel(this.props.objParam.name, this.props.objParam.id).then((dt)=>{
      that.initialValues = dt;
      that.setState({loaded:true});
    }).finally(()=>{that.props.dispatch(endLoading());});
  }

  handleReload = () =>{
    var that = this;
    that.setState({loaded:false});
    setTimeout(function(){
      that.props.dispatch(startLoading());
      that.loadData();
    });
  }

  loadView(){
    if(this.state.loaded){
      var CDoc =  DocFormHOC(CommonForm, "form"+this.model_schema.name, {modelSchema: this.model_schema, initialValues: this.initialValues});
      return (
        <div>
          <CDoc onReload={this.handleReload}></CDoc>
        </div>
      )
    }
    else{
      return(<label>loading</label>)
    }
  }

  render(){
    return(
    <div>
    {this.loadView()}
    </div>
    )
  }

}
export default connect()(DocForm);
