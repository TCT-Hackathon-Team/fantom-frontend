import React, {useState} from "react";
import {Tabs} from "antd";
import {InfoStatistic} from "./InfoStatistic";
import {TransactionTable} from "./TransactionTable";
import {columns, data1, data2} from "./MockData";

const tabs = [
    {
        id: "1",
        name: "Wallet",
        content: <TransactionTable data={data1} columns={columns}/>
    }, {
        id: "2",
        name: "Smart Contract",
        content: <TransactionTable data={data2} columns={columns}/>
    }]
const ManagementPage = (): JSX.Element => {
    const [activeTab, setActiveTab] = useState("1");

    const onchangeTab = (activeKey: string) => {
        setActiveTab(activeKey);
    }

    return (
        <div style={{margin: 50}}>
            {/*<Card style={{*/}
            {/*    width: 600,*/}
            {/*    marginBottom: 60, borderRadius: "20px",*/}
            {/*    overflow: "hidden",*/}
            {/*    backgroundColor: 'beige',*/}
            {/*}}>*/}
            {/*    <p>Total Wallet Balance: XXX</p>*/}
            {/*    <p>Wallet's Address: XXX</p>*/}
            {/*</Card>*/}
            {activeTab === "1"
                ? <InfoStatistic balance={9999999999999999} address={"TCT2001's Wallet"}/>
                : <InfoStatistic balance={9999999999999999} address={"TCT2001's Smart Contract"}/>}
            <Tabs
                tabBarStyle={{display: "flex", justifyContent: "space-between"}}
                defaultActiveKey={activeTab}
                size={"middle"}
                onChange={onchangeTab}
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
export default ManagementPage