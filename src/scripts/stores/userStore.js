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
        
        return loginRequest(data)
        .then(res => {
            const resData = res.data;
            if(resData && resData.ret) {
                const { username, nickname } = resData.data;

                this.username = username,
                this.nickname = nickname,
                this.loginTag = true; 
                this.loginTip = '';  
                
                //设置lcoalstorage
                localStorage.setItem("username", username);
                localStorage.setItem("nickname", nickname);
            } else {
                throw Error("server error");
            }
        });
    }

    //登出
    @action doLogout = () => {
        const logoutRequest = userRequest.logout;

        //清楚localstorage中的用户信息
        localStorage.removeItem("username");
        localStorage.removeItem("nickname");
        this.loginTag = false;
        this.loginTip = '';   
    }

    //注册
    @action doSign = (data) => {
        const signinRequest = userRequest.signin;

        return signinRequest(data)
                .then(res => {
                    const resData = res.data;
                    if(resData && resData.ret) {
                        const { username, nickname } = resData.data;

                        this.username = username,
                        this.nickname = nickname,
                        this.loginTag = true; 
                        this.loginTip = ''; 
                        
                        //设置localstorage保存用户信息
                        localStorage.setItem("username", username);
                        localStorage.setItem("nickname", nickname);
                    } else {
                        throw Error("server error");
                    }
                })
    }

    //判断是否登陆
    @action isLogin = () => {
        const username = localStorage.getItem("username");
        const nickname = localStorage.getItem("nickname");

        if(username && nickname) {
            this.username = username;
            this.nickname = nickname;
            this.loginTag = true;
            this.loginTip = '';
        }
    }
}

const userStore = new UserStore();

export default userStore;