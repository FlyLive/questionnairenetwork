import React, { Component } from 'react';
import { render } from 'react-dom';
import { Table, Popconfirm, Badge, Progress } from 'antd'

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
            url: 'http://localhost:60842/api/Question/',
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
        const choiceColumns = [
            { title: '选项名称', dataIndex: 'OptionContent', key: 'OptionContent', width: 100 },
            {
                title: '百分比', dataIndex: 'age', key: 'age', width: 100,
                render: (text, record, index) => (
                    <div style={{ textAlign: "center" }}>
                        <Progress type="circle" percent={20} width={50} />
                    </div>
                )
            },
            { title: '总数', dataIndex: 'num', key: 'num', width: 100, }
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