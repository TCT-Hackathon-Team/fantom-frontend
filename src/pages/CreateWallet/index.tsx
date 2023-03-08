import { Tabs } from "antd";
import React from "react";
import ContactForm from "../../components/ContactForm";
import FriendForm from "../../components/FriendForm";
import CreateWalletForm from "../../components/CreateWalletForm";

const tabs = [
    {
        id: "1",
        name: "Recovery Wallet",
        content: <ContactForm title={""} content={""} id={"1"} />,
    },
    {
        id: "2",
        name: "Recovery for friends",
        content: (
            <FriendForm title={"Recovery pls"} content={"TCT2001"} id={"2"} />
        ),
    },
];

const CreateWalletPage = () => {
    return (
        <div style={{ margin: 50 }}>
            <CreateWalletForm></CreateWalletForm>
        </div>
    );
};

export default CreateWalletPage;
