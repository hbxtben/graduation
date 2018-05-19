import React, { Component } from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react';

import './index.scss';

@observer(['detailStore'])
class DataSet extends Component {
    constructor(props) {
        super(props);

        this.textarea = null;
    }

    chooseExample = (type) => {
        const { showExample } = this.props.detailStore;

        showExample(type || 'single');
    }

    render() {
        const { onHandleRun } = this.props;
        const { detailData, setData } = this.props.detailStore; 

        return (
            <div className='m-data-set'>
                <textarea 
                    ref={(textarea) => {this.textarea = textarea}}
                    className='u-data-wrap' 
                    value={detailData}
                    onChange={() => {setData(this.textarea.value)}}>
                </textarea>
                <div className='m-control'>
                    <div className='u-example'>
                        <b>示例数据</b>
                        <div>
                            <a onClick={() => {this.chooseExample('single')}}>单数据列分类数据</a>                            
                        </div>
                        <div>
                            <a onClick={() => {this.chooseExample('more')}}>多个数据列分类数据</a>
                        </div>
                    </div>
                    <div className='u-button'>
                        <Button onClick={this.props.onHandleSave}>保存</Button>
                        <span style={{marginRight: '8px'}}></span>
                        <Button onClick={onHandleRun} 
                                type="primary">
                                运行
                        </Button>
                    </div>
                </div>  
            </div>
        )
    }
}

export default DataSet;