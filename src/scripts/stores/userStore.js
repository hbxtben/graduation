import { observable, action, computed } from 'mobx';
import { userRequest } from '../common/agent';

class UserStore {
    @observable loginTag = false;
    @observable username = '';
    @observable nickname = '';
    @observable loginTip = '';
    
    //登陆
    @action doLogin = (data) => {
        const loginRequest = userRequest.login;
        loginRequest(data)
        .then(res => {
            const resData = res.data;
            if(resData && resData.status === 0) {
                const { username, nickname } = resData.data;

                this.username = username,
                this.nickname = nickname,
                this.loginTag = true; 
                this.loginTip = '';  
            } else {
                throw Error("server error");
            }
        })
        .catch(err => {
            this.loginTip = "账号或者密码错误";
        })
    }

    //登出
    @action doLogout = () => {
        const logoutRequest = userRequest.logout;

        logoutRequest()
        .then(res => {
            const resData = res.data;
            if(resData && resData.status === 0) {
                this.loginTag = false;
                this.loginTip = '';                       
            } else {
                throw Error("server error");
            }
        })
        .catch(err => {
            this.loginTip = "服务器错误，请稍后再试";
        })
    }

    //注册
    @action doSign = (data) => {
        const signinRequest = userRequest.signin;

        signinRequest(data)
        .then(res => {
            const resData = res.data;
            if(resData && resData.status === 0) {
                const { username, nickname } = resData.data;

                this.username = username,
                this.nickname = nickname,
                this.loginTag = true; 
                this.loginTip = '';                      
            } else {
                throw Error("server error");
            }
        })
        .catch(err => {
            this.loginTip = "服务器错误，请稍后再试";
        })
    }

    //判断是否登陆
    @action isLogin = () => {
        const isLoginRequest = userRequest.isLogin;

        isLoginRequest()
        .then(res => {
            const resData = res.data;
            if(resData && resData.status === 0) {
                const { username, nickname } = resData.data;

                this.username = username,
                this.nickname = nickname,
                this.loginTag = true;               
            }
        })
        .catch(err => {
        })
    }
}

const userStore = new UserStore();

export default userStore;