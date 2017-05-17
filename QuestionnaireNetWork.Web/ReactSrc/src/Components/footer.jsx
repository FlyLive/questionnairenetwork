import React, { Component } from 'react';
import { render } from 'react-dom';

class Footer extends Component {
    render() {
        return (
            <footer className="footer" id="fh5co-footer" role="contentinfo">
                <div className="container">
                    <div className="row copyright">
                        <div className="col-md-12">
                            <p>
                                <small className="block">© {new Date().toString()} Senior Java -- QuestionnaireNetWork. Finish Time <a href="#" target="_blank" title="Finish-time">2017-5</a></small>
                            </p>
                            <p> -- Design By <a href="#" title="FlyLive" target="_blank">FlyLive</a></p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

module.exports = Footer;