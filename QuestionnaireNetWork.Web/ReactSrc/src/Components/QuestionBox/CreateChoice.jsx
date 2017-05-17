import React, { Component } from 'react'
import { render } from 'react-dom'
import { Form, Switch, Input, Button, Icon } from 'antd'

const FormItem = Form.Item

let uuid = 1;
class CreateChoice extends Component {
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
                var title = values["title"];
                var type = values["switch"] == true ? true : false;

                var options = new Array();
                const { form } = this.props;
                const keys = form.getFieldValue('keys');
                keys.filter(key => options.push(values["names-" + key]));

                $.ajax({
                    type: 'post',
                    url: '',
                    data: {},
                    success: function () {

                    },
                    error: function () {

                    }
                });
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