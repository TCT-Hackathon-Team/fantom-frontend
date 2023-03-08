import React, { useState } from "react";
import { Button, Modal, Form, Space, Input } from "antd";
import { StyleSheetManager } from "styled-components";
import { StyledButton } from "@/common/Button/styles";

const validateMessages = {
    required: "${label} is required!",
    types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
};

const CreateWalletButton: React.FC = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState("Content of the modal");

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setModalText("The modal will be closed after two seconds");
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log("Clicked cancel button");
        setOpen(false);
    };

    const onFinish = async (values: any) => {
        console.log(values);
    };

    return (
        <>
            <StyledButton onClick={showModal}>Create your wallet</StyledButton>

            <Modal
                title="Title"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Space direction="vertical" style={{ width: "90%" }}>
                    <Form
                        // {...layout}
                        form={form}
                        name="nest-messages"
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                        validateMessages={validateMessages}
                    >
                        <Form.Item
                            name={["identity", "name"]}
                            label="Username"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        {/* <Form.Item
                            name={["user", "email"]}
                            label="Email"
                            rules={[{ type: "email" }]}
                        >
                            <Input />
                        </Form.Item> */}
                        {/* <Form.Item
                        name={["user", "identity document"]}
                        label="identityDoc"
                    >
                        <Input />
                    </Form.Item> */}
                        {/* <Form.Item
                            wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item> */}
                    </Form>
                </Space>
            </Modal>
        </>
    );
};

export default CreateWalletButton;
