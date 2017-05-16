import React, { Component } from 'react';
import { render } from 'react-dom';
import { Form, Icon, Input, Button, Modal } from 'antd'
import $ from 'jquery'
import axios from 'axios'
const FormItem = Form.Item;

class AdminInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { admin: { account: { value: 'Lucy' }, nick: { value: 'nick' } } };
    }
    componentWillMount() {
        $.ajax({
            type: 'get',
            url: 'http://localhost:50979/api/values',
            dataType: 'json',
            success: function (data) {
                this.setState({ admin: data });
            },
            error: function () {
                Modal.error({
                    title: 'Error',
                    content: '错误',
                    width:300,
                });
            }
        });
    }
    isEmpty(e) {
        this.setState({
            admin: {
                account: {
                    value: $("#account").text()
                },
                nick: {
                    value: $("#nick").val()
                }
            }
        });
    }
    handleSubmit(e) {
        var nick = $("#nick").val();
        if (nick == null || nick == "") {

            return false;
        }
        $.ajax({
            type: 'post',
            url: 'http://localhost:50979/api/values',
            data: { "nickName": nick },
            success: function (data) {

            },
            error: function () {
            }
        });
    }

    render() {
        const admin = this.state.admin;
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
            <div className="admin-info">
                <h3>个人资料</h3>
                <Form className="login-form">
                    <FormItem {...formItemLayout} label="账户" >
                        <label id="account" placeholder="账户"> {admin.account.value}</label>
                    </FormItem>
                    <FormItem {...formItemLayout} label="昵称">
                        <Input id="nick" onChange={this.isEmpty.bind(this)} placeholder="昵称" value={admin.nick.value} />
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button onClick={this.handleSubmit.bind(this)} type="primary">确认修改</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(AdminInfo);

export default WrappedNormalLoginForm;