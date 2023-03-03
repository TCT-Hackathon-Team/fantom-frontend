import React, { useState } from "react";
import { Tabs } from "antd";
import { InfoStatistic } from "./InfoStatistic";
import { TransactionTable } from "./TransactionTable";
import { columns, TransactionDataFormat } from "./MockData";
import { web3 } from "@/stores/auth/authSlice";
import { truncate } from "../../common/types";
import { useEffect } from "react";
import { CustomButton } from "@/common/Button";
import {
  getContractAddress,
  getContractBalance,
  getCurrentAccount,
  getUserBalance,
} from "@/services/contracts/walletContract";
import WalletButton from "@/components/WalletButton";
import allTx from "./../../../mockdata/transactions.json";

// import * as txs from "./../../../mockdata/transactions.json";
// const allTx = require("./../../../mockdata/transactions.json");

const txArray = allTx as unknown as TransactionDataFormat[];
console.log(txArray);

const WALLET_CONTRACT_ADDRESS = import.meta.env.VITE_SAMPLE_WALLET_CONTRACT;
const test = `
[
  {
    "txHash": "0xc6e0c13cdcdf42015530aecffe1637f8526e7d653fdac18a58f0118b9626c1ea",
    "from": "0xcbb30b4ff53e45372476ba004a775db606f78eb2",
    "userName": "test_1",
    "value": "0.001",
    "txType": "Deposit"
  }
]
`;
// let transactions = JSON.parse(JSON.stringify(txs));
// let txArray = transactions.transactions;
// console.log(transactions);

// const txArray: TransactionDataFormat[] = JSON.parse(JSON.stringify(txs));
// const txArray: TransactionDataFormat[] = JSON.parse(test);
// console.log(txArray);

// txArray.forEach((tx) => {
//   console.log(tx);
// });

// let txArray;
// try {
//    const itemListResponse = <TransactionDataFormat[]>JSON.parse(transactions);

//    if(!itemListResponse.has("id") ||
//       !itemListResponse.has("type") ||
//       !itemListResponse.has("state")){

//       throw "Invalid Item";
//    }
// } catch (e){

// }

// Todo: Crawl data from backend
const tabs = [
  {
    id: "1",
    name: "Wallet",
    content: <TransactionTable data={txArray} columns={columns} />,
  },
  {
    id: "2",
    name: "Smart Contract",
    content: <TransactionTable data={txArray} columns={columns} />,
  },
];

const ManagementPage = (): JSX.Element => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [userBalance, setUserBalance] = useState("0");
  const [scAddress, setScAddress] = useState("");
  const [scBalance, setScBalance] = useState("0");
  const [txStatus, setTxStatus] = useState(false);

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
