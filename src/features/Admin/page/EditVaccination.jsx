import React, { useState, useEffect } from 'react'
import './edituser.css';
import { Form, Input, Button, DatePicker, Select, Alert } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TextArea from 'rc-textarea';
import moment from 'moment'

export default function EditVaccination() {
    const { Option } = Select;
    const { vacId } = useParams();
    const [vaccine, setvaccine] = useState([]);
    const [centers, setcenters] = useState([]);
    const [check, setcheck] = useState(false);
    const [vaccination, setvaccination] = useState({});
    const [form] = Form.useForm();


    useEffect(() => {
        axios.get('http://localhost/vaccine-manager/api/roles/admin/vaccine/read.php')
            .then(res => {
                const { records } = res.data;
                setvaccine(records);
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost/vaccine-manager/api/roles/admin/health_center/read.php')
            .then(res => {
                const { records } = res.data;
                setcenters(records);
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost/vaccine-manager/api/roles/admin/vaccination/read_one_vaccination.php?id=' + vacId)
            .then(res => {
                setvaccination(res.data);
            },
                err => {
                    console.log(err);
                })
    }, [])

    form.setFieldsValue({
        cccd: vaccination.cccd,
        date: moment(vaccination.date),
        note: vaccination.note,
        health_center_id: vaccination.health_center_id,
        vaccine_id: vaccination.vaccine_id,
        vaccinate_no: vaccination.vaccinate_no
    });


    const onFinish = (values) => {
        values = {
            ...values,
            date: values.date._d.toISOString(),
            id: vacId
        }
        setcheck(true);
        console.log(values);
        axios.post('http://localhost/vaccine-manager/api/roles/admin/vaccination/update_vaccination.php', JSON.stringify(values))
            .then(res => {
                console.log(res);
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className="editUser">
            <h1>Edit Vaccination {vacId}</h1>
            <div className="editorWrapper">
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item><Alert message="Update th??nh c??ng!" type="success" style={{ display: check ? 'block' : 'none' }} className="alert" /></Form.Item>
                    <Form.Item
                        label="S??? CMND"
                        name="cccd"
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng ??i???n ?? n??y',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Ng??y ti??m"
                        name="date"
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng ch???n ng??y',
                            }
                        ]}
                    >
                        <DatePicker />
                    </Form.Item >
                    <Form.Item label="C?? s??? ti??m ch???ng"
                        name='health_center_id'
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng ch???n c?? s???',
                            }
                        ]}>
                        <Select defaultValue='--ch???n c?? s???--' style={{ width: 210 }}>
                            {centers.map(p => <Option key={p.id}>{p.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Lo???i Vaccine"
                        name='vaccine_id'
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng ch???n vaccine',
                            }
                        ]}>
                        <Select defaultValue='--ch???n lo???i vaccine--' style={{ width: 210 }}>
                            {vaccine.map(p => <Option key={p.id}>{p.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="M??i ti??m s???:"
                        name='vaccinate_no'
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng ch???n muix ti??m',
                            }
                        ]}>
                        <Select defaultValue='ch???n m??i ti??m' style={{ width: 210 }}>
                            <Option value='1'>1</Option>
                            <Option value='2'>2</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='Ghi ch??' name='note'>
                        <TextArea maxLength={100}></TextArea>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" className="updateBtn">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div >
    )
}
