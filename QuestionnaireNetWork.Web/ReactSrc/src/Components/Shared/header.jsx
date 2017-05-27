import React, { Component } from 'react';
import { render } from 'react-dom';
import { Icon } from 'antd'

class Header extends Component {
    componentWillMount(){
        var token = $.cookie('token');
        var mytoken = JSON.parse(token);
        if(mytoken == null){
            window.location.href='/#/'
        }
    }
    handleLogout(){
        $.cookie('token', null);
        window.location.href='/#/'
    }
    render() {
        return (
            <div id="main-menu">
                <div className="menu">
                    <ul>
                        <li><a href="/#/adminCenter/adminInfo"><Icon type="user" />个人资料</a></li>
                        <li><a href="/#/adminCenter/createQuest"><Icon type="plus-circle" />新建问卷</a></li>
                        <li><a href="/#/adminCenter/questDetail"><Icon type="bars" />查看所有问卷</a></li>
                        <li><a href="/#/adminCenter/total"><Icon type="line-chart" />统计</a></li>
                        <li><a onClick={this.handleLogout.bind(this)}><Icon type="logout" />注销</a></li>
                    </ul>
                </div>
                <hr />
            </div>
        );
    };
}
export default Header;