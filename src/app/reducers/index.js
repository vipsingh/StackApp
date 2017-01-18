import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'
import apiReducer from './api';
import indicator from 'stack_app/reducers/indicator';

//const xApp = orderRed;
const xApp = combineReducers({
  form: formReducer,
  indicator,
  api: apiReducer
});
export default xApp
