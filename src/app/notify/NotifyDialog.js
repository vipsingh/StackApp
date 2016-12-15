import React, {PropTypes, cloneElement, Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Promise from 'bluebird';
import ReactDOM, { render } from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FieldEditor,{renderInputField} from '../components/editor/FieldEditor';

const muiTheme = getMuiTheme();
function defer() {
    var resolve, reject;
    var promise = new Promise(function() {
        resolve = arguments[0];
        reject = arguments[1];
    });
    return {
        resolve: resolve,
        reject: reject,
        promise: promise
    };
}

class ConfirmBox extends Component{
  constructor(props){
    super(props);
    this.displayName = 'ConfirmBox';
    this.promise;
  }

  abort=()=> {
    return this.promise.reject({});
  }

  confirm=()=> {
    return this.promise.resolve();
  }

  componentDidMount() {
    debugger;
    this.promise = defer();
  }

  render() {
    let btn_op = {
      confirmLabel: 'OK',
      abortLabel: 'Cancel'
    };
    if(this.props.options.buttonType == 'YESNO'){
      btn_op.confirmLabel = 'Yes';
      btn_op.abortLabel = 'No';
    }
    let options = Object.assign({},this.props.options,btn_op);

    const action_abort = <FlatButton
      label={options.abortLabel}
      primary={false}
      onTouchTap={this.abort}
    />;
    const action_confirm = <FlatButton
      label={options.confirmLabel}
      primary={true}
      keyboardFocused={true}
      onTouchTap={this.confirm}
    />;

    const actions = [];
    if(this.props.options.buttonType == 'OK'){
      actions.push(action_confirm);
    }
    else{
      actions.push(action_abort);
      actions.push(action_confirm);
    }

    return (<MuiThemeProvider muiTheme={muiTheme}>
                <Dialog
                  title={this.props.title}
                  actions={actions}
                  modal={false}
                  open={true}
                  onRequestClose={this.abort}
                >
                  {this.props.message}
                </Dialog>
              </MuiThemeProvider>
    );
  }
}

class StaticViewBox extends Component{
  constructor(props){
    super(props);
    this.promise;
  }

  abort=()=> {
    return this.promise.reject({});
  }

  confirm=()=> {
    return this.promise.resolve();
  }

  componentDidMount() {
    this.promise = defer();
  }

  render() {
    let btn_op = {
      confirmLabel: 'OK',
      abortLabel: 'Cancel'
    };
    let options = Object.assign({},btn_op, this.props.options);

    const action_abort = <FlatButton
      label={options.abortLabel}
      primary={false}
      onTouchTap={this.abort}
    />;
    const action_confirm = <FlatButton
      label={options.confirmLabel}
      primary={true}
      keyboardFocused={true}
      onTouchTap={this.confirm}
    />;

    const actions = [];
    //actions.push(action_abort);
    actions.push(action_confirm);

    return (<MuiThemeProvider muiTheme={muiTheme}>
                <Dialog
                  title={this.props.title}
                  actions={actions}
                  modal={false}
                  open={true}
                  onRequestClose={this.abort}
                >
                  {this.props.children}
                </Dialog>
              </MuiThemeProvider>
    );
  }
}

class PromptBox extends Component{
  constructor(props){
    super(props);
    this.displayName = 'PromptBox';
    this.promise;
    this.fields = this.props.fields;
    _.mapValues(this.fields, function(value, key) {
      value.name = key;
      value.type = value.type || "string";
      return value;
    });
    var st ={values:{}, errorText: ''};
    _.map(this.fields, (fl) => {
      st.values[fl.name]= null;
    });
    this.state = st;
  }
  handleOnChange = (val, fl_name)=>{
    let d = Object.assign({},this.state.values);
    d[fl_name] = val;
    this.setState({values:d, errorText: ''});
  };

  abort=()=> {
    return this.promise.reject({});
  }

  confirm=()=> {
    debugger
    if(this.validate()){
      return this.promise.resolve(Object.assign({},this.state.values));
    }
  }

  componentDidMount() {
    debugger;
    this.promise = defer();
  }

  validate(){
    var valid = true;
    _.map(this.fields, (fl) => {
      if(fl.required && !this.state.values[fl.name]){
        valid = false;
        this.setState({errorText: `${fl.text} is required.`});
      }
    });
    return valid;
  }

  render() {
    let btn_op = {
      confirmLabel: 'OK',
      abortLabel: 'Cancel'
    };
    let options = Object.assign({},this.props.options,btn_op);

    const action_abort = <FlatButton
      label={options.abortLabel}
      primary={false}
      onTouchTap={this.abort}
    />;
    const action_confirm = <FlatButton
      label={options.confirmLabel}
      primary={true}
      keyboardFocused={true}
      onTouchTap={this.confirm}
    />;

    const actions = [];
    if(this.props.options.buttonType == 'OK'){
      actions.push(action_confirm);
    }
    else{
      actions.push(action_abort);
      actions.push(action_confirm);
    }

    return (<MuiThemeProvider muiTheme={muiTheme}>
                <Dialog
                  title={this.props.title}
                  actions={actions}
                  modal={false}
                  open={true}
                  onRequestClose={this.abort}
                >
                <div><span style={{color:'#f05050'}}>{this.state.errorText}</span></div>
                  {
                    _.map(this.fields, (fl) => {
                      var fl_state = this.state.values[fl.name];
                      return (<div className='row'>
                            <div className='col-xs-4'>
                              <div style={{textAlign: 'right', paddingTop: 12, lineHeight:'24px', fontWeight: 500}}>{fl.text || fl.name}</div>
                            </div>
                            <div className='col-xs-7'>
                              <FieldEditor floatingLabelFixed={true}
                              fieldSchema={fl} name={fl.name}
                              value={fl_state}
                              onChange={(val)=>{this.handleOnChange(val,fl.name)}} />
                            </div>
                          </div>)


                    })
                  }
                </Dialog>
              </MuiThemeProvider>
    );
  }
}

export const confirmBox = function(title, message, options) {
  var cleanup, component, props, wrapper;
  if (options == null) {
    options = {};
  }
  title = title || 'Message';
  props = {message: message, title: title, options: options};
  wrapper = document.body.appendChild(document.createElement('div'));
  component = render(<ConfirmBox {...props}/>, wrapper);
  cleanup = function() {
    debugger;
    ReactDOM.unmountComponentAtNode(wrapper);
    return setTimeout(function() {
      return wrapper.remove();
    });
  };
  return component.promise.promise.finally(cleanup);
};

export const staticViewBox = function(title, Comp, options) {
  var cleanup, component, props, wrapper;
  if (options == null) {
    options = {};
  }
  title = title || 'Message';
  props = {title: title, options: options};
  wrapper = document.body.appendChild(document.createElement('div'));
  component = render(<StaticViewBox {...props}><Comp /></StaticViewBox>, wrapper);
  cleanup = function() {
    debugger;
    ReactDOM.unmountComponentAtNode(wrapper);
    return setTimeout(function() {
      return wrapper.remove();
    });
  };
  return component.promise.promise.finally(cleanup);
};

export const promptBox = function(title, fields, options){
  //promptBox('Please fill values', {"city":{"text":"City"}, "state":{"type":"decimal","text":"State"}})=>
  var cleanup, component, props, wrapper;
  if (options == null) {
    options = {};
  }
  props = {fields: fields, title: title, options: options};
  wrapper = document.body.appendChild(document.createElement('div'));
  component = render(<PromptBox {...props}/>, wrapper);
  cleanup = function() {
    ReactDOM.unmountComponentAtNode(wrapper);
    return setTimeout(function() {
      return wrapper.remove();
    });
  };
  return component.promise.promise.finally(cleanup);
}
