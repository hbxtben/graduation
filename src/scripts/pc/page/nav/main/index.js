import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Menu, Icon } from 'antd';

import User from '../components/user';

import './index.scss';

@withRouter
@observer(['userStore', 'navStore'])
class Nav extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { navStore } = this.props;

        navStore.changeNav(this.props.location.pathname || '/');
    }

    componentDidMount() {
        const { isLogin } = this.props.userStore;
        
        isLogin(); //判断是否一直登陆着呢
    }

    //处理路由跳转
    handleNavChange = (path) => {
        const { navStore, history } = this.props;
        
        navStore.changeNav(path || '/');
        history.push(path || '/');
    }
    
    render() {
        const { loginTag } = this.props.userStore;
        const { curNav } = this.props.navStore;

        return (
            <div className='m-nav'>
                <div className='m-nav-content'>
                    <div>
                        <div className='u-nav-title'>
                            <Icon 
                                type="area-chart" 
                                style={{color: '#1890ff'}}/>
                            <span>Graph Depot</span>
                        </div>
                        <Menu
                            selectedKeys={[curNav]}
                            mode="horizontal"
                            style={{height: '50px', border:0}}
                        >
                            <Menu.Item key="/">
                                <a onClick={() => this.handleNavChange('/')}>首页</a>
                            </Menu.Item>
                            {
                                loginTag ? 
                                <Menu.Item key="/graphList">
                                    <a onClick={() => this.handleNavChange('/graphList')}>我的图表</a>
                                </Menu.Item> : 
                                null
                            }
                            <Menu.Item key="/graphDetail">
                                <a onClick={() => this.handleNavChange('/graphDetail')}>创建图表</a>
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div>
                        <User/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Nav;