import React from 'react';
import { Route, Router, browserHistory  } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';
import axios from 'axios';

import stack from '../stack';
import AppRoutes from '../routes/index';

injectTapEventPlugin();

axios.defaults.baseURL = 'http://localhost:4400/api';

window.__Session ={
  userId : 1,
  clientId: 1,
  userRoleId: 1,
  currencyId: 1,
  sessionId: null
};
window.__Config = {
  version: '0.1.0',
  appType: 'web'
};
window.$stack = stack;

const muiTheme = getMuiTheme();

class App extends React.Component {
  render () {
    //const {  Routes } = this.props
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <AppRoutes></AppRoutes>
      </MuiThemeProvider>
    )
  }
}

export default App
