import React, { Component } from 'react';
import { render } from 'react-dom';
import { Modal, Button, Input } from 'antd'
import $ from 'jquery'
import axios from 'axios'

import Footer from './Components/Shared/footer.jsx';
import LoginModal from './Components/ManageCenterBox/LoginModal.jsx'
import QuestMenu from './Components/QuestionnaireBox/QuestMenu.jsx';

import './Css/Admin/Index.css'
import './Css/Admin/Login.css'

import './Css/Home/animate.css'
import './Css/Home/style.css'
import './Css/Home/flexslider.css'
import './Css/Home/magnific-popup.css'

import './Css/Quest/owl.carousel.min.css'
import './Js/Quest/owl.carousel.min.js'
import './Js/jquery.cookie.js'

class entry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            visible: false,
            isLogin:false
        };
    }
    componentDidMount() {
        var _this = this
        var token = $.cookie('token');
        var mytoken = JSON.parse(token);
        axios.defaults.headers.common['Authorization'] = "Bearer " + mytoken.access_token;
        axios.get('http://localhost:60842/api/Admin/GetAdminInfo')
            .then(function (response) {
                _this.setState({ data: response.data,isLogin:true });
            })
            .catch(function (response) {
                console.log(response);
            })
    }
    onLogin(e) {
        this.setState({ visible: true });
    }
    onCancleLogin(e) {
        this.setState({ visible: false });
    }
    handleLogout() {
        $.cookie('token', null);
        this.setState({ data: null ,isLogin:false })
        window.location.reload();
    }
    render() {
        const isLogin = this.state.isLogin ? (
            <ul>
                <li className="active"><a>主页</a></li>
                <li><a href='/#/adminCenter/adminInfo'>管理中心</a></li>
                <li><a href='/#/adminCenter/questDetail'>问卷详情</a></li>
                <li><a href='/#/adminCenter/questDetail'>统计</a></li>
                <li><a onClick={this.handleLogout.bind(this)}>注销</a></li>
            </ul>
        ) : (
                <ul>
                    <li className="active"><a >主页</a></li>
                    <li className="btn-cta" onClick={this.onLogin.bind(this)}><a><span>登录</span></a></li>
                </ul>);
        return (
            <div className="app">
                <Modal className="login-modal" wrapClassName="vertical-center-modal" width="400px" title="登录" visible={this.state.visible} footer={null} onCancel={this.onCancleLogin.bind(this)}>
                    <LoginModal />
                </Modal>
                <div id="page">
                    <nav className="fh5co-nav" role="navigation">
                        <div className="top">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xs-12">
                                        <p className="num">QQ: 158 521 380 1</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="top-menu">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xs-1">
                                        <div id="fh5co-logo"><a href="/#/">云翳<span>.</span></a></div>
                                    </div>
                                    <div className="col-xs-11 menu-1">
                                        {isLogin}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </nav>
                    <header id="fh5co-header" className="fh5co-cover" role="banner" data-stellar-background-ratio="0.5">
                        <div className="overlay"></div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 col-md-offset-2 text-center">
                                    <div className="display-t">
                                        <div className="display-tc animate-box fadeIn animated-fast" data-animate-effect="fadeIn">
                                            <h1>云翳问卷网</h1>
                                            <h2>只为你设计的<a href="#" target="_blank" title="前往提交">问卷</a>网</h2>
                                            <p><a className="btn btn-primary btn-lg popup-vimeo btn-video" href="#quest-menu">前往填表</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
                <QuestMenu />
                <Footer></Footer>
            </div>
        );
    }
}

export default entry;