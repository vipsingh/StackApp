import React, {PropTypes, cloneElement, Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Promise from 'bluebird';
import ReactDOM, { render } from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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

class Confirm extends Component{
  constructor(props){
    super(props);
    this.displayName = 'Confirm';
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
      primary={true}
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

export const confirmBox = function(message, title, options) {
  debugger;
  var cleanup, component, props, wrapper;
  if (options == null) {
    options = {};
  }
  title = title || 'Message';
  props = {message: message, title: title, options: options};
  wrapper = document.body.appendChild(document.createElement('div'));
  component = render(<Confirm {...props}/>, wrapper);
  debugger;
  cleanup = function() {
    debugger;
    ReactDOM.unmountComponentAtNode(wrapper);
    return setTimeout(function() {
      return wrapper.remove();
    });
  };

  return component.promise.promise.finally(cleanup);
};
