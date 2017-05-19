import React, { Component } from 'react';
import { render } from 'react-dom';
import { Menu, Dropdown, Button, Icon, Input, message, Modal, Table, Tabs, Progress, Popconfirm } from 'antd';

import CreateChoice from '../QuestionBox/CreateChoice.jsx'
import CreateCompletion from '../QuestionBox/CreateCompletion.jsx'
import RadioChoiceDetail from '../QuestionBox/RadioChoiceDetail.jsx'
import CheckChoiceDetail from '../QuestionBox/CheckChoiceDetail.jsx'
import CompletionDetail from '../QuestionBox/CompletionDetail.jsx'

const TabPane = Tabs.TabPane

const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    name: 'Jim Green',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}, {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
}];

class ModifyQuest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choice: { visible: false },
            completion: { visible: false },
            filterDropdownVisible: false,
            data,
            searchText: '',
            filtered: false,
            selected: data == null ? null : data[0].key,
            fousQuestId: null,
        }
    }
    onInputChange(e) {
        this.setState({ searchText: e.target.value });
    }
    onSearch() {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: data.map((record) => {
                const match = record.name.match(reg);
                if (!match) {
                    return null;
                }
                record.name = (
                    <span>
                        {record.name.split(reg).map((text, i) => (
                            i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                        ))}
                    </span>
                );
                return record;
            }).filter(record => !!record),
        });
    }
    handleMenuClick(e) {
        switch (e.key) {
            case '1': this.setState({ choice: { visible: true } }); break;
            case '2': this.setState({ completion: { visible: true } }); break;
        }
    }
    handleCChoiceCancel(e) {
        this.setState({
            choice: { visible: false }
        });
    }
    handleCCompletionCancel(e) {
        this.setState({
            completion: { visible: false }
        });
    }
    onSelected(record, index) {
        this.setState({ selected: record.key });
    }

    onDeleteQuest(key) {

    }
    onModifyQuest(key) {

    }
    onFoucsQuest(key) {
        this.setState({ fousQuestId: key });
    }
    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick.bind(this)}>
                <Menu.Item key="1">选择题</Menu.Item>
                <Menu.Item key="2">简答题</Menu.Item>
            </Menu>
        );
        const columns = [{
            title: 'Name', dataIndex: 'name', key: 'name', width: 100,
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
        },
        { title: 'Age', dataIndex: 'age', key: 'age', width: 100, },
        { title: 'Address', dataIndex: 'address', key: 'address', width: 100, }, {
            title: '操作', key: 'action', width: 100,
            render: (text, record, index) => (
                <span>
                    <Dropdown overlay={menu} trigger={['click']} onVisibleChange={() => this.onFoucsQuest(record.key)}>
                        <a className="ant-dropdown-link" style={{ marginLeft: 8 }}>
                            新建题目 <Icon type="down" />
                        </a>
                    </Dropdown>
                    <span className="ant-divider" />
                    <a onClick={() => this.onModifyQuest(record.key)}>修改</a>
                    <span className="ant-divider" />
                    <Popconfirm title="确定要删除该问卷？" onConfirm={() => this.onDeleteQuest(record.key)} okText="删除">
                        <a>删除</a>
                    </Popconfirm>
                </span>),
        }];
        return (
            <div className="modify-quest router">
                <Table /*rowKey="id"*/ columns={columns} dataSource={this.state.data} onRowClick={this.onSelected.bind(this)} bordered title={() => '编辑所有问卷'} />
                <div className="quest-modal">
                    <Modal title="新建选择题" visible={this.state.choice.visible} footer={null}
                        onCancel={this.handleCChoiceCancel.bind(this)}>
                        <CreateChoice questId={this.state.fousQuestId} />
                    </Modal>
                    <Modal title="新建简答题" visible={this.state.completion.visible} footer={null}
                        onCancel={this.handleCCompletionCancel.bind(this)}>
                        <CreateCompletion questId={this.state.fousQuestId} />
                    </Modal>
                </div>
                <div className="quest-detail">
                    <h3><Icon type="file-text" />题目信息</h3>
                    <br />
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span><Icon type="check-circle-o" />单选</span>} key="1">
                            <RadioChoiceDetail questId={this.state.selected} />
                        </TabPane>
                        <TabPane tab={<span><Icon type="check-circle" />多选</span>} key="2">
                            <CheckChoiceDetail questId={this.state.selected} />
                        </TabPane>
                        <TabPane tab={<span><Icon type="message" />问答题</span>} key="3">
                            <CompletionDetail questId={this.state.selected} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default ModifyQuest;