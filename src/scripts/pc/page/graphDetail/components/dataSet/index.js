import React, { Component } from 'react';
import { Button, Icon, message } from 'antd';
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

    onFileAdd = (eve) => {
        const fileObj = eve.target;
        const file = fileObj.files[0];

        if(!file || file.type != 'text/plain') {
            message.error("文件格式错误");
        } else {
            let reader = new FileReader();//新建一个FileReader
            reader.readAsText(file, "UTF-8");//读取文件 
            reader.onload = evt => { //读取完文件之后会回来这里
                let fileString = evt.target.result; // 读取文件内容
                this.props.detailStore.setData(fileString);
            }
        }
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
                <div className='u-data-file'>
                    <Icon type="file" />
                    <input type='file' onChange={this.onFileAdd} />
                    <p>文件上传</p>
                </div>
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