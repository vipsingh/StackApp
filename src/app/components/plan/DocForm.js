import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import BaseEntityForm from './BaseEntityForm';
import DocFormHOC from "./DocFormHOC";
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
    //let m_path = this.props.routeParam.name;
    // import("../../../appContent/objects/"+ m_path ).then((module)=>{
    //   let m_doc = new module.default();
    //   return m_doc;
    // }).catch((err)=>{
    //   console.log("Error in loading object extended component.");
    // });    

    that.props.dispatch(startLoading());
    api_object.getSchema(this.props.routeParam.name).then((sch)=>{
      that.model_schema = sch;
      that.loadData();
    }).finally(()=>{that.props.dispatch(endLoading());});
  }

  loadData(){
    var that = this;
    return api_object.getModel(this.props.routeParam.name, this.props.routeParam.id).then((dt)=>{
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
      var CDoc =  DocFormHOC(BaseEntityForm, "form"+this.model_schema.name, {modelSchema: this.model_schema, initialValues: this.initialValues});
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
