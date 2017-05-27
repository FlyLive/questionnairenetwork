import React, { Component } from 'react'
import { render } from 'react-dom'
import { Table, Popconfirm, message, Modal, Form, Tooltip, Input, Button } from "antd"
import axios from 'axios'

const FormItem = Form.Item

class OptionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choiceId: props.choiceId,
            data: [],
            modifyOptionModal: false,
            optionContentEmpty: false,
            selectedOption: null,
            OptionContent: null,
        };
    }

    componentWillMount() {
        var choiceId = this.props.choiceId;
        this.update(choiceId);
    }

    update(choiceId) {
        var _this = this;
        axios.get('http://localhost:60842/api/Question/GetAllOptionByCQId?cqId=' + choiceId)
            .then(function (response) {
                _this.setState({ data: response.data })
            }).catch(function (error) {
            })
    }

    componentWillReceiveProps(nextProps) {
        let choiceId = nextProps.choiceId;
        this.setState({ choiceId: choiceId });
        this.update(choiceId);
    }

    onModifyChoice(option) {
        this.setState({ modifyOptionModal: true, selectedOption: option, OptionContent: option.OptionContent })
    }

    isOptionContentEmpty(e) {
        var optionContent = e.target.value;
        this.setState({ OptionContent: optionContent })
        if (optionContent == "" || /\s+/g.test(optionContent)) {
            this.setState({ optionContentEmpty: true });
            return true;
        }
        this.setState({ optionContentEmpty: false });
    }

    handleSubmitModifyOption(e) {
        var id = this.state.selectedOption.OptionId;
        var optionContent = this.state.OptionContent;
        var _this = this;
        if (optionContent == "" || /\s+/g.test(optionContent)) {
            this.setState({ optionContentEmpty: true });
            return false;
        }

        axios.post('http://localhost:60842/api/Question/ModifyOption',
            { OptionId: id, OptionContent: optionContent })
            .then(function (data) {
                if (data) {
                    message.success('修改成功');
                    _this.setState({ modifyOptionModal: false });
                    _this.update(_this.state.choiceId);
                    return true;
                }
                message.error('修改失败');
            }).catch(function (error) {
                message.error('出错了');
            })
    }

    handleCancleModify() {
        this.setState({ modifyOptionModal: false })
    }

    onDeleteOption(id) {
        var choiceId = this.state.choiceId;
        var _this = this;
        axios.get('http://localhost:60842/api/Question/DeleteOption?id='+ id )
            .then(function (data) {
                if (data) {
                    message.success('删除成功');
                    _this.update(choiceId);
                    return true;
                }
                message.error('删除失败');
            }).catch(function (error) {
                message.error('出错了');
            })
    }
    render() {
        const optionColumns = [
            { title: '选项名', dataIndex: 'OptionContent', key: 'OptionContent',width:100 },
            { title: '操作', dataIndex: '',width:100,
                render: (text, record, index) => (
                    <span>
                        <a onClick={() => this.onModifyChoice(record)}>修改</a>
                        <span className="ant-divider" />
                        <Popconfirm title="确定要删除该选项？" onConfirm={() => this.onDeleteOption(record.OptionId)} okText="删除">
                            <a>删除</a>
                        </Popconfirm>
                    </span>
                )
            },
        ];
        const ModalItemLayout = {
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
            <div>
                <Table rowKey='OptionId'
                    columns={optionColumns}
                    dataSource={this.state.data}
                    pagination={false}
                    bordered
                    scroll={{ y: 240 }}
                    size="small" />
                <Modal title="修改选项" visible={this.state.modifyOptionModal} footer={null}
                    onCancel={this.handleCancleModify.bind(this)}>
                    <Form>
                        <FormItem {...ModalItemLayout} label="选项内容">
                            <Tooltip placement="right" title={"内容不能为空"} visible={this.state.optionContentEmpty}>
                                <Input onChange={this.isOptionContentEmpty.bind(this)} placeholder="选项内容" value={this.state.OptionContent} />
                            </Tooltip>
                        </FormItem>
                        <FormItem {...formItemLayoutWithOutLabel}>
                            <Button onClick={this.handleSubmitModifyOption.bind(this)} type="primary">确认修改</Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default OptionDetail