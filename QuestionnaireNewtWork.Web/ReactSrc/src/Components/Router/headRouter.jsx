import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import { render } from 'react-dom';
import { Icon } from 'antd'

import AdminInfo from '../Content/AdminInfo.jsx';
import CreateQuest from '../Content/CreateQuest.jsx';
import CheckResult from '../Content/CheckResult.jsx';
import Total from '../Content/Total.jsx';

class HeadRouter extends Component {
    render() {
        return (
            <Router>
                <div id="main-menu">
                    <div className="menu">
                        <ul>
                            <li><Icon type="user" /><Link to="/">个人资料</Link></li>
                            <li><Icon type="plus-circle" /><Link to="/create">新建问卷</Link></li>
                            <li><Icon type="bars" /><Link to="/check">查看所有问卷</Link></li>
                            <li><Icon type="line-chart" /><Link to="/total">统计</Link></li>
                        </ul>
                    </div>
                    <hr />
                    <Route exact path="/" component={AdminInfo} />
                    <Route path="/create" component={CreateQuest} />
                    <Route path="/check" component={CheckResult} />
                    <Route path="/total" component={Total} />
                </div>
            </Router>
        );
    }
}
module.exports = HeadRouter;