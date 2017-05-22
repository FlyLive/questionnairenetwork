import React, { Component } from 'react';
import { render } from 'react-dom';
import $ from 'jquery'

import Footer from '../Shared/footer.jsx';
import QuestContent from '../Questionnaire/QuestContent.jsx'

import '../../Css/Quest/Quest.css'
import '../../Css/Home/style.css'

const data  = {QId:1,Title:"大学生心理素质调查",CreateTime:"2017/5/22",count:32}

class Questionnaire extends Component {
    constructor(props){
        super(props);
        this.state={quest:null}
    }
    componentWillMount() {
        this.setState({
            quest:data
        })
    }
    render() {
        return (
            <div className="quest">
                <header>
                    <div className="web-title"><a href="#">云翳</a></div>
                    <div><h2 className="title-content">{this.state.quest.Title}</h2></div>
                    <div><p className="quest-info">参与者：{this.state.quest.count}&emsp;创建时间：{this.state.quest.CreateTime}</p></div>
                </header>
                <QuestContent Qid={this.state.quest.QId}/>
                <Footer />
            </div>
        );
    }
}

render(
    <Questionnaire />,
    document.getElementById("questionnaire")
)