import request from '../utils/request';
import {handleError} from '../error';
import Promise from 'bluebird';

var object_api={
  getSchema:function(object_name) {
    return new Promise((resolve, reject)=>{
      request.get('/object/'+object_name+'/schema').then(function(res) {
        resolve(res.data);
      }).catch(function(err) {
        reject(err);
        handleError(err);
      });
    });
  },

  getModel:function(object_name, id) {
    return new Promise((resolve, reject)=>{
      request.get('/object/'+object_name+'/model', {params : {id: ((id)?id:0)}}).then(function(res) {
        resolve(res.data);
      }).catch(function(err) {
        reject(err);
        handleError(err);
      });
    });
  },

  getListData:function(object_name, params) {
    params = params || {};
    return new Promise((resolve, reject)=>{
      request.post('/object/'+object_name+'/list', params).then(function(res) {
        resolve(res.data);
      }).catch(function(err) {
        reject(err);
        handleError(err);
      });
    });
  },

  saveData: function(object_name, data) {
    return new Promise((resolve, reject)=>{
      request.post('/object/'+object_name+'/save', data).then(function(res) {
        resolve(res.data);
      }).catch(function(err) {
        reject(err);
        handleError(err);
      });
    });
  },

  getSimpleListData:function(object_name, params) {
    params = params || {};
    params.query = params.query || '';
    return new Promise((resolve, reject)=>{
      request.get('/object/'+object_name+'/simplelist',{params:{query:params.query}}).then(function(res) {
        resolve(res.data);
      }).catch(function(err) {
        reject(err);
        handleError(err);
      });
    });
  },

  getSingle:function(object_name, id, params) {
    params = params || {};
    return new Promise((resolve, reject)=>{
      request.get('/object/'+object_name+'/single/'+id, {params:params}).then(function(res) {
        resolve(res.data);
      }).catch(function(err) {
        reject(err);
        handleError(err);
      });
    });
  }
};
export default object_api;
