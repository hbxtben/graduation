import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import GraphCard from '../components/graphCard';
import { Pagination } from 'antd';
import { withRouter } from 'react-router-dom';

import './index.scss';

const pageSize = 9; //一页展示的数目

@withRouter
@observer(['graphStore', 'userStore', 'navStore'])
class GraphList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { history, graphStore, userStore, navStore } = this.props;
        const { getList, curPage } = graphStore;
        const { username, loginTag } = userStore; 

        if(!loginTag) {
            navStore.changeNav('/');
            history.push('/');
        }
        
        getList({
            pageNum: curPage,
            pageSize,
            username
        }); //获取数据
    }

    //分页的点击处理
    handlePageChange = (pageNumber) => {
        const { graphStore, userStore } = this.props;
        const { changePage, getList } = graphStore;
        const { username } = userStore;

        changePage(pageNumber);
        getList({
            pageNum: pageNumber,
            pageSize,
            username
        });
    }

    getContent = () => {
        const { list, dataSize, errorTip, curPage } = this.props.graphStore;
        let content = null;

        if(errorTip || list === []) {
            content = (
                <p className='m-error-text'>
                    {errorTip}
                </p>
            )    
        } else {
            const height = 460 * Math.ceil(list.length / 3);
            content = (
                <div>
                    <div className='m-list-wrap' style={{height: `${height}px`}}>
                        {list.map((item) => {
                            return (
                                <GraphCard extraClass='m-graph-card' {...item} key={item._id}/>                        
                            )
                        })}
                    </div>
                    <div className='m-paginate'>
                        <Pagination 
                            current={curPage} 
                            total={dataSize}
                            defaultPageSize={pageSize}
                            onChange={this.handlePageChange} 
                            hideOnSinglePage={true}
                        />
                    </div>
                </div>
            )
        }

        return content;
    }

    render() {
        return (
            <div className='m-list'>
                {this.getContent()}
            </div>
        );
    }
}

export default GraphList;