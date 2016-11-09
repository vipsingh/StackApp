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
    }
    componentWillMount() {
      var that = this;
    }

    handleSubmit(data){
      var that = this;
      this.props.dispatch(startSubmit(formName));
      debugger;
      that.props.dispatch(startLoading());
      api_object.saveData(this.props.modelSchema.name, data).then((d)=>{
        Notify.success(`Document[${d.id}] Saved`);
        that.props.dispatch(endLoading());
        that.props.dispatch(stopSubmit(formName));
        that.context.router.push("/object/form/"+this.modelSchema.name+"?edit=false&id="+d.id);
        //that.props.onReload();
      }).catch((err)=>{
        that.props.dispatch(endLoading());
        that.props.dispatch(stopSubmit(formName));
      });
    }

    handleFieldValueSet=(field, val)=>{
      //this.props.autofill('creditlimit1', Number(val));
    };

    render() {
      const newProps = {
        setFieldValue: this.handleFieldValueSet,
      }
      return (
        <div>
          <div className='row'>
            <div className='col-sm-12'>
              <DocToolbar title={this.props.modelSchema.name}
                  saveCommand={this.props.handleSubmit(this.handleSubmit)}/>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-12'>
              <Paper zDepth={2} style={style.paper}>
                <WrappedComponent {...this.props} {...newProps}/>
              </Paper>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-12 doc-form-footer'></div>
          </div>
          <Paper>
              {JSON.stringify(this.props.formValues)}
          </Paper>
        </div>
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