import React, { Component } from 'react';
import { render } from 'react-dom';
import { Table, Popconfirm } from 'antd'

import OptionDetail from '../QuestionBox/OptionDetail.jsx'

const data = [
    { key: 1, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
    { key: 2, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.' },
    { key: 3, name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.' },
];

class RadioChoiceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questId: props.questId,
            data: data,
        };
    }
    componentWillReceiveProps(nextProps) {
        let questId = nextProps.questId;
        this.setState({ quest: questId });
    }
    onModifyChoice(key) {
        alert(key);
    }
    onDeletChoice(key) {
        alert(key);
        $.ajax({
            type:'post',
            url:'',
            data:{},
            success:function(){

            },error:function(){
                
            }
        })
    }
    render() {
        const choiceColumns = [
            { title: 'Name', dataIndex: 'name', key: 'name', width: 100 },
            { title: 'Age', dataIndex: 'age', key: 'age', width: 100 },
            { title: 'Address', dataIndex: 'address', key: 'address', width: 100 },
            {
                title: '操作', dataIndex: '', width: 100,
                render: (text, record, index) => (<span>
                    <a onClick={() => this.onModifyChoice(record.key)}>修改</a>
                    <span className="ant-divider" />
                    <Popconfirm title="确定要删除该问题？" onConfirm={() => this.onDeletChoice(record.key)} okText="删除">
                        <a>删除</a>
                    </Popconfirm>
                </span>
                )
            },
        ];
        return (
            <div>
                <br />
                <Table
                    columns={choiceColumns}
                    bordered={true}
                    expandedRowRender={record => (<OptionDetail choiceId={record.key} />)}
                    dataSource={this.state.data}
                    title={() => "单选"} />
            </div>
        );
    }
}

export default RadioChoiceDetail