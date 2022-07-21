import { Table, Button, Modal, Input, Form } from 'antd';
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";

export function BookTable() {
    const columns = [
        {
            title: "Copertina",
            dataIndex: "cover",
            key: "picture",
            render: (name, record) => {
                return (<img src={record.picture} width="64" height="48" />);
            }
        },
        {
            title: "Titolo del libro",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Dove acquistare",
            dataIndex: "buyUrl",
            key: "buyurl",
            render: (name, record) => {
                return (<a href={record.buyUrl}>{record.buyUrl}</a>)
            }
        },
        {
            title: "Azioni",
            dataIndex: "actions",
            key: "actions",
            render: (name, record) => {
                return (<>
                    <EditTwoTone
                        onClick={() => {
                            setIsEditing(true);
                            setEditingBook(record);
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

    const sellerId = 44;
    const [editform] = Form.useForm();
    const [addform] = Form.useForm();
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingBook, setEditingBook] = useState();
    const [books, setBooks] = useState([]);
    const url = `https://62c96230d9ead251e8baf02e.mockapi.io/campus/articles`;

    const handleSubmit = async (book) => {
        const { status } = await axios.post(url, book);
        console.log(status);
        if (status === 201)
            fetchData();
        addform.resetFields();
    }

    const handleEdit = async (book) => {
        const { status } = await axios.put(url + "/" + book.id, book)
        if (status === 200)
            fetchData();
        editform.resetFields();
    }

    const handleDelete = (id) => {
        Modal.confirm({
            title: "Sei sicuro di voler rimuovere questo libro?",
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
                setBooks(Object.values(data));
        }
        catch (e) {
            console.log("error: " + e);
        }
    }

    const onEditFinish = (values) => {
        let editedBook = editingBook;
        if (values.buyUrl !== "" && values.buyUrl !== undefined)
            editedBook.buyUrl = values.buyUrl;
        if (values.name !== "" && values.name !== undefined)
            editedBook.name = values.name;
        if (values.picture !== "" && values.picture !== undefined)
            editedBook.picture = values.picture;
        if (values.description !== "" && values.description !== undefined)
            editedBook.description = values.description;
        editedBook.sellerId = sellerId;
        handleEdit(editedBook);
    }

    const onEditFinishFailed = (errorInfo) => {
        console.log("Failed: ", errorInfo);
    }

    const onCreateFinish = (values) => {
        values.sellerId = sellerId;
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
            Aggiungi un libro alla collezione
        </Button>
        <Modal
            title="Aggiungi nuovo libro"
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
                    label="Titolo"
                    name="name"
                    rules={[{ required: true, message: "Inserisci il titolo del libro!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="URL copertina"
                    name="picture"
                    rules={[{ required: true, message: "Inserisci l'URL della copertina!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Indirizzo venditore"
                    name="buyUrl"
                    rules={[{ required: true, message: "Inserisci l'indirizzo del venditore!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Descrizione"
                    name="description"
                    rules={[{ required: true, message: "Inserisci una descrizione per il libro" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() => { setIsCreating(false) }}

                    >
                        Aggiungi libro
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
            title="Modifica libro"
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
                    label="Titolo"
                    name="name"
                    rules={[{ required: false }]}
                >
                    <Input defaultValue={editingBook?.name} />
                </Form.Item>
                <Form.Item
                    label="URL copertina"
                    name="picture"
                    rules={[{ required: false }]}
                >
                    <Input defaultValue={editingBook?.picture} />
                </Form.Item>
                <Form.Item
                    label="Indirizzo venditore"
                    name="buyUrl"
                    rules={[{ required: false }]}
                >
                    <Input defaultValue={editingBook?.buyUrl} />
                </Form.Item>
                <Form.Item
                    label="Descrizione"
                    name="description"
                    rules={[{ required: false }]}
                >
                    <Input defaultValue={editingBook?.description} />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() => {
                            setIsEditing(false);
                        }}
                    >
                        Modifica libro
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
            dataSource={books}
            columns={columns}
            rowKey="id"
            expandable={{
                expandedRowRender: (record) => (
                    <p
                        style={{
                            margin: 0,
                        }}
                    >
                        {record.description}
                    </p>
                ),
                rowExpandable: (record) => record.name !== "Not Expandable",
            }} />

    </>);
}

export default BookTable;