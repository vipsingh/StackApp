import axios from 'axios';
//base url is on app file
var req_obj={
  get:function(url, params) {
    // var instance = axios.create({
    //   baseURL: 'http://192.168.0.177:4400/api',
    //   timeout: 1000,
    //   headers: {'Accept': 'application/json',
    //     'Content-Type': 'application/json'}
    // });
    return axios.get(url, params);
  },
  post:function(url, params) {
    return axios.post(url, params)
  }
};

export default req_obj;
