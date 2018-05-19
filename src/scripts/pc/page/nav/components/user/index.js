import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Icon, Avatar } from 'antd';
import { withRouter } from 'react-router-dom';
import UserCreateForm from '../userForm';

import './index.scss';

//模块类型
const LOGIN = "login";  
const SIGNIN = "signin";

@withRouter
@observer(['userStore', 'navStore'])
class User extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            showModal: false,
            formType: ''
        }
    }

    //展示表单模块
    showModal = (formType) => {
        this.setState({ 
            showModal: true,
            formType
        });
    }

    //隐藏表单模块
    handleCancle = () => {
        this.setState({ showModal: false });
    }

    //提交处理
    handleSubmit = () => {
        const form = this.formRef.props.form;
        let validFileds = [],
            cb = null; //表单的回调函数

        if(this.state.formType === LOGIN) {
            validFileds = ['username', 'password'];
            cb = this.login;
        } else {
            validFileds = ['username', 'password', 'nickname'];
            cb = this.signin;
        }

        form.validateFields(validFileds, (err, values) => {
            if (err) {
                return;
            }
    
            form.resetFields();
            this.setState({ showModal: false });
            
            cb && cb(values); 
        });
    }

    //保存modal节点
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    //登陆执行
    login = (values) => {
        const { doLogin } = this.props.userStore;
        doLogin(values);
    }

    //退出
    logout = () => {
        const { userStore, navStore } = this.props;

        userStore.doLogout();
        
        navStore.changeNav('/');
        this.props.history.push('/'); //退出登陆，默认返回首页
    }

    //注册执行
    signin = (values) => {
        const { doSign } = this.props.userStore;
        doSign(values);      
    }

    //从当前框跳转到其他框
    changeToAnother = (type) => {
        this.showModal(type || LOGIN);
    }

    //根据当前用户登陆状态展示界面
    getContent = () => {
        const { loginTag, nickname, doLogin } = this.props.userStore;
        let content = null;
        
        if(loginTag) {
            content = (
                <div>
                    <Avatar size='small' icon="user" />
                    <span style={{marginLeft: '5px'}}>{nickname}</span>
                    <span className='u-split-line'>/</span>
                    <a onClick={this.logout}>
                        <Icon type="logout"/>
                        <span className='icon-text'>退出</span>
                    </a>
                </div>
            )
        } else {
            content = (
                <div>
                    <a onClick={() => this.showModal(LOGIN)} >
                        <Icon type="login"/>                        
                        <span className='icon-text'>登陆</span>
                    </a>
                    <span className='u-split-line'>/</span>
                    <a onClick={() => this.showModal(SIGNIN)}>
                        <Icon type="user-add" />
                        <span className='icon-text'>注册</span>
                    </a>
                </div>
            )
        }

        return content
    }

    render() {
        return (
            <div className='m-nav-right'>
                <div className='user-info'>
                    {this.getContent()}
                    <UserCreateForm
                        changeToAnother={this.changeToAnother}
                        wrappedComponentRef={this.saveFormRef}
                        formType={this.state.formType}
                        visible={this.state.showModal}
                        onCancel={this.handleCancle}
                        onCreate={this.handleSubmit}
                    />
                </div>
            </div>
        )
    }
}

export default User;