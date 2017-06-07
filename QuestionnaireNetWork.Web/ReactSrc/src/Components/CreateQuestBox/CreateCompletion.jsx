import React, { Component } from 'react'
import { render } from 'react-dom'
import { Form, Switch, Input, Button, Icon, message } from 'antd'
import axios from 'axios'

const FormItem = Form.Item

class CreateCompletion extends Component {
    constructor(props) {
        super(props);
        this.state = { questId: props.questId }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ questId: nextProps.questId })
    }
    handleSubmit(e) {
        e.preventDefault();
        var _this = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var questId = this.state.questId;
                if (questId == undefined) {
                    message.error("出错啦");
                    return false;
                }
                var title = values["title"];

                axios.post('http://localhost:60842/api/Question/CreateCompletion',
                    { QId: questId, Title: title })
                    .then(function (response) {
                        if (response.data) {
                            message.success("创建成功");
                            _this.props.form.resetFields();
                            return true;
                        }
                        message.error("创建失败,可能题数达到上限")
                    })
                    .catch(function () {
                        message.error("出错了")
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
        return (
            <Form>
                <FormItem label="题目名称" {...formItemLayout} wrapperCol={{ span: 10 }}>
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: '请输入题目名称!', whitespace: true }],
                    })(<Input placeholder="题目名称" />)}
                </FormItem>
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="primary" onClick={this.handleSubmit.bind(this)} size="large">提交</Button>
                </FormItem>
            </Form>
        );
    }
}


export default Form.create()(CreateCompletion);