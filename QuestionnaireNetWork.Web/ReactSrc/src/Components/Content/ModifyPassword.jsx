import React, { Component } from 'react'
import { render } from 'react-dom'
import { Form, Switch, Input, Button, Icon } from 'antd'

const FormItem = Form.Item

class ModifyPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var fPassword = values["fPassword"];
                var sPassword = values["sPassword"];

                $.ajax({
                    type: 'post',
                    url: '',
                    data: { "password": fPassword },
                    success: function () {

                    },
                    error: function () {

                    }
                });
            }
        });
    }
    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码不一致!');
        } else {
            callback();
        }
    }
    checkConfirm(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        };

        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        return (
            <Form>
                <FormItem {...formItemLayout} label="新密码" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入新密码!', },
                        { validator: this.checkConfirm.bind(this), }],
                    })(<Input type="password" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="确认密码" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [{ required: true, message: '请确认密码!', },
                        { validator: this.checkPassword.bind(this), }],
                    })(<Input type="password" onBlur={this.handleConfirmBlur.bind(this)} />)}
                </FormItem>
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="primary" onClick={this.handleSubmit.bind(this)} size="large">提交</Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(ModifyPassword);