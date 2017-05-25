import React, { Component } from 'react';
import { render } from 'react-dom';
import { Table, Popconfirm,Card } from 'antd'

const data = [
    { key: 1, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
    { key: 2, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.' },
    { key: 3, name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.' },
];

class UserAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questId: props.questId,
            data: data,
        };
    }
    componentWillReceiveProps(nextProps) {
        let questId = nextProps.questId;
        // $.ajax({
        //     type:'post',
        //     url:'',
        //     data:{},
        //     success:function(){
        //         message.success('修改成功');
        //     },error:function(){
        //         message.error('出错了');
        //     }
        // })
        this.setState({ quest: questId });
    }
    render() {
        const choiceColumns = [
            { title: 'Name', dataIndex: 'name', key: 'name', width: 100 },
            { title: 'Age', dataIndex: 'age', key: 'age', width: 100 },
            { title: 'Address', dataIndex: 'address', key: 'address', width: 100 }
        ];
        return (
            <div>
                <br />
                <Table
                    columns={choiceColumns}
                    bordered={true}
                    dataSource={this.state.data}
                    title={() => "参与者"} />
                <Card title="Card title" bordered={false} style={{ width: 300 }}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </div>
        );
    }
}

export default UserAnswer