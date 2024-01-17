// import axios from "axios";
// function http(){
//     return axios({
//       url: "https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=70052",
//       headers: {
//         "X-Client-Info":
//           '{"a":"3000","ch":"1002","v":"5.2.1","e":"16630926242091936835960833","bc":"110100"}',
//         "X-Host": "mall.film-ticket.film.list",
//       },
//     });
// }
// export default http

import { Toast } from "vant";
import axios from "axios";

function createHttp(config, isShowLoading = true) {
  let http = axios.create({
    baseURL: 'https://m.maizuo.com',
    timeout: 10000,
    headers: {
      "X-Client-Info":
        '{"a":"3000","ch":"1002","v":"5.2.1","e":"16630926242091936835960833","bc":"110100"}'
    }
  })
  http.interceptors.request.use(function (config) {
    if (isShowLoading === true)
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    // console.log(showLoading);
    // 发送请求前 config 记录了我们写的一些配置信息
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
  http.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    // response为我们发送请求后回应的内容   

    Toast.clear()
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    Toast.clear()
    return Promise.reject(error);
  });
  return http(config)
}


export default createHttp
