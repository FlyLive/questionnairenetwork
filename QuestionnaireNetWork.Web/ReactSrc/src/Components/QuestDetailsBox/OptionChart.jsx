import React, { Component } from 'react';
import { render } from 'react-dom';
import { Table, Popconfirm, Badge, Progress } from 'antd'
import axios from 'axios'

const data = [
    { OptionId: 1, OptionContent: 'John Brown', age: 32, num: 20 },
    { OptionId: 2, OptionContent: 'Jim Green', age: 42, num: 20 },
    { OptionId: 3, OptionContent: 'Joe Black', age: 32, num: 20 },
];

class OptionChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choiceId: props.choiceId,
            data: [],
        };
    }

    componentWillMount() {
        this.update(this.props.choiceId)
    }

    update(choiceId) {
        var _this = this;
        axios.get('http://localhost:60842/api/Admin/GetChoiceAnswer?choiceId=' + choiceId)
            .then(function (response) {
                _this.setState({ data: response.data })
            }).catch(function (error) {
            })
    }

    componentWillReceiveProps(nextProps) {
        let choiceId = nextProps.choiceId;
        this.setState({ choiceId: choiceId });
    }

    render() {
        const choiceColumns = [
            { title: '选项名称', dataIndex: 'OptionContent', key: 'OptionContent', width: 100 },
            {
                title: '百分比', dataIndex: 'Percent', key: 'Percent', width: 100,
                render: (text, record, index) => (
                    <div style={{ textAlign: "center" }}>
                        <Progress type="circle" percent={record.Percent} width={50} />
                    </div>
                )
            },
            { title: '总数', dataIndex: 'Count', key: 'Count', width: 100, }
        ];
        return (
            <div>
                <br />
                <Table rowKey="OptionId"
                    columns={choiceColumns}
                    bordered={true}
                    pagination={false}
                    scroll={{ y: 240 }}
                    dataSource={this.state.data} />
            </div>
        );
    }
}

export default OptionChart