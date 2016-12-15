import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { reduxForm, propTypes, getFormValues, isDirty, startSubmit, stopSubmit } from 'redux-form';
import Paper from 'material-ui/Paper';

import { startLoading, endLoading } from '../../reducers/indicator';
import {validateForm} from '../../utils/validator';
import api_object from '../../api/object';
import DocToolbar from '../widget/DocToolbar';
import Notify from '../../notify';

const style = {
  paper:{padding:10}
};

function DocFormHOC(WrappedComponent, formName, modelParams){
  class BaseDocForm extends Component {
    static propTypes = {
    ...propTypes,
    // other props you might be using
    }
    static childContextTypes = {
      $modelSchema: React.PropTypes.object,
      $formName: React.PropTypes.string
    };
    static contextTypes = {
      router: React.PropTypes.func.isRequired
    };
    getChildContext() {
      return {$modelSchema: this.props.modelSchema, $formName: formName};
    }
    constructor(props){
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      debugger;
    }
    componentWillMount() {
      var that = this;
    }

    handleSubmit(data){
      var that = this;
      this.props.dispatch(startSubmit(formName));
      that.props.dispatch(startLoading());
      api_object.saveData(this.props.modelSchema.name, data).then((d)=>{
        Notify.success(`${this.props.modelSchema.text}[${d.id}] Saved`);
        that.props.dispatch(endLoading());
        that.props.dispatch(stopSubmit(formName));
        that.context.router.push("/object/form/"+this.modelSchema.name+"?edit=false&id="+d.id);
        //that.props.onReload();
      }).catch((err)=>{
        that.props.dispatch(endLoading());
        that.props.dispatch(stopSubmit(formName));
      });
    }

    render() {
      const newProps = {
      }
      return (
        <Paper zDepth={2}>
          <div className='row'>
            <div className='col-xs-12'>
              <DocToolbar name={this.props.modelSchema.name} title={this.props.modelSchema.text}
                  saveCommand={this.props.handleSubmit(this.handleSubmit)}/>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-12' style={style.paper}>
              <WrappedComponent {...this.props} {...newProps}/>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-12 doc-form-footer'></div>
          </div>
          <Paper>
              {JSON.stringify(this.props.formValues)}
          </Paper>
        </Paper>
      )
    }
  }
  //
  BaseDocForm = reduxForm({
    form: formName,
    validate: (values)=>{return validateForm(modelParams.modelSchema, values);},
    initialValues: modelParams.initialValues,
    modelSchema: modelParams.modelSchema
  }
  )(BaseDocForm);

  return connect(state => ({
    formValues: getFormValues(formName)(state) || modelParams.initialValues,
    dirty: isDirty(formName)(state)
  }))(BaseDocForm);
}

export default DocFormHOC;
