import React, { Component } from 'react';
import { render } from 'react-dom';

import Header from '../Shared/header.jsx';
import Footer from '../Shared/footer.jsx';

class AdminCenter extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="admin-center">
                <div className="head container">
                    <div className="navbar-header">
                        <a href="/#/" className="navbar-brand" data-section="body">云翳</a>
                    </div>
                    <Header />
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    };
}

export default AdminCenter