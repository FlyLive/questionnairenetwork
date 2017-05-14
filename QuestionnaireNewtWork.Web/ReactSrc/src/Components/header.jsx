import React, { Component } from 'react';
import { render } from 'react-dom';
import HeadRouter from '../Components/Router/headRouter.jsx'

class Header extends Component {
    render() {
        return (
            <div className="head container">
                <div className="navbar-header">
                    <a href="index.html" className="navbar-brand" data-section="body">云翳</a>
                </div>
                <HeadRouter></HeadRouter>
            </div>
        );
    };
}
export default Header;