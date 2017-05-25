import React, { Component } from 'react';
import { render } from 'react-dom';
import { Table, Popconfirm } from 'antd'

import OptionChart from './OptionChart.jsx'

const data = [
    { ChoiceId: 1, ChoiceTitle: 'John Brown', OptionCount: 20, address: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
    { ChoiceId: 2, ChoiceTitle: 'Jim Green', OptionCount: 12, address: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.' },
    { ChoiceId: 3, ChoiceTitle: 'Joe Black', OptionCount: 22 },
];

class ChoiceAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questId: props.questId,
            data: data,
        };
    }

    componentWillMount() {
        this.update(this.props.questId);
    }

    update(questId) {
        var _this = this;
        $.ajax({
            type: 'get',
            url: 'http://localhost:60842/api/Question/GetAllChoiceQuestion',
            data: { questId: questId },
            success: function (data) {
                _this.setState({ data: data })
            }, error: function (error) {
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        let questId = nextProps.questId;
        this.setState({ quest: questId });
    }

    render() {
        const choiceColumns = [
            { title: '题目名', dataIndex: 'ChoiceTitle', key: 'ChoiceTitle' },
            { title: '选项数量', dataIndex: 'OptionCount', key: 'OptionCount' },
        ];
        return (
            <div>
                <br />
                <Table rowKey='ChoiceId'
                    columns={choiceColumns}
                    bordered={true}
                    expandedRowRender={record => (<OptionChart choiceId={record.ChoiceId} />)}
                    dataSource={this.state.data}
                    title={() => "选择题"} />
            </div>
        );
    }
}

export default ChoiceAnswer