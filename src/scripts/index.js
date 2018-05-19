import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import PCRoot from './pc/index';

import userStore from './stores/userStore';
import navStore from './stores/navStore';
import graphStore from './stores/graphStore';
import detailStore from './stores/detailStore';

const stores = {
    userStore,
    navStore,
    graphStore,
    detailStore
}

ReactDOM.render(
    <Provider {...stores}>
        <PCRoot/>
    </Provider>, 
    document.getElementById("app")
);