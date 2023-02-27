import {CommonList} from "./CommonList";
import {Tabs} from "antd";
import React, {useState} from "react";
import {ThresholdForm} from "./ThresholdForm";

const dataSource = [
    {
        key: '1',
        name: 'TCT2001',
        address: '0x3333333',
    },
    {
        key: '2',
        name: 'TCT2001',
        address: '0x3333333',
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];

const tabs = [
    {
        id: "1",
        name: "Guardians List",
        content: <CommonList data={dataSource} columns={columns}/>
    }, {
        id: "2",
        name: "Protected Account",
        content: <CommonList data={dataSource} columns={columns}/>
    }]

const GuardianPage = (): JSX.Element => {
    const [threshold] = useState("3");
    const [activeTab] = useState("1");
    return (
        <div style={{margin: 50}}>
            <div style={{textAlign: "center", marginBottom: 20}}>
                <h2>Guardian List</h2>
                <p>Define the guardians who can collectively recover your key</p>
            </div>
            <div style={{width: 400, marginBottom: 30}}>
                <ThresholdForm threshold={threshold}/>
            </div>

            <Tabs
                tabBarStyle={{display: "flex", justifyContent: "space-between"}}
                defaultActiveKey={activeTab}
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

export default GuardianPage