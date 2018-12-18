import axios from 'axios';
import qs from 'qs';
import Cookies from "js-cookie";
import storageTools from './storageTools';

export default {
  /**
   * 网络请求
   * @param {any} method 请求方式 get,post,delete,put,patch
   * @param {any} url 接口地址
   * @param {any} [params={}] 接口参数
   * @param {any} config 其他配置
   * @returns Promise
   */
  request(vm, method, url, params = {}, config) {
    let newParams = {};
    for (let key in params) {
      if (params[key] !== '') {
        newParams[key] = params[key];
      }
    }
    let data = qs.stringify(newParams);
    const date = new Date();
    const channelDate = date.getFullYear() + (date.getMonth() + 1) + date.getDate();
    const channelTime = date.getHours() + date.getMinutes() + date.getSeconds();
    const transId = `AT${Date.now()}`;
    const type = 'K';
    let axiosConfig = {
      method: method,
      // 生产环境
      // url: url,
      data: data,
      headers: {
        // Authorization: storageTools.get('Authorization'),
        type: type,
        encry: '0',
        channel: 'AT',
        transId: transId,
        channelFlow: transId,
        transCode: url.replace(/(.*\/)*([^.]+).*/ig, '$2'),
        channelDate: channelDate,
        channelTime: channelTime,
        iCID: Cookies.get('iCID') || '',
        eCID: Cookies.get('eCID') || '',
        'Accept': 'application/json',
        'Content-Type': type === 'K' ? 'application/x-www-form-urlencoded;charset=utf-8' : 'application/json;charset=utf-8'
      }
    };
    return new Promise(function (resolve, reject) {
      axios.request(axiosConfig).then(function (response) {
        console.log(method + ':' + url, newParams, response.data);
        if (response.data.code == "RSK10990002") {
          Cookies.set('login_status', "");
          storageTools.set('Authorization', '');
          vm.$Modal.warning({
            title: "提醒",
            content: "由于您长时间未操作，已自动退出，请重新登录！"
          });
          vm.$router.push({ path: "/login" });
        } else {
          resolve(response);
        }
      }).catch(function (error) {
        reject(error);
      });
    });
  }
};
