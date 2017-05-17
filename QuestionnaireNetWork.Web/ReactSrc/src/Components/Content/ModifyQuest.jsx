import React, { Component } from 'react';
import { render } from 'react-dom';
import { Menu, Dropdown, Button, Icon, message, Modal } from 'antd';

import CreateChoice from '../QuestionBox/CreateChoice.jsx'
import CreateCompletion from '../QuestionBox/CreateCompletion.jsx'

class ModifyQuest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choice: { visible: false },
            completion: { visible: false }
        }
    }
    handleMenuClick(e) {
        switch (e.key) {
            case '1': this.setState({
                choice: { visible: true },
                completion: { visible: false }
            }); break;
            case '2': this.setState({
                choice: { visible: false },
                completion: { visible: true }
            }); break;
        }
    }
    handleCChoiceCancel(e) {
        this.setState({
                choice: { visible: false },
                completion: { visible: false }
            });
    }
    handleCCompletionCancel(e) {
        this.setState({
                choice: { visible: false },
                completion: { visible: false }
            });
    }
    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick.bind(this)}>
                <Menu.Item key="1">选择题</Menu.Item>
                <Menu.Item key="2">简答题</Menu.Item>
            </Menu>
        );
        return (
            <div>
                ModifyQuest
                <div>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Button style={{ marginLeft: 8 }}>
                            选择新建题目类型 <Icon type="down" />
                        </Button>
                    </Dropdown>
                    <Modal title="新建选择题" visible={this.state.choice.visible} footer={null}
                        onCancel={this.handleCChoiceCancel.bind(this)}>
                        <CreateChoice />
                    </Modal>
                    <Modal title="新建简答题" visible={this.state.completion.visible} footer={null}
                        onCancel={this.handleCCompletionCancel.bind(this)}>
                        <CreateCompletion />
                    </Modal>
                </div>
            </div>
        );
    }
}

export default ModifyQuest;