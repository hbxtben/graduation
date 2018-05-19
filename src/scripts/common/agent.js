import axios from 'axios';
import API from './api';
import config from './config';

axios.defaults.baseURL = config.mockS;  //配置默认路径前缀

axios.defaults.headers.post['Content-Type'] = 'application/json'; //发送格式

const { userApi, graphApi } = API;

//用户相关的请求
export const userRequest = {
    login: (data) => {
        return axios.post(userApi.login, {...data});
    },
            
    logout: () => {
        return axios.get(userApi.logout);
    },

    isLogin: () => {
        return axios.get(userApi.isLogin);
    },

    signin: (data) => {
        return axios.post(userApi.signin, {...data})
    }
}

export const graphRequest = {
    getGraphList: (data) => {
        return axios.get(graphApi.getGraphList, { params: {...data}});
    },

    delGraphItem: (data) => {
        return axios.get(graphApi.delGraphItem, { params: {...data}});
    },

    getGraphDetail: (data) => {
        return axios.get(graphApi.getGraphDetail, { params: {...data}});
    },

    saveGraphData: (data) => {
        return axios.post(graphApi.saveGraphData, {params: {...data}})
    }
}