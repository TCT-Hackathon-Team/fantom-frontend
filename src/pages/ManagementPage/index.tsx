import React, { useState } from "react";
import { Tabs } from "antd";
import { InfoStatistic } from "./InfoStatistic";
import { TransactionTable } from "./TransactionTable";
import { columns, data1, data2 } from "./MockData";
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

const WALLET_CONTRACT_ADDRESS = import.meta.env.VITE_SAMPLE_WALLET_CONTRACT;

const tabs = [
  {
    id: "1",
    name: "Wallet",
    content: <TransactionTable data={data1} columns={columns} />,
  },
  {
    id: "2",
    name: "Smart Contract",
    content: <TransactionTable data={data2} columns={columns} />,
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
      <CustomButton onClick={async () => {}}>Deposit</CustomButton>

      <CustomButton>Withdraw</CustomButton>
      {activeTab === "1" ? (
        <InfoStatistic
          balance={userBalance}
          address={truncate(currentAccount, 4, 5, 12)}
        />
      ) : (
        <InfoStatistic
          balance={scBalance}
          address={truncate(scAddress, 4, 5, 12)}
        />
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
