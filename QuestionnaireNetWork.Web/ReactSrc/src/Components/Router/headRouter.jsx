import React, { Component } from 'react'
import { render } from 'react-dom'
import { Route, BrowserRouter as Router, Link } from 'react-router-dom'
import { Icon } from 'antd'

import AdminInfo from '../ManageCenterBox/AdminInfo.jsx'
import CreateQuest from '../CreateQuestBox/CreateQuest.jsx'
import QuestDetail from '../QuestDetailsBox/QuestDetail.jsx'
import Total from '../QuestDetailsBox/Total.jsx'

class HeadRouter extends Component {
    render() {
        return (
            <Router>
                <div id="main-menu">
                    <div className="menu">
                        <ul>
                            <li><Link to="/Home/AdminCenter"><Icon type="user" />个人资料</Link></li>
                            <li><Link to="/createQuest"><Icon type="plus-circle" />新建问卷</Link></li>
                            <li><Link to="/questDetail"><Icon type="bars" />查看所有问卷</Link></li>
                            <li><Link to="/admin.html"><Icon type="line-chart" />统计</Link></li>
                        </ul>
                    </div>
                    <hr />
                    <Route path="/Home/AdminCenter" component={AdminInfo} />
                    <Route path="/createQuest" component={CreateQuest} />
                    <Route path="/questDetail" component={QuestDetail} />
                    <Route exact path="/admin.html" component={Total} />
                </div>
            </Router>
        );
    }
}
export default HeadRouter;