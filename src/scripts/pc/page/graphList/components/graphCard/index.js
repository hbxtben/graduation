import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Icon, Tooltip, message } from 'antd';
import { observer } from 'mobx-react';

import './index.scss';

const { Meta } = Card;

@withRouter
@observer(['graphStore', 'navStore'])
class GraphCard extends Component {
    constructor(props) {
        super(props);
    }

    openDetail = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        
        const { id, history, navStore } = this.props;
        navStore.changeNav('/graphDetail');
        history.push({
            pathname: '/graphDetail',
            query: { id } 
        })
    }

    delGraph = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        const { id, history, graphStore } = this.props;
        
        graphStore.delList({
            id
        })
        .then((res) => {
            if(res.result === 'success') {
                message.success("删除成功", 2);
                setTimeout(() => {
                    window.location.reload();
                }, 1200);
            } else {
                throw Error("server error");
            }
        })
        .catch(() => {
            message.error("服务器出错，请稍后再试", 2);
        })
    }

    render() {
        const { graphImg, title, intro, extraClass } = this.props;

        return (
            <div className={extraClass} onClick={this.openDetail}>
                <Card
                    style={{ width: 300 }}
                    cover={<img alt="example" src={graphImg} />}
                    actions={[
                        (<Tooltip placement="topLeft" title="编辑" arrowPointAtCenter>
                            <div style={{width:'60px'}} onClick={this.openDetail}>
                                <Icon type="edit" />
                            </div>
                        </Tooltip>), 
                        (<Tooltip placement="topLeft" title="删除" arrowPointAtCenter>
                            <div style={{width:'60px'}} onClick={this.delGraph}>
                                <Icon type="delete" />
                            </div>
                        </Tooltip>)
                    ]}
                >
                    <Meta
                        title={title}
                        description={intro}
                    />
                </Card>
            </div>
        )
    }
}

export default GraphCard;