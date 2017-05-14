import React, { Component } from 'react';
import { render } from 'react-dom';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    handleClick(e) {
        this.setState({ liked: !this.state.liked });
    }

    render() {
        const text = this.state.liked ? 'like' : 'haven\'t liked';
        return (
            <div className="footer">
                <p onClick={this.handleClick.bind(this)}>
                    You {text} this. Click to toggle.
                </p>
            </div>
        );
    }
}

module.exports = Footer;