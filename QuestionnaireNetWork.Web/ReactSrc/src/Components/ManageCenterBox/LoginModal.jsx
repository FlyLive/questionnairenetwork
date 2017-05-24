import React, { Component } from 'react'
import { render } from 'react-dom'
import { Form, Button, Input, Icon, message } from 'antd'
import $ from 'jquery'
import axios from 'axios'

const FormItem = Form.Item

class LoginModal extends Component {
    handleSubmit(e) {
        e.preventDefault();
        const form = this.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                var account = values.account;
                var password = values.password;
                $.ajax({
                    type: "POST",
                    url: "http://localhost:60842/Get/Token",
                    data: {
                        UserName: account,
                        Password: password,
                        grant_type: 'password'
                    },
                    success: function (data) {
                        var my = JSON.stringify(data);
                        $.cookie('token', my, { path: '/' });
                        axios.defaults.headers.common['Authorization'] = "Bearer " + data.access_token;
                        window.location.href = '/Home/AdminCenter';
                    },
                    error: function (data) {
                        form.setFields({
                            password: {
                                value: "",
                                errors: [new Error('密码错误,请重试!')]
                            }
                        });
                    }
                });
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="login-form" >
                <FormItem>
                    {getFieldDecorator('account', {
                        rules: [{ required: true, message: '请输入账户!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Account" />
                        )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                        )}
                </FormItem>
                <FormItem>
                    <Button onClick={this.handleSubmit.bind(this)} type="primary" htmlType="submit" className="login-form-button">登录</Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(LoginModal);