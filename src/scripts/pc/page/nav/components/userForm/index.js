import React, { Component } from 'react';
import Divider, { Modal, Form, Icon, Input } from 'antd';
import validRules from './validRules';

import './index.scss';

const FormItem = Form.Item;

const UserCreateForm = Form.create()(
    class UserForm extends Component {
        constructor(props) {
            super(props);
        }

        getContent = () => {
            const { visible, onCancel, onCreate, form, formType, changeToAnother } = this.props;
            const { getFieldDecorator } = form;

            let content = null;

            if(formType === 'login') {
                content = (
                    <Modal
                        visible={visible}
                        title="登陆"
                        okText="确定"
                        onCancel={onCancel}
                        onOk={onCreate}
                    >
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                {getFieldDecorator('username', { rules: validRules.username })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', { rules: validRules.password })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                )}
                            </FormItem>
                        </Form>
                        <a href="javascript:;" onClick={() => changeToAnother("signin")}>我要注册</a>
                    </Modal>
                )
            } else {
                content = (
                    <Modal
                        visible={visible}
                        title="注册"
                        okText="确定"
                        onCancel={onCancel}
                        onOk={onCreate}
                    >
                        <Form onSubmit={this.handleSubmit} className="signin-form">
                            <FormItem>
                                {getFieldDecorator('nickname', { rules: validRules.nickname })(
                                    <Input prefix={<Icon type="smile-o" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('username', { rules: validRules.username })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', { rules: validRules.password })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                )}
                            </FormItem>
                            <a href="javascript:;" onClick={() => changeToAnother("login")}>我要登陆</a>                            
                        </Form>
                    </Modal>
                )
            }

            return content;
        }
    
        render() {
            return (
                <div>
                    {this.getContent()}
                </div>
            )
        }
    }
)

export default UserCreateForm;