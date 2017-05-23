import React, { Component } from 'react';
import { render } from 'react-dom';
import { Table, Popconfirm } from 'antd'

const data = [
    { key: 1, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
    { key: 2, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
    { key: 3, name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park' },
];
class CompletionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questId: props.questId,
            data: data,
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
    onModifyCompleion(key) {

    }
    onDeletCompletion(key) {

    }
    render() {
        const columns = [
            { title: 'Name', dataIndex: 'name', key: 'name', width: 100 },
            { title: 'Age', dataIndex: 'age', key: 'age', width: 100 },
            { title: 'Address', dataIndex: 'address', key: 'address', width: 100 },
            {
                title: '操作', dataIndex: '', width: 100,
                render: (text, record, index) => (
                    <span>
                        <a onClick={() => this.onModifyCompleion(record.key)}>修改</a>
                        <span className="ant-divider" />
                        <Popconfirm title="确定要删除该问题？" onConfirm={() => this.onDeletCompletion(record.key)} okText="删除">
                            <a>删除</a>
                        </Popconfirm>
                    </span>)
            },
        ];

        return (
            <div>
                <br />
                <Table columns={columns} dataSource={this.state.data} title={() => "简答题"} />
            </div>
        );
    }
}

export default CompletionDetail