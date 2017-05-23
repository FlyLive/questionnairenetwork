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
    render() {
        const choiceColumns = [
            { title: '题目Id', dataIndex: 'OptionId', key: 'OptionId', width: 100 },
            { title: '题目名称', dataIndex: 'OptionContent', key: 'OptionContent', width: 100 },
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
                    dataSource={this.state.data}
                    title={() => <p style={{ textAlign: "center", margin: 0 }}>选项</p>} />
            </div>
        );
    }
}

export default OptionChart