import axios from 'axios';
/*第一层if判断生产环境和开发环境*/
if (process.env.NODE_ENV === 'production') {
  /*第二层if，根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境*/
  if (process.env.VUE_APP_FLAG === 'pro') {
    //production 生产环境
    axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5f51be3522b6925fcfc5db2f/api'; //路径
  } else {
    //test 测试环境
    axios.defaults.baseURL = 'http://54.222.148.146:47000/common_service'; //路径
  }
} else { //dev 开发环境 axios.defaults.baseURL = 'http://192.168.0.152:8102';//路径
  axios.defaults.baseURL = 'http://54.222.148.146:47000/common_service';
}

export function _mylist(data){
    return axios.post('/pay_records',data);
}