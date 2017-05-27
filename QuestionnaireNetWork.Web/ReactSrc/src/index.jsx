import React, { Component } from 'react';
import { render } from 'react-dom';
import $ from 'jquery'
import axios from 'axios'

import MyRouter from './Router/MyRouter.jsx';
import './Css/Admin/AdminCenter.css'
import './Css/Admin/Index.css'

import './Css/Home/animate.css'
import './Css/Home/style.css'
import './Css/Home/flexslider.css'
import './Css/Home/magnific-popup.css'
import './Js/jquery.cookie.js'

render(
    <MyRouter />,
    document.getElementById('app')
);