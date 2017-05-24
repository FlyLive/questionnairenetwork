import React, { Component } from 'react';
import { render } from 'react-dom';
import { Card, Button, Input, Icon, message } from 'antd';
import $ from 'jquery'

$(document).ready(function () {
    $("#news-slider").owlCarousel({
        items: 3,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [980, 3],
        itemsMobile: [600, 1],
        pagination: false,
        navigationText: false,
        autoPlay: true
    })
});

const Search = Input.Search

class QuestMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quests: [],
            searchResult: []
        }
    }

    componentWillMount() {
        var _this = this;
        $.ajax({
            type: 'get',
            url: 'http://localhost:60842/api/Questionnaire/GetTop5Quest',
            success: function (data) {
                _this.setState({ quests: data })
            }, error: function (error) {
            }
        })
    }

    handleSearch(search) {
        var _this = this;
        if (search == "" || /\s+/g.test(search)) {
            message.error("搜索框不能为空");
            return false;
        }
        $.ajax({
            type: 'get',
            url: 'http://localhost:60842/api/Questionnaire/Search',
            data: { "": search },
            success: function (data) {
                _this.setState({ searchResult: data })
            }, error: function (error) {
            }
        })
    }

    searchResult() {
        const result = this.state.searchResult;
        return (
            <div className="search-result">
                <h3>搜索结果</h3>
                {result.length > 0 ? function () { return (<div><h2 style={{textAlign:center}}><Icon type="frown-o" />抱歉，暂时未找到匹配的问卷</h2></div>) } : result.map(quest => this.questItem(quest))}
            </div>
        )
    }

    questItem(quest) {
        return (<div className="post-slide" key={quest.QId}>
            <div className="post-content">
                <Card title={quest.QuestTitle} extra={<a href="#">前往<Icon type="arrow-right" /></a>} style={{ width: 250 }}>
                    <div className="post-img">
                        <a href="#"><img src="../../src/Images/img_bg_1.jpg" title={quest.QuestTitle} /></a>
                    </div>
                    <h3><Icon type="file-text" style={{ color: "#108ee9" }} />题数：<span>{quest.Num}</span></h3>
                    <h3><Icon type="edit" style={{ color: "#108ee9" }} />参与人数：<span>{quest.Count}</span></h3>
                    <h3><Icon type="calendar" style={{ color: "#108ee9" }} />创建时间：<span>{quest.CreateTime}</span></h3>
                    <div style={{ textAlign: "right" }}>
                        <Button type="primary">前往</Button>
                    </div>
                </Card>
            </div>
        </div>)
    }

    render() {
        const quests = this.state.quests
        const questMenu = (quests.length <= 0 ? function () {
            return (<div className="post-slide">
                <div className="post-content">
                </div>
            </div>)
        } : quests.map(quest => this.questItem(quest)))
        return (
            <div id="quest-menu" className="quest-menu">
                <div className="quest-search" style={{ padding: "1em 0", textAlign: "right" }}>
                    <Search size="large" placeholder="搜索问卷" style={{ width: 500 }} onSearch={value => this.handleSearch(value)} />
                </div>
                <div className="row">
                    <div className="col-md-12" style={{ padding: "1em 0" }}>
                        <div id="news-slider" className="owl-carousel">
                            {questMenu}
                        </div>
                    </div>
                </div>
                {this.searchResult()}
            </div>
        )
    }
}

export default QuestMenu