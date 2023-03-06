import React, {useEffect, useState} from "react";
import {Button, Form, FormInstance, Input, Modal, Select, Tabs} from "antd";
import {InfoStatistic} from "./InfoStatistic";
import {TransactionTable} from "./TransactionTable";
import {columns, TransactionDataFormat} from "./MockData";
import {
    getContractAddress,
    getContractBalance,
    getCurrentAccount,
    getUserBalance,
} from "@/services/contracts/walletContract";
import WalletButton from "@/components/WalletButton";
import allTx from "./../../../mockdata/transactions.json";
import {useSearchParams} from "react-router-dom";

const txArray = allTx as unknown as TransactionDataFormat[];

// Todo: Crawl data from backend
const tabs = [
    {
        id: "1",
        name: "Wallet",
        content: <TransactionTable rowKey={"txHash"} data={txArray} columns={columns}/>,
    },
    {
        id: "2",
        name: "Smart Contract",
        content: <TransactionTable rowKey={"txHash"} data={txArray} columns={columns}/>,
    },
];

// @ts-ignore
const ManagementPage = (): JSX.Element => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [userBalance, setUserBalance] = useState("0");
    const [scAddress, setScAddress] = useState("");
    const [scBalance, setScBalance] = useState("0");
    const [searchParam, setSearchParam] = useSearchParams();
    const [open, setOpen] = useState(false);
    const formRef = React.useRef<FormInstance>(null);

    useEffect(() => {
        getCurrentAccount().then((currAccount) => {
            if (currAccount) {
                setCurrentAccount(currAccount);
                getUserBalance().then((ethBalance) => {
                    if (ethBalance) {
                        setUserBalance(ethBalance);
                    }
                });
            }
        });
    }, [currentAccount]);

    useEffect(() => {
        getContractAddress().then((cAddress) => {
            if (cAddress) {
                setScAddress(cAddress);
                getContractBalance().then((scBalance) => {
                    if (scBalance) {
                        setScBalance(scBalance);
                    }
                });
            }
        });
    }, [scAddress])

    useEffect(() => {
        if (searchParam.get("ft") === "1") {
            showModal()
        }
    }, [searchParam])

    const [activeTab, setActiveTab] = useState("1");

    const onchangeTab = (activeKey: string) => {
        setActiveTab(activeKey);
    };

    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const reloadBalance = async () => {
        getUserBalance().then((ethBalance) => {
            if (ethBalance) {
                setUserBalance(ethBalance);
            }
        });
    }

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    const onGenderChange = (value: string) => {
        switch (value) {
            case 'male':
                formRef.current?.setFieldsValue({note: 'Hi, man!'});
                break;
            case 'female':
                formRef.current?.setFieldsValue({note: 'Hi, lady!'});
                break;
            case 'other':
                formRef.current?.setFieldsValue({note: 'Hi there!'});
                break;
            default:
                break;
        }
    };

    const onFill = () => {
        formRef.current?.setFieldsValue({note: 'Hello world!', gender: 'male'});
    };


    // @ts-ignore
    return (
        <>
            <Modal
                title="First Time Connect"
                open={open}
                onOk={hideModal}
                onCancel={hideModal}
                footer={null}
            >
                <Form
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    labelCol={{span: 6}}
                    wrapperCol={{span: 18}}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name="License Type" label="License Type">
                        <Select
                            placeholder="Select a option and change input text above"
                            onChange={onGenderChange}
                            allowClear
                        >
                            <Select.Option value="1">ID</Select.Option>
                            <Select.Option value="2">Driver's license</Select.Option>
                            <Select.Option value="3">Passport</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Number"
                        name="name"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 10, span: 14}}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <div style={{margin: 50}}>
                {/* <CustomButton onClick={async () => {}}>Deposit</CustomButton>
      <CustomButton>Withdraw</CustomButton> */}
                {/* Prompts */}
                {/* Wallet action */}
                <WalletButton title="Deposit" type="deposit" reloadBalance={reloadBalance}></WalletButton>
                &nbsp;&nbsp;&nbsp;
                <WalletButton title="Withdraw" type="withdraw"></WalletButton>
                {/* Tx table */}
                {activeTab === "1" ? (
                    <InfoStatistic balance={userBalance} address={currentAccount}/>
                ) : (
                    <InfoStatistic balance={scBalance} address={scAddress}/>
                )}
                <Tabs
                    tabBarStyle={{display: "flex", justifyContent: "space-between"}}
                    defaultActiveKey={activeTab}
                    size={"middle"}
                    onChange={onchangeTab}
                    items={tabs.map(({id, name, content}) => {
                        return {
                            label: `${name}`,
                            key: id,
                            children: content,
                        };
                    })}
                />
            </div>
        </>
    );
};

export default ManagementPage;

function componentDidMount() {
    throw new Error("Function not implemented.");
}
