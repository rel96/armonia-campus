import { Table, Button, Modal, Input, Form } from 'antd';
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";

export function UserTable() {

    const columns = [
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: (name, record) => {
                return (<img src={record.avatar} width="80" height="80" />);
            }
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (name, record) => {
                return (<>
                    <EditTwoTone
                        onClick={() => {
                            setIsEditing(true);
                            setEditingUser(record);
                        }} />
                    <DeleteTwoTone
                        onClick={() => {
                            handleDelete(record.id)
                        }}
                    />
                </>)
            }
        }
    ];

    const [editform] = Form.useForm();
    const [addform] = Form.useForm();
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingUser, setEditingUser] = useState();
    const [users, setUsers] = useState([]);
    const url = `https://62c96230d9ead251e8baf02e.mockapi.io/campus/users`;

    const handleSubmit = async (user) => {
        const { status } = await axios.post(url, user);
        console.log(status);
        if (status === 201)
            fetchData();
        addform.resetFields();
    }

    const handleEdit = async (user) => {
        const { status } = await axios.put(url + "/" + user.id, user)
        if (status === 200)
            fetchData();
        editform.resetFields();
    }

    const handleDelete = (id) => {
        Modal.confirm({
            title: "Sei sicuro di voler rimuovere questo utente?",
            okText: "Conferma",
            cancelText: "Annulla",
            okType: "danger",
            onOk: async () => {
                try {
                    const { status } = await axios.delete(url + `/${id}`)
                    if (status === 200) {
                        fetchData();
                    }
                }
                catch (e) {
                    console.log("error" + e);
                }
            }
        });
    }

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const { data, status } = await axios.get(url)
            if (status === 200)
                setUsers(Object.values(data));
        }
        catch (e) {
            console.log("error: " + e)
        }
    }

    const onEditFinish = (values) => {
        let editedUser = editingUser;
        if (values.name !== "" && values.name !== undefined)
            editedUser.name = values.name;
        if (values.avatar !== "" && values.avatar !== undefined)
            editedUser.avatar = values.avatar;
        handleEdit(editedUser);
    }

    const onEditFinishFailed = (errorInfo) => {
        console.log("Failed: ", errorInfo);
    }

    const onCreateFinish = (values) => {
        values.createdAt = new Date().toISOString();
        handleSubmit(values);
    };

    const onCreateFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (<>
        <Button
            type="primary"
            onClick={() => { setIsCreating(true) }}
            block={true}>
            Aggiungi un nuovo utente
        </Button>
        <Modal
            title="Aggiungi nuovo utente"
            visible={isCreating}
            footer={null}
            closable={false}
        >
            <Form
                form={addform}
                name="addform"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onCreateFinish}
                onFinishFailed={onCreateFinishFailed}
                autoComplete="off">
                <Form.Item
                    label="Nome e cognome"
                    name="name"
                    rules={[{ required: true, message: "Inserire il proprio nome completo!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Immagine di profilo"
                    name="avatar"
                    rules={[{ required: true, message: "Inserisci l'URL dell'immagine di profilo!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() => { setIsCreating(false) }}
                    >
                        Aggiungi utente
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="default"
                        onClick={() => { setIsCreating(false) }}
                    >
                        Annulla
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
        <Modal
            title="Modifica utente"
            visible={isEditing}
            footer={null}
            closable={false}
        >
            <Form
                form={editform}
                name="editform"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onEditFinish}
                onFinishFailed={onEditFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Nome e cognome"
                    name="name"
                    rules={[{ required: false }]}
                >
                    <Input placeholder={editingUser?.name} />
                </Form.Item>
                <Form.Item
                    label="URL Avatar"
                    name="avatar"
                    rules={[{ required: false }]}
                >
                    <Input placeholder={editingUser?.avatar} />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() => {
                            setIsEditing(false);
                        }}
                    >
                        Modifica utente
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="default"
                        onClick={() => {
                            setIsEditing(false);
                        }}
                    >
                        Annulla
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
        <Table
            dataSource={users}
            columns={columns}
            rowKey="id"
        />
    </>);
}

export default UserTable;