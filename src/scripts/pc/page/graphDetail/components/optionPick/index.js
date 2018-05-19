import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Form,Input, Tooltip, Button } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

import './index.scss';

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
};

@observer(['detailStore'])
class OptionPick extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        const { validateFields, onHandleRun, detailStore } = this.props;
        const { changeGraphOptions } = detailStore;

        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
    
            changeGraphOptions({
                title: {
                    x: 'center',
                    ...values
                }
            })
            onHandleRun();
        });  
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { options } = this.props.detailStore;

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="text"
                    >
                        {getFieldDecorator('text', {
                            rules: [{
                                max: 20, message: '标题长度不要超过15个字符',
                            }, {
                                required: true, message: '请输入标题',
                            }],
                            initialValue: options.title.text
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="subtext"
                    >
                        {getFieldDecorator('subtext', {
                            rules: [{
                                max: 50, message: '描述不要超过50个字',
                            }],
                            initialValue: options.title.subtext
                        })(
                            <TextArea/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button onClick={this.props.onHandleSave}>保存</Button>
                        <span style={{marginRight: '8px'}}></span>
                        <Button type="primary" htmlType="submit">运行</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const OptionPickWithForm = Form.create()(OptionPick);

export default OptionPickWithForm;