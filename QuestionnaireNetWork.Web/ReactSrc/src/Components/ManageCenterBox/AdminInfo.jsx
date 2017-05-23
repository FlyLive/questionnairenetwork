import React, { Component } from 'react';
import { render } from 'react-dom';
import { message, Form, Icon, Input, Button, Modal, Tooltip } from 'antd'

import ModifyPassword from './ModifyPassword.jsx'

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
            }
        };
    }
    componentWillMount() {
        $.ajax({
            type: 'get',
            url: 'http://localhost:50979/api/values',
            dataType: 'json',
            success: function (data) {
                this.setState({ account: { value: data.Account }, nick: { value: data.Nick } });
            },
            error: function () {
                // Modal.error({
                //     title: 'Error',
                //     content: '错误',
                //     width:300,
                // });
            }
        });
    }
    isEmpty(e) {
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
    handleSubmit(e) {
        var nick = this.state.nick.value;
        if (nick == "" || /\s+/g.test(nick)) {
            this.setState({ mNick: { visible: true } });
            return false;
        }
        $.ajax({
            type: 'post',
            url: 'http://localhost:50979/api/values',
            data: { "nickName": nick },
            success:function(){
                message.success('修改成功');
            },error:function(){
                message.error('出错了');
            }
        });
    }
    isOldEmpty(e) {
        var oldP = e.target.value;
        if (oldP == "" || /\s+/g.test(oldP)) {
            this.setState({ oldP: { visible: true } })
            return false;
        }
        this.setState({ oldP: { visible: false } })
    }
    modifyPassword(e) {
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
    render() {
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
        return (
            <div className="admin-info router">
                <h3>个人资料</h3>
                <Form className="login-form">
                    <FormItem {...formItemLayout} label="账户" >
                        <label id="account" placeholder="账户"> {state.account.value}</label>
                    </FormItem>
                    <FormItem {...formItemLayout} label="昵称">
                        <Tooltip placement="right" title={"昵称不能为空"} visible={state.mNick.visible}>
                            <Input id="nick" onChange={this.isEmpty.bind(this)} placeholder="昵称" value={state.nick.value} />
                        </Tooltip>
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button onClick={this.handleSubmit.bind(this)} type="primary">确认修改</Button>
                    </FormItem>
                </Form>
                <br />
                <Form className="login-form">
                    <FormItem {...formItemLayout} label="旧密码" >
                        <Tooltip placement="right" title={"密码不能为空"} visible={this.state.oldP.visible}>
                            <Input id="old-password" onChange={this.isOldEmpty.bind(this)} placeholder="旧密码" type="password" />
                        </Tooltip>
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button onClick={this.modifyPassword.bind(this)} type="primary">修改密码</Button>
                    </FormItem>
                </Form>
                <Modal title="修改密码" visible={state.mP.visible} footer={null}
                    onCancel={this.handleMPCancel.bind(this)}>
                    <ModifyPassword />
                </Modal>
            </div>
        );
    }
}

export default AdminInfo
