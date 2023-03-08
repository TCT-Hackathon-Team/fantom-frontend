import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Label } from "../Footer/styles";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

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

const onFinish = (values: any) => {
  console.log(values);
};

const CreateWalletForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };
  return (
    <Form
      name="dynamic_form_item"
      {...layout}
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        name={["user", "idc"]}
        label="ID number"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "threshold"]}
        label="Threshold"
        rules={[{ required: true }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.List
        name={["user", "guardlist"]}
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 3) {
                return Promise.reject(new Error("At least 3 guardians"));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                name={["user", "guardians"]}
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? "Guardians" : ""}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message:
                        "Please input guardian's address or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="guardian address"
                    style={{ width: "60%" }}
                  />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "60%" }}
                icon={<PlusOutlined />}
              >
                Add guardian
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Wallet
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateWalletForm;
