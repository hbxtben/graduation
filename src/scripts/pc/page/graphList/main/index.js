import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import GraphCard from '../components/graphCard';
import { Pagination } from 'antd';

import './index.scss';

const pageSize = 9; //一页展示的数目

@observer(['graphStore'])
class GraphList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { getList, curPage } = this.props.graphStore;
        
        getList({
            pageNum: curPage,
            pageSize
        }); //获取数据
    }

    //分页的点击处理
    handlePageChange = (pageNumber) => {
        const { changePage, getList } = this.props.graphStore;

        changePage(pageNumber);
        getList({
            pageNum: pageNumber,
            pageSize
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
            content = (
                <div>
                    <div className='m-list-wrap'>
                        {list.map((item) => {
                            return (
                                <GraphCard extraClass='m-graph-card' {...item} key={item.id}/>                        
                            )
                        })}
                    </div>
                    <div className='m-paginate'>
                        <Pagination 
                            current={curPage} 
                            total={dataSize}
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