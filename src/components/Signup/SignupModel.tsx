import { Modal, Space } from "antd";
import { WalletModalProps } from "@/common/types";

import { NewUser } from "@/common/types";

import { createNewUser } from "@/services/api/strapi-backend/index";
import { getCurrentAccount } from "@/services/contracts/walletContract";

import { Button, Form, Input, message } from "antd";
import { useState } from "react";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const wallets = [
  { key: "1", name: "Metamask" },
  { key: "2", name: "Coinbase" },
];

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
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
/* eslint-enable no-template-curly-in-string */

interface SignupModelProps {
  setOpen: any;
  isOpen: boolean;
  onClose: () => void;
  setClose: any;
}

export const SignupModel = ({
  isOpen,
  setOpen,
  onClose,
  setClose,
}: SignupModelProps) => {
  const [form] = Form.useForm();
  const userName = Form.useWatch("username", form);
  const email = Form.useWatch("email", form);
  const idc = Form.useWatch("identityDoc", form);
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [isMOpen, setMOpen] = useState(isOpen);

  // const { data: options } = useSWR(`/api/user/${userName}`, fetcher);

  const info = () => {
    message.info("This is a normal message");
  };

  const success = () => {
    message.success("Sign up successfully. Please login again!");
  };

  const errorSignup = () => {
    message.error("Fail to sign up");
  };

  const onFinish = async (values: any) => {
    setConfirmLoading(true);
    console.log(values);

    await getCurrentAccount()
      .then(async (publicAddress) => {
        console.log(publicAddress);
        if (publicAddress) {
          const newUserObject: NewUser = {
            publicAddress: publicAddress,
            name: values.user.name,
            // email: values.user.email,
          };
          await createNewUser(newUserObject).then((res) => {
            console.log("res", res);

            if (res?.jwt) {
              setConfirmLoading(false);
              setOpen(false);
              success();
              return;
            } else {
              setConfirmLoading(false);
              setOpen(false);
              errorSignup();
              return new Error("Fail to create new user");
            }
          });
        }
      })
      .catch((err) => {
        errorSignup();
        console.log(err);
      });
  };

  // const handleOk = () => {
  //     setModalText("The modal will be closed after two seconds");
  //     setConfirmLoading(true);
  //     setTimeout(() => {
  //         setOpen(false);
  //         setConfirmLoading(false);
  //     }, 2000);
  // };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Modal
        // footer={null}
        // footer={[
        //     <Button form="myForm" key="submit" htmlType="submit">
        //         Submit
        //     </Button>,
        // ]}
        onOk={form.submit}
        centered
        title="Sign up for new account"
        open={isOpen}
        // onOk={handleSignup}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Sign up"

        // onCancel={onClose}
        // confirmLoading={handle}
      >
        <Space direction="vertical" style={{ width: "90%" }}>
          <Form
            {...layout}
            form={form}
            name="nest-messages"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={["user", "name"]}
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
