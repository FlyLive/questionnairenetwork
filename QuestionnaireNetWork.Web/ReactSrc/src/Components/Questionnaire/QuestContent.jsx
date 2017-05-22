import React, { Component } from 'react'
import { render } from 'react-dom'
import { Radio, Checkbox, Row, Col } from 'antd'

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
            value: null
        }
    }
    
    componentWillMount() {
        this.setState({})
    }

    handleSubmit() {

    }

    radioOnChange(e) {
        this.setState({
            value: e.target.value,
        });
        console.log('radio checked = ', e.target.value);
    }

    checkBoxOnChange(checkedValues) {
        console.log('checked = ', checkedValues);
    }

    optionContent(choice) {
        return (
            choice.Type ? (<RadioGroup onChange={this.radioOnChange.bind(this)} value={this.state.value}>
                {choice.Option.map(option => <Radio value={option.OptionId}>{option.OptionContent}</Radio>)}
            </RadioGroup>
            ) : (<CheckboxGroup onChange={this.checkBoxOnChange.bind(TouchList)}>
                <Row>
                    {choice.Option.map(option => <Col span={5}><Checkbox value={option.OptionId}>{option.OptionContent}</Checkbox></Col>)}
                </Row>
            </CheckboxGroup>)
        )
    }
    
    choiceContent(choice) {
        return (
            choice.Type ? (<li key={"radio" + choice.ChoiceId}>
                <p>{choice.Title}</p>

            </li>) : (<li key={"checkbox" + choice.ChoiceId}>
                <p>{choice.Title}</p>
            </li>)
        )
    }

    completionContent(completion) {
        return (
            <li key={"completion" + completion.CompletionId}>
                <p>{completion.Title}</p>
            </li>
        )
    }

    render() {
        const radioList = (this.state.radio.map(radio => this.choiceContent(radio)))
        const checkboxList = (this.state.checkbox.map(checkbox => this.choiceContent(checkbox)))
        const completionList = (this.state.completion.map(completion => this.completionContent(completion)))

        return (
            <div className="quest-content">
                content
                <ul className="radio-list">
                    {radioList}
                </ul>
                <ul className="checkbox-list">
                    {checkboxList}
                </ul>
                <ul className="completion-list">
                    {completionList}
                </ul>
            </div>
        )
    }
}

export default QuestContent