import React, { Component } from 'react'
import { render } from 'react-dom'
import { Form, Switch, Input, Button, Icon, InputNumber } from 'antd'

const FormItem = Form.Item

class CreateQuest extends Component {
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var title = values["title"];
                var maxNum = values["num"];

                $.ajax({
                    type: 'post',
                    url: '',
                    data: {title:title,maxNum:maxNum},
                    success: function () {
                        message.success('创建成功');
                    }, error: function () {
                        message.error('出错了');
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
        return (
            <div className="create-quest router">
                <Form>
                    <h3>新建问卷</h3>
                    <br />
                    <FormItem label="题目名称" {...formItemLayout} wrapperCol={{ span: 10 }}>
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入问卷名称!', whitespace: true }],
                        })(<Input placeholder="问卷名称" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="最大题目数" >
                        {getFieldDecorator('maxNum')(<InputNumber min={1} max={30} placeholder="1~30" />)}
                        <span className="ant-form-text">个题目</span>
                    </FormItem>
                    <FormItem {...formItemLayoutWithOutLabel}>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)} size="large">新建问卷</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Form.create()(CreateQuest);