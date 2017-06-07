import React, { Component } from 'react';
import { render } from 'react-dom';
import $ from 'jquery'

import Footer from './Components/Shared/footer.jsx';
import QuestContent from './Components/QuestionnaireBox/QuestContent.jsx'

import './Css/Quest/Quest.css'
import './Css/Home/style.css'

class Questionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = { quest: [] }
    }

    componentWillMount() {
        var id = this.props.params.questId
        this.update(id)
    }

    update(questId) {
        var _this = this;
        $.ajax({
            type: 'get',
            url: 'http://localhost:60842/api/Questionnaire/GetQuest',
            data: { id: questId },
            success: function (data) {
                _this.setState({
                    quest: data
                })
            }, error: function () {
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        var questId = this.props.params.questId;
        this.update(questId);
    }

    render() {
        return (
            <div className="quest">
                <header>
                    <div className="web-title"><a href="/#/">云翳</a></div>
                    <div><h2 className="title-content">{this.state.quest.QuestTitle}</h2></div>
                    <div><p className="quest-info">题目数量：{this.state.quest.CurrentQuestNum}&emsp;参与者：{this.state.quest.UserNum}&emsp;创建时间：{this.state.quest.CreateTime}</p></div>
                </header>
                <QuestContent questId={this.state.quest.QId} />
                <Footer />
            </div>
        );
    }
}

export default Questionnaire