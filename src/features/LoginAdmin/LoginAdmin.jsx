import React, { Component } from 'react';
import '../Login/Login.css';
import { Form, Input, Button } from 'antd';
import { Link, Redirect } from 'react-router-dom';



export default class LoginAdmin extends Component {
    state = { loggedIn: false }

    onFinish = values => {
        console.log('Success:', JSON.stringify(values));
        var axios = require('axios');

        var config = {
            method: 'post',
            url: 'http://localhost/vaccine-manager/api/roles/admin/auth/login.php',
            headers: {
                'Content-Type': 'text/plain'
            },
            data: values
        };
        axios(config)
            .then(function (response) {
                localStorage.setItem('jwt', response.data.jwt);
                window.location = 'http://localhost:3000/admin';
            })
            .catch(function (error) {
                console.log(error);
                alert('Thông tin đăng nhập không đúng');
            });
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    render() {
        // if (this.state.loggedIn) {
        //     window.location = 'http://localhost:3000/userPage/home'
        //     return <Redirect to='/userpage/home' />
        // }
        return (
            <div className="login" >
                <div className="loginForm">
                    <div className="aside">
                        <img src="https://img.freepik.com/free-vector/medications-first-aid-kit_24640-73830.jpg?size=338&ext=jpg" alt="aside"></img>
                    </div>
                    <div className="mainForm">
                        <h1>Log In as Admin </h1>
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                            autoComplete="off"
                            className="myForm"
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="pwd"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit" className="loginBtn">
                                    Log in
                                </Button>
                            </Form.Item>
                            {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <div className="signUpLink">
                                    <Link to='/signup'>Sign Up</Link>
                                </div>
                            </Form.Item> */}
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}
