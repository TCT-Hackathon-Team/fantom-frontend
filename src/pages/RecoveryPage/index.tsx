import {Tabs} from "antd";
import React from "react";
import ContactForm from "../../components/ContactForm";
import FriendForm from "../../components/FriendForm";

const tabs = [
    {
        id: "1",
        name: "Recovery Wallet",
        content: <ContactForm title={"Recovery pls"} content={"TCT2001"} id={"1"}/>
    }, {
        id: "2",
        name: "Recovery for friends",
        content: <FriendForm title={"Recovery pls"} content={"TCT2001"} id={"2"}/>
    }]

const RecoveryPage = () => {
    return (
        <div style={{margin: 50}}>
            <Tabs
                tabBarStyle={{display: "flex", justifyContent: "space-between"}}
                defaultActiveKey="1"
                size={"middle"}
                items={tabs.map(({id, name, content}) => {
                    return {
                        label: `${name}`,
                        key: id,
                        children: (content),
                    };
                })}
            />
        </div>

    )
}

export default RecoveryPage