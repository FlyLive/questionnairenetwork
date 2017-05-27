import React, { Component } from 'react';
import { render } from 'react-dom';
import { Table, Popconfirm } from 'antd'
import axios from 'axios'

import UserCompletionAnswer from './UserCompletionAnswer.jsx'

class CompletionAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questId: this.props.questId,
            data: [],
        };
    }

    componentWillMount() {
        this.update(this.props.questId);
    }

    componentWillReceiveProps(nextProps){
        var questId = nextProps.questId;
        this.setState({questId:questId})
        this.update(questId);
    }

    update(questId) {
        var _this = this;
        axios.get('http://localhost:60842/api/Question/GetAllCompletion?questId='+ questId )
            .then(function (response) {
                _this.setState({ data: response.data })
            }).catch(function (error) {
            })
    }
    render() {
        const completionColumns = [
            { title: '题目名', dataIndex: 'Title', key: 'Title' },
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