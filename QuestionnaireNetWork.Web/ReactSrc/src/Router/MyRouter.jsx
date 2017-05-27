import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, hashHistory, Route, Link } from "react-router";
import { Icon } from 'antd'

import entry from '../entry.jsx'
import Questionnaire from '../Questionnaire.jsx'
import AdminCenter from '../Components/ManageCenterBox/AdminCenter.jsx'
import AdminInfo from '../Components/ManageCenterBox/AdminInfo.jsx'
import CreateQuest from '../Components/CreateQuestBox/CreateQuest.jsx'
import QuestDetail from '../Components/QuestDetailsBox/QuestDetail.jsx'
import Total from '../Components/QuestDetailsBox/Total.jsx'

class MyRouter extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={entry} />
                <Route path="/adminCenter" component={AdminCenter}>
                    <Route path="/adminCenter/adminInfo" component={AdminInfo} />
                    <Route path="/adminCenter/createQuest" component={CreateQuest} />
                    <Route path="/adminCenter/questDetail" component={QuestDetail} />
                    <Route path="/adminCenter/total" component={Total} />
                </Route>
                <Route path="/questionnaire/:questId" component={Questionnaire} />
            </Router>
        );
    }
}
export default MyRouter;