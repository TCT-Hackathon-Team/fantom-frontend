import React, {useEffect, useState} from "react";
import {Tabs} from "antd";
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
import {useSelector} from "react-redux";
import {selectAccount} from "@/stores/auth/authSlice";

const txArray = allTx as unknown as TransactionDataFormat[];

// Todo: Crawl data from backend
const tabs = [
  {
    id: "1",
    name: "Wallet",
    content: <TransactionTable rowKey={"txHash"} data={txArray} columns={columns} />,
  },
  {
    id: "2",
    name: "Smart Contract",
    content: <TransactionTable rowKey={"txHash"} data={txArray} columns={columns} />,
  },
];

const ManagementPage = (): JSX.Element => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [userBalance, setUserBalance] = useState("0");
  const [scAddress, setScAddress] = useState("");
  const [scBalance, setScBalance] = useState("0");

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
  }, []);

  useEffect(() => {
    // Todo: get smart contract address from backend
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
  }, []);

  const [activeTab, setActiveTab] = useState("1");

  const onchangeTab = (activeKey: string) => {
    setActiveTab(activeKey);
  };

  return (
    <div style={{ margin: 50 }}>
      {/* <CustomButton onClick={async () => {}}>Deposit</CustomButton>
      <CustomButton>Withdraw</CustomButton> */}
      {/* Prompts */}
      {/* Wallet action */}
      <WalletButton title="Deposit" type="deposit"></WalletButton>
      &nbsp;&nbsp;&nbsp;
      <WalletButton title="Withdraw" type="withdraw"></WalletButton>
      {/* Tx table */}
      {activeTab === "1" ? (
        <InfoStatistic balance={userBalance} address={currentAccount} />
      ) : (
        <InfoStatistic balance={scBalance} address={scAddress} />
      )}
      <Tabs
        tabBarStyle={{ display: "flex", justifyContent: "space-between" }}
        defaultActiveKey={activeTab}
        size={"middle"}
        onChange={onchangeTab}
        items={tabs.map(({ id, name, content }) => {
          return {
            label: `${name}`,
            key: id,
            children: content,
          };
        })}
      />
    </div>
  );
};

export default ManagementPage;
function componentDidMount() {
  throw new Error("Function not implemented.");
}
