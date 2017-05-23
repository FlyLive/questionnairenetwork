import React, { Component } from 'react';
import { render } from 'react-dom';
import { Table } from 'antd'

import OptionDetail from './OptionDetail.jsx'

const data = [
    { key: 1, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
    { key: 2, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.' },
    { key: 3, name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.' },
];

class CheckChoiceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questId: props.questId,
            data: [],
        };
    }
    componentWillMount(){
        // $.ajax({
        //     type:'post',
        //     url:'',
        //     data:{},
        //     success:function(data){
        //         this.setState({data:data})
        //     },error:function(){
        //     }
        // })
    }
    componentWillReceiveProps(nextProps) {
        let questId = nextProps.questId;
        this.setState({ quest: questId });
    }
    onModifyChoice(text, record) {
        alert(record.name);
    }
    render() {
        const choiceColumns = [
            { title: 'Name', dataIndex: 'name', key: 'name', width: 100 },
            { title: 'Age', dataIndex: 'age', key: 'age', width: 100 },
            { title: 'Address', dataIndex: 'address', key: 'address', width: 100 },
            {
                title: '操作', dataIndex: '', width: 100,
                render: (text, record) => (
                    <span>
                        <a >修改</a>
                        <span className="ant-divider" />
                        <a >删除</a>
                    </span>)
            },
        ];
        return (
            <div>
                <br />
                <Table
                    columns={choiceColumns}
                    bordered={true}
                    expandedRowRender={record => (<OptionDetail choiceId={record.key}/>)}
                    dataSource={this.state.data}
                    title={() => "多选题"} />
            </div>
        );
    }
}

export default CheckChoiceDetail