import React, { Component } from 'react';
import { render } from 'react-dom';
import { Table, Popconfirm, Badge, Progress } from 'antd'

const data = [
    { Id: 1, CreateTime: '2017/5/25', IpAddress: '127.0.0.1', AnswerContent: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
    { Id: 2, CreateTime: '2017/5/25', IpAddress: 'London No. 1 Lake Park', AnswerContent: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.' },
    { Id: 3, CreateTime: '2017/5/25', IpAddress: 'Sidney No. 1 Lake Park', AnswerContent: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.' },
];

class UserCompletionAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completionId: props.completionId,
            data: data,
        };
    }

    componentWillMount() {
        this.update(this.props.completionId)
    }

    update(completionId) {
        var _this = this;
        $.ajax({
            type: 'get',
            url: 'http://localhost:60842/api/Question/',
            data: { completionId: completionId },
            success: function (data) {
                _this.setState({ data: data })
            }, error: function (error) {
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        let completionId = nextProps.completionId;
        this.setState({ completionId: completionId });
    }

    render() {
        const completionAnswerColumns = [
            { title: '参与者IP', dataIndex: 'IpAddress', key: 'IpAddress',width:50},
            { title: '答案', dataIndex: 'AnswerContent', key: 'AnswerContent',width:200},
            { title: '提交时间', dataIndex: 'CreateTime', key: 'CreateTime',width:50}
        ];
        return (
            <div>
                <br />
                <Table rowKey="Id"
                    columns={completionAnswerColumns}
                    bordered={true}
                    pagination={false}
                    scroll={{ y: 240 }}
                    dataSource={this.state.data} />
            </div>
        );
    }
}

export default UserCompletionAnswer