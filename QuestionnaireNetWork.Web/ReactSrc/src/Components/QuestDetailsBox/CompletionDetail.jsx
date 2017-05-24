import React, { Component } from 'react';
import { render } from 'react-dom';
import { Table, Popconfirm, message,Modal,Form,Input,Button } from 'antd'

const FormItem = Form.Item

class CompletionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questId: props.questId,
            focusCompletion: null,
            modifyCompletionModal: false,
            completionTitle: null
        };
    }

    componentWillMount() {
        this.update(this.props.questId);
    }

    update(questId) {
        var _this = this;
        _this.setState({ questId: questId })
        $.ajax({
            type: 'get',
            url: 'http://localhost:60842/api/Question/GetAllCompletion',
            data: { questId: questId },
            success: function (data) {
                _this.setState({ data: data })
            }, error: function (error) {
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        let questId = nextProps.questId;
        this.update(questId);
    }

    onModifyCompletion(completion) {
        this.setState({ modifyCompletionModal: true, focusCompletion: completion, completionTitle: completion.Title })
    }

    completionChange(e) {
        this.setState({ completionTitle: e.target.value })
    }

    handleSubmitModifyCompletion() {
        var id = this.state.selectedOption.OptionId;
        var completionTitle = this.state.completionTitle;
        var _this = this;
        if (completionTitle == "" || /\s+/g.test(completionTitle)) {
            message.error("简答题题目不能为空");
            return false;
        }
        $.ajax({
            type: 'post',
            url: 'http://localhost:60842/api/Question/ModifyCompletion',
            data: { CompletionId: id, Title: completionTitle },
            success: function (data) {
                if (data) {
                    message.success('修改成功');
                    _this.setState({ modifyCompletionModal: false });
                    _this.update(_this.state.questId);
                    return true;
                }
                message.error('修改失败');
            }, error: function (error) {
                message.error('出错了');
            }
        })
    }

    handleCancleModify() {
        this.setState({ modifyCompletionModal: false })
    }

    onDeletCompletion(key) {
        $.ajax({
            type: 'delete',
            url: 'http://localhost:60842/api/Question/DeleteCompletion',
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

    render() {
        const columns = [
            { title: '题目', dataIndex: 'Title', key: 'Title', width: 100 },
            // { title: 'Age', dataIndex: 'age', key: 'age', width: 100 },
            // { title: 'Address', dataIndex: 'address', key: 'address', width: 100 },
            {
                title: '操作', dataIndex: '', width: 100,
                render: (text, record, index) => (
                    <span>
                        <a onClick={() => this.onModifyCompletion(record)}>修改</a>
                        <span className="ant-divider" />
                        <Popconfirm title="确定要删除该问题？" onConfirm={() => this.onDeletCompletion(record.key)} okText="删除">
                            <a>删除</a>
                        </Popconfirm>
                    </span>)
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
                <br />
                <Table rowKey='CompletionId' columns={columns} dataSource={this.state.data} title={() => "简答题"} />
                <Modal title="修改选项" visible={this.state.modifyCompletionModal} footer={null}
                    onCancel={this.handleCancleModify.bind(this)}>
                    <Form>
                        <FormItem {...ModalItemLayout} label="简答题题目">
                            <Input onChange={this.completionChange.bind(this)} placeholder="简答题题目" value={this.state.completionTitle} />
                        </FormItem>
                        <FormItem {...formItemLayoutWithOutLabel}>
                            <Button onClick={this.handleSubmitModifyCompletion.bind(this)} type="primary">确认修改</Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default CompletionDetail