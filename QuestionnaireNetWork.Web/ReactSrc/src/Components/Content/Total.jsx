import React, { Component } from 'react';
import { render } from 'react-dom';
import { Input, Button, Icon, message, Table, Tabs, Progress, Badge } from 'antd'

const TabPane = Tabs.TabPane

const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    name: 'Jim Green',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}, {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
}];

class Total extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterDropdownVisible: false,
            data,
            searchText: '',
            filtered: false,
            selected: data == null ? null : data[0].key,
        }
    }
    onInputChange(e) {
        this.setState({ searchText: e.target.value });
    }
    onSearch() {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: data.map((record) => {
                const match = record.name.match(reg);
                if (!match) {
                    return null;
                }
                record.name = (
                    <span>
                        {record.name.split(reg).map((text, i) => (
                            i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                        ))}
                    </span>
                );
                return record;
            }).filter(record => !!record),
        });
    }
    onSelected(record, index) {
        this.setState({ selected: record.key });
    }
    render() {
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 100,
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInput = ele}
                        placeholder="Search name"
                        value={this.state.searchText}
                        onChange={this.onInputChange.bind(this)}
                        onPressEnter={this.onSearch.bind(this)}
                    />
                    <Button type="primary" onClick={this.onSearch.bind(this)}>搜索</Button>
                </div>
            ),
            filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }, () => this.searchInput.focus()),
        }, {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: 100,
        }, {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: 100,
        }];
        return (
            <div className="Total router">
                <Table /*rowKey="id"*/ columns={columns} dataSource={this.state.data} onRowClick={this.onSelected.bind(this)} bordered title={() => '查看问卷结果'} />
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><Icon type="pie-chart" />图表类</span>} key="1">
                        <Badge count={5}>
                        <Progress type="circle" percent={80} width={80}/>
                        </Badge>
                    </TabPane>
                    <TabPane tab={<span><Icon type="bars" />详细数据</span>} key="2">
                        {this.state.selected}
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Total;