import React, { Component } from 'react';
import { render } from 'react-dom';
import { InputNumber,Menu, Dropdown, Button, Icon, Input, message, Modal, Table, Tabs, Progress, Popconfirm,Form } from 'antd';
import axios from 'axios'

import CreateChoice from '../CreateQuestBox/CreateChoice.jsx'
import CreateCompletion from '../CreateQuestBox/CreateCompletion.jsx'
import CheckChoiceDetail from './CheckChoiceDetail.jsx'
import CompletionDetail from './CompletionDetail.jsx'

const TabPane = Tabs.TabPane
const FormItem = Form.Item

class QuestDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choice: { visible: false },
            completion: { visible: false },
            modifyQuestModal: false,
            filterDropdownVisible: false,
            data: [],
            searchResult: [],
            searchText: '',
            filtered: false,
            selected: null,
            focusQuestId: null,
            focusQuest: null,
            focusQuestTitle: null
        }
    }

    componentWillMount() {
        this.update();
    }

    update() {
        const _this = this;
        axios.get('http://localhost:50979/api/Questionnaire/GetAllQuest')
            .then(function (response) {
                _this.setState({ data: response.data, searchResult: response.data })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onInputChange(e) {
        this.setState({ searchText: e.target.value });
    }

    onSearch() {
        const { searchText, data } = this.state;
        const reg = new RegExp(searchText, 'gi');
        alert(reg);
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            searchResult: data.map((quest, index, array) => {
                const match = quest.QuestTitle.match(reg);
                if (!match) {
                    return null;
                }
                /*quest.QuestTitle = (
                    <span>
                        {quest.QuestTitle.split(reg).map((text, i) => (
                            i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                        ))}
                    </span>
                );*/
                return quest;
            }).filter(quest => !!quest),
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
        this.setState({ selected: record.QId });
    }

    onDeleteQuest(id) {
        $.ajax({
            type: 'delete',
            url: 'http://localhost:50979/api/Questionnaire/DeleteQuest',
            data: { "": id },
            success: function (data) {
                if (data) {
                    message.success('删除成功');
                    return true;
                }
                message.error('删除失败');
            }, error: function () {
                message.error('出错了');
            }
        })
    }

    onModifyQuest(quest) {
        this.setState({ modifyQuestModal: true, focusQuest: quest, focusQuestTitle: quest.QuestTitle })
    }

    handleSubmitModifyQuest() {
        const {form} = this.props;
        var qId = this.state.focusQuest.QId;
        var questTitle = form.getFieldValue("title")
        var maxNum = form.getFieldValue("maxNum");
        var _this = this;
        if(form.getFieldError("title")/*questTitle == "" || /\s+/g.test(questTitle)*/){
            
            return false;
        }
        $.ajax({
            type: 'post',
            url: 'http://localhost:50979/api/Questionnaire/ModifyQuest',
            data: { QId: qId, QuestTitle: questTitle, MaxQuestNum: maxNum },
            success: function (data) {
                if (data) {
                    message.success('修改成功');
                    _this.setState({modifyQuestModal:false});
                    _this.update();
                    return true;
                }
                message.error('修改失败');
            }, error: function (error) {
                message.error('出错了');
            }
        })
    }

    handleCancleModify(){
        this.setState({modifyQuestModal:false})
    }

    onFoucsQuest(id) {
        this.setState({ focusQuestId: id });
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const menu = (
            <Menu onClick={this.handleMenuClick.bind(this)}>
                <Menu.Item key="1">选择题</Menu.Item>
                <Menu.Item key="2">简答题</Menu.Item>
            </Menu>
        );
        const columns = [{
            title: '问卷名', dataIndex: 'QuestTitle', key: 'QuestTitle', width: 100,
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
        { title: '最大题数', dataIndex: 'MaxQuestNum', key: 'MaxQuestNum', width: 100, },
        { title: '创建时间', dataIndex: 'CreateTime', key: 'CreateTime', width: 100, }, {
            title: '操作', key: '', width: 100,
            render: (text, record, index) => (
                <span>
                    <Dropdown key={record.QId} overlay={menu} trigger={['click']} onVisibleChange={this.onFoucsQuest.bind(this, record.QId)}>
                        <a className="ant-dropdown-link" style={{ marginLeft: 8 }}>
                            新建题目 <Icon type="down" />
                        </a>
                    </Dropdown>
                    <span className="ant-divider" />
                    <a onClick={() => this.onModifyQuest(record)}>修改</a>
                    <span className="ant-divider" />
                    <Popconfirm title="确定要删除该问卷？" onConfirm={() => this.onDeleteQuest(record.QId)} okText="删除">
                        <a>删除</a>
                    </Popconfirm>
                </span>),
        }];
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        };

        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };

        return (
            <div className="modify-quest router">
                <Table rowKey="QId" columns={columns} dataSource={this.state.searchResult} onRowClick={this.onSelected.bind(this)} bordered title={() => '编辑所有问卷'} />
                <div className="quest-modal">
                    <Modal title="修改问卷" visible={this.state.modifyQuestModal} footer={null}
                        onCancel={this.handleCancleModify.bind(this)}>
                        <Form>
                            <FormItem {...formItemLayout} label="正在修改问卷:" >
                                <label> {this.state.focusQuestTitle}</label>
                            </FormItem>
                            <FormItem label="问卷名称" {...formItemLayout} wrapperCol={{ span: 10 }}>
                                {getFieldDecorator('title', {
                                    rules: [{ required: true, message: '请输入问卷名称!', whitespace: true }],
                                })(<Input placeholder="问卷名称" />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="最大题目数(自动匹配)" >
                                {getFieldDecorator('maxNum')(<InputNumber min={1} max={30} placeholder="1~30" />)}
                                <span className="ant-form-text">个题目</span>
                            </FormItem>
                            <FormItem {...formItemLayoutWithOutLabel}>
                                <Button type="primary" onClick={this.handleSubmitModifyQuest.bind(this)} size="large">提交</Button>
                            </FormItem>
                        </Form>
                    </Modal>
                    <Modal title="新建选择题" visible={this.state.choice.visible} footer={null}
                        onCancel={this.handleCChoiceCancel.bind(this)}>
                        <CreateChoice questId={this.state.focusQuestId} />
                    </Modal>
                    <Modal title="新建简答题" visible={this.state.completion.visible} footer={null}
                        onCancel={this.handleCCompletionCancel.bind(this)}>
                        <CreateCompletion questId={this.state.focusQuestId} />
                    </Modal>
                </div>
                <div className="quest-detail">
                    <h3><Icon type="file-text" />题目信息</h3>
                    <br />
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span><Icon type="check-circle" />选择题</span>} key="1">
                            <CheckChoiceDetail questId={this.state.selected} />
                        </TabPane>
                        <TabPane tab={<span><Icon type="message" />问答题</span>} key="2">
                            <CompletionDetail questId={this.state.selected} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default Form.create()(QuestDetail);