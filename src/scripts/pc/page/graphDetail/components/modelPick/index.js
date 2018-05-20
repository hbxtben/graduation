import React, { Component } from 'react';
import { observer } from 'mobx-react';
import config from '$common/config';
import api from '$common/api';
import { Card } from 'antd';
import { graphDraw } from '../graphDraw';

import './index.scss';

const { Meta } = Card;

const imgPre = config.localFS;
const typeList = [{
    name: '饼图',
    img: api.typeImg.pie,
    type: 'pie'
}, {
    name: '条形图',
    img: api.typeImg.bar,
    type: 'bar'
}, {
    name: '折线图',
    img: api.typeImg.line,
    type: 'line'
}, {
    name: '散点图',
    img: api.typeImg.scatter,
    type: 'scatter'
}, {
    name: '漏斗图',
    img: api.typeImg.funnel,
    type: 'funnel'
}]

@observer(['detailStore'])
class ModelPick extends Component {
    constructor(props) {
        super(props);
    }

    onHandleChoose = type => {
        const { detailStore, onHandleRun } = this.props;
        
        detailStore.chooseGraphType(type);

        onHandleRun();
    }

    render() {
        return (
            <div className='m-model-pick'>
                {typeList.map(item => {
                    return (
                        <div key={item.type} onClick={() => {this.onHandleChoose(item.type)}}>
                            <Card
                                hoverable
                                style={{ width: 170 }}
                                cover={<img alt="example" src={`${config.localFS}${item.img}`} />}
                            >
                                <Meta
                                    title={item.name}
                                />
                            </Card>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ModelPick;