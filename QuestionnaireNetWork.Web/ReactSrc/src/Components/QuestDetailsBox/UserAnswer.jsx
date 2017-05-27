import React, { Component } from 'react';
import { render } from 'react-dom';
import { Table, Popconfirm, Card } from 'antd'
import axios from 'axios'

import UserAnswerDetail from './UserAnswerDetail.jsx'

class UserAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questId: this.props.questId,
            data: [],
            selected: null,
        };
    }

    componentWillMount() {
        this.update(this.props.questId)
    }

    update(questId) {
        var _this = this;
        axios.get('http://localhost:60842/api/Admin/GetAnswers?questId=' + questId)
            .then(function (response) {
                _this.setState({ data: response.data })
            }).catch(function (error) {
            })
    }

    componentWillReceiveProps(nextProps) {
        let questId = nextProps.questId;
        this.setState({ quest: questId });
        this.update(questId);
    }

    handleChangeSelected(record, index) {
        this.setState({ selected: record.AnswerId });
    }

    render() {
        const choiceColumns = [
            { title: 'IpAddress', dataIndex: 'IpAddress', key: 'IpAddress', width: 100 },
            { title: '创建时间', dataIndex: 'CreateTime', key: 'CreateTime', width: 100 },
        ];
        return (
            <div>
                <br />
                <Table rowKey='AnswerId'
                    onRowClick={this.handleChangeSelected.bind(this)}
                    columns={choiceColumns}
                    bordered={true}
                    dataSource={this.state.data}
                    title={() => "参与者"} />
                <UserAnswerDetail answerId={this.state.selected} />
                <br />
            </div>
        );
    }
}

export default UserAnswer