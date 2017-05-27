import React, { Component } from 'react';
import { render } from 'react-dom';
import { Card, Tag } from 'antd'
import axios from 'axios'

class UserAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answerId: this.props.answerId,
            IpAddress:null,
            choices: [],
            completions: [],
        };
    }

    componentWillMount() {
        this.update(this.props.answerId)
    }

    update(answerId) {
        var _this = this;
        axios.get('http://localhost:60842/api/Admin/GetAnswer?answerId=' + answerId)
            .then(function (response) {
                _this.setState({ IpAddress:response.data.IpAddress,choices: response.data.ChoicesAnswer, completions: response.data.CompletionsAnswer })
            }).catch(function (error) {
            })
    }

    componentWillReceiveProps(nextProps) {
        let answerId = nextProps.answerId;
        this.setState({ answerId: answerId });
        this.update(answerId);
    }

    ChoiceAnswerItem(index, choice) {
                console.log(this.state.choices);
        return  (<Card title={"选择题"+(index+1)+choice.Type ? "(多选)":"(单选)"} style={{ display: 'inline-block', width: 270, padding: '8px', margin: '20px' }}>
            <ul>
            {choice.Options === null ? "":choice.Options.map((index,value) => (<li>{value.OptionContent}</li>))}
            </ul>
            <p><Tag color="#87d068">答案</Tag>&emsp;|{choice.Answers === null ? "":choice.Answer.map(value => (<span>{value}|</span>))}</p>
            </Card>)
    }

    CompletionAnswerItem(index, completionAnswer) {
                console.log(this.state.completions);
        return (
            <Card title={"题目"+(index + 1)+this.choices.length+"、(简答题)"} style={{ display: 'inline-block', width: 270, padding: '8px', margin: '20px' }}>
                <p>题目名：{completionAnswer.CompletionTitle}</p>
                <br/>
                <p><Tag color="#87d068">答案</Tag>&emsp;{completionAnswer.AnswerContent}</p>
                </Card>
        )
    }
    render() {
        const choiceItems = (this.state.choices.map((index, value) => this.ChoiceAnswerItem(index,value)));
        const completionItems = (this.state.completions.map((index, value) => this.CompletionAnswerItem(index, value)));
        return (
            <div>
                <br />
                <h2>IpAddress:&emsp;{this.state.IpAddress}</h2>
                {choiceItems}
                {completionItems}
            </div>
        );
    }
}

export default UserAnswer