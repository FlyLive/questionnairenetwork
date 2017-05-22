import React, { Component } from 'react'
import { render } from 'react-dom'
import { Route, BrowserRouter as Router, Link } from 'react-router-dom'
import { Icon } from 'antd'

import AdminInfo from '../Content/AdminInfo.jsx'
import CreateQuest from '../Content/CreateQuest.jsx'
import ModifyQuest from '../Content/ModifyQuest.jsx'
import Total from '../Content/Total.jsx'

class HeadRouter extends Component {
    render() {
        return (
            <Router>
                <div id="main-menu">
                    <div className="menu">
                        <ul>
                            <li><Link to="/total"><Icon type="user" />个人资料</Link></li>
                            <li><Link to="/create"><Icon type="plus-circle" />新建问卷</Link></li>
                            <li><Link to="/modify"><Icon type="bars" />查看所有问卷</Link></li>
                            <li><Link to="/admin.html"><Icon type="line-chart" />统计</Link></li>
                        </ul>
                    </div>
                    <hr />
                    <Route  path="/total" component={AdminInfo} />
                    <Route  path="/create" component={CreateQuest} />
                    <Route  path="/modify" component={ModifyQuest} />
                    <Route exact path="/admin.html" component={Total} />
                </div>
            </Router>
        );
    }
}
export default HeadRouter;