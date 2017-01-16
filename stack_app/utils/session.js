/*global window*/

var app_session={
  get:function (key) {
    if(window.app_session){
      return window.app_session[key];
    }
    return null;
  },
  set:function(key, value) {
    if(!window.app_session)
      window.app_session = {};
    window.app_session[key] = value;
  },
  remove:function(key) {
    window.app_session[key] = null;
  },
  getObjectSchema:function(objectName) {
    if(!window.app_session || !window.app_session._object_schema_){
      app_session.set('_object_schema_', {});
    }
    return app_session.get('_object_schema_')[objectName];
  },
  setObjectSchema:function(objectName, schema) {
    if(!window.app_session || !window.app_session._object_schema_){
      app_session.set('_object_schema_', {});
    }
    window.app_session._object_schema_[objectName] = schema;
  }
};
export default app_session;
