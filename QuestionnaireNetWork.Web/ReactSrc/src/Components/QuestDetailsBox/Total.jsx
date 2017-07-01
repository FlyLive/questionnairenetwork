import React, { Component } from 'react';
import { render } from 'react-dom';
import { Input, Button, Icon, message, Table, Tabs, Progress, Badge } from 'antd'
import axios from 'axios'

import ChoiceAnswer from './ChoiceAnswer.jsx'
import CompletionAnswer from './CompletionAnswer.jsx'
import UserAnswer from './UserAnswer.jsx'

const TabPane = Tabs.TabPane

class Total extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterDropdownVisible: false,
            data: [],
            searchText: '',
            filtered: false,
            selected: null,
        }
    }

    componentDidMount() {
        this.update();
        var token = $.cookie('token');
        var mytoken = JSON.parse(token);
        if(mytoken === null){
            window.location.href='/#/'
        }
        axios.defaults.headers.common['Authorization'] = "Bearer " + mytoken.access_token;
    }

    update() {
        const _this = this;
        axios.get('http://localhost:60842/api/Questionnaire/GetAllQuest')
            .then(function (response) {
                _this.setState({ data: response.data })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onInputChange(e) {
        this.setState({ searchText: e.target.value });
    }

    onSearch() {
        this.update();
        const { searchText,data } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: data.map((quest, index, array) => {
                const match = quest.QuestTitle.match(reg);
                if (!match) {
                    return null;
                }
                quest.QuestTitle = (
                    <span>
                        {quest.QuestTitle.split(reg).map((text, i) => (
                            i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                        ))}
                    </span>
                );
                return quest;
            }).filter(quest => !!quest),
        });
    }
    onSelected(record, index) {
        this.setState({ selected: record.QId });
    }
    render() {
        const columns = [{
            title: '问卷名',
            dataIndex: 'QuestTitle',
            key: 'QuestTitle',
            width: 100,
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInput = ele}
                        placeholder="Search name"
                        value={this.state.searchText}
                        onChange={this.onInputChange.bind(this)}
                        onPressEnter={this.onSearch.bind(this)}
                    />
                    <Button type="primary" onClick={this.onSearch.bind(this)}>搜索</Button>
                </div>
            ),
            filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }, () => this.searchInput.focus()),
        }, {
            title: '题数',
            dataIndex: 'CurrentQuestNum',
            key: 'CurrentQuestNum',
            width: 100,
        }, {
            title: '创建时间',
            dataIndex: 'CreateTime',
            key: 'CreateTime',
            width: 100,
        }];
        return (
            <div className="Total router">
                <Table rowKey="QId" columns={columns} dataSource={this.state.data} onRowClick={this.onSelected.bind(this)} bordered title={() => '查看问卷结果'} />
                <br />
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><Icon type="pie-chart" />图表类(选择题)</span>} key="1">
                        <ChoiceAnswer questId={this.state.selected} />
                    </TabPane>
                    <TabPane tab={<span><Icon type="bars" />简答题</span>} key="2">
                        <CompletionAnswer questId={this.state.selected} />
                    </TabPane>
                    <TabPane tab={<span><Icon type="user" />参与者</span>} key="3">
                        <UserAnswer questId={this.state.selected} />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Total;