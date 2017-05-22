import React, { Component } from 'react';
import { render } from 'react-dom';
import { Card, Button, Input, Icon } from 'antd';
import $ from 'jquery'

import '../../Css/Quest/owl.carousel.min.css'
import '../../Js/Quest/owl.carousel.min.js'

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
const data = [
    { QId: 1, QuestTitle: '大学生心理素质调查', Count: 32, Num: 20, CreateTime: "2017/5/22" },
    { QId: 2, QuestTitle: 'Jim Green', Count: 42, Num: 20, CreateTime: "2017/5/22" },
    { QId: 3, QuestTitle: 'Joe Black', Count: 32, Num: 20, CreateTime: "2017/5/22" },
    { QId: 4, QuestTitle: 'Joe Black', Count: 32, Num: 20, CreateTime: "2017/5/22" },
]; const data1 = [
    { QId: 1, QuestTitle: '大学生心理素质调查', Count: 32, Num: 20, CreateTime: "2017/5/22" },
    { QId: 2, QuestTitle: 'Jim Green', Count: 42, Num: 20, CreateTime: "2017/5/22" },
    { QId: 3, QuestTitle: 'Joe Black', Count: 32, Num: 20, CreateTime: "2017/5/22" },
    { QId: 4, QuestTitle: '大学生心理素质调查', Count: 32, Num: 20, CreateTime: "2017/5/22" },
    { QId: 5, QuestTitle: 'Jim Green', Count: 42, Num: 20, CreateTime: "2017/5/22" },
    { QId: 6, QuestTitle: 'Joe Black', Count: 32, Num: 20, CreateTime: "2017/5/22" },
];
class QuestMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quests: [],
            searchResult: []
        }
    }
    
    componentWillMount() {
        // $.ajax({
        //     type: 'get',
        //     url: '',
        //     success: function (data) {
        //         this.setState({ quests: data })
        //     }, error: function () {

        //     }
        // })
        this.setState({ quests: data })
    }

    handleSearch(Search) {
        // $.ajax({
        //     type: 'get',
        //     url: '',
        //     success: function (data) {

        //     }, error: function () {

        //     }
        // })
        this.setState({ searchResult: data1 })
    }

    searchResult() {
        return (
            <div className="search-result">
                <h3>搜索结果</h3>
                {this.state.searchResult.map(quest => this.questItem(quest))}
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
        const questMenu = (quests === null ? function () {
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