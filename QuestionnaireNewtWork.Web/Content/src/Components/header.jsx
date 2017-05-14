import React, { Component } from 'react';
import { render } from 'react-dom';
import HeadRouter from '../Components/Router/headRouter.jsx'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { opacity: 1.0 };
    }

    componentDidMount() {
        this.timer = setInterval(function () {
            var opacity = this.state.opacity;
            opacity -= 0.05;
            if (opacity < 0.1) {
                opacity = 1.0;
            }
            this.setState({
                opacity: opacity
            });
        }.bind(this), 100);
    }

    render() {
        return (
            <div className="head">
                <div style={{ opacity: this.state.opacity }}>
                    Hello {this.props.name}
                </div>
                <HeadRouter></HeadRouter>
            </div>
        );
    };
}
export default Header;