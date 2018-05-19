import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';

import './index.scss';

@withRouter
@observer(['navStore'])
class Home extends Component {
    constructor(props) {
        super(props);
    }

    onHandleJump = () => {
        const { navStore, history } = this.props;
        navStore.changeNav("/graphDetail");
        history.push("/graphDetail");
    }

    render() {
        return (
            <div>
                <div className='m-intro'>
                    <div className='m-intro-text'>
                        <h1>Graph Depot</h1>
                        <p>
                            一个存储可视化图表的仓库。基于『确定』和『自然』的设计价值观和模块化的解决方案，让设计者专注于更好的用户体验。
                        </p>
                        <div className='m-btn-wrap'>
                            <Button onClick={this.onHandleJump} type="primary">开始使用</Button>
                        </div>
                    </div>
                    <div className="m-circle">
                        <div id="graph">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className="m-svg-wrap" data-block-selector="div:nth-child(1)>div:nth-child(1)>div:nth-child(2)>div:nth-child(4)>div:nth-child(1)">
                        <svg width="1190px" height="500px" viewBox="0 0 1440 557" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g style={{transform: 'translate(80px, -58.4095px)'}}><circle id="Oval-8" stroke="#13C2C2" cx="530" cy="195" r="5"></circle></g>
                            <g style={{transform: 'translate(100px, 210.0373px)'}}><circle id="Oval-8" stroke="#13C2C2" cx="530" cy="195" r="6"></circle></g>
                            <g style={{transform: 'translate(300px, 130.8501px)'}}><circle id="Oval-8" stroke="#13C2C2" cx="530" cy="195" r="5"></circle></g>
                            <g style={{transform: 'translate(-300px, 208.8501px)'}}><circle id="Oval-8" stroke="#13C2C2" cx="530" cy="195" r="10"></circle></g>
                            <g style={{transform: 'translate(418px, 180.8501px)'}}><circle id="Oval-8" stroke="#13C2C2" cx="530" cy="195" r="5"></circle></g>
                            <g style={{transform: 'translate(410px, 31.156px)'}}><circle id="Oval-8" fillOpacity="0.4" fill="#9EE6E6" cx="606" cy="76" r="5"></circle></g>
                            <g style={{transform: 'translate(230px, -39.727px)'}}><circle id="Oval-8" fillOpacity="0.4" fill="#9EE6E6" cx="606" cy="76" r="4"></circle></g>
                        </svg>
                    </div>
                </div> 
                <div className='m-tech'>
                    <h2 className='tect-title'>设计语言</h2>
                    <div className="base">
                        <section className="model-1">
                            <div className="graph">HTML5</div><span tooltip="70%" className="tooltip">HTML5</span>
                        </section>
                        <section className="model-2">
                            <div className="graph">CSS3</div><span tooltip="60%" className="tooltip">CSS3</span>
                        </section>
                        <section className="model-3">
                            <div className="multi-graph">javaScript
                                <div data-name="react" className="graph react"> </div>
                                <div data-name="javaScript" className="graph javaScript"></div>
                            </div>
                        </section>
                    </div>
                </div>   
            </div>
        );
    }
}

export default Home;