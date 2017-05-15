import React, { Component } from 'react';
import { render } from 'react-dom';
import {Button } from 'antd'
import $ from 'jquery'
import axios from 'axios'

class AdminInfo extends Component{
    constructor(props){
        super(props);
        this.state = { admin : []};
    }
    componentWillMount(){
        $.ajax({
            type:'get',
            url:'http://localhost:50979/api/values',
            dataType:'json',
            success:function(data){
            },
            error:function(){

            }
        });
    }
    handleClick(e){
        var nick = $("#nick").val();
        $.ajax({
            type:'post',
            url:'http://localhost:50979/api/values',
            data:{"nickName":nick},
            success:function(data){
                if(data == 'true'){
                    this.state.admin.nickName = nick;
                    return true;
                }
                
            },
            error:function(){
            }
        })
    }

    render(){
        return (
            <div className="admin-info">
                AdminInfo
                <div className="info-item"></div>
                <div className="info-item"></div>
                <div className="info-item"></div>
                <Button onClick={this.handleClick.bind(this)} type="primary">确认修改</Button>
            </div>
        );
    }
}

export default AdminInfo;