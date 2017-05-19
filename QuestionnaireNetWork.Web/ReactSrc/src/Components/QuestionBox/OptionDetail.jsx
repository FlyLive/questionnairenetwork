import React, { Component } from 'react'
import { render } from 'react-dom'
import { Table,Popconfirm } from "antd"

const data = [
    { key: 1, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
    { key: 2, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.' },
    { key: 3, name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.' },

    { key: 4, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
    { key: 5, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.' },
    { key: 6, name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.' },

    { key: 7, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
    { key: 8, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.' },
    { key: 9, name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.' },

    { key: 10, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
    { key: 11, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.' },
    { key: 12, name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.' },
];

class OptionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choiceId: props.choiceId,
            data: data,
        };
    }
    componentWillReceiveProps(nextProps) {
        let choiceId = nextProps.choiceId;
        this.setState({ choiceId: choiceId });
    }
    onModifyChoice(key) {
        alert(key);
    }
    onDeletOption(key){
        alert(key);
    }
    render() {
        const optionColumns = [
            { title: 'Name', dataIndex: 'name', key: 'name', width: 100 },
            { title: 'Age', dataIndex: 'age', key: 'age', width: 100 },
            { title: 'Address', dataIndex: 'address', key: 'address', width: 100 },
            {
                title: '操作', dataIndex: '', width: 100,
                render: (text, record,index) => (
                <span>
                    <a onClick={() => this.onModifyChoice(record.key)}>修改</a>
                    <span className="ant-divider" />
                    <Popconfirm title="确定要删除该选项？" onConfirm={() => this.onDeletOption(record.key)} okText="删除">
                        <a>删除</a>
                    </Popconfirm>
                </span>
                )
            },
        ];
        return (
            <Table columns={optionColumns}
                dataSource={this.state.data}
                pagination={false}
                scroll={{ y: 240 }}
                size="small"
                title={() => <p style={{ textAlign: "center" }}>选项</p>} />
        );
    }
}

export default OptionDetail