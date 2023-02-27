import {Tabs} from "antd";
import React from "react";
import ContactForm from "../../components/ContactForm";

const tabs = [
    {
        id: "1",
        name: "Guardians List",
        content: <ContactForm title={"Recovery pls"} content={"TCT2001"} id={"1"}/>
    }, {
        id: "2",
        name: "Protected Account",
        content: <div>Hello TCT</div>
    }]

const RecoveryPage = (): JSX.Element => {
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