import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { Steps, Icon, message } from 'antd'; 
import { withRouter } from 'react-router-dom';

import ModelPick from '../components/modelPick';
import DataSet from '../components/dataSet';
import { graphDraw, getGraphImg } from '../components/graphDraw';
import OptionPickWithForm from '../components/optionPick';

import './index.scss';

const Step = Steps.Step;

@withRouter
@observer(['detailStore', 'userStore', 'navStore'])
class GraphDetail extends Component {
    constructor(props) {
        super(props);
        
        this.graphWrap = null;
    }

    componentDidMount() {
        const { history, detailStore } = this.props;

        if(history.location.query) {
            const { _id } = history.location.query;
            const { setData, chooseGraphType, changeGraphOptions } = detailStore;

            detailStore.setDetailData({ _id })
            .then((res) => {
                if(res && res.ret) {
                    const data = res.data[0];
                    setData(data.data);
                    chooseGraphType(data.graphType);
                    changeGraphOptions(JSON.parse(data.options));

                    graphDraw({
                        ...detailStore,
                        graphWrap: this.graphWrap
                    });
                } else {
                    throw Error("server error");
                }
            })
            .catch(err => {
                message.error("数据请求出错");
            })
        }
    }

    //运行
    onHandleRun = () => {
        const { detailStore } = this.props; 

        graphDraw({
            ...detailStore,
            graphWrap: this.graphWrap
        })
    }

    //保存
    onHandleSave = () => {
        const { history, detailStore, userStore, navStore } = this.props;
        const { detailData, options, graphType, saveGraphData } = detailStore;
        const { loginTag, username } = userStore;
        const { query } = history.location;

        if(!loginTag) {
            message.error("保存前请先登陆");
            return;
        }
        
        if(detailData !== '[]') {
            let data = null,
                img = null,
                _id = query && query._id || null;

            try {
                data = JSON.parse(toJS(detailData)); //数据
            } catch(e) {
                message.error("输入数据不合法", 2); 
                return;
            }

            img = getGraphImg();
            if(img === "") {
                message.error("保存前请先运行查看效果图", 2);
                return;
            }

            //发送请求
            saveGraphData({
                options: toJS(options),
                graphType: toJS(graphType),
                data,
                img: "http://localhost:9000/test.png",
                username,
                _id
            })
            .then(res => {
                if(res && res.ret) {
                    message.success("保存成功", 2);
                    setTimeout(() => {
                        navStore.changeNav('/graphList');
                        history.push('/graphList');
                    }, 1200);
                } else {
                    throw Error("wrong answer");
                }
            })
            .catch((e) => {
                message.error("网络异常，请稍后再试", 2); 
            })
        } else {
            message.error("请输入数据");
        }
    }

    //不同步骤对应的内容
    getStepData = () => {
        return [{
            title: '导入数据',
            content: (<DataSet 
                        onHandleRun={this.onHandleRun}
                        onHandleSave={this.onHandleSave}/>)
        }, {
            title: '选择模版',
            content: (<ModelPick onHandleRun={this.onHandleRun}/>)
        }, {
            title: '自定义配置',
            content: (<OptionPickWithForm 
                        onHandleRun={this.onHandleRun} 
                        onHandleSave={this.onHandleSave}/>)
        }]
    }

    render() {
        const { detailData, options, step, changeStep, setData } = this.props.detailStore;
        const lStepStyle = step === 0 ? 'u-left' : 'u-left active';
        const rStepStyle = step === 2 ? 'u-right' : 'u-right active';
        
        const stepData = this.getStepData();

        return (
            <div className='m-detail'>
                <div className='m-config m-wrap-item'>
                    <div className='m-steps'>
                        <div className={lStepStyle} onClick={() => {changeStep(step-1)}}>
                            <Icon type="left" />
                        </div>
                        <div className='u-steps'>
                            <Steps current={step} size='small'>
                                {stepData.map(
                                    item => <Step key={item.title} title={item.title} />
                                )}
                            </Steps>
                        </div>
                        <div className={rStepStyle} onClick={() => {changeStep(step+1)}}>
                            <Icon type="right" />
                        </div>
                    </div>
                    <div className='m-steps-content'>
                        {stepData[step] && stepData[step].content}
                    </div>
                </div>
                <div className='m-graph m-wrap-item'>
                    <div id='graphWrap' className='graph-wrap' ref={wrap => {this.graphWrap = wrap}}>
                            <span className='graph-text-tip'>图表展示</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default GraphDetail;