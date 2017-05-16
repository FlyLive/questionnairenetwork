import React, { Component } from 'react';
import { render } from 'react-dom';
import { Menu, Dropdown, Button, Icon, message } from 'antd';

const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">选择题</Menu.Item>
        <Menu.Item key="2">简答题</Menu.Item>
    </Menu>
);

function handleMenuClick(e) {
    alert(e.key);
}

class ModifyQuest extends Component{

    render(){
        return(
            <div>
                ModifyQuest
                <div>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Button style={{ marginLeft: 8 }}>
                            选择类型 <Icon type="down" />
                        </Button>
                    </Dropdown>
                </div>
            </div>
        );
    }
}

export default ModifyQuest;