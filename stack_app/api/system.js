import request from '../utils/request';

var app_api={
  getModules:function(cb) {
    request.get('/system/getModules').then(function(res) {
      cb(null, res.data);
    }).catch(function(err) {
      console.log(err);
      cb(err);
    });
  },

  getAllObjects:function(app_module, cb) {
    request.get('/system/getAllObjects/'+app_module).then(function(res) {
      cb(null, res.data);
    }).catch(function(err) {
      console.log(err);
      cb(err);
    });
  },

}
export default app_api;
