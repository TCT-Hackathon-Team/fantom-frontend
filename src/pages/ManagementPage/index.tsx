import React, { useState } from "react";
import { Tabs } from "antd";
import { InfoStatistic } from "./InfoStatistic";
import { TransactionTable } from "./TransactionTable";
import { columns, data1, data2 } from "./MockData";
import { web3 } from "@/stores/auth/authSlice";
import { truncate } from "../../common/types";
import { useEffect } from "react";
import { CustomButton } from "@/common/Button";
import { getContractBalance } from "@/services/contracts/walletContract";

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

  getContractBalance().then((res) => {
    console.log("contract balance", res);
  });

  useEffect(() => {
    web3?.eth.getAccounts().then((res) => {
      if (res) {
        setCurrentAccount(res[0]);
        web3?.eth.getBalance(currentAccount).then((res) => {
          const ethBalance = web3?.utils.fromWei(res, "ether");
          console.log("resBalance", ethBalance);
          if (ethBalance) {
            setUserBalance(ethBalance);
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    web3?.eth.getAccounts().then((res) => {
      if (res) {
        setScAddress(WALLET_CONTRACT_ADDRESS);

        console.log("resCurrAcc", res[0]);
        web3?.eth.getBalance(scAddress).then((res) => {
          const ethBalance = web3?.utils.fromWei(res, "ether");
          console.log("resBalance", ethBalance);
          if (ethBalance) {
            setScBalance(ethBalance);
          }
        });
      }
    });
  }, []);

  console.log(WALLET_CONTRACT_ADDRESS);

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
