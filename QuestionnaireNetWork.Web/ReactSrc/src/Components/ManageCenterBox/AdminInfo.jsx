import React, { Component } from 'react';
import { render } from 'react-dom';
import { message, Form, Icon, Input, Button, Modal, Tooltip } from 'antd'

import $ from 'jquery'
import axios from 'axios'
const FormItem = Form.Item;

class AdminInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {
                value: 'Lucy'
            },
            nick: {
                value: 'nick'
            },
            mP: {
                visible: false
            },
            mNick: {
                visible: false
            },
            oldP: {
                visible: false
            },
            confirmDirty: false
        };
    }

    componentWillMount() {
        var _this = this;
        // $.ajax({
        //     type: 'get',
        //     url: 'http://localhost:50979/api/Admin/GetAdminInfo',
        //     dataType: 'json',
        //     success: function (data) {
        //         _this.setState({ account: { value: data.Account }, nick: { value: data.Nick } });
        //     },
        //     error: function () {
        //         // window.location.href="index.html";
        //     }
        // });
    }

    isNickEmpty(e) {
        var nickName = e.target.value;
        this.setState({
            nick: { value: nickName }
        });
        if (nickName == "" || /\s+/g.test(nickName)) {
            this.setState({ mNick: { visible: true } })
            return false;
        }
        this.setState({
            mNick: { visible: false }
        });
    }

    handleMInfoSubmit(e) {
        var nick = this.state.nick.value;
        if (nick == "" || /\s+/g.test(nick)) {
            this.setState({ mNick: { visible: true } });
            return false;
        }
        $.ajax({
            type: 'post',
            url: 'http://localhost:50979/api/values',
            data: { "nickName": nick },
            success: function () {
                message.success('修改成功');
            }, error: function () {
                message.error('出错了');
            }
        });
    }

    isOldEmpty(e) {
        var oldP = e.target.value;
        if (oldP == "" || /\s+/g.test(oldP)) {
            this.setState({ oldP: { visible: true } })
            return true;
        }
        this.setState({ oldP: { visible: false } })
    }

    isPasswordCorrect(e) {
        var password = $("#old-password").val();
        if (password == "" || /\s+/g.test(password)) {
            this.setState({ oldP: { visible: true } });
            return false;
        }
        // $.ajax({
        //     type: 'post',
        //     url: 'http://localhost:50979/api/values',
        //     data: { "oldPassword": password },
        //     success: function (data) {
        this.setState({
            mP: { visible: true }
        });
        //     },
        //     error: function () {
        message.error("密码错误！");
        //     }
        // });
    }

    handleMPCancel(e) {
        this.setState({
            mP: { visible: false }
        });
    }

    handleMPSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var fPassword = values.fPassword;
                var sPassword = values.sPassword;

                $.ajax({
                    type: 'post',
                    url: '',
                    data: { "password": fPassword },
                    success: function () {
                        this.handleMPCancel.bind(this);
                        message.success('修改成功');
                    }, error: function () {
                        message.error('出错了');
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
        const state = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                sm: {
                    span: 14,
                    offset: 6,
                },
            }
        };
        const ModalItemLayout = {
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
            <div className="admin-info router">
                <h3>个人资料</h3>
                <Form className="login-form">
                    <FormItem {...formItemLayout} label="账户" >
                        <label id="account" placeholder="账户"> {state.account.value}</label>
                    </FormItem>
                    <FormItem {...formItemLayout} label="昵称">
                        <Tooltip placement="right" title={"昵称不能为空"} visible={state.mNick.visible}>
                            <Input id="nick" onChange={this.isNickEmpty.bind(this)} placeholder="昵称" value={state.nick.value} />
                        </Tooltip>
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button onClick={this.handleMInfoSubmit.bind(this)} type="primary">确认修改</Button>
                    </FormItem>
                </Form>
                <br />
                <Form className="login-form">
                    <FormItem {...formItemLayout} label="旧密码" >
                        <Tooltip placement="right" title={"密码不能为空"} visible={state.oldP.visible}>
                            <Input id="old-password" onChange={this.isOldEmpty.bind(this)} placeholder="旧密码" type="password" />
                        </Tooltip>
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button onClick={this.isPasswordCorrect.bind(this)} type="primary">修改密码</Button>
                    </FormItem>
                </Form>
                <Modal title="修改密码" visible={state.mP.visible} footer={null}
                    onCancel={this.handleMPCancel.bind(this)}>
                    <Form>
                        <FormItem {...ModalItemLayout} label="新密码" hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入新密码!', },
                                { validator: this.checkConfirm.bind(this), }],
                            })(<Input type="password" />)}
                        </FormItem>
                        <FormItem {...ModalItemLayout} label="确认密码" hasFeedback>
                            {getFieldDecorator('confirm', {
                                rules: [{ required: true, message: '请确认密码!', },
                                { validator: this.checkPassword.bind(this), }],
                            })(<Input type="password" onBlur={this.handleConfirmBlur.bind(this)} />)}
                        </FormItem>
                        <FormItem {...formItemLayoutWithOutLabel}>
                            <Button type="primary" onClick={this.handleMPSubmit.bind(this)} size="large">提交</Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(AdminInfo)
