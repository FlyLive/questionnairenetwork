import React, { Component } from 'react'
import { render } from 'react-dom'
import { Form, Switch, Input, Button, Icon, message } from 'antd'
import axios from 'axios'

const FormItem = Form.Item

let uuid = 1;
class CreateChoice extends Component {
    constructor(props) {
        super(props);
        this.state = { questId: props.questId }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ questId: nextProps.questId })
    }

    remove(k) {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add(e) {
        uuid++;
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var questId = this.state.questId;
                if (questId == undefined) {
                    message.error("出错啦");
                    return false;
                }
                var title = values["title"];
                var type = values["switch"] == true ? true : false;

                var options = new Array();
                const { form } = this.props;
                const keys = form.getFieldValue('keys');
                if (keys.length <= 0) {
                    message.error("请至少添加一个选项");
                    return false;
                }
                keys.filter(key => options.push(values["names-" + key]));
                var token = $.cookie('token');
                var mytoken = JSON.parse(token);
                $.ajax({
                    type: 'post',
                    url: 'http://localhost:60842/api/Question/CreateChoiceQuestion',
                    headers: { Authorization: "Bearer " + mytoken.access_token },
                    contentType: 'application/json',
                    data: JSON.stringify({ QId: questId, ChoiceTitle: title, Type: type, Options: options }),
                    success: function (data) {
                        if (data) {
                            message.success("创建成功");
                            return true;
                        }
                        message.error("创建失败,可能题数达到上限")
                    },
                    error: function (error) {
                        message.error("出错了")
                    }
                })
            }
        });
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
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <FormItem {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel) }
                    label={index === 0 ? '选项' : ''} required={false} key={k}>
                    {getFieldDecorator(`names-${k}`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{ required: true, whitespace: true, message: "请输入选项内容或删除该选项.", }],
                    })(<Input placeholder="选项内容" style={{ width: '60%', marginRight: 8 }} />)}
                    <Icon className="dynamic-delete-button" type="minus-circle-o"
                        disabled={keys.length === 1} onClick={() => this.remove(k)} />
                </FormItem>
            );
        });
        return (
            <Form>
                <FormItem label="题目名称" {...formItemLayout} wrapperCol={{ span: 10 }}>
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: '请输入题目名称!', whitespace: true }],
                    })(<Input placeholder="题目名称" />)}
                </FormItem>
                <FormItem label="多选题" {...formItemLayout}>
                    {getFieldDecorator('switch', {
                        rules: [{ required: false, }],
                    })(<Switch />)}
                </FormItem>
                {formItems}
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add.bind(this)} style={{ width: '60%' }}>
                        <Icon type="plus" />添加选项
                    </Button>
                </FormItem>
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="primary" onClick={this.handleSubmit.bind(this)} size="large">提交</Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(CreateChoice);