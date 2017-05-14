import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import { render } from 'react-dom';
import CreateQuest from '../Content/CreateQuest.jsx';
import CheckResult from '../Content/CheckResult.jsx';

class HeadRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/create">新建问卷</Link></li>
                        <li><Link to="/check">查看所有问卷</Link></li>
                    </ul>
                    <hr />
                    <Route path="/create" component={CreateQuest} />
                    <Route path="/check" component={CheckResult} />
                </div>
            </Router>
        );
    }
}
module.exports = HeadRouter;