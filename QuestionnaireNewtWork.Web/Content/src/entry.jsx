import '../src/Css/Admin/AdminCenter.css'
import '../src/Css/Admin/Index.css'
import '../src/build/jquery-2.2.3.min.js'
import $ from 'jquery'


import React, { Component } from 'react';
import { render } from 'react-dom';
import Header from '../src/Components/header.jsx';
import Footer from '../src/Components/footer.jsx';

class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    componentDidMount() {
        $.ajax({
            url: '/api/values',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    render() {
        return (
            <div className="commentBox">
                <Header name={this.state.data}></Header>
                <Footer></Footer>
            </div>
        );
    }
}

render(
    <CommentBox />,
    document.getElementById('content')
);

module.exports = CommentBox;