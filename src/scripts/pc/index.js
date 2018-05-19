import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Nav from './page/nav/main';
import Home from './page/home/main';
import GraphList from './page/graphList/main';
import GraphDetail from './page/graphDetail/main';

class PCRoot extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Router>
            <div>
                <Nav/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/graphList" component={GraphList}/>
                    <Route path="/graphDetail" component={GraphDetail}/>                
                </Switch>
                <p style={{
                    height: '30px', 
                    lineHeight: '30px', 
                    fontSize: '12px', 
                    textAlign: 'center',
                    color: '#757575',
                    margin: 0
                    }}>
                    @2018 天津理工大学 张子鹏
                </p>
            </div>
        </Router>);
    }
}

export default PCRoot;