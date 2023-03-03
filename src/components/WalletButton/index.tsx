import React, { useState } from "react";
import { Button, Modal, message, Space } from "antd";
import { StyledButton } from "@/common/Button/styles";
import { Input } from "antd";
import { deposit, withdraw } from "@/services/contracts/walletContract";

interface WalletButtonProps {
  title: string;
  type: "deposit" | "withdraw";
}

const WalletButton: React.FC<WalletButtonProps> = (
  props: WalletButtonProps
) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Enter amount");
  const [quantity, setQuantity] = useState(0);
  const [isValid, setValid] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  // const [isValidTx, setValidTx] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const HandleQuantityChange = (event: any) => {
    if (
      event.type === "change" ||
      event.type === "blur" ||
      event.key === "Enter"
    ) {
      const input = event.target.value;
      setQuantity(input);
      if (input == "" || input == 0 || input == null) {
        setValid(false);
      } else {
        setValid(true);
      }
      console.log(isValid);
    }
  };

  const handleOk = (event: any) => {
    if (!isValid) {
      return;
    }
    setConfirmLoading(true);
    setModalText("Enter amount");

    switch (props.type) {
      case "deposit":
        deposit(quantity)
          .then((res) => {
            console.log("Deposit res", res);
            setOpen(false);
            setConfirmLoading(false);
            setQuantity(0);
            if (res) {
              success("deposit");
            } else {
              error("deposit");
            }
          })
          .catch((err) => {
            console.log("Deposit err", err);
            setOpen(false);
            setConfirmLoading(false);
            setQuantity(0);
            error("deposit");
          });
        break;
      case "withdraw":
        console.log("Withdraw");
        withdraw(quantity)
          .then((res) => {
            console.log("Withdraw res", res);
            setOpen(false);
            setConfirmLoading(false);
            setQuantity(0);
            if (res) {
              success("withdraw");
            } else {
              error("withdraw");
            }
          })
          .catch((err) => {
            console.log("Withdraw err", err);
            setOpen(false);
            setConfirmLoading(false);
            setQuantity(0);
            error("withdraw");
          });

        break;
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const success = (actionType: WalletButtonProps["type"]) => {
    if (actionType == "deposit") {
      messageApi.open({
        type: "success",
        content: "Deposit successful",
      });
    } else if (actionType == "withdraw") {
      messageApi.open({
        type: "success",
        content: "Withdraw successful",
      });
    }
  };

  const error = (actionType: WalletButtonProps["type"]) => {
    if (actionType == "deposit") {
      messageApi.open({
        type: "error",
        content: "Failed to deposit",
      });
    } else if (actionType == "withdraw") {
      messageApi.open({
        type: "error",
        content: "Failed to withdraw",
      });
    }
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "This is a warning message",
    });
  };

  return (
    <>
      {contextHolder}
      <StyledButton onClick={showModal}>{props.title}</StyledButton>

      <Modal
        title={props.title}
        open={open}
        onOk={(value) => handleOk(value)}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
        <Input
          type="number"
          step={0.1}
          name="quantity"
          value={quantity}
          status={isValid ? "" : "error"}
          placeholder={quantity.toString()}
          onChange={HandleQuantityChange}
        />
      </Modal>
    </>
  );
};

export default WalletButton;
