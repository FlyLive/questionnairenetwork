import React, { Component } from 'react';
import { render } from 'react-dom';
import { Table, Popconfirm } from 'antd'

import UserCompletionAnswer from './UserCompletionAnswer.jsx'

const data = [
    { CompletionId: 1, Title: 'John Brown', OptionNum: 20, address: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
    { CompletionId: 2, Title: 'Jim Green', OptionNum: 12, address: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.' },
    { CompletionId: 3, Title: 'Joe Black', OptionNum: 22},
];

class CompletionAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choiceId: props.choiceId,
            data: data,
        };
    }

    componentWillMount() {
        this.update(this.props.choiceId)
    }

    update(choiceId) {
        var _this = this;
        $.ajax({
            type: 'get',
            url: 'http://localhost:60842/api/Question/GetAllCompletion',
            data: { choiceId: choiceId },
            success: function (data) {
                _this.setState({ data: data })
            }, error: function (error) {
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        let choiceId = nextProps.choiceId;
        this.setState({ choiceId: choiceId });
    }

    render() {
        const completionColumns = [
            { title: '题目名', dataIndex: 'Title', key: 'Title'},
        ];
        return (
            <div>
                <br />
                <Table rowKey='CompletionId'
                    columns={completionColumns}
                    bordered={true}
                    expandedRowRender={completion => (<UserCompletionAnswer completionId={completion.CompletionId} />)}
                    dataSource={this.state.data}
                    title={() => "简答题"} />
            </div>
        );
    }
}

export default CompletionAnswer