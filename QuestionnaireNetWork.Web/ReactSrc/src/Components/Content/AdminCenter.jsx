import React, { Component } from 'react';
import { render } from 'react-dom';
import $ from 'jquery'
import axios from 'axios'

import Header from '../Shared/header.jsx';
import Footer from '../Shared/footer.jsx';
import '../../../src/Css/Admin/AdminCenter.css'
import '../../../src/Css/Admin/Index.css'

import '../../../src/Css/Home/animate.css'
import '../../../src/Css/Home/style.css'
import '../../../src/Css/Home/flexslider.css'
import '../../../src/Css/Home/magnific-popup.css'

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