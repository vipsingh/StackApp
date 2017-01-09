import React from 'react';
import CoreLayout from '../components/CoreLayout';
import Home from '../components/Home';
import ObjFormWrapper from './ObjFormWrapper';
import ObjListWrapper from './ObjListWrapper';
import NotFound from './NotFound';
import PosDesk from '../components/pos/Desk';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'


class AppRoutes extends React.Component{
  render(){
    return(<Router history={hashHistory}>
        <Route path="/" component={CoreLayout}>
            <IndexRoute component={Home}/>
            <Route path="/object/form/:name(/:id)" component={ObjFormWrapper}/>
            <Route path="/object/list/:name" component={ObjListWrapper}/>
            <Route path="/pos" component={PosDesk}/>
            <Route path="*" component={NotFound}/>
          </Route>
    </Router>)
  }
}

export default AppRoutes;
