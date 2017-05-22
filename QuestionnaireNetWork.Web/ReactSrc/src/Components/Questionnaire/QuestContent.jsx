import React, { Component } from 'react'
import { render } from 'react-dom'
import { Radio, Checkbox, Row, Col, Input, Form, Button } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group
const radio = [
    {
        ChoiceId: 1, Title: "选择题", Type: false, Option: [
            { OptionId: 1, OptionContent: "选项" },
            { OptionId: 2, OptionContent: "选项" },
            { OptionId: 3, OptionContent: "选项" },
            { OptionId: 4, OptionContent: "选项" },
        ]
    }, {
        ChoiceId: 2, Title: "选择题", Type: false, Option: [
            { OptionId: 1, OptionContent: "选项" },
            { OptionId: 2, OptionContent: "选项" },
            { OptionId: 3, OptionContent: "选项" },
        ]
    }, {
        ChoiceId: 3, Title: "选择题", Type: false, Option: [
            { OptionId: 1, OptionContent: "选项" },
            { OptionId: 2, OptionContent: "选项" },
            { OptionId: 3, OptionContent: "选项" },
        ]
    }, {
        ChoiceId: 4, Title: "选择题", Type: false, Option: [
            { OptionId: 1, OptionContent: "选项" },
            { OptionId: 2, OptionContent: "选项" },
            { OptionId: 3, OptionContent: "选项" },
        ]
    },
]
const checkbox = [
    {
        ChoiceId: 1, Title: "选择题", Type: true, Option: [
            { OptionId: 1, OptionContent: "选项" },
            { OptionId: 2, OptionContent: "选项" },
            { OptionId: 3, OptionContent: "选项" },
            { OptionId: 4, OptionContent: "选项" },
        ]
    }, {
        ChoiceId: 2, Title: "选择题", Type: true, Option: [
            { OptionId: 1, OptionContent: "选项" },
            { OptionId: 2, OptionContent: "选项" },
            { OptionId: 3, OptionContent: "选项" },
            { OptionId: 4, OptionContent: "选项" },
            { OptionId: 5, OptionContent: "选项" },
        ]
    }, {
        ChoiceId: 3, Title: "选择题", Type: true, Option: [
            { OptionId: 1, OptionContent: "选项" },
            { OptionId: 2, OptionContent: "选项" },
            { OptionId: 3, OptionContent: "选项" },
            { OptionId: 4, OptionContent: "选项" },
            { OptionId: 5, OptionContent: "选项" },
        ]
    },
]
const completion = [
    { CompletionId: 1, Title: "简答题" },
    { CompletionId: 2, Title: "简答题" },
]

class QuestContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radio: [],
            checkbox: [],
            completion: [],
        }
    }

    componentWillMount() {
        // $.ajax({
        //     type: 'get',
        //     url: '',
        //     data: {},
        //     success: function (data) {

        //     }, error: function () {
        //         window.location.href=""
        //     }
        // })
        this.setState({
            radio: radio,
            checkbox: checkbox,
            completion: completion
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleReset(e) {
        this.props.form.resetFields();
    }

    optionContent(choice) {
        const { getFieldDecorator } = this.props.form;
        return (
            choice.Type ? (<FormItem>
                {getFieldDecorator('radio-group-' + (choice.ChoiceId + this.state.radio.length), {
                    rules: [
                        { required: true, message: '请将所有题做完!' },
                    ],
                })(<CheckboxGroup>
                    <Row gutter={5}>
                        {choice.Option.map(option => <Col key={option.OptionId} span={8}><Checkbox className="checkbox-input" value={option.OptionId}>{option.OptionContent}</Checkbox></Col>)}
                    </Row>
                </CheckboxGroup>)}
            </FormItem>
            ) : (<FormItem>
                {getFieldDecorator('radio-group-' + choice.ChoiceId, {
                    rules: [
                        { required: true, message: '请将所有题做完!' },
                    ],
                })(<RadioGroup>
                    {choice.Option.map(option => <Radio className="radio-input" key={option.OptionId} value={option.OptionId}>{option.OptionContent}</Radio>)}
                </RadioGroup>
                    )}
            </FormItem>)
        )
    }

    choiceContent(index, choice) {
        const { getFieldDecorator } = this.props.form;
        return (
            choice.Type ? (<li key={"checkbox" + choice.ChoiceId}>
                <p className="choice-title">{(index + 1 + this.state.radio.length) + "、" + choice.Title}&emsp;{"(可多选)"}</p>
                {this.optionContent(choice)}
            </li>) : (<li key={"radio" + choice.ChoiceId}>
                <p className="choice-title">{(index + 1) + "、" + choice.Title}&emsp;{"(单选)"}</p>
                {this.optionContent(choice)}
            </li>)
        )
    }

    completionContent(index, completion) {
        const { getFieldDecorator } = this.props.form;
        const currentIndex = index + 1 + this.state.radio.length + this.state.checkbox.length;
        return (
            <li key={"completion" + completion.CompletionId}>
                <p className="choice-title">{currentIndex + "、" + completion.Title}</p>
                <FormItem>{getFieldDecorator('radio-group-' + currentIndex, {
                    rules: [
                        { required: true, message: '请将所有题做完!' },
                    ],
                })(
                    <Input className="completion-input" type="textarea" placeholder="请根据题目发表您的意见" autosize={{ minRows: 3, maxRows: 6 }} />
                    )}
                </FormItem>
            </li>
        )
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const radioList = (this.state.radio.map((radio, index, array) => this.choiceContent(index, radio)))
        const checkboxList = (this.state.checkbox.map((checkbox, index, array) => this.choiceContent(index, checkbox)))
        const completionList = (this.state.completion.map((completion, index, array) => this.completionContent(index, completion)))

        return (
            <div className="quest-content">
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <ul className="radio-list">
                        {radioList}
                    </ul>
                    <ul className="checkbox-list">
                        {checkboxList}
                    </ul>
                    <ul className="completion-list">
                        {completionList}
                    </ul>
                    <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                        <Button className="button" type="primary" htmlType="submit">提交</Button>
                        <Button className="button" onClick={this.handleReset.bind(this)}>清空</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Form.create()(QuestContent)