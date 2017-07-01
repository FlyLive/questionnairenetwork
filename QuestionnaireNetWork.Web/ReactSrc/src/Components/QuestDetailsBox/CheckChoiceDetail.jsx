import React, { Component } from 'react';
import { render } from 'react-dom';
import { Table, Popconfirm, message, Form, Tooltip, Input, Button, Icon, Modal, Switch } from 'antd'
import axios from 'axios'

import OptionDetail from './OptionDetail.jsx'

const FormItem = Form.Item

let uuid = 1;
class CheckChoiceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            createOptionModal: false,
            modifyChoiceModal: false,
            selectedChoice: { Type: false },
            selectedChoiceTitle: [],
            choiceTitleInput: [],
            choiceTypeInput: []
        };
    }

    componentDidMount() {
        this.update(this.props.questId);
        var token = $.cookie('token');
        var mytoken = JSON.parse(token);
        axios.defaults.headers.common['Authorization'] = "Bearer " + mytoken.access_token;
    }

    update(questId) {
        var _this = this;
        axios.get('http://localhost:60842/api/Question/GetAllChoiceQuestion?questId=' + questId)
            .then(function (response) {
                _this.setState({ data: response.data })
            })
            .catch(function (response) {
                console.log(response);
            });
    }

    componentWillReceiveProps(nextProps) {
        let questId = nextProps.questId;
        this.update(questId);
    }

    onAddOption(choice) {
        this.setState({ selectedChoice: choice, selectedChoiceTitle: choice.ChoiceTitle, createOptionModal: true })
    }

    remove(k) {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add(e) {
        uuid++;
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    handleSubmitCreateOptions(e) {
        e.preventDefault();
        var _this = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var choiceId = this.state.selectedChoice.ChoiceId;
                if (choiceId == undefined) {
                    message.error("出错啦");
                    return false;
                }

                var options = new Array();
                const { form } = this.props;
                const keys = form.getFieldValue('keys');
                if (keys.length <= 0) {
                    message.error("请至少添加一个选项");
                    return false;
                }
                keys.filter(key => options.push(values["names-" + key]));

                var token = $.cookie('token');
                var mytoken = JSON.parse(token);
                if (mytoken == null) {
                    window.location.href = '/#/'
                }
                $.ajax({
                    type: 'post',
                    url: 'http://localhost:60842/api/Question/CreateOption',
                    headers: { Authorization: "Bearer " + mytoken.access_token },
                    contentType: 'application/json',
                    data: JSON.stringify({ ChoiceId: choiceId, Options: options }),
                    success: function (data) {
                        if (data) {
                            message.success("添加成功");
                            _this.props.form.resetFields();
                            return true;
                        }
                        message.error("添加失败")
                    },
                    error: function (error) {
                        message.error("出错了")
                    }
                })

            }
        });
    }

    handleCancleCreate() {
        this.setState({ createOptionModal: false })
    }

    onModifyChoice(choice) {
        this.setState({ selectedChoice: choice,choiceTypeInput:choice.Type,choiceTitleInput:choice.ChoiceTitle, selectedChoiceTitle: choice.ChoiceTitle, modifyChoiceModal: true })
    }

    switchType(e) {
        this.setState({ choiceTypeInput: e })
    }

    onChangeChoiceTitle(e) {
        this.setState({ choiceTitleInput: e.target.value })
    }

    handleSubmitModifyChoice() {
        var choiceId = this.state.selectedChoice.ChoiceId;
        var choiceTitle = this.state.choiceTitleInput;
        var type = this.state.choiceTypeInput;
        var _this = this;

        if (choiceTitle == "" || /\s+/g.test(choiceTitle)) {
            message.error("请输入题目标题");
            return false;
        }
        axios.post('http://localhost:60842/api/Question/ModifyChoiceQuestion',
            { ChoiceId: choiceId, ChoiceTitle: choiceTitle, Type: type })
            .then(function (response) {
                if (response.data) {
                    message.success("修改成功");
                    _this.update(_this.state.selectedChoice.QId);
                    return true;
                }
                message.error("修改失败")
            })
            .catch(function (response) {
                console.log(response);
                message.error("出错了")
            });
    }

    handleCancleModifyChoice() {
        this.setState({ modifyChoiceModal: false })
    }

    onDeleteChoice(choiceId) {
        var _this = this;
        axios.get('http://localhost:60842/api/Question/DeleteChoiceQuestion?id=' + choiceId)
            .then(function (response) {
                if (response.data) {
                    message.success('删除成功');
                    _this.update(_this.state.selectedChoice.QId);
                    return true;
                }
                message.error('删除失败');
            })
            .catch(function (response) {
                console.log(response);
                message.error("出错了")
            });
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form
        const choiceColumns = [
            { title: '题目', dataIndex: 'ChoiceTitle', key: 'ChoiceTitle' },
            {
                title: '类型', dataIndex: 'Type', key: 'Type',
                render: (text, record) => (
                    record.Type ? (<span>多选</span>) : (<span>单选</span>))
            },
            {
                title: '操作', dataIndex: '',
                render: (text, record) => (
                    <span>
                        <a onClick={() => this.onAddOption(record)}>添加选项</a>
                        <span className="ant-divider" />
                        <a onClick={() => this.onModifyChoice(record)}>修改</a>
                        <span className="ant-divider" />
                        <Popconfirm title="确定要删除该问题？" onConfirm={() => this.onDeleteChoice(record.ChoiceId)} okText="删除">
                            <a>删除</a>
                        </Popconfirm>
                    </span>)
            },
        ];

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

        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <FormItem {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel) }
                    label={index === 0 ? '选项' : ''} required={false} key={k}>
                    {getFieldDecorator(`names-${k}`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{ required: true, whitespace: true, message: "请输入选项内容或删除该选项.", }],
                    })(<Input placeholder="选项内容" style={{ width: '60%', marginRight: 8 }} />)}
                    <Icon className="dynamic-delete-button" type="minus-circle-o"
                        disabled={keys.length === 1} onClick={() => this.remove(k)} />
                </FormItem>
            );
        });
        return (
            <div>
                <br />
                <Table rowKey='ChoiceId'
                    columns={choiceColumns}
                    bordered={true}
                    expandedRowRender={record => (<OptionDetail choiceId={record.ChoiceId} />)}
                    dataSource={this.state.data}
                    title={() => "选择题"} />
                <Modal title="修改问题" visible={this.state.modifyChoiceModal} footer={null}
                    onCancel={this.handleCancleModifyChoice.bind(this)}>
                    <Form>
                        <FormItem {...formItemLayout} label="正在修改问卷:" >
                            <h2> {this.state.selectedChoiceTitle}</h2>
                        </FormItem>
                        <FormItem label="问题内容" {...formItemLayout} wrapperCol={{ span: 10 }}>
                            <Input placeholder="问题内容" onChange={this.onChangeChoiceTitle.bind(this)} value={this.state.choiceTitleInput} />
                        </FormItem>
                        <FormItem label="多选题" {...formItemLayout}>
                            <Switch onChange={this.switchType.bind(this)} checked={this.state.choiceTypeInput} />
                        </FormItem>
                        <FormItem {...formItemLayoutWithOutLabel}>
                            <Button type="primary" onClick={this.handleSubmitModifyChoice.bind(this)} size="large">提交</Button>
                        </FormItem>
                    </Form>
                </Modal>
                <Modal title="添加选项" visible={this.state.createOptionModal} footer={null}
                    onCancel={this.handleCancleCreate.bind(this)}>
                    <Form>
                        <FormItem {...formItemLayout} label="将添加至题目:" >
                            <label> {this.state.selectedChoiceTitle}</label>
                        </FormItem>
                        {formItems}
                        <FormItem {...formItemLayoutWithOutLabel}>
                            <Button type="dashed" onClick={this.add.bind(this)} style={{ width: '60%' }}>
                                <Icon type="plus" />添加选项
                            </Button>
                        </FormItem>
                        <FormItem {...formItemLayoutWithOutLabel}>
                            <Button type="primary" onClick={this.handleSubmitCreateOptions.bind(this)} size="large">提交</Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(CheckChoiceDetail)