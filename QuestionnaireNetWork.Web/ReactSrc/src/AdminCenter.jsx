import React, { Component } from 'react';
import { render } from 'react-dom';
import $ from 'jquery'
import axios from 'axios'

import Header from './Components/Shared/header.jsx';
import Footer from './Components/Shared/footer.jsx';
import './Css/Admin/AdminCenter.css'
import './Css/Admin/Index.css'

import './Css/Home/animate.css'
import './Css/Home/style.css'
import './Css/Home/flexslider.css'
import './Css/Home/magnific-popup.css'
import './Js/jquery.cookie.js'

class AdminCenter extends Component {
    render() {
        return (
            <div className="admin-center">
                <Header/>
                <Footer/>
            </div>
        );
    };
}

render(
    <AdminCenter />,
    document.getElementById('admin')
);