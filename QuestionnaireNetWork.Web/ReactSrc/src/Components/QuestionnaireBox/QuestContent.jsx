import React, { Component } from 'react'
import { render } from 'react-dom'
import { Radio, Checkbox, Row, Col, Input, Form, Button, notification, Icon } from 'antd'
import axios from 'axios'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group

let key = 1;
class QuestContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questId: this.props.questId,
            choice: [],
            completion: [],
        }
    }
    componentwillMount() {
        var questId = this.props.questId;
        this.update(questId);
    }
    update(questId) {
        var _this = this;
        $.ajax({
            type: 'get',
            url: 'http://localhost:60842/api/Questionnaire/GetQuest',
            data: { id: questId },
            success: function (data) {
                _this.setState({
                    choice: data.ChoiceQuestions,
                    completion: data.Completions
                })
            }, error: function () {
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        var questId = nextProps.questId;
        this.update(questId);
    }

    handleSubmit(e) {
        e.preventDefault();
        var _this = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const questId = _this.props.questId;
                const choices = _this.state.choice;
                const completions = _this.state.completion;
                for (var i = 0; i < choices.length; i++) {
                    var choice = choices[i];
                    if (choice.Type) {//多选
                        choice.AnswerOptions = new Array();
                        var optionIds = values["choice-" + choice.ChoiceId];
                        optionIds.forEach(optionId => choice.AnswerOptions.push(optionId));
                    } else {//单选
                        var optionId = values["choice-" + choice.ChoiceId];
                        choice.AnswerOption = optionId
                    }
                }
                for (var i = 0; i < completions.length; i++) {
                    var completion = completions[i];
                    var content = values["completion-" + completion.CompletionId];
                    completion.Answer = content
                }
                alert(questId);
                axios.post('http://localhost:60842/api/Questionnaire/SubmitAnswer',
                    { QId: questId, ChoiceQuestions: choices, Completions: completions })
                    .then(function (response) {
                        if (response.data) {
                            notification.open({
                                placement: 'topleft',
                                message: '谢谢参与',
                                description: '感谢您的参与，您的选择已经保存！',
                                icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
                            });
                        }
                        else {
                            notification.open({
                                placement: 'topleft',
                                message: '谢谢参与',
                                description: '对不起，系统检测到您已提交过该问卷，不能重复提交，谢谢您的参与！',
                                icon: <Icon type="frown-circle" style={{ color: 'red' }} />,
                            });
                        }
                    }).catch(function (error) {
                        notification.open({
                            placement: 'topleft',
                            message: '出错啦',
                            description: '对不起，提交失败，请重试！',
                            icon: <Icon type="frown-circle" style={{ color: 'red' }} />,
                        });
                    })
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
                {getFieldDecorator('choice-' + (choice.ChoiceId), {
                    rules: [
                        { required: true, message: '请将所有题做完!' },
                    ],
                })(<CheckboxGroup>
                    <Row gutter={5}>
                        {choice.Options.map(option => <Col key={option.OptionId} span={8}><Checkbox className="checkbox-input" value={option.OptionId}>{option.OptionContent}</Checkbox></Col>)}
                    </Row>
                </CheckboxGroup>)}
            </FormItem>
            ) : (<FormItem>
                {getFieldDecorator('choice-' + choice.ChoiceId, {
                    rules: [
                        { required: true, message: '请将所有题做完!' },
                    ],
                })(<RadioGroup>
                    {choice.Options.map(option => <Radio className="radio-input" key={option.OptionId} value={option.OptionId}>{option.OptionContent}</Radio>)}
                </RadioGroup>
                    )}
            </FormItem>)
        )
    }

    choiceContent(index, choice) {
        const { getFieldDecorator } = this.props.form;
        return (
            choice.Type ? (<li key={"checkbox" + choice.ChoiceId}>
                <p className="choice-title">{(index + 1) + "、" + choice.ChoiceTitle}&emsp;{"(可多选)"}</p>
                {this.optionContent(choice)}
            </li>) : (<li key={"radio" + choice.ChoiceId}>
                <p className="choice-title">{(index + 1) + "、" + choice.ChoiceTitle}&emsp;{"(单选)"}</p>
                {this.optionContent(choice)}
            </li>)
        )
    }

    completionContent(index, completion) {
        const { getFieldDecorator } = this.props.form;
        const currentIndex = index + 1 + this.state.choice.length;
        return (
            <li key={"completion" + completion.CompletionId}>
                <p className="choice-title">{currentIndex + "、" + completion.Title}</p>
                <FormItem>{getFieldDecorator('completion-' + completion.CompletionId, {
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
        const choiceList = (this.state.choice.map((choice, index, array) => this.choiceContent(index, choice)))
        const completionList = (this.state.completion.map((completion, index, array) => this.completionContent(index, completion)))

        return (
            <div className="quest-content">
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <ul className="choice-list">
                        {choiceList}
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