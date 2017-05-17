import '../src/Css/Admin/AdminCenter.css'
import '../src/Css/Admin/Index.css'
import '../src/Css/Admin/styles.css'

import '../src/Css/Home/animate.css'
import '../src/Css/Home/style.css'
import '../src/Css/Home/flexslider.css'
import '../src/Css/Home/magnific-popup.css'
import $ from 'jquery'
import axios from 'axios'


import React, { Component } from 'react';
import { render } from 'react-dom';
import Header from '../src/Components/header.jsx';
import Footer from '../src/Components/footer.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {data:true};
    }
    componentDidMount() {
        // axios.get("http://localhost:50979/api/values")
        // .then(function (data) {
        //      this.setState({ data: data })
        // })
        // .catch(function(error){
        //     alert(error);
        // });
        // $.ajax({
        //     url: 'http://localhost:50979/api/values',
        //     dataType: 'json',
        //     cache: false,
        //     success: function (data) {
        //         this.props.data = true;
        //     }.bind(this),
        //     error: function (xhr, status, err) {
        //         this.props.data = false;
        //         console.error(this.props.url, status, err.toString());
        //     }.bind(this)
        // });
    }

    render() {
        const isLogin = this.state.data ? (
            <ul>
                <li className="active"><a href="#">主页</a></li>
                <li><a href="#">管理中心</a></li>
                <li><a href="#">问卷详情</a></li>
                <li><a href="#">统计</a></li>
                <li><a href="#">注销</a></li>
            </ul>
            ) : (
            <ul>
                <li className="active"><a href="#">主页</a></li>
                <li className="btn-cta"><a href="#"><span>Login</span></a></li>
            </ul>);
        return (
            <div className="app">
                <Header></Header>
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
                                        <div id="fh5co-logo"><a href="index.html">云翳<span>.</span></a></div>
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
                                            <p><a className="btn btn-primary btn-lg popup-vimeo btn-video" href="http://localhost:50979/">前往填表</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

render(
    <App />,
    document.getElementById('content')
);

module.exports = App;/* export default CommentBox */