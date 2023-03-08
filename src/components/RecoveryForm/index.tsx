import { Col, Row } from "antd";
import { withTranslation } from "react-i18next";
import { Slide, Zoom } from "react-awesome-reveal";
import { ContactProps, RecoveryProps, ValidationTypeProps } from "./types";
import { useForm } from "../../common/utils/useForm";
import validate from "../../common/utils/validationRules";
import { CustomButton } from "../../common/Button";
import Block from "../Block";
import CommonInput from "../../common/Input";
import { ButtonContainer, ContactContainer, FormGroup, Span } from "./styles";
import { Select } from "antd";
import styled from "styled-components";
import { StyledInput, Container } from "@/common/Input/styles";
import { Label } from "../../common/TextArea/styles";
import { Button, Form, Input, InputNumber, Modal, message, Space } from "antd";
import {
  getUserIdNumByUserAddress,
  setRecoveryStatus,
} from "@/services/api/strapi-backend";
import { getCurrentAccount } from "@/services/contracts/walletContract";
import { useState } from "react";
const { TextArea } = Input;

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

const RecoveryForm = ({ title, content, id, t }: ContactProps) => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    validate
  ) as any;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    const hide = message.loading("Action in progress..", 0, () => {
      message.success("loading had closed");
    });
    // Dismiss manually and asynchronously
    setTimeout(hide, 2500);
  };

  const modalSuccess = () => {
    Modal.success({
      content:
        "Your recovery request has been sent successfully. Please wait for the guardian approval.",
    });
  };

  const modalError = () => {
    Modal.error({
      content: "Failed to send your recovery request. Please try again later.",
    });
  };

  const onFinish = async (values: any) => {
    const hide = message.loading("Action in progress..", 0);
    console.log("Identity Number", values.user["identity-number"]);

    await setRecoveryStatus(values.user["identity-number"])
      .then((res) => {
        console.log("final res", res);

        if (res) {
          hide();
          modalSuccess();
        } else {
          hide();
          modalError();
        }
      })
      .catch((err) => {
        console.log("err", err);
        hide();
        modalError();
      });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <ContactContainer id={id}>
        <Row justify="space-between" align="middle">
          <Col lg={12} md={11} sm={24} xs={24}>
            <Slide direction="left">
              <Block title={title} content={content} />
            </Slide>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Slide direction="right">
              <h3>Recovery for me</h3>

              <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                validateMessages={validateMessages}
              >
                <Form.Item label="Identity Type" required>
                  <Select placeholder="Choose one type of identity document">
                    <Select.Option value="identity-card">
                      Identity Card
                    </Select.Option>
                    <Select.Option value="driver-license">
                      Driver License
                    </Select.Option>
                    <Select.Option value="other">Other</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name={["user", "identity-number"]}
                  label="Identity number"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Message (Optional)">
                  <TextArea
                    rows={4}
                    placeholder="You can send your guardians a meeting link for higher security."
                  />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Slide>
          </Col>
        </Row>
      </ContactContainer>
    </>
  );
};

export default withTranslation()(RecoveryForm);
