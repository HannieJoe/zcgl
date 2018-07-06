import Vue from "vue";
import axios from 'axios';
import iView from "iview";

// 环境默认指向开发环境
const env = process.env.NODE_ENV || "development";
if (env === 'production') {
    axios.defaults.baseURL = "http://192.168.0.227/cgi-bin/";
} else {
    axios.defaults.baseURL = "/api/";
}
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

const $http = (url) => {
    return new Promise((reslove, reject) => {
        axios({
            method: "get",
            url: url
        }).then(res => {
            reslove(res.data);
        }).catch(error => {
            if (error.response) {
                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                let status = error.response.status;
                iView.Notice.error({
                    title: '服务器提示',
                    desc: `<h3>${status}</h3>`,
                    duration: 10
                });
            } else {
                // Something happened in setting up the request that triggered an Error
            }
            reject(error);
        });
    })
};

Vue.prototype.$http = $http;

export default $http;
